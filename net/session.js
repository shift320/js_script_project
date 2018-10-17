
let webSocket = require("socket");
let NetListener = require("net_dispatcher");
let SocketErrorCode = require("socket_error_code");
var M_Auth = require("proto_map").M_Auth;

let HEART_INTERVAR = 5;
let REQUEST_LONG_TIME = 10;

cc.Class({
    // extends: cc.Component,
    //定义全局的变量
    ctor: function() {
        this._frozenEvents = {}; //冻结列表
        this._requestList  = {}; //请求列表
        this._serverListenerList = {};

        this._listenerIndexList = {};

        this._requestWaitList = [];
        
        this._steam = new webSocket();
        this._model = cc.modelMgr.getModel("ConnectModel");
        this._steam.setOpenCallback(this._onConnect.bind(this));
        this._steam.setCloseCallback(this._onCloseConnect.bind(this));
        this._steam.setMassageCall(this._onMessage.bind(this));
        this._steam.setRequestCall(this._onQuestCall.bind(this));

        this._dispatcher = new NetListener();

        this._tickTime    = 0;
        this._requestTime = 0;
        this._htSendTime  = 0;
        this._scheduler   = cc.director.getScheduler();
    },

    getModel(){
        return this._model;
    },
    
    /** 初始化计时器 */
    _initTick: function() {
        this._tickTime    = 0;
        this._requestTime = 0;
        this._htSendTime  = 0;
        this._connectTime = 0;
        this._gettedServerTime = false;
        this._scheduler.schedule(this._tick, this, 0.5, false);
    },
    
    /** tick */
    _tick: function(dt) {
        this._tickTime = this._tickTime + dt;
        if (this._steam.isConnect()) {
            if (! this._gettedServerTime) {
                this._requestServerTime();
            };
            this._checkHeart();
            this._checkTimeOut();
        } else {
            this._connectTime = this._connectTime + dt;
            this._checkConnectTime();
        };
    },
     
    /** 检测并根据时间间隔发送心跳包 */
    _checkHeart: function() {
        if (this._tickTime - this._htSendTime >= HEART_INTERVAR) {
            // this.request(M_Auth.heartbeat, null, null, this._onHeartCallback.bind(this), false);
            this._steam.send(M_Auth.heartbeat.id, 0, null);
            this._htSendTime = this._htSendTime + HEART_INTERVAR;
        };
    },
    
    /** 请求超时检测，当超时后移除对应请求，并调用回调 */
    _checkTimeOut: function() {
        for (let requestIndex in this._requestList) {
            let request = this._requestList[requestIndex];
            if (typeof request !== "undefined" && request !== null) {
                if (this._tickTime - request.requestTime > REQUEST_LONG_TIME) {
                    this._onQuestCall({errorCode:SocketErrorCode.SystemError.timeout, requestIndex: requestIndex, data: {}})
                    console.log("session ==> request => timeout -> [protoId] = " + request.protoId + ", [requestIndex] = " + requestIndex);
                };
            };
        };
    },

    /** 连接超时检测，当超时后重置session */
    _checkConnectTime: function() {
        if (this._tickTime - this._connectTime > REQUEST_LONG_TIME) {
            console.log("session  connect timeout " );
            this._resetAll();
            this._model.dispatchEvent(this._model.eventName.CONNECT_FAILE);
        }
    },

    /** 心跳包请求回调 */
    _onHeartCallback: function() {},
    
    /** 连接成功回调，如果有请求等待队列，则发送对应请求，且清空等待队列 */
    _onConnect: function() {
            console.log("session  connect succes " );
            for (let index = 0; index < this._requestWaitList.length; index ++) {
            let data = this._requestWaitList.pop();
            this.request(data.proto, data.data, data.params, data.callback, data.showRequest)
        };
        this._connectTime = 0;
        this._model.dispatchEvent(this._model.eventName.CONNECT_SUC);
    },

    /** 关闭成功回调，重置session 并判断是否需要重新链接 */
    _onCloseConnect: function(event) {
        this._resetAll();
        this._model.dispatchEvent(this._model.eventName.CONNECT_COLSE);
        if (this._begainConnect) {
            this._steam.connect();
            this._begainConnect = false;
        };
    },
    
    /**
     * 向服务器请求当前时间
     */
    _requestServerTime: function() {
        this.request(M_Auth.getServerTime, null, null, this._onGetServerTime.bind(this), false);
    },
    
    _onGetServerTime: function(result){
        if (result.errorCode === cc.ctrlMgr.ErrorCode.EC_SUCCESS) {
            this._model.setServerTime(result.data.time);
            this._gettedServerTime = true;
        } else {
            this._requestServerTime();
        };
    },

    
    /** 消息推送回调，并判断对应的监听是否已被冻结，若冻结，则将数据写入对应的冻结事件队列，否则根据protoId发送对应监听的回调 
     * @param event [object] {protoId: 协议id, data: 推送数据 }
    */
    _onMessage: function(event) {
        console.log("_onMessage",event)
        let protoId = event.protoId;
        if (checkbool(protoId)) {
            let item = this._frozenEvents[protoId];
            if (checkbool(item)) {
                if (checkbool(item.keepLast)) {
                    this._frozenEvents[protoId].datas[0] = event.data;
                }else{
                    this._frozenEvents[protoId].datas.push(event.data);
                };
            }else{
                let listenerIndexList = this._listenerIndexList[protoId];
                for (let listenerIdnex in listenerIndexList) {
                    let eventIndex = listenerIndexList[listenerIdnex];
                    let listenerInfo = this._serverListenerList[eventIndex];
                    this._dispatcher.dispatchEvent(listenerInfo.eventIndex, event);
                };
            };
        }else{
            console.log("推送消息未监听" + event.protoId);
        };
    },
    
    /**请求回调，要据对应的protoId 获取请求数据，并根据requestIndex 派发对应信息
     * @param request [object] {requestIndex: 请求编号，protoId: 协议id, errorCode: 错误码，data: 返回的数据}
     */
    _onQuestCall: function(result) {
        let requestIndex = result.requestIndex;
        let requestInfo = this._requestList[requestIndex];
        if (requestInfo) {
            this._dispatcher.dispatchEvent(requestIndex, {errorCode: result.errorCode, data: result.data});
            if (requestInfo.showRequest) {
                cc.viewMgr.closeRequest();
            };
        };
        this._requestList[requestIndex] = null;
    },
    
    /**连接接口，若已有链接，则关闭链接，并在链接关闭成功后重新链接 */
    connect: function() {
        this._initTick();
        this._begainConnect = false;
        if (this._steam.isConnect()) {
            this._steam.closeConnect();
            this._begainConnect = true;
        }else{
            this._steam.connect();
        };
    },
    
    /** 关闭链接接口 */
    closeSession: function() {
        this._begainConnect = false;
        this._steam.closeConnect();
    },

    
    /**
     * 发送请求接口
     * @param proto 协议信息
     * @param data 需要发送的数据
     * @param params  需要转发的数据
     * @param callback 请求回调
     * @param showRequest 是否显示请求数据遮罩
     */
    request: function(proto, data, params, callback, showRequest) {
        showRequest = showRequest | false;
        if (! this._steam.isConnect()) {
            this._requestWaitList.push({proto: proto, data: data, params: params, callback: callback, showRequest: showRequest, requestTime: this._tickTime})
            return;
        };
        let eventIndex = this._dispatcher.addEvent(callback, params, true);
        this._requestList[eventIndex] = {protoId: proto.id, requestIndex: eventIndex, showRequest: showRequest, requestTime: this._tickTime};
        this._steam.send(proto.id, eventIndex, data);
        // console.log("request send",proto.id, eventIndex, data)
        if (showRequest) {
            cc.viewMgr.showRequest();
        };
    },
    
    /**
     * 注册协议监听事件
     * @param proto 协议信息
     * @param callback 监听回调
     */
    regeistLister: function(proto, callback) {
        let eventIndex = this._dispatcher.addEvent(callback, null, false);
        this._serverListenerList[eventIndex] = {protoId: proto.id, eventIndex: eventIndex};
        if (! this._listenerIndexList[proto.id]) {
            this._listenerIndexList[proto.id] = [];
        };
        this._listenerIndexList[proto.id].push(eventIndex);
    },
    
    /** 
        冻结事件协议触发，这个仅为客户端行为，事件数据缓存在客户端，解冻时在触发事件分派行为
        @param protoEvent 要冻结的事件协议
        @param keepLast 对于同一协议，是否只保留最后一次缓存数据
    */
    freezeEvent: function(protoEvent, keepLast){
        let proto = this._steam.getProtoInfo(protoEvent.id);
        if (! proto || proto === null || proto === undefined) {
            console.log("freezeEvent,protoId[0x%x] is invalid", protoEvent.id);
            return;
        };
            
        let item = this._frozenEvents[proto.id];
        if (item === null) {
            item = {proto: proto, datas: {}};
            this._frozenEvents[proto.id] = item;
        };
        item.keepLast = keepLast;
    },

    /** 
        解结事件协议, 解冻后会马上触发已经缓存的事件分派行为
        @param protoEvent 要冻结的事件协议
        @param clear  如果为该值为真，则只会清楚缓存的事件数据，而不会触发事件分派行为
    */
    unfreezeEvent: function(protoEvent, clear) {
        let protoId = protoEvent.id;
        
        let item = this._frozenEvents[protoId];
        if (item) {
            this._frozenEvents[protoId] = null;
            if (item.datas.length === 0 || clear) {
                return;
            };
                
            for (let key = 0; key < item.datas.length; key ++) {
                let data = item.datas[key];
                if (data === true) {
                    data = null;
                };
                    
                this._dispatcher.dispatchEvent(protoId, data);
                if (checkbool(item.keepLast)) {
                    break;
                };
            };
        };
    },
        
    /** 重置 session 所有信息 */
    _resetAll: function() {
        this._requestList = null;
        this._requestList = {};
        this._frozenEvents = null;
        this._frozenEvents = {};
        this._serverListenerList = null;
        this._serverListenerList = {};

        this._gettedServerTime = false;

        for (let index in this._listenerIndexList) {
            this._listenerIndexList[index] = null;
        };
        this._listenerIndexList = null;
        this._listenerIndexList = {};

        this._fullnameList = null;
        this._fullnameList = {};

        this._dispatcher.removeAllListener();

        for (let index = 1; index < this._requestWaitList.length; index ++){
            this._requestWaitList.pop();
        };
    
        if (this._scheduler) {
            this._scheduler.unschedule(this._tick, this);
        };
    
        if (cc.viewMgr.isShowRequest()) {
            cc.viewMgr.hideRequest();
        };
    },

    

});

