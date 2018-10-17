/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.pk = (function() {

    /**
     * Namespace pk.
     * @exports pk
     * @namespace
     */
    var pk = {};

    pk.MatchRequest = (function() {

        /**
         * Properties of a MatchRequest.
         * @memberof pk
         * @interface IMatchRequest
         * @property {string} accountName MatchRequest accountName
         */

        /**
         * Constructs a new MatchRequest.
         * @memberof pk
         * @classdesc Represents a MatchRequest.
         * @implements IMatchRequest
         * @constructor
         * @param {pk.IMatchRequest=} [properties] Properties to set
         */
        function MatchRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchRequest accountName.
         * @member {string} accountName
         * @memberof pk.MatchRequest
         * @instance
         */
        MatchRequest.prototype.accountName = "";

        /**
         * Creates a new MatchRequest instance using the specified properties.
         * @function create
         * @memberof pk.MatchRequest
         * @static
         * @param {pk.IMatchRequest=} [properties] Properties to set
         * @returns {pk.MatchRequest} MatchRequest instance
         */
        MatchRequest.create = function create(properties) {
            return new MatchRequest(properties);
        };

        /**
         * Encodes the specified MatchRequest message. Does not implicitly {@link pk.MatchRequest.verify|verify} messages.
         * @function encode
         * @memberof pk.MatchRequest
         * @static
         * @param {pk.IMatchRequest} message MatchRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.accountName);
            return writer;
        };

        /**
         * Encodes the specified MatchRequest message, length delimited. Does not implicitly {@link pk.MatchRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pk.MatchRequest
         * @static
         * @param {pk.IMatchRequest} message MatchRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchRequest message from the specified reader or buffer.
         * @function decode
         * @memberof pk.MatchRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pk.MatchRequest} MatchRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pk.MatchRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.accountName = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("accountName"))
                throw $util.ProtocolError("missing required 'accountName'", { instance: message });
            return message;
        };

        /**
         * Decodes a MatchRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pk.MatchRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pk.MatchRequest} MatchRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchRequest message.
         * @function verify
         * @memberof pk.MatchRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MatchRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.accountName))
                return "accountName: string expected";
            return null;
        };

        /**
         * Creates a MatchRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pk.MatchRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pk.MatchRequest} MatchRequest
         */
        MatchRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.pk.MatchRequest)
                return object;
            var message = new $root.pk.MatchRequest();
            if (object.accountName != null)
                message.accountName = String(object.accountName);
            return message;
        };

        /**
         * Creates a plain object from a MatchRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pk.MatchRequest
         * @static
         * @param {pk.MatchRequest} message MatchRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MatchRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.accountName = "";
            if (message.accountName != null && message.hasOwnProperty("accountName"))
                object.accountName = message.accountName;
            return object;
        };

        /**
         * Converts this MatchRequest to JSON.
         * @function toJSON
         * @memberof pk.MatchRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MatchRequest;
    })();

    pk.EnterInfo = (function() {

        /**
         * Properties of an EnterInfo.
         * @memberof pk
         * @interface IEnterInfo
         * @property {string} accountName EnterInfo accountName
         * @property {number} roomId EnterInfo roomId
         */

        /**
         * Constructs a new EnterInfo.
         * @memberof pk
         * @classdesc Represents an EnterInfo.
         * @implements IEnterInfo
         * @constructor
         * @param {pk.IEnterInfo=} [properties] Properties to set
         */
        function EnterInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnterInfo accountName.
         * @member {string} accountName
         * @memberof pk.EnterInfo
         * @instance
         */
        EnterInfo.prototype.accountName = "";

        /**
         * EnterInfo roomId.
         * @member {number} roomId
         * @memberof pk.EnterInfo
         * @instance
         */
        EnterInfo.prototype.roomId = 0;

        /**
         * Creates a new EnterInfo instance using the specified properties.
         * @function create
         * @memberof pk.EnterInfo
         * @static
         * @param {pk.IEnterInfo=} [properties] Properties to set
         * @returns {pk.EnterInfo} EnterInfo instance
         */
        EnterInfo.create = function create(properties) {
            return new EnterInfo(properties);
        };

        /**
         * Encodes the specified EnterInfo message. Does not implicitly {@link pk.EnterInfo.verify|verify} messages.
         * @function encode
         * @memberof pk.EnterInfo
         * @static
         * @param {pk.IEnterInfo} message EnterInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.accountName);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.roomId);
            return writer;
        };

        /**
         * Encodes the specified EnterInfo message, length delimited. Does not implicitly {@link pk.EnterInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pk.EnterInfo
         * @static
         * @param {pk.IEnterInfo} message EnterInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnterInfo message from the specified reader or buffer.
         * @function decode
         * @memberof pk.EnterInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pk.EnterInfo} EnterInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pk.EnterInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.accountName = reader.string();
                    break;
                case 2:
                    message.roomId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("accountName"))
                throw $util.ProtocolError("missing required 'accountName'", { instance: message });
            if (!message.hasOwnProperty("roomId"))
                throw $util.ProtocolError("missing required 'roomId'", { instance: message });
            return message;
        };

        /**
         * Decodes an EnterInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pk.EnterInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pk.EnterInfo} EnterInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnterInfo message.
         * @function verify
         * @memberof pk.EnterInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnterInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.accountName))
                return "accountName: string expected";
            if (!$util.isInteger(message.roomId))
                return "roomId: integer expected";
            return null;
        };

        /**
         * Creates an EnterInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pk.EnterInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pk.EnterInfo} EnterInfo
         */
        EnterInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.pk.EnterInfo)
                return object;
            var message = new $root.pk.EnterInfo();
            if (object.accountName != null)
                message.accountName = String(object.accountName);
            if (object.roomId != null)
                message.roomId = object.roomId | 0;
            return message;
        };

        /**
         * Creates a plain object from an EnterInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pk.EnterInfo
         * @static
         * @param {pk.EnterInfo} message EnterInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnterInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.accountName = "";
                object.roomId = 0;
            }
            if (message.accountName != null && message.hasOwnProperty("accountName"))
                object.accountName = message.accountName;
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            return object;
        };

        /**
         * Converts this EnterInfo to JSON.
         * @function toJSON
         * @memberof pk.EnterInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnterInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EnterInfo;
    })();

    pk.StepInfo = (function() {

        /**
         * Properties of a StepInfo.
         * @memberof pk
         * @interface IStepInfo
         * @property {string} accountName StepInfo accountName
         * @property {number} step StepInfo step
         */

        /**
         * Constructs a new StepInfo.
         * @memberof pk
         * @classdesc Represents a StepInfo.
         * @implements IStepInfo
         * @constructor
         * @param {pk.IStepInfo=} [properties] Properties to set
         */
        function StepInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StepInfo accountName.
         * @member {string} accountName
         * @memberof pk.StepInfo
         * @instance
         */
        StepInfo.prototype.accountName = "";

        /**
         * StepInfo step.
         * @member {number} step
         * @memberof pk.StepInfo
         * @instance
         */
        StepInfo.prototype.step = 0;

        /**
         * Creates a new StepInfo instance using the specified properties.
         * @function create
         * @memberof pk.StepInfo
         * @static
         * @param {pk.IStepInfo=} [properties] Properties to set
         * @returns {pk.StepInfo} StepInfo instance
         */
        StepInfo.create = function create(properties) {
            return new StepInfo(properties);
        };

        /**
         * Encodes the specified StepInfo message. Does not implicitly {@link pk.StepInfo.verify|verify} messages.
         * @function encode
         * @memberof pk.StepInfo
         * @static
         * @param {pk.IStepInfo} message StepInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StepInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.accountName);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.step);
            return writer;
        };

        /**
         * Encodes the specified StepInfo message, length delimited. Does not implicitly {@link pk.StepInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pk.StepInfo
         * @static
         * @param {pk.IStepInfo} message StepInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StepInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StepInfo message from the specified reader or buffer.
         * @function decode
         * @memberof pk.StepInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pk.StepInfo} StepInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StepInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pk.StepInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.accountName = reader.string();
                    break;
                case 2:
                    message.step = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("accountName"))
                throw $util.ProtocolError("missing required 'accountName'", { instance: message });
            if (!message.hasOwnProperty("step"))
                throw $util.ProtocolError("missing required 'step'", { instance: message });
            return message;
        };

        /**
         * Decodes a StepInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pk.StepInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pk.StepInfo} StepInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StepInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StepInfo message.
         * @function verify
         * @memberof pk.StepInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StepInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.accountName))
                return "accountName: string expected";
            if (!$util.isInteger(message.step))
                return "step: integer expected";
            return null;
        };

        /**
         * Creates a StepInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pk.StepInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pk.StepInfo} StepInfo
         */
        StepInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.pk.StepInfo)
                return object;
            var message = new $root.pk.StepInfo();
            if (object.accountName != null)
                message.accountName = String(object.accountName);
            if (object.step != null)
                message.step = object.step | 0;
            return message;
        };

        /**
         * Creates a plain object from a StepInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pk.StepInfo
         * @static
         * @param {pk.StepInfo} message StepInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StepInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.accountName = "";
                object.step = 0;
            }
            if (message.accountName != null && message.hasOwnProperty("accountName"))
                object.accountName = message.accountName;
            if (message.step != null && message.hasOwnProperty("step"))
                object.step = message.step;
            return object;
        };

        /**
         * Converts this StepInfo to JSON.
         * @function toJSON
         * @memberof pk.StepInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StepInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StepInfo;
    })();

    pk.RoomInfo = (function() {

        /**
         * Properties of a RoomInfo.
         * @memberof pk
         * @interface IRoomInfo
         * @property {number} endTime RoomInfo endTime
         * @property {Array.<pk.RoomInfo.IPlayers>|null} [players] RoomInfo players
         */

        /**
         * Constructs a new RoomInfo.
         * @memberof pk
         * @classdesc Represents a RoomInfo.
         * @implements IRoomInfo
         * @constructor
         * @param {pk.IRoomInfo=} [properties] Properties to set
         */
        function RoomInfo(properties) {
            this.players = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomInfo endTime.
         * @member {number} endTime
         * @memberof pk.RoomInfo
         * @instance
         */
        RoomInfo.prototype.endTime = 0;

        /**
         * RoomInfo players.
         * @member {Array.<pk.RoomInfo.IPlayers>} players
         * @memberof pk.RoomInfo
         * @instance
         */
        RoomInfo.prototype.players = $util.emptyArray;

        /**
         * Creates a new RoomInfo instance using the specified properties.
         * @function create
         * @memberof pk.RoomInfo
         * @static
         * @param {pk.IRoomInfo=} [properties] Properties to set
         * @returns {pk.RoomInfo} RoomInfo instance
         */
        RoomInfo.create = function create(properties) {
            return new RoomInfo(properties);
        };

        /**
         * Encodes the specified RoomInfo message. Does not implicitly {@link pk.RoomInfo.verify|verify} messages.
         * @function encode
         * @memberof pk.RoomInfo
         * @static
         * @param {pk.IRoomInfo} message RoomInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 1 =*/9).double(message.endTime);
            if (message.players != null && message.players.length)
                for (var i = 0; i < message.players.length; ++i)
                    $root.pk.RoomInfo.Players.encode(message.players[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RoomInfo message, length delimited. Does not implicitly {@link pk.RoomInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pk.RoomInfo
         * @static
         * @param {pk.IRoomInfo} message RoomInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomInfo message from the specified reader or buffer.
         * @function decode
         * @memberof pk.RoomInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pk.RoomInfo} RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pk.RoomInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.endTime = reader.double();
                    break;
                case 2:
                    if (!(message.players && message.players.length))
                        message.players = [];
                    message.players.push($root.pk.RoomInfo.Players.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("endTime"))
                throw $util.ProtocolError("missing required 'endTime'", { instance: message });
            return message;
        };

        /**
         * Decodes a RoomInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pk.RoomInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pk.RoomInfo} RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomInfo message.
         * @function verify
         * @memberof pk.RoomInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (typeof message.endTime !== "number")
                return "endTime: number expected";
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (var i = 0; i < message.players.length; ++i) {
                    var error = $root.pk.RoomInfo.Players.verify(message.players[i]);
                    if (error)
                        return "players." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RoomInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pk.RoomInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pk.RoomInfo} RoomInfo
         */
        RoomInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.pk.RoomInfo)
                return object;
            var message = new $root.pk.RoomInfo();
            if (object.endTime != null)
                message.endTime = Number(object.endTime);
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".pk.RoomInfo.players: array expected");
                message.players = [];
                for (var i = 0; i < object.players.length; ++i) {
                    if (typeof object.players[i] !== "object")
                        throw TypeError(".pk.RoomInfo.players: object expected");
                    message.players[i] = $root.pk.RoomInfo.Players.fromObject(object.players[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a RoomInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pk.RoomInfo
         * @static
         * @param {pk.RoomInfo} message RoomInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.players = [];
            if (options.defaults)
                object.endTime = 0;
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                object.endTime = options.json && !isFinite(message.endTime) ? String(message.endTime) : message.endTime;
            if (message.players && message.players.length) {
                object.players = [];
                for (var j = 0; j < message.players.length; ++j)
                    object.players[j] = $root.pk.RoomInfo.Players.toObject(message.players[j], options);
            }
            return object;
        };

        /**
         * Converts this RoomInfo to JSON.
         * @function toJSON
         * @memberof pk.RoomInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        RoomInfo.Players = (function() {

            /**
             * Properties of a Players.
             * @memberof pk.RoomInfo
             * @interface IPlayers
             * @property {string} accountName Players accountName
             * @property {string} nickname Players nickname
             * @property {string} avatar Players avatar
             */

            /**
             * Constructs a new Players.
             * @memberof pk.RoomInfo
             * @classdesc Represents a Players.
             * @implements IPlayers
             * @constructor
             * @param {pk.RoomInfo.IPlayers=} [properties] Properties to set
             */
            function Players(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Players accountName.
             * @member {string} accountName
             * @memberof pk.RoomInfo.Players
             * @instance
             */
            Players.prototype.accountName = "";

            /**
             * Players nickname.
             * @member {string} nickname
             * @memberof pk.RoomInfo.Players
             * @instance
             */
            Players.prototype.nickname = "";

            /**
             * Players avatar.
             * @member {string} avatar
             * @memberof pk.RoomInfo.Players
             * @instance
             */
            Players.prototype.avatar = "";

            /**
             * Creates a new Players instance using the specified properties.
             * @function create
             * @memberof pk.RoomInfo.Players
             * @static
             * @param {pk.RoomInfo.IPlayers=} [properties] Properties to set
             * @returns {pk.RoomInfo.Players} Players instance
             */
            Players.create = function create(properties) {
                return new Players(properties);
            };

            /**
             * Encodes the specified Players message. Does not implicitly {@link pk.RoomInfo.Players.verify|verify} messages.
             * @function encode
             * @memberof pk.RoomInfo.Players
             * @static
             * @param {pk.RoomInfo.IPlayers} message Players message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Players.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.accountName);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nickname);
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.avatar);
                return writer;
            };

            /**
             * Encodes the specified Players message, length delimited. Does not implicitly {@link pk.RoomInfo.Players.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pk.RoomInfo.Players
             * @static
             * @param {pk.RoomInfo.IPlayers} message Players message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Players.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Players message from the specified reader or buffer.
             * @function decode
             * @memberof pk.RoomInfo.Players
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pk.RoomInfo.Players} Players
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Players.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pk.RoomInfo.Players();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.accountName = reader.string();
                        break;
                    case 2:
                        message.nickname = reader.string();
                        break;
                    case 3:
                        message.avatar = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("accountName"))
                    throw $util.ProtocolError("missing required 'accountName'", { instance: message });
                if (!message.hasOwnProperty("nickname"))
                    throw $util.ProtocolError("missing required 'nickname'", { instance: message });
                if (!message.hasOwnProperty("avatar"))
                    throw $util.ProtocolError("missing required 'avatar'", { instance: message });
                return message;
            };

            /**
             * Decodes a Players message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pk.RoomInfo.Players
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pk.RoomInfo.Players} Players
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Players.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Players message.
             * @function verify
             * @memberof pk.RoomInfo.Players
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Players.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.accountName))
                    return "accountName: string expected";
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
                if (!$util.isString(message.avatar))
                    return "avatar: string expected";
                return null;
            };

            /**
             * Creates a Players message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pk.RoomInfo.Players
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pk.RoomInfo.Players} Players
             */
            Players.fromObject = function fromObject(object) {
                if (object instanceof $root.pk.RoomInfo.Players)
                    return object;
                var message = new $root.pk.RoomInfo.Players();
                if (object.accountName != null)
                    message.accountName = String(object.accountName);
                if (object.nickname != null)
                    message.nickname = String(object.nickname);
                if (object.avatar != null)
                    message.avatar = String(object.avatar);
                return message;
            };

            /**
             * Creates a plain object from a Players message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pk.RoomInfo.Players
             * @static
             * @param {pk.RoomInfo.Players} message Players
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Players.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.accountName = "";
                    object.nickname = "";
                    object.avatar = "";
                }
                if (message.accountName != null && message.hasOwnProperty("accountName"))
                    object.accountName = message.accountName;
                if (message.nickname != null && message.hasOwnProperty("nickname"))
                    object.nickname = message.nickname;
                if (message.avatar != null && message.hasOwnProperty("avatar"))
                    object.avatar = message.avatar;
                return object;
            };

            /**
             * Converts this Players to JSON.
             * @function toJSON
             * @memberof pk.RoomInfo.Players
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Players.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Players;
        })();

        return RoomInfo;
    })();

    return pk;
})();

module.exports = $root;
