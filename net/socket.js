
var Global   = require('init_game').Global;
let Protos   = require("proto_map").ProtoMap;
let dcodeIO  = {}
dcodeIO["ByteBuffer"] = require("bytebuffer");
let ProtoBuf = protobuf;

cc.Class({

    //定义全局的变量
    ctor: function () {
        this._builderList = {};
        this._nProtoLoadingNum = 0;
        this._messageType = {Request:1, Push:2};
        this._protosById = {};
        this._registerAllProtosFromJs();
    },

    _registerAllProtosFromProto: function() {
        // if (cc.sys.isNative) {
        //     jsb.fileUtils.addSearchPath("res/raw-assets/resources", true);
        // };

        // let builderList = this._builderList;
        // let protFileNum = Protos.files.length;
        // let self = this;
        // for (let index = 0; index < protFileNum; index++){
        //     let fileName = Protos.files[index];
        //     ProtoBuf.load("proto/" + fileName, function (err, builder) {
        //         if (err){
        //             throw err;
        //         };
        //         builderList[fileName] = builder;
        //         self._nProtoLoadingNum = self._nProtoLoadingNum - 1;
        //     });
        //     self._nProtoLoadingNum = self._nProtoLoadingNum + 1;
        // };

        // this._protosById = Protos.protos;
    },

    _registerAllProtosFromJs: function() {
        let builder = require("auth");
        this._builderList = builder;
        this._protosById = Protos.protos;
    },

    _onMessage: function (massage) {
        let resulet = this._decodeBuffer(massage);
        let messageType = resulet.messageType;
        if (messageType === this._messageType.Request) {
            if (this._onRequestCallback) {
                this._onRequestCallback(resulet);
            };
        }else{
            if (this._onMassageCallback) {
                this._onMassageCallback(resulet);
            };
        };
    },

    _decodeBuffer: function(buffer) {

        let tempBuffer = new dcodeIO.ByteBuffer();
        let dataBuffer = buffer.data;
        tempBuffer.append(dataBuffer, 0);

        let length       = tempBuffer.readInt16(0);
        let protoId      = tempBuffer.readInt16(2);
        let proto        = this._protosById[protoId];
        let requestIndex = 0;
        let errorCode    = 0;
        let leftCount    = 4;
        if (proto.type === 1){
            requestIndex = tempBuffer.readInt16(4);
            errorCode = tempBuffer.readInt16(6);
            leftCount = 8;
        };
        let data      = {};
        let pbBuffer  = tempBuffer.compact(leftCount, leftCount + length);
        if (length > 0) {
            if (typeof proto.response === "string") {
                if (proto.response === "int8") {
                    data = pbBuffer.readInt8(0);
                } else if (proto.response === "int16") {
                    data = pbBuffer.readInt16(0);
                } else if (proto.response === "int32") {
                    data = pbBuffer.readInt32(0);
                } else if (proto.response === "int64") {
                    data = pbBuffer.readInt64(0);
                } else {
                    // let pbBuilder = this._builderList[proto.module];
                    // let pbMessage = pbBuilder.lookupType(proto.response);
                    // let reqData = pbMessage.decode(Global.useWx ? pbBuffer : pbBuffer.view);

                    let pointIndex = (proto.response).indexOf("\.");
                    let moduleName = (proto.response).slice(0, pointIndex);
                    let msgName = (proto.response).slice(pointIndex + 1);
                    let builder = this._builderList[moduleName];
                    let massage = builder[msgName];
                    let reqData = massage.decode(pbBuffer.view);
                    for (let key in reqData.toJSON()) {
                        data[key] = reqData[key];
                    };
                };
            };
        };

        let rData = {
            protoId: protoId,
            requestIndex: requestIndex,
            messageType: proto.type,
            errorCode: errorCode,
            data: data
        };
        console.log("socket ==> onMessage => data ->", rData);
        return rData;
    },

    send: function(protoId, eventIndex, data) {
        let proto = this._protosById[protoId];
        // console.log("send encode proto", proto, data);


        let buffer = new dcodeIO.ByteBuffer();
        if (typeof proto.request === "string") {
            if (proto.request === "int8") {
                buffer.writeInt8("1234567");
            } else if (proto.request === "int16") {
                buffer.writeInt16("12345678");
            } else if (proto.request === "int32") {
                buffer.writeInt32("1234567890");
            } else if (proto.request === "int64") {
                buffer.writeInt64("1234567890123456");
            } else {
                let pointIndex = (proto.request).indexOf("\.");
                let moduleName = (proto.request).slice(0, pointIndex);
                let msgName = (proto.request).slice(pointIndex + 1);
                let builder = this._builderList[moduleName];
                let massage = builder[msgName];
                buffer = massage.encode(data).finish();

                // let builder = this._builderList[proto.module];
                // let pbMessage = builder.lookupType(proto.request);
                // let pbDate = pbMessage.create(data);
                // buffer = pbMessage.encode(pbDate).finish();
            };
        };


        let length = buffer.length ? buffer.length : 0;
        let tempBuffer = new dcodeIO.ByteBuffer(length + 4);
        if (length > 0) {
            tempBuffer.append(buffer, 4);
        };
        tempBuffer.writeShort(protoId, 0);
        tempBuffer.writeShort(eventIndex, 2);

        console.log("socket ==> send => tempBuffer.view ->", protoId, eventIndex, Global.useWx ? tempBuffer.view.buffer : tempBuffer.view);
        this._socket.send(Global.useWx ? tempBuffer.view.buffer : tempBuffer.view);
    },

    connect: function () {
        if (!this._socket || this._socket.readyState !== 1) {
            console.log("..connect..>>", Global.wsUrl);
            this._socket = new WebSocket(Global.wsUrl);
            this._socket.binaryType = "arraybuffer";
            this._socket.onopen = this._openCallback.bind(this);
            this._socket.onclose = this._onCloseConnet.bind(this);
            this._socket.onmessage = this._onMessage.bind(this);
        };
        return this;
    },

    _onCloseConnet: function(){
        if (! this._socket) {
            return;
        };
        this._socket.onopen = null;
        this._socket.onopen = null;
        this._socket.onclose = null;
        this._socket.onmessage = null;
        this._closeCallback();
    },

    isConnect: function() {
        if (this._socket && this._socket.readyState === 1) {
            return true;
        };
        return false;
    },

    closeConnect: function() {
        if (this._socket && this.isConnect()) {
            this._socket.close();
        };
    },

    setOpenCallback: function (openCallback) {
        this._openCallback = openCallback;
    },

    setCloseCallback: function (closeCallback) {
        this._closeCallback = closeCallback;
    },

    setMassageCall: function (onMassageCallback) {
        this._onMassageCallback = onMassageCallback;
    },

    setRequestCall: function(onRequestCallback) {
        this._onRequestCallback = onRequestCallback;
    },

    getFullname: function(protoId) {
        let proto = this._protosById[protoId];
        return proto.fullname;
    },

    getProtoInfo: function(protoId) {
       let proto = this._protosByIdp[protoId];
       return proto;
    },

});

