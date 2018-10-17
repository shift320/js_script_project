
/**
 * 检测某对象是否存在或bool值为真
 * @param value 对象指针或引用 或判断表达式
 * @returns {boolean}
 */
function checkbool(value) {
    var bValue = true;
    if (value === undefined || value === null || value === false){
        bValue = false;
    };
    return bValue;
}

let Global = require("init_game").Global;


cc.Class({
    
    ctor: function(){
        this._requestIndex = 0;
        this._requestObjList = {};
        this._reqkeyToCtrlKey = {};
        cc.httpHelper = this;
    },
    
    /**
     * 注册对应的ctrl
     * @param ctrlKey
     */
    addCtrl: function (ctrlKey) {
        this._requestObjList[ctrlKey] = {};
    },

    /**
     * 发起 http / https 的 Get 方法请求
     * @param ctrlKey 发起请求的ctrl 标识
     * @param url 接口地址
     * @param callback 请求回调
     */
    get:function(ctrlKey, url, callback){
        console.log("get: " + Global.useWx + url);

        var request = cc.loader.getXMLHttpRequest();
        console.log("Status: Send Get Request to " + url);
        request.open("GET", url, true);

        var reqKey = "GET_" + ctrlKey + this._requestIndex;
        var reqobj = {req: request, reqKey: reqKey};
        this._requestObjList[ctrlKey][reqKey] = reqobj;
        this._reqkeyToCtrlKey[reqKey] = ctrlKey;
        this._requestIndex = this._requestIndex + 1;
        var self = this;
        let removeCall = function () {
            if (isShowRequest === true){
                cc.viewMgr.closeRequest(); // 关闭请求等待
            };
            self.removeReq(reqKey);
        };
        xhr.onerror = function(){
            console.log("https post request error..");
            callback({errorCode: 16, data:null});
            removeCall();
        };
        xhr.ontimeout = function(){
            console.log("https post request ontimeout..");
            callback({errorCode: 16, data:null});
            removeCall();
        };

        xhr.onload = function(){
            console.log("https post request onload..");
            var response = xhr.responseText;
            var result = JSON.parse(response);
            if (xhr.status === 200) {
                callback(result);
            }
            else{
                callback({errorCode: xhr.status, data:null});
            };
            removeCall();
        };
        request.send();
    },

    /**
     * 发起 http / https 的 Post 方法请求
     * @param ctrlKey 发起请求的ctrl 标识
     * @param url 接口地址
     * @param params 请求参数
     * @param callback 请求回调
     * @param bool isShowRequest 是否显示请求
     */
    post: function(ctrlKey, url, params, callback, isShowRequest, backData){
        var nums = arguments.length
        if(nums === 3){
            callback = arguments[1];
            params = "";
        };

        console.log("postl: " + Global.useWx + url);
            // 显示请求等待
        if (isShowRequest === true)
            cc.viewMgr.showRequest();

        if (Global.useWx) {
            console.log("wx.request.Post  --url: " + url);
            console.log("wx.request.Post  --params: " + params);
            wx.request({
                method:"POST",
                header:{"cache-control":"no-cache"},
                url: url,
                data: params,
                success:function(result){
                    console.log("wx.request.Post res: ", result);
                    if (result.statusCode === 200) {
                        let data = result.data;
                        data.params = backData;
                        callback(result.data);
                    }else{
                        console.log("wx.request.Post  errorCode: " + result.statusCode);
                        callback({errorCode:result.statusCode, data:{}, params: backData});
                    }
                    if (isShowRequest === true){
                        cc.viewMgr.closeRequest(); // 关闭请求等待
                    };
                },
                fail: function(result) {
                    console.log("wx.request.Post  result: request failed", result);
                    callback({errorCode: 16, data: {}, params: backData});
                    if (isShowRequest === true){
                        cc.viewMgr.closeRequest(); // 关闭请求等待
                    };
                },
            });
        } else {
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");


            var reqKey = "POST_" + ctrlKey + this._requestIndex;
            var reqobj = {req: xhr, reqKey: reqKey, ctrlKey:ctrlKey};
            this._requestObjList[ctrlKey][reqKey] = reqobj;
            this._reqkeyToCtrlKey[reqKey] = ctrlKey;
            this._requestIndex = this._requestIndex + 1;

            var self = this;
            let removeCall = function () {
                if (isShowRequest === true){
                    cc.viewMgr.closeRequest(); // 关闭请求等待
                };
                self.removeReq(reqKey);
            };
            xhr.onerror = function(){
                console.log("https post request error..");
                callback({errorCode: 16, data:null, params: backData});
                removeCall();
                return;
            };
            xhr.ontimeout = function(){
                console.log("https post request ontimeout..");
                callback({errorCode: 16, data:null, params: backData});
                removeCall();
                return;
            };
            xhr.onload = function(){
                console.log("https post request onload..");
                var response = xhr.responseText;
                var result = JSON.parse(response);
                if (xhr.status === 200) {
                    let data = result;
                    data.params = backData;
                    callback(result);
                }
                else{
                    callback({errorCode: xhr.status, data:null, params: backData});
                };
                removeCall();
            };
            xhr.send(params);
        };
    },

    /**
     * 重置 httpHelper
     */
    reset: function () {
        for (ctrlKey in this._requestObjList) {
            var ctrlReqList = this._requestObjList[ctrlKey];
            if (checkbool(ctrlReqList)) {
                for (var reqKey in ctrlReqList) {
                    var reqObj = ctrlReqList[reqKey];
                    if (checkbool(reqObj)) {
                        if (reqObj.req && reqObj.req.abort){
                            reqObj.req.abort();
                        };
                        reqObj.req.onreadystatechange = null;
                        ctrlReqList[reqKey] = null;
                    };
                };
            };
        };
    },

    /**
     * 清空ctrlKey 对应的ctrl 所发起的请求
     * @param ctrlKey
     */
    clearCtrlReq: function(ctrlKey) {
        if (! checkbool(ctrlKey)) { console.log("ctrlKey 为空，释放请求信息失败。。"); return; };
        if (! checkbool(this._requestObjList[ctrlKey])) { console.log("ctrlKey 为空，释放请求信息失败。。"); return; };
        var ctrlReqList = this._requestObjList[ctrlKey];
        if (checkbool(ctrlReqList)) {
            for (var reqKey in ctrlReqList) {
                var reqObj = ctrlReqList[reqKey];
                if (checkbool(reqObj)) {
                    if (reqObj.req && reqObj.req.abort){
                        reqObj.req.abort();
                    };
                    reqObj.req.onreadystatechange = null;
                    ctrlReqList[reqKey] = null;
                };
            };
        };
    },

    /**
     * 移除 请求标识对应的请求
     * @param reqKey 请求标识
     */
    removeReq: function (reqKey) {
        if (! reqKey) { cc.log("请求标识不存在"); return; };
        if (! this._reqkeyToCtrlKey[reqKey]) { cc.log("请求标识无对应请求"); return; };
        var ctrlKey = this._reqkeyToCtrlKey[reqKey];
        var reqObj = this._requestObjList[ctrlKey][reqKey];
        if (checkbool(reqObj)) {
            if (reqObj.req && reqObj.req.abort){
                reqObj.req.abort();
            };
            reqObj.req.onreadystatechange = null;
            this._requestObjList[ctrlKey][reqKey] = null;
        };
    },
   
    
});
