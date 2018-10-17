
let PROTO_LOG = {
    NONE : 0,   //不记录
    request : 1,  //只记录请求数据
    EC : 2,        //记录请求数据和返回的错误码
    ALL : 3,        //记录全部，如果协议为事件类型，则必须填写该值才能记录
};

let PROTO_TYPE = {
	C2S : 1,
	S2C : 2,
}

let protoFiles = [
    "auth",
    "pk"
];

let ModelList = {};

//认证模块
let M_Auth = {
	module : "auth",
	auth 				: {id : 0x0101, type : 1, request : "auth.AuthRequest", response : null, log  : 2, desc : "登录"},
	heartbeat 			: {id : 0x0103, type : 1, request : null, response : null, log  : 0, desc : "心跳"},
	getServerTime 		: {id : 0x0104, type : 1, request : null, response : "auth.ServerTime", log  : 0, desc : "获取服务器时间"},
}
ModelList.Auth 			= M_Auth;

let M_Pk = {
	module : "pk",
	match 				: {id : 0x0201, type : 1, request : "pk.MatchRequest", response : null, log : 2, desc : "匹配"},
	enter 				: {id : 0x0202, type : 1, request : "pk.EnterInfo", response : "pk.RoomInfo", log : 2, desc : "进入"},
	cannelMatch 		: {id : 0x0203, type : 1, request : "pk.MatchRequest", response : null, log : 2, desc : "取消匹配"},
	updateStep 			: {id : 0x0204, type : 1, request : "pk.StepInfo", response : null, log : 2, desc : "更新进度"},
	leave 				: {id : 0x0205, type : 1, request : "pk.MatchRequest", response : null, log : 2, desc : "离开房间"},
	playAgain 			: {id : 0x0206, type : 1, request : "pk.MatchRequest", response : null, log : 2, desc : "再来一局"},
	agree 				: {id : 0x0207, type : 1, request : "pk.MatchRequest", response : null, log : 2, desc : "同意再来一局"},

	onMatch 			: {id : 0x02a1, type : 2, response : "int32", log : 2, desc : "推送匹配成功"},
	onUpdateStep 		: {id : 0x02a2, type : 2, response : "int32", log : 2, desc : "推送对方进度"},
	onOver 				: {id : 0x02a3, type : 2, response : "pk.OverInfo", log : 2, desc : "推送结算"},
	onLeave 			: {id : 0x02a4, type : 2, response : null, log : 2, desc : "推送对方离开"},
	onNewGameStart 		: {id : 0x02a5, type : 2, response : "pk.NewInfo", log : 2, desc : "推送新一局开始"},
        onPlayAgain         : {id : 0x02a6, type : 2, response : null, log : 2, desc : "推送再来一局"},
}
ModelList.Pk 			= M_Pk;

var ProtoMap = {
    files: protoFiles,
    protos: {},
};

let _initProtos = function() {
    for (let key in ModelList) {
        let model = ModelList[key];
        for (let index in model) {
            let proto = model[index];
            if (proto && (proto !== undefined) && (proto !== null) 
                && (index !== "module") && (index !== "service")) {
                ProtoMap.protos[proto.id] = {
                    id: proto.id,
                    type: proto.type,
                    request: proto.request,
                    response: proto.response,
                    module: model.module,
                    service: proto.service || model.service,
                    name: index,
                    fullname: model.module + "." + index,
                    desc: proto.desc || index,
                    log: proto.log || PROTO_LOG.NONE,
                };
                console.log("proto", proto.id, ProtoMap.protos[proto.id])
            };
        };
    };
};

let _initModelList = function() {
    for (let key in ModelList) {
        ProtoMap[key] = ModelList[key];
    };
};

_initModelList();
_initProtos();

module.exports = {
    ProtoMap: ProtoMap,
    M_Auth: M_Auth,
    M_Pk: M_Pk,
};




