/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.auth = (function() {

    /**
     * Namespace auth.
     * @exports auth
     * @namespace
     */
    var auth = {};

    auth.AuthRequest = (function() {

        /**
         * Properties of an AuthRequest.
         * @memberof auth
         * @interface IAuthRequest
         * @property {string} accountName AuthRequest accountName
         */

        /**
         * Constructs a new AuthRequest.
         * @memberof auth
         * @classdesc Represents an AuthRequest.
         * @implements IAuthRequest
         * @constructor
         * @param {auth.IAuthRequest=} [properties] Properties to set
         */
        function AuthRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AuthRequest accountName.
         * @member {string} accountName
         * @memberof auth.AuthRequest
         * @instance
         */
        AuthRequest.prototype.accountName = "";

        /**
         * Creates a new AuthRequest instance using the specified properties.
         * @function create
         * @memberof auth.AuthRequest
         * @static
         * @param {auth.IAuthRequest=} [properties] Properties to set
         * @returns {auth.AuthRequest} AuthRequest instance
         */
        AuthRequest.create = function create(properties) {
            return new AuthRequest(properties);
        };

        /**
         * Encodes the specified AuthRequest message. Does not implicitly {@link auth.AuthRequest.verify|verify} messages.
         * @function encode
         * @memberof auth.AuthRequest
         * @static
         * @param {auth.IAuthRequest} message AuthRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AuthRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.accountName);
            return writer;
        };

        /**
         * Encodes the specified AuthRequest message, length delimited. Does not implicitly {@link auth.AuthRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof auth.AuthRequest
         * @static
         * @param {auth.IAuthRequest} message AuthRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AuthRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AuthRequest message from the specified reader or buffer.
         * @function decode
         * @memberof auth.AuthRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {auth.AuthRequest} AuthRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AuthRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.AuthRequest();
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
         * Decodes an AuthRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof auth.AuthRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {auth.AuthRequest} AuthRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AuthRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AuthRequest message.
         * @function verify
         * @memberof auth.AuthRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AuthRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.accountName))
                return "accountName: string expected";
            return null;
        };

        /**
         * Creates an AuthRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof auth.AuthRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {auth.AuthRequest} AuthRequest
         */
        AuthRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.auth.AuthRequest)
                return object;
            var message = new $root.auth.AuthRequest();
            if (object.accountName != null)
                message.accountName = String(object.accountName);
            return message;
        };

        /**
         * Creates a plain object from an AuthRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof auth.AuthRequest
         * @static
         * @param {auth.AuthRequest} message AuthRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AuthRequest.toObject = function toObject(message, options) {
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
         * Converts this AuthRequest to JSON.
         * @function toJSON
         * @memberof auth.AuthRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AuthRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AuthRequest;
    })();

    auth.ServerTime = (function() {

        /**
         * Properties of a ServerTime.
         * @memberof auth
         * @interface IServerTime
         * @property {number} time ServerTime time
         */

        /**
         * Constructs a new ServerTime.
         * @memberof auth
         * @classdesc Represents a ServerTime.
         * @implements IServerTime
         * @constructor
         * @param {auth.IServerTime=} [properties] Properties to set
         */
        function ServerTime(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServerTime time.
         * @member {number} time
         * @memberof auth.ServerTime
         * @instance
         */
        ServerTime.prototype.time = 0;

        /**
         * Creates a new ServerTime instance using the specified properties.
         * @function create
         * @memberof auth.ServerTime
         * @static
         * @param {auth.IServerTime=} [properties] Properties to set
         * @returns {auth.ServerTime} ServerTime instance
         */
        ServerTime.create = function create(properties) {
            return new ServerTime(properties);
        };

        /**
         * Encodes the specified ServerTime message. Does not implicitly {@link auth.ServerTime.verify|verify} messages.
         * @function encode
         * @memberof auth.ServerTime
         * @static
         * @param {auth.IServerTime} message ServerTime message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerTime.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 1 =*/9).double(message.time);
            return writer;
        };

        /**
         * Encodes the specified ServerTime message, length delimited. Does not implicitly {@link auth.ServerTime.verify|verify} messages.
         * @function encodeDelimited
         * @memberof auth.ServerTime
         * @static
         * @param {auth.IServerTime} message ServerTime message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerTime.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ServerTime message from the specified reader or buffer.
         * @function decode
         * @memberof auth.ServerTime
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {auth.ServerTime} ServerTime
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerTime.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.ServerTime();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.time = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("time"))
                throw $util.ProtocolError("missing required 'time'", { instance: message });
            return message;
        };

        /**
         * Decodes a ServerTime message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof auth.ServerTime
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {auth.ServerTime} ServerTime
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerTime.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServerTime message.
         * @function verify
         * @memberof auth.ServerTime
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServerTime.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (typeof message.time !== "number")
                return "time: number expected";
            return null;
        };

        /**
         * Creates a ServerTime message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof auth.ServerTime
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {auth.ServerTime} ServerTime
         */
        ServerTime.fromObject = function fromObject(object) {
            if (object instanceof $root.auth.ServerTime)
                return object;
            var message = new $root.auth.ServerTime();
            if (object.time != null)
                message.time = Number(object.time);
            return message;
        };

        /**
         * Creates a plain object from a ServerTime message. Also converts values to other types if specified.
         * @function toObject
         * @memberof auth.ServerTime
         * @static
         * @param {auth.ServerTime} message ServerTime
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServerTime.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.time = 0;
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = options.json && !isFinite(message.time) ? String(message.time) : message.time;
            return object;
        };

        /**
         * Converts this ServerTime to JSON.
         * @function toJSON
         * @memberof auth.ServerTime
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServerTime.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ServerTime;
    })();

    return auth;
})();

module.exports = $root;
