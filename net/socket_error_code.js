//系统错误码
var SocketErrorCode = { };

let addCode = function(error) {
    if (! error || error === undefined || error === null) {
        console.log("error is null !!");
        return;
    };
    SocketErrorCode[error.code] = error.message;
    return error.code;
};


let SystemError = {
	success 				: addCode({code : 0x0000, message : "成功"}),
	forward 				: addCode({code : 0x0001, message : "重定向"}),
	unknown 				: addCode({code : 0x0002, message : "未知错误"}),
	timeout 				: addCode({code : 0x0003, message : "请求超时"}),
	serialize 				: addCode({code : 0x0004, message : "序列化错误"}),
	argument				: addCode({code : 0x0005, message : "参数错误"}),
	notImplement   			: addCode({code : 0x0006, message : "协议未实现"}),
	illegalOperation		: addCode({code : 0x0007, message : "非法操作"}),
	db						: addCode({code : 0x0008, message : "数据库操作失败"}),
	messageTooLong			: addCode({code : 0x0009, message : "消息包太长"}),
	protoNotExisits			: addCode({code : 0x000a, message : "不存在此协议"}),
	notLogin				: addCode({code : 0x000b, message : "未登录"}),
	serviceIsStoped			: addCode({code : 0x000c, message : "服务故障"}),
	busy					: addCode({code : 0x000d, message : "服务忙"}),
	logined					: addCode({code : 0x000e, message : "已登录"}),
	network					: addCode({code : 0x000f, message : "网络异常"}),
	ServerMaintenance		: addCode({code : 0x0010, message : "服务器维护"}),
	FuncitonClosed			: addCode({code : 0x0011, message : "功能暂时关闭"}),
	invalidName             : addCode({code : 0x0012, message : "文字含有非法字符"}),
	failReConnect			: addCode({code : 0x0013, message : "断线重连失败.请重新登陆"}),
};
SocketErrorCode.SystemError = SystemError;

//游戏公用错误码
let GameError = {
	goldNotEnough 			: addCode({code : 0x00a1, message : "金币不足"}),
	hasMatch 				: addCode({code : 0x00a2, message : "已在匹配"}),
};
SocketErrorCode.GameError = GameError;


//认证
let AuthError = {
	tokenIsInvalid : addCode({code : 0x0101, message : "参数不合法"}),
};
SocketErrorCode.AuthError = AuthError;


//HTTP交互用
let HttpResultCode = {
	success 						: addCode({code : 0xF000, message : "OK"}),
	httpPostCode					: addCode({code : 200, message : "http request success code"}),
	requestMethodNoSupport 			: addCode({code : 0xF001, message : "Request Method No Support"}),
	secretKeyIsNull					: addCode({code : 0xF002, message : "Params key is null"}),
	secretKeyNoMatch				: addCode({code : 0xF003, message : "secretKey is not match"}),
	serverIdIsNull 					: addCode({code : 0xF004, message : "serverId is null"}),
	moduleIsNull					: addCode({code : 0xF005, message : "module is null"}),
	methodIsNull   					: addCode({code : 0xF006, message : "method is null"}),
	moduleNoExist					: addCode({code : 0xF007, message : "request module not exist"}),
	functionNoExist					: addCode({code : 0xF008, message : "request function not exist"}),
	pidIsNull						: addCode({code : 0xF009, message : "pid is invalid"}),
	signInvalid						: addCode({code : 0xF0a0, message : "sign is invalid"}),
	errorAppId						: addCode({code : 0xF0a1, message : "appid is invalid"}),
	paramInvalid					: addCode({code : 0xF0a3, message : "api params invalid"}),
	functionRetIsNull				: addCode({code : 0xF0a4, message : "request function ret is null"}),
	noreturn						: addCode({code : 0xF0a5, message : "不需要回执的请求"}),
	retrunEncodeData				: addCode({code : 0xF0a6, message : "回执encode消息结构"}),
	noSafeConnect					: addCode({code : 0xF0a7, message : "不安全的连接"}),
	hasRegisterServer				: addCode({code : 0xF0a8, message : "已经注册过的服务器id"}),
	serviceIsStoped					: addCode({code : 0xF0a9, message : "服务故障"}),
};
SocketErrorCode.HttpResultCode = HttpResultCode;

let PassError = {
	argument 				: addCode({code : 0x1001, message : "关卡id存在"}),
	gameIsBegin				: addCode({code : 0x1002, message : "比赛已开始"}),
	notInRoom 				: addCode({code : 0x1003, message : "不在比赛中"}),
	isOVer					: addCode({code : 0x1004, message : "比赛已结束"}),
	notOVer					: addCode({code : 0x1005, message : "比赛未结束"}),
	isLeave					: addCode({code : 0x1006, message : "对方已离开"}),
	canNotBegin				: addCode({code : 0x1007, message : "不可开始比赛"}),

}
SocketErrorCode.PassError = PassError;


let message = function(errorCode) {
    if (errorCode === undefined || errorCode === null) {
        console.log("the errorCode is null !!");
        return;
    };
    let codeDesc = SocketErrorCode[errorCode];
    if (! codeDesc || codeDesc === undefined || codeDesc === null) {
        console.log("the errorcode is null or not registered, the errorcode => " + errorCode);
        return;
    };
    return codeDesc;
};
SocketErrorCode.message = message;

module.exports = SocketErrorCode;

