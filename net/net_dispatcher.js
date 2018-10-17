
cc.Class({
    //定义全局的变量
    ctor: function () {
        console.log("......net_dispatcher......ctor.......>>");
        this._eventIndex = 0;
        this._callbackList = {}; //当前的webSocket的对象
    },

    addEvent: function(callback, params, autoRelease) {
        this._eventIndex = this._eventIndex + 1;
        if (this._eventIndex >= 65536) {
            this._eventIndex = 1;
        }
        this._callbackList[this._eventIndex] = {callback: callback, params: params, autoRelease: autoRelease};
        return this._eventIndex;
    },

    dispatchEvent: function(eventIndex, data) {
        let item = this._callbackList[eventIndex];
        if (item && item !== undefined && item !== null) {
            if (typeof item.callback === "function") {
                data.params = item.params;
                item.callback(data);
            };
            if (checkbool(item.autoRelease)) {
                this._removeEvent(eventIndex);
            };
        };
    },

    removeAllListener: function() {
        for (let eventIndex in this._callbackList) {
            this._removeEvent(eventIndex);
        };
    },

    _removeEvent: function(eventIndex) {
        this._callbackList[eventIndex] = null;
    },
     
});

