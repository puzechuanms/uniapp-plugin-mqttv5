import {
  __commonJS,
  __require
} from "./chunk-TDUMLE5V.js";

// D:/mqtt/mqttv5PluginForUniapp/mqttDemo/node_modules/mqtt/dist/mqtt.min.js
var require_mqtt_min = __commonJS({
  "D:/mqtt/mqttv5PluginForUniapp/mqttDemo/node_modules/mqtt/dist/mqtt.min.js"(exports, module) {
    !function(e) {
      if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
      else if ("function" == typeof define && define.amd)
        define([], e);
      else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).mqtt = e();
      }
    }(function() {
      return (/* @__PURE__ */ function() {
        return function e(t, r, n) {
          function i(s2, a) {
            if (!r[s2]) {
              if (!t[s2]) {
                var l = "function" == typeof __require && __require;
                if (!a && l)
                  return l(s2, true);
                if (o)
                  return o(s2, true);
                var u = new Error("Cannot find module '" + s2 + "'");
                throw u.code = "MODULE_NOT_FOUND", u;
              }
              var c = r[s2] = { exports: {} };
              t[s2][0].call(c.exports, function(e2) {
                return i(t[s2][1][e2] || e2);
              }, c, c.exports, e, t, r, n);
            }
            return r[s2].exports;
          }
          for (var o = "function" == typeof __require && __require, s = 0; s < n.length; s++)
            i(n[s]);
          return i;
        };
      }())({ 1: [function(e, t, r) {
        (function(r2, n) {
          (function() {
            "use strict";
            const i = e("events").EventEmitter, o = e("./store"), s = e("./topic-alias-recv"), a = e("./topic-alias-send"), l = e("mqtt-packet"), u = e("./default-message-id-provider"), c = e("readable-stream").Writable, h = e("inherits"), f = e("reinterval"), p = e("rfdc/default"), d = e("./validations"), g = e("xtend"), y = e("debug")("mqttjs:client"), b = r2 ? r2.nextTick : function(e2) {
              setTimeout(e2, 0);
            }, m = n.setImmediate || function(e2) {
              b(e2);
            }, v = { keepalive: 60, reschedulePings: true, protocolId: "MQTT", protocolVersion: 4, reconnectPeriod: 1e3, connectTimeout: 3e4, clean: true, resubscribe: true }, w = ["ECONNREFUSED", "EADDRINUSE", "ECONNRESET", "ENOTFOUND"], _ = { 0: "", 1: "Unacceptable protocol version", 2: "Identifier rejected", 3: "Server unavailable", 4: "Bad username or password", 5: "Not authorized", 16: "No matching subscribers", 17: "No subscription existed", 128: "Unspecified error", 129: "Malformed Packet", 130: "Protocol Error", 131: "Implementation specific error", 132: "Unsupported Protocol Version", 133: "Client Identifier not valid", 134: "Bad User Name or Password", 135: "Not authorized", 136: "Server unavailable", 137: "Server busy", 138: "Banned", 139: "Server shutting down", 140: "Bad authentication method", 141: "Keep Alive timeout", 142: "Session taken over", 143: "Topic Filter invalid", 144: "Topic Name invalid", 145: "Packet identifier in use", 146: "Packet Identifier not found", 147: "Receive Maximum exceeded", 148: "Topic Alias invalid", 149: "Packet too large", 150: "Message rate too high", 151: "Quota exceeded", 152: "Administrative action", 153: "Payload format invalid", 154: "Retain not supported", 155: "QoS not supported", 156: "Use another server", 157: "Server moved", 158: "Shared Subscriptions not supported", 159: "Connection rate exceeded", 160: "Maximum connect time", 161: "Subscription Identifiers not supported", 162: "Wildcard Subscriptions not supported" };
            function k(e2, t2) {
              let r3;
              t2.properties && (r3 = t2.properties.topicAlias);
              let n2 = t2.topic.toString();
              if (0 === n2.length) {
                if (void 0 === r3)
                  return new Error("Unregistered Topic Alias");
                if (void 0 === (n2 = e2.topicAliasSend.getTopicByAlias(r3)))
                  return new Error("Unregistered Topic Alias");
                t2.topic = n2;
              }
              r3 && delete t2.properties.topicAlias;
            }
            function S(e2, t2, r3) {
              y("sendPacket :: packet: %O", t2), y("sendPacket :: emitting `packetsend`"), e2.emit("packetsend", t2), y("sendPacket :: writing to stream");
              const n2 = l.writeToStream(t2, e2.stream, e2.options);
              y("sendPacket :: writeToStream result %s", n2), !n2 && r3 && r3 !== C ? (y("sendPacket :: handle events on `drain` once through callback."), e2.stream.once("drain", r3)) : r3 && (y("sendPacket :: invoking cb"), r3());
            }
            function E(e2, t2, r3, n2) {
              y("storeAndSend :: store packet with cmd %s to outgoingStore", t2.cmd);
              let i2, o2 = t2;
              if ("publish" === o2.cmd && (o2 = p(t2), i2 = k(e2, o2)))
                return r3 && r3(i2);
              e2.outgoingStore.put(o2, function(i3) {
                if (i3)
                  return r3 && r3(i3);
                n2(), S(e2, t2, r3);
              });
            }
            function C(e2) {
              y("nop ::", e2);
            }
            function T(e2, t2) {
              let r3;
              const n2 = this;
              if (!(this instanceof T))
                return new T(e2, t2);
              for (r3 in this.options = t2 || {}, v)
                void 0 === this.options[r3] ? this.options[r3] = v[r3] : this.options[r3] = t2[r3];
              y("MqttClient :: options.protocol", t2.protocol), y("MqttClient :: options.protocolVersion", t2.protocolVersion), y("MqttClient :: options.username", t2.username), y("MqttClient :: options.keepalive", t2.keepalive), y("MqttClient :: options.reconnectPeriod", t2.reconnectPeriod), y("MqttClient :: options.rejectUnauthorized", t2.rejectUnauthorized), y("MqttClient :: options.topicAliasMaximum", t2.topicAliasMaximum), this.options.clientId = "string" == typeof t2.clientId ? t2.clientId : "mqttjs_" + Math.random().toString(16).substr(2, 8), y("MqttClient :: clientId", this.options.clientId), this.options.customHandleAcks = 5 === t2.protocolVersion && t2.customHandleAcks ? t2.customHandleAcks : function() {
                arguments[3](0);
              }, this.streamBuilder = e2, this.messageIdProvider = void 0 === this.options.messageIdProvider ? new u() : this.options.messageIdProvider, this.outgoingStore = t2.outgoingStore || new o(), this.incomingStore = t2.incomingStore || new o(), this.queueQoSZero = void 0 === t2.queueQoSZero || t2.queueQoSZero, this._resubscribeTopics = {}, this.messageIdToTopic = {}, this.pingTimer = null, this.connected = false, this.disconnecting = false, this.queue = [], this.connackTimer = null, this.reconnectTimer = null, this._storeProcessing = false, this._packetIdsDuringStoreProcessing = {}, this._storeProcessingQueue = [], this.outgoing = {}, this._firstConnection = true, t2.topicAliasMaximum > 0 && (t2.topicAliasMaximum > 65535 ? y("MqttClient :: options.topicAliasMaximum is out of range") : this.topicAliasRecv = new s(t2.topicAliasMaximum)), this.on("connect", function() {
                const e3 = this.queue;
                y("connect :: sending queued packets"), function t3() {
                  const r4 = e3.shift();
                  y("deliver :: entry %o", r4);
                  let i2 = null;
                  if (!r4)
                    return void n2._resubscribe();
                  i2 = r4.packet, y("deliver :: call _sendPacket for %o", i2);
                  let o2 = true;
                  i2.messageId && 0 !== i2.messageId && (n2.messageIdProvider.register(i2.messageId) || (o2 = false)), o2 ? n2._sendPacket(i2, function(e4) {
                    r4.cb && r4.cb(e4), t3();
                  }) : (y("messageId: %d has already used. The message is skipped and removed.", i2.messageId), t3());
                }();
              }), this.on("close", function() {
                y("close :: connected set to `false`"), this.connected = false, y("close :: clearing connackTimer"), clearTimeout(this.connackTimer), y("close :: clearing ping timer"), null !== n2.pingTimer && (n2.pingTimer.clear(), n2.pingTimer = null), this.topicAliasRecv && this.topicAliasRecv.clear(), y("close :: calling _setupReconnect"), this._setupReconnect();
              }), i.call(this), y("MqttClient :: setting up stream"), this._setupStream();
            }
            h(T, i), T.prototype._setupStream = function() {
              const e2 = this, t2 = new c(), r3 = l.parser(this.options);
              let n2 = null;
              const i2 = [];
              function o2() {
                if (i2.length)
                  b(s2);
                else {
                  const e3 = n2;
                  n2 = null, e3();
                }
              }
              function s2() {
                y("work :: getting next packet in queue");
                const t3 = i2.shift();
                if (t3)
                  y("work :: packet pulled from queue"), e2._handlePacket(t3, o2);
                else {
                  y("work :: no packets in queue");
                  const e3 = n2;
                  n2 = null, y("work :: done flag is %s", !!e3), e3 && e3();
                }
              }
              y("_setupStream :: calling method to clear reconnect"), this._clearReconnect(), y("_setupStream :: using streamBuilder provided to client to create stream"), this.stream = this.streamBuilder(this), r3.on("packet", function(e3) {
                y("parser :: on packet push to packets array."), i2.push(e3);
              }), t2._write = function(e3, t3, i3) {
                n2 = i3, y("writable stream :: parsing buffer"), r3.parse(e3), s2();
              }, y("_setupStream :: pipe stream to writable stream"), this.stream.pipe(t2), this.stream.on("error", function(t3) {
                y("streamErrorHandler :: error", t3.message), w.includes(t3.code) ? (y("streamErrorHandler :: emitting error"), e2.emit("error", t3)) : C(t3);
              }), this.stream.on("close", function() {
                var t3;
                y("(%s)stream :: on close", e2.options.clientId), (t3 = e2.outgoing) && (y("flushVolatile :: deleting volatile messages from the queue and setting their callbacks as error function"), Object.keys(t3).forEach(function(e3) {
                  t3[e3].volatile && "function" == typeof t3[e3].cb && (t3[e3].cb(new Error("Connection closed")), delete t3[e3]);
                })), y("stream: emit close to MqttClient"), e2.emit("close");
              }), y("_setupStream: sending packet `connect`");
              const a2 = Object.create(this.options);
              if (a2.cmd = "connect", this.topicAliasRecv && (a2.properties || (a2.properties = {}), this.topicAliasRecv && (a2.properties.topicAliasMaximum = this.topicAliasRecv.max)), S(this, a2), r3.on("error", this.emit.bind(this, "error")), this.options.properties) {
                if (!this.options.properties.authenticationMethod && this.options.properties.authenticationData)
                  return e2.end(() => this.emit("error", new Error("Packet has no Authentication Method"))), this;
                if (this.options.properties.authenticationMethod && this.options.authPacket && "object" == typeof this.options.authPacket) {
                  S(this, g({ cmd: "auth", reasonCode: 0 }, this.options.authPacket));
                }
              }
              this.stream.setMaxListeners(1e3), clearTimeout(this.connackTimer), this.connackTimer = setTimeout(function() {
                y("!!connectTimeout hit!! Calling _cleanUp with force `true`"), e2._cleanUp(true);
              }, this.options.connectTimeout);
            }, T.prototype._handlePacket = function(e2, t2) {
              const r3 = this.options;
              if (5 === r3.protocolVersion && r3.properties && r3.properties.maximumPacketSize && r3.properties.maximumPacketSize < e2.length)
                return this.emit("error", new Error("exceeding packets size " + e2.cmd)), this.end({ reasonCode: 149, properties: { reasonString: "Maximum packet size was exceeded" } }), this;
              switch (y("_handlePacket :: emitting packetreceive"), this.emit("packetreceive", e2), e2.cmd) {
                case "publish":
                  this._handlePublish(e2, t2);
                  break;
                case "puback":
                case "pubrec":
                case "pubcomp":
                case "suback":
                case "unsuback":
                  this._handleAck(e2), t2();
                  break;
                case "pubrel":
                  this._handlePubrel(e2, t2);
                  break;
                case "connack":
                  this._handleConnack(e2), t2();
                  break;
                case "auth":
                  this._handleAuth(e2), t2();
                  break;
                case "pingresp":
                  this._handlePingresp(e2), t2();
                  break;
                case "disconnect":
                  this._handleDisconnect(e2), t2();
              }
            }, T.prototype._checkDisconnecting = function(e2) {
              return this.disconnecting && (e2 && e2 !== C ? e2(new Error("client disconnecting")) : this.emit("error", new Error("client disconnecting"))), this.disconnecting;
            }, T.prototype.publish = function(e2, t2, r3, n2) {
              y("publish :: message `%s` to topic `%s`", t2, e2);
              const i2 = this.options;
              "function" == typeof r3 && (n2 = r3, r3 = null);
              if (r3 = g({ qos: 0, retain: false, dup: false }, r3), this._checkDisconnecting(n2))
                return this;
              const o2 = this, s2 = function() {
                let s3 = 0;
                if ((1 === r3.qos || 2 === r3.qos) && null === (s3 = o2._nextId()))
                  return y("No messageId left"), false;
                const a2 = { cmd: "publish", topic: e2, payload: t2, qos: r3.qos, retain: r3.retain, messageId: s3, dup: r3.dup };
                switch (5 === i2.protocolVersion && (a2.properties = r3.properties), y("publish :: qos", r3.qos), r3.qos) {
                  case 1:
                  case 2:
                    o2.outgoing[a2.messageId] = { volatile: false, cb: n2 || C }, y("MqttClient:publish: packet cmd: %s", a2.cmd), o2._sendPacket(a2, void 0, r3.cbStorePut);
                    break;
                  default:
                    y("MqttClient:publish: packet cmd: %s", a2.cmd), o2._sendPacket(a2, n2, r3.cbStorePut);
                }
                return true;
              };
              return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !s2()) && this._storeProcessingQueue.push({ invoke: s2, cbStorePut: r3.cbStorePut, callback: n2 }), this;
            }, T.prototype.subscribe = function() {
              const e2 = this, t2 = new Array(arguments.length);
              for (let e3 = 0; e3 < arguments.length; e3++)
                t2[e3] = arguments[e3];
              const r3 = [];
              let n2 = t2.shift();
              const i2 = n2.resubscribe;
              let o2 = t2.pop() || C, s2 = t2.pop();
              const a2 = this.options.protocolVersion;
              delete n2.resubscribe, "string" == typeof n2 && (n2 = [n2]), "function" != typeof o2 && (s2 = o2, o2 = C);
              const l2 = d.validateTopics(n2);
              if (null !== l2)
                return m(o2, new Error("Invalid topic " + l2)), this;
              if (this._checkDisconnecting(o2))
                return y("subscribe: discconecting true"), this;
              const u2 = { qos: 0 };
              if (5 === a2 && (u2.nl = false, u2.rap = false, u2.rh = 0), s2 = g(u2, s2), Array.isArray(n2) ? n2.forEach(function(t3) {
                if (y("subscribe: array topic %s", t3), !Object.prototype.hasOwnProperty.call(e2._resubscribeTopics, t3) || e2._resubscribeTopics[t3].qos < s2.qos || i2) {
                  const e3 = { topic: t3, qos: s2.qos };
                  5 === a2 && (e3.nl = s2.nl, e3.rap = s2.rap, e3.rh = s2.rh, e3.properties = s2.properties), y("subscribe: pushing topic `%s` and qos `%s` to subs list", e3.topic, e3.qos), r3.push(e3);
                }
              }) : Object.keys(n2).forEach(function(t3) {
                if (y("subscribe: object topic %s", t3), !Object.prototype.hasOwnProperty.call(e2._resubscribeTopics, t3) || e2._resubscribeTopics[t3].qos < n2[t3].qos || i2) {
                  const e3 = { topic: t3, qos: n2[t3].qos };
                  5 === a2 && (e3.nl = n2[t3].nl, e3.rap = n2[t3].rap, e3.rh = n2[t3].rh, e3.properties = s2.properties), y("subscribe: pushing `%s` to subs list", e3), r3.push(e3);
                }
              }), !r3.length)
                return o2(null, []), this;
              const c2 = function() {
                const t3 = e2._nextId();
                if (null === t3)
                  return y("No messageId left"), false;
                const n3 = { cmd: "subscribe", subscriptions: r3, qos: 1, retain: false, dup: false, messageId: t3 };
                if (s2.properties && (n3.properties = s2.properties), e2.options.resubscribe) {
                  y("subscribe :: resubscribe true");
                  const t4 = [];
                  r3.forEach(function(r4) {
                    if (e2.options.reconnectPeriod > 0) {
                      const n4 = { qos: r4.qos };
                      5 === a2 && (n4.nl = r4.nl || false, n4.rap = r4.rap || false, n4.rh = r4.rh || 0, n4.properties = r4.properties), e2._resubscribeTopics[r4.topic] = n4, t4.push(r4.topic);
                    }
                  }), e2.messageIdToTopic[n3.messageId] = t4;
                }
                return e2.outgoing[n3.messageId] = { volatile: true, cb: function(e3, t4) {
                  if (!e3) {
                    const e4 = t4.granted;
                    for (let t5 = 0; t5 < e4.length; t5 += 1)
                      r3[t5].qos = e4[t5];
                  }
                  o2(e3, r3);
                } }, y("subscribe :: call _sendPacket"), e2._sendPacket(n3), true;
              };
              return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !c2()) && this._storeProcessingQueue.push({ invoke: c2, callback: o2 }), this;
            }, T.prototype.unsubscribe = function() {
              const e2 = this, t2 = new Array(arguments.length);
              for (let e3 = 0; e3 < arguments.length; e3++)
                t2[e3] = arguments[e3];
              let r3 = t2.shift(), n2 = t2.pop() || C, i2 = t2.pop();
              "string" == typeof r3 && (r3 = [r3]), "function" != typeof n2 && (i2 = n2, n2 = C);
              const o2 = d.validateTopics(r3);
              if (null !== o2)
                return m(n2, new Error("Invalid topic " + o2)), this;
              if (e2._checkDisconnecting(n2))
                return this;
              const s2 = function() {
                const t3 = e2._nextId();
                if (null === t3)
                  return y("No messageId left"), false;
                const o3 = { cmd: "unsubscribe", qos: 1, messageId: t3 };
                return "string" == typeof r3 ? o3.unsubscriptions = [r3] : Array.isArray(r3) && (o3.unsubscriptions = r3), e2.options.resubscribe && o3.unsubscriptions.forEach(function(t4) {
                  delete e2._resubscribeTopics[t4];
                }), "object" == typeof i2 && i2.properties && (o3.properties = i2.properties), e2.outgoing[o3.messageId] = { volatile: true, cb: n2 }, y("unsubscribe: call _sendPacket"), e2._sendPacket(o3), true;
              };
              return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !s2()) && this._storeProcessingQueue.push({ invoke: s2, callback: n2 }), this;
            }, T.prototype.end = function(e2, t2, r3) {
              const n2 = this;
              function i2() {
                y("end :: (%s) :: finish :: calling _cleanUp with force %s", n2.options.clientId, e2), n2._cleanUp(e2, () => {
                  y("end :: finish :: calling process.nextTick on closeStores"), b((function() {
                    y("end :: closeStores: closing incoming and outgoing stores"), n2.disconnected = true, n2.incomingStore.close(function(e3) {
                      n2.outgoingStore.close(function(t3) {
                        if (y("end :: closeStores: emitting end"), n2.emit("end"), r3) {
                          const n3 = e3 || t3;
                          y("end :: closeStores: invoking callback with args"), r3(n3);
                        }
                      });
                    }), n2._deferredReconnect && n2._deferredReconnect();
                  }).bind(n2));
                }, t2);
              }
              return y("end :: (%s)", this.options.clientId), null != e2 && "boolean" == typeof e2 || (r3 = t2 || C, t2 = e2, e2 = false, "object" != typeof t2 && (r3 = t2, t2 = null, "function" != typeof r3 && (r3 = C))), "object" != typeof t2 && (r3 = t2, t2 = null), y("end :: cb? %s", !!r3), r3 = r3 || C, this.disconnecting ? (r3(), this) : (this._clearReconnect(), this.disconnecting = true, !e2 && Object.keys(this.outgoing).length > 0 ? (y("end :: (%s) :: calling finish in 10ms once outgoing is empty", n2.options.clientId), this.once("outgoingEmpty", setTimeout.bind(null, i2, 10))) : (y("end :: (%s) :: immediately calling finish", n2.options.clientId), i2()), this);
            }, T.prototype.removeOutgoingMessage = function(e2) {
              const t2 = this.outgoing[e2] ? this.outgoing[e2].cb : null;
              return delete this.outgoing[e2], this.outgoingStore.del({ messageId: e2 }, function() {
                t2(new Error("Message removed"));
              }), this;
            }, T.prototype.reconnect = function(e2) {
              y("client reconnect");
              const t2 = this, r3 = function() {
                e2 ? (t2.options.incomingStore = e2.incomingStore, t2.options.outgoingStore = e2.outgoingStore) : (t2.options.incomingStore = null, t2.options.outgoingStore = null), t2.incomingStore = t2.options.incomingStore || new o(), t2.outgoingStore = t2.options.outgoingStore || new o(), t2.disconnecting = false, t2.disconnected = false, t2._deferredReconnect = null, t2._reconnect();
              };
              return this.disconnecting && !this.disconnected ? this._deferredReconnect = r3 : r3(), this;
            }, T.prototype._reconnect = function() {
              y("_reconnect: emitting reconnect to client"), this.emit("reconnect"), this.connected ? (this.end(() => {
                this._setupStream();
              }), y("client already connected. disconnecting first.")) : (y("_reconnect: calling _setupStream"), this._setupStream());
            }, T.prototype._setupReconnect = function() {
              const e2 = this;
              !e2.disconnecting && !e2.reconnectTimer && e2.options.reconnectPeriod > 0 ? (this.reconnecting || (y("_setupReconnect :: emit `offline` state"), this.emit("offline"), y("_setupReconnect :: set `reconnecting` to `true`"), this.reconnecting = true), y("_setupReconnect :: setting reconnectTimer for %d ms", e2.options.reconnectPeriod), e2.reconnectTimer = setInterval(function() {
                y("reconnectTimer :: reconnect triggered!"), e2._reconnect();
              }, e2.options.reconnectPeriod)) : y("_setupReconnect :: doing nothing...");
            }, T.prototype._clearReconnect = function() {
              y("_clearReconnect : clearing reconnect timer"), this.reconnectTimer && (clearInterval(this.reconnectTimer), this.reconnectTimer = null);
            }, T.prototype._cleanUp = function(e2, t2) {
              const r3 = arguments[2];
              if (t2 && (y("_cleanUp :: done callback provided for on stream close"), this.stream.on("close", t2)), y("_cleanUp :: forced? %s", e2), e2)
                0 === this.options.reconnectPeriod && this.options.clean && (n2 = this.outgoing) && (y("flush: queue exists? %b", !!n2), Object.keys(n2).forEach(function(e3) {
                  "function" == typeof n2[e3].cb && (n2[e3].cb(new Error("Connection closed")), delete n2[e3]);
                })), y("_cleanUp :: (%s) :: destroying stream", this.options.clientId), this.stream.destroy();
              else {
                const e3 = g({ cmd: "disconnect" }, r3);
                y("_cleanUp :: (%s) :: call _sendPacket with disconnect packet", this.options.clientId), this._sendPacket(e3, m.bind(null, this.stream.end.bind(this.stream)));
              }
              var n2;
              this.disconnecting || (y("_cleanUp :: client not disconnecting. Clearing and resetting reconnect."), this._clearReconnect(), this._setupReconnect()), null !== this.pingTimer && (y("_cleanUp :: clearing pingTimer"), this.pingTimer.clear(), this.pingTimer = null), t2 && !this.connected && (y("_cleanUp :: (%s) :: removing stream `done` callback `close` listener", this.options.clientId), this.stream.removeListener("close", t2), t2());
            }, T.prototype._sendPacket = function(e2, t2, r3) {
              y("_sendPacket :: (%s) ::  start", this.options.clientId), r3 = r3 || C, t2 = t2 || C;
              const n2 = function(e3, t3) {
                if (5 === e3.options.protocolVersion && "publish" === t3.cmd) {
                  let r4;
                  t3.properties && (r4 = t3.properties.topicAlias);
                  const n3 = t3.topic.toString();
                  if (e3.topicAliasSend)
                    if (r4) {
                      if (0 !== n3.length && (y("applyTopicAlias :: register topic: %s - alias: %d", n3, r4), !e3.topicAliasSend.put(n3, r4)))
                        return y("applyTopicAlias :: error out of range. topic: %s - alias: %d", n3, r4), new Error("Sending Topic Alias out of range");
                    } else
                      0 !== n3.length && (e3.options.autoAssignTopicAlias ? (r4 = e3.topicAliasSend.getAliasByTopic(n3)) ? (t3.topic = "", t3.properties = { ...t3.properties, topicAlias: r4 }, y("applyTopicAlias :: auto assign(use) topic: %s - alias: %d", n3, r4)) : (r4 = e3.topicAliasSend.getLruAlias(), e3.topicAliasSend.put(n3, r4), t3.properties = { ...t3.properties, topicAlias: r4 }, y("applyTopicAlias :: auto assign topic: %s - alias: %d", n3, r4)) : e3.options.autoUseTopicAlias && (r4 = e3.topicAliasSend.getAliasByTopic(n3)) && (t3.topic = "", t3.properties = { ...t3.properties, topicAlias: r4 }, y("applyTopicAlias :: auto use topic: %s - alias: %d", n3, r4)));
                  else if (r4)
                    return y("applyTopicAlias :: error out of range. topic: %s - alias: %d", n3, r4), new Error("Sending Topic Alias out of range");
                }
              }(this, e2);
              if (n2)
                t2(n2);
              else {
                if (!this.connected)
                  return "auth" === e2.cmd ? (this._shiftPingInterval(), void S(this, e2, t2)) : (y("_sendPacket :: client not connected. Storing packet offline."), void this._storePacket(e2, t2, r3));
                switch (this._shiftPingInterval(), e2.cmd) {
                  case "publish":
                    break;
                  case "pubrel":
                    return void E(this, e2, t2, r3);
                  default:
                    return void S(this, e2, t2);
                }
                switch (e2.qos) {
                  case 2:
                  case 1:
                    E(this, e2, t2, r3);
                    break;
                  case 0:
                  default:
                    S(this, e2, t2);
                }
                y("_sendPacket :: (%s) ::  end", this.options.clientId);
              }
            }, T.prototype._storePacket = function(e2, t2, r3) {
              y("_storePacket :: packet: %o", e2), y("_storePacket :: cb? %s", !!t2), r3 = r3 || C;
              let n2 = e2;
              if ("publish" === n2.cmd) {
                const r4 = k(this, n2 = p(e2));
                if (r4)
                  return t2 && t2(r4);
              }
              0 === (n2.qos || 0) && this.queueQoSZero || "publish" !== n2.cmd ? this.queue.push({ packet: n2, cb: t2 }) : n2.qos > 0 ? (t2 = this.outgoing[n2.messageId] ? this.outgoing[n2.messageId].cb : null, this.outgoingStore.put(n2, function(e3) {
                if (e3)
                  return t2 && t2(e3);
                r3();
              })) : t2 && t2(new Error("No connection to broker"));
            }, T.prototype._setupPingTimer = function() {
              y("_setupPingTimer :: keepalive %d (seconds)", this.options.keepalive);
              const e2 = this;
              !this.pingTimer && this.options.keepalive && (this.pingResp = true, this.pingTimer = f(function() {
                e2._checkPing();
              }, 1e3 * this.options.keepalive));
            }, T.prototype._shiftPingInterval = function() {
              this.pingTimer && this.options.keepalive && this.options.reschedulePings && this.pingTimer.reschedule(1e3 * this.options.keepalive);
            }, T.prototype._checkPing = function() {
              y("_checkPing :: checking ping..."), this.pingResp ? (y("_checkPing :: ping response received. Clearing flag and sending `pingreq`"), this.pingResp = false, this._sendPacket({ cmd: "pingreq" })) : (y("_checkPing :: calling _cleanUp with force true"), this._cleanUp(true));
            }, T.prototype._handlePingresp = function() {
              this.pingResp = true;
            }, T.prototype._handleConnack = function(e2) {
              y("_handleConnack");
              const t2 = this.options, r3 = 5 === t2.protocolVersion ? e2.reasonCode : e2.returnCode;
              if (clearTimeout(this.connackTimer), delete this.topicAliasSend, e2.properties) {
                if (e2.properties.topicAliasMaximum) {
                  if (e2.properties.topicAliasMaximum > 65535)
                    return void this.emit("error", new Error("topicAliasMaximum from broker is out of range"));
                  e2.properties.topicAliasMaximum > 0 && (this.topicAliasSend = new a(e2.properties.topicAliasMaximum));
                }
                e2.properties.serverKeepAlive && t2.keepalive && (t2.keepalive = e2.properties.serverKeepAlive, this._shiftPingInterval()), e2.properties.maximumPacketSize && (t2.properties || (t2.properties = {}), t2.properties.maximumPacketSize = e2.properties.maximumPacketSize);
              }
              if (0 === r3)
                this.reconnecting = false, this._onConnect(e2);
              else if (r3 > 0) {
                const e3 = new Error("Connection refused: " + _[r3]);
                e3.code = r3, this.emit("error", e3);
              }
            }, T.prototype._handleAuth = function(e2) {
              const t2 = this.options.protocolVersion, r3 = 5 === t2 ? e2.reasonCode : e2.returnCode;
              if (5 !== t2) {
                const e3 = new Error("Protocol error: Auth packets are only supported in MQTT 5. Your version:" + t2);
                return e3.code = r3, void this.emit("error", e3);
              }
              const n2 = this;
              this.handleAuth(e2, function(e3, t3) {
                if (e3)
                  n2.emit("error", e3);
                else if (24 === r3)
                  n2.reconnecting = false, n2._sendPacket(t3);
                else {
                  const t4 = new Error("Connection refused: " + _[r3]);
                  e3.code = r3, n2.emit("error", t4);
                }
              });
            }, T.prototype.handleAuth = function(e2, t2) {
              t2();
            }, T.prototype._handlePublish = function(e2, t2) {
              y("_handlePublish: packet %o", e2), t2 = void 0 !== t2 ? t2 : C;
              let r3 = e2.topic.toString();
              const n2 = e2.payload, i2 = e2.qos, o2 = e2.messageId, s2 = this, a2 = this.options, l2 = [0, 16, 128, 131, 135, 144, 145, 151, 153];
              if (5 === this.options.protocolVersion) {
                let t3;
                if (e2.properties && (t3 = e2.properties.topicAlias), void 0 !== t3)
                  if (0 === r3.length) {
                    if (!(t3 > 0 && t3 <= 65535))
                      return y("_handlePublish :: topic alias out of range. alias: %d", t3), void this.emit("error", new Error("Received Topic Alias is out of range"));
                    {
                      const e3 = this.topicAliasRecv.getTopicByAlias(t3);
                      if (!e3)
                        return y("_handlePublish :: unregistered topic alias. alias: %d", t3), void this.emit("error", new Error("Received unregistered Topic Alias"));
                      y("_handlePublish :: topic complemented by alias. topic: %s - alias: %d", r3 = e3, t3);
                    }
                  } else {
                    if (!this.topicAliasRecv.put(r3, t3))
                      return y("_handlePublish :: topic alias out of range. alias: %d", t3), void this.emit("error", new Error("Received Topic Alias is out of range"));
                    y("_handlePublish :: registered topic: %s - alias: %d", r3, t3);
                  }
              }
              switch (y("_handlePublish: qos %d", i2), i2) {
                case 2:
                  a2.customHandleAcks(r3, n2, e2, function(r4, n3) {
                    return r4 instanceof Error || (n3 = r4, r4 = null), r4 ? s2.emit("error", r4) : -1 === l2.indexOf(n3) ? s2.emit("error", new Error("Wrong reason code for pubrec")) : void (n3 ? s2._sendPacket({ cmd: "pubrec", messageId: o2, reasonCode: n3 }, t2) : s2.incomingStore.put(e2, function() {
                      s2._sendPacket({ cmd: "pubrec", messageId: o2 }, t2);
                    }));
                  });
                  break;
                case 1:
                  a2.customHandleAcks(r3, n2, e2, function(i3, a3) {
                    return i3 instanceof Error || (a3 = i3, i3 = null), i3 ? s2.emit("error", i3) : -1 === l2.indexOf(a3) ? s2.emit("error", new Error("Wrong reason code for puback")) : (a3 || s2.emit("message", r3, n2, e2), void s2.handleMessage(e2, function(e3) {
                      if (e3)
                        return t2 && t2(e3);
                      s2._sendPacket({ cmd: "puback", messageId: o2, reasonCode: a3 }, t2);
                    }));
                  });
                  break;
                case 0:
                  this.emit("message", r3, n2, e2), this.handleMessage(e2, t2);
                  break;
                default:
                  y("_handlePublish: unknown QoS. Doing nothing.");
              }
            }, T.prototype.handleMessage = function(e2, t2) {
              t2();
            }, T.prototype._handleAck = function(e2) {
              const t2 = e2.messageId, r3 = e2.cmd;
              let n2 = null;
              const i2 = this.outgoing[t2] ? this.outgoing[t2].cb : null, o2 = this;
              let s2;
              if (i2) {
                switch (y("_handleAck :: packet type", r3), r3) {
                  case "pubcomp":
                  case "puback": {
                    const r4 = e2.reasonCode;
                    r4 && r4 > 0 && 16 !== r4 && ((s2 = new Error("Publish error: " + _[r4])).code = r4, i2(s2, e2)), delete this.outgoing[t2], this.outgoingStore.del(e2, i2), this.messageIdProvider.deallocate(t2), this._invokeStoreProcessingQueue();
                    break;
                  }
                  case "pubrec": {
                    n2 = { cmd: "pubrel", qos: 2, messageId: t2 };
                    const r4 = e2.reasonCode;
                    r4 && r4 > 0 && 16 !== r4 ? ((s2 = new Error("Publish error: " + _[r4])).code = r4, i2(s2, e2)) : this._sendPacket(n2);
                    break;
                  }
                  case "suback":
                    delete this.outgoing[t2], this.messageIdProvider.deallocate(t2);
                    for (let r4 = 0; r4 < e2.granted.length; r4++)
                      if (0 != (128 & e2.granted[r4])) {
                        const e3 = this.messageIdToTopic[t2];
                        e3 && e3.forEach(function(e4) {
                          delete o2._resubscribeTopics[e4];
                        });
                      }
                    this._invokeStoreProcessingQueue(), i2(null, e2);
                    break;
                  case "unsuback":
                    delete this.outgoing[t2], this.messageIdProvider.deallocate(t2), this._invokeStoreProcessingQueue(), i2(null);
                    break;
                  default:
                    o2.emit("error", new Error("unrecognized packet type"));
                }
                this.disconnecting && 0 === Object.keys(this.outgoing).length && this.emit("outgoingEmpty");
              } else
                y("_handleAck :: Server sent an ack in error. Ignoring.");
            }, T.prototype._handlePubrel = function(e2, t2) {
              y("handling pubrel packet"), t2 = void 0 !== t2 ? t2 : C;
              const r3 = this, n2 = { cmd: "pubcomp", messageId: e2.messageId };
              r3.incomingStore.get(e2, function(e3, i2) {
                e3 ? r3._sendPacket(n2, t2) : (r3.emit("message", i2.topic, i2.payload, i2), r3.handleMessage(i2, function(e4) {
                  if (e4)
                    return t2(e4);
                  r3.incomingStore.del(i2, C), r3._sendPacket(n2, t2);
                }));
              });
            }, T.prototype._handleDisconnect = function(e2) {
              this.emit("disconnect", e2);
            }, T.prototype._nextId = function() {
              return this.messageIdProvider.allocate();
            }, T.prototype.getLastMessageId = function() {
              return this.messageIdProvider.getLastAllocated();
            }, T.prototype._resubscribe = function() {
              y("_resubscribe");
              const e2 = Object.keys(this._resubscribeTopics);
              if (!this._firstConnection && (this.options.clean || 5 === this.options.protocolVersion && !this.connackPacket.sessionPresent) && e2.length > 0)
                if (this.options.resubscribe)
                  if (5 === this.options.protocolVersion) {
                    y("_resubscribe: protocolVersion 5");
                    for (let t2 = 0; t2 < e2.length; t2++) {
                      const r3 = {};
                      r3[e2[t2]] = this._resubscribeTopics[e2[t2]], r3.resubscribe = true, this.subscribe(r3, { properties: r3[e2[t2]].properties });
                    }
                  } else
                    this._resubscribeTopics.resubscribe = true, this.subscribe(this._resubscribeTopics);
                else
                  this._resubscribeTopics = {};
              this._firstConnection = false;
            }, T.prototype._onConnect = function(e2) {
              if (this.disconnected)
                return void this.emit("connect", e2);
              const t2 = this;
              this.connackPacket = e2, this.messageIdProvider.clear(), this._setupPingTimer(), this.connected = true, function r3() {
                let n2 = t2.outgoingStore.createStream();
                function i2() {
                  t2._storeProcessing = false, t2._packetIdsDuringStoreProcessing = {};
                }
                function o2() {
                  n2.destroy(), n2 = null, t2._flushStoreProcessingQueue(), i2();
                }
                t2.once("close", o2), n2.on("error", function(e3) {
                  i2(), t2._flushStoreProcessingQueue(), t2.removeListener("close", o2), t2.emit("error", e3);
                }), n2.on("end", function() {
                  let n3 = true;
                  for (const e3 in t2._packetIdsDuringStoreProcessing)
                    if (!t2._packetIdsDuringStoreProcessing[e3]) {
                      n3 = false;
                      break;
                    }
                  n3 ? (i2(), t2.removeListener("close", o2), t2._invokeAllStoreProcessingQueue(), t2.emit("connect", e2)) : r3();
                }), function e3() {
                  if (!n2)
                    return;
                  t2._storeProcessing = true;
                  const r4 = n2.read(1);
                  let i3;
                  r4 ? t2._packetIdsDuringStoreProcessing[r4.messageId] ? e3() : t2.disconnecting || t2.reconnectTimer ? n2.destroy && n2.destroy() : (i3 = t2.outgoing[r4.messageId] ? t2.outgoing[r4.messageId].cb : null, t2.outgoing[r4.messageId] = { volatile: false, cb: function(t3, r5) {
                    i3 && i3(t3, r5), e3();
                  } }, t2._packetIdsDuringStoreProcessing[r4.messageId] = true, t2.messageIdProvider.register(r4.messageId) ? t2._sendPacket(r4) : y("messageId: %d has already used.", r4.messageId)) : n2.once("readable", e3);
                }();
              }();
            }, T.prototype._invokeStoreProcessingQueue = function() {
              if (this._storeProcessingQueue.length > 0) {
                const e2 = this._storeProcessingQueue[0];
                if (e2 && e2.invoke())
                  return this._storeProcessingQueue.shift(), true;
              }
              return false;
            }, T.prototype._invokeAllStoreProcessingQueue = function() {
              for (; this._invokeStoreProcessingQueue(); )
                ;
            }, T.prototype._flushStoreProcessingQueue = function() {
              for (const e2 of this._storeProcessingQueue)
                e2.cbStorePut && e2.cbStorePut(new Error("Connection closed")), e2.callback && e2.callback(new Error("Connection closed"));
              this._storeProcessingQueue.splice(0);
            }, t.exports = T;
          }).call(this);
        }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
      }, { "./default-message-id-provider": 7, "./store": 8, "./topic-alias-recv": 9, "./topic-alias-send": 10, "./validations": 11, _process: 50, debug: 18, events: 22, inherits: 24, "mqtt-packet": 40, "readable-stream": 69, reinterval: 70, "rfdc/default": 71, xtend: 81 }], 2: [function(e, t, r) {
        "use strict";
        const { Buffer: n } = e("buffer"), i = e("readable-stream").Transform, o = e("duplexify");
        let s, a, l, u = false;
        t.exports = function(e2, t2) {
          if (t2.hostname = t2.hostname || t2.host, !t2.hostname)
            throw new Error("Could not determine host. Specify host manually.");
          const r2 = "MQIsdp" === t2.protocolId && 3 === t2.protocolVersion ? "mqttv3.1" : "mqtt";
          !function(e3) {
            e3.hostname || (e3.hostname = "localhost"), e3.path || (e3.path = "/"), e3.wsOptions || (e3.wsOptions = {});
          }(t2);
          const c = function(e3, t3) {
            const r3 = "alis" === e3.protocol ? "wss" : "ws";
            let n2 = r3 + "://" + e3.hostname + e3.path;
            return e3.port && 80 !== e3.port && 443 !== e3.port && (n2 = r3 + "://" + e3.hostname + ":" + e3.port + e3.path), "function" == typeof e3.transformWsUrl && (n2 = e3.transformWsUrl(n2, e3, t3)), n2;
          }(t2, e2);
          return (s = t2.my).connectSocket({ url: c, protocols: r2 }), a = function() {
            const e3 = new i();
            return e3._write = function(e4, t3, r3) {
              s.sendSocketMessage({ data: e4.buffer, success: function() {
                r3();
              }, fail: function() {
                r3(new Error());
              } });
            }, e3._flush = function(e4) {
              s.closeSocket({ success: function() {
                e4();
              } });
            }, e3;
          }(), l = o.obj(), u || (u = true, s.onSocketOpen(function() {
            l.setReadable(a), l.setWritable(a), l.emit("connect");
          }), s.onSocketMessage(function(e3) {
            if ("string" == typeof e3.data) {
              const t3 = n.from(e3.data, "base64");
              a.push(t3);
            } else {
              const t3 = new FileReader();
              t3.addEventListener("load", function() {
                let e4 = t3.result;
                e4 = e4 instanceof ArrayBuffer ? n.from(e4) : n.from(e4, "utf8"), a.push(e4);
              }), t3.readAsArrayBuffer(e3.data);
            }
          }), s.onSocketClose(function() {
            l.end(), l.destroy();
          }), s.onSocketError(function(e3) {
            l.destroy(e3);
          })), l;
        };
      }, { buffer: 17, duplexify: 20, "readable-stream": 69 }], 3: [function(e, t, r) {
        "use strict";
        const n = e("net"), i = e("debug")("mqttjs:tcp");
        t.exports = function(e2, t2) {
          t2.port = t2.port || 1883, t2.hostname = t2.hostname || t2.host || "localhost";
          const r2 = t2.port, o = t2.hostname;
          return i("port %d and host %s", r2, o), n.createConnection(r2, o);
        };
      }, { debug: 18, net: 16 }], 4: [function(e, t, r) {
        "use strict";
        const n = e("tls"), i = e("net"), o = e("debug")("mqttjs:tls");
        t.exports = function(e2, t2) {
          t2.port = t2.port || 8883, t2.host = t2.hostname || t2.host || "localhost", 0 === i.isIP(t2.host) && (t2.servername = t2.host), t2.rejectUnauthorized = false !== t2.rejectUnauthorized, delete t2.path, o("port %d host %s rejectUnauthorized %b", t2.port, t2.host, t2.rejectUnauthorized);
          const r2 = n.connect(t2);
          function s(n2) {
            t2.rejectUnauthorized && e2.emit("error", n2), r2.end();
          }
          return r2.on("secureConnect", function() {
            t2.rejectUnauthorized && !r2.authorized ? r2.emit("error", new Error("TLS not authorized")) : r2.removeListener("error", s);
          }), r2.on("error", s), r2;
        };
      }, { debug: 18, net: 16, tls: 16 }], 5: [function(e, t, r) {
        (function(r2) {
          (function() {
            "use strict";
            const { Buffer: n } = e("buffer"), i = e("ws"), o = e("debug")("mqttjs:ws"), s = e("duplexify"), a = e("readable-stream").Transform, l = ["rejectUnauthorized", "ca", "cert", "key", "pfx", "passphrase"], u = void 0 !== r2 && "browser" === r2.title || "function" == typeof __webpack_require__;
            function c(e2, t2) {
              let r3 = e2.protocol + "://" + e2.hostname + ":" + e2.port + e2.path;
              return "function" == typeof e2.transformWsUrl && (r3 = e2.transformWsUrl(r3, e2, t2)), r3;
            }
            function h(e2) {
              const t2 = e2;
              return e2.hostname || (t2.hostname = "localhost"), e2.port || ("wss" === e2.protocol ? t2.port = 443 : t2.port = 80), e2.path || (t2.path = "/"), e2.wsOptions || (t2.wsOptions = {}), u || "wss" !== e2.protocol || l.forEach(function(r3) {
                Object.prototype.hasOwnProperty.call(e2, r3) && !Object.prototype.hasOwnProperty.call(e2.wsOptions, r3) && (t2.wsOptions[r3] = e2[r3]);
              }), t2;
            }
            t.exports = u ? function(e2, t2) {
              let r3;
              o("browserStreamBuilder");
              const i2 = function(e3) {
                const t3 = h(e3);
                if (t3.hostname || (t3.hostname = t3.host), !t3.hostname) {
                  if ("undefined" == typeof document)
                    throw new Error("Could not determine host. Specify host manually.");
                  const e4 = new URL(document.URL);
                  t3.hostname = e4.hostname, t3.port || (t3.port = e4.port);
                }
                return void 0 === t3.objectMode && (t3.objectMode = !(true === t3.binary || void 0 === t3.binary)), t3;
              }(t2).browserBufferSize || 524288, l2 = t2.browserBufferTimeout || 1e3, u2 = !t2.objectMode, f = function(e3, t3) {
                const r4 = "MQIsdp" === t3.protocolId && 3 === t3.protocolVersion ? "mqttv3.1" : "mqtt", n2 = c(t3, e3), i3 = new WebSocket(n2, [r4]);
                return i3.binaryType = "arraybuffer", i3;
              }(e2, t2), p = function(e3, t3, r4) {
                const n2 = new a({ objectModeMode: e3.objectMode });
                return n2._write = t3, n2._flush = r4, n2;
              }(t2, function e3(t3, r4, o2) {
                f.bufferedAmount > i2 && setTimeout(e3, l2, t3, r4, o2), u2 && "string" == typeof t3 && (t3 = n.from(t3, "utf8"));
                try {
                  f.send(t3);
                } catch (e4) {
                  return o2(e4);
                }
                o2();
              }, function(e3) {
                f.close(), e3();
              });
              t2.objectMode || (p._writev = v), p.on("close", () => {
                f.close();
              });
              const d = void 0 !== f.addEventListener;
              function g() {
                r3.setReadable(p), r3.setWritable(p), r3.emit("connect");
              }
              function y() {
                r3.end(), r3.destroy();
              }
              function b(e3) {
                r3.destroy(e3);
              }
              function m(e3) {
                let t3 = e3.data;
                t3 = t3 instanceof ArrayBuffer ? n.from(t3) : n.from(t3, "utf8"), p.push(t3);
              }
              function v(e3, t3) {
                const r4 = new Array(e3.length);
                for (let t4 = 0; t4 < e3.length; t4++)
                  "string" == typeof e3[t4].chunk ? r4[t4] = n.from(e3[t4], "utf8") : r4[t4] = e3[t4].chunk;
                this._write(n.concat(r4), "binary", t3);
              }
              return f.readyState === f.OPEN ? r3 = p : (r3 = r3 = s(void 0, void 0, t2), t2.objectMode || (r3._writev = v), d ? f.addEventListener("open", g) : f.onopen = g), r3.socket = f, d ? (f.addEventListener("close", y), f.addEventListener("error", b), f.addEventListener("message", m)) : (f.onclose = y, f.onerror = b, f.onmessage = m), r3;
            } : function(e2, t2) {
              o("streamBuilder");
              const r3 = h(t2), n2 = c(r3, e2), s2 = function(e3, t3, r4) {
                o("createWebSocket"), o("protocol: " + r4.protocolId + " " + r4.protocolVersion);
                const n3 = "MQIsdp" === r4.protocolId && 3 === r4.protocolVersion ? "mqttv3.1" : "mqtt";
                return o("creating new Websocket for url: " + t3 + " and protocol: " + n3), new i(t3, [n3], r4.wsOptions);
              }(0, n2, r3), a2 = i.createWebSocketStream(s2, r3.wsOptions);
              return a2.url = n2, s2.on("close", () => {
                a2.destroy();
              }), a2;
            };
          }).call(this);
        }).call(this, e("_process"));
      }, { _process: 50, buffer: 17, debug: 18, duplexify: 20, "readable-stream": 69, ws: 80 }], 6: [function(e, t, r) {
        "use strict";
        const { Buffer: n } = e("buffer"), i = e("readable-stream").Transform, o = e("duplexify");
        let s, a, l;
        t.exports = function(e2, t2) {
          if (t2.hostname = t2.hostname || t2.host, !t2.hostname)
            throw new Error("Could not determine host. Specify host manually.");
          const r2 = "MQIsdp" === t2.protocolId && 3 === t2.protocolVersion ? "mqttv3.1" : "mqtt";
          !function(e3) {
            e3.hostname || (e3.hostname = "localhost"), e3.path || (e3.path = "/"), e3.wsOptions || (e3.wsOptions = {});
          }(t2);
          const u = function(e3, t3) {
            const r3 = "wxs" === e3.protocol ? "wss" : "ws";
            let n2 = r3 + "://" + e3.hostname + e3.path;
            return e3.port && 80 !== e3.port && 443 !== e3.port && (n2 = r3 + "://" + e3.hostname + ":" + e3.port + e3.path), "function" == typeof e3.transformWsUrl && (n2 = e3.transformWsUrl(n2, e3, t3)), n2;
          }(t2, e2);
          s = wx.connectSocket({ url: u, protocols: [r2] }), a = function() {
            const e3 = new i();
            return e3._write = function(e4, t3, r3) {
              s.send({ data: e4.buffer, success: function() {
                r3();
              }, fail: function(e5) {
                r3(new Error(e5));
              } });
            }, e3._flush = function(e4) {
              s.close({ success: function() {
                e4();
              } });
            }, e3;
          }(), (l = o.obj())._destroy = function(e3, t3) {
            s.close({ success: function() {
              t3 && t3(e3);
            } });
          };
          const c = l.destroy;
          return l.destroy = (function() {
            l.destroy = c;
            const e3 = this;
            setTimeout(function() {
              s.close({ fail: function() {
                e3._destroy(new Error());
              } });
            }, 0);
          }).bind(l), s.onOpen(function() {
            l.setReadable(a), l.setWritable(a), l.emit("connect");
          }), s.onMessage(function(e3) {
            let t3 = e3.data;
            t3 = t3 instanceof ArrayBuffer ? n.from(t3) : n.from(t3, "utf8"), a.push(t3);
          }), s.onClose(function() {
            l.end(), l.destroy();
          }), s.onError(function(e3) {
            l.destroy(new Error(e3.errMsg));
          }), l;
        };
      }, { buffer: 17, duplexify: 20, "readable-stream": 69 }], 7: [function(e, t, r) {
        "use strict";
        function n() {
          if (!(this instanceof n))
            return new n();
          this.nextId = Math.max(1, Math.floor(65535 * Math.random()));
        }
        n.prototype.allocate = function() {
          const e2 = this.nextId++;
          return 65536 === this.nextId && (this.nextId = 1), e2;
        }, n.prototype.getLastAllocated = function() {
          return 1 === this.nextId ? 65535 : this.nextId - 1;
        }, n.prototype.register = function(e2) {
          return true;
        }, n.prototype.deallocate = function(e2) {
        }, n.prototype.clear = function() {
        }, t.exports = n;
      }, {}], 8: [function(e, t, r) {
        "use strict";
        const n = e("xtend"), i = e("readable-stream").Readable, o = { objectMode: true }, s = { clean: true };
        function a(e2) {
          if (!(this instanceof a))
            return new a(e2);
          this.options = e2 || {}, this.options = n(s, e2), this._inflights = /* @__PURE__ */ new Map();
        }
        a.prototype.put = function(e2, t2) {
          return this._inflights.set(e2.messageId, e2), t2 && t2(), this;
        }, a.prototype.createStream = function() {
          const e2 = new i(o), t2 = [];
          let r2 = false, n2 = 0;
          return this._inflights.forEach(function(e3, r3) {
            t2.push(e3);
          }), e2._read = function() {
            !r2 && n2 < t2.length ? this.push(t2[n2++]) : this.push(null);
          }, e2.destroy = function() {
            if (r2)
              return;
            const e3 = this;
            r2 = true, setTimeout(function() {
              e3.emit("close");
            }, 0);
          }, e2;
        }, a.prototype.del = function(e2, t2) {
          return (e2 = this._inflights.get(e2.messageId)) ? (this._inflights.delete(e2.messageId), t2(null, e2)) : t2 && t2(new Error("missing packet")), this;
        }, a.prototype.get = function(e2, t2) {
          return (e2 = this._inflights.get(e2.messageId)) ? t2(null, e2) : t2 && t2(new Error("missing packet")), this;
        }, a.prototype.close = function(e2) {
          this.options.clean && (this._inflights = null), e2 && e2();
        }, t.exports = a;
      }, { "readable-stream": 69, xtend: 81 }], 9: [function(e, t, r) {
        "use strict";
        function n(e2) {
          if (!(this instanceof n))
            return new n(e2);
          this.aliasToTopic = {}, this.max = e2;
        }
        n.prototype.put = function(e2, t2) {
          return !(0 === t2 || t2 > this.max) && (this.aliasToTopic[t2] = e2, this.length = Object.keys(this.aliasToTopic).length, true);
        }, n.prototype.getTopicByAlias = function(e2) {
          return this.aliasToTopic[e2];
        }, n.prototype.clear = function() {
          this.aliasToTopic = {};
        }, t.exports = n;
      }, {}], 10: [function(e, t, r) {
        "use strict";
        const n = e("lru-cache"), i = e("number-allocator").NumberAllocator;
        function o(e2) {
          if (!(this instanceof o))
            return new o(e2);
          e2 > 0 && (this.aliasToTopic = new n({ max: e2 }), this.topicToAlias = {}, this.numberAllocator = new i(1, e2), this.max = e2, this.length = 0);
        }
        o.prototype.put = function(e2, t2) {
          if (0 === t2 || t2 > this.max)
            return false;
          const r2 = this.aliasToTopic.get(t2);
          return r2 && delete this.topicToAlias[r2], this.aliasToTopic.set(t2, e2), this.topicToAlias[e2] = t2, this.numberAllocator.use(t2), this.length = this.aliasToTopic.length, true;
        }, o.prototype.getTopicByAlias = function(e2) {
          return this.aliasToTopic.get(e2);
        }, o.prototype.getAliasByTopic = function(e2) {
          const t2 = this.topicToAlias[e2];
          return void 0 !== t2 && this.aliasToTopic.get(t2), t2;
        }, o.prototype.clear = function() {
          this.aliasToTopic.reset(), this.topicToAlias = {}, this.numberAllocator.clear(), this.length = 0;
        }, o.prototype.getLruAlias = function() {
          const e2 = this.numberAllocator.firstVacant();
          return e2 || this.aliasToTopic.keys()[this.aliasToTopic.length - 1];
        }, t.exports = o;
      }, { "lru-cache": 37, "number-allocator": 46 }], 11: [function(e, t, r) {
        "use strict";
        function n(e2) {
          const t2 = e2.split("/");
          for (let e3 = 0; e3 < t2.length; e3++)
            if ("+" !== t2[e3]) {
              if ("#" === t2[e3])
                return e3 === t2.length - 1;
              if (-1 !== t2[e3].indexOf("+") || -1 !== t2[e3].indexOf("#"))
                return false;
            }
          return true;
        }
        t.exports = { validateTopics: function(e2) {
          if (0 === e2.length)
            return "empty_topic_list";
          for (let t2 = 0; t2 < e2.length; t2++)
            if (!n(e2[t2]))
              return e2[t2];
          return null;
        } };
      }, {}], 12: [function(e, t, r) {
        (function(r2) {
          (function() {
            "use strict";
            const n = e("../client"), i = e("../store"), o = e("url"), s = e("xtend"), a = e("debug")("mqttjs"), l = {};
            function u(e2, t2) {
              if (a("connecting to an MQTT broker..."), "object" != typeof e2 || t2 || (t2 = e2, e2 = null), t2 = t2 || {}, e2) {
                const r4 = o.parse(e2, true);
                if (null != r4.port && (r4.port = Number(r4.port)), null === (t2 = s(r4, t2)).protocol)
                  throw new Error("Missing protocol");
                t2.protocol = t2.protocol.replace(/:$/, "");
              }
              if (function(e3) {
                let t3;
                e3.auth && ((t3 = e3.auth.match(/^(.+):(.+)$/)) ? (e3.username = t3[1], e3.password = t3[2]) : e3.username = e3.auth);
              }(t2), t2.query && "string" == typeof t2.query.clientId && (t2.clientId = t2.query.clientId), t2.cert && t2.key) {
                if (!t2.protocol)
                  throw new Error("Missing secure protocol key");
                if (-1 === ["mqtts", "wss", "wxs", "alis"].indexOf(t2.protocol))
                  switch (t2.protocol) {
                    case "mqtt":
                      t2.protocol = "mqtts";
                      break;
                    case "ws":
                      t2.protocol = "wss";
                      break;
                    case "wx":
                      t2.protocol = "wxs";
                      break;
                    case "ali":
                      t2.protocol = "alis";
                      break;
                    default:
                      throw new Error('Unknown protocol for secure connection: "' + t2.protocol + '"!');
                  }
              }
              if (!l[t2.protocol]) {
                const e3 = -1 !== ["mqtts", "wss"].indexOf(t2.protocol);
                t2.protocol = ["mqtt", "mqtts", "ws", "wss", "wx", "wxs", "ali", "alis"].filter(function(t3, r4) {
                  return (!e3 || r4 % 2 != 0) && "function" == typeof l[t3];
                })[0];
              }
              if (false === t2.clean && !t2.clientId)
                throw new Error("Missing clientId for unclean clients");
              t2.protocol && (t2.defaultProtocol = t2.protocol);
              const r3 = new n(function(e3) {
                return t2.servers && (e3._reconnectCount && e3._reconnectCount !== t2.servers.length || (e3._reconnectCount = 0), t2.host = t2.servers[e3._reconnectCount].host, t2.port = t2.servers[e3._reconnectCount].port, t2.protocol = t2.servers[e3._reconnectCount].protocol ? t2.servers[e3._reconnectCount].protocol : t2.defaultProtocol, t2.hostname = t2.host, e3._reconnectCount++), a("calling streambuilder for", t2.protocol), l[t2.protocol](e3, t2);
              }, t2);
              return r3.on("error", function() {
              }), r3;
            }
            void 0 !== r2 && "browser" !== r2.title || "function" != typeof __webpack_require__ ? (l.mqtt = e("./tcp"), l.tcp = e("./tcp"), l.ssl = e("./tls"), l.tls = e("./tls"), l.mqtts = e("./tls")) : (l.wx = e("./wx"), l.wxs = e("./wx"), l.ali = e("./ali"), l.alis = e("./ali")), l.ws = e("./ws"), l.wss = e("./ws"), t.exports = u, t.exports.connect = u, t.exports.MqttClient = n, t.exports.Store = i;
          }).call(this);
        }).call(this, e("_process"));
      }, { "../client": 1, "../store": 8, "./ali": 2, "./tcp": 3, "./tls": 4, "./ws": 5, "./wx": 6, _process: 50, debug: 18, url: 76, xtend: 81 }], 13: [function(e, t, r) {
        "use strict";
        r.byteLength = function(e2) {
          var t2 = u(e2), r2 = t2[0], n2 = t2[1];
          return 3 * (r2 + n2) / 4 - n2;
        }, r.toByteArray = function(e2) {
          var t2, r2, n2 = u(e2), s2 = n2[0], a2 = n2[1], l2 = new o(function(e3, t3, r3) {
            return 3 * (t3 + r3) / 4 - r3;
          }(0, s2, a2)), c2 = 0, h = a2 > 0 ? s2 - 4 : s2;
          for (r2 = 0; r2 < h; r2 += 4)
            t2 = i[e2.charCodeAt(r2)] << 18 | i[e2.charCodeAt(r2 + 1)] << 12 | i[e2.charCodeAt(r2 + 2)] << 6 | i[e2.charCodeAt(r2 + 3)], l2[c2++] = t2 >> 16 & 255, l2[c2++] = t2 >> 8 & 255, l2[c2++] = 255 & t2;
          2 === a2 && (t2 = i[e2.charCodeAt(r2)] << 2 | i[e2.charCodeAt(r2 + 1)] >> 4, l2[c2++] = 255 & t2);
          1 === a2 && (t2 = i[e2.charCodeAt(r2)] << 10 | i[e2.charCodeAt(r2 + 1)] << 4 | i[e2.charCodeAt(r2 + 2)] >> 2, l2[c2++] = t2 >> 8 & 255, l2[c2++] = 255 & t2);
          return l2;
        }, r.fromByteArray = function(e2) {
          for (var t2, r2 = e2.length, i2 = r2 % 3, o2 = [], s2 = 0, a2 = r2 - i2; s2 < a2; s2 += 16383)
            o2.push(c(e2, s2, s2 + 16383 > a2 ? a2 : s2 + 16383));
          1 === i2 ? (t2 = e2[r2 - 1], o2.push(n[t2 >> 2] + n[t2 << 4 & 63] + "==")) : 2 === i2 && (t2 = (e2[r2 - 2] << 8) + e2[r2 - 1], o2.push(n[t2 >> 10] + n[t2 >> 4 & 63] + n[t2 << 2 & 63] + "="));
          return o2.join("");
        };
        for (var n = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, l = s.length; a < l; ++a)
          n[a] = s[a], i[s.charCodeAt(a)] = a;
        function u(e2) {
          var t2 = e2.length;
          if (t2 % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
          var r2 = e2.indexOf("=");
          return -1 === r2 && (r2 = t2), [r2, r2 === t2 ? 0 : 4 - r2 % 4];
        }
        function c(e2, t2, r2) {
          for (var i2, o2, s2 = [], a2 = t2; a2 < r2; a2 += 3)
            i2 = (e2[a2] << 16 & 16711680) + (e2[a2 + 1] << 8 & 65280) + (255 & e2[a2 + 2]), s2.push(n[(o2 = i2) >> 18 & 63] + n[o2 >> 12 & 63] + n[o2 >> 6 & 63] + n[63 & o2]);
          return s2.join("");
        }
        i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63;
      }, {}], 14: [function(e, t, r) {
        "use strict";
        const { Buffer: n } = e("buffer"), i = Symbol.for("BufferList");
        function o(e2) {
          if (!(this instanceof o))
            return new o(e2);
          o._init.call(this, e2);
        }
        o._init = function(e2) {
          Object.defineProperty(this, i, { value: true }), this._bufs = [], this.length = 0, e2 && this.append(e2);
        }, o.prototype._new = function(e2) {
          return new o(e2);
        }, o.prototype._offset = function(e2) {
          if (0 === e2)
            return [0, 0];
          let t2 = 0;
          for (let r2 = 0; r2 < this._bufs.length; r2++) {
            const n2 = t2 + this._bufs[r2].length;
            if (e2 < n2 || r2 === this._bufs.length - 1)
              return [r2, e2 - t2];
            t2 = n2;
          }
        }, o.prototype._reverseOffset = function(e2) {
          const t2 = e2[0];
          let r2 = e2[1];
          for (let e3 = 0; e3 < t2; e3++)
            r2 += this._bufs[e3].length;
          return r2;
        }, o.prototype.get = function(e2) {
          if (e2 > this.length || e2 < 0)
            return;
          const t2 = this._offset(e2);
          return this._bufs[t2[0]][t2[1]];
        }, o.prototype.slice = function(e2, t2) {
          return "number" == typeof e2 && e2 < 0 && (e2 += this.length), "number" == typeof t2 && t2 < 0 && (t2 += this.length), this.copy(null, 0, e2, t2);
        }, o.prototype.copy = function(e2, t2, r2, i2) {
          if (("number" != typeof r2 || r2 < 0) && (r2 = 0), ("number" != typeof i2 || i2 > this.length) && (i2 = this.length), r2 >= this.length)
            return e2 || n.alloc(0);
          if (i2 <= 0)
            return e2 || n.alloc(0);
          const o2 = !!e2, s = this._offset(r2), a = i2 - r2;
          let l = a, u = o2 && t2 || 0, c = s[1];
          if (0 === r2 && i2 === this.length) {
            if (!o2)
              return 1 === this._bufs.length ? this._bufs[0] : n.concat(this._bufs, this.length);
            for (let t3 = 0; t3 < this._bufs.length; t3++)
              this._bufs[t3].copy(e2, u), u += this._bufs[t3].length;
            return e2;
          }
          if (l <= this._bufs[s[0]].length - c)
            return o2 ? this._bufs[s[0]].copy(e2, t2, c, c + l) : this._bufs[s[0]].slice(c, c + l);
          o2 || (e2 = n.allocUnsafe(a));
          for (let t3 = s[0]; t3 < this._bufs.length; t3++) {
            const r3 = this._bufs[t3].length - c;
            if (!(l > r3)) {
              this._bufs[t3].copy(e2, u, c, c + l), u += r3;
              break;
            }
            this._bufs[t3].copy(e2, u, c), u += r3, l -= r3, c && (c = 0);
          }
          return e2.length > u ? e2.slice(0, u) : e2;
        }, o.prototype.shallowSlice = function(e2, t2) {
          if (e2 = e2 || 0, t2 = "number" != typeof t2 ? this.length : t2, e2 < 0 && (e2 += this.length), t2 < 0 && (t2 += this.length), e2 === t2)
            return this._new();
          const r2 = this._offset(e2), n2 = this._offset(t2), i2 = this._bufs.slice(r2[0], n2[0] + 1);
          return 0 === n2[1] ? i2.pop() : i2[i2.length - 1] = i2[i2.length - 1].slice(0, n2[1]), 0 !== r2[1] && (i2[0] = i2[0].slice(r2[1])), this._new(i2);
        }, o.prototype.toString = function(e2, t2, r2) {
          return this.slice(t2, r2).toString(e2);
        }, o.prototype.consume = function(e2) {
          if (e2 = Math.trunc(e2), Number.isNaN(e2) || e2 <= 0)
            return this;
          for (; this._bufs.length; ) {
            if (!(e2 >= this._bufs[0].length)) {
              this._bufs[0] = this._bufs[0].slice(e2), this.length -= e2;
              break;
            }
            e2 -= this._bufs[0].length, this.length -= this._bufs[0].length, this._bufs.shift();
          }
          return this;
        }, o.prototype.duplicate = function() {
          const e2 = this._new();
          for (let t2 = 0; t2 < this._bufs.length; t2++)
            e2.append(this._bufs[t2]);
          return e2;
        }, o.prototype.append = function(e2) {
          if (null == e2)
            return this;
          if (e2.buffer)
            this._appendBuffer(n.from(e2.buffer, e2.byteOffset, e2.byteLength));
          else if (Array.isArray(e2))
            for (let t2 = 0; t2 < e2.length; t2++)
              this.append(e2[t2]);
          else if (this._isBufferList(e2))
            for (let t2 = 0; t2 < e2._bufs.length; t2++)
              this.append(e2._bufs[t2]);
          else
            "number" == typeof e2 && (e2 = e2.toString()), this._appendBuffer(n.from(e2));
          return this;
        }, o.prototype._appendBuffer = function(e2) {
          this._bufs.push(e2), this.length += e2.length;
        }, o.prototype.indexOf = function(e2, t2, r2) {
          if (void 0 === r2 && "string" == typeof t2 && (r2 = t2, t2 = void 0), "function" == typeof e2 || Array.isArray(e2))
            throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
          if ("number" == typeof e2 ? e2 = n.from([e2]) : "string" == typeof e2 ? e2 = n.from(e2, r2) : this._isBufferList(e2) ? e2 = e2.slice() : Array.isArray(e2.buffer) ? e2 = n.from(e2.buffer, e2.byteOffset, e2.byteLength) : n.isBuffer(e2) || (e2 = n.from(e2)), t2 = Number(t2 || 0), isNaN(t2) && (t2 = 0), t2 < 0 && (t2 = this.length + t2), t2 < 0 && (t2 = 0), 0 === e2.length)
            return t2 > this.length ? this.length : t2;
          const i2 = this._offset(t2);
          let o2 = i2[0], s = i2[1];
          for (; o2 < this._bufs.length; o2++) {
            const t3 = this._bufs[o2];
            for (; s < t3.length; ) {
              if (t3.length - s >= e2.length) {
                const r3 = t3.indexOf(e2, s);
                if (-1 !== r3)
                  return this._reverseOffset([o2, r3]);
                s = t3.length - e2.length + 1;
              } else {
                const t4 = this._reverseOffset([o2, s]);
                if (this._match(t4, e2))
                  return t4;
                s++;
              }
            }
            s = 0;
          }
          return -1;
        }, o.prototype._match = function(e2, t2) {
          if (this.length - e2 < t2.length)
            return false;
          for (let r2 = 0; r2 < t2.length; r2++)
            if (this.get(e2 + r2) !== t2[r2])
              return false;
          return true;
        }, function() {
          const e2 = { readDoubleBE: 8, readDoubleLE: 8, readFloatBE: 4, readFloatLE: 4, readInt32BE: 4, readInt32LE: 4, readUInt32BE: 4, readUInt32LE: 4, readInt16BE: 2, readInt16LE: 2, readUInt16BE: 2, readUInt16LE: 2, readInt8: 1, readUInt8: 1, readIntBE: null, readIntLE: null, readUIntBE: null, readUIntLE: null };
          for (const t2 in e2)
            !function(t3) {
              o.prototype[t3] = null === e2[t3] ? function(e3, r2) {
                return this.slice(e3, e3 + r2)[t3](0, r2);
              } : function(r2 = 0) {
                return this.slice(r2, r2 + e2[t3])[t3](0);
              };
            }(t2);
        }(), o.prototype._isBufferList = function(e2) {
          return e2 instanceof o || o.isBufferList(e2);
        }, o.isBufferList = function(e2) {
          return null != e2 && e2[i];
        }, t.exports = o;
      }, { buffer: 17 }], 15: [function(e, t, r) {
        "use strict";
        const n = e("readable-stream").Duplex, i = e("inherits"), o = e("./BufferList");
        function s(e2) {
          if (!(this instanceof s))
            return new s(e2);
          if ("function" == typeof e2) {
            this._callback = e2;
            const t2 = (function(e3) {
              this._callback && (this._callback(e3), this._callback = null);
            }).bind(this);
            this.on("pipe", function(e3) {
              e3.on("error", t2);
            }), this.on("unpipe", function(e3) {
              e3.removeListener("error", t2);
            }), e2 = null;
          }
          o._init.call(this, e2), n.call(this);
        }
        i(s, n), Object.assign(s.prototype, o.prototype), s.prototype._new = function(e2) {
          return new s(e2);
        }, s.prototype._write = function(e2, t2, r2) {
          this._appendBuffer(e2), "function" == typeof r2 && r2();
        }, s.prototype._read = function(e2) {
          if (!this.length)
            return this.push(null);
          e2 = Math.min(e2, this.length), this.push(this.slice(0, e2)), this.consume(e2);
        }, s.prototype.end = function(e2) {
          n.prototype.end.call(this, e2), this._callback && (this._callback(null, this.slice()), this._callback = null);
        }, s.prototype._destroy = function(e2, t2) {
          this._bufs.length = 0, this.length = 0, t2(e2);
        }, s.prototype._isBufferList = function(e2) {
          return e2 instanceof s || e2 instanceof o || s.isBufferList(e2);
        }, s.isBufferList = o.isBufferList, t.exports = s, t.exports.BufferListStream = s, t.exports.BufferList = o;
      }, { "./BufferList": 14, inherits: 24, "readable-stream": 69 }], 16: [function(e, t, r) {
      }, {}], 17: [function(e, t, r) {
        (function(t2) {
          (function() {
            "use strict";
            var t3 = e("base64-js"), n = e("ieee754");
            r.Buffer = s, r.SlowBuffer = function(e2) {
              +e2 != e2 && (e2 = 0);
              return s.alloc(+e2);
            }, r.INSPECT_MAX_BYTES = 50;
            var i = 2147483647;
            function o(e2) {
              if (e2 > i)
                throw new RangeError('The value "' + e2 + '" is invalid for option "size"');
              var t4 = new Uint8Array(e2);
              return t4.__proto__ = s.prototype, t4;
            }
            function s(e2, t4, r2) {
              if ("number" == typeof e2) {
                if ("string" == typeof t4)
                  throw new TypeError('The "string" argument must be of type string. Received type number');
                return u(e2);
              }
              return a(e2, t4, r2);
            }
            function a(e2, t4, r2) {
              if ("string" == typeof e2)
                return function(e3, t5) {
                  "string" == typeof t5 && "" !== t5 || (t5 = "utf8");
                  if (!s.isEncoding(t5))
                    throw new TypeError("Unknown encoding: " + t5);
                  var r3 = 0 | f(e3, t5), n3 = o(r3), i3 = n3.write(e3, t5);
                  i3 !== r3 && (n3 = n3.slice(0, i3));
                  return n3;
                }(e2, t4);
              if (ArrayBuffer.isView(e2))
                return c(e2);
              if (null == e2)
                throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e2);
              if (q(e2, ArrayBuffer) || e2 && q(e2.buffer, ArrayBuffer))
                return function(e3, t5, r3) {
                  if (t5 < 0 || e3.byteLength < t5)
                    throw new RangeError('"offset" is outside of buffer bounds');
                  if (e3.byteLength < t5 + (r3 || 0))
                    throw new RangeError('"length" is outside of buffer bounds');
                  var n3;
                  n3 = void 0 === t5 && void 0 === r3 ? new Uint8Array(e3) : void 0 === r3 ? new Uint8Array(e3, t5) : new Uint8Array(e3, t5, r3);
                  return n3.__proto__ = s.prototype, n3;
                }(e2, t4, r2);
              if ("number" == typeof e2)
                throw new TypeError('The "value" argument must not be of type number. Received type number');
              var n2 = e2.valueOf && e2.valueOf();
              if (null != n2 && n2 !== e2)
                return s.from(n2, t4, r2);
              var i2 = function(e3) {
                if (s.isBuffer(e3)) {
                  var t5 = 0 | h(e3.length), r3 = o(t5);
                  return 0 === r3.length ? r3 : (e3.copy(r3, 0, 0, t5), r3);
                }
                if (void 0 !== e3.length)
                  return "number" != typeof e3.length || D(e3.length) ? o(0) : c(e3);
                if ("Buffer" === e3.type && Array.isArray(e3.data))
                  return c(e3.data);
              }(e2);
              if (i2)
                return i2;
              if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e2[Symbol.toPrimitive])
                return s.from(e2[Symbol.toPrimitive]("string"), t4, r2);
              throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e2);
            }
            function l(e2) {
              if ("number" != typeof e2)
                throw new TypeError('"size" argument must be of type number');
              if (e2 < 0)
                throw new RangeError('The value "' + e2 + '" is invalid for option "size"');
            }
            function u(e2) {
              return l(e2), o(e2 < 0 ? 0 : 0 | h(e2));
            }
            function c(e2) {
              for (var t4 = e2.length < 0 ? 0 : 0 | h(e2.length), r2 = o(t4), n2 = 0; n2 < t4; n2 += 1)
                r2[n2] = 255 & e2[n2];
              return r2;
            }
            function h(e2) {
              if (e2 >= i)
                throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
              return 0 | e2;
            }
            function f(e2, t4) {
              if (s.isBuffer(e2))
                return e2.length;
              if (ArrayBuffer.isView(e2) || q(e2, ArrayBuffer))
                return e2.byteLength;
              if ("string" != typeof e2)
                throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e2);
              var r2 = e2.length, n2 = arguments.length > 2 && true === arguments[2];
              if (!n2 && 0 === r2)
                return 0;
              for (var i2 = false; ; )
                switch (t4) {
                  case "ascii":
                  case "latin1":
                  case "binary":
                    return r2;
                  case "utf8":
                  case "utf-8":
                    return L(e2).length;
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return 2 * r2;
                  case "hex":
                    return r2 >>> 1;
                  case "base64":
                    return j(e2).length;
                  default:
                    if (i2)
                      return n2 ? -1 : L(e2).length;
                    t4 = ("" + t4).toLowerCase(), i2 = true;
                }
            }
            function p(e2, t4, r2) {
              var n2 = e2[t4];
              e2[t4] = e2[r2], e2[r2] = n2;
            }
            function d(e2, t4, r2, n2, i2) {
              if (0 === e2.length)
                return -1;
              if ("string" == typeof r2 ? (n2 = r2, r2 = 0) : r2 > 2147483647 ? r2 = 2147483647 : r2 < -2147483648 && (r2 = -2147483648), D(r2 = +r2) && (r2 = i2 ? 0 : e2.length - 1), r2 < 0 && (r2 = e2.length + r2), r2 >= e2.length) {
                if (i2)
                  return -1;
                r2 = e2.length - 1;
              } else if (r2 < 0) {
                if (!i2)
                  return -1;
                r2 = 0;
              }
              if ("string" == typeof t4 && (t4 = s.from(t4, n2)), s.isBuffer(t4))
                return 0 === t4.length ? -1 : g(e2, t4, r2, n2, i2);
              if ("number" == typeof t4)
                return t4 &= 255, "function" == typeof Uint8Array.prototype.indexOf ? i2 ? Uint8Array.prototype.indexOf.call(e2, t4, r2) : Uint8Array.prototype.lastIndexOf.call(e2, t4, r2) : g(e2, [t4], r2, n2, i2);
              throw new TypeError("val must be string, number or Buffer");
            }
            function g(e2, t4, r2, n2, i2) {
              var o2, s2 = 1, a2 = e2.length, l2 = t4.length;
              if (void 0 !== n2 && ("ucs2" === (n2 = String(n2).toLowerCase()) || "ucs-2" === n2 || "utf16le" === n2 || "utf-16le" === n2)) {
                if (e2.length < 2 || t4.length < 2)
                  return -1;
                s2 = 2, a2 /= 2, l2 /= 2, r2 /= 2;
              }
              function u2(e3, t5) {
                return 1 === s2 ? e3[t5] : e3.readUInt16BE(t5 * s2);
              }
              if (i2) {
                var c2 = -1;
                for (o2 = r2; o2 < a2; o2++)
                  if (u2(e2, o2) === u2(t4, -1 === c2 ? 0 : o2 - c2)) {
                    if (-1 === c2 && (c2 = o2), o2 - c2 + 1 === l2)
                      return c2 * s2;
                  } else
                    -1 !== c2 && (o2 -= o2 - c2), c2 = -1;
              } else
                for (r2 + l2 > a2 && (r2 = a2 - l2), o2 = r2; o2 >= 0; o2--) {
                  for (var h2 = true, f2 = 0; f2 < l2; f2++)
                    if (u2(e2, o2 + f2) !== u2(t4, f2)) {
                      h2 = false;
                      break;
                    }
                  if (h2)
                    return o2;
                }
              return -1;
            }
            function y(e2, t4, r2, n2) {
              r2 = Number(r2) || 0;
              var i2 = e2.length - r2;
              n2 ? (n2 = Number(n2)) > i2 && (n2 = i2) : n2 = i2;
              var o2 = t4.length;
              n2 > o2 / 2 && (n2 = o2 / 2);
              for (var s2 = 0; s2 < n2; ++s2) {
                var a2 = parseInt(t4.substr(2 * s2, 2), 16);
                if (D(a2))
                  return s2;
                e2[r2 + s2] = a2;
              }
              return s2;
            }
            function b(e2, t4, r2, n2) {
              return U(L(t4, e2.length - r2), e2, r2, n2);
            }
            function m(e2, t4, r2, n2) {
              return U(function(e3) {
                for (var t5 = [], r3 = 0; r3 < e3.length; ++r3)
                  t5.push(255 & e3.charCodeAt(r3));
                return t5;
              }(t4), e2, r2, n2);
            }
            function v(e2, t4, r2, n2) {
              return m(e2, t4, r2, n2);
            }
            function w(e2, t4, r2, n2) {
              return U(j(t4), e2, r2, n2);
            }
            function _(e2, t4, r2, n2) {
              return U(function(e3, t5) {
                for (var r3, n3, i2, o2 = [], s2 = 0; s2 < e3.length && !((t5 -= 2) < 0); ++s2)
                  r3 = e3.charCodeAt(s2), n3 = r3 >> 8, i2 = r3 % 256, o2.push(i2), o2.push(n3);
                return o2;
              }(t4, e2.length - r2), e2, r2, n2);
            }
            function k(e2, r2, n2) {
              return 0 === r2 && n2 === e2.length ? t3.fromByteArray(e2) : t3.fromByteArray(e2.slice(r2, n2));
            }
            function S(e2, t4, r2) {
              r2 = Math.min(e2.length, r2);
              for (var n2 = [], i2 = t4; i2 < r2; ) {
                var o2, s2, a2, l2, u2 = e2[i2], c2 = null, h2 = u2 > 239 ? 4 : u2 > 223 ? 3 : u2 > 191 ? 2 : 1;
                if (i2 + h2 <= r2)
                  switch (h2) {
                    case 1:
                      u2 < 128 && (c2 = u2);
                      break;
                    case 2:
                      128 == (192 & (o2 = e2[i2 + 1])) && (l2 = (31 & u2) << 6 | 63 & o2) > 127 && (c2 = l2);
                      break;
                    case 3:
                      o2 = e2[i2 + 1], s2 = e2[i2 + 2], 128 == (192 & o2) && 128 == (192 & s2) && (l2 = (15 & u2) << 12 | (63 & o2) << 6 | 63 & s2) > 2047 && (l2 < 55296 || l2 > 57343) && (c2 = l2);
                      break;
                    case 4:
                      o2 = e2[i2 + 1], s2 = e2[i2 + 2], a2 = e2[i2 + 3], 128 == (192 & o2) && 128 == (192 & s2) && 128 == (192 & a2) && (l2 = (15 & u2) << 18 | (63 & o2) << 12 | (63 & s2) << 6 | 63 & a2) > 65535 && l2 < 1114112 && (c2 = l2);
                  }
                null === c2 ? (c2 = 65533, h2 = 1) : c2 > 65535 && (c2 -= 65536, n2.push(c2 >>> 10 & 1023 | 55296), c2 = 56320 | 1023 & c2), n2.push(c2), i2 += h2;
              }
              return function(e3) {
                var t5 = e3.length;
                if (t5 <= E)
                  return String.fromCharCode.apply(String, e3);
                var r3 = "", n3 = 0;
                for (; n3 < t5; )
                  r3 += String.fromCharCode.apply(String, e3.slice(n3, n3 += E));
                return r3;
              }(n2);
            }
            r.kMaxLength = i, s.TYPED_ARRAY_SUPPORT = function() {
              try {
                var e2 = new Uint8Array(1);
                return e2.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
                  return 42;
                } }, 42 === e2.foo();
              } catch (e3) {
                return false;
              }
            }(), s.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(s.prototype, "parent", { enumerable: true, get: function() {
              if (s.isBuffer(this))
                return this.buffer;
            } }), Object.defineProperty(s.prototype, "offset", { enumerable: true, get: function() {
              if (s.isBuffer(this))
                return this.byteOffset;
            } }), "undefined" != typeof Symbol && null != Symbol.species && s[Symbol.species] === s && Object.defineProperty(s, Symbol.species, { value: null, configurable: true, enumerable: false, writable: false }), s.poolSize = 8192, s.from = function(e2, t4, r2) {
              return a(e2, t4, r2);
            }, s.prototype.__proto__ = Uint8Array.prototype, s.__proto__ = Uint8Array, s.alloc = function(e2, t4, r2) {
              return function(e3, t5, r3) {
                return l(e3), e3 <= 0 ? o(e3) : void 0 !== t5 ? "string" == typeof r3 ? o(e3).fill(t5, r3) : o(e3).fill(t5) : o(e3);
              }(e2, t4, r2);
            }, s.allocUnsafe = function(e2) {
              return u(e2);
            }, s.allocUnsafeSlow = function(e2) {
              return u(e2);
            }, s.isBuffer = function(e2) {
              return null != e2 && true === e2._isBuffer && e2 !== s.prototype;
            }, s.compare = function(e2, t4) {
              if (q(e2, Uint8Array) && (e2 = s.from(e2, e2.offset, e2.byteLength)), q(t4, Uint8Array) && (t4 = s.from(t4, t4.offset, t4.byteLength)), !s.isBuffer(e2) || !s.isBuffer(t4))
                throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
              if (e2 === t4)
                return 0;
              for (var r2 = e2.length, n2 = t4.length, i2 = 0, o2 = Math.min(r2, n2); i2 < o2; ++i2)
                if (e2[i2] !== t4[i2]) {
                  r2 = e2[i2], n2 = t4[i2];
                  break;
                }
              return r2 < n2 ? -1 : n2 < r2 ? 1 : 0;
            }, s.isEncoding = function(e2) {
              switch (String(e2).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return true;
                default:
                  return false;
              }
            }, s.concat = function(e2, t4) {
              if (!Array.isArray(e2))
                throw new TypeError('"list" argument must be an Array of Buffers');
              if (0 === e2.length)
                return s.alloc(0);
              var r2;
              if (void 0 === t4)
                for (t4 = 0, r2 = 0; r2 < e2.length; ++r2)
                  t4 += e2[r2].length;
              var n2 = s.allocUnsafe(t4), i2 = 0;
              for (r2 = 0; r2 < e2.length; ++r2) {
                var o2 = e2[r2];
                if (q(o2, Uint8Array) && (o2 = s.from(o2)), !s.isBuffer(o2))
                  throw new TypeError('"list" argument must be an Array of Buffers');
                o2.copy(n2, i2), i2 += o2.length;
              }
              return n2;
            }, s.byteLength = f, s.prototype._isBuffer = true, s.prototype.swap16 = function() {
              var e2 = this.length;
              if (e2 % 2 != 0)
                throw new RangeError("Buffer size must be a multiple of 16-bits");
              for (var t4 = 0; t4 < e2; t4 += 2)
                p(this, t4, t4 + 1);
              return this;
            }, s.prototype.swap32 = function() {
              var e2 = this.length;
              if (e2 % 4 != 0)
                throw new RangeError("Buffer size must be a multiple of 32-bits");
              for (var t4 = 0; t4 < e2; t4 += 4)
                p(this, t4, t4 + 3), p(this, t4 + 1, t4 + 2);
              return this;
            }, s.prototype.swap64 = function() {
              var e2 = this.length;
              if (e2 % 8 != 0)
                throw new RangeError("Buffer size must be a multiple of 64-bits");
              for (var t4 = 0; t4 < e2; t4 += 8)
                p(this, t4, t4 + 7), p(this, t4 + 1, t4 + 6), p(this, t4 + 2, t4 + 5), p(this, t4 + 3, t4 + 4);
              return this;
            }, s.prototype.toString = function() {
              var e2 = this.length;
              return 0 === e2 ? "" : 0 === arguments.length ? S(this, 0, e2) : (function(e3, t4, r2) {
                var n2 = false;
                if ((void 0 === t4 || t4 < 0) && (t4 = 0), t4 > this.length)
                  return "";
                if ((void 0 === r2 || r2 > this.length) && (r2 = this.length), r2 <= 0)
                  return "";
                if ((r2 >>>= 0) <= (t4 >>>= 0))
                  return "";
                for (e3 || (e3 = "utf8"); ; )
                  switch (e3) {
                    case "hex":
                      return x(this, t4, r2);
                    case "utf8":
                    case "utf-8":
                      return S(this, t4, r2);
                    case "ascii":
                      return C(this, t4, r2);
                    case "latin1":
                    case "binary":
                      return T(this, t4, r2);
                    case "base64":
                      return k(this, t4, r2);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return A(this, t4, r2);
                    default:
                      if (n2)
                        throw new TypeError("Unknown encoding: " + e3);
                      e3 = (e3 + "").toLowerCase(), n2 = true;
                  }
              }).apply(this, arguments);
            }, s.prototype.toLocaleString = s.prototype.toString, s.prototype.equals = function(e2) {
              if (!s.isBuffer(e2))
                throw new TypeError("Argument must be a Buffer");
              return this === e2 || 0 === s.compare(this, e2);
            }, s.prototype.inspect = function() {
              var e2 = "", t4 = r.INSPECT_MAX_BYTES;
              return e2 = this.toString("hex", 0, t4).replace(/(.{2})/g, "$1 ").trim(), this.length > t4 && (e2 += " ... "), "<Buffer " + e2 + ">";
            }, s.prototype.compare = function(e2, t4, r2, n2, i2) {
              if (q(e2, Uint8Array) && (e2 = s.from(e2, e2.offset, e2.byteLength)), !s.isBuffer(e2))
                throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e2);
              if (void 0 === t4 && (t4 = 0), void 0 === r2 && (r2 = e2 ? e2.length : 0), void 0 === n2 && (n2 = 0), void 0 === i2 && (i2 = this.length), t4 < 0 || r2 > e2.length || n2 < 0 || i2 > this.length)
                throw new RangeError("out of range index");
              if (n2 >= i2 && t4 >= r2)
                return 0;
              if (n2 >= i2)
                return -1;
              if (t4 >= r2)
                return 1;
              if (t4 >>>= 0, r2 >>>= 0, n2 >>>= 0, i2 >>>= 0, this === e2)
                return 0;
              for (var o2 = i2 - n2, a2 = r2 - t4, l2 = Math.min(o2, a2), u2 = this.slice(n2, i2), c2 = e2.slice(t4, r2), h2 = 0; h2 < l2; ++h2)
                if (u2[h2] !== c2[h2]) {
                  o2 = u2[h2], a2 = c2[h2];
                  break;
                }
              return o2 < a2 ? -1 : a2 < o2 ? 1 : 0;
            }, s.prototype.includes = function(e2, t4, r2) {
              return -1 !== this.indexOf(e2, t4, r2);
            }, s.prototype.indexOf = function(e2, t4, r2) {
              return d(this, e2, t4, r2, true);
            }, s.prototype.lastIndexOf = function(e2, t4, r2) {
              return d(this, e2, t4, r2, false);
            }, s.prototype.write = function(e2, t4, r2, n2) {
              if (void 0 === t4)
                n2 = "utf8", r2 = this.length, t4 = 0;
              else if (void 0 === r2 && "string" == typeof t4)
                n2 = t4, r2 = this.length, t4 = 0;
              else {
                if (!isFinite(t4))
                  throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                t4 >>>= 0, isFinite(r2) ? (r2 >>>= 0, void 0 === n2 && (n2 = "utf8")) : (n2 = r2, r2 = void 0);
              }
              var i2 = this.length - t4;
              if ((void 0 === r2 || r2 > i2) && (r2 = i2), e2.length > 0 && (r2 < 0 || t4 < 0) || t4 > this.length)
                throw new RangeError("Attempt to write outside buffer bounds");
              n2 || (n2 = "utf8");
              for (var o2 = false; ; )
                switch (n2) {
                  case "hex":
                    return y(this, e2, t4, r2);
                  case "utf8":
                  case "utf-8":
                    return b(this, e2, t4, r2);
                  case "ascii":
                    return m(this, e2, t4, r2);
                  case "latin1":
                  case "binary":
                    return v(this, e2, t4, r2);
                  case "base64":
                    return w(this, e2, t4, r2);
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return _(this, e2, t4, r2);
                  default:
                    if (o2)
                      throw new TypeError("Unknown encoding: " + n2);
                    n2 = ("" + n2).toLowerCase(), o2 = true;
                }
            }, s.prototype.toJSON = function() {
              return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
            };
            var E = 4096;
            function C(e2, t4, r2) {
              var n2 = "";
              r2 = Math.min(e2.length, r2);
              for (var i2 = t4; i2 < r2; ++i2)
                n2 += String.fromCharCode(127 & e2[i2]);
              return n2;
            }
            function T(e2, t4, r2) {
              var n2 = "";
              r2 = Math.min(e2.length, r2);
              for (var i2 = t4; i2 < r2; ++i2)
                n2 += String.fromCharCode(e2[i2]);
              return n2;
            }
            function x(e2, t4, r2) {
              var n2 = e2.length;
              (!t4 || t4 < 0) && (t4 = 0), (!r2 || r2 < 0 || r2 > n2) && (r2 = n2);
              for (var i2 = "", o2 = t4; o2 < r2; ++o2)
                i2 += N(e2[o2]);
              return i2;
            }
            function A(e2, t4, r2) {
              for (var n2 = e2.slice(t4, r2), i2 = "", o2 = 0; o2 < n2.length; o2 += 2)
                i2 += String.fromCharCode(n2[o2] + 256 * n2[o2 + 1]);
              return i2;
            }
            function I(e2, t4, r2) {
              if (e2 % 1 != 0 || e2 < 0)
                throw new RangeError("offset is not uint");
              if (e2 + t4 > r2)
                throw new RangeError("Trying to access beyond buffer length");
            }
            function P(e2, t4, r2, n2, i2, o2) {
              if (!s.isBuffer(e2))
                throw new TypeError('"buffer" argument must be a Buffer instance');
              if (t4 > i2 || t4 < o2)
                throw new RangeError('"value" argument is out of bounds');
              if (r2 + n2 > e2.length)
                throw new RangeError("Index out of range");
            }
            function O(e2, t4, r2, n2, i2, o2) {
              if (r2 + n2 > e2.length)
                throw new RangeError("Index out of range");
              if (r2 < 0)
                throw new RangeError("Index out of range");
            }
            function B(e2, t4, r2, i2, o2) {
              return t4 = +t4, r2 >>>= 0, o2 || O(e2, 0, r2, 4), n.write(e2, t4, r2, i2, 23, 4), r2 + 4;
            }
            function R(e2, t4, r2, i2, o2) {
              return t4 = +t4, r2 >>>= 0, o2 || O(e2, 0, r2, 8), n.write(e2, t4, r2, i2, 52, 8), r2 + 8;
            }
            s.prototype.slice = function(e2, t4) {
              var r2 = this.length;
              e2 = ~~e2, t4 = void 0 === t4 ? r2 : ~~t4, e2 < 0 ? (e2 += r2) < 0 && (e2 = 0) : e2 > r2 && (e2 = r2), t4 < 0 ? (t4 += r2) < 0 && (t4 = 0) : t4 > r2 && (t4 = r2), t4 < e2 && (t4 = e2);
              var n2 = this.subarray(e2, t4);
              return n2.__proto__ = s.prototype, n2;
            }, s.prototype.readUIntLE = function(e2, t4, r2) {
              e2 >>>= 0, t4 >>>= 0, r2 || I(e2, t4, this.length);
              for (var n2 = this[e2], i2 = 1, o2 = 0; ++o2 < t4 && (i2 *= 256); )
                n2 += this[e2 + o2] * i2;
              return n2;
            }, s.prototype.readUIntBE = function(e2, t4, r2) {
              e2 >>>= 0, t4 >>>= 0, r2 || I(e2, t4, this.length);
              for (var n2 = this[e2 + --t4], i2 = 1; t4 > 0 && (i2 *= 256); )
                n2 += this[e2 + --t4] * i2;
              return n2;
            }, s.prototype.readUInt8 = function(e2, t4) {
              return e2 >>>= 0, t4 || I(e2, 1, this.length), this[e2];
            }, s.prototype.readUInt16LE = function(e2, t4) {
              return e2 >>>= 0, t4 || I(e2, 2, this.length), this[e2] | this[e2 + 1] << 8;
            }, s.prototype.readUInt16BE = function(e2, t4) {
              return e2 >>>= 0, t4 || I(e2, 2, this.length), this[e2] << 8 | this[e2 + 1];
            }, s.prototype.readUInt32LE = function(e2, t4) {
              return e2 >>>= 0, t4 || I(e2, 4, this.length), (this[e2] | this[e2 + 1] << 8 | this[e2 + 2] << 16) + 16777216 * this[e2 + 3];
            }, s.prototype.readUInt32BE = function(e2, t4) {
              return e2 >>>= 0, t4 || I(e2, 4, this.length), 16777216 * this[e2] + (this[e2 + 1] << 16 | this[e2 + 2] << 8 | this[e2 + 3]);
            }, s.prototype.readIntLE = function(e2, t4, r2) {
              e2 >>>= 0, t4 >>>= 0, r2 || I(e2, t4, this.length);
              for (var n2 = this[e2], i2 = 1, o2 = 0; ++o2 < t4 && (i2 *= 256); )
                n2 += this[e2 + o2] * i2;
              return n2 >= (i2 *= 128) && (n2 -= Math.pow(2, 8 * t4)), n2;
            }, s.prototype.readIntBE = function(e2, t4, r2) {
              e2 >>>= 0, t4 >>>= 0, r2 || I(e2, t4, this.length);
              for (var n2 = t4, i2 = 1, o2 = this[e2 + --n2]; n2 > 0 && (i2 *= 256); )
                o2 += this[e2 + --n2] * i2;
              return o2 >= (i2 *= 128) && (o2 -= Math.pow(2, 8 * t4)), o2;
            }, s.prototype.readInt8 = function(e2, t4) {
              return e2 >>>= 0, t4 || I(e2, 1, this.length), 128 & this[e2] ? -1 * (255 - this[e2] + 1) : this[e2];
            }, s.prototype.readInt16LE = function(e2, t4) {
              e2 >>>= 0, t4 || I(e2, 2, this.length);
              var r2 = this[e2] | this[e2 + 1] << 8;
              return 32768 & r2 ? 4294901760 | r2 : r2;
            }, s.prototype.readInt16BE = function(e2, t4) {
              e2 >>>= 0, t4 || I(e2, 2, this.length);
              var r2 = this[e2 + 1] | this[e2] << 8;
              return 32768 & r2 ? 4294901760 | r2 : r2;
            }, s.prototype.readInt32LE = function(e2, t4) {
              return e2 >>>= 0, t4 || I(e2, 4, this.length), this[e2] | this[e2 + 1] << 8 | this[e2 + 2] << 16 | this[e2 + 3] << 24;
            }, s.prototype.readInt32BE = function(e2, t4) {
              return e2 >>>= 0, t4 || I(e2, 4, this.length), this[e2] << 24 | this[e2 + 1] << 16 | this[e2 + 2] << 8 | this[e2 + 3];
            }, s.prototype.readFloatLE = function(e2, t4) {
              return e2 >>>= 0, t4 || I(e2, 4, this.length), n.read(this, e2, true, 23, 4);
            }, s.prototype.readFloatBE = function(e2, t4) {
              return e2 >>>= 0, t4 || I(e2, 4, this.length), n.read(this, e2, false, 23, 4);
            }, s.prototype.readDoubleLE = function(e2, t4) {
              return e2 >>>= 0, t4 || I(e2, 8, this.length), n.read(this, e2, true, 52, 8);
            }, s.prototype.readDoubleBE = function(e2, t4) {
              return e2 >>>= 0, t4 || I(e2, 8, this.length), n.read(this, e2, false, 52, 8);
            }, s.prototype.writeUIntLE = function(e2, t4, r2, n2) {
              (e2 = +e2, t4 >>>= 0, r2 >>>= 0, n2) || P(this, e2, t4, r2, Math.pow(2, 8 * r2) - 1, 0);
              var i2 = 1, o2 = 0;
              for (this[t4] = 255 & e2; ++o2 < r2 && (i2 *= 256); )
                this[t4 + o2] = e2 / i2 & 255;
              return t4 + r2;
            }, s.prototype.writeUIntBE = function(e2, t4, r2, n2) {
              (e2 = +e2, t4 >>>= 0, r2 >>>= 0, n2) || P(this, e2, t4, r2, Math.pow(2, 8 * r2) - 1, 0);
              var i2 = r2 - 1, o2 = 1;
              for (this[t4 + i2] = 255 & e2; --i2 >= 0 && (o2 *= 256); )
                this[t4 + i2] = e2 / o2 & 255;
              return t4 + r2;
            }, s.prototype.writeUInt8 = function(e2, t4, r2) {
              return e2 = +e2, t4 >>>= 0, r2 || P(this, e2, t4, 1, 255, 0), this[t4] = 255 & e2, t4 + 1;
            }, s.prototype.writeUInt16LE = function(e2, t4, r2) {
              return e2 = +e2, t4 >>>= 0, r2 || P(this, e2, t4, 2, 65535, 0), this[t4] = 255 & e2, this[t4 + 1] = e2 >>> 8, t4 + 2;
            }, s.prototype.writeUInt16BE = function(e2, t4, r2) {
              return e2 = +e2, t4 >>>= 0, r2 || P(this, e2, t4, 2, 65535, 0), this[t4] = e2 >>> 8, this[t4 + 1] = 255 & e2, t4 + 2;
            }, s.prototype.writeUInt32LE = function(e2, t4, r2) {
              return e2 = +e2, t4 >>>= 0, r2 || P(this, e2, t4, 4, 4294967295, 0), this[t4 + 3] = e2 >>> 24, this[t4 + 2] = e2 >>> 16, this[t4 + 1] = e2 >>> 8, this[t4] = 255 & e2, t4 + 4;
            }, s.prototype.writeUInt32BE = function(e2, t4, r2) {
              return e2 = +e2, t4 >>>= 0, r2 || P(this, e2, t4, 4, 4294967295, 0), this[t4] = e2 >>> 24, this[t4 + 1] = e2 >>> 16, this[t4 + 2] = e2 >>> 8, this[t4 + 3] = 255 & e2, t4 + 4;
            }, s.prototype.writeIntLE = function(e2, t4, r2, n2) {
              if (e2 = +e2, t4 >>>= 0, !n2) {
                var i2 = Math.pow(2, 8 * r2 - 1);
                P(this, e2, t4, r2, i2 - 1, -i2);
              }
              var o2 = 0, s2 = 1, a2 = 0;
              for (this[t4] = 255 & e2; ++o2 < r2 && (s2 *= 256); )
                e2 < 0 && 0 === a2 && 0 !== this[t4 + o2 - 1] && (a2 = 1), this[t4 + o2] = (e2 / s2 >> 0) - a2 & 255;
              return t4 + r2;
            }, s.prototype.writeIntBE = function(e2, t4, r2, n2) {
              if (e2 = +e2, t4 >>>= 0, !n2) {
                var i2 = Math.pow(2, 8 * r2 - 1);
                P(this, e2, t4, r2, i2 - 1, -i2);
              }
              var o2 = r2 - 1, s2 = 1, a2 = 0;
              for (this[t4 + o2] = 255 & e2; --o2 >= 0 && (s2 *= 256); )
                e2 < 0 && 0 === a2 && 0 !== this[t4 + o2 + 1] && (a2 = 1), this[t4 + o2] = (e2 / s2 >> 0) - a2 & 255;
              return t4 + r2;
            }, s.prototype.writeInt8 = function(e2, t4, r2) {
              return e2 = +e2, t4 >>>= 0, r2 || P(this, e2, t4, 1, 127, -128), e2 < 0 && (e2 = 255 + e2 + 1), this[t4] = 255 & e2, t4 + 1;
            }, s.prototype.writeInt16LE = function(e2, t4, r2) {
              return e2 = +e2, t4 >>>= 0, r2 || P(this, e2, t4, 2, 32767, -32768), this[t4] = 255 & e2, this[t4 + 1] = e2 >>> 8, t4 + 2;
            }, s.prototype.writeInt16BE = function(e2, t4, r2) {
              return e2 = +e2, t4 >>>= 0, r2 || P(this, e2, t4, 2, 32767, -32768), this[t4] = e2 >>> 8, this[t4 + 1] = 255 & e2, t4 + 2;
            }, s.prototype.writeInt32LE = function(e2, t4, r2) {
              return e2 = +e2, t4 >>>= 0, r2 || P(this, e2, t4, 4, 2147483647, -2147483648), this[t4] = 255 & e2, this[t4 + 1] = e2 >>> 8, this[t4 + 2] = e2 >>> 16, this[t4 + 3] = e2 >>> 24, t4 + 4;
            }, s.prototype.writeInt32BE = function(e2, t4, r2) {
              return e2 = +e2, t4 >>>= 0, r2 || P(this, e2, t4, 4, 2147483647, -2147483648), e2 < 0 && (e2 = 4294967295 + e2 + 1), this[t4] = e2 >>> 24, this[t4 + 1] = e2 >>> 16, this[t4 + 2] = e2 >>> 8, this[t4 + 3] = 255 & e2, t4 + 4;
            }, s.prototype.writeFloatLE = function(e2, t4, r2) {
              return B(this, e2, t4, true, r2);
            }, s.prototype.writeFloatBE = function(e2, t4, r2) {
              return B(this, e2, t4, false, r2);
            }, s.prototype.writeDoubleLE = function(e2, t4, r2) {
              return R(this, e2, t4, true, r2);
            }, s.prototype.writeDoubleBE = function(e2, t4, r2) {
              return R(this, e2, t4, false, r2);
            }, s.prototype.copy = function(e2, t4, r2, n2) {
              if (!s.isBuffer(e2))
                throw new TypeError("argument should be a Buffer");
              if (r2 || (r2 = 0), n2 || 0 === n2 || (n2 = this.length), t4 >= e2.length && (t4 = e2.length), t4 || (t4 = 0), n2 > 0 && n2 < r2 && (n2 = r2), n2 === r2)
                return 0;
              if (0 === e2.length || 0 === this.length)
                return 0;
              if (t4 < 0)
                throw new RangeError("targetStart out of bounds");
              if (r2 < 0 || r2 >= this.length)
                throw new RangeError("Index out of range");
              if (n2 < 0)
                throw new RangeError("sourceEnd out of bounds");
              n2 > this.length && (n2 = this.length), e2.length - t4 < n2 - r2 && (n2 = e2.length - t4 + r2);
              var i2 = n2 - r2;
              if (this === e2 && "function" == typeof Uint8Array.prototype.copyWithin)
                this.copyWithin(t4, r2, n2);
              else if (this === e2 && r2 < t4 && t4 < n2)
                for (var o2 = i2 - 1; o2 >= 0; --o2)
                  e2[o2 + t4] = this[o2 + r2];
              else
                Uint8Array.prototype.set.call(e2, this.subarray(r2, n2), t4);
              return i2;
            }, s.prototype.fill = function(e2, t4, r2, n2) {
              if ("string" == typeof e2) {
                if ("string" == typeof t4 ? (n2 = t4, t4 = 0, r2 = this.length) : "string" == typeof r2 && (n2 = r2, r2 = this.length), void 0 !== n2 && "string" != typeof n2)
                  throw new TypeError("encoding must be a string");
                if ("string" == typeof n2 && !s.isEncoding(n2))
                  throw new TypeError("Unknown encoding: " + n2);
                if (1 === e2.length) {
                  var i2 = e2.charCodeAt(0);
                  ("utf8" === n2 && i2 < 128 || "latin1" === n2) && (e2 = i2);
                }
              } else
                "number" == typeof e2 && (e2 &= 255);
              if (t4 < 0 || this.length < t4 || this.length < r2)
                throw new RangeError("Out of range index");
              if (r2 <= t4)
                return this;
              var o2;
              if (t4 >>>= 0, r2 = void 0 === r2 ? this.length : r2 >>> 0, e2 || (e2 = 0), "number" == typeof e2)
                for (o2 = t4; o2 < r2; ++o2)
                  this[o2] = e2;
              else {
                var a2 = s.isBuffer(e2) ? e2 : s.from(e2, n2), l2 = a2.length;
                if (0 === l2)
                  throw new TypeError('The value "' + e2 + '" is invalid for argument "value"');
                for (o2 = 0; o2 < r2 - t4; ++o2)
                  this[o2 + t4] = a2[o2 % l2];
              }
              return this;
            };
            var M = /[^+/0-9A-Za-z-_]/g;
            function N(e2) {
              return e2 < 16 ? "0" + e2.toString(16) : e2.toString(16);
            }
            function L(e2, t4) {
              var r2;
              t4 = t4 || 1 / 0;
              for (var n2 = e2.length, i2 = null, o2 = [], s2 = 0; s2 < n2; ++s2) {
                if ((r2 = e2.charCodeAt(s2)) > 55295 && r2 < 57344) {
                  if (!i2) {
                    if (r2 > 56319) {
                      (t4 -= 3) > -1 && o2.push(239, 191, 189);
                      continue;
                    }
                    if (s2 + 1 === n2) {
                      (t4 -= 3) > -1 && o2.push(239, 191, 189);
                      continue;
                    }
                    i2 = r2;
                    continue;
                  }
                  if (r2 < 56320) {
                    (t4 -= 3) > -1 && o2.push(239, 191, 189), i2 = r2;
                    continue;
                  }
                  r2 = 65536 + (i2 - 55296 << 10 | r2 - 56320);
                } else
                  i2 && (t4 -= 3) > -1 && o2.push(239, 191, 189);
                if (i2 = null, r2 < 128) {
                  if ((t4 -= 1) < 0)
                    break;
                  o2.push(r2);
                } else if (r2 < 2048) {
                  if ((t4 -= 2) < 0)
                    break;
                  o2.push(r2 >> 6 | 192, 63 & r2 | 128);
                } else if (r2 < 65536) {
                  if ((t4 -= 3) < 0)
                    break;
                  o2.push(r2 >> 12 | 224, r2 >> 6 & 63 | 128, 63 & r2 | 128);
                } else {
                  if (!(r2 < 1114112))
                    throw new Error("Invalid code point");
                  if ((t4 -= 4) < 0)
                    break;
                  o2.push(r2 >> 18 | 240, r2 >> 12 & 63 | 128, r2 >> 6 & 63 | 128, 63 & r2 | 128);
                }
              }
              return o2;
            }
            function j(e2) {
              return t3.toByteArray(function(e3) {
                if ((e3 = (e3 = e3.split("=")[0]).trim().replace(M, "")).length < 2)
                  return "";
                for (; e3.length % 4 != 0; )
                  e3 += "=";
                return e3;
              }(e2));
            }
            function U(e2, t4, r2, n2) {
              for (var i2 = 0; i2 < n2 && !(i2 + r2 >= t4.length || i2 >= e2.length); ++i2)
                t4[i2 + r2] = e2[i2];
              return i2;
            }
            function q(e2, t4) {
              return e2 instanceof t4 || null != e2 && null != e2.constructor && null != e2.constructor.name && e2.constructor.name === t4.name;
            }
            function D(e2) {
              return e2 != e2;
            }
          }).call(this);
        }).call(this, e("buffer").Buffer);
      }, { "base64-js": 13, buffer: 17, ieee754: 23 }], 18: [function(e, t, r) {
        (function(n) {
          (function() {
            r.formatArgs = function(e2) {
              if (e2[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + e2[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors)
                return;
              const r2 = "color: " + this.color;
              e2.splice(1, 0, r2, "color: inherit");
              let n2 = 0, i2 = 0;
              e2[0].replace(/%[a-zA-Z%]/g, (e3) => {
                "%%" !== e3 && "%c" === e3 && (i2 = ++n2);
              }), e2.splice(i2, 0, r2);
            }, r.save = function(e2) {
              try {
                e2 ? r.storage.setItem("debug", e2) : r.storage.removeItem("debug");
              } catch (e3) {
              }
            }, r.load = function() {
              let e2;
              try {
                e2 = r.storage.getItem("debug");
              } catch (e3) {
              }
              !e2 && void 0 !== n && "env" in n && (e2 = n.env.DEBUG);
              return e2;
            }, r.useColors = function() {
              if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs))
                return true;
              if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
                return false;
              return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
            }, r.storage = function() {
              try {
                return localStorage;
              } catch (e2) {
              }
            }(), r.destroy = /* @__PURE__ */ (() => {
              let e2 = false;
              return () => {
                e2 || (e2 = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
              };
            })(), r.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], r.log = console.debug || console.log || (() => {
            }), t.exports = e("./common")(r);
            const { formatters: i } = t.exports;
            i.j = function(e2) {
              try {
                return JSON.stringify(e2);
              } catch (e3) {
                return "[UnexpectedJSONParseError]: " + e3.message;
              }
            };
          }).call(this);
        }).call(this, e("_process"));
      }, { "./common": 19, _process: 50 }], 19: [function(e, t, r) {
        t.exports = function(t2) {
          function r2(e2) {
            let t3, i2, o, s = null;
            function a(...e3) {
              if (!a.enabled)
                return;
              const n2 = a, i3 = Number(/* @__PURE__ */ new Date()), o2 = i3 - (t3 || i3);
              n2.diff = o2, n2.prev = t3, n2.curr = i3, t3 = i3, e3[0] = r2.coerce(e3[0]), "string" != typeof e3[0] && e3.unshift("%O");
              let s2 = 0;
              e3[0] = e3[0].replace(/%([a-zA-Z%])/g, (t4, i4) => {
                if ("%%" === t4)
                  return "%";
                s2++;
                const o3 = r2.formatters[i4];
                if ("function" == typeof o3) {
                  const r3 = e3[s2];
                  t4 = o3.call(n2, r3), e3.splice(s2, 1), s2--;
                }
                return t4;
              }), r2.formatArgs.call(n2, e3), (n2.log || r2.log).apply(n2, e3);
            }
            return a.namespace = e2, a.useColors = r2.useColors(), a.color = r2.selectColor(e2), a.extend = n, a.destroy = r2.destroy, Object.defineProperty(a, "enabled", { enumerable: true, configurable: false, get: () => null !== s ? s : (i2 !== r2.namespaces && (i2 = r2.namespaces, o = r2.enabled(e2)), o), set: (e3) => {
              s = e3;
            } }), "function" == typeof r2.init && r2.init(a), a;
          }
          function n(e2, t3) {
            const n2 = r2(this.namespace + (void 0 === t3 ? ":" : t3) + e2);
            return n2.log = this.log, n2;
          }
          function i(e2) {
            return e2.toString().substring(2, e2.toString().length - 2).replace(/\.\*\?$/, "*");
          }
          return r2.debug = r2, r2.default = r2, r2.coerce = function(e2) {
            return e2 instanceof Error ? e2.stack || e2.message : e2;
          }, r2.disable = function() {
            const e2 = [...r2.names.map(i), ...r2.skips.map(i).map((e3) => "-" + e3)].join(",");
            return r2.enable(""), e2;
          }, r2.enable = function(e2) {
            let t3;
            r2.save(e2), r2.namespaces = e2, r2.names = [], r2.skips = [];
            const n2 = ("string" == typeof e2 ? e2 : "").split(/[\s,]+/), i2 = n2.length;
            for (t3 = 0; t3 < i2; t3++)
              n2[t3] && ("-" === (e2 = n2[t3].replace(/\*/g, ".*?"))[0] ? r2.skips.push(new RegExp("^" + e2.substr(1) + "$")) : r2.names.push(new RegExp("^" + e2 + "$")));
          }, r2.enabled = function(e2) {
            if ("*" === e2[e2.length - 1])
              return true;
            let t3, n2;
            for (t3 = 0, n2 = r2.skips.length; t3 < n2; t3++)
              if (r2.skips[t3].test(e2))
                return false;
            for (t3 = 0, n2 = r2.names.length; t3 < n2; t3++)
              if (r2.names[t3].test(e2))
                return true;
            return false;
          }, r2.humanize = e("ms"), r2.destroy = function() {
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
          }, Object.keys(t2).forEach((e2) => {
            r2[e2] = t2[e2];
          }), r2.names = [], r2.skips = [], r2.formatters = {}, r2.selectColor = function(e2) {
            let t3 = 0;
            for (let r3 = 0; r3 < e2.length; r3++)
              t3 = (t3 << 5) - t3 + e2.charCodeAt(r3), t3 |= 0;
            return r2.colors[Math.abs(t3) % r2.colors.length];
          }, r2.enable(r2.load()), r2;
        };
      }, { ms: 45 }], 20: [function(e, t, r) {
        (function(r2, n) {
          (function() {
            var i = e("readable-stream"), o = e("end-of-stream"), s = e("inherits"), a = e("stream-shift"), l = n.from && n.from !== Uint8Array.from ? n.from([0]) : new n([0]), u = function(e2, t2) {
              e2._corked ? e2.once("uncork", t2) : t2();
            }, c = function(e2, t2) {
              return function(r3) {
                r3 ? function(e3, t3) {
                  e3._autoDestroy && e3.destroy(t3);
                }(e2, "premature close" === r3.message ? null : r3) : t2 && !e2._ended && e2.end();
              };
            }, h = function() {
            }, f = function(e2, t2, r3) {
              if (!(this instanceof f))
                return new f(e2, t2, r3);
              i.Duplex.call(this, r3), this._writable = null, this._readable = null, this._readable2 = null, this._autoDestroy = !r3 || false !== r3.autoDestroy, this._forwardDestroy = !r3 || false !== r3.destroy, this._forwardEnd = !r3 || false !== r3.end, this._corked = 1, this._ondrain = null, this._drained = false, this._forwarding = false, this._unwrite = null, this._unread = null, this._ended = false, this.destroyed = false, e2 && this.setWritable(e2), t2 && this.setReadable(t2);
            };
            s(f, i.Duplex), f.obj = function(e2, t2, r3) {
              return r3 || (r3 = {}), r3.objectMode = true, r3.highWaterMark = 16, new f(e2, t2, r3);
            }, f.prototype.cork = function() {
              1 == ++this._corked && this.emit("cork");
            }, f.prototype.uncork = function() {
              this._corked && 0 == --this._corked && this.emit("uncork");
            }, f.prototype.setWritable = function(e2) {
              if (this._unwrite && this._unwrite(), this.destroyed)
                e2 && e2.destroy && e2.destroy();
              else if (null !== e2 && false !== e2) {
                var t2 = this, n2 = o(e2, { writable: true, readable: false }, c(this, this._forwardEnd)), i2 = function() {
                  var e3 = t2._ondrain;
                  t2._ondrain = null, e3 && e3();
                };
                this._unwrite && r2.nextTick(i2), this._writable = e2, this._writable.on("drain", i2), this._unwrite = function() {
                  t2._writable.removeListener("drain", i2), n2();
                }, this.uncork();
              } else
                this.end();
            }, f.prototype.setReadable = function(e2) {
              if (this._unread && this._unread(), this.destroyed)
                e2 && e2.destroy && e2.destroy();
              else {
                if (null === e2 || false === e2)
                  return this.push(null), void this.resume();
                var t2, r3 = this, n2 = o(e2, { writable: false, readable: true }, c(this)), s2 = function() {
                  r3._forward();
                }, a2 = function() {
                  r3.push(null);
                };
                this._drained = true, this._readable = e2, this._readable2 = e2._readableState ? e2 : (t2 = e2, new i.Readable({ objectMode: true, highWaterMark: 16 }).wrap(t2)), this._readable2.on("readable", s2), this._readable2.on("end", a2), this._unread = function() {
                  r3._readable2.removeListener("readable", s2), r3._readable2.removeListener("end", a2), n2();
                }, this._forward();
              }
            }, f.prototype._read = function() {
              this._drained = true, this._forward();
            }, f.prototype._forward = function() {
              if (!this._forwarding && this._readable2 && this._drained) {
                var e2;
                for (this._forwarding = true; this._drained && null !== (e2 = a(this._readable2)); )
                  this.destroyed || (this._drained = this.push(e2));
                this._forwarding = false;
              }
            }, f.prototype.destroy = function(e2, t2) {
              if (t2 || (t2 = h), this.destroyed)
                return t2(null);
              this.destroyed = true;
              var n2 = this;
              r2.nextTick(function() {
                n2._destroy(e2), t2(null);
              });
            }, f.prototype._destroy = function(e2) {
              if (e2) {
                var t2 = this._ondrain;
                this._ondrain = null, t2 ? t2(e2) : this.emit("error", e2);
              }
              this._forwardDestroy && (this._readable && this._readable.destroy && this._readable.destroy(), this._writable && this._writable.destroy && this._writable.destroy()), this.emit("close");
            }, f.prototype._write = function(e2, t2, r3) {
              if (!this.destroyed)
                return this._corked ? u(this, this._write.bind(this, e2, t2, r3)) : e2 === l ? this._finish(r3) : this._writable ? void (false === this._writable.write(e2) ? this._ondrain = r3 : this.destroyed || r3()) : r3();
            }, f.prototype._finish = function(e2) {
              var t2 = this;
              this.emit("preend"), u(this, function() {
                var r3, n2;
                r3 = t2._forwardEnd && t2._writable, n2 = function() {
                  false === t2._writableState.prefinished && (t2._writableState.prefinished = true), t2.emit("prefinish"), u(t2, e2);
                }, r3 ? r3._writableState && r3._writableState.finished ? n2() : r3._writableState ? r3.end(n2) : (r3.end(), n2()) : n2();
              });
            }, f.prototype.end = function(e2, t2, r3) {
              return "function" == typeof e2 ? this.end(null, null, e2) : "function" == typeof t2 ? this.end(e2, null, t2) : (this._ended = true, e2 && this.write(e2), this._writableState.ending || this._writableState.destroyed || this.write(l), i.Writable.prototype.end.call(this, r3));
            }, t.exports = f;
          }).call(this);
        }).call(this, e("_process"), e("buffer").Buffer);
      }, { _process: 50, buffer: 17, "end-of-stream": 21, inherits: 24, "readable-stream": 69, "stream-shift": 74 }], 21: [function(e, t, r) {
        (function(r2) {
          (function() {
            var n = e("once"), i = function() {
            }, o = function(e2, t2, s) {
              if ("function" == typeof t2)
                return o(e2, null, t2);
              t2 || (t2 = {}), s = n(s || i);
              var a = e2._writableState, l = e2._readableState, u = t2.readable || false !== t2.readable && e2.readable, c = t2.writable || false !== t2.writable && e2.writable, h = false, f = function() {
                e2.writable || p();
              }, p = function() {
                c = false, u || s.call(e2);
              }, d = function() {
                u = false, c || s.call(e2);
              }, g = function(t3) {
                s.call(e2, t3 ? new Error("exited with error code: " + t3) : null);
              }, y = function(t3) {
                s.call(e2, t3);
              }, b = function() {
                r2.nextTick(m);
              }, m = function() {
                if (!h)
                  return (!u || l && l.ended && !l.destroyed) && (!c || a && a.ended && !a.destroyed) ? void 0 : s.call(e2, new Error("premature close"));
              }, v = function() {
                e2.req.on("finish", p);
              };
              return !function(e3) {
                return e3.setHeader && "function" == typeof e3.abort;
              }(e2) ? c && !a && (e2.on("end", f), e2.on("close", f)) : (e2.on("complete", p), e2.on("abort", b), e2.req ? v() : e2.on("request", v)), function(e3) {
                return e3.stdio && Array.isArray(e3.stdio) && 3 === e3.stdio.length;
              }(e2) && e2.on("exit", g), e2.on("end", d), e2.on("finish", p), false !== t2.error && e2.on("error", y), e2.on("close", b), function() {
                h = true, e2.removeListener("complete", p), e2.removeListener("abort", b), e2.removeListener("request", v), e2.req && e2.req.removeListener("finish", p), e2.removeListener("end", f), e2.removeListener("close", f), e2.removeListener("finish", p), e2.removeListener("exit", g), e2.removeListener("end", d), e2.removeListener("error", y), e2.removeListener("close", b);
              };
            };
            t.exports = o;
          }).call(this);
        }).call(this, e("_process"));
      }, { _process: 50, once: 48 }], 22: [function(e, t, r) {
        var n = Object.create || function(e2) {
          var t2 = function() {
          };
          return t2.prototype = e2, new t2();
        }, i = Object.keys || function(e2) {
          var t2 = [];
          for (var r2 in e2)
            Object.prototype.hasOwnProperty.call(e2, r2) && t2.push(r2);
          return r2;
        }, o = Function.prototype.bind || function(e2) {
          var t2 = this;
          return function() {
            return t2.apply(e2, arguments);
          };
        };
        function s() {
          this._events && Object.prototype.hasOwnProperty.call(this, "_events") || (this._events = n(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
        }
        t.exports = s, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._maxListeners = void 0;
        var a, l = 10;
        try {
          var u = {};
          Object.defineProperty && Object.defineProperty(u, "x", { value: 0 }), a = 0 === u.x;
        } catch (e2) {
          a = false;
        }
        function c(e2) {
          return void 0 === e2._maxListeners ? s.defaultMaxListeners : e2._maxListeners;
        }
        function h(e2, t2, r2, i2) {
          var o2, s2, a2;
          if ("function" != typeof r2)
            throw new TypeError('"listener" argument must be a function');
          if ((s2 = e2._events) ? (s2.newListener && (e2.emit("newListener", t2, r2.listener ? r2.listener : r2), s2 = e2._events), a2 = s2[t2]) : (s2 = e2._events = n(null), e2._eventsCount = 0), a2) {
            if ("function" == typeof a2 ? a2 = s2[t2] = i2 ? [r2, a2] : [a2, r2] : i2 ? a2.unshift(r2) : a2.push(r2), !a2.warned && (o2 = c(e2)) && o2 > 0 && a2.length > o2) {
              a2.warned = true;
              var l2 = new Error("Possible EventEmitter memory leak detected. " + a2.length + ' "' + String(t2) + '" listeners added. Use emitter.setMaxListeners() to increase limit.');
              l2.name = "MaxListenersExceededWarning", l2.emitter = e2, l2.type = t2, l2.count = a2.length, "object" == typeof console && console.warn && console.warn("%s: %s", l2.name, l2.message);
            }
          } else
            a2 = s2[t2] = r2, ++e2._eventsCount;
          return e2;
        }
        function f() {
          if (!this.fired)
            switch (this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length) {
              case 0:
                return this.listener.call(this.target);
              case 1:
                return this.listener.call(this.target, arguments[0]);
              case 2:
                return this.listener.call(this.target, arguments[0], arguments[1]);
              case 3:
                return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);
              default:
                for (var e2 = new Array(arguments.length), t2 = 0; t2 < e2.length; ++t2)
                  e2[t2] = arguments[t2];
                this.listener.apply(this.target, e2);
            }
        }
        function p(e2, t2, r2) {
          var n2 = { fired: false, wrapFn: void 0, target: e2, type: t2, listener: r2 }, i2 = o.call(f, n2);
          return i2.listener = r2, n2.wrapFn = i2, i2;
        }
        function d(e2, t2, r2) {
          var n2 = e2._events;
          if (!n2)
            return [];
          var i2 = n2[t2];
          return i2 ? "function" == typeof i2 ? r2 ? [i2.listener || i2] : [i2] : r2 ? function(e3) {
            for (var t3 = new Array(e3.length), r3 = 0; r3 < t3.length; ++r3)
              t3[r3] = e3[r3].listener || e3[r3];
            return t3;
          }(i2) : y(i2, i2.length) : [];
        }
        function g(e2) {
          var t2 = this._events;
          if (t2) {
            var r2 = t2[e2];
            if ("function" == typeof r2)
              return 1;
            if (r2)
              return r2.length;
          }
          return 0;
        }
        function y(e2, t2) {
          for (var r2 = new Array(t2), n2 = 0; n2 < t2; ++n2)
            r2[n2] = e2[n2];
          return r2;
        }
        a ? Object.defineProperty(s, "defaultMaxListeners", { enumerable: true, get: function() {
          return l;
        }, set: function(e2) {
          if ("number" != typeof e2 || e2 < 0 || e2 != e2)
            throw new TypeError('"defaultMaxListeners" must be a positive number');
          l = e2;
        } }) : s.defaultMaxListeners = l, s.prototype.setMaxListeners = function(e2) {
          if ("number" != typeof e2 || e2 < 0 || isNaN(e2))
            throw new TypeError('"n" argument must be a positive number');
          return this._maxListeners = e2, this;
        }, s.prototype.getMaxListeners = function() {
          return c(this);
        }, s.prototype.emit = function(e2) {
          var t2, r2, n2, i2, o2, s2, a2 = "error" === e2;
          if (s2 = this._events)
            a2 = a2 && null == s2.error;
          else if (!a2)
            return false;
          if (a2) {
            if (arguments.length > 1 && (t2 = arguments[1]), t2 instanceof Error)
              throw t2;
            var l2 = new Error('Unhandled "error" event. (' + t2 + ")");
            throw l2.context = t2, l2;
          }
          if (!(r2 = s2[e2]))
            return false;
          var u2 = "function" == typeof r2;
          switch (n2 = arguments.length) {
            case 1:
              !function(e3, t3, r3) {
                if (t3)
                  e3.call(r3);
                else
                  for (var n3 = e3.length, i3 = y(e3, n3), o3 = 0; o3 < n3; ++o3)
                    i3[o3].call(r3);
              }(r2, u2, this);
              break;
            case 2:
              !function(e3, t3, r3, n3) {
                if (t3)
                  e3.call(r3, n3);
                else
                  for (var i3 = e3.length, o3 = y(e3, i3), s3 = 0; s3 < i3; ++s3)
                    o3[s3].call(r3, n3);
              }(r2, u2, this, arguments[1]);
              break;
            case 3:
              !function(e3, t3, r3, n3, i3) {
                if (t3)
                  e3.call(r3, n3, i3);
                else
                  for (var o3 = e3.length, s3 = y(e3, o3), a3 = 0; a3 < o3; ++a3)
                    s3[a3].call(r3, n3, i3);
              }(r2, u2, this, arguments[1], arguments[2]);
              break;
            case 4:
              !function(e3, t3, r3, n3, i3, o3) {
                if (t3)
                  e3.call(r3, n3, i3, o3);
                else
                  for (var s3 = e3.length, a3 = y(e3, s3), l3 = 0; l3 < s3; ++l3)
                    a3[l3].call(r3, n3, i3, o3);
              }(r2, u2, this, arguments[1], arguments[2], arguments[3]);
              break;
            default:
              for (i2 = new Array(n2 - 1), o2 = 1; o2 < n2; o2++)
                i2[o2 - 1] = arguments[o2];
              !function(e3, t3, r3, n3) {
                if (t3)
                  e3.apply(r3, n3);
                else
                  for (var i3 = e3.length, o3 = y(e3, i3), s3 = 0; s3 < i3; ++s3)
                    o3[s3].apply(r3, n3);
              }(r2, u2, this, i2);
          }
          return true;
        }, s.prototype.addListener = function(e2, t2) {
          return h(this, e2, t2, false);
        }, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function(e2, t2) {
          return h(this, e2, t2, true);
        }, s.prototype.once = function(e2, t2) {
          if ("function" != typeof t2)
            throw new TypeError('"listener" argument must be a function');
          return this.on(e2, p(this, e2, t2)), this;
        }, s.prototype.prependOnceListener = function(e2, t2) {
          if ("function" != typeof t2)
            throw new TypeError('"listener" argument must be a function');
          return this.prependListener(e2, p(this, e2, t2)), this;
        }, s.prototype.removeListener = function(e2, t2) {
          var r2, i2, o2, s2, a2;
          if ("function" != typeof t2)
            throw new TypeError('"listener" argument must be a function');
          if (!(i2 = this._events))
            return this;
          if (!(r2 = i2[e2]))
            return this;
          if (r2 === t2 || r2.listener === t2)
            0 == --this._eventsCount ? this._events = n(null) : (delete i2[e2], i2.removeListener && this.emit("removeListener", e2, r2.listener || t2));
          else if ("function" != typeof r2) {
            for (o2 = -1, s2 = r2.length - 1; s2 >= 0; s2--)
              if (r2[s2] === t2 || r2[s2].listener === t2) {
                a2 = r2[s2].listener, o2 = s2;
                break;
              }
            if (o2 < 0)
              return this;
            0 === o2 ? r2.shift() : function(e3, t3) {
              for (var r3 = t3, n2 = r3 + 1, i3 = e3.length; n2 < i3; r3 += 1, n2 += 1)
                e3[r3] = e3[n2];
              e3.pop();
            }(r2, o2), 1 === r2.length && (i2[e2] = r2[0]), i2.removeListener && this.emit("removeListener", e2, a2 || t2);
          }
          return this;
        }, s.prototype.removeAllListeners = function(e2) {
          var t2, r2, o2;
          if (!(r2 = this._events))
            return this;
          if (!r2.removeListener)
            return 0 === arguments.length ? (this._events = n(null), this._eventsCount = 0) : r2[e2] && (0 == --this._eventsCount ? this._events = n(null) : delete r2[e2]), this;
          if (0 === arguments.length) {
            var s2, a2 = i(r2);
            for (o2 = 0; o2 < a2.length; ++o2)
              "removeListener" !== (s2 = a2[o2]) && this.removeAllListeners(s2);
            return this.removeAllListeners("removeListener"), this._events = n(null), this._eventsCount = 0, this;
          }
          if ("function" == typeof (t2 = r2[e2]))
            this.removeListener(e2, t2);
          else if (t2)
            for (o2 = t2.length - 1; o2 >= 0; o2--)
              this.removeListener(e2, t2[o2]);
          return this;
        }, s.prototype.listeners = function(e2) {
          return d(this, e2, true);
        }, s.prototype.rawListeners = function(e2) {
          return d(this, e2, false);
        }, s.listenerCount = function(e2, t2) {
          return "function" == typeof e2.listenerCount ? e2.listenerCount(t2) : g.call(e2, t2);
        }, s.prototype.listenerCount = g, s.prototype.eventNames = function() {
          return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
        };
      }, {}], 23: [function(e, t, r) {
        r.read = function(e2, t2, r2, n, i) {
          var o, s, a = 8 * i - n - 1, l = (1 << a) - 1, u = l >> 1, c = -7, h = r2 ? i - 1 : 0, f = r2 ? -1 : 1, p = e2[t2 + h];
          for (h += f, o = p & (1 << -c) - 1, p >>= -c, c += a; c > 0; o = 256 * o + e2[t2 + h], h += f, c -= 8)
            ;
          for (s = o & (1 << -c) - 1, o >>= -c, c += n; c > 0; s = 256 * s + e2[t2 + h], h += f, c -= 8)
            ;
          if (0 === o)
            o = 1 - u;
          else {
            if (o === l)
              return s ? NaN : 1 / 0 * (p ? -1 : 1);
            s += Math.pow(2, n), o -= u;
          }
          return (p ? -1 : 1) * s * Math.pow(2, o - n);
        }, r.write = function(e2, t2, r2, n, i, o) {
          var s, a, l, u = 8 * o - i - 1, c = (1 << u) - 1, h = c >> 1, f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = n ? 0 : o - 1, d = n ? 1 : -1, g = t2 < 0 || 0 === t2 && 1 / t2 < 0 ? 1 : 0;
          for (t2 = Math.abs(t2), isNaN(t2) || t2 === 1 / 0 ? (a = isNaN(t2) ? 1 : 0, s = c) : (s = Math.floor(Math.log(t2) / Math.LN2), t2 * (l = Math.pow(2, -s)) < 1 && (s--, l *= 2), (t2 += s + h >= 1 ? f / l : f * Math.pow(2, 1 - h)) * l >= 2 && (s++, l /= 2), s + h >= c ? (a = 0, s = c) : s + h >= 1 ? (a = (t2 * l - 1) * Math.pow(2, i), s += h) : (a = t2 * Math.pow(2, h - 1) * Math.pow(2, i), s = 0)); i >= 8; e2[r2 + p] = 255 & a, p += d, a /= 256, i -= 8)
            ;
          for (s = s << i | a, u += i; u > 0; e2[r2 + p] = 255 & s, p += d, s /= 256, u -= 8)
            ;
          e2[r2 + p - d] |= 128 * g;
        };
      }, {}], 24: [function(e, t, r) {
        "function" == typeof Object.create ? t.exports = function(e2, t2) {
          t2 && (e2.super_ = t2, e2.prototype = Object.create(t2.prototype, { constructor: { value: e2, enumerable: false, writable: true, configurable: true } }));
        } : t.exports = function(e2, t2) {
          if (t2) {
            e2.super_ = t2;
            var r2 = function() {
            };
            r2.prototype = t2.prototype, e2.prototype = new r2(), e2.prototype.constructor = e2;
          }
        };
      }, {}], 25: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: true });
        var n = function() {
          function e2(e3, t2) {
            this.color = true, this.key = void 0, this.value = void 0, this.parent = void 0, this.brother = void 0, this.leftChild = void 0, this.rightChild = void 0, this.key = e3, this.value = t2;
          }
          return e2.prototype.rotateLeft = function() {
            var e3 = this.parent, t2 = this.brother, r2 = this.leftChild, n2 = this.rightChild;
            if (!n2)
              throw new Error("unknown error");
            var i = n2.leftChild, o = n2.rightChild;
            return e3 && (e3.leftChild === this ? e3.leftChild = n2 : e3.rightChild === this && (e3.rightChild = n2)), n2.parent = e3, n2.brother = t2, n2.leftChild = this, n2.rightChild = o, t2 && (t2.brother = n2), this.parent = n2, this.brother = o, this.leftChild = r2, this.rightChild = i, o && (o.parent = n2, o.brother = this), r2 && (r2.parent = this, r2.brother = i), i && (i.parent = this, i.brother = r2), n2;
          }, e2.prototype.rotateRight = function() {
            var e3 = this.parent, t2 = this.brother, r2 = this.leftChild;
            if (!r2)
              throw new Error("unknown error");
            var n2 = this.rightChild, i = r2.leftChild, o = r2.rightChild;
            return e3 && (e3.leftChild === this ? e3.leftChild = r2 : e3.rightChild === this && (e3.rightChild = r2)), r2.parent = e3, r2.brother = t2, r2.leftChild = i, r2.rightChild = this, t2 && (t2.brother = r2), i && (i.parent = r2, i.brother = this), this.parent = r2, this.brother = i, this.leftChild = o, this.rightChild = n2, o && (o.parent = this, o.brother = n2), n2 && (n2.parent = this, n2.brother = o), r2;
          }, e2.prototype.remove = function() {
            if (this.leftChild || this.rightChild)
              throw new Error("can only remove leaf node");
            this.parent && (this === this.parent.leftChild ? this.parent.leftChild = void 0 : this === this.parent.rightChild && (this.parent.rightChild = void 0)), this.brother && (this.brother.brother = void 0), this.key = void 0, this.value = void 0, this.parent = void 0, this.brother = void 0;
          }, e2.TreeNodeColorType = { red: true, black: false }, e2;
        }();
        Object.freeze(n), r.default = n;
      }, {}], 26: [function(e, t, r) {
        "use strict";
        var n = this && this.__generator || function(e2, t2) {
          var r2, n2, i2, o, s = { label: 0, sent: function() {
            if (1 & i2[0])
              throw i2[1];
            return i2[1];
          }, trys: [], ops: [] };
          return o = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
            return this;
          }), o;
          function a(o2) {
            return function(a2) {
              return function(o3) {
                if (r2)
                  throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (r2 = 1, n2 && (i2 = 2 & o3[0] ? n2.return : o3[0] ? n2.throw || ((i2 = n2.return) && i2.call(n2), 0) : n2.next) && !(i2 = i2.call(n2, o3[1])).done)
                      return i2;
                    switch (n2 = 0, i2 && (o3 = [2 & o3[0], i2.value]), o3[0]) {
                      case 0:
                      case 1:
                        i2 = o3;
                        break;
                      case 4:
                        return s.label++, { value: o3[1], done: false };
                      case 5:
                        s.label++, n2 = o3[1], o3 = [0];
                        continue;
                      case 7:
                        o3 = s.ops.pop(), s.trys.pop();
                        continue;
                      default:
                        if (!(i2 = (i2 = s.trys).length > 0 && i2[i2.length - 1]) && (6 === o3[0] || 2 === o3[0])) {
                          s = 0;
                          continue;
                        }
                        if (3 === o3[0] && (!i2 || o3[1] > i2[0] && o3[1] < i2[3])) {
                          s.label = o3[1];
                          break;
                        }
                        if (6 === o3[0] && s.label < i2[1]) {
                          s.label = i2[1], i2 = o3;
                          break;
                        }
                        if (i2 && s.label < i2[2]) {
                          s.label = i2[2], s.ops.push(o3);
                          break;
                        }
                        i2[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o3 = t2.call(e2, s);
                  } catch (e3) {
                    o3 = [6, e3], n2 = 0;
                  } finally {
                    r2 = i2 = 0;
                  }
                if (5 & o3[0])
                  throw o3[1];
                return { value: o3[0] ? o3[1] : void 0, done: true };
              }([o2, a2]);
            };
          }
        };
        function i(e2) {
          var t2 = this;
          void 0 === e2 && (e2 = []);
          var r2 = [], o = 0, s = 0, a = 0, l = 0, u = 0, c = 0;
          this.size = function() {
            return c;
          }, this.empty = function() {
            return 0 === c;
          }, this.clear = function() {
            o = a = s = l = u = c = 0, f.call(this, i.bucketSize), c = 0;
          }, this.front = function() {
            return r2[o][s];
          }, this.back = function() {
            return r2[a][l];
          }, this.forEach = function(e3) {
            if (!this.empty()) {
              var t3 = 0;
              if (o !== a) {
                for (u2 = s; u2 < i.bucketSize; ++u2)
                  e3(r2[o][u2], t3++);
                for (u2 = o + 1; u2 < a; ++u2)
                  for (var n2 = 0; n2 < i.bucketSize; ++n2)
                    e3(r2[u2][n2], t3++);
                for (u2 = 0; u2 <= l; ++u2)
                  e3(r2[a][u2], t3++);
              } else
                for (var u2 = s; u2 <= l; ++u2)
                  e3(r2[o][u2], t3++);
            }
          };
          var h = function(e3) {
            var t3 = o * i.bucketSize + s, r3 = t3 + e3, n2 = a * i.bucketSize + l;
            if (r3 < t3 || r3 > n2)
              throw new Error("pos should more than 0 and less than queue's size");
            return { curNodeBucketIndex: Math.floor(r3 / i.bucketSize), curNodePointerIndex: r3 % i.bucketSize };
          };
          this.getElementByPos = function(e3) {
            var t3 = h(e3), n2 = t3.curNodeBucketIndex, i2 = t3.curNodePointerIndex;
            return r2[n2][i2];
          }, this.eraseElementByPos = function(e3) {
            var t3 = this;
            if (e3 < 0 || e3 > c)
              throw new Error("pos should more than 0 and less than queue's size");
            if (0 === e3)
              this.popFront();
            else if (e3 === this.size())
              this.popBack();
            else {
              for (var r3 = [], n2 = e3 + 1; n2 < c; ++n2)
                r3.push(this.getElementByPos(n2));
              this.cut(e3), this.popBack(), r3.forEach(function(e4) {
                return t3.pushBack(e4);
              });
            }
          }, this.eraseElementByValue = function(e3) {
            if (!this.empty()) {
              var t3 = [];
              this.forEach(function(r4) {
                r4 !== e3 && t3.push(r4);
              });
              for (var r3 = t3.length, n2 = 0; n2 < r3; ++n2)
                this.setElementByPos(n2, t3[n2]);
              this.cut(r3 - 1);
            }
          };
          var f = function(e3) {
            for (var t3 = [], n2 = e3 * i.sigma, h2 = Math.max(Math.ceil(n2 / i.bucketSize), 2), f2 = 0; f2 < h2; ++f2)
              t3.push(new Array(i.bucketSize));
            var p = Math.ceil(e3 / i.bucketSize), d = Math.floor(h2 / 2) - Math.floor(p / 2), g = d, y = 0;
            if (this.size())
              for (f2 = 0; f2 < p; ++f2) {
                for (var b = 0; b < i.bucketSize; ++b)
                  if (t3[d + f2][b] = this.front(), this.popFront(), this.empty()) {
                    g = d + f2, y = b;
                    break;
                  }
                if (this.empty())
                  break;
              }
            r2 = t3, o = d, s = 0, a = g, l = y, u = h2, c = e3;
          };
          this.pushBack = function(e3) {
            this.empty() || (a === u - 1 && l === i.bucketSize - 1 && f.call(this, this.size()), l < i.bucketSize - 1 ? ++l : a < u - 1 && (++a, l = 0)), ++c, r2[a][l] = e3;
          }, this.popBack = function() {
            this.empty() || (1 !== this.size() && (l > 0 ? --l : o < a && (--a, l = i.bucketSize - 1)), c > 0 && --c);
          }, this.setElementByPos = function(e3, t3) {
            var n2 = h(e3), i2 = n2.curNodeBucketIndex, o2 = n2.curNodePointerIndex;
            r2[i2][o2] = t3;
          }, this.insert = function(e3, t3, r3) {
            var n2 = this;
            if (void 0 === r3 && (r3 = 1), 0 === e3)
              for (; r3--; )
                this.pushFront(t3);
            else if (e3 === this.size())
              for (; r3--; )
                this.pushBack(t3);
            else {
              for (var i2 = [], o2 = e3; o2 < c; ++o2)
                i2.push(this.getElementByPos(o2));
              this.cut(e3 - 1);
              for (o2 = 0; o2 < r3; ++o2)
                this.pushBack(t3);
              i2.forEach(function(e4) {
                return n2.pushBack(e4);
              });
            }
          }, this.find = function(e3) {
            if (o === a) {
              for (var t3 = s; t3 <= l; ++t3)
                if (r2[o][t3] === e3)
                  return true;
              return false;
            }
            for (t3 = s; t3 < i.bucketSize; ++t3)
              if (r2[o][t3] === e3)
                return true;
            for (t3 = o + 1; t3 < a; ++t3)
              for (var n2 = 0; n2 < i.bucketSize; ++n2)
                if (r2[t3][n2] === e3)
                  return true;
            for (t3 = 0; t3 <= l; ++t3)
              if (r2[a][t3] === e3)
                return true;
            return false;
          }, this.reverse = function() {
            for (var e3 = 0, t3 = c - 1; e3 < t3; ) {
              var r3 = this.getElementByPos(e3);
              this.setElementByPos(e3, this.getElementByPos(t3)), this.setElementByPos(t3, r3), ++e3, --t3;
            }
          }, this.unique = function() {
            if (!this.empty()) {
              var e3 = [], t3 = this.front();
              this.forEach(function(r4, n2) {
                0 !== n2 && r4 === t3 || (e3.push(r4), t3 = r4);
              });
              for (var r3 = 0; r3 < c; ++r3)
                this.setElementByPos(r3, e3[r3]);
              this.cut(e3.length - 1);
            }
          }, this.sort = function(e3) {
            var t3 = [];
            this.forEach(function(e4) {
              t3.push(e4);
            }), t3.sort(e3);
            for (var r3 = 0; r3 < c; ++r3)
              this.setElementByPos(r3, t3[r3]);
          }, this.pushFront = function(e3) {
            this.empty() || (0 === o && 0 === s && f.call(this, this.size()), s > 0 ? --s : o > 0 && (--o, s = i.bucketSize - 1)), ++c, r2[o][s] = e3;
          }, this.popFront = function() {
            this.empty() || (1 !== this.size() && (s < i.bucketSize - 1 ? ++s : o < a && (++o, s = 0)), c > 0 && --c);
          }, this.shrinkToFit = function() {
            var e3 = this, t3 = [];
            this.forEach(function(e4) {
              t3.push(e4);
            });
            var n2 = t3.length;
            r2 = [];
            for (var o2 = Math.ceil(n2 / i.bucketSize), s2 = 0; s2 < o2; ++s2)
              r2.push(new Array(i.bucketSize));
            this.clear(), t3.forEach(function(t4) {
              return e3.pushBack(t4);
            });
          }, this.cut = function(e3) {
            if (e3 < 0)
              this.clear();
            else {
              var t3 = h(e3), r3 = t3.curNodeBucketIndex, n2 = t3.curNodePointerIndex;
              a = r3, l = n2, c = e3 + 1;
            }
          }, this[Symbol.iterator] = function() {
            return function() {
              var e3, t3;
              return n(this, function(n2) {
                switch (n2.label) {
                  case 0:
                    if (0 === c)
                      return [2];
                    if (o !== a)
                      return [3, 5];
                    t3 = s, n2.label = 1;
                  case 1:
                    return t3 <= l ? [4, r2[o][t3]] : [3, 4];
                  case 2:
                    n2.sent(), n2.label = 3;
                  case 3:
                    return ++t3, [3, 1];
                  case 4:
                    return [2];
                  case 5:
                    t3 = s, n2.label = 6;
                  case 6:
                    return t3 < i.bucketSize ? [4, r2[o][t3]] : [3, 9];
                  case 7:
                    n2.sent(), n2.label = 8;
                  case 8:
                    return ++t3, [3, 6];
                  case 9:
                    t3 = o + 1, n2.label = 10;
                  case 10:
                    if (!(t3 < a))
                      return [3, 15];
                    e3 = 0, n2.label = 11;
                  case 11:
                    return e3 < i.bucketSize ? [4, r2[t3][e3]] : [3, 14];
                  case 12:
                    n2.sent(), n2.label = 13;
                  case 13:
                    return ++e3, [3, 11];
                  case 14:
                    return ++t3, [3, 10];
                  case 15:
                    t3 = 0, n2.label = 16;
                  case 16:
                    return t3 <= l ? [4, r2[a][t3]] : [3, 19];
                  case 17:
                    n2.sent(), n2.label = 18;
                  case 18:
                    return ++t3, [3, 16];
                  case 19:
                    return [2];
                }
              });
            }();
          }, function() {
            var n2 = i.bucketSize;
            e2.size ? n2 = e2.size() : e2.length && (n2 = e2.length);
            var s2 = n2 * i.sigma;
            u = Math.ceil(s2 / i.bucketSize), u = Math.max(u, 3);
            for (var l2 = 0; l2 < u; ++l2)
              r2.push(new Array(i.bucketSize));
            var c2 = Math.ceil(n2 / i.bucketSize);
            o = Math.floor(u / 2) - Math.floor(c2 / 2), a = o, e2.forEach(function(e3) {
              return t2.pushBack(e3);
            });
          }(), Object.freeze(this);
        }
        Object.defineProperty(r, "__esModule", { value: true }), i.sigma = 3, i.bucketSize = 5e3, Object.freeze(i), r.default = i;
      }, {}], 27: [function(e, t, r) {
        "use strict";
        var n = this && this.__generator || function(e2, t2) {
          var r2, n2, i2, o2, s2 = { label: 0, sent: function() {
            if (1 & i2[0])
              throw i2[1];
            return i2[1];
          }, trys: [], ops: [] };
          return o2 = { next: a2(0), throw: a2(1), return: a2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function a2(o3) {
            return function(a3) {
              return function(o4) {
                if (r2)
                  throw new TypeError("Generator is already executing.");
                for (; s2; )
                  try {
                    if (r2 = 1, n2 && (i2 = 2 & o4[0] ? n2.return : o4[0] ? n2.throw || ((i2 = n2.return) && i2.call(n2), 0) : n2.next) && !(i2 = i2.call(n2, o4[1])).done)
                      return i2;
                    switch (n2 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                      case 0:
                      case 1:
                        i2 = o4;
                        break;
                      case 4:
                        return s2.label++, { value: o4[1], done: false };
                      case 5:
                        s2.label++, n2 = o4[1], o4 = [0];
                        continue;
                      case 7:
                        o4 = s2.ops.pop(), s2.trys.pop();
                        continue;
                      default:
                        if (!(i2 = (i2 = s2.trys).length > 0 && i2[i2.length - 1]) && (6 === o4[0] || 2 === o4[0])) {
                          s2 = 0;
                          continue;
                        }
                        if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                          s2.label = o4[1];
                          break;
                        }
                        if (6 === o4[0] && s2.label < i2[1]) {
                          s2.label = i2[1], i2 = o4;
                          break;
                        }
                        if (i2 && s2.label < i2[2]) {
                          s2.label = i2[2], s2.ops.push(o4);
                          break;
                        }
                        i2[2] && s2.ops.pop(), s2.trys.pop();
                        continue;
                    }
                    o4 = t2.call(e2, s2);
                  } catch (e3) {
                    o4 = [6, e3], n2 = 0;
                  } finally {
                    r2 = i2 = 0;
                  }
                if (5 & o4[0])
                  throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              }([o3, a3]);
            };
          }
        }, i = this && this.__values || function(e2) {
          var t2 = "function" == typeof Symbol && Symbol.iterator, r2 = t2 && e2[t2], n2 = 0;
          if (r2)
            return r2.call(e2);
          if (e2 && "number" == typeof e2.length)
            return { next: function() {
              return e2 && n2 >= e2.length && (e2 = void 0), { value: e2 && e2[n2++], done: !e2 };
            } };
          throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        Object.defineProperty(r, "__esModule", { value: true });
        var o = e("../LinkList/LinkList"), s = e("../Map/Map");
        function a(e2, t2, r2) {
          var l = this;
          if (void 0 === e2 && (e2 = []), void 0 === t2 && (t2 = a.initSize), r2 = r2 || function(e3) {
            var t3, r3, n2 = 0, o2 = "";
            if ("number" == typeof e3)
              n2 = ((n2 = Math.floor(e3)) << 5) - n2, n2 &= n2;
            else {
              o2 = "string" != typeof e3 ? JSON.stringify(e3) : e3;
              try {
                for (var s2 = i(o2), a2 = s2.next(); !a2.done; a2 = s2.next()) {
                  n2 = (n2 << 5) - n2 + a2.value.charCodeAt(0), n2 &= n2;
                }
              } catch (e4) {
                t3 = { error: e4 };
              } finally {
                try {
                  a2 && !a2.done && (r3 = s2.return) && r3.call(s2);
                } finally {
                  if (t3)
                    throw t3.error;
                }
              }
            }
            return n2 ^= n2 >>> 16;
          }, 0 != (t2 & t2 - 1))
            throw new Error("initBucketNum must be 2 to the power of n");
          var u = 0, c = [], h = Math.max(a.initSize, Math.min(a.maxSize, t2));
          this.size = function() {
            return u;
          }, this.empty = function() {
            return 0 === u;
          }, this.clear = function() {
            u = 0, h = t2, c = [];
          }, this.forEach = function(e3) {
            var t3 = 0;
            c.forEach(function(r3) {
              r3.forEach(function(r4) {
                e3(r4, t3++);
              });
            });
          };
          this.setElement = function(e3, t3) {
            var n2, l2;
            if (null === e3 || void 0 === e3)
              throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");
            if (null !== t3 && void 0 !== t3) {
              var f = r2(e3) & h - 1;
              if (c[f]) {
                var p = c[f].size();
                if (c[f] instanceof o.default) {
                  try {
                    for (var d = i(c[f]), g = d.next(); !g.done; g = d.next()) {
                      var y = g.value;
                      if (y.key === e3)
                        return void (y.value = t3);
                    }
                  } catch (e4) {
                    n2 = { error: e4 };
                  } finally {
                    try {
                      g && !g.done && (l2 = d.return) && l2.call(d);
                    } finally {
                      if (n2)
                        throw n2.error;
                    }
                  }
                  c[f].pushBack({ key: e3, value: t3 }), c[f].size() >= a.treeifyThreshold && (c[f] = new s.default(c[f]));
                } else
                  c[f].setElement(e3, t3);
                var b = c[f].size();
                u += b - p;
              } else
                ++u, c[f] = new o.default([{ key: e3, value: t3 }]);
              u > h * a.sigma && (function(e4) {
                if (!(e4 >= a.maxSize)) {
                  h = 2 * e4;
                  var t4 = [];
                  c.forEach(function(n3, i2) {
                    if (!n3.empty()) {
                      if (n3 instanceof o.default && 1 === n3.size()) {
                        var l3 = n3.front(), u2 = l3.key, f2 = l3.value;
                        t4[r2(u2) & h - 1] = new o.default([{ key: u2, value: f2 }]);
                      } else if (n3 instanceof s.default) {
                        var p2 = new o.default(), d2 = new o.default();
                        n3.forEach(function(t5) {
                          0 == (r2(t5.key) & e4) ? p2.pushBack(t5) : d2.pushBack(t5);
                        }), p2.size() > a.untreeifyThreshold ? t4[i2] = new s.default(p2) : p2.size() && (t4[i2] = p2), d2.size() > a.untreeifyThreshold ? t4[i2 + e4] = new s.default(d2) : d2.size() && (t4[i2 + e4] = d2);
                      } else {
                        var g2 = new o.default(), y2 = new o.default();
                        n3.forEach(function(t5) {
                          0 == (r2(t5.key) & e4) ? g2.pushBack(t5) : y2.pushBack(t5);
                        }), g2.size() && (t4[i2] = g2), y2.size() && (t4[i2 + e4] = y2);
                      }
                      c[i2].clear();
                    }
                  }), c = t4;
                }
              }).call(this, h);
            } else
              this.eraseElementByKey(e3);
          }, this.getElementByKey = function(e3) {
            var t3, n2, o2 = r2(e3) & h - 1;
            if (c[o2]) {
              if (c[o2] instanceof s.default)
                return c[o2].getElementByKey(e3);
              try {
                for (var a2 = i(c[o2]), l2 = a2.next(); !l2.done; l2 = a2.next()) {
                  var u2 = l2.value;
                  if (u2.key === e3)
                    return u2.value;
                }
              } catch (e4) {
                t3 = { error: e4 };
              } finally {
                try {
                  l2 && !l2.done && (n2 = a2.return) && n2.call(a2);
                } finally {
                  if (t3)
                    throw t3.error;
                }
              }
            }
          }, this.eraseElementByKey = function(e3) {
            var t3, n2, l2 = r2(e3) & h - 1;
            if (c[l2]) {
              var f = c[l2].size();
              if (c[l2] instanceof s.default)
                c[l2].eraseElementByKey(e3), c[l2].size() <= a.untreeifyThreshold && (c[l2] = new o.default(c[l2]));
              else {
                var p = -1;
                try {
                  for (var d = i(c[l2]), g = d.next(); !g.done; g = d.next()) {
                    if (++p, g.value.key === e3) {
                      c[l2].eraseElementByPos(p);
                      break;
                    }
                  }
                } catch (e4) {
                  t3 = { error: e4 };
                } finally {
                  try {
                    g && !g.done && (n2 = d.return) && n2.call(d);
                  } finally {
                    if (t3)
                      throw t3.error;
                  }
                }
              }
              var y = c[l2].size();
              u += y - f;
            }
          }, this.find = function(e3) {
            var t3, n2, o2 = r2(e3) & h - 1;
            if (!c[o2])
              return false;
            if (c[o2] instanceof s.default)
              return c[o2].find(e3);
            try {
              for (var a2 = i(c[o2]), l2 = a2.next(); !l2.done; l2 = a2.next()) {
                if (l2.value.key === e3)
                  return true;
              }
            } catch (e4) {
              t3 = { error: e4 };
            } finally {
              try {
                l2 && !l2.done && (n2 = a2.return) && n2.call(a2);
              } finally {
                if (t3)
                  throw t3.error;
              }
            }
            return false;
          }, this[Symbol.iterator] = function() {
            return function() {
              var e3, t3, r3, o2, s2, a2;
              return n(this, function(n2) {
                switch (n2.label) {
                  case 0:
                    e3 = 0, n2.label = 1;
                  case 1:
                    if (!(e3 < h))
                      return [3, 10];
                    for (; e3 < h && !c[e3]; )
                      ++e3;
                    if (e3 >= h)
                      return [3, 10];
                    n2.label = 2;
                  case 2:
                    n2.trys.push([2, 7, 8, 9]), s2 = void 0, t3 = i(c[e3]), r3 = t3.next(), n2.label = 3;
                  case 3:
                    return r3.done ? [3, 6] : [4, r3.value];
                  case 4:
                    n2.sent(), n2.label = 5;
                  case 5:
                    return r3 = t3.next(), [3, 3];
                  case 6:
                    return [3, 9];
                  case 7:
                    return o2 = n2.sent(), s2 = { error: o2 }, [3, 9];
                  case 8:
                    try {
                      r3 && !r3.done && (a2 = t3.return) && a2.call(t3);
                    } finally {
                      if (s2)
                        throw s2.error;
                    }
                    return [7];
                  case 9:
                    return ++e3, [3, 1];
                  case 10:
                    return [2];
                }
              });
            }();
          }, e2.forEach(function(e3) {
            var t3 = e3.key, r3 = e3.value;
            return l.setElement(t3, r3);
          }), Object.freeze(this);
        }
        a.initSize = 16, a.maxSize = 1 << 30, a.sigma = 0.75, a.treeifyThreshold = 8, a.untreeifyThreshold = 6, a.minTreeifySize = 64, Object.freeze(a), r.default = a;
      }, { "../LinkList/LinkList": 29, "../Map/Map": 30 }], 28: [function(e, t, r) {
        "use strict";
        var n = this && this.__generator || function(e2, t2) {
          var r2, n2, i2, o2, s2 = { label: 0, sent: function() {
            if (1 & i2[0])
              throw i2[1];
            return i2[1];
          }, trys: [], ops: [] };
          return o2 = { next: a2(0), throw: a2(1), return: a2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function a2(o3) {
            return function(a3) {
              return function(o4) {
                if (r2)
                  throw new TypeError("Generator is already executing.");
                for (; s2; )
                  try {
                    if (r2 = 1, n2 && (i2 = 2 & o4[0] ? n2.return : o4[0] ? n2.throw || ((i2 = n2.return) && i2.call(n2), 0) : n2.next) && !(i2 = i2.call(n2, o4[1])).done)
                      return i2;
                    switch (n2 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                      case 0:
                      case 1:
                        i2 = o4;
                        break;
                      case 4:
                        return s2.label++, { value: o4[1], done: false };
                      case 5:
                        s2.label++, n2 = o4[1], o4 = [0];
                        continue;
                      case 7:
                        o4 = s2.ops.pop(), s2.trys.pop();
                        continue;
                      default:
                        if (!(i2 = (i2 = s2.trys).length > 0 && i2[i2.length - 1]) && (6 === o4[0] || 2 === o4[0])) {
                          s2 = 0;
                          continue;
                        }
                        if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                          s2.label = o4[1];
                          break;
                        }
                        if (6 === o4[0] && s2.label < i2[1]) {
                          s2.label = i2[1], i2 = o4;
                          break;
                        }
                        if (i2 && s2.label < i2[2]) {
                          s2.label = i2[2], s2.ops.push(o4);
                          break;
                        }
                        i2[2] && s2.ops.pop(), s2.trys.pop();
                        continue;
                    }
                    o4 = t2.call(e2, s2);
                  } catch (e3) {
                    o4 = [6, e3], n2 = 0;
                  } finally {
                    r2 = i2 = 0;
                  }
                if (5 & o4[0])
                  throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              }([o3, a3]);
            };
          }
        }, i = this && this.__values || function(e2) {
          var t2 = "function" == typeof Symbol && Symbol.iterator, r2 = t2 && e2[t2], n2 = 0;
          if (r2)
            return r2.call(e2);
          if (e2 && "number" == typeof e2.length)
            return { next: function() {
              return e2 && n2 >= e2.length && (e2 = void 0), { value: e2 && e2[n2++], done: !e2 };
            } };
          throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        Object.defineProperty(r, "__esModule", { value: true });
        var o = e("../Set/Set"), s = e("../LinkList/LinkList");
        function a(e2, t2, r2) {
          var l = this;
          if (void 0 === e2 && (e2 = []), void 0 === t2 && (t2 = a.initSize), r2 = r2 || function(e3) {
            var t3 = 0, r3 = "";
            if ("number" == typeof e3)
              t3 = ((t3 = Math.floor(e3)) << 5) - t3, t3 &= t3;
            else {
              r3 = "string" != typeof e3 ? JSON.stringify(e3) : e3;
              for (var n2 = 0; n2 < r3.length; n2++) {
                t3 = (t3 << 5) - t3 + r3.charCodeAt(n2), t3 &= t3;
              }
            }
            return t3 ^= t3 >>> 16;
          }, 0 != (t2 & t2 - 1))
            throw new Error("initBucketNum must be 2 to the power of n");
          var u = 0, c = [], h = Math.max(a.initSize, Math.min(a.maxSize, t2));
          this.size = function() {
            return u;
          }, this.empty = function() {
            return 0 === u;
          }, this.clear = function() {
            u = 0, h = t2, c = [];
          }, this.forEach = function(e3) {
            var t3 = 0;
            c.forEach(function(r3) {
              r3.forEach(function(r4) {
                e3(r4, t3++);
              });
            });
          };
          this.insert = function(e3) {
            if (null === e3 || void 0 === e3)
              throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");
            var t3 = r2(e3) & h - 1;
            if (c[t3]) {
              var n2 = c[t3].size();
              if (c[t3] instanceof s.default) {
                if (c[t3].find(e3))
                  return;
                c[t3].pushBack(e3), c[t3].size() >= a.treeifyThreshold && (c[t3] = new o.default(c[t3]));
              } else
                c[t3].insert(e3);
              var i2 = c[t3].size();
              u += i2 - n2;
            } else
              c[t3] = new s.default([e3]), ++u;
            u > h * a.sigma && (function(e4) {
              if (!(e4 >= a.maxSize)) {
                h = 2 * e4;
                var t4 = [];
                c.forEach(function(n3, i3) {
                  if (!n3.empty()) {
                    if (n3 instanceof s.default && 1 === n3.size()) {
                      var l2 = n3.front();
                      if (void 0 === l2)
                        throw new Error("unknown error");
                      t4[r2(l2) & h - 1] = new s.default([l2]);
                    } else if (n3 instanceof o.default) {
                      var u2 = new s.default(), f = new s.default();
                      n3.forEach(function(t5) {
                        0 == (r2(t5) & e4) ? u2.pushBack(t5) : f.pushBack(t5);
                      }), u2.size() > a.untreeifyThreshold ? t4[i3] = new o.default(u2) : u2.size() && (t4[i3] = u2), f.size() > a.untreeifyThreshold ? t4[i3 + e4] = new o.default(f) : f.size() && (t4[i3 + e4] = f);
                    } else {
                      var p = new s.default(), d = new s.default();
                      n3.forEach(function(t5) {
                        0 == (r2(t5) & e4) ? p.pushBack(t5) : d.pushBack(t5);
                      }), p.size() && (t4[i3] = p), d.size() && (t4[i3 + e4] = d);
                    }
                    c[i3].clear();
                  }
                }), c = t4;
              }
            }).call(this, h);
          }, this.eraseElementByValue = function(e3) {
            var t3 = r2(e3) & h - 1;
            if (c[t3]) {
              var n2 = c[t3].size();
              c[t3].eraseElementByValue(e3), c[t3] instanceof o.default && c[t3].size() <= a.untreeifyThreshold && (c[t3] = new s.default(c[t3]));
              var i2 = c[t3].size();
              u += i2 - n2;
            }
          }, this.find = function(e3) {
            var t3 = r2(e3) & h - 1;
            return !!c[t3] && c[t3].find(e3);
          }, this[Symbol.iterator] = function() {
            return function() {
              var e3, t3, r3, o2, s2, a2;
              return n(this, function(n2) {
                switch (n2.label) {
                  case 0:
                    e3 = 0, n2.label = 1;
                  case 1:
                    if (!(e3 < h))
                      return [3, 10];
                    for (; e3 < h && !c[e3]; )
                      ++e3;
                    if (e3 >= h)
                      return [3, 10];
                    n2.label = 2;
                  case 2:
                    n2.trys.push([2, 7, 8, 9]), s2 = void 0, t3 = i(c[e3]), r3 = t3.next(), n2.label = 3;
                  case 3:
                    return r3.done ? [3, 6] : [4, r3.value];
                  case 4:
                    n2.sent(), n2.label = 5;
                  case 5:
                    return r3 = t3.next(), [3, 3];
                  case 6:
                    return [3, 9];
                  case 7:
                    return o2 = n2.sent(), s2 = { error: o2 }, [3, 9];
                  case 8:
                    try {
                      r3 && !r3.done && (a2 = t3.return) && a2.call(t3);
                    } finally {
                      if (s2)
                        throw s2.error;
                    }
                    return [7];
                  case 9:
                    return ++e3, [3, 1];
                  case 10:
                    return [2];
                }
              });
            }();
          }, e2.forEach(function(e3) {
            return l.insert(e3);
          }), Object.freeze(this);
        }
        a.initSize = 16, a.maxSize = 1 << 30, a.sigma = 0.75, a.treeifyThreshold = 8, a.untreeifyThreshold = 6, a.minTreeifySize = 64, Object.freeze(a), r.default = a;
      }, { "../LinkList/LinkList": 29, "../Set/Set": 33 }], 29: [function(e, t, r) {
        "use strict";
        var n = this && this.__generator || function(e2, t2) {
          var r2, n2, i2, o2, s = { label: 0, sent: function() {
            if (1 & i2[0])
              throw i2[1];
            return i2[1];
          }, trys: [], ops: [] };
          return o2 = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function a(o3) {
            return function(a2) {
              return function(o4) {
                if (r2)
                  throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (r2 = 1, n2 && (i2 = 2 & o4[0] ? n2.return : o4[0] ? n2.throw || ((i2 = n2.return) && i2.call(n2), 0) : n2.next) && !(i2 = i2.call(n2, o4[1])).done)
                      return i2;
                    switch (n2 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                      case 0:
                      case 1:
                        i2 = o4;
                        break;
                      case 4:
                        return s.label++, { value: o4[1], done: false };
                      case 5:
                        s.label++, n2 = o4[1], o4 = [0];
                        continue;
                      case 7:
                        o4 = s.ops.pop(), s.trys.pop();
                        continue;
                      default:
                        if (!(i2 = (i2 = s.trys).length > 0 && i2[i2.length - 1]) && (6 === o4[0] || 2 === o4[0])) {
                          s = 0;
                          continue;
                        }
                        if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                          s.label = o4[1];
                          break;
                        }
                        if (6 === o4[0] && s.label < i2[1]) {
                          s.label = i2[1], i2 = o4;
                          break;
                        }
                        if (i2 && s.label < i2[2]) {
                          s.label = i2[2], s.ops.push(o4);
                          break;
                        }
                        i2[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o4 = t2.call(e2, s);
                  } catch (e3) {
                    o4 = [6, e3], n2 = 0;
                  } finally {
                    r2 = i2 = 0;
                  }
                if (5 & o4[0])
                  throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              }([o3, a2]);
            };
          }
        };
        Object.defineProperty(r, "__esModule", { value: true });
        var i = /* @__PURE__ */ function() {
          return function(e2) {
            this.value = void 0, this.pre = void 0, this.next = void 0, this.value = e2;
          };
        }();
        function o(e2) {
          var t2 = this;
          void 0 === e2 && (e2 = []);
          var r2 = 0, o2 = void 0, s = void 0;
          this.size = function() {
            return r2;
          }, this.empty = function() {
            return 0 === r2;
          }, this.clear = function() {
            o2 = s = void 0, r2 = 0;
          }, this.front = function() {
            return null === o2 || void 0 === o2 ? void 0 : o2.value;
          }, this.back = function() {
            return null === s || void 0 === s ? void 0 : s.value;
          }, this.forEach = function(e3) {
            for (var t3 = o2, r3 = 0; t3; ) {
              if (void 0 === t3.value)
                throw new Error("unknown error");
              e3(t3.value, r3++), t3 = t3.next;
            }
          }, this.getElementByPos = function(e3) {
            if (e3 < 0 || e3 >= r2)
              throw new Error("pos must more then 0 and less then the list length");
            for (var t3 = o2; e3-- && t3; )
              t3 = t3.next;
            if (!t3 || void 0 === t3.value)
              throw new Error("unknown error");
            return t3.value;
          }, this.eraseElementByPos = function(e3) {
            if (e3 < 0 || e3 >= r2)
              throw new Error("erase pos must more then 0 and less then the list length");
            if (0 === e3)
              this.popFront();
            else if (e3 === r2 - 1)
              this.popBack();
            else {
              for (var t3 = o2; e3--; ) {
                if (!(null === t3 || void 0 === t3 ? void 0 : t3.next))
                  throw new Error("unknown error");
                t3 = t3.next;
              }
              if (!t3 || !t3.pre || !t3.next)
                throw new Error("unknown error");
              var n2 = t3.pre, i2 = t3.next;
              i2.pre = n2, n2.next = i2, r2 > 0 && --r2;
            }
          }, this.eraseElementByValue = function(e3) {
            for (; o2 && o2.value === e3; )
              this.popFront();
            for (; s && s.value === e3; )
              this.popBack();
            if (o2)
              for (var t3 = o2; t3; ) {
                if (t3.value === e3) {
                  var n2 = t3.pre, i2 = t3.next;
                  i2 && (i2.pre = n2), n2 && (n2.next = i2), r2 > 0 && --r2;
                }
                t3 = t3.next;
              }
          }, this.pushBack = function(e3) {
            if (null === e3 || void 0 === e3)
              throw new Error("you can't push null or undefined here");
            ++r2;
            var t3 = new i(e3);
            s ? (s.next = t3, t3.pre = s, s = t3) : o2 = s = t3;
          }, this.popBack = function() {
            s && (r2 > 0 && --r2, s && (o2 === s ? o2 = s = void 0 : (s = s.pre) && (s.next = void 0)));
          }, this.setElementByPos = function(e3, t3) {
            if (null === t3 || void 0 === t3)
              throw new Error("you can't set null or undefined here");
            if (e3 < 0 || e3 >= r2)
              throw new Error("pos must more then 0 and less then the list length");
            for (var n2 = o2; e3--; ) {
              if (!n2)
                throw new Error("unknown error");
              n2 = n2.next;
            }
            n2 && (n2.value = t3);
          }, this.insert = function(e3, t3, n2) {
            if (void 0 === n2 && (n2 = 1), null === t3 || void 0 === t3)
              throw new Error("you can't insert null or undefined here");
            if (e3 < 0 || e3 > r2)
              throw new Error("insert pos must more then 0 and less then or equal to the list length");
            if (n2 < 0)
              throw new Error("insert size must more than 0");
            if (0 === e3)
              for (; n2--; )
                this.pushFront(t3);
            else if (e3 === r2)
              for (; n2--; )
                this.pushBack(t3);
            else {
              for (var s2 = o2, a = 1; a < e3; ++a) {
                if (!(null === s2 || void 0 === s2 ? void 0 : s2.next))
                  throw new Error("unknown error");
                s2 = null === s2 || void 0 === s2 ? void 0 : s2.next;
              }
              if (!s2)
                throw new Error("unknown error");
              var l = s2.next;
              for (r2 += n2; n2--; )
                s2.next = new i(t3), s2.next.pre = s2, s2 = s2.next;
              s2.next = l, l && (l.pre = s2);
            }
          }, this.find = function(e3) {
            for (var t3 = o2; t3; ) {
              if (t3.value === e3)
                return true;
              t3 = t3.next;
            }
            return false;
          }, this.reverse = function() {
            for (var e3 = o2, t3 = s, n2 = 0; e3 && t3 && 2 * n2 < r2; ) {
              var i2 = e3.value;
              e3.value = t3.value, t3.value = i2, e3 = e3.next, t3 = t3.pre, ++n2;
            }
          }, this.unique = function() {
            for (var e3 = o2; e3; ) {
              for (var t3 = e3; t3 && t3.next && t3.value === t3.next.value; )
                t3 = t3.next, r2 > 0 && --r2;
              e3.next = t3.next, e3.next && (e3.next.pre = e3), e3 = e3.next;
            }
          }, this.sort = function(e3) {
            var t3 = [];
            this.forEach(function(e4) {
              t3.push(e4);
            }), t3.sort(e3);
            var r3 = o2;
            t3.forEach(function(e4) {
              r3 && (r3.value = e4, r3 = r3.next);
            });
          }, this.pushFront = function(e3) {
            if (null === e3 || void 0 === e3)
              throw new Error("you can't push null or undefined here");
            ++r2;
            var t3 = new i(e3);
            o2 ? (t3.next = o2, o2.pre = t3, o2 = t3) : o2 = s = t3;
          }, this.popFront = function() {
            o2 && (r2 > 0 && --r2, o2 && (o2 === s ? o2 = s = void 0 : (o2 = o2.next) && (o2.pre = void 0)));
          }, this.merge = function(e3) {
            var t3 = this, n2 = o2;
            e3.forEach(function(e4) {
              for (; n2 && void 0 !== n2.value && n2.value <= e4; )
                n2 = n2.next;
              if (void 0 === n2)
                t3.pushBack(e4), n2 = s;
              else if (n2 === o2)
                t3.pushFront(e4), n2 = o2;
              else {
                ++r2;
                var a = n2.pre;
                a && (a.next = new i(e4), a.next.pre = a, a.next.next = n2, n2 && (n2.pre = a.next));
              }
            });
          }, this[Symbol.iterator] = function() {
            return function() {
              var e3;
              return n(this, function(t3) {
                switch (t3.label) {
                  case 0:
                    e3 = o2, t3.label = 1;
                  case 1:
                    if (void 0 === e3)
                      return [3, 3];
                    if (!e3.value)
                      throw new Error("unknown error");
                    return [4, e3.value];
                  case 2:
                    return t3.sent(), e3 = e3.next, [3, 1];
                  case 3:
                    return [2];
                }
              });
            }();
          }, e2.forEach(function(e3) {
            return t2.pushBack(e3);
          }), Object.freeze(this);
        }
        Object.freeze(o), r.default = o;
      }, {}], 30: [function(e, t, r) {
        "use strict";
        var n = this && this.__generator || function(e2, t2) {
          var r2, n2, i2, o2, s2 = { label: 0, sent: function() {
            if (1 & i2[0])
              throw i2[1];
            return i2[1];
          }, trys: [], ops: [] };
          return o2 = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function a(o3) {
            return function(a2) {
              return function(o4) {
                if (r2)
                  throw new TypeError("Generator is already executing.");
                for (; s2; )
                  try {
                    if (r2 = 1, n2 && (i2 = 2 & o4[0] ? n2.return : o4[0] ? n2.throw || ((i2 = n2.return) && i2.call(n2), 0) : n2.next) && !(i2 = i2.call(n2, o4[1])).done)
                      return i2;
                    switch (n2 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                      case 0:
                      case 1:
                        i2 = o4;
                        break;
                      case 4:
                        return s2.label++, { value: o4[1], done: false };
                      case 5:
                        s2.label++, n2 = o4[1], o4 = [0];
                        continue;
                      case 7:
                        o4 = s2.ops.pop(), s2.trys.pop();
                        continue;
                      default:
                        if (!(i2 = (i2 = s2.trys).length > 0 && i2[i2.length - 1]) && (6 === o4[0] || 2 === o4[0])) {
                          s2 = 0;
                          continue;
                        }
                        if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                          s2.label = o4[1];
                          break;
                        }
                        if (6 === o4[0] && s2.label < i2[1]) {
                          s2.label = i2[1], i2 = o4;
                          break;
                        }
                        if (i2 && s2.label < i2[2]) {
                          s2.label = i2[2], s2.ops.push(o4);
                          break;
                        }
                        i2[2] && s2.ops.pop(), s2.trys.pop();
                        continue;
                    }
                    o4 = t2.call(e2, s2);
                  } catch (e3) {
                    o4 = [6, e3], n2 = 0;
                  } finally {
                    r2 = i2 = 0;
                  }
                if (5 & o4[0])
                  throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              }([o3, a2]);
            };
          }
        }, i = this && this.__values || function(e2) {
          var t2 = "function" == typeof Symbol && Symbol.iterator, r2 = t2 && e2[t2], n2 = 0;
          if (r2)
            return r2.call(e2);
          if (e2 && "number" == typeof e2.length)
            return { next: function() {
              return e2 && n2 >= e2.length && (e2 = void 0), { value: e2 && e2[n2++], done: !e2 };
            } };
          throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        Object.defineProperty(r, "__esModule", { value: true });
        var o = e("../Base/TreeNode");
        function s(e2, t2) {
          var r2 = this;
          void 0 === e2 && (e2 = []), t2 = t2 || function(e3, t3) {
            return e3 < t3 ? -1 : e3 > t3 ? 1 : 0;
          };
          var s2 = 0, a = new o.default();
          a.color = o.default.TreeNodeColorType.black, this.size = function() {
            return s2;
          }, this.empty = function() {
            return 0 === s2;
          }, this.clear = function() {
            s2 = 0, a.key = a.value = void 0, a.leftChild = a.rightChild = a.brother = void 0;
          };
          var l = function(e3) {
            if (!e3 || void 0 === e3.key)
              throw new Error("unknown error");
            return e3.leftChild ? l(e3.leftChild) : e3;
          }, u = function(e3) {
            if (!e3 || void 0 === e3.key)
              throw new Error("unknown error");
            return e3.rightChild ? u(e3.rightChild) : e3;
          };
          this.front = function() {
            if (!this.empty()) {
              var e3 = l(a);
              if (void 0 === e3.key || void 0 === e3.value)
                throw new Error("unknown error");
              return { key: e3.key, value: e3.value };
            }
          }, this.back = function() {
            if (!this.empty()) {
              var e3 = u(a);
              if (void 0 === e3.key || void 0 === e3.value)
                throw new Error("unknown error");
              return { key: e3.key, value: e3.value };
            }
          }, this.forEach = function(e3) {
            var t3, r3, n2 = 0;
            try {
              for (var o2 = i(this), s3 = o2.next(); !s3.done; s3 = o2.next()) {
                e3(s3.value, n2++);
              }
            } catch (e4) {
              t3 = { error: e4 };
            } finally {
              try {
                s3 && !s3.done && (r3 = o2.return) && r3.call(o2);
              } finally {
                if (t3)
                  throw t3.error;
              }
            }
          }, this.getElementByPos = function(e3) {
            var t3, r3;
            if (e3 < 0 || e3 >= this.size())
              throw new Error("pos must more than 0 and less than set's size");
            var n2 = 0;
            try {
              for (var o2 = i(this), s3 = o2.next(); !s3.done; s3 = o2.next()) {
                var a2 = s3.value;
                if (n2 === e3)
                  return a2;
                ++n2;
              }
            } catch (e4) {
              t3 = { error: e4 };
            } finally {
              try {
                s3 && !s3.done && (r3 = o2.return) && r3.call(o2);
              } finally {
                if (t3)
                  throw t3.error;
              }
            }
            throw new Error("unknown Error");
          };
          var c = function(e3, r3) {
            if (e3 && void 0 !== e3.key && void 0 !== e3.value) {
              var n2 = t2(e3.key, r3);
              return 0 === n2 ? { key: e3.key, value: e3.value } : n2 < 0 ? c(e3.rightChild, r3) : c(e3.leftChild, r3) || { key: e3.key, value: e3.value };
            }
          };
          this.lowerBound = function(e3) {
            return c(a, e3);
          };
          var h = function(e3, r3) {
            if (e3 && void 0 !== e3.key && void 0 !== e3.value)
              return t2(e3.key, r3) <= 0 ? h(e3.rightChild, r3) : h(e3.leftChild, r3) || { key: e3.key, value: e3.value };
          };
          this.upperBound = function(e3) {
            return h(a, e3);
          };
          var f = function(e3, r3) {
            if (e3 && void 0 !== e3.key && void 0 !== e3.value) {
              var n2 = t2(e3.key, r3);
              return 0 === n2 ? { key: e3.key, value: e3.value } : n2 > 0 ? f(e3.leftChild, r3) : f(e3.rightChild, r3) || { key: e3.key, value: e3.value };
            }
          };
          this.reverseLowerBound = function(e3) {
            return f(a, e3);
          };
          var p = function(e3, r3) {
            if (e3 && void 0 !== e3.key && void 0 !== e3.value)
              return t2(e3.key, r3) >= 0 ? p(e3.leftChild, r3) : p(e3.rightChild, r3) || { key: e3.key, value: e3.value };
          };
          this.reverseUpperBound = function(e3) {
            return p(a, e3);
          };
          var d = function(e3) {
            var t3 = e3.parent;
            if (!t3) {
              if (e3 === a)
                return;
              throw new Error("unknown error");
            }
            if (e3.color !== o.default.TreeNodeColorType.red) {
              var r3 = e3.brother;
              if (!r3)
                throw new Error("unknown error");
              if (e3 === t3.leftChild) {
                if (r3.color === o.default.TreeNodeColorType.red) {
                  r3.color = o.default.TreeNodeColorType.black, t3.color = o.default.TreeNodeColorType.red;
                  var n2 = t3.rotateLeft();
                  a === t3 && (a = n2), d(e3);
                } else if (r3.color === o.default.TreeNodeColorType.black)
                  if (r3.rightChild && r3.rightChild.color === o.default.TreeNodeColorType.red) {
                    r3.color = t3.color, t3.color = o.default.TreeNodeColorType.black, r3.rightChild && (r3.rightChild.color = o.default.TreeNodeColorType.black);
                    n2 = t3.rotateLeft();
                    a === t3 && (a = n2), e3.color = o.default.TreeNodeColorType.black;
                  } else if (r3.rightChild && r3.rightChild.color !== o.default.TreeNodeColorType.black || !r3.leftChild || r3.leftChild.color !== o.default.TreeNodeColorType.red)
                    r3.leftChild && r3.leftChild.color !== o.default.TreeNodeColorType.black || r3.rightChild && r3.rightChild.color !== o.default.TreeNodeColorType.black || (r3.color = o.default.TreeNodeColorType.red, d(t3));
                  else {
                    r3.color = o.default.TreeNodeColorType.red, r3.leftChild && (r3.leftChild.color = o.default.TreeNodeColorType.black);
                    n2 = r3.rotateRight();
                    a === r3 && (a = n2), d(e3);
                  }
              } else if (e3 === t3.rightChild) {
                if (r3.color === o.default.TreeNodeColorType.red) {
                  r3.color = o.default.TreeNodeColorType.black, t3.color = o.default.TreeNodeColorType.red;
                  n2 = t3.rotateRight();
                  a === t3 && (a = n2), d(e3);
                } else if (r3.color === o.default.TreeNodeColorType.black)
                  if (r3.leftChild && r3.leftChild.color === o.default.TreeNodeColorType.red) {
                    r3.color = t3.color, t3.color = o.default.TreeNodeColorType.black, r3.leftChild && (r3.leftChild.color = o.default.TreeNodeColorType.black);
                    n2 = t3.rotateRight();
                    a === t3 && (a = n2), e3.color = o.default.TreeNodeColorType.black;
                  } else if (r3.leftChild && r3.leftChild.color !== o.default.TreeNodeColorType.black || !r3.rightChild || r3.rightChild.color !== o.default.TreeNodeColorType.red)
                    r3.leftChild && r3.leftChild.color !== o.default.TreeNodeColorType.black || r3.rightChild && r3.rightChild.color !== o.default.TreeNodeColorType.black || (r3.color = o.default.TreeNodeColorType.red, d(t3));
                  else {
                    r3.color = o.default.TreeNodeColorType.red, r3.rightChild && (r3.rightChild.color = o.default.TreeNodeColorType.black);
                    n2 = r3.rotateLeft();
                    a === r3 && (a = n2), d(e3);
                  }
              }
            } else
              e3.color = o.default.TreeNodeColorType.black;
          }, g = function(e3) {
            for (var t3 = e3; t3.leftChild || t3.rightChild; ) {
              if (t3.rightChild) {
                t3 = l(t3.rightChild);
                var r3 = e3.key;
                e3.key = t3.key, t3.key = r3;
                var n2 = e3.value;
                e3.value = t3.value, t3.value = n2, e3 = t3;
              }
              if (t3.leftChild) {
                t3 = u(t3.leftChild);
                r3 = e3.key;
                e3.key = t3.key, t3.key = r3;
                n2 = e3.value;
                e3.value = t3.value, t3.value = n2, e3 = t3;
              }
            }
            d(t3), t3 && t3.remove(), --s2, a.color = o.default.TreeNodeColorType.black;
          }, y = function(e3, t3) {
            return !(!e3 || void 0 === e3.key) && (!!y(e3.leftChild, t3) || (!!t3(e3) || y(e3.rightChild, t3)));
          };
          this.eraseElementByPos = function(e3) {
            if (e3 < 0 || e3 >= s2)
              throw new Error("pos must more than 0 and less than set's size");
            var t3 = 0;
            y(a, function(r3) {
              return e3 === t3 ? (g(r3), true) : (++t3, false);
            });
          }, this.eraseElementByKey = function(e3) {
            if (!this.empty()) {
              var r3 = v(a, e3);
              void 0 !== r3 && void 0 !== r3.key && 0 === t2(r3.key, e3) && g(r3);
            }
          };
          var b = function(e3, r3) {
            if (!e3 || void 0 === e3.key)
              throw new Error("unknown error");
            var n2 = t2(r3, e3.key);
            return n2 < 0 ? e3.leftChild ? b(e3.leftChild, r3) : (e3.leftChild = new o.default(), e3.leftChild.parent = e3, e3.leftChild.brother = e3.rightChild, e3.rightChild && (e3.rightChild.brother = e3.leftChild), e3.leftChild) : n2 > 0 ? e3.rightChild ? b(e3.rightChild, r3) : (e3.rightChild = new o.default(), e3.rightChild.parent = e3, e3.rightChild.brother = e3.leftChild, e3.leftChild && (e3.leftChild.brother = e3.rightChild), e3.rightChild) : e3;
          }, m = function(e3) {
            var t3 = e3.parent;
            if (!t3) {
              if (e3 === a)
                return;
              throw new Error("unknown error");
            }
            if (t3.color !== o.default.TreeNodeColorType.black && t3.color === o.default.TreeNodeColorType.red) {
              var r3 = t3.brother, n2 = t3.parent;
              if (!n2)
                throw new Error("unknown error");
              if (r3 && r3.color === o.default.TreeNodeColorType.red)
                r3.color = t3.color = o.default.TreeNodeColorType.black, n2.color = o.default.TreeNodeColorType.red, m(n2);
              else if (!r3 || r3.color === o.default.TreeNodeColorType.black) {
                if (t3 === n2.leftChild) {
                  if (e3 === t3.leftChild) {
                    t3.color = o.default.TreeNodeColorType.black, n2.color = o.default.TreeNodeColorType.red;
                    var i2 = n2.rotateRight();
                    n2 === a && (a = i2);
                  } else if (e3 === t3.rightChild) {
                    i2 = t3.rotateLeft();
                    n2 === a && (a = i2), m(t3);
                  }
                } else if (t3 === n2.rightChild) {
                  if (e3 === t3.leftChild) {
                    i2 = t3.rotateRight();
                    n2 === a && (a = i2), m(t3);
                  } else if (e3 === t3.rightChild) {
                    t3.color = o.default.TreeNodeColorType.black, n2.color = o.default.TreeNodeColorType.red;
                    i2 = n2.rotateLeft();
                    n2 === a && (a = i2);
                  }
                }
              }
            }
          };
          this.setElement = function(e3, r3) {
            if (null === e3 || void 0 === e3)
              throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");
            if (null !== r3 && void 0 !== r3) {
              if (this.empty())
                return ++s2, a.key = e3, a.value = r3, void (a.color = o.default.TreeNodeColorType.black);
              var n2 = b(a, e3);
              void 0 === n2.key || 0 !== t2(n2.key, e3) ? (++s2, n2.key = e3, n2.value = r3, m(n2), a.color = o.default.TreeNodeColorType.black) : n2.value = r3;
            } else
              this.eraseElementByKey(e3);
          };
          var v = function(e3, r3) {
            if (e3 && void 0 !== e3.key) {
              var n2 = t2(r3, e3.key);
              return n2 < 0 ? v(e3.leftChild, r3) : n2 > 0 ? v(e3.rightChild, r3) : e3;
            }
          };
          this.find = function(e3) {
            return !!v(a, e3);
          }, this.getElementByKey = function(e3) {
            var t3 = v(a, e3);
            if (void 0 === (null === t3 || void 0 === t3 ? void 0 : t3.key) || void 0 === (null === t3 || void 0 === t3 ? void 0 : t3.value))
              throw new Error("unknown error");
            return t3.value;
          }, this.union = function(e3) {
            var t3 = this;
            e3.forEach(function(e4) {
              var r3 = e4.key, n2 = e4.value;
              return t3.setElement(r3, n2);
            });
          }, this.getHeight = function() {
            if (this.empty())
              return 0;
            var e3 = function(t3) {
              return t3 ? Math.max(e3(t3.leftChild), e3(t3.rightChild)) + 1 : 1;
            };
            return e3(a);
          };
          var w = function(e3) {
            return n(this, function(t3) {
              switch (t3.label) {
                case 0:
                  return e3 && void 0 !== e3.key && void 0 !== e3.value ? [5, i(w(e3.leftChild))] : [2];
                case 1:
                  return t3.sent(), [4, { key: e3.key, value: e3.value }];
                case 2:
                  return t3.sent(), [5, i(w(e3.rightChild))];
                case 3:
                  return t3.sent(), [2];
              }
            });
          };
          this[Symbol.iterator] = function() {
            return w(a);
          }, e2.forEach(function(e3) {
            var t3 = e3.key, n2 = e3.value;
            return r2.setElement(t3, n2);
          }), Object.freeze(this);
        }
        Object.freeze(s), r.default = s;
      }, { "../Base/TreeNode": 25 }], 31: [function(e, t, r) {
        "use strict";
        function n(e2, t2) {
          void 0 === e2 && (e2 = []), t2 = t2 || function(e3, t3) {
            return e3 > t3 ? -1 : e3 < t3 ? 1 : 0;
          };
          var r2 = [];
          e2.forEach(function(e3) {
            return r2.push(e3);
          });
          var n2 = r2.length, i = function(e3, t3) {
            if (e3 < 0 || e3 >= n2)
              throw new Error("unknown error");
            if (t3 < 0 || t3 >= n2)
              throw new Error("unknown error");
            var i2 = r2[e3];
            r2[e3] = r2[t3], r2[t3] = i2;
          }, o = function(e3) {
            if (e3 < 0 || e3 >= n2)
              throw new Error("unknown error");
            var o2 = 2 * e3 + 1, s = 2 * e3 + 2;
            o2 < n2 && t2(r2[e3], r2[o2]) > 0 && i(e3, o2), s < n2 && t2(r2[e3], r2[s]) > 0 && i(e3, s);
          };
          !function() {
            for (var e3 = Math.floor((n2 - 1) / 2); e3 >= 0; --e3)
              for (var o2 = e3, s = 2 * o2 + 1; s < n2; ) {
                var a = s + 1, l = s;
                if (a < n2 && t2(r2[s], r2[a]) > 0 && (l = a), t2(r2[o2], r2[l]) <= 0)
                  break;
                i(o2, l), s = 2 * (o2 = l) + 1;
              }
          }(), this.size = function() {
            return n2;
          }, this.empty = function() {
            return 0 === n2;
          }, this.clear = function() {
            n2 = 0, r2.length = 0;
          }, this.push = function(e3) {
            if (r2.push(e3), 1 !== ++n2)
              for (var i2 = n2 - 1; i2 > 0; ) {
                var s = Math.floor((i2 - 1) / 2);
                if (t2(r2[s], e3) <= 0)
                  break;
                o(s), i2 = s;
              }
          }, this.pop = function() {
            if (!this.empty())
              if (1 !== this.size()) {
                var e3 = r2[n2 - 1];
                --n2;
                for (var i2 = 0; i2 < this.size(); ) {
                  var o2 = 2 * i2 + 1, s = 2 * i2 + 2;
                  if (o2 >= this.size())
                    break;
                  var a = o2;
                  if (s < this.size() && t2(r2[o2], r2[s]) > 0 && (a = s), t2(r2[a], e3) >= 0)
                    break;
                  r2[i2] = r2[a], i2 = a;
                }
                r2[i2] = e3;
              } else
                --n2;
          }, this.top = function() {
            return r2[0];
          }, Object.freeze(this);
        }
        Object.defineProperty(r, "__esModule", { value: true }), Object.freeze(n), r.default = n;
      }, {}], 32: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: true });
        var n = e("../LinkList/LinkList");
        function i(e2) {
          void 0 === e2 && (e2 = []);
          var t2 = new n.default(e2);
          this.size = function() {
            return t2.size();
          }, this.empty = function() {
            return t2.empty();
          }, this.clear = function() {
            t2.clear();
          }, this.push = function(e3) {
            t2.pushBack(e3);
          }, this.pop = function() {
            t2.popFront();
          }, this.front = function() {
            return t2.front();
          }, Object.freeze(this);
        }
        Object.freeze(i), r.default = i;
      }, { "../LinkList/LinkList": 29 }], 33: [function(e, t, r) {
        "use strict";
        var n = this && this.__generator || function(e2, t2) {
          var r2, n2, i2, o2, s2 = { label: 0, sent: function() {
            if (1 & i2[0])
              throw i2[1];
            return i2[1];
          }, trys: [], ops: [] };
          return o2 = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function a(o3) {
            return function(a2) {
              return function(o4) {
                if (r2)
                  throw new TypeError("Generator is already executing.");
                for (; s2; )
                  try {
                    if (r2 = 1, n2 && (i2 = 2 & o4[0] ? n2.return : o4[0] ? n2.throw || ((i2 = n2.return) && i2.call(n2), 0) : n2.next) && !(i2 = i2.call(n2, o4[1])).done)
                      return i2;
                    switch (n2 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                      case 0:
                      case 1:
                        i2 = o4;
                        break;
                      case 4:
                        return s2.label++, { value: o4[1], done: false };
                      case 5:
                        s2.label++, n2 = o4[1], o4 = [0];
                        continue;
                      case 7:
                        o4 = s2.ops.pop(), s2.trys.pop();
                        continue;
                      default:
                        if (!(i2 = (i2 = s2.trys).length > 0 && i2[i2.length - 1]) && (6 === o4[0] || 2 === o4[0])) {
                          s2 = 0;
                          continue;
                        }
                        if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                          s2.label = o4[1];
                          break;
                        }
                        if (6 === o4[0] && s2.label < i2[1]) {
                          s2.label = i2[1], i2 = o4;
                          break;
                        }
                        if (i2 && s2.label < i2[2]) {
                          s2.label = i2[2], s2.ops.push(o4);
                          break;
                        }
                        i2[2] && s2.ops.pop(), s2.trys.pop();
                        continue;
                    }
                    o4 = t2.call(e2, s2);
                  } catch (e3) {
                    o4 = [6, e3], n2 = 0;
                  } finally {
                    r2 = i2 = 0;
                  }
                if (5 & o4[0])
                  throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              }([o3, a2]);
            };
          }
        }, i = this && this.__values || function(e2) {
          var t2 = "function" == typeof Symbol && Symbol.iterator, r2 = t2 && e2[t2], n2 = 0;
          if (r2)
            return r2.call(e2);
          if (e2 && "number" == typeof e2.length)
            return { next: function() {
              return e2 && n2 >= e2.length && (e2 = void 0), { value: e2 && e2[n2++], done: !e2 };
            } };
          throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        Object.defineProperty(r, "__esModule", { value: true });
        var o = e("../Base/TreeNode");
        function s(e2, t2) {
          var r2 = this;
          void 0 === e2 && (e2 = []), t2 = t2 || function(e3, t3) {
            return e3 < t3 ? -1 : e3 > t3 ? 1 : 0;
          };
          var s2 = 0, a = new o.default();
          a.color = o.default.TreeNodeColorType.black, this.size = function() {
            return s2;
          }, this.empty = function() {
            return 0 === s2;
          }, this.clear = function() {
            s2 = 0, a.key = void 0, a.leftChild = a.rightChild = a.brother = a.parent = void 0, a.color = o.default.TreeNodeColorType.black;
          };
          var l = function(e3) {
            if (!e3 || void 0 === e3.key)
              throw new Error("unknown error");
            return e3.leftChild ? l(e3.leftChild) : e3;
          }, u = function(e3) {
            if (!e3 || void 0 === e3.key)
              throw new Error("unknown error");
            return e3.rightChild ? u(e3.rightChild) : e3;
          };
          this.front = function() {
            if (!this.empty())
              return l(a).key;
          }, this.back = function() {
            if (!this.empty())
              return u(a).key;
          }, this.forEach = function(e3) {
            var t3, r3, n2 = 0;
            try {
              for (var o2 = i(this), s3 = o2.next(); !s3.done; s3 = o2.next()) {
                e3(s3.value, n2++);
              }
            } catch (e4) {
              t3 = { error: e4 };
            } finally {
              try {
                s3 && !s3.done && (r3 = o2.return) && r3.call(o2);
              } finally {
                if (t3)
                  throw t3.error;
              }
            }
          }, this.getElementByPos = function(e3) {
            var t3, r3;
            if (e3 < 0 || e3 >= this.size())
              throw new Error("pos must more than 0 and less than set's size");
            var n2 = 0;
            try {
              for (var o2 = i(this), s3 = o2.next(); !s3.done; s3 = o2.next()) {
                var a2 = s3.value;
                if (n2 === e3)
                  return a2;
                ++n2;
              }
            } catch (e4) {
              t3 = { error: e4 };
            } finally {
              try {
                s3 && !s3.done && (r3 = o2.return) && r3.call(o2);
              } finally {
                if (t3)
                  throw t3.error;
              }
            }
            throw new Error("unknown error");
          };
          var c = function(e3) {
            var t3 = e3.parent;
            if (!t3) {
              if (e3 === a)
                return;
              throw new Error("unknown error");
            }
            if (e3.color !== o.default.TreeNodeColorType.red) {
              var r3 = e3.brother;
              if (!r3)
                throw new Error("unknown error");
              if (e3 === t3.leftChild) {
                if (r3.color === o.default.TreeNodeColorType.red) {
                  r3.color = o.default.TreeNodeColorType.black, t3.color = o.default.TreeNodeColorType.red;
                  var n2 = t3.rotateLeft();
                  a === t3 && (a = n2), c(e3);
                } else if (r3.color === o.default.TreeNodeColorType.black)
                  if (r3.rightChild && r3.rightChild.color === o.default.TreeNodeColorType.red) {
                    r3.color = t3.color, t3.color = o.default.TreeNodeColorType.black, r3.rightChild && (r3.rightChild.color = o.default.TreeNodeColorType.black);
                    n2 = t3.rotateLeft();
                    a === t3 && (a = n2), e3.color = o.default.TreeNodeColorType.black;
                  } else if (r3.rightChild && r3.rightChild.color !== o.default.TreeNodeColorType.black || !r3.leftChild || r3.leftChild.color !== o.default.TreeNodeColorType.red)
                    r3.leftChild && r3.leftChild.color !== o.default.TreeNodeColorType.black || r3.rightChild && r3.rightChild.color !== o.default.TreeNodeColorType.black || (r3.color = o.default.TreeNodeColorType.red, c(t3));
                  else {
                    r3.color = o.default.TreeNodeColorType.red, r3.leftChild && (r3.leftChild.color = o.default.TreeNodeColorType.black);
                    n2 = r3.rotateRight();
                    a === r3 && (a = n2), c(e3);
                  }
              } else if (e3 === t3.rightChild) {
                if (r3.color === o.default.TreeNodeColorType.red) {
                  r3.color = o.default.TreeNodeColorType.black, t3.color = o.default.TreeNodeColorType.red;
                  n2 = t3.rotateRight();
                  a === t3 && (a = n2), c(e3);
                } else if (r3.color === o.default.TreeNodeColorType.black)
                  if (r3.leftChild && r3.leftChild.color === o.default.TreeNodeColorType.red) {
                    r3.color = t3.color, t3.color = o.default.TreeNodeColorType.black, r3.leftChild && (r3.leftChild.color = o.default.TreeNodeColorType.black);
                    n2 = t3.rotateRight();
                    a === t3 && (a = n2), e3.color = o.default.TreeNodeColorType.black;
                  } else if (r3.leftChild && r3.leftChild.color !== o.default.TreeNodeColorType.black || !r3.rightChild || r3.rightChild.color !== o.default.TreeNodeColorType.red)
                    r3.leftChild && r3.leftChild.color !== o.default.TreeNodeColorType.black || r3.rightChild && r3.rightChild.color !== o.default.TreeNodeColorType.black || (r3.color = o.default.TreeNodeColorType.red, c(t3));
                  else {
                    r3.color = o.default.TreeNodeColorType.red, r3.rightChild && (r3.rightChild.color = o.default.TreeNodeColorType.black);
                    n2 = r3.rotateLeft();
                    a === r3 && (a = n2), c(e3);
                  }
              }
            } else
              e3.color = o.default.TreeNodeColorType.black;
          }, h = function(e3) {
            for (var t3 = e3; t3.leftChild || t3.rightChild; ) {
              if (t3.rightChild) {
                t3 = l(t3.rightChild);
                var r3 = e3.key;
                e3.key = t3.key, t3.key = r3, e3 = t3;
              }
              if (t3.leftChild) {
                t3 = u(t3.leftChild);
                r3 = e3.key;
                e3.key = t3.key, t3.key = r3, e3 = t3;
              }
            }
            c(t3), t3 && t3.remove(), --s2, a.color = o.default.TreeNodeColorType.black;
          }, f = function(e3, t3) {
            return !(!e3 || void 0 === e3.key) && (!!f(e3.leftChild, t3) || (!!t3(e3) || f(e3.rightChild, t3)));
          };
          this.eraseElementByPos = function(e3) {
            if (e3 < 0 || e3 >= s2)
              throw new Error("pos must more than 0 and less than set's size");
            var t3 = 0;
            f(a, function(r3) {
              return e3 === t3 ? (h(r3), true) : (++t3, false);
            });
          }, this.eraseElementByValue = function(e3) {
            if (!this.empty()) {
              var r3 = g(a, e3);
              void 0 !== r3 && void 0 !== r3.key && 0 === t2(r3.key, e3) && h(r3);
            }
          };
          var p = function(e3, r3) {
            if (!e3 || void 0 === e3.key)
              throw new Error("unknown error");
            var n2 = t2(r3, e3.key);
            return n2 < 0 ? e3.leftChild ? p(e3.leftChild, r3) : (e3.leftChild = new o.default(), e3.leftChild.parent = e3, e3.leftChild.brother = e3.rightChild, e3.rightChild && (e3.rightChild.brother = e3.leftChild), e3.leftChild) : n2 > 0 ? e3.rightChild ? p(e3.rightChild, r3) : (e3.rightChild = new o.default(), e3.rightChild.parent = e3, e3.rightChild.brother = e3.leftChild, e3.leftChild && (e3.leftChild.brother = e3.rightChild), e3.rightChild) : e3;
          }, d = function(e3) {
            var t3 = e3.parent;
            if (!t3) {
              if (e3 === a)
                return;
              throw new Error("unknown error");
            }
            if (t3.color !== o.default.TreeNodeColorType.black && t3.color === o.default.TreeNodeColorType.red) {
              var r3 = t3.brother, n2 = t3.parent;
              if (!n2)
                throw new Error("unknown error");
              if (r3 && r3.color === o.default.TreeNodeColorType.red)
                r3.color = t3.color = o.default.TreeNodeColorType.black, n2.color = o.default.TreeNodeColorType.red, d(n2);
              else if (!r3 || r3.color === o.default.TreeNodeColorType.black) {
                if (t3 === n2.leftChild) {
                  if (e3 === t3.leftChild) {
                    t3.color = o.default.TreeNodeColorType.black, n2.color = o.default.TreeNodeColorType.red;
                    var i2 = n2.rotateRight();
                    n2 === a && (a = i2);
                  } else if (e3 === t3.rightChild) {
                    i2 = t3.rotateLeft();
                    n2 === a && (a = i2), d(t3);
                  }
                } else if (t3 === n2.rightChild) {
                  if (e3 === t3.leftChild) {
                    i2 = t3.rotateRight();
                    n2 === a && (a = i2), d(t3);
                  } else if (e3 === t3.rightChild) {
                    t3.color = o.default.TreeNodeColorType.black, n2.color = o.default.TreeNodeColorType.red;
                    i2 = n2.rotateLeft();
                    n2 === a && (a = i2);
                  }
                }
              }
            }
          };
          this.insert = function(e3) {
            if (null === e3 || void 0 === e3)
              throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");
            if (this.empty())
              return ++s2, a.key = e3, void (a.color = o.default.TreeNodeColorType.black);
            var r3 = p(a, e3);
            void 0 !== r3.key && 0 === t2(r3.key, e3) || (++s2, r3.key = e3, d(r3), a.color = o.default.TreeNodeColorType.black);
          };
          var g = function(e3, r3) {
            if (e3 && void 0 !== e3.key) {
              var n2 = t2(r3, e3.key);
              return n2 < 0 ? g(e3.leftChild, r3) : n2 > 0 ? g(e3.rightChild, r3) : e3;
            }
          };
          this.find = function(e3) {
            var r3 = g(a, e3);
            return void 0 !== r3 && void 0 !== r3.key && 0 === t2(r3.key, e3);
          };
          var y = function(e3, r3) {
            if (e3 && void 0 !== e3.key) {
              var n2 = t2(e3.key, r3);
              if (0 === n2)
                return e3.key;
              if (n2 < 0)
                return y(e3.rightChild, r3);
              var i2 = y(e3.leftChild, r3);
              return void 0 !== i2 ? i2 : e3.key;
            }
          };
          this.lowerBound = function(e3) {
            return y(a, e3);
          };
          var b = function(e3, r3) {
            if (e3 && void 0 !== e3.key) {
              if (t2(e3.key, r3) <= 0)
                return b(e3.rightChild, r3);
              var n2 = b(e3.leftChild, r3);
              return void 0 !== n2 ? n2 : e3.key;
            }
          };
          this.upperBound = function(e3) {
            return b(a, e3);
          };
          var m = function(e3, r3) {
            if (e3 && void 0 !== e3.key) {
              var n2 = t2(e3.key, r3);
              if (0 === n2)
                return e3.key;
              if (n2 > 0)
                return m(e3.leftChild, r3);
              var i2 = m(e3.rightChild, r3);
              return void 0 !== i2 ? i2 : e3.key;
            }
          };
          this.reverseLowerBound = function(e3) {
            return m(a, e3);
          };
          var v = function(e3, r3) {
            if (e3 && void 0 !== e3.key) {
              if (t2(e3.key, r3) >= 0)
                return v(e3.leftChild, r3);
              var n2 = v(e3.rightChild, r3);
              return void 0 !== n2 ? n2 : e3.key;
            }
          };
          this.reverseUpperBound = function(e3) {
            return v(a, e3);
          }, this.union = function(e3) {
            var t3 = this;
            e3.forEach(function(e4) {
              return t3.insert(e4);
            });
          }, this.getHeight = function() {
            if (this.empty())
              return 0;
            var e3 = function(t3) {
              return t3 ? Math.max(e3(t3.leftChild), e3(t3.rightChild)) + 1 : 1;
            };
            return e3(a);
          };
          var w = function(e3) {
            return n(this, function(t3) {
              switch (t3.label) {
                case 0:
                  return e3 && void 0 !== e3.key ? [5, i(w(e3.leftChild))] : [2];
                case 1:
                  return t3.sent(), [4, e3.key];
                case 2:
                  return t3.sent(), [5, i(w(e3.rightChild))];
                case 3:
                  return t3.sent(), [2];
              }
            });
          };
          this[Symbol.iterator] = function() {
            return w(a);
          }, e2.forEach(function(e3) {
            return r2.insert(e3);
          }), Object.freeze(this);
        }
        Object.freeze(s), r.default = s;
      }, { "../Base/TreeNode": 25 }], 34: [function(e, t, r) {
        "use strict";
        function n(e2) {
          var t2 = this;
          void 0 === e2 && (e2 = []);
          var r2 = 0, n2 = [];
          this.size = function() {
            return r2;
          }, this.empty = function() {
            return 0 === r2;
          }, this.clear = function() {
            r2 = 0, n2.length = 0;
          }, this.push = function(e3) {
            n2.push(e3), ++r2;
          }, this.pop = function() {
            n2.pop(), r2 > 0 && --r2;
          }, this.top = function() {
            return n2[r2 - 1];
          }, e2.forEach(function(e3) {
            return t2.push(e3);
          }), Object.freeze(this);
        }
        Object.defineProperty(r, "__esModule", { value: true }), Object.freeze(n), r.default = n;
      }, {}], 35: [function(e, t, r) {
        "use strict";
        var n = this && this.__generator || function(e2, t2) {
          var r2, n2, i2, o2, s2 = { label: 0, sent: function() {
            if (1 & i2[0])
              throw i2[1];
            return i2[1];
          }, trys: [], ops: [] };
          return o2 = { next: a2(0), throw: a2(1), return: a2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function a2(o3) {
            return function(a3) {
              return function(o4) {
                if (r2)
                  throw new TypeError("Generator is already executing.");
                for (; s2; )
                  try {
                    if (r2 = 1, n2 && (i2 = 2 & o4[0] ? n2.return : o4[0] ? n2.throw || ((i2 = n2.return) && i2.call(n2), 0) : n2.next) && !(i2 = i2.call(n2, o4[1])).done)
                      return i2;
                    switch (n2 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                      case 0:
                      case 1:
                        i2 = o4;
                        break;
                      case 4:
                        return s2.label++, { value: o4[1], done: false };
                      case 5:
                        s2.label++, n2 = o4[1], o4 = [0];
                        continue;
                      case 7:
                        o4 = s2.ops.pop(), s2.trys.pop();
                        continue;
                      default:
                        if (!(i2 = (i2 = s2.trys).length > 0 && i2[i2.length - 1]) && (6 === o4[0] || 2 === o4[0])) {
                          s2 = 0;
                          continue;
                        }
                        if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                          s2.label = o4[1];
                          break;
                        }
                        if (6 === o4[0] && s2.label < i2[1]) {
                          s2.label = i2[1], i2 = o4;
                          break;
                        }
                        if (i2 && s2.label < i2[2]) {
                          s2.label = i2[2], s2.ops.push(o4);
                          break;
                        }
                        i2[2] && s2.ops.pop(), s2.trys.pop();
                        continue;
                    }
                    o4 = t2.call(e2, s2);
                  } catch (e3) {
                    o4 = [6, e3], n2 = 0;
                  } finally {
                    r2 = i2 = 0;
                  }
                if (5 & o4[0])
                  throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              }([o3, a3]);
            };
          }
        }, i = this && this.__read || function(e2, t2) {
          var r2 = "function" == typeof Symbol && e2[Symbol.iterator];
          if (!r2)
            return e2;
          var n2, i2, o2 = r2.call(e2), s2 = [];
          try {
            for (; (void 0 === t2 || t2-- > 0) && !(n2 = o2.next()).done; )
              s2.push(n2.value);
          } catch (e3) {
            i2 = { error: e3 };
          } finally {
            try {
              n2 && !n2.done && (r2 = o2.return) && r2.call(o2);
            } finally {
              if (i2)
                throw i2.error;
            }
          }
          return s2;
        }, o = this && this.__spreadArray || function(e2, t2, r2) {
          if (r2 || 2 === arguments.length)
            for (var n2, i2 = 0, o2 = t2.length; i2 < o2; i2++)
              !n2 && i2 in t2 || (n2 || (n2 = Array.prototype.slice.call(t2, 0, i2)), n2[i2] = t2[i2]);
          return e2.concat(n2 || Array.prototype.slice.call(t2));
        }, s = this && this.__values || function(e2) {
          var t2 = "function" == typeof Symbol && Symbol.iterator, r2 = t2 && e2[t2], n2 = 0;
          if (r2)
            return r2.call(e2);
          if (e2 && "number" == typeof e2.length)
            return { next: function() {
              return e2 && n2 >= e2.length && (e2 = void 0), { value: e2 && e2[n2++], done: !e2 };
            } };
          throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        function a(e2) {
          var t2 = this;
          void 0 === e2 && (e2 = []);
          var r2 = 0, a2 = [];
          this.size = function() {
            return r2;
          }, this.empty = function() {
            return 0 === r2;
          }, this.clear = function() {
            r2 = 0, a2.length = 0;
          }, this.front = function() {
            if (!this.empty())
              return a2[0];
          }, this.back = function() {
            if (!this.empty())
              return a2[r2 - 1];
          }, this.forEach = function(e3) {
            a2.forEach(e3);
          }, this.getElementByPos = function(e3) {
            if (e3 < 0 || e3 >= r2)
              throw new Error("pos must more than 0 and less than vector's size");
            return a2[e3];
          }, this.eraseElementByPos = function(e3) {
            if (e3 < 0 || e3 >= r2)
              throw new Error("pos must more than 0 and less than vector's size");
            for (var t3 = e3; t3 < r2 - 1; ++t3)
              a2[t3] = a2[t3 + 1];
            this.popBack();
          }, this.eraseElementByValue = function(e3) {
            var t3 = [];
            this.forEach(function(r3) {
              r3 !== e3 && t3.push(r3);
            }), t3.forEach(function(e4, t4) {
              a2[t4] = e4;
            });
            for (var n2 = t3.length; r2 > n2; )
              this.popBack();
          }, this.pushBack = function(e3) {
            a2.push(e3), ++r2;
          }, this.popBack = function() {
            a2.pop(), r2 > 0 && --r2;
          }, this.setElementByPos = function(e3, t3) {
            if (e3 < 0 || e3 >= r2)
              throw new Error("pos must more than 0 and less than vector's size");
            a2[e3] = t3;
          }, this.insert = function(e3, t3, n2) {
            if (void 0 === n2 && (n2 = 1), e3 < 0 || e3 > r2)
              throw new Error("pos must more than 0 and less than or equal to vector's size");
            a2.splice.apply(a2, o([e3, 0], i(new Array(n2).fill(t3)), false)), r2 += n2;
          }, this.find = function(e3) {
            return a2.includes(e3);
          }, this.reverse = function() {
            a2.reverse();
          }, this.unique = function() {
            var e3, t3 = [];
            this.forEach(function(r3, n3) {
              0 !== n3 && r3 === e3 || (t3.push(r3), e3 = r3);
            }), t3.forEach(function(e4, t4) {
              a2[t4] = e4;
            });
            for (var n2 = t3.length; r2 > n2; )
              this.popBack();
          }, this.sort = function(e3) {
            a2.sort(e3);
          }, this[Symbol.iterator] = function() {
            return function() {
              return n(this, function(e3) {
                switch (e3.label) {
                  case 0:
                    return [5, s(a2)];
                  case 1:
                    return [2, e3.sent()];
                }
              });
            }();
          }, e2.forEach(function(e3) {
            return t2.pushBack(e3);
          }), Object.freeze(this);
        }
        Object.defineProperty(r, "__esModule", { value: true }), Object.freeze(a), r.default = a;
      }, {}], 36: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: true }), r.HashMap = r.HashSet = r.Map = r.Set = r.PriorityQueue = r.Deque = r.LinkList = r.Queue = r.Stack = r.Vector = void 0;
        var n = e("./Vector/Vector");
        r.Vector = n.default;
        var i = e("./Stack/Stack");
        r.Stack = i.default;
        var o = e("./Queue/Queue");
        r.Queue = o.default;
        var s = e("./LinkList/LinkList");
        r.LinkList = s.default;
        var a = e("./Deque/Deque");
        r.Deque = a.default;
        var l = e("./PriorityQueue/PriorityQueue");
        r.PriorityQueue = l.default;
        var u = e("./Set/Set");
        r.Set = u.default;
        var c = e("./Map/Map");
        r.Map = c.default;
        var h = e("./HashSet/HashSet");
        r.HashSet = h.default;
        var f = e("./HashMap/HashMap");
        r.HashMap = f.default;
      }, { "./Deque/Deque": 26, "./HashMap/HashMap": 27, "./HashSet/HashSet": 28, "./LinkList/LinkList": 29, "./Map/Map": 30, "./PriorityQueue/PriorityQueue": 31, "./Queue/Queue": 32, "./Set/Set": 33, "./Stack/Stack": 34, "./Vector/Vector": 35 }], 37: [function(e, t, r) {
        "use strict";
        const n = e("yallist"), i = Symbol("max"), o = Symbol("length"), s = Symbol("lengthCalculator"), a = Symbol("allowStale"), l = Symbol("maxAge"), u = Symbol("dispose"), c = Symbol("noDisposeOnSet"), h = Symbol("lruList"), f = Symbol("cache"), p = Symbol("updateAgeOnGet"), d = () => 1;
        const g = (e2, t2, r2) => {
          const n2 = e2[f].get(t2);
          if (n2) {
            const t3 = n2.value;
            if (y(e2, t3)) {
              if (m(e2, n2), !e2[a])
                return;
            } else
              r2 && (e2[p] && (n2.value.now = Date.now()), e2[h].unshiftNode(n2));
            return t3.value;
          }
        }, y = (e2, t2) => {
          if (!t2 || !t2.maxAge && !e2[l])
            return false;
          const r2 = Date.now() - t2.now;
          return t2.maxAge ? r2 > t2.maxAge : e2[l] && r2 > e2[l];
        }, b = (e2) => {
          if (e2[o] > e2[i])
            for (let t2 = e2[h].tail; e2[o] > e2[i] && null !== t2; ) {
              const r2 = t2.prev;
              m(e2, t2), t2 = r2;
            }
        }, m = (e2, t2) => {
          if (t2) {
            const r2 = t2.value;
            e2[u] && e2[u](r2.key, r2.value), e2[o] -= r2.length, e2[f].delete(r2.key), e2[h].removeNode(t2);
          }
        };
        class v {
          constructor(e2, t2, r2, n2, i2) {
            this.key = e2, this.value = t2, this.length = r2, this.now = n2, this.maxAge = i2 || 0;
          }
        }
        const w = (e2, t2, r2, n2) => {
          let i2 = r2.value;
          y(e2, i2) && (m(e2, r2), e2[a] || (i2 = void 0)), i2 && t2.call(n2, i2.value, i2.key, e2);
        };
        t.exports = class {
          constructor(e2) {
            if ("number" == typeof e2 && (e2 = { max: e2 }), e2 || (e2 = {}), e2.max && ("number" != typeof e2.max || e2.max < 0))
              throw new TypeError("max must be a non-negative number");
            this[i] = e2.max || 1 / 0;
            const t2 = e2.length || d;
            if (this[s] = "function" != typeof t2 ? d : t2, this[a] = e2.stale || false, e2.maxAge && "number" != typeof e2.maxAge)
              throw new TypeError("maxAge must be a number");
            this[l] = e2.maxAge || 0, this[u] = e2.dispose, this[c] = e2.noDisposeOnSet || false, this[p] = e2.updateAgeOnGet || false, this.reset();
          }
          set max(e2) {
            if ("number" != typeof e2 || e2 < 0)
              throw new TypeError("max must be a non-negative number");
            this[i] = e2 || 1 / 0, b(this);
          }
          get max() {
            return this[i];
          }
          set allowStale(e2) {
            this[a] = !!e2;
          }
          get allowStale() {
            return this[a];
          }
          set maxAge(e2) {
            if ("number" != typeof e2)
              throw new TypeError("maxAge must be a non-negative number");
            this[l] = e2, b(this);
          }
          get maxAge() {
            return this[l];
          }
          set lengthCalculator(e2) {
            "function" != typeof e2 && (e2 = d), e2 !== this[s] && (this[s] = e2, this[o] = 0, this[h].forEach((e3) => {
              e3.length = this[s](e3.value, e3.key), this[o] += e3.length;
            })), b(this);
          }
          get lengthCalculator() {
            return this[s];
          }
          get length() {
            return this[o];
          }
          get itemCount() {
            return this[h].length;
          }
          rforEach(e2, t2) {
            t2 = t2 || this;
            for (let r2 = this[h].tail; null !== r2; ) {
              const n2 = r2.prev;
              w(this, e2, r2, t2), r2 = n2;
            }
          }
          forEach(e2, t2) {
            t2 = t2 || this;
            for (let r2 = this[h].head; null !== r2; ) {
              const n2 = r2.next;
              w(this, e2, r2, t2), r2 = n2;
            }
          }
          keys() {
            return this[h].toArray().map((e2) => e2.key);
          }
          values() {
            return this[h].toArray().map((e2) => e2.value);
          }
          reset() {
            this[u] && this[h] && this[h].length && this[h].forEach((e2) => this[u](e2.key, e2.value)), this[f] = /* @__PURE__ */ new Map(), this[h] = new n(), this[o] = 0;
          }
          dump() {
            return this[h].map((e2) => !y(this, e2) && { k: e2.key, v: e2.value, e: e2.now + (e2.maxAge || 0) }).toArray().filter((e2) => e2);
          }
          dumpLru() {
            return this[h];
          }
          set(e2, t2, r2) {
            if ((r2 = r2 || this[l]) && "number" != typeof r2)
              throw new TypeError("maxAge must be a number");
            const n2 = r2 ? Date.now() : 0, a2 = this[s](t2, e2);
            if (this[f].has(e2)) {
              if (a2 > this[i])
                return m(this, this[f].get(e2)), false;
              const s2 = this[f].get(e2).value;
              return this[u] && (this[c] || this[u](e2, s2.value)), s2.now = n2, s2.maxAge = r2, s2.value = t2, this[o] += a2 - s2.length, s2.length = a2, this.get(e2), b(this), true;
            }
            const p2 = new v(e2, t2, a2, n2, r2);
            return p2.length > this[i] ? (this[u] && this[u](e2, t2), false) : (this[o] += p2.length, this[h].unshift(p2), this[f].set(e2, this[h].head), b(this), true);
          }
          has(e2) {
            if (!this[f].has(e2))
              return false;
            const t2 = this[f].get(e2).value;
            return !y(this, t2);
          }
          get(e2) {
            return g(this, e2, true);
          }
          peek(e2) {
            return g(this, e2, false);
          }
          pop() {
            const e2 = this[h].tail;
            return e2 ? (m(this, e2), e2.value) : null;
          }
          del(e2) {
            m(this, this[f].get(e2));
          }
          load(e2) {
            this.reset();
            const t2 = Date.now();
            for (let r2 = e2.length - 1; r2 >= 0; r2--) {
              const n2 = e2[r2], i2 = n2.e || 0;
              if (0 === i2)
                this.set(n2.k, n2.v);
              else {
                const e3 = i2 - t2;
                e3 > 0 && this.set(n2.k, n2.v, e3);
              }
            }
          }
          prune() {
            this[f].forEach((e2, t2) => g(this, t2, false));
          }
        };
      }, { yallist: 83 }], 38: [function(e, t, r) {
        (function(e2) {
          (function() {
            const r2 = t.exports;
            r2.types = { 0: "reserved", 1: "connect", 2: "connack", 3: "publish", 4: "puback", 5: "pubrec", 6: "pubrel", 7: "pubcomp", 8: "subscribe", 9: "suback", 10: "unsubscribe", 11: "unsuback", 12: "pingreq", 13: "pingresp", 14: "disconnect", 15: "auth" }, r2.codes = {};
            for (const e3 in r2.types) {
              const t2 = r2.types[e3];
              r2.codes[t2] = e3;
            }
            r2.CMD_SHIFT = 4, r2.CMD_MASK = 240, r2.DUP_MASK = 8, r2.QOS_MASK = 3, r2.QOS_SHIFT = 1, r2.RETAIN_MASK = 1, r2.VARBYTEINT_MASK = 127, r2.VARBYTEINT_FIN_MASK = 128, r2.VARBYTEINT_MAX = 268435455, r2.SESSIONPRESENT_MASK = 1, r2.SESSIONPRESENT_HEADER = e2.from([r2.SESSIONPRESENT_MASK]), r2.CONNACK_HEADER = e2.from([r2.codes.connack << r2.CMD_SHIFT]), r2.USERNAME_MASK = 128, r2.PASSWORD_MASK = 64, r2.WILL_RETAIN_MASK = 32, r2.WILL_QOS_MASK = 24, r2.WILL_QOS_SHIFT = 3, r2.WILL_FLAG_MASK = 4, r2.CLEAN_SESSION_MASK = 2, r2.CONNECT_HEADER = e2.from([r2.codes.connect << r2.CMD_SHIFT]), r2.properties = { sessionExpiryInterval: 17, willDelayInterval: 24, receiveMaximum: 33, maximumPacketSize: 39, topicAliasMaximum: 34, requestResponseInformation: 25, requestProblemInformation: 23, userProperties: 38, authenticationMethod: 21, authenticationData: 22, payloadFormatIndicator: 1, messageExpiryInterval: 2, contentType: 3, responseTopic: 8, correlationData: 9, maximumQoS: 36, retainAvailable: 37, assignedClientIdentifier: 18, reasonString: 31, wildcardSubscriptionAvailable: 40, subscriptionIdentifiersAvailable: 41, sharedSubscriptionAvailable: 42, serverKeepAlive: 19, responseInformation: 26, serverReference: 28, topicAlias: 35, subscriptionIdentifier: 11 }, r2.propertiesCodes = {};
            for (const e3 in r2.properties) {
              const t2 = r2.properties[e3];
              r2.propertiesCodes[t2] = e3;
            }
            function n(t2) {
              return [0, 1, 2].map((n2) => [0, 1].map((i) => [0, 1].map((o) => {
                const s = e2.alloc(1);
                return s.writeUInt8(r2.codes[t2] << r2.CMD_SHIFT | (i ? r2.DUP_MASK : 0) | n2 << r2.QOS_SHIFT | o, 0, true), s;
              })));
            }
            r2.propertiesTypes = { sessionExpiryInterval: "int32", willDelayInterval: "int32", receiveMaximum: "int16", maximumPacketSize: "int32", topicAliasMaximum: "int16", requestResponseInformation: "byte", requestProblemInformation: "byte", userProperties: "pair", authenticationMethod: "string", authenticationData: "binary", payloadFormatIndicator: "byte", messageExpiryInterval: "int32", contentType: "string", responseTopic: "string", correlationData: "binary", maximumQoS: "int8", retainAvailable: "byte", assignedClientIdentifier: "string", reasonString: "string", wildcardSubscriptionAvailable: "byte", subscriptionIdentifiersAvailable: "byte", sharedSubscriptionAvailable: "byte", serverKeepAlive: "int16", responseInformation: "string", serverReference: "string", topicAlias: "int16", subscriptionIdentifier: "var" }, r2.PUBLISH_HEADER = n("publish"), r2.SUBSCRIBE_HEADER = n("subscribe"), r2.SUBSCRIBE_OPTIONS_QOS_MASK = 3, r2.SUBSCRIBE_OPTIONS_NL_MASK = 1, r2.SUBSCRIBE_OPTIONS_NL_SHIFT = 2, r2.SUBSCRIBE_OPTIONS_RAP_MASK = 1, r2.SUBSCRIBE_OPTIONS_RAP_SHIFT = 3, r2.SUBSCRIBE_OPTIONS_RH_MASK = 3, r2.SUBSCRIBE_OPTIONS_RH_SHIFT = 4, r2.SUBSCRIBE_OPTIONS_RH = [0, 16, 32], r2.SUBSCRIBE_OPTIONS_NL = 4, r2.SUBSCRIBE_OPTIONS_RAP = 8, r2.SUBSCRIBE_OPTIONS_QOS = [0, 1, 2], r2.UNSUBSCRIBE_HEADER = n("unsubscribe"), r2.ACKS = { unsuback: n("unsuback"), puback: n("puback"), pubcomp: n("pubcomp"), pubrel: n("pubrel"), pubrec: n("pubrec") }, r2.SUBACK_HEADER = e2.from([r2.codes.suback << r2.CMD_SHIFT]), r2.VERSION3 = e2.from([3]), r2.VERSION4 = e2.from([4]), r2.VERSION5 = e2.from([5]), r2.VERSION131 = e2.from([131]), r2.VERSION132 = e2.from([132]), r2.QOS = [0, 1, 2].map((t2) => e2.from([t2])), r2.EMPTY = { pingreq: e2.from([r2.codes.pingreq << 4, 0]), pingresp: e2.from([r2.codes.pingresp << 4, 0]), disconnect: e2.from([r2.codes.disconnect << 4, 0]) };
          }).call(this);
        }).call(this, e("buffer").Buffer);
      }, { buffer: 17 }], 39: [function(e, t, r) {
        (function(r2) {
          (function() {
            const n = e("./writeToStream"), i = e("events");
            class o extends i {
              constructor() {
                super(), this._array = new Array(20), this._i = 0;
              }
              write(e2) {
                return this._array[this._i++] = e2, true;
              }
              concat() {
                let e2 = 0;
                const t2 = new Array(this._array.length), n2 = this._array;
                let i2, o2 = 0;
                for (i2 = 0; i2 < n2.length && void 0 !== n2[i2]; i2++)
                  "string" != typeof n2[i2] ? t2[i2] = n2[i2].length : t2[i2] = r2.byteLength(n2[i2]), e2 += t2[i2];
                const s = r2.allocUnsafe(e2);
                for (i2 = 0; i2 < n2.length && void 0 !== n2[i2]; i2++)
                  "string" != typeof n2[i2] ? (n2[i2].copy(s, o2), o2 += t2[i2]) : (s.write(n2[i2], o2), o2 += t2[i2]);
                return s;
              }
            }
            t.exports = function(e2, t2) {
              const r3 = new o();
              return n(e2, r3, t2), r3.concat();
            };
          }).call(this);
        }).call(this, e("buffer").Buffer);
      }, { "./writeToStream": 44, buffer: 17, events: 22 }], 40: [function(e, t, r) {
        r.parser = e("./parser").parser, r.generate = e("./generate"), r.writeToStream = e("./writeToStream");
      }, { "./generate": 39, "./parser": 43, "./writeToStream": 44 }], 41: [function(e, t, r) {
        (function(e2) {
          (function() {
            const r2 = 65536, n = {}, i = e2.isBuffer(e2.from([1, 2]).subarray(0, 1));
            function o(t2) {
              const r3 = e2.allocUnsafe(2);
              return r3.writeUInt8(t2 >> 8, 0), r3.writeUInt8(255 & t2, 1), r3;
            }
            t.exports = { cache: n, generateCache: function() {
              for (let e3 = 0; e3 < r2; e3++)
                n[e3] = o(e3);
            }, generateNumber: o, genBufVariableByteInt: function(t2) {
              let r3 = 0, n2 = 0;
              const o2 = e2.allocUnsafe(4);
              do {
                r3 = t2 % 128 | 0, (t2 = t2 / 128 | 0) > 0 && (r3 |= 128), o2.writeUInt8(r3, n2++);
              } while (t2 > 0 && n2 < 4);
              return t2 > 0 && (n2 = 0), i ? o2.subarray(0, n2) : o2.slice(0, n2);
            }, generate4ByteBuffer: function(t2) {
              const r3 = e2.allocUnsafe(4);
              return r3.writeUInt32BE(t2, 0), r3;
            } };
          }).call(this);
        }).call(this, e("buffer").Buffer);
      }, { buffer: 17 }], 42: [function(e, t, r) {
        t.exports = class {
          constructor() {
            this.cmd = null, this.retain = false, this.qos = 0, this.dup = false, this.length = -1, this.topic = null, this.payload = null;
          }
        };
      }, {}], 43: [function(e, t, r) {
        const n = e("bl"), i = e("events"), o = e("./packet"), s = e("./constants"), a = e("debug")("mqtt-packet:parser");
        class l extends i {
          constructor() {
            super(), this.parser = this.constructor.parser;
          }
          static parser(e2) {
            return this instanceof l ? (this.settings = e2 || {}, this._states = ["_parseHeader", "_parseLength", "_parsePayload", "_newPacket"], this._resetState(), this) : new l().parser(e2);
          }
          _resetState() {
            a("_resetState: resetting packet, error, _list, and _stateCounter"), this.packet = new o(), this.error = null, this._list = n(), this._stateCounter = 0;
          }
          parse(e2) {
            for (this.error && this._resetState(), this._list.append(e2), a("parse: current state: %s", this._states[this._stateCounter]); (-1 !== this.packet.length || this._list.length > 0) && this[this._states[this._stateCounter]]() && !this.error; )
              this._stateCounter++, a("parse: state complete. _stateCounter is now: %d", this._stateCounter), a("parse: packet.length: %d, buffer list length: %d", this.packet.length, this._list.length), this._stateCounter >= this._states.length && (this._stateCounter = 0);
            return a("parse: exited while loop. packet: %d, buffer list length: %d", this.packet.length, this._list.length), this._list.length;
          }
          _parseHeader() {
            const e2 = this._list.readUInt8(0);
            return this.packet.cmd = s.types[e2 >> s.CMD_SHIFT], this.packet.retain = 0 != (e2 & s.RETAIN_MASK), this.packet.qos = e2 >> s.QOS_SHIFT & s.QOS_MASK, this.packet.dup = 0 != (e2 & s.DUP_MASK), a("_parseHeader: packet: %o", this.packet), this._list.consume(1), true;
          }
          _parseLength() {
            const e2 = this._parseVarByteNum(true);
            return e2 && (this.packet.length = e2.value, this._list.consume(e2.bytes)), a("_parseLength %d", e2.value), !!e2;
          }
          _parsePayload() {
            a("_parsePayload: payload %O", this._list);
            let e2 = false;
            if (0 === this.packet.length || this._list.length >= this.packet.length) {
              switch (this._pos = 0, this.packet.cmd) {
                case "connect":
                  this._parseConnect();
                  break;
                case "connack":
                  this._parseConnack();
                  break;
                case "publish":
                  this._parsePublish();
                  break;
                case "puback":
                case "pubrec":
                case "pubrel":
                case "pubcomp":
                  this._parseConfirmation();
                  break;
                case "subscribe":
                  this._parseSubscribe();
                  break;
                case "suback":
                  this._parseSuback();
                  break;
                case "unsubscribe":
                  this._parseUnsubscribe();
                  break;
                case "unsuback":
                  this._parseUnsuback();
                  break;
                case "pingreq":
                case "pingresp":
                  break;
                case "disconnect":
                  this._parseDisconnect();
                  break;
                case "auth":
                  this._parseAuth();
                  break;
                default:
                  this._emitError(new Error("Not supported"));
              }
              e2 = true;
            }
            return a("_parsePayload complete result: %s", e2), e2;
          }
          _parseConnect() {
            let e2, t2, r2, n2;
            a("_parseConnect");
            const i2 = {}, o2 = this.packet, l2 = this._parseString();
            if (null === l2)
              return this._emitError(new Error("Cannot parse protocolId"));
            if ("MQTT" !== l2 && "MQIsdp" !== l2)
              return this._emitError(new Error("Invalid protocolId"));
            if (o2.protocolId = l2, this._pos >= this._list.length)
              return this._emitError(new Error("Packet too short"));
            if (o2.protocolVersion = this._list.readUInt8(this._pos), o2.protocolVersion >= 128 && (o2.bridgeMode = true, o2.protocolVersion = o2.protocolVersion - 128), 3 !== o2.protocolVersion && 4 !== o2.protocolVersion && 5 !== o2.protocolVersion)
              return this._emitError(new Error("Invalid protocol version"));
            if (this._pos++, this._pos >= this._list.length)
              return this._emitError(new Error("Packet too short"));
            if (i2.username = this._list.readUInt8(this._pos) & s.USERNAME_MASK, i2.password = this._list.readUInt8(this._pos) & s.PASSWORD_MASK, i2.will = this._list.readUInt8(this._pos) & s.WILL_FLAG_MASK, i2.will && (o2.will = {}, o2.will.retain = 0 != (this._list.readUInt8(this._pos) & s.WILL_RETAIN_MASK), o2.will.qos = (this._list.readUInt8(this._pos) & s.WILL_QOS_MASK) >> s.WILL_QOS_SHIFT), o2.clean = 0 != (this._list.readUInt8(this._pos) & s.CLEAN_SESSION_MASK), this._pos++, o2.keepalive = this._parseNum(), -1 === o2.keepalive)
              return this._emitError(new Error("Packet too short"));
            if (5 === o2.protocolVersion) {
              const e3 = this._parseProperties();
              Object.getOwnPropertyNames(e3).length && (o2.properties = e3);
            }
            const u = this._parseString();
            if (null === u)
              return this._emitError(new Error("Packet too short"));
            if (o2.clientId = u, a("_parseConnect: packet.clientId: %s", o2.clientId), i2.will) {
              if (5 === o2.protocolVersion) {
                const e3 = this._parseProperties();
                Object.getOwnPropertyNames(e3).length && (o2.will.properties = e3);
              }
              if (null === (e2 = this._parseString()))
                return this._emitError(new Error("Cannot parse will topic"));
              if (o2.will.topic = e2, a("_parseConnect: packet.will.topic: %s", o2.will.topic), null === (t2 = this._parseBuffer()))
                return this._emitError(new Error("Cannot parse will payload"));
              o2.will.payload = t2, a("_parseConnect: packet.will.paylaod: %s", o2.will.payload);
            }
            if (i2.username) {
              if (null === (n2 = this._parseString()))
                return this._emitError(new Error("Cannot parse username"));
              o2.username = n2, a("_parseConnect: packet.username: %s", o2.username);
            }
            if (i2.password) {
              if (null === (r2 = this._parseBuffer()))
                return this._emitError(new Error("Cannot parse password"));
              o2.password = r2;
            }
            return this.settings = o2, a("_parseConnect: complete"), o2;
          }
          _parseConnack() {
            a("_parseConnack");
            const e2 = this.packet;
            if (this._list.length < 1)
              return null;
            if (e2.sessionPresent = !!(this._list.readUInt8(this._pos++) & s.SESSIONPRESENT_MASK), 5 === this.settings.protocolVersion)
              this._list.length >= 2 ? e2.reasonCode = this._list.readUInt8(this._pos++) : e2.reasonCode = 0;
            else {
              if (this._list.length < 2)
                return null;
              e2.returnCode = this._list.readUInt8(this._pos++);
            }
            if (-1 === e2.returnCode || -1 === e2.reasonCode)
              return this._emitError(new Error("Cannot parse return code"));
            if (5 === this.settings.protocolVersion) {
              const t2 = this._parseProperties();
              Object.getOwnPropertyNames(t2).length && (e2.properties = t2);
            }
            a("_parseConnack: complete");
          }
          _parsePublish() {
            a("_parsePublish");
            const e2 = this.packet;
            if (e2.topic = this._parseString(), null === e2.topic)
              return this._emitError(new Error("Cannot parse topic"));
            if (!(e2.qos > 0) || this._parseMessageId()) {
              if (5 === this.settings.protocolVersion) {
                const t2 = this._parseProperties();
                Object.getOwnPropertyNames(t2).length && (e2.properties = t2);
              }
              e2.payload = this._list.slice(this._pos, e2.length), a("_parsePublish: payload from buffer list: %o", e2.payload);
            }
          }
          _parseSubscribe() {
            a("_parseSubscribe");
            const e2 = this.packet;
            let t2, r2, n2, i2, o2, l2, u;
            if (1 !== e2.qos)
              return this._emitError(new Error("Wrong subscribe header"));
            if (e2.subscriptions = [], this._parseMessageId()) {
              if (5 === this.settings.protocolVersion) {
                const t3 = this._parseProperties();
                Object.getOwnPropertyNames(t3).length && (e2.properties = t3);
              }
              for (; this._pos < e2.length; ) {
                if (null === (t2 = this._parseString()))
                  return this._emitError(new Error("Cannot parse topic"));
                if (this._pos >= e2.length)
                  return this._emitError(new Error("Malformed Subscribe Payload"));
                n2 = (r2 = this._parseByte()) & s.SUBSCRIBE_OPTIONS_QOS_MASK, l2 = 0 != (r2 >> s.SUBSCRIBE_OPTIONS_NL_SHIFT & s.SUBSCRIBE_OPTIONS_NL_MASK), o2 = 0 != (r2 >> s.SUBSCRIBE_OPTIONS_RAP_SHIFT & s.SUBSCRIBE_OPTIONS_RAP_MASK), i2 = r2 >> s.SUBSCRIBE_OPTIONS_RH_SHIFT & s.SUBSCRIBE_OPTIONS_RH_MASK, u = { topic: t2, qos: n2 }, 5 === this.settings.protocolVersion ? (u.nl = l2, u.rap = o2, u.rh = i2) : this.settings.bridgeMode && (u.rh = 0, u.rap = true, u.nl = true), a("_parseSubscribe: push subscription `%s` to subscription", u), e2.subscriptions.push(u);
              }
            }
          }
          _parseSuback() {
            a("_parseSuback");
            const e2 = this.packet;
            if (this.packet.granted = [], this._parseMessageId()) {
              if (5 === this.settings.protocolVersion) {
                const t2 = this._parseProperties();
                Object.getOwnPropertyNames(t2).length && (e2.properties = t2);
              }
              for (; this._pos < this.packet.length; )
                this.packet.granted.push(this._list.readUInt8(this._pos++));
            }
          }
          _parseUnsubscribe() {
            a("_parseUnsubscribe");
            const e2 = this.packet;
            if (e2.unsubscriptions = [], this._parseMessageId()) {
              if (5 === this.settings.protocolVersion) {
                const t2 = this._parseProperties();
                Object.getOwnPropertyNames(t2).length && (e2.properties = t2);
              }
              for (; this._pos < e2.length; ) {
                const t2 = this._parseString();
                if (null === t2)
                  return this._emitError(new Error("Cannot parse topic"));
                a("_parseUnsubscribe: push topic `%s` to unsubscriptions", t2), e2.unsubscriptions.push(t2);
              }
            }
          }
          _parseUnsuback() {
            a("_parseUnsuback");
            const e2 = this.packet;
            if (!this._parseMessageId())
              return this._emitError(new Error("Cannot parse messageId"));
            if (5 === this.settings.protocolVersion) {
              const t2 = this._parseProperties();
              for (Object.getOwnPropertyNames(t2).length && (e2.properties = t2), e2.granted = []; this._pos < this.packet.length; )
                this.packet.granted.push(this._list.readUInt8(this._pos++));
            }
          }
          _parseConfirmation() {
            a("_parseConfirmation: packet.cmd: `%s`", this.packet.cmd);
            const e2 = this.packet;
            if (this._parseMessageId(), 5 === this.settings.protocolVersion && (e2.length > 2 ? (e2.reasonCode = this._parseByte(), a("_parseConfirmation: packet.reasonCode `%d`", e2.reasonCode)) : e2.reasonCode = 0, e2.length > 3)) {
              const t2 = this._parseProperties();
              Object.getOwnPropertyNames(t2).length && (e2.properties = t2);
            }
            return true;
          }
          _parseDisconnect() {
            const e2 = this.packet;
            if (a("_parseDisconnect"), 5 === this.settings.protocolVersion) {
              this._list.length > 0 ? e2.reasonCode = this._parseByte() : e2.reasonCode = 0;
              const t2 = this._parseProperties();
              Object.getOwnPropertyNames(t2).length && (e2.properties = t2);
            }
            return a("_parseDisconnect result: true"), true;
          }
          _parseAuth() {
            a("_parseAuth");
            const e2 = this.packet;
            if (5 !== this.settings.protocolVersion)
              return this._emitError(new Error("Not supported auth packet for this version MQTT"));
            e2.reasonCode = this._parseByte();
            const t2 = this._parseProperties();
            return Object.getOwnPropertyNames(t2).length && (e2.properties = t2), a("_parseAuth: result: true"), true;
          }
          _parseMessageId() {
            const e2 = this.packet;
            return e2.messageId = this._parseNum(), null === e2.messageId ? (this._emitError(new Error("Cannot parse messageId")), false) : (a("_parseMessageId: packet.messageId %d", e2.messageId), true);
          }
          _parseString(e2) {
            const t2 = this._parseNum(), r2 = t2 + this._pos;
            if (-1 === t2 || r2 > this._list.length || r2 > this.packet.length)
              return null;
            const n2 = this._list.toString("utf8", this._pos, r2);
            return this._pos += t2, a("_parseString: result: %s", n2), n2;
          }
          _parseStringPair() {
            return a("_parseStringPair"), { name: this._parseString(), value: this._parseString() };
          }
          _parseBuffer() {
            const e2 = this._parseNum(), t2 = e2 + this._pos;
            if (-1 === e2 || t2 > this._list.length || t2 > this.packet.length)
              return null;
            const r2 = this._list.slice(this._pos, t2);
            return this._pos += e2, a("_parseBuffer: result: %o", r2), r2;
          }
          _parseNum() {
            if (this._list.length - this._pos < 2)
              return -1;
            const e2 = this._list.readUInt16BE(this._pos);
            return this._pos += 2, a("_parseNum: result: %s", e2), e2;
          }
          _parse4ByteNum() {
            if (this._list.length - this._pos < 4)
              return -1;
            const e2 = this._list.readUInt32BE(this._pos);
            return this._pos += 4, a("_parse4ByteNum: result: %s", e2), e2;
          }
          _parseVarByteNum(e2) {
            a("_parseVarByteNum");
            let t2, r2 = 0, n2 = 1, i2 = 0, o2 = false;
            const l2 = this._pos ? this._pos : 0;
            for (; r2 < 4 && l2 + r2 < this._list.length; ) {
              if (i2 += n2 * ((t2 = this._list.readUInt8(l2 + r2++)) & s.VARBYTEINT_MASK), n2 *= 128, 0 == (t2 & s.VARBYTEINT_FIN_MASK)) {
                o2 = true;
                break;
              }
              if (this._list.length <= r2)
                break;
            }
            return !o2 && 4 === r2 && this._list.length >= r2 && this._emitError(new Error("Invalid variable byte integer")), l2 && (this._pos += r2), a("_parseVarByteNum: result: %o", o2 = !!o2 && (e2 ? { bytes: r2, value: i2 } : i2)), o2;
          }
          _parseByte() {
            let e2;
            return this._pos < this._list.length && (e2 = this._list.readUInt8(this._pos), this._pos++), a("_parseByte: result: %o", e2), e2;
          }
          _parseByType(e2) {
            switch (a("_parseByType: type: %s", e2), e2) {
              case "byte":
                return 0 !== this._parseByte();
              case "int8":
                return this._parseByte();
              case "int16":
                return this._parseNum();
              case "int32":
                return this._parse4ByteNum();
              case "var":
                return this._parseVarByteNum();
              case "string":
                return this._parseString();
              case "pair":
                return this._parseStringPair();
              case "binary":
                return this._parseBuffer();
            }
          }
          _parseProperties() {
            a("_parseProperties");
            const e2 = this._parseVarByteNum(), t2 = this._pos + e2, r2 = {};
            for (; this._pos < t2; ) {
              const e3 = this._parseByte();
              if (!e3)
                return this._emitError(new Error("Cannot parse property code type")), false;
              const t3 = s.propertiesCodes[e3];
              if (!t3)
                return this._emitError(new Error("Unknown property")), false;
              if ("userProperties" !== t3)
                r2[t3] ? Array.isArray(r2[t3]) ? r2[t3].push(this._parseByType(s.propertiesTypes[t3])) : (r2[t3] = [r2[t3]], r2[t3].push(this._parseByType(s.propertiesTypes[t3]))) : r2[t3] = this._parseByType(s.propertiesTypes[t3]);
              else {
                r2[t3] || (r2[t3] = /* @__PURE__ */ Object.create(null));
                const e4 = this._parseByType(s.propertiesTypes[t3]);
                if (r2[t3][e4.name])
                  if (Array.isArray(r2[t3][e4.name]))
                    r2[t3][e4.name].push(e4.value);
                  else {
                    const n2 = r2[t3][e4.name];
                    r2[t3][e4.name] = [n2], r2[t3][e4.name].push(e4.value);
                  }
                else
                  r2[t3][e4.name] = e4.value;
              }
            }
            return r2;
          }
          _newPacket() {
            return a("_newPacket"), this.packet && (this._list.consume(this.packet.length), a("_newPacket: parser emit packet: packet.cmd: %s, packet.payload: %s, packet.length: %d", this.packet.cmd, this.packet.payload, this.packet.length), this.emit("packet", this.packet)), a("_newPacket: new packet"), this.packet = new o(), this._pos = 0, true;
          }
          _emitError(e2) {
            a("_emitError"), this.error = e2, this.emit("error", e2);
          }
        }
        t.exports = l;
      }, { "./constants": 38, "./packet": 42, bl: 15, debug: 18, events: 22 }], 44: [function(e, t, r) {
        (function(r2) {
          (function() {
            const n = e("./constants"), i = r2.allocUnsafe(0), o = r2.from([0]), s = e("./numbers"), a = e("process-nextick-args").nextTick, l = e("debug")("mqtt-packet:writeToStream"), u = s.cache, c = s.generateNumber, h = s.generateCache, f = s.genBufVariableByteInt, p = s.generate4ByteBuffer;
            let d = k, g = true;
            function y(e2, t2, s2) {
              switch (l("generate called"), t2.cork && (t2.cork(), a(b, t2)), g && (g = false, h()), l("generate: packet.cmd: %s", e2.cmd), e2.cmd) {
                case "connect":
                  return function(e3, t3, i2) {
                    const o2 = e3 || {}, s3 = o2.protocolId || "MQTT";
                    let a2 = o2.protocolVersion || 4;
                    const l2 = o2.will;
                    let u2 = o2.clean;
                    const c2 = o2.keepalive || 0, h2 = o2.clientId || "", f2 = o2.username, p2 = o2.password, g2 = o2.properties;
                    void 0 === u2 && (u2 = true);
                    let y2 = 0;
                    if (!s3 || "string" != typeof s3 && !r2.isBuffer(s3))
                      return t3.emit("error", new Error("Invalid protocolId")), false;
                    y2 += s3.length + 2;
                    if (3 !== a2 && 4 !== a2 && 5 !== a2)
                      return t3.emit("error", new Error("Invalid protocol version")), false;
                    y2 += 1;
                    if (("string" == typeof h2 || r2.isBuffer(h2)) && (h2 || a2 >= 4) && (h2 || u2))
                      y2 += r2.byteLength(h2) + 2;
                    else {
                      if (a2 < 4)
                        return t3.emit("error", new Error("clientId must be supplied before 3.1.1")), false;
                      if (1 * u2 == 0)
                        return t3.emit("error", new Error("clientId must be given if cleanSession set to 0")), false;
                    }
                    if ("number" != typeof c2 || c2 < 0 || c2 > 65535 || c2 % 1 != 0)
                      return t3.emit("error", new Error("Invalid keepalive")), false;
                    y2 += 2;
                    if (y2 += 1, 5 === a2) {
                      var b2 = C(t3, g2);
                      if (!b2)
                        return false;
                      y2 += b2.length;
                    }
                    if (l2) {
                      if ("object" != typeof l2)
                        return t3.emit("error", new Error("Invalid will")), false;
                      if (!l2.topic || "string" != typeof l2.topic)
                        return t3.emit("error", new Error("Invalid will topic")), false;
                      if (y2 += r2.byteLength(l2.topic) + 2, y2 += 2, l2.payload) {
                        if (!(l2.payload.length >= 0))
                          return t3.emit("error", new Error("Invalid will payload")), false;
                        "string" == typeof l2.payload ? y2 += r2.byteLength(l2.payload) : y2 += l2.payload.length;
                      }
                      var m2 = {};
                      if (5 === a2) {
                        if (!(m2 = C(t3, l2.properties)))
                          return false;
                        y2 += m2.length;
                      }
                    }
                    let _2 = false;
                    if (null != f2) {
                      if (!P(f2))
                        return t3.emit("error", new Error("Invalid username")), false;
                      _2 = true, y2 += r2.byteLength(f2) + 2;
                    }
                    if (null != p2) {
                      if (!_2)
                        return t3.emit("error", new Error("Username is required to use password")), false;
                      if (!P(p2))
                        return t3.emit("error", new Error("Invalid password")), false;
                      y2 += I(p2) + 2;
                    }
                    t3.write(n.CONNECT_HEADER), v(t3, y2), E(t3, s3), o2.bridgeMode && (a2 += 128);
                    t3.write(131 === a2 ? n.VERSION131 : 132 === a2 ? n.VERSION132 : 4 === a2 ? n.VERSION4 : 5 === a2 ? n.VERSION5 : n.VERSION3);
                    let k2 = 0;
                    k2 |= null != f2 ? n.USERNAME_MASK : 0, k2 |= null != p2 ? n.PASSWORD_MASK : 0, k2 |= l2 && l2.retain ? n.WILL_RETAIN_MASK : 0, k2 |= l2 && l2.qos ? l2.qos << n.WILL_QOS_SHIFT : 0, k2 |= l2 ? n.WILL_FLAG_MASK : 0, k2 |= u2 ? n.CLEAN_SESSION_MASK : 0, t3.write(r2.from([k2])), d(t3, c2), 5 === a2 && b2.write();
                    E(t3, h2), l2 && (5 === a2 && m2.write(), w(t3, l2.topic), E(t3, l2.payload));
                    null != f2 && E(t3, f2);
                    null != p2 && E(t3, p2);
                    return true;
                  }(e2, t2);
                case "connack":
                  return function(e3, t3, i2) {
                    const s3 = i2 ? i2.protocolVersion : 4, a2 = e3 || {}, l2 = 5 === s3 ? a2.reasonCode : a2.returnCode, u2 = a2.properties;
                    let c2 = 2;
                    if ("number" != typeof l2)
                      return t3.emit("error", new Error("Invalid return code")), false;
                    let h2 = null;
                    if (5 === s3) {
                      if (!(h2 = C(t3, u2)))
                        return false;
                      c2 += h2.length;
                    }
                    t3.write(n.CONNACK_HEADER), v(t3, c2), t3.write(a2.sessionPresent ? n.SESSIONPRESENT_HEADER : o), t3.write(r2.from([l2])), null != h2 && h2.write();
                    return true;
                  }(e2, t2, s2);
                case "publish":
                  return function(e3, t3, o2) {
                    l("publish: packet: %o", e3);
                    const s3 = o2 ? o2.protocolVersion : 4, a2 = e3 || {}, u2 = a2.qos || 0, c2 = a2.retain ? n.RETAIN_MASK : 0, h2 = a2.topic, f2 = a2.payload || i, p2 = a2.messageId, g2 = a2.properties;
                    let y2 = 0;
                    if ("string" == typeof h2)
                      y2 += r2.byteLength(h2) + 2;
                    else {
                      if (!r2.isBuffer(h2))
                        return t3.emit("error", new Error("Invalid topic")), false;
                      y2 += h2.length + 2;
                    }
                    r2.isBuffer(f2) ? y2 += f2.length : y2 += r2.byteLength(f2);
                    if (u2 && "number" != typeof p2)
                      return t3.emit("error", new Error("Invalid messageId")), false;
                    u2 && (y2 += 2);
                    let b2 = null;
                    if (5 === s3) {
                      if (!(b2 = C(t3, g2)))
                        return false;
                      y2 += b2.length;
                    }
                    t3.write(n.PUBLISH_HEADER[u2][a2.dup ? 1 : 0][c2 ? 1 : 0]), v(t3, y2), d(t3, I(h2)), t3.write(h2), u2 > 0 && d(t3, p2);
                    null != b2 && b2.write();
                    return l("publish: payload: %o", f2), t3.write(f2);
                  }(e2, t2, s2);
                case "puback":
                case "pubrec":
                case "pubrel":
                case "pubcomp":
                  return function(e3, t3, i2) {
                    const o2 = i2 ? i2.protocolVersion : 4, s3 = e3 || {}, a2 = s3.cmd || "puback", l2 = s3.messageId, u2 = s3.dup && "pubrel" === a2 ? n.DUP_MASK : 0;
                    let c2 = 0;
                    const h2 = s3.reasonCode, f2 = s3.properties;
                    let p2 = 5 === o2 ? 3 : 2;
                    "pubrel" === a2 && (c2 = 1);
                    if ("number" != typeof l2)
                      return t3.emit("error", new Error("Invalid messageId")), false;
                    let g2 = null;
                    if (5 === o2 && "object" == typeof f2) {
                      if (!(g2 = T(t3, f2, i2, p2)))
                        return false;
                      p2 += g2.length;
                    }
                    t3.write(n.ACKS[a2][c2][u2][0]), v(t3, p2), d(t3, l2), 5 === o2 && t3.write(r2.from([h2]));
                    null !== g2 && g2.write();
                    return true;
                  }(e2, t2, s2);
                case "subscribe":
                  return function(e3, t3, i2) {
                    l("subscribe: packet: ");
                    const o2 = i2 ? i2.protocolVersion : 4, s3 = e3 || {}, a2 = s3.dup ? n.DUP_MASK : 0, u2 = s3.messageId, c2 = s3.subscriptions, h2 = s3.properties;
                    let f2 = 0;
                    if ("number" != typeof u2)
                      return t3.emit("error", new Error("Invalid messageId")), false;
                    f2 += 2;
                    let p2 = null;
                    if (5 === o2) {
                      if (!(p2 = C(t3, h2)))
                        return false;
                      f2 += p2.length;
                    }
                    if ("object" != typeof c2 || !c2.length)
                      return t3.emit("error", new Error("Invalid subscriptions")), false;
                    for (let e4 = 0; e4 < c2.length; e4 += 1) {
                      const n2 = c2[e4].topic, i3 = c2[e4].qos;
                      if ("string" != typeof n2)
                        return t3.emit("error", new Error("Invalid subscriptions - invalid topic")), false;
                      if ("number" != typeof i3)
                        return t3.emit("error", new Error("Invalid subscriptions - invalid qos")), false;
                      if (5 === o2) {
                        const r3 = c2[e4].nl || false;
                        if ("boolean" != typeof r3)
                          return t3.emit("error", new Error("Invalid subscriptions - invalid No Local")), false;
                        const n3 = c2[e4].rap || false;
                        if ("boolean" != typeof n3)
                          return t3.emit("error", new Error("Invalid subscriptions - invalid Retain as Published")), false;
                        const i4 = c2[e4].rh || 0;
                        if ("number" != typeof i4 || i4 > 2)
                          return t3.emit("error", new Error("Invalid subscriptions - invalid Retain Handling")), false;
                      }
                      f2 += r2.byteLength(n2) + 2 + 1;
                    }
                    l("subscribe: writing to stream: %o", n.SUBSCRIBE_HEADER), t3.write(n.SUBSCRIBE_HEADER[1][a2 ? 1 : 0][0]), v(t3, f2), d(t3, u2), null !== p2 && p2.write();
                    let g2 = true;
                    for (const e4 of c2) {
                      const i3 = e4.topic, s4 = e4.qos, a3 = +e4.nl, l2 = +e4.rap, u3 = e4.rh;
                      let c3;
                      w(t3, i3), c3 = n.SUBSCRIBE_OPTIONS_QOS[s4], 5 === o2 && (c3 |= a3 ? n.SUBSCRIBE_OPTIONS_NL : 0, c3 |= l2 ? n.SUBSCRIBE_OPTIONS_RAP : 0, c3 |= u3 ? n.SUBSCRIBE_OPTIONS_RH[u3] : 0), g2 = t3.write(r2.from([c3]));
                    }
                    return g2;
                  }(e2, t2, s2);
                case "suback":
                  return function(e3, t3, i2) {
                    const o2 = i2 ? i2.protocolVersion : 4, s3 = e3 || {}, a2 = s3.messageId, l2 = s3.granted, u2 = s3.properties;
                    let c2 = 0;
                    if ("number" != typeof a2)
                      return t3.emit("error", new Error("Invalid messageId")), false;
                    c2 += 2;
                    if ("object" != typeof l2 || !l2.length)
                      return t3.emit("error", new Error("Invalid qos vector")), false;
                    for (let e4 = 0; e4 < l2.length; e4 += 1) {
                      if ("number" != typeof l2[e4])
                        return t3.emit("error", new Error("Invalid qos vector")), false;
                      c2 += 1;
                    }
                    let h2 = null;
                    if (5 === o2) {
                      if (!(h2 = T(t3, u2, i2, c2)))
                        return false;
                      c2 += h2.length;
                    }
                    t3.write(n.SUBACK_HEADER), v(t3, c2), d(t3, a2), null !== h2 && h2.write();
                    return t3.write(r2.from(l2));
                  }(e2, t2, s2);
                case "unsubscribe":
                  return function(e3, t3, i2) {
                    const o2 = i2 ? i2.protocolVersion : 4, s3 = e3 || {}, a2 = s3.messageId, l2 = s3.dup ? n.DUP_MASK : 0, u2 = s3.unsubscriptions, c2 = s3.properties;
                    let h2 = 0;
                    if ("number" != typeof a2)
                      return t3.emit("error", new Error("Invalid messageId")), false;
                    h2 += 2;
                    if ("object" != typeof u2 || !u2.length)
                      return t3.emit("error", new Error("Invalid unsubscriptions")), false;
                    for (let e4 = 0; e4 < u2.length; e4 += 1) {
                      if ("string" != typeof u2[e4])
                        return t3.emit("error", new Error("Invalid unsubscriptions")), false;
                      h2 += r2.byteLength(u2[e4]) + 2;
                    }
                    let f2 = null;
                    if (5 === o2) {
                      if (!(f2 = C(t3, c2)))
                        return false;
                      h2 += f2.length;
                    }
                    t3.write(n.UNSUBSCRIBE_HEADER[1][l2 ? 1 : 0][0]), v(t3, h2), d(t3, a2), null !== f2 && f2.write();
                    let p2 = true;
                    for (let e4 = 0; e4 < u2.length; e4++)
                      p2 = w(t3, u2[e4]);
                    return p2;
                  }(e2, t2, s2);
                case "unsuback":
                  return function(e3, t3, i2) {
                    const o2 = i2 ? i2.protocolVersion : 4, s3 = e3 || {}, a2 = s3.messageId, l2 = s3.dup ? n.DUP_MASK : 0, u2 = s3.granted, c2 = s3.properties, h2 = s3.cmd;
                    let f2 = 2;
                    if ("number" != typeof a2)
                      return t3.emit("error", new Error("Invalid messageId")), false;
                    if (5 === o2) {
                      if ("object" != typeof u2 || !u2.length)
                        return t3.emit("error", new Error("Invalid qos vector")), false;
                      for (let e4 = 0; e4 < u2.length; e4 += 1) {
                        if ("number" != typeof u2[e4])
                          return t3.emit("error", new Error("Invalid qos vector")), false;
                        f2 += 1;
                      }
                    }
                    let p2 = null;
                    if (5 === o2) {
                      if (!(p2 = T(t3, c2, i2, f2)))
                        return false;
                      f2 += p2.length;
                    }
                    t3.write(n.ACKS[h2][0][l2][0]), v(t3, f2), d(t3, a2), null !== p2 && p2.write();
                    5 === o2 && t3.write(r2.from(u2));
                    return true;
                  }(e2, t2, s2);
                case "pingreq":
                case "pingresp":
                  return function(e3, t3, r3) {
                    return t3.write(n.EMPTY[e3.cmd]);
                  }(e2, t2);
                case "disconnect":
                  return function(e3, t3, i2) {
                    const o2 = i2 ? i2.protocolVersion : 4, s3 = e3 || {}, a2 = s3.reasonCode, l2 = s3.properties;
                    let u2 = 5 === o2 ? 1 : 0, c2 = null;
                    if (5 === o2) {
                      if (!(c2 = T(t3, l2, i2, u2)))
                        return false;
                      u2 += c2.length;
                    }
                    t3.write(r2.from([n.codes.disconnect << 4])), v(t3, u2), 5 === o2 && t3.write(r2.from([a2]));
                    null !== c2 && c2.write();
                    return true;
                  }(e2, t2, s2);
                case "auth":
                  return function(e3, t3, i2) {
                    const o2 = i2 ? i2.protocolVersion : 4, s3 = e3 || {}, a2 = s3.reasonCode, l2 = s3.properties;
                    let u2 = 5 === o2 ? 1 : 0;
                    5 !== o2 && t3.emit("error", new Error("Invalid mqtt version for auth packet"));
                    const c2 = T(t3, l2, i2, u2);
                    if (!c2)
                      return false;
                    u2 += c2.length, t3.write(r2.from([n.codes.auth << 4])), v(t3, u2), t3.write(r2.from([a2])), null !== c2 && c2.write();
                    return true;
                  }(e2, t2, s2);
                default:
                  return t2.emit("error", new Error("Unknown command")), false;
              }
            }
            function b(e2) {
              e2.uncork();
            }
            Object.defineProperty(y, "cacheNumbers", { get: () => d === k, set(e2) {
              e2 ? (u && 0 !== Object.keys(u).length || (g = true), d = k) : (g = false, d = S);
            } });
            const m = {};
            function v(e2, t2) {
              if (t2 > n.VARBYTEINT_MAX)
                return e2.emit("error", new Error(`Invalid variable byte integer: ${t2}`)), false;
              let r3 = m[t2];
              return r3 || (r3 = f(t2), t2 < 16384 && (m[t2] = r3)), l("writeVarByteInt: writing to stream: %o", r3), e2.write(r3);
            }
            function w(e2, t2) {
              const n2 = r2.byteLength(t2);
              return d(e2, n2), l("writeString: %s", t2), e2.write(t2, "utf8");
            }
            function _(e2, t2, r3) {
              w(e2, t2), w(e2, r3);
            }
            function k(e2, t2) {
              return l("writeNumberCached: number: %d", t2), l("writeNumberCached: %o", u[t2]), e2.write(u[t2]);
            }
            function S(e2, t2) {
              const r3 = c(t2);
              return l("writeNumberGenerated: %o", r3), e2.write(r3);
            }
            function E(e2, t2) {
              "string" == typeof t2 ? w(e2, t2) : t2 ? (d(e2, t2.length), e2.write(t2)) : d(e2, 0);
            }
            function C(e2, t2) {
              if ("object" != typeof t2 || null != t2.length)
                return { length: 1, write() {
                  A(e2, {}, 0);
                } };
              let i2 = 0;
              function o2(t3, i3) {
                let o3 = 0;
                switch (n.propertiesTypes[t3]) {
                  case "byte":
                    if ("boolean" != typeof i3)
                      return e2.emit("error", new Error(`Invalid ${t3}: ${i3}`)), false;
                    o3 += 2;
                    break;
                  case "int8":
                    if ("number" != typeof i3 || i3 < 0 || i3 > 255)
                      return e2.emit("error", new Error(`Invalid ${t3}: ${i3}`)), false;
                    o3 += 2;
                    break;
                  case "binary":
                    if (i3 && null === i3)
                      return e2.emit("error", new Error(`Invalid ${t3}: ${i3}`)), false;
                    o3 += 1 + r2.byteLength(i3) + 2;
                    break;
                  case "int16":
                    if ("number" != typeof i3 || i3 < 0 || i3 > 65535)
                      return e2.emit("error", new Error(`Invalid ${t3}: ${i3}`)), false;
                    o3 += 3;
                    break;
                  case "int32":
                    if ("number" != typeof i3 || i3 < 0 || i3 > 4294967295)
                      return e2.emit("error", new Error(`Invalid ${t3}: ${i3}`)), false;
                    o3 += 5;
                    break;
                  case "var":
                    if ("number" != typeof i3 || i3 < 0 || i3 > 268435455)
                      return e2.emit("error", new Error(`Invalid ${t3}: ${i3}`)), false;
                    o3 += 1 + r2.byteLength(f(i3));
                    break;
                  case "string":
                    if ("string" != typeof i3)
                      return e2.emit("error", new Error(`Invalid ${t3}: ${i3}`)), false;
                    o3 += 3 + r2.byteLength(i3.toString());
                    break;
                  case "pair":
                    if ("object" != typeof i3)
                      return e2.emit("error", new Error(`Invalid ${t3}: ${i3}`)), false;
                    o3 += Object.getOwnPropertyNames(i3).reduce((e3, t4) => {
                      const n2 = i3[t4];
                      return Array.isArray(n2) ? e3 += n2.reduce((e4, n3) => e4 += 3 + r2.byteLength(t4.toString()) + 2 + r2.byteLength(n3.toString()), 0) : e3 += 3 + r2.byteLength(t4.toString()) + 2 + r2.byteLength(i3[t4].toString()), e3;
                    }, 0);
                    break;
                  default:
                    return e2.emit("error", new Error(`Invalid property ${t3}: ${i3}`)), false;
                }
                return o3;
              }
              if (t2)
                for (const e3 in t2) {
                  let r3 = 0, n2 = 0;
                  const s2 = t2[e3];
                  if (Array.isArray(s2))
                    for (let t3 = 0; t3 < s2.length; t3++) {
                      if (!(n2 = o2(e3, s2[t3])))
                        return false;
                      r3 += n2;
                    }
                  else {
                    if (!(n2 = o2(e3, s2)))
                      return false;
                    r3 = n2;
                  }
                  if (!r3)
                    return false;
                  i2 += r3;
                }
              return { length: r2.byteLength(f(i2)) + i2, write() {
                A(e2, t2, i2);
              } };
            }
            function T(e2, t2, r3, n2) {
              const i2 = ["reasonString", "userProperties"], o2 = r3 && r3.properties && r3.properties.maximumPacketSize ? r3.properties.maximumPacketSize : 0;
              let s2 = C(e2, t2);
              if (o2)
                for (; n2 + s2.length > o2; ) {
                  const r4 = i2.shift();
                  if (!r4 || !t2[r4])
                    return false;
                  delete t2[r4], s2 = C(e2, t2);
                }
              return s2;
            }
            function x(e2, t2, i2) {
              switch (n.propertiesTypes[t2]) {
                case "byte":
                  e2.write(r2.from([n.properties[t2]])), e2.write(r2.from([+i2]));
                  break;
                case "int8":
                  e2.write(r2.from([n.properties[t2]])), e2.write(r2.from([i2]));
                  break;
                case "binary":
                  e2.write(r2.from([n.properties[t2]])), E(e2, i2);
                  break;
                case "int16":
                  e2.write(r2.from([n.properties[t2]])), d(e2, i2);
                  break;
                case "int32":
                  e2.write(r2.from([n.properties[t2]])), function(e3, t3) {
                    const r3 = p(t3);
                    l("write4ByteNumber: %o", r3), e3.write(r3);
                  }(e2, i2);
                  break;
                case "var":
                  e2.write(r2.from([n.properties[t2]])), v(e2, i2);
                  break;
                case "string":
                  e2.write(r2.from([n.properties[t2]])), w(e2, i2);
                  break;
                case "pair":
                  Object.getOwnPropertyNames(i2).forEach((o2) => {
                    const s2 = i2[o2];
                    Array.isArray(s2) ? s2.forEach((i3) => {
                      e2.write(r2.from([n.properties[t2]])), _(e2, o2.toString(), i3.toString());
                    }) : (e2.write(r2.from([n.properties[t2]])), _(e2, o2.toString(), s2.toString()));
                  });
                  break;
                default:
                  return e2.emit("error", new Error(`Invalid property ${t2} value: ${i2}`)), false;
              }
            }
            function A(e2, t2, r3) {
              v(e2, r3);
              for (const r4 in t2)
                if (Object.prototype.hasOwnProperty.call(t2, r4) && null !== t2[r4]) {
                  const n2 = t2[r4];
                  if (Array.isArray(n2))
                    for (let t3 = 0; t3 < n2.length; t3++)
                      x(e2, r4, n2[t3]);
                  else
                    x(e2, r4, n2);
                }
            }
            function I(e2) {
              return e2 ? e2 instanceof r2 ? e2.length : r2.byteLength(e2) : 0;
            }
            function P(e2) {
              return "string" == typeof e2 || e2 instanceof r2;
            }
            t.exports = y;
          }).call(this);
        }).call(this, e("buffer").Buffer);
      }, { "./constants": 38, "./numbers": 41, buffer: 17, debug: 18, "process-nextick-args": 49 }], 45: [function(e, t, r) {
        var n = 1e3, i = 60 * n, o = 60 * i, s = 24 * o, a = 7 * s, l = 365.25 * s;
        function u(e2, t2, r2, n2) {
          var i2 = t2 >= 1.5 * r2;
          return Math.round(e2 / r2) + " " + n2 + (i2 ? "s" : "");
        }
        t.exports = function(e2, t2) {
          t2 = t2 || {};
          var r2 = typeof e2;
          if ("string" === r2 && e2.length > 0)
            return function(e3) {
              if ((e3 = String(e3)).length > 100)
                return;
              var t3 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e3);
              if (!t3)
                return;
              var r3 = parseFloat(t3[1]);
              switch ((t3[2] || "ms").toLowerCase()) {
                case "years":
                case "year":
                case "yrs":
                case "yr":
                case "y":
                  return r3 * l;
                case "weeks":
                case "week":
                case "w":
                  return r3 * a;
                case "days":
                case "day":
                case "d":
                  return r3 * s;
                case "hours":
                case "hour":
                case "hrs":
                case "hr":
                case "h":
                  return r3 * o;
                case "minutes":
                case "minute":
                case "mins":
                case "min":
                case "m":
                  return r3 * i;
                case "seconds":
                case "second":
                case "secs":
                case "sec":
                case "s":
                  return r3 * n;
                case "milliseconds":
                case "millisecond":
                case "msecs":
                case "msec":
                case "ms":
                  return r3;
                default:
                  return;
              }
            }(e2);
          if ("number" === r2 && isFinite(e2))
            return t2.long ? function(e3) {
              var t3 = Math.abs(e3);
              if (t3 >= s)
                return u(e3, t3, s, "day");
              if (t3 >= o)
                return u(e3, t3, o, "hour");
              if (t3 >= i)
                return u(e3, t3, i, "minute");
              if (t3 >= n)
                return u(e3, t3, n, "second");
              return e3 + " ms";
            }(e2) : function(e3) {
              var t3 = Math.abs(e3);
              if (t3 >= s)
                return Math.round(e3 / s) + "d";
              if (t3 >= o)
                return Math.round(e3 / o) + "h";
              if (t3 >= i)
                return Math.round(e3 / i) + "m";
              if (t3 >= n)
                return Math.round(e3 / n) + "s";
              return e3 + "ms";
            }(e2);
          throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e2));
        };
      }, {}], 46: [function(e, t, r) {
        const n = e("./lib/number-allocator.js");
        t.exports.NumberAllocator = n;
      }, { "./lib/number-allocator.js": 47 }], 47: [function(e, t, r) {
        "use strict";
        const n = e("js-sdsl").Set, i = e("debug")("number-allocator:trace"), o = e("debug")("number-allocator:error");
        function s(e2, t2) {
          this.low = e2, this.high = t2;
        }
        function a(e2, t2) {
          if (!(this instanceof a))
            return new a(e2, t2);
          this.min = e2, this.max = t2, this.ss = new n([], (e3, t3) => e3.compare(t3)), i("Create"), this.clear();
        }
        s.prototype.equals = function(e2) {
          return this.low === e2.low && this.high === e2.high;
        }, s.prototype.compare = function(e2) {
          return this.low < e2.low && this.high < e2.low ? -1 : e2.low < this.low && e2.high < this.low ? 1 : 0;
        }, a.prototype.firstVacant = function() {
          return 0 === this.ss.size() ? null : this.ss.front().low;
        }, a.prototype.alloc = function() {
          if (0 === this.ss.size())
            return i("alloc():empty"), null;
          const e2 = this.ss.front(), t2 = e2.low;
          return t2 + 1 <= e2.high ? ++e2.low : this.ss.eraseElementByPos(0), i("alloc():" + t2), t2;
        }, a.prototype.use = function(e2) {
          const t2 = new s(e2, e2), r2 = this.ss.lowerBound(t2);
          if (r2) {
            if (r2.equals(t2))
              return this.ss.eraseElementByValue(r2), i("use():" + e2), true;
            if (r2.low > e2)
              return false;
            if (r2.low === e2)
              return ++r2.low, i("use():" + e2), true;
            if (r2.high === e2)
              return --r2.high, i("use():" + e2), true;
            const n2 = r2.low;
            return r2.low = e2 + 1, this.ss.insert(new s(n2, e2 - 1)), i("use():" + e2), true;
          }
          return i("use():failed"), false;
        }, a.prototype.free = function(e2) {
          if (e2 < this.min || e2 > this.max)
            return void o("free():" + e2 + " is out of range");
          const t2 = new s(e2, e2), r2 = this.ss.lowerBound(t2);
          if (r2) {
            if (r2.low <= e2 && e2 <= r2.high)
              return void o("free():" + e2 + " has already been vacant");
            if (r2 === this.ss.front())
              e2 + 1 === r2.low ? --r2.low : this.ss.insert(t2);
            else {
              const n2 = this.ss.reverseLowerBound(t2);
              n2.high + 1 === e2 ? e2 + 1 === r2.low ? (this.ss.eraseElementByValue(n2), r2.low = n2.low) : n2.high = e2 : e2 + 1 === r2.low ? r2.low = e2 : this.ss.insert(t2);
            }
          } else {
            if (r2 === this.ss.front())
              return void this.ss.insert(t2);
            const n2 = this.ss.reverseLowerBound(t2);
            n2.high + 1 === e2 ? n2.high = e2 : this.ss.insert(t2);
          }
          i("free():" + e2);
        }, a.prototype.clear = function() {
          i("clear()"), this.ss.clear(), this.ss.insert(new s(this.min, this.max));
        }, a.prototype.intervalCount = function() {
          return this.ss.size();
        }, a.prototype.dump = function() {
          console.log("length:" + this.ss.size());
          for (const e2 of this.ss)
            console.log(e2);
        }, t.exports = a;
      }, { debug: 18, "js-sdsl": 36 }], 48: [function(e, t, r) {
        var n = e("wrappy");
        function i(e2) {
          var t2 = function() {
            return t2.called ? t2.value : (t2.called = true, t2.value = e2.apply(this, arguments));
          };
          return t2.called = false, t2;
        }
        function o(e2) {
          var t2 = function() {
            if (t2.called)
              throw new Error(t2.onceError);
            return t2.called = true, t2.value = e2.apply(this, arguments);
          }, r2 = e2.name || "Function wrapped with `once`";
          return t2.onceError = r2 + " shouldn't be called more than once", t2.called = false, t2;
        }
        t.exports = n(i), t.exports.strict = n(o), i.proto = i(function() {
          Object.defineProperty(Function.prototype, "once", { value: function() {
            return i(this);
          }, configurable: true }), Object.defineProperty(Function.prototype, "onceStrict", { value: function() {
            return o(this);
          }, configurable: true });
        });
      }, { wrappy: 79 }], 49: [function(e, t, r) {
        (function(e2) {
          (function() {
            "use strict";
            void 0 === e2 || !e2.version || 0 === e2.version.indexOf("v0.") || 0 === e2.version.indexOf("v1.") && 0 !== e2.version.indexOf("v1.8.") ? t.exports = { nextTick: function(t2, r2, n, i) {
              if ("function" != typeof t2)
                throw new TypeError('"callback" argument must be a function');
              var o, s, a = arguments.length;
              switch (a) {
                case 0:
                case 1:
                  return e2.nextTick(t2);
                case 2:
                  return e2.nextTick(function() {
                    t2.call(null, r2);
                  });
                case 3:
                  return e2.nextTick(function() {
                    t2.call(null, r2, n);
                  });
                case 4:
                  return e2.nextTick(function() {
                    t2.call(null, r2, n, i);
                  });
                default:
                  for (o = new Array(a - 1), s = 0; s < o.length; )
                    o[s++] = arguments[s];
                  return e2.nextTick(function() {
                    t2.apply(null, o);
                  });
              }
            } } : t.exports = e2;
          }).call(this);
        }).call(this, e("_process"));
      }, { _process: 50 }], 50: [function(e, t, r) {
        var n, i, o = t.exports = {};
        function s() {
          throw new Error("setTimeout has not been defined");
        }
        function a() {
          throw new Error("clearTimeout has not been defined");
        }
        function l(e2) {
          if (n === setTimeout)
            return setTimeout(e2, 0);
          if ((n === s || !n) && setTimeout)
            return n = setTimeout, setTimeout(e2, 0);
          try {
            return n(e2, 0);
          } catch (t2) {
            try {
              return n.call(null, e2, 0);
            } catch (t3) {
              return n.call(this, e2, 0);
            }
          }
        }
        !function() {
          try {
            n = "function" == typeof setTimeout ? setTimeout : s;
          } catch (e2) {
            n = s;
          }
          try {
            i = "function" == typeof clearTimeout ? clearTimeout : a;
          } catch (e2) {
            i = a;
          }
        }();
        var u, c = [], h = false, f = -1;
        function p() {
          h && u && (h = false, u.length ? c = u.concat(c) : f = -1, c.length && d());
        }
        function d() {
          if (!h) {
            var e2 = l(p);
            h = true;
            for (var t2 = c.length; t2; ) {
              for (u = c, c = []; ++f < t2; )
                u && u[f].run();
              f = -1, t2 = c.length;
            }
            u = null, h = false, function(e3) {
              if (i === clearTimeout)
                return clearTimeout(e3);
              if ((i === a || !i) && clearTimeout)
                return i = clearTimeout, clearTimeout(e3);
              try {
                i(e3);
              } catch (t3) {
                try {
                  return i.call(null, e3);
                } catch (t4) {
                  return i.call(this, e3);
                }
              }
            }(e2);
          }
        }
        function g(e2, t2) {
          this.fun = e2, this.array = t2;
        }
        function y() {
        }
        o.nextTick = function(e2) {
          var t2 = new Array(arguments.length - 1);
          if (arguments.length > 1)
            for (var r2 = 1; r2 < arguments.length; r2++)
              t2[r2 - 1] = arguments[r2];
          c.push(new g(e2, t2)), 1 !== c.length || h || l(d);
        }, g.prototype.run = function() {
          this.fun.apply(null, this.array);
        }, o.title = "browser", o.browser = true, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = y, o.addListener = y, o.once = y, o.off = y, o.removeListener = y, o.removeAllListeners = y, o.emit = y, o.prependListener = y, o.prependOnceListener = y, o.listeners = function(e2) {
          return [];
        }, o.binding = function(e2) {
          throw new Error("process.binding is not supported");
        }, o.cwd = function() {
          return "/";
        }, o.chdir = function(e2) {
          throw new Error("process.chdir is not supported");
        }, o.umask = function() {
          return 0;
        };
      }, {}], 51: [function(e, t, r) {
        (function(e2) {
          (function() {
            !function(n) {
              var i = "object" == typeof r && r && !r.nodeType && r, o = "object" == typeof t && t && !t.nodeType && t, s = "object" == typeof e2 && e2;
              s.global !== s && s.window !== s && s.self !== s || (n = s);
              var a, l, u = 2147483647, c = 36, h = 1, f = 26, p = 38, d = 700, g = 72, y = 128, b = "-", m = /^xn--/, v = /[^\x20-\x7E]/, w = /[\x2E\u3002\uFF0E\uFF61]/g, _ = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" }, k = c - h, S = Math.floor, E = String.fromCharCode;
              function C(e3) {
                throw new RangeError(_[e3]);
              }
              function T(e3, t2) {
                for (var r2 = e3.length, n2 = []; r2--; )
                  n2[r2] = t2(e3[r2]);
                return n2;
              }
              function x(e3, t2) {
                var r2 = e3.split("@"), n2 = "";
                return r2.length > 1 && (n2 = r2[0] + "@", e3 = r2[1]), n2 + T((e3 = e3.replace(w, ".")).split("."), t2).join(".");
              }
              function A(e3) {
                for (var t2, r2, n2 = [], i2 = 0, o2 = e3.length; i2 < o2; )
                  (t2 = e3.charCodeAt(i2++)) >= 55296 && t2 <= 56319 && i2 < o2 ? 56320 == (64512 & (r2 = e3.charCodeAt(i2++))) ? n2.push(((1023 & t2) << 10) + (1023 & r2) + 65536) : (n2.push(t2), i2--) : n2.push(t2);
                return n2;
              }
              function I(e3) {
                return T(e3, function(e4) {
                  var t2 = "";
                  return e4 > 65535 && (t2 += E((e4 -= 65536) >>> 10 & 1023 | 55296), e4 = 56320 | 1023 & e4), t2 += E(e4);
                }).join("");
              }
              function P(e3, t2) {
                return e3 + 22 + 75 * (e3 < 26) - ((0 != t2) << 5);
              }
              function O(e3, t2, r2) {
                var n2 = 0;
                for (e3 = r2 ? S(e3 / d) : e3 >> 1, e3 += S(e3 / t2); e3 > k * f >> 1; n2 += c)
                  e3 = S(e3 / k);
                return S(n2 + (k + 1) * e3 / (e3 + p));
              }
              function B(e3) {
                var t2, r2, n2, i2, o2, s2, a2, l2, p2, d2, m2, v2 = [], w2 = e3.length, _2 = 0, k2 = y, E2 = g;
                for ((r2 = e3.lastIndexOf(b)) < 0 && (r2 = 0), n2 = 0; n2 < r2; ++n2)
                  e3.charCodeAt(n2) >= 128 && C("not-basic"), v2.push(e3.charCodeAt(n2));
                for (i2 = r2 > 0 ? r2 + 1 : 0; i2 < w2; ) {
                  for (o2 = _2, s2 = 1, a2 = c; i2 >= w2 && C("invalid-input"), ((l2 = (m2 = e3.charCodeAt(i2++)) - 48 < 10 ? m2 - 22 : m2 - 65 < 26 ? m2 - 65 : m2 - 97 < 26 ? m2 - 97 : c) >= c || l2 > S((u - _2) / s2)) && C("overflow"), _2 += l2 * s2, !(l2 < (p2 = a2 <= E2 ? h : a2 >= E2 + f ? f : a2 - E2)); a2 += c)
                    s2 > S(u / (d2 = c - p2)) && C("overflow"), s2 *= d2;
                  E2 = O(_2 - o2, t2 = v2.length + 1, 0 == o2), S(_2 / t2) > u - k2 && C("overflow"), k2 += S(_2 / t2), _2 %= t2, v2.splice(_2++, 0, k2);
                }
                return I(v2);
              }
              function R(e3) {
                var t2, r2, n2, i2, o2, s2, a2, l2, p2, d2, m2, v2, w2, _2, k2, T2 = [];
                for (v2 = (e3 = A(e3)).length, t2 = y, r2 = 0, o2 = g, s2 = 0; s2 < v2; ++s2)
                  (m2 = e3[s2]) < 128 && T2.push(E(m2));
                for (n2 = i2 = T2.length, i2 && T2.push(b); n2 < v2; ) {
                  for (a2 = u, s2 = 0; s2 < v2; ++s2)
                    (m2 = e3[s2]) >= t2 && m2 < a2 && (a2 = m2);
                  for (a2 - t2 > S((u - r2) / (w2 = n2 + 1)) && C("overflow"), r2 += (a2 - t2) * w2, t2 = a2, s2 = 0; s2 < v2; ++s2)
                    if ((m2 = e3[s2]) < t2 && ++r2 > u && C("overflow"), m2 == t2) {
                      for (l2 = r2, p2 = c; !(l2 < (d2 = p2 <= o2 ? h : p2 >= o2 + f ? f : p2 - o2)); p2 += c)
                        k2 = l2 - d2, _2 = c - d2, T2.push(E(P(d2 + k2 % _2, 0))), l2 = S(k2 / _2);
                      T2.push(E(P(l2, 0))), o2 = O(r2, w2, n2 == i2), r2 = 0, ++n2;
                    }
                  ++r2, ++t2;
                }
                return T2.join("");
              }
              if (a = { version: "1.4.1", ucs2: { decode: A, encode: I }, decode: B, encode: R, toASCII: function(e3) {
                return x(e3, function(e4) {
                  return v.test(e4) ? "xn--" + R(e4) : e4;
                });
              }, toUnicode: function(e3) {
                return x(e3, function(e4) {
                  return m.test(e4) ? B(e4.slice(4).toLowerCase()) : e4;
                });
              } }, i && o)
                if (t.exports == i)
                  o.exports = a;
                else
                  for (l in a)
                    a.hasOwnProperty(l) && (i[l] = a[l]);
              else
                n.punycode = a;
            }(this);
          }).call(this);
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
      }, {}], 52: [function(e, t, r) {
        "use strict";
        function n(e2, t2) {
          return Object.prototype.hasOwnProperty.call(e2, t2);
        }
        t.exports = function(e2, t2, r2, o) {
          t2 = t2 || "&", r2 = r2 || "=";
          var s = {};
          if ("string" != typeof e2 || 0 === e2.length)
            return s;
          var a = /\+/g;
          e2 = e2.split(t2);
          var l = 1e3;
          o && "number" == typeof o.maxKeys && (l = o.maxKeys);
          var u = e2.length;
          l > 0 && u > l && (u = l);
          for (var c = 0; c < u; ++c) {
            var h, f, p, d, g = e2[c].replace(a, "%20"), y = g.indexOf(r2);
            y >= 0 ? (h = g.substr(0, y), f = g.substr(y + 1)) : (h = g, f = ""), p = decodeURIComponent(h), d = decodeURIComponent(f), n(s, p) ? i(s[p]) ? s[p].push(d) : s[p] = [s[p], d] : s[p] = d;
          }
          return s;
        };
        var i = Array.isArray || function(e2) {
          return "[object Array]" === Object.prototype.toString.call(e2);
        };
      }, {}], 53: [function(e, t, r) {
        "use strict";
        var n = function(e2) {
          switch (typeof e2) {
            case "string":
              return e2;
            case "boolean":
              return e2 ? "true" : "false";
            case "number":
              return isFinite(e2) ? e2 : "";
            default:
              return "";
          }
        };
        t.exports = function(e2, t2, r2, a) {
          return t2 = t2 || "&", r2 = r2 || "=", null === e2 && (e2 = void 0), "object" == typeof e2 ? o(s(e2), function(s2) {
            var a2 = encodeURIComponent(n(s2)) + r2;
            return i(e2[s2]) ? o(e2[s2], function(e3) {
              return a2 + encodeURIComponent(n(e3));
            }).join(t2) : a2 + encodeURIComponent(n(e2[s2]));
          }).join(t2) : a ? encodeURIComponent(n(a)) + r2 + encodeURIComponent(n(e2)) : "";
        };
        var i = Array.isArray || function(e2) {
          return "[object Array]" === Object.prototype.toString.call(e2);
        };
        function o(e2, t2) {
          if (e2.map)
            return e2.map(t2);
          for (var r2 = [], n2 = 0; n2 < e2.length; n2++)
            r2.push(t2(e2[n2], n2));
          return r2;
        }
        var s = Object.keys || function(e2) {
          var t2 = [];
          for (var r2 in e2)
            Object.prototype.hasOwnProperty.call(e2, r2) && t2.push(r2);
          return t2;
        };
      }, {}], 54: [function(e, t, r) {
        "use strict";
        r.decode = r.parse = e("./decode"), r.encode = r.stringify = e("./encode");
      }, { "./decode": 52, "./encode": 53 }], 55: [function(e, t, r) {
        "use strict";
        var n = {};
        function i(e2, t2, r2) {
          r2 || (r2 = Error);
          var i2 = function(e3) {
            var r3, n2;
            function i3(r4, n3, i4) {
              return e3.call(this, function(e4, r5, n4) {
                return "string" == typeof t2 ? t2 : t2(e4, r5, n4);
              }(r4, n3, i4)) || this;
            }
            return n2 = e3, (r3 = i3).prototype = Object.create(n2.prototype), r3.prototype.constructor = r3, r3.__proto__ = n2, i3;
          }(r2);
          i2.prototype.name = r2.name, i2.prototype.code = e2, n[e2] = i2;
        }
        function o(e2, t2) {
          if (Array.isArray(e2)) {
            var r2 = e2.length;
            return e2 = e2.map(function(e3) {
              return String(e3);
            }), r2 > 2 ? "one of ".concat(t2, " ").concat(e2.slice(0, r2 - 1).join(", "), ", or ") + e2[r2 - 1] : 2 === r2 ? "one of ".concat(t2, " ").concat(e2[0], " or ").concat(e2[1]) : "of ".concat(t2, " ").concat(e2[0]);
          }
          return "of ".concat(t2, " ").concat(String(e2));
        }
        i("ERR_INVALID_OPT_VALUE", function(e2, t2) {
          return 'The value "' + t2 + '" is invalid for option "' + e2 + '"';
        }, TypeError), i("ERR_INVALID_ARG_TYPE", function(e2, t2, r2) {
          var n2, i2, s, a;
          if ("string" == typeof t2 && (i2 = "not ", t2.substr(!s || s < 0 ? 0 : +s, i2.length) === i2) ? (n2 = "must not be", t2 = t2.replace(/^not /, "")) : n2 = "must be", function(e3, t3, r3) {
            return (void 0 === r3 || r3 > e3.length) && (r3 = e3.length), e3.substring(r3 - t3.length, r3) === t3;
          }(e2, " argument"))
            a = "The ".concat(e2, " ").concat(n2, " ").concat(o(t2, "type"));
          else {
            var l = function(e3, t3, r3) {
              return "number" != typeof r3 && (r3 = 0), !(r3 + t3.length > e3.length) && -1 !== e3.indexOf(t3, r3);
            }(e2, ".") ? "property" : "argument";
            a = 'The "'.concat(e2, '" ').concat(l, " ").concat(n2, " ").concat(o(t2, "type"));
          }
          return a += ". Received type ".concat(typeof r2);
        }, TypeError), i("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), i("ERR_METHOD_NOT_IMPLEMENTED", function(e2) {
          return "The " + e2 + " method is not implemented";
        }), i("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), i("ERR_STREAM_DESTROYED", function(e2) {
          return "Cannot call " + e2 + " after a stream was destroyed";
        }), i("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), i("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), i("ERR_STREAM_WRITE_AFTER_END", "write after end"), i("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), i("ERR_UNKNOWN_ENCODING", function(e2) {
          return "Unknown encoding: " + e2;
        }, TypeError), i("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), t.exports.codes = n;
      }, {}], 56: [function(e, t, r) {
        (function(r2) {
          (function() {
            "use strict";
            var n = Object.keys || function(e2) {
              var t2 = [];
              for (var r3 in e2)
                t2.push(r3);
              return t2;
            };
            t.exports = u;
            var i = e("./_stream_readable"), o = e("./_stream_writable");
            e("inherits")(u, i);
            for (var s = n(o.prototype), a = 0; a < s.length; a++) {
              var l = s[a];
              u.prototype[l] || (u.prototype[l] = o.prototype[l]);
            }
            function u(e2) {
              if (!(this instanceof u))
                return new u(e2);
              i.call(this, e2), o.call(this, e2), this.allowHalfOpen = true, e2 && (false === e2.readable && (this.readable = false), false === e2.writable && (this.writable = false), false === e2.allowHalfOpen && (this.allowHalfOpen = false, this.once("end", c)));
            }
            function c() {
              this._writableState.ended || r2.nextTick(h, this);
            }
            function h(e2) {
              e2.end();
            }
            Object.defineProperty(u.prototype, "writableHighWaterMark", { enumerable: false, get: function() {
              return this._writableState.highWaterMark;
            } }), Object.defineProperty(u.prototype, "writableBuffer", { enumerable: false, get: function() {
              return this._writableState && this._writableState.getBuffer();
            } }), Object.defineProperty(u.prototype, "writableLength", { enumerable: false, get: function() {
              return this._writableState.length;
            } }), Object.defineProperty(u.prototype, "destroyed", { enumerable: false, get: function() {
              return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed);
            }, set: function(e2) {
              void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e2, this._writableState.destroyed = e2);
            } });
          }).call(this);
        }).call(this, e("_process"));
      }, { "./_stream_readable": 58, "./_stream_writable": 60, _process: 50, inherits: 24 }], 57: [function(e, t, r) {
        "use strict";
        t.exports = i;
        var n = e("./_stream_transform");
        function i(e2) {
          if (!(this instanceof i))
            return new i(e2);
          n.call(this, e2);
        }
        e("inherits")(i, n), i.prototype._transform = function(e2, t2, r2) {
          r2(null, e2);
        };
      }, { "./_stream_transform": 59, inherits: 24 }], 58: [function(e, t, r) {
        (function(r2, n) {
          (function() {
            "use strict";
            var i;
            t.exports = C, C.ReadableState = E;
            e("events").EventEmitter;
            var o = function(e2, t2) {
              return e2.listeners(t2).length;
            }, s = e("./internal/streams/stream"), a = e("buffer").Buffer, l = n.Uint8Array || function() {
            };
            var u, c = e("util");
            u = c && c.debuglog ? c.debuglog("stream") : function() {
            };
            var h, f, p, d = e("./internal/streams/buffer_list"), g = e("./internal/streams/destroy"), y = e("./internal/streams/state").getHighWaterMark, b = e("../errors").codes, m = b.ERR_INVALID_ARG_TYPE, v = b.ERR_STREAM_PUSH_AFTER_EOF, w = b.ERR_METHOD_NOT_IMPLEMENTED, _ = b.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
            e("inherits")(C, s);
            var k = g.errorOrDestroy, S = ["error", "close", "destroy", "pause", "resume"];
            function E(t2, r3, n2) {
              i = i || e("./_stream_duplex"), t2 = t2 || {}, "boolean" != typeof n2 && (n2 = r3 instanceof i), this.objectMode = !!t2.objectMode, n2 && (this.objectMode = this.objectMode || !!t2.readableObjectMode), this.highWaterMark = y(this, t2, "readableHighWaterMark", n2), this.buffer = new d(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = false, this.endEmitted = false, this.reading = false, this.sync = true, this.needReadable = false, this.emittedReadable = false, this.readableListening = false, this.resumeScheduled = false, this.paused = true, this.emitClose = false !== t2.emitClose, this.autoDestroy = !!t2.autoDestroy, this.destroyed = false, this.defaultEncoding = t2.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = false, this.decoder = null, this.encoding = null, t2.encoding && (h || (h = e("string_decoder/").StringDecoder), this.decoder = new h(t2.encoding), this.encoding = t2.encoding);
            }
            function C(t2) {
              if (i = i || e("./_stream_duplex"), !(this instanceof C))
                return new C(t2);
              var r3 = this instanceof i;
              this._readableState = new E(t2, this, r3), this.readable = true, t2 && ("function" == typeof t2.read && (this._read = t2.read), "function" == typeof t2.destroy && (this._destroy = t2.destroy)), s.call(this);
            }
            function T(e2, t2, r3, n2, i2) {
              u("readableAddChunk", t2);
              var o2, s2 = e2._readableState;
              if (null === t2)
                s2.reading = false, function(e3, t3) {
                  if (u("onEofChunk"), t3.ended)
                    return;
                  if (t3.decoder) {
                    var r4 = t3.decoder.end();
                    r4 && r4.length && (t3.buffer.push(r4), t3.length += t3.objectMode ? 1 : r4.length);
                  }
                  t3.ended = true, t3.sync ? P(e3) : (t3.needReadable = false, t3.emittedReadable || (t3.emittedReadable = true, O(e3)));
                }(e2, s2);
              else if (i2 || (o2 = function(e3, t3) {
                var r4;
                n3 = t3, a.isBuffer(n3) || n3 instanceof l || "string" == typeof t3 || void 0 === t3 || e3.objectMode || (r4 = new m("chunk", ["string", "Buffer", "Uint8Array"], t3));
                var n3;
                return r4;
              }(s2, t2)), o2)
                k(e2, o2);
              else if (s2.objectMode || t2 && t2.length > 0)
                if ("string" == typeof t2 || s2.objectMode || Object.getPrototypeOf(t2) === a.prototype || (t2 = function(e3) {
                  return a.from(e3);
                }(t2)), n2)
                  s2.endEmitted ? k(e2, new _()) : x(e2, s2, t2, true);
                else if (s2.ended)
                  k(e2, new v());
                else {
                  if (s2.destroyed)
                    return false;
                  s2.reading = false, s2.decoder && !r3 ? (t2 = s2.decoder.write(t2), s2.objectMode || 0 !== t2.length ? x(e2, s2, t2, false) : B(e2, s2)) : x(e2, s2, t2, false);
                }
              else
                n2 || (s2.reading = false, B(e2, s2));
              return !s2.ended && (s2.length < s2.highWaterMark || 0 === s2.length);
            }
            function x(e2, t2, r3, n2) {
              t2.flowing && 0 === t2.length && !t2.sync ? (t2.awaitDrain = 0, e2.emit("data", r3)) : (t2.length += t2.objectMode ? 1 : r3.length, n2 ? t2.buffer.unshift(r3) : t2.buffer.push(r3), t2.needReadable && P(e2)), B(e2, t2);
            }
            Object.defineProperty(C.prototype, "destroyed", { enumerable: false, get: function() {
              return void 0 !== this._readableState && this._readableState.destroyed;
            }, set: function(e2) {
              this._readableState && (this._readableState.destroyed = e2);
            } }), C.prototype.destroy = g.destroy, C.prototype._undestroy = g.undestroy, C.prototype._destroy = function(e2, t2) {
              t2(e2);
            }, C.prototype.push = function(e2, t2) {
              var r3, n2 = this._readableState;
              return n2.objectMode ? r3 = true : "string" == typeof e2 && ((t2 = t2 || n2.defaultEncoding) !== n2.encoding && (e2 = a.from(e2, t2), t2 = ""), r3 = true), T(this, e2, t2, false, r3);
            }, C.prototype.unshift = function(e2) {
              return T(this, e2, null, true, false);
            }, C.prototype.isPaused = function() {
              return false === this._readableState.flowing;
            }, C.prototype.setEncoding = function(t2) {
              h || (h = e("string_decoder/").StringDecoder);
              var r3 = new h(t2);
              this._readableState.decoder = r3, this._readableState.encoding = this._readableState.decoder.encoding;
              for (var n2 = this._readableState.buffer.head, i2 = ""; null !== n2; )
                i2 += r3.write(n2.data), n2 = n2.next;
              return this._readableState.buffer.clear(), "" !== i2 && this._readableState.buffer.push(i2), this._readableState.length = i2.length, this;
            };
            var A = 1073741824;
            function I(e2, t2) {
              return e2 <= 0 || 0 === t2.length && t2.ended ? 0 : t2.objectMode ? 1 : e2 != e2 ? t2.flowing && t2.length ? t2.buffer.head.data.length : t2.length : (e2 > t2.highWaterMark && (t2.highWaterMark = function(e3) {
                return e3 >= A ? e3 = A : (e3--, e3 |= e3 >>> 1, e3 |= e3 >>> 2, e3 |= e3 >>> 4, e3 |= e3 >>> 8, e3 |= e3 >>> 16, e3++), e3;
              }(e2)), e2 <= t2.length ? e2 : t2.ended ? t2.length : (t2.needReadable = true, 0));
            }
            function P(e2) {
              var t2 = e2._readableState;
              u("emitReadable", t2.needReadable, t2.emittedReadable), t2.needReadable = false, t2.emittedReadable || (u("emitReadable", t2.flowing), t2.emittedReadable = true, r2.nextTick(O, e2));
            }
            function O(e2) {
              var t2 = e2._readableState;
              u("emitReadable_", t2.destroyed, t2.length, t2.ended), t2.destroyed || !t2.length && !t2.ended || (e2.emit("readable"), t2.emittedReadable = false), t2.needReadable = !t2.flowing && !t2.ended && t2.length <= t2.highWaterMark, j(e2);
            }
            function B(e2, t2) {
              t2.readingMore || (t2.readingMore = true, r2.nextTick(R, e2, t2));
            }
            function R(e2, t2) {
              for (; !t2.reading && !t2.ended && (t2.length < t2.highWaterMark || t2.flowing && 0 === t2.length); ) {
                var r3 = t2.length;
                if (u("maybeReadMore read 0"), e2.read(0), r3 === t2.length)
                  break;
              }
              t2.readingMore = false;
            }
            function M(e2) {
              var t2 = e2._readableState;
              t2.readableListening = e2.listenerCount("readable") > 0, t2.resumeScheduled && !t2.paused ? t2.flowing = true : e2.listenerCount("data") > 0 && e2.resume();
            }
            function N(e2) {
              u("readable nexttick read 0"), e2.read(0);
            }
            function L(e2, t2) {
              u("resume", t2.reading), t2.reading || e2.read(0), t2.resumeScheduled = false, e2.emit("resume"), j(e2), t2.flowing && !t2.reading && e2.read(0);
            }
            function j(e2) {
              var t2 = e2._readableState;
              for (u("flow", t2.flowing); t2.flowing && null !== e2.read(); )
                ;
            }
            function U(e2, t2) {
              return 0 === t2.length ? null : (t2.objectMode ? r3 = t2.buffer.shift() : !e2 || e2 >= t2.length ? (r3 = t2.decoder ? t2.buffer.join("") : 1 === t2.buffer.length ? t2.buffer.first() : t2.buffer.concat(t2.length), t2.buffer.clear()) : r3 = t2.buffer.consume(e2, t2.decoder), r3);
              var r3;
            }
            function q(e2) {
              var t2 = e2._readableState;
              u("endReadable", t2.endEmitted), t2.endEmitted || (t2.ended = true, r2.nextTick(D, t2, e2));
            }
            function D(e2, t2) {
              if (u("endReadableNT", e2.endEmitted, e2.length), !e2.endEmitted && 0 === e2.length && (e2.endEmitted = true, t2.readable = false, t2.emit("end"), e2.autoDestroy)) {
                var r3 = t2._writableState;
                (!r3 || r3.autoDestroy && r3.finished) && t2.destroy();
              }
            }
            function z(e2, t2) {
              for (var r3 = 0, n2 = e2.length; r3 < n2; r3++)
                if (e2[r3] === t2)
                  return r3;
              return -1;
            }
            C.prototype.read = function(e2) {
              u("read", e2), e2 = parseInt(e2, 10);
              var t2 = this._readableState, r3 = e2;
              if (0 !== e2 && (t2.emittedReadable = false), 0 === e2 && t2.needReadable && ((0 !== t2.highWaterMark ? t2.length >= t2.highWaterMark : t2.length > 0) || t2.ended))
                return u("read: emitReadable", t2.length, t2.ended), 0 === t2.length && t2.ended ? q(this) : P(this), null;
              if (0 === (e2 = I(e2, t2)) && t2.ended)
                return 0 === t2.length && q(this), null;
              var n2, i2 = t2.needReadable;
              return u("need readable", i2), (0 === t2.length || t2.length - e2 < t2.highWaterMark) && u("length less than watermark", i2 = true), t2.ended || t2.reading ? u("reading or ended", i2 = false) : i2 && (u("do read"), t2.reading = true, t2.sync = true, 0 === t2.length && (t2.needReadable = true), this._read(t2.highWaterMark), t2.sync = false, t2.reading || (e2 = I(r3, t2))), null === (n2 = e2 > 0 ? U(e2, t2) : null) ? (t2.needReadable = t2.length <= t2.highWaterMark, e2 = 0) : (t2.length -= e2, t2.awaitDrain = 0), 0 === t2.length && (t2.ended || (t2.needReadable = true), r3 !== e2 && t2.ended && q(this)), null !== n2 && this.emit("data", n2), n2;
            }, C.prototype._read = function(e2) {
              k(this, new w("_read()"));
            }, C.prototype.pipe = function(e2, t2) {
              var n2 = this, i2 = this._readableState;
              switch (i2.pipesCount) {
                case 0:
                  i2.pipes = e2;
                  break;
                case 1:
                  i2.pipes = [i2.pipes, e2];
                  break;
                default:
                  i2.pipes.push(e2);
              }
              i2.pipesCount += 1, u("pipe count=%d opts=%j", i2.pipesCount, t2);
              var s2 = (!t2 || false !== t2.end) && e2 !== r2.stdout && e2 !== r2.stderr ? l2 : y2;
              function a2(t3, r3) {
                u("onunpipe"), t3 === n2 && r3 && false === r3.hasUnpiped && (r3.hasUnpiped = true, u("cleanup"), e2.removeListener("close", d2), e2.removeListener("finish", g2), e2.removeListener("drain", c2), e2.removeListener("error", p2), e2.removeListener("unpipe", a2), n2.removeListener("end", l2), n2.removeListener("end", y2), n2.removeListener("data", f2), h2 = true, !i2.awaitDrain || e2._writableState && !e2._writableState.needDrain || c2());
              }
              function l2() {
                u("onend"), e2.end();
              }
              i2.endEmitted ? r2.nextTick(s2) : n2.once("end", s2), e2.on("unpipe", a2);
              var c2 = /* @__PURE__ */ function(e3) {
                return function() {
                  var t3 = e3._readableState;
                  u("pipeOnDrain", t3.awaitDrain), t3.awaitDrain && t3.awaitDrain--, 0 === t3.awaitDrain && o(e3, "data") && (t3.flowing = true, j(e3));
                };
              }(n2);
              e2.on("drain", c2);
              var h2 = false;
              function f2(t3) {
                u("ondata");
                var r3 = e2.write(t3);
                u("dest.write", r3), false === r3 && ((1 === i2.pipesCount && i2.pipes === e2 || i2.pipesCount > 1 && -1 !== z(i2.pipes, e2)) && !h2 && (u("false write response, pause", i2.awaitDrain), i2.awaitDrain++), n2.pause());
              }
              function p2(t3) {
                u("onerror", t3), y2(), e2.removeListener("error", p2), 0 === o(e2, "error") && k(e2, t3);
              }
              function d2() {
                e2.removeListener("finish", g2), y2();
              }
              function g2() {
                u("onfinish"), e2.removeListener("close", d2), y2();
              }
              function y2() {
                u("unpipe"), n2.unpipe(e2);
              }
              return n2.on("data", f2), function(e3, t3, r3) {
                if ("function" == typeof e3.prependListener)
                  return e3.prependListener(t3, r3);
                e3._events && e3._events[t3] ? Array.isArray(e3._events[t3]) ? e3._events[t3].unshift(r3) : e3._events[t3] = [r3, e3._events[t3]] : e3.on(t3, r3);
              }(e2, "error", p2), e2.once("close", d2), e2.once("finish", g2), e2.emit("pipe", n2), i2.flowing || (u("pipe resume"), n2.resume()), e2;
            }, C.prototype.unpipe = function(e2) {
              var t2 = this._readableState, r3 = { hasUnpiped: false };
              if (0 === t2.pipesCount)
                return this;
              if (1 === t2.pipesCount)
                return e2 && e2 !== t2.pipes ? this : (e2 || (e2 = t2.pipes), t2.pipes = null, t2.pipesCount = 0, t2.flowing = false, e2 && e2.emit("unpipe", this, r3), this);
              if (!e2) {
                var n2 = t2.pipes, i2 = t2.pipesCount;
                t2.pipes = null, t2.pipesCount = 0, t2.flowing = false;
                for (var o2 = 0; o2 < i2; o2++)
                  n2[o2].emit("unpipe", this, { hasUnpiped: false });
                return this;
              }
              var s2 = z(t2.pipes, e2);
              return -1 === s2 ? this : (t2.pipes.splice(s2, 1), t2.pipesCount -= 1, 1 === t2.pipesCount && (t2.pipes = t2.pipes[0]), e2.emit("unpipe", this, r3), this);
            }, C.prototype.on = function(e2, t2) {
              var n2 = s.prototype.on.call(this, e2, t2), i2 = this._readableState;
              return "data" === e2 ? (i2.readableListening = this.listenerCount("readable") > 0, false !== i2.flowing && this.resume()) : "readable" === e2 && (i2.endEmitted || i2.readableListening || (i2.readableListening = i2.needReadable = true, i2.flowing = false, i2.emittedReadable = false, u("on readable", i2.length, i2.reading), i2.length ? P(this) : i2.reading || r2.nextTick(N, this))), n2;
            }, C.prototype.addListener = C.prototype.on, C.prototype.removeListener = function(e2, t2) {
              var n2 = s.prototype.removeListener.call(this, e2, t2);
              return "readable" === e2 && r2.nextTick(M, this), n2;
            }, C.prototype.removeAllListeners = function(e2) {
              var t2 = s.prototype.removeAllListeners.apply(this, arguments);
              return "readable" !== e2 && void 0 !== e2 || r2.nextTick(M, this), t2;
            }, C.prototype.resume = function() {
              var e2 = this._readableState;
              return e2.flowing || (u("resume"), e2.flowing = !e2.readableListening, function(e3, t2) {
                t2.resumeScheduled || (t2.resumeScheduled = true, r2.nextTick(L, e3, t2));
              }(this, e2)), e2.paused = false, this;
            }, C.prototype.pause = function() {
              return u("call pause flowing=%j", this._readableState.flowing), false !== this._readableState.flowing && (u("pause"), this._readableState.flowing = false, this.emit("pause")), this._readableState.paused = true, this;
            }, C.prototype.wrap = function(e2) {
              var t2 = this, r3 = this._readableState, n2 = false;
              for (var i2 in e2.on("end", function() {
                if (u("wrapped end"), r3.decoder && !r3.ended) {
                  var e3 = r3.decoder.end();
                  e3 && e3.length && t2.push(e3);
                }
                t2.push(null);
              }), e2.on("data", function(i3) {
                (u("wrapped data"), r3.decoder && (i3 = r3.decoder.write(i3)), !r3.objectMode || null !== i3 && void 0 !== i3) && ((r3.objectMode || i3 && i3.length) && (t2.push(i3) || (n2 = true, e2.pause())));
              }), e2)
                void 0 === this[i2] && "function" == typeof e2[i2] && (this[i2] = /* @__PURE__ */ function(t3) {
                  return function() {
                    return e2[t3].apply(e2, arguments);
                  };
                }(i2));
              for (var o2 = 0; o2 < S.length; o2++)
                e2.on(S[o2], this.emit.bind(this, S[o2]));
              return this._read = function(t3) {
                u("wrapped _read", t3), n2 && (n2 = false, e2.resume());
              }, this;
            }, "function" == typeof Symbol && (C.prototype[Symbol.asyncIterator] = function() {
              return void 0 === f && (f = e("./internal/streams/async_iterator")), f(this);
            }), Object.defineProperty(C.prototype, "readableHighWaterMark", { enumerable: false, get: function() {
              return this._readableState.highWaterMark;
            } }), Object.defineProperty(C.prototype, "readableBuffer", { enumerable: false, get: function() {
              return this._readableState && this._readableState.buffer;
            } }), Object.defineProperty(C.prototype, "readableFlowing", { enumerable: false, get: function() {
              return this._readableState.flowing;
            }, set: function(e2) {
              this._readableState && (this._readableState.flowing = e2);
            } }), C._fromList = U, Object.defineProperty(C.prototype, "readableLength", { enumerable: false, get: function() {
              return this._readableState.length;
            } }), "function" == typeof Symbol && (C.from = function(t2, r3) {
              return void 0 === p && (p = e("./internal/streams/from")), p(C, t2, r3);
            });
          }).call(this);
        }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
      }, { "../errors": 55, "./_stream_duplex": 56, "./internal/streams/async_iterator": 61, "./internal/streams/buffer_list": 62, "./internal/streams/destroy": 63, "./internal/streams/from": 65, "./internal/streams/state": 67, "./internal/streams/stream": 68, _process: 50, buffer: 17, events: 22, inherits: 24, "string_decoder/": 75, util: 16 }], 59: [function(e, t, r) {
        "use strict";
        t.exports = u;
        var n = e("../errors").codes, i = n.ERR_METHOD_NOT_IMPLEMENTED, o = n.ERR_MULTIPLE_CALLBACK, s = n.ERR_TRANSFORM_ALREADY_TRANSFORMING, a = n.ERR_TRANSFORM_WITH_LENGTH_0, l = e("./_stream_duplex");
        function u(e2) {
          if (!(this instanceof u))
            return new u(e2);
          l.call(this, e2), this._transformState = { afterTransform: (function(e3, t2) {
            var r2 = this._transformState;
            r2.transforming = false;
            var n2 = r2.writecb;
            if (null === n2)
              return this.emit("error", new o());
            r2.writechunk = null, r2.writecb = null, null != t2 && this.push(t2), n2(e3);
            var i2 = this._readableState;
            i2.reading = false, (i2.needReadable || i2.length < i2.highWaterMark) && this._read(i2.highWaterMark);
          }).bind(this), needTransform: false, transforming: false, writecb: null, writechunk: null, writeencoding: null }, this._readableState.needReadable = true, this._readableState.sync = false, e2 && ("function" == typeof e2.transform && (this._transform = e2.transform), "function" == typeof e2.flush && (this._flush = e2.flush)), this.on("prefinish", c);
        }
        function c() {
          var e2 = this;
          "function" != typeof this._flush || this._readableState.destroyed ? h(this, null, null) : this._flush(function(t2, r2) {
            h(e2, t2, r2);
          });
        }
        function h(e2, t2, r2) {
          if (t2)
            return e2.emit("error", t2);
          if (null != r2 && e2.push(r2), e2._writableState.length)
            throw new a();
          if (e2._transformState.transforming)
            throw new s();
          return e2.push(null);
        }
        e("inherits")(u, l), u.prototype.push = function(e2, t2) {
          return this._transformState.needTransform = false, l.prototype.push.call(this, e2, t2);
        }, u.prototype._transform = function(e2, t2, r2) {
          r2(new i("_transform()"));
        }, u.prototype._write = function(e2, t2, r2) {
          var n2 = this._transformState;
          if (n2.writecb = r2, n2.writechunk = e2, n2.writeencoding = t2, !n2.transforming) {
            var i2 = this._readableState;
            (n2.needTransform || i2.needReadable || i2.length < i2.highWaterMark) && this._read(i2.highWaterMark);
          }
        }, u.prototype._read = function(e2) {
          var t2 = this._transformState;
          null === t2.writechunk || t2.transforming ? t2.needTransform = true : (t2.transforming = true, this._transform(t2.writechunk, t2.writeencoding, t2.afterTransform));
        }, u.prototype._destroy = function(e2, t2) {
          l.prototype._destroy.call(this, e2, function(e3) {
            t2(e3);
          });
        };
      }, { "../errors": 55, "./_stream_duplex": 56, inherits: 24 }], 60: [function(e, t, r) {
        (function(r2, n) {
          (function() {
            "use strict";
            function i(e2) {
              var t2 = this;
              this.next = null, this.entry = null, this.finish = function() {
                !function(e3, t3, r3) {
                  var n2 = e3.entry;
                  e3.entry = null;
                  for (; n2; ) {
                    var i2 = n2.callback;
                    t3.pendingcb--, i2(r3), n2 = n2.next;
                  }
                  t3.corkedRequestsFree.next = e3;
                }(t2, e2);
              };
            }
            var o;
            t.exports = C, C.WritableState = E;
            var s = { deprecate: e("util-deprecate") }, a = e("./internal/streams/stream"), l = e("buffer").Buffer, u = n.Uint8Array || function() {
            };
            var c, h = e("./internal/streams/destroy"), f = e("./internal/streams/state").getHighWaterMark, p = e("../errors").codes, d = p.ERR_INVALID_ARG_TYPE, g = p.ERR_METHOD_NOT_IMPLEMENTED, y = p.ERR_MULTIPLE_CALLBACK, b = p.ERR_STREAM_CANNOT_PIPE, m = p.ERR_STREAM_DESTROYED, v = p.ERR_STREAM_NULL_VALUES, w = p.ERR_STREAM_WRITE_AFTER_END, _ = p.ERR_UNKNOWN_ENCODING, k = h.errorOrDestroy;
            function S() {
            }
            function E(t2, n2, s2) {
              o = o || e("./_stream_duplex"), t2 = t2 || {}, "boolean" != typeof s2 && (s2 = n2 instanceof o), this.objectMode = !!t2.objectMode, s2 && (this.objectMode = this.objectMode || !!t2.writableObjectMode), this.highWaterMark = f(this, t2, "writableHighWaterMark", s2), this.finalCalled = false, this.needDrain = false, this.ending = false, this.ended = false, this.finished = false, this.destroyed = false;
              var a2 = false === t2.decodeStrings;
              this.decodeStrings = !a2, this.defaultEncoding = t2.defaultEncoding || "utf8", this.length = 0, this.writing = false, this.corked = 0, this.sync = true, this.bufferProcessing = false, this.onwrite = function(e2) {
                !function(e3, t3) {
                  var n3 = e3._writableState, i2 = n3.sync, o2 = n3.writecb;
                  if ("function" != typeof o2)
                    throw new y();
                  if (function(e4) {
                    e4.writing = false, e4.writecb = null, e4.length -= e4.writelen, e4.writelen = 0;
                  }(n3), t3)
                    !function(e4, t4, n4, i3, o3) {
                      --t4.pendingcb, n4 ? (r2.nextTick(o3, i3), r2.nextTick(O, e4, t4), e4._writableState.errorEmitted = true, k(e4, i3)) : (o3(i3), e4._writableState.errorEmitted = true, k(e4, i3), O(e4, t4));
                    }(e3, n3, i2, t3, o2);
                  else {
                    var s3 = I(n3) || e3.destroyed;
                    s3 || n3.corked || n3.bufferProcessing || !n3.bufferedRequest || A(e3, n3), i2 ? r2.nextTick(x, e3, n3, s3, o2) : x(e3, n3, s3, o2);
                  }
                }(n2, e2);
              }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = false, this.errorEmitted = false, this.emitClose = false !== t2.emitClose, this.autoDestroy = !!t2.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new i(this);
            }
            function C(t2) {
              var r3 = this instanceof (o = o || e("./_stream_duplex"));
              if (!r3 && !c.call(C, this))
                return new C(t2);
              this._writableState = new E(t2, this, r3), this.writable = true, t2 && ("function" == typeof t2.write && (this._write = t2.write), "function" == typeof t2.writev && (this._writev = t2.writev), "function" == typeof t2.destroy && (this._destroy = t2.destroy), "function" == typeof t2.final && (this._final = t2.final)), a.call(this);
            }
            function T(e2, t2, r3, n2, i2, o2, s2) {
              t2.writelen = n2, t2.writecb = s2, t2.writing = true, t2.sync = true, t2.destroyed ? t2.onwrite(new m("write")) : r3 ? e2._writev(i2, t2.onwrite) : e2._write(i2, o2, t2.onwrite), t2.sync = false;
            }
            function x(e2, t2, r3, n2) {
              r3 || function(e3, t3) {
                0 === t3.length && t3.needDrain && (t3.needDrain = false, e3.emit("drain"));
              }(e2, t2), t2.pendingcb--, n2(), O(e2, t2);
            }
            function A(e2, t2) {
              t2.bufferProcessing = true;
              var r3 = t2.bufferedRequest;
              if (e2._writev && r3 && r3.next) {
                var n2 = t2.bufferedRequestCount, o2 = new Array(n2), s2 = t2.corkedRequestsFree;
                s2.entry = r3;
                for (var a2 = 0, l2 = true; r3; )
                  o2[a2] = r3, r3.isBuf || (l2 = false), r3 = r3.next, a2 += 1;
                o2.allBuffers = l2, T(e2, t2, true, t2.length, o2, "", s2.finish), t2.pendingcb++, t2.lastBufferedRequest = null, s2.next ? (t2.corkedRequestsFree = s2.next, s2.next = null) : t2.corkedRequestsFree = new i(t2), t2.bufferedRequestCount = 0;
              } else {
                for (; r3; ) {
                  var u2 = r3.chunk, c2 = r3.encoding, h2 = r3.callback;
                  if (T(e2, t2, false, t2.objectMode ? 1 : u2.length, u2, c2, h2), r3 = r3.next, t2.bufferedRequestCount--, t2.writing)
                    break;
                }
                null === r3 && (t2.lastBufferedRequest = null);
              }
              t2.bufferedRequest = r3, t2.bufferProcessing = false;
            }
            function I(e2) {
              return e2.ending && 0 === e2.length && null === e2.bufferedRequest && !e2.finished && !e2.writing;
            }
            function P(e2, t2) {
              e2._final(function(r3) {
                t2.pendingcb--, r3 && k(e2, r3), t2.prefinished = true, e2.emit("prefinish"), O(e2, t2);
              });
            }
            function O(e2, t2) {
              var n2 = I(t2);
              if (n2 && (function(e3, t3) {
                t3.prefinished || t3.finalCalled || ("function" != typeof e3._final || t3.destroyed ? (t3.prefinished = true, e3.emit("prefinish")) : (t3.pendingcb++, t3.finalCalled = true, r2.nextTick(P, e3, t3)));
              }(e2, t2), 0 === t2.pendingcb && (t2.finished = true, e2.emit("finish"), t2.autoDestroy))) {
                var i2 = e2._readableState;
                (!i2 || i2.autoDestroy && i2.endEmitted) && e2.destroy();
              }
              return n2;
            }
            e("inherits")(C, a), E.prototype.getBuffer = function() {
              for (var e2 = this.bufferedRequest, t2 = []; e2; )
                t2.push(e2), e2 = e2.next;
              return t2;
            }, function() {
              try {
                Object.defineProperty(E.prototype, "buffer", { get: s.deprecate(function() {
                  return this.getBuffer();
                }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
              } catch (e2) {
              }
            }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (c = Function.prototype[Symbol.hasInstance], Object.defineProperty(C, Symbol.hasInstance, { value: function(e2) {
              return !!c.call(this, e2) || this === C && (e2 && e2._writableState instanceof E);
            } })) : c = function(e2) {
              return e2 instanceof this;
            }, C.prototype.pipe = function() {
              k(this, new b());
            }, C.prototype.write = function(e2, t2, n2) {
              var i2, o2 = this._writableState, s2 = false, a2 = !o2.objectMode && (i2 = e2, l.isBuffer(i2) || i2 instanceof u);
              return a2 && !l.isBuffer(e2) && (e2 = function(e3) {
                return l.from(e3);
              }(e2)), "function" == typeof t2 && (n2 = t2, t2 = null), a2 ? t2 = "buffer" : t2 || (t2 = o2.defaultEncoding), "function" != typeof n2 && (n2 = S), o2.ending ? function(e3, t3) {
                var n3 = new w();
                k(e3, n3), r2.nextTick(t3, n3);
              }(this, n2) : (a2 || function(e3, t3, n3, i3) {
                var o3;
                return null === n3 ? o3 = new v() : "string" == typeof n3 || t3.objectMode || (o3 = new d("chunk", ["string", "Buffer"], n3)), !o3 || (k(e3, o3), r2.nextTick(i3, o3), false);
              }(this, o2, e2, n2)) && (o2.pendingcb++, s2 = function(e3, t3, r3, n3, i3, o3) {
                if (!r3) {
                  var s3 = function(e4, t4, r4) {
                    e4.objectMode || false === e4.decodeStrings || "string" != typeof t4 || (t4 = l.from(t4, r4));
                    return t4;
                  }(t3, n3, i3);
                  n3 !== s3 && (r3 = true, i3 = "buffer", n3 = s3);
                }
                var a3 = t3.objectMode ? 1 : n3.length;
                t3.length += a3;
                var u2 = t3.length < t3.highWaterMark;
                u2 || (t3.needDrain = true);
                if (t3.writing || t3.corked) {
                  var c2 = t3.lastBufferedRequest;
                  t3.lastBufferedRequest = { chunk: n3, encoding: i3, isBuf: r3, callback: o3, next: null }, c2 ? c2.next = t3.lastBufferedRequest : t3.bufferedRequest = t3.lastBufferedRequest, t3.bufferedRequestCount += 1;
                } else
                  T(e3, t3, false, a3, n3, i3, o3);
                return u2;
              }(this, o2, a2, e2, t2, n2)), s2;
            }, C.prototype.cork = function() {
              this._writableState.corked++;
            }, C.prototype.uncork = function() {
              var e2 = this._writableState;
              e2.corked && (e2.corked--, e2.writing || e2.corked || e2.bufferProcessing || !e2.bufferedRequest || A(this, e2));
            }, C.prototype.setDefaultEncoding = function(e2) {
              if ("string" == typeof e2 && (e2 = e2.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e2 + "").toLowerCase()) > -1))
                throw new _(e2);
              return this._writableState.defaultEncoding = e2, this;
            }, Object.defineProperty(C.prototype, "writableBuffer", { enumerable: false, get: function() {
              return this._writableState && this._writableState.getBuffer();
            } }), Object.defineProperty(C.prototype, "writableHighWaterMark", { enumerable: false, get: function() {
              return this._writableState.highWaterMark;
            } }), C.prototype._write = function(e2, t2, r3) {
              r3(new g("_write()"));
            }, C.prototype._writev = null, C.prototype.end = function(e2, t2, n2) {
              var i2 = this._writableState;
              return "function" == typeof e2 ? (n2 = e2, e2 = null, t2 = null) : "function" == typeof t2 && (n2 = t2, t2 = null), null !== e2 && void 0 !== e2 && this.write(e2, t2), i2.corked && (i2.corked = 1, this.uncork()), i2.ending || function(e3, t3, n3) {
                t3.ending = true, O(e3, t3), n3 && (t3.finished ? r2.nextTick(n3) : e3.once("finish", n3));
                t3.ended = true, e3.writable = false;
              }(this, i2, n2), this;
            }, Object.defineProperty(C.prototype, "writableLength", { enumerable: false, get: function() {
              return this._writableState.length;
            } }), Object.defineProperty(C.prototype, "destroyed", { enumerable: false, get: function() {
              return void 0 !== this._writableState && this._writableState.destroyed;
            }, set: function(e2) {
              this._writableState && (this._writableState.destroyed = e2);
            } }), C.prototype.destroy = h.destroy, C.prototype._undestroy = h.undestroy, C.prototype._destroy = function(e2, t2) {
              t2(e2);
            };
          }).call(this);
        }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
      }, { "../errors": 55, "./_stream_duplex": 56, "./internal/streams/destroy": 63, "./internal/streams/state": 67, "./internal/streams/stream": 68, _process: 50, buffer: 17, inherits: 24, "util-deprecate": 78 }], 61: [function(e, t, r) {
        (function(r2) {
          (function() {
            "use strict";
            var n;
            function i(e2, t2, r3) {
              return t2 in e2 ? Object.defineProperty(e2, t2, { value: r3, enumerable: true, configurable: true, writable: true }) : e2[t2] = r3, e2;
            }
            var o = e("./end-of-stream"), s = Symbol("lastResolve"), a = Symbol("lastReject"), l = Symbol("error"), u = Symbol("ended"), c = Symbol("lastPromise"), h = Symbol("handlePromise"), f = Symbol("stream");
            function p(e2, t2) {
              return { value: e2, done: t2 };
            }
            function d(e2) {
              var t2 = e2[s];
              if (null !== t2) {
                var r3 = e2[f].read();
                null !== r3 && (e2[c] = null, e2[s] = null, e2[a] = null, t2(p(r3, false)));
              }
            }
            var g = Object.getPrototypeOf(function() {
            }), y = Object.setPrototypeOf((i(n = { get stream() {
              return this[f];
            }, next: function() {
              var e2 = this, t2 = this[l];
              if (null !== t2)
                return Promise.reject(t2);
              if (this[u])
                return Promise.resolve(p(void 0, true));
              if (this[f].destroyed)
                return new Promise(function(t3, n3) {
                  r2.nextTick(function() {
                    e2[l] ? n3(e2[l]) : t3(p(void 0, true));
                  });
                });
              var n2, i2 = this[c];
              if (i2)
                n2 = new Promise(/* @__PURE__ */ function(e3, t3) {
                  return function(r3, n3) {
                    e3.then(function() {
                      t3[u] ? r3(p(void 0, true)) : t3[h](r3, n3);
                    }, n3);
                  };
                }(i2, this));
              else {
                var o2 = this[f].read();
                if (null !== o2)
                  return Promise.resolve(p(o2, false));
                n2 = new Promise(this[h]);
              }
              return this[c] = n2, n2;
            } }, Symbol.asyncIterator, function() {
              return this;
            }), i(n, "return", function() {
              var e2 = this;
              return new Promise(function(t2, r3) {
                e2[f].destroy(null, function(e3) {
                  e3 ? r3(e3) : t2(p(void 0, true));
                });
              });
            }), n), g);
            t.exports = function(e2) {
              var t2, n2 = Object.create(y, (i(t2 = {}, f, { value: e2, writable: true }), i(t2, s, { value: null, writable: true }), i(t2, a, { value: null, writable: true }), i(t2, l, { value: null, writable: true }), i(t2, u, { value: e2._readableState.endEmitted, writable: true }), i(t2, h, { value: function(e3, t3) {
                var r3 = n2[f].read();
                r3 ? (n2[c] = null, n2[s] = null, n2[a] = null, e3(p(r3, false))) : (n2[s] = e3, n2[a] = t3);
              }, writable: true }), t2));
              return n2[c] = null, o(e2, function(e3) {
                if (e3 && "ERR_STREAM_PREMATURE_CLOSE" !== e3.code) {
                  var t3 = n2[a];
                  return null !== t3 && (n2[c] = null, n2[s] = null, n2[a] = null, t3(e3)), void (n2[l] = e3);
                }
                var r3 = n2[s];
                null !== r3 && (n2[c] = null, n2[s] = null, n2[a] = null, r3(p(void 0, true))), n2[u] = true;
              }), e2.on("readable", (function(e3) {
                r2.nextTick(d, e3);
              }).bind(null, n2)), n2;
            };
          }).call(this);
        }).call(this, e("_process"));
      }, { "./end-of-stream": 64, _process: 50 }], 62: [function(e, t, r) {
        "use strict";
        function n(e2, t2) {
          var r2 = Object.keys(e2);
          if (Object.getOwnPropertySymbols) {
            var n2 = Object.getOwnPropertySymbols(e2);
            t2 && (n2 = n2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
            })), r2.push.apply(r2, n2);
          }
          return r2;
        }
        function i(e2, t2, r2) {
          return t2 in e2 ? Object.defineProperty(e2, t2, { value: r2, enumerable: true, configurable: true, writable: true }) : e2[t2] = r2, e2;
        }
        function o(e2, t2) {
          for (var r2 = 0; r2 < t2.length; r2++) {
            var n2 = t2[r2];
            n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e2, n2.key, n2);
          }
        }
        var s = e("buffer").Buffer, a = e("util").inspect, l = a && a.custom || "inspect";
        t.exports = function() {
          function e2() {
            !function(e3, t3) {
              if (!(e3 instanceof t3))
                throw new TypeError("Cannot call a class as a function");
            }(this, e2), this.head = null, this.tail = null, this.length = 0;
          }
          var t2, r2, u;
          return t2 = e2, (r2 = [{ key: "push", value: function(e3) {
            var t3 = { data: e3, next: null };
            this.length > 0 ? this.tail.next = t3 : this.head = t3, this.tail = t3, ++this.length;
          } }, { key: "unshift", value: function(e3) {
            var t3 = { data: e3, next: this.head };
            0 === this.length && (this.tail = t3), this.head = t3, ++this.length;
          } }, { key: "shift", value: function() {
            if (0 !== this.length) {
              var e3 = this.head.data;
              return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, e3;
            }
          } }, { key: "clear", value: function() {
            this.head = this.tail = null, this.length = 0;
          } }, { key: "join", value: function(e3) {
            if (0 === this.length)
              return "";
            for (var t3 = this.head, r3 = "" + t3.data; t3 = t3.next; )
              r3 += e3 + t3.data;
            return r3;
          } }, { key: "concat", value: function(e3) {
            if (0 === this.length)
              return s.alloc(0);
            for (var t3, r3, n2, i2 = s.allocUnsafe(e3 >>> 0), o2 = this.head, a2 = 0; o2; )
              t3 = o2.data, r3 = i2, n2 = a2, s.prototype.copy.call(t3, r3, n2), a2 += o2.data.length, o2 = o2.next;
            return i2;
          } }, { key: "consume", value: function(e3, t3) {
            var r3;
            return e3 < this.head.data.length ? (r3 = this.head.data.slice(0, e3), this.head.data = this.head.data.slice(e3)) : r3 = e3 === this.head.data.length ? this.shift() : t3 ? this._getString(e3) : this._getBuffer(e3), r3;
          } }, { key: "first", value: function() {
            return this.head.data;
          } }, { key: "_getString", value: function(e3) {
            var t3 = this.head, r3 = 1, n2 = t3.data;
            for (e3 -= n2.length; t3 = t3.next; ) {
              var i2 = t3.data, o2 = e3 > i2.length ? i2.length : e3;
              if (o2 === i2.length ? n2 += i2 : n2 += i2.slice(0, e3), 0 === (e3 -= o2)) {
                o2 === i2.length ? (++r3, t3.next ? this.head = t3.next : this.head = this.tail = null) : (this.head = t3, t3.data = i2.slice(o2));
                break;
              }
              ++r3;
            }
            return this.length -= r3, n2;
          } }, { key: "_getBuffer", value: function(e3) {
            var t3 = s.allocUnsafe(e3), r3 = this.head, n2 = 1;
            for (r3.data.copy(t3), e3 -= r3.data.length; r3 = r3.next; ) {
              var i2 = r3.data, o2 = e3 > i2.length ? i2.length : e3;
              if (i2.copy(t3, t3.length - e3, 0, o2), 0 === (e3 -= o2)) {
                o2 === i2.length ? (++n2, r3.next ? this.head = r3.next : this.head = this.tail = null) : (this.head = r3, r3.data = i2.slice(o2));
                break;
              }
              ++n2;
            }
            return this.length -= n2, t3;
          } }, { key: l, value: function(e3, t3) {
            return a(this, function(e4) {
              for (var t4 = 1; t4 < arguments.length; t4++) {
                var r3 = null != arguments[t4] ? arguments[t4] : {};
                t4 % 2 ? n(Object(r3), true).forEach(function(t5) {
                  i(e4, t5, r3[t5]);
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(r3)) : n(Object(r3)).forEach(function(t5) {
                  Object.defineProperty(e4, t5, Object.getOwnPropertyDescriptor(r3, t5));
                });
              }
              return e4;
            }({}, t3, { depth: 0, customInspect: false }));
          } }]) && o(t2.prototype, r2), u && o(t2, u), e2;
        }();
      }, { buffer: 17, util: 16 }], 63: [function(e, t, r) {
        (function(e2) {
          (function() {
            "use strict";
            function r2(e3, t2) {
              i(e3, t2), n(e3);
            }
            function n(e3) {
              e3._writableState && !e3._writableState.emitClose || e3._readableState && !e3._readableState.emitClose || e3.emit("close");
            }
            function i(e3, t2) {
              e3.emit("error", t2);
            }
            t.exports = { destroy: function(t2, o) {
              var s = this, a = this._readableState && this._readableState.destroyed, l = this._writableState && this._writableState.destroyed;
              return a || l ? (o ? o(t2) : t2 && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = true, e2.nextTick(i, this, t2)) : e2.nextTick(i, this, t2)), this) : (this._readableState && (this._readableState.destroyed = true), this._writableState && (this._writableState.destroyed = true), this._destroy(t2 || null, function(t3) {
                !o && t3 ? s._writableState ? s._writableState.errorEmitted ? e2.nextTick(n, s) : (s._writableState.errorEmitted = true, e2.nextTick(r2, s, t3)) : e2.nextTick(r2, s, t3) : o ? (e2.nextTick(n, s), o(t3)) : e2.nextTick(n, s);
              }), this);
            }, undestroy: function() {
              this._readableState && (this._readableState.destroyed = false, this._readableState.reading = false, this._readableState.ended = false, this._readableState.endEmitted = false), this._writableState && (this._writableState.destroyed = false, this._writableState.ended = false, this._writableState.ending = false, this._writableState.finalCalled = false, this._writableState.prefinished = false, this._writableState.finished = false, this._writableState.errorEmitted = false);
            }, errorOrDestroy: function(e3, t2) {
              var r3 = e3._readableState, n2 = e3._writableState;
              r3 && r3.autoDestroy || n2 && n2.autoDestroy ? e3.destroy(t2) : e3.emit("error", t2);
            } };
          }).call(this);
        }).call(this, e("_process"));
      }, { _process: 50 }], 64: [function(e, t, r) {
        "use strict";
        var n = e("../../../errors").codes.ERR_STREAM_PREMATURE_CLOSE;
        function i() {
        }
        t.exports = function e2(t2, r2, o) {
          if ("function" == typeof r2)
            return e2(t2, null, r2);
          r2 || (r2 = {}), o = /* @__PURE__ */ function(e3) {
            var t3 = false;
            return function() {
              if (!t3) {
                t3 = true;
                for (var r3 = arguments.length, n2 = new Array(r3), i2 = 0; i2 < r3; i2++)
                  n2[i2] = arguments[i2];
                e3.apply(this, n2);
              }
            };
          }(o || i);
          var s = r2.readable || false !== r2.readable && t2.readable, a = r2.writable || false !== r2.writable && t2.writable, l = function() {
            t2.writable || c();
          }, u = t2._writableState && t2._writableState.finished, c = function() {
            a = false, u = true, s || o.call(t2);
          }, h = t2._readableState && t2._readableState.endEmitted, f = function() {
            s = false, h = true, a || o.call(t2);
          }, p = function(e3) {
            o.call(t2, e3);
          }, d = function() {
            var e3;
            return s && !h ? (t2._readableState && t2._readableState.ended || (e3 = new n()), o.call(t2, e3)) : a && !u ? (t2._writableState && t2._writableState.ended || (e3 = new n()), o.call(t2, e3)) : void 0;
          }, g = function() {
            t2.req.on("finish", c);
          };
          return function(e3) {
            return e3.setHeader && "function" == typeof e3.abort;
          }(t2) ? (t2.on("complete", c), t2.on("abort", d), t2.req ? g() : t2.on("request", g)) : a && !t2._writableState && (t2.on("end", l), t2.on("close", l)), t2.on("end", f), t2.on("finish", c), false !== r2.error && t2.on("error", p), t2.on("close", d), function() {
            t2.removeListener("complete", c), t2.removeListener("abort", d), t2.removeListener("request", g), t2.req && t2.req.removeListener("finish", c), t2.removeListener("end", l), t2.removeListener("close", l), t2.removeListener("finish", c), t2.removeListener("end", f), t2.removeListener("error", p), t2.removeListener("close", d);
          };
        };
      }, { "../../../errors": 55 }], 65: [function(e, t, r) {
        t.exports = function() {
          throw new Error("Readable.from is not available in the browser");
        };
      }, {}], 66: [function(e, t, r) {
        "use strict";
        var n;
        var i = e("../../../errors").codes, o = i.ERR_MISSING_ARGS, s = i.ERR_STREAM_DESTROYED;
        function a(e2) {
          if (e2)
            throw e2;
        }
        function l(e2) {
          e2();
        }
        function u(e2, t2) {
          return e2.pipe(t2);
        }
        t.exports = function() {
          for (var t2 = arguments.length, r2 = new Array(t2), i2 = 0; i2 < t2; i2++)
            r2[i2] = arguments[i2];
          var c, h = function(e2) {
            return e2.length ? "function" != typeof e2[e2.length - 1] ? a : e2.pop() : a;
          }(r2);
          if (Array.isArray(r2[0]) && (r2 = r2[0]), r2.length < 2)
            throw new o("streams");
          var f = r2.map(function(t3, i3) {
            var o2 = i3 < r2.length - 1;
            return function(t4, r3, i4, o3) {
              o3 = /* @__PURE__ */ function(e2) {
                var t5 = false;
                return function() {
                  t5 || (t5 = true, e2.apply(void 0, arguments));
                };
              }(o3);
              var a2 = false;
              t4.on("close", function() {
                a2 = true;
              }), void 0 === n && (n = e("./end-of-stream")), n(t4, { readable: r3, writable: i4 }, function(e2) {
                if (e2)
                  return o3(e2);
                a2 = true, o3();
              });
              var l2 = false;
              return function(e2) {
                if (!a2 && !l2)
                  return l2 = true, function(e3) {
                    return e3.setHeader && "function" == typeof e3.abort;
                  }(t4) ? t4.abort() : "function" == typeof t4.destroy ? t4.destroy() : void o3(e2 || new s("pipe"));
              };
            }(t3, o2, i3 > 0, function(e2) {
              c || (c = e2), e2 && f.forEach(l), o2 || (f.forEach(l), h(c));
            });
          });
          return r2.reduce(u);
        };
      }, { "../../../errors": 55, "./end-of-stream": 64 }], 67: [function(e, t, r) {
        "use strict";
        var n = e("../../../errors").codes.ERR_INVALID_OPT_VALUE;
        t.exports = { getHighWaterMark: function(e2, t2, r2, i) {
          var o = function(e3, t3, r3) {
            return null != e3.highWaterMark ? e3.highWaterMark : t3 ? e3[r3] : null;
          }(t2, i, r2);
          if (null != o) {
            if (!isFinite(o) || Math.floor(o) !== o || o < 0)
              throw new n(i ? r2 : "highWaterMark", o);
            return Math.floor(o);
          }
          return e2.objectMode ? 16 : 16384;
        } };
      }, { "../../../errors": 55 }], 68: [function(e, t, r) {
        t.exports = e("events").EventEmitter;
      }, { events: 22 }], 69: [function(e, t, r) {
        (r = t.exports = e("./lib/_stream_readable.js")).Stream = r, r.Readable = r, r.Writable = e("./lib/_stream_writable.js"), r.Duplex = e("./lib/_stream_duplex.js"), r.Transform = e("./lib/_stream_transform.js"), r.PassThrough = e("./lib/_stream_passthrough.js"), r.finished = e("./lib/internal/streams/end-of-stream.js"), r.pipeline = e("./lib/internal/streams/pipeline.js");
      }, { "./lib/_stream_duplex.js": 56, "./lib/_stream_passthrough.js": 57, "./lib/_stream_readable.js": 58, "./lib/_stream_transform.js": 59, "./lib/_stream_writable.js": 60, "./lib/internal/streams/end-of-stream.js": 64, "./lib/internal/streams/pipeline.js": 66 }], 70: [function(e, t, r) {
        "use strict";
        t.exports = function() {
          if ("function" != typeof arguments[0])
            throw new Error("callback needed");
          if ("number" != typeof arguments[1])
            throw new Error("interval needed");
          var e2;
          if (arguments.length > 0) {
            e2 = new Array(arguments.length - 2);
            for (var t2 = 0; t2 < e2.length; t2++)
              e2[t2] = arguments[t2 + 2];
          }
          return new function(e3, t3, r2) {
            var n = this;
            this._callback = e3, this._args = r2, this._interval = setInterval(e3, t3, this._args), this.reschedule = function(e4) {
              e4 || (e4 = n._interval), n._interval && clearInterval(n._interval), n._interval = setInterval(n._callback, e4, n._args);
            }, this.clear = function() {
              n._interval && (clearInterval(n._interval), n._interval = void 0);
            }, this.destroy = function() {
              n._interval && clearInterval(n._interval), n._callback = void 0, n._interval = void 0, n._args = void 0;
            };
          }(arguments[0], arguments[1], e2);
        };
      }, {}], 71: [function(e, t, r) {
        "use strict";
        t.exports = e("./index.js")();
      }, { "./index.js": 72 }], 72: [function(e, t, r) {
        (function(e2) {
          (function() {
            "use strict";
            function r2(t2) {
              return t2 instanceof e2 ? e2.from(t2) : new t2.constructor(t2.buffer.slice(), t2.byteOffset, t2.length);
            }
            t.exports = function(e3) {
              return (e3 = e3 || {}).circles ? function(e4) {
                var t3 = [], n = [];
                return e4.proto ? function e5(o) {
                  if ("object" != typeof o || null === o)
                    return o;
                  if (o instanceof Date)
                    return new Date(o);
                  if (Array.isArray(o))
                    return i(o, e5);
                  if (o instanceof Map)
                    return new Map(i(Array.from(o), e5));
                  if (o instanceof Set)
                    return new Set(i(Array.from(o), e5));
                  var s = {};
                  for (var a in t3.push(o), n.push(s), o) {
                    var l = o[a];
                    if ("object" != typeof l || null === l)
                      s[a] = l;
                    else if (l instanceof Date)
                      s[a] = new Date(l);
                    else if (l instanceof Map)
                      s[a] = new Map(i(Array.from(l), e5));
                    else if (l instanceof Set)
                      s[a] = new Set(i(Array.from(l), e5));
                    else if (ArrayBuffer.isView(l))
                      s[a] = r2(l);
                    else {
                      var u = t3.indexOf(l);
                      s[a] = -1 !== u ? n[u] : e5(l);
                    }
                  }
                  return t3.pop(), n.pop(), s;
                } : function e5(o) {
                  if ("object" != typeof o || null === o)
                    return o;
                  if (o instanceof Date)
                    return new Date(o);
                  if (Array.isArray(o))
                    return i(o, e5);
                  if (o instanceof Map)
                    return new Map(i(Array.from(o), e5));
                  if (o instanceof Set)
                    return new Set(i(Array.from(o), e5));
                  var s = {};
                  for (var a in t3.push(o), n.push(s), o)
                    if (false !== Object.hasOwnProperty.call(o, a)) {
                      var l = o[a];
                      if ("object" != typeof l || null === l)
                        s[a] = l;
                      else if (l instanceof Date)
                        s[a] = new Date(l);
                      else if (l instanceof Map)
                        s[a] = new Map(i(Array.from(l), e5));
                      else if (l instanceof Set)
                        s[a] = new Set(i(Array.from(l), e5));
                      else if (ArrayBuffer.isView(l))
                        s[a] = r2(l);
                      else {
                        var u = t3.indexOf(l);
                        s[a] = -1 !== u ? n[u] : e5(l);
                      }
                    }
                  return t3.pop(), n.pop(), s;
                };
                function i(e5, i2) {
                  for (var o = Object.keys(e5), s = new Array(o.length), a = 0; a < o.length; a++) {
                    var l = o[a], u = e5[l];
                    if ("object" != typeof u || null === u)
                      s[l] = u;
                    else if (u instanceof Date)
                      s[l] = new Date(u);
                    else if (ArrayBuffer.isView(u))
                      s[l] = r2(u);
                    else {
                      var c = t3.indexOf(u);
                      s[l] = -1 !== c ? n[c] : i2(u);
                    }
                  }
                  return s;
                }
              }(e3) : e3.proto ? function e4(n) {
                if ("object" != typeof n || null === n)
                  return n;
                if (n instanceof Date)
                  return new Date(n);
                if (Array.isArray(n))
                  return t2(n, e4);
                if (n instanceof Map)
                  return new Map(t2(Array.from(n), e4));
                if (n instanceof Set)
                  return new Set(t2(Array.from(n), e4));
                var i = {};
                for (var o in n) {
                  var s = n[o];
                  "object" != typeof s || null === s ? i[o] = s : s instanceof Date ? i[o] = new Date(s) : s instanceof Map ? i[o] = new Map(t2(Array.from(s), e4)) : s instanceof Set ? i[o] = new Set(t2(Array.from(s), e4)) : ArrayBuffer.isView(s) ? i[o] = r2(s) : i[o] = e4(s);
                }
                return i;
              } : function e4(n) {
                if ("object" != typeof n || null === n)
                  return n;
                if (n instanceof Date)
                  return new Date(n);
                if (Array.isArray(n))
                  return t2(n, e4);
                if (n instanceof Map)
                  return new Map(t2(Array.from(n), e4));
                if (n instanceof Set)
                  return new Set(t2(Array.from(n), e4));
                var i = {};
                for (var o in n)
                  if (false !== Object.hasOwnProperty.call(n, o)) {
                    var s = n[o];
                    "object" != typeof s || null === s ? i[o] = s : s instanceof Date ? i[o] = new Date(s) : s instanceof Map ? i[o] = new Map(t2(Array.from(s), e4)) : s instanceof Set ? i[o] = new Set(t2(Array.from(s), e4)) : ArrayBuffer.isView(s) ? i[o] = r2(s) : i[o] = e4(s);
                  }
                return i;
              };
              function t2(e4, t3) {
                for (var n = Object.keys(e4), i = new Array(n.length), o = 0; o < n.length; o++) {
                  var s = n[o], a = e4[s];
                  "object" != typeof a || null === a ? i[s] = a : a instanceof Date ? i[s] = new Date(a) : ArrayBuffer.isView(a) ? i[s] = r2(a) : i[s] = t3(a);
                }
                return i;
              }
            };
          }).call(this);
        }).call(this, e("buffer").Buffer);
      }, { buffer: 17 }], 73: [function(e, t, r) {
        var n = e("buffer"), i = n.Buffer;
        function o(e2, t2) {
          for (var r2 in e2)
            t2[r2] = e2[r2];
        }
        function s(e2, t2, r2) {
          return i(e2, t2, r2);
        }
        i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = n : (o(n, r), r.Buffer = s), s.prototype = Object.create(i.prototype), o(i, s), s.from = function(e2, t2, r2) {
          if ("number" == typeof e2)
            throw new TypeError("Argument must not be a number");
          return i(e2, t2, r2);
        }, s.alloc = function(e2, t2, r2) {
          if ("number" != typeof e2)
            throw new TypeError("Argument must be a number");
          var n2 = i(e2);
          return void 0 !== t2 ? "string" == typeof r2 ? n2.fill(t2, r2) : n2.fill(t2) : n2.fill(0), n2;
        }, s.allocUnsafe = function(e2) {
          if ("number" != typeof e2)
            throw new TypeError("Argument must be a number");
          return i(e2);
        }, s.allocUnsafeSlow = function(e2) {
          if ("number" != typeof e2)
            throw new TypeError("Argument must be a number");
          return n.SlowBuffer(e2);
        };
      }, { buffer: 17 }], 74: [function(e, t, r) {
        t.exports = function(e2) {
          var t2 = e2._readableState;
          return t2 ? t2.objectMode || "number" == typeof e2._duplexState ? e2.read() : e2.read((r2 = t2, r2.buffer.length ? r2.buffer.head ? r2.buffer.head.data.length : r2.buffer[0].length : r2.length)) : null;
          var r2;
        };
      }, {}], 75: [function(e, t, r) {
        "use strict";
        var n = e("safe-buffer").Buffer, i = n.isEncoding || function(e2) {
          switch ((e2 = "" + e2) && e2.toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
            case "raw":
              return true;
            default:
              return false;
          }
        };
        function o(e2) {
          var t2;
          switch (this.encoding = function(e3) {
            var t3 = function(e4) {
              if (!e4)
                return "utf8";
              for (var t4; ; )
                switch (e4) {
                  case "utf8":
                  case "utf-8":
                    return "utf8";
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return "utf16le";
                  case "latin1":
                  case "binary":
                    return "latin1";
                  case "base64":
                  case "ascii":
                  case "hex":
                    return e4;
                  default:
                    if (t4)
                      return;
                    e4 = ("" + e4).toLowerCase(), t4 = true;
                }
            }(e3);
            if ("string" != typeof t3 && (n.isEncoding === i || !i(e3)))
              throw new Error("Unknown encoding: " + e3);
            return t3 || e3;
          }(e2), this.encoding) {
            case "utf16le":
              this.text = l, this.end = u, t2 = 4;
              break;
            case "utf8":
              this.fillLast = a, t2 = 4;
              break;
            case "base64":
              this.text = c, this.end = h, t2 = 3;
              break;
            default:
              return this.write = f, void (this.end = p);
          }
          this.lastNeed = 0, this.lastTotal = 0, this.lastChar = n.allocUnsafe(t2);
        }
        function s(e2) {
          return e2 <= 127 ? 0 : e2 >> 5 == 6 ? 2 : e2 >> 4 == 14 ? 3 : e2 >> 3 == 30 ? 4 : e2 >> 6 == 2 ? -1 : -2;
        }
        function a(e2) {
          var t2 = this.lastTotal - this.lastNeed, r2 = function(e3, t3, r3) {
            if (128 != (192 & t3[0]))
              return e3.lastNeed = 0, "�";
            if (e3.lastNeed > 1 && t3.length > 1) {
              if (128 != (192 & t3[1]))
                return e3.lastNeed = 1, "�";
              if (e3.lastNeed > 2 && t3.length > 2 && 128 != (192 & t3[2]))
                return e3.lastNeed = 2, "�";
            }
          }(this, e2);
          return void 0 !== r2 ? r2 : this.lastNeed <= e2.length ? (e2.copy(this.lastChar, t2, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (e2.copy(this.lastChar, t2, 0, e2.length), void (this.lastNeed -= e2.length));
        }
        function l(e2, t2) {
          if ((e2.length - t2) % 2 == 0) {
            var r2 = e2.toString("utf16le", t2);
            if (r2) {
              var n2 = r2.charCodeAt(r2.length - 1);
              if (n2 >= 55296 && n2 <= 56319)
                return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e2[e2.length - 2], this.lastChar[1] = e2[e2.length - 1], r2.slice(0, -1);
            }
            return r2;
          }
          return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e2[e2.length - 1], e2.toString("utf16le", t2, e2.length - 1);
        }
        function u(e2) {
          var t2 = e2 && e2.length ? this.write(e2) : "";
          if (this.lastNeed) {
            var r2 = this.lastTotal - this.lastNeed;
            return t2 + this.lastChar.toString("utf16le", 0, r2);
          }
          return t2;
        }
        function c(e2, t2) {
          var r2 = (e2.length - t2) % 3;
          return 0 === r2 ? e2.toString("base64", t2) : (this.lastNeed = 3 - r2, this.lastTotal = 3, 1 === r2 ? this.lastChar[0] = e2[e2.length - 1] : (this.lastChar[0] = e2[e2.length - 2], this.lastChar[1] = e2[e2.length - 1]), e2.toString("base64", t2, e2.length - r2));
        }
        function h(e2) {
          var t2 = e2 && e2.length ? this.write(e2) : "";
          return this.lastNeed ? t2 + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t2;
        }
        function f(e2) {
          return e2.toString(this.encoding);
        }
        function p(e2) {
          return e2 && e2.length ? this.write(e2) : "";
        }
        r.StringDecoder = o, o.prototype.write = function(e2) {
          if (0 === e2.length)
            return "";
          var t2, r2;
          if (this.lastNeed) {
            if (void 0 === (t2 = this.fillLast(e2)))
              return "";
            r2 = this.lastNeed, this.lastNeed = 0;
          } else
            r2 = 0;
          return r2 < e2.length ? t2 ? t2 + this.text(e2, r2) : this.text(e2, r2) : t2 || "";
        }, o.prototype.end = function(e2) {
          var t2 = e2 && e2.length ? this.write(e2) : "";
          return this.lastNeed ? t2 + "�" : t2;
        }, o.prototype.text = function(e2, t2) {
          var r2 = function(e3, t3, r3) {
            var n3 = t3.length - 1;
            if (n3 < r3)
              return 0;
            var i2 = s(t3[n3]);
            if (i2 >= 0)
              return i2 > 0 && (e3.lastNeed = i2 - 1), i2;
            if (--n3 < r3 || -2 === i2)
              return 0;
            if ((i2 = s(t3[n3])) >= 0)
              return i2 > 0 && (e3.lastNeed = i2 - 2), i2;
            if (--n3 < r3 || -2 === i2)
              return 0;
            if ((i2 = s(t3[n3])) >= 0)
              return i2 > 0 && (2 === i2 ? i2 = 0 : e3.lastNeed = i2 - 3), i2;
            return 0;
          }(this, e2, t2);
          if (!this.lastNeed)
            return e2.toString("utf8", t2);
          this.lastTotal = r2;
          var n2 = e2.length - (r2 - this.lastNeed);
          return e2.copy(this.lastChar, 0, n2), e2.toString("utf8", t2, n2);
        }, o.prototype.fillLast = function(e2) {
          if (this.lastNeed <= e2.length)
            return e2.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
          e2.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e2.length), this.lastNeed -= e2.length;
        };
      }, { "safe-buffer": 73 }], 76: [function(e, t, r) {
        "use strict";
        var n = e("punycode"), i = e("./util");
        function o() {
          this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
        }
        r.parse = v, r.resolve = function(e2, t2) {
          return v(e2, false, true).resolve(t2);
        }, r.resolveObject = function(e2, t2) {
          return e2 ? v(e2, false, true).resolveObject(t2) : t2;
        }, r.format = function(e2) {
          i.isString(e2) && (e2 = v(e2));
          return e2 instanceof o ? e2.format() : o.prototype.format.call(e2);
        }, r.Url = o;
        var s = /^([a-z0-9.+-]+:)/i, a = /:[0-9]*$/, l = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, u = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "	"]), c = ["'"].concat(u), h = ["%", "/", "?", ";", "#"].concat(c), f = ["/", "?", "#"], p = /^[+a-z0-9A-Z_-]{0,63}$/, d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, g = { javascript: true, "javascript:": true }, y = { javascript: true, "javascript:": true }, b = { http: true, https: true, ftp: true, gopher: true, file: true, "http:": true, "https:": true, "ftp:": true, "gopher:": true, "file:": true }, m = e("querystring");
        function v(e2, t2, r2) {
          if (e2 && i.isObject(e2) && e2 instanceof o)
            return e2;
          var n2 = new o();
          return n2.parse(e2, t2, r2), n2;
        }
        o.prototype.parse = function(e2, t2, r2) {
          if (!i.isString(e2))
            throw new TypeError("Parameter 'url' must be a string, not " + typeof e2);
          var o2 = e2.indexOf("?"), a2 = -1 !== o2 && o2 < e2.indexOf("#") ? "?" : "#", u2 = e2.split(a2);
          u2[0] = u2[0].replace(/\\/g, "/");
          var v2 = e2 = u2.join(a2);
          if (v2 = v2.trim(), !r2 && 1 === e2.split("#").length) {
            var w = l.exec(v2);
            if (w)
              return this.path = v2, this.href = v2, this.pathname = w[1], w[2] ? (this.search = w[2], this.query = t2 ? m.parse(this.search.substr(1)) : this.search.substr(1)) : t2 && (this.search = "", this.query = {}), this;
          }
          var _ = s.exec(v2);
          if (_) {
            var k = (_ = _[0]).toLowerCase();
            this.protocol = k, v2 = v2.substr(_.length);
          }
          if (r2 || _ || v2.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var S = "//" === v2.substr(0, 2);
            !S || _ && y[_] || (v2 = v2.substr(2), this.slashes = true);
          }
          if (!y[_] && (S || _ && !b[_])) {
            for (var E, C, T = -1, x = 0; x < f.length; x++) {
              -1 !== (A = v2.indexOf(f[x])) && (-1 === T || A < T) && (T = A);
            }
            -1 !== (C = -1 === T ? v2.lastIndexOf("@") : v2.lastIndexOf("@", T)) && (E = v2.slice(0, C), v2 = v2.slice(C + 1), this.auth = decodeURIComponent(E)), T = -1;
            for (x = 0; x < h.length; x++) {
              var A;
              -1 !== (A = v2.indexOf(h[x])) && (-1 === T || A < T) && (T = A);
            }
            -1 === T && (T = v2.length), this.host = v2.slice(0, T), v2 = v2.slice(T), this.parseHost(), this.hostname = this.hostname || "";
            var I = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
            if (!I)
              for (var P = this.hostname.split(/\./), O = (x = 0, P.length); x < O; x++) {
                var B = P[x];
                if (B && !B.match(p)) {
                  for (var R = "", M = 0, N = B.length; M < N; M++)
                    B.charCodeAt(M) > 127 ? R += "x" : R += B[M];
                  if (!R.match(p)) {
                    var L = P.slice(0, x), j = P.slice(x + 1), U = B.match(d);
                    U && (L.push(U[1]), j.unshift(U[2])), j.length && (v2 = "/" + j.join(".") + v2), this.hostname = L.join(".");
                    break;
                  }
                }
              }
            this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), I || (this.hostname = n.toASCII(this.hostname));
            var q = this.port ? ":" + this.port : "", D = this.hostname || "";
            this.host = D + q, this.href += this.host, I && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== v2[0] && (v2 = "/" + v2));
          }
          if (!g[k])
            for (x = 0, O = c.length; x < O; x++) {
              var z = c[x];
              if (-1 !== v2.indexOf(z)) {
                var F = encodeURIComponent(z);
                F === z && (F = escape(z)), v2 = v2.split(z).join(F);
              }
            }
          var V = v2.indexOf("#");
          -1 !== V && (this.hash = v2.substr(V), v2 = v2.slice(0, V));
          var H = v2.indexOf("?");
          if (-1 !== H ? (this.search = v2.substr(H), this.query = v2.substr(H + 1), t2 && (this.query = m.parse(this.query)), v2 = v2.slice(0, H)) : t2 && (this.search = "", this.query = {}), v2 && (this.pathname = v2), b[k] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
            q = this.pathname || "";
            var W = this.search || "";
            this.path = q + W;
          }
          return this.href = this.format(), this;
        }, o.prototype.format = function() {
          var e2 = this.auth || "";
          e2 && (e2 = (e2 = encodeURIComponent(e2)).replace(/%3A/i, ":"), e2 += "@");
          var t2 = this.protocol || "", r2 = this.pathname || "", n2 = this.hash || "", o2 = false, s2 = "";
          this.host ? o2 = e2 + this.host : this.hostname && (o2 = e2 + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (o2 += ":" + this.port)), this.query && i.isObject(this.query) && Object.keys(this.query).length && (s2 = m.stringify(this.query));
          var a2 = this.search || s2 && "?" + s2 || "";
          return t2 && ":" !== t2.substr(-1) && (t2 += ":"), this.slashes || (!t2 || b[t2]) && false !== o2 ? (o2 = "//" + (o2 || ""), r2 && "/" !== r2.charAt(0) && (r2 = "/" + r2)) : o2 || (o2 = ""), n2 && "#" !== n2.charAt(0) && (n2 = "#" + n2), a2 && "?" !== a2.charAt(0) && (a2 = "?" + a2), t2 + o2 + (r2 = r2.replace(/[?#]/g, function(e3) {
            return encodeURIComponent(e3);
          })) + (a2 = a2.replace("#", "%23")) + n2;
        }, o.prototype.resolve = function(e2) {
          return this.resolveObject(v(e2, false, true)).format();
        }, o.prototype.resolveObject = function(e2) {
          if (i.isString(e2)) {
            var t2 = new o();
            t2.parse(e2, false, true), e2 = t2;
          }
          for (var r2 = new o(), n2 = Object.keys(this), s2 = 0; s2 < n2.length; s2++) {
            var a2 = n2[s2];
            r2[a2] = this[a2];
          }
          if (r2.hash = e2.hash, "" === e2.href)
            return r2.href = r2.format(), r2;
          if (e2.slashes && !e2.protocol) {
            for (var l2 = Object.keys(e2), u2 = 0; u2 < l2.length; u2++) {
              var c2 = l2[u2];
              "protocol" !== c2 && (r2[c2] = e2[c2]);
            }
            return b[r2.protocol] && r2.hostname && !r2.pathname && (r2.path = r2.pathname = "/"), r2.href = r2.format(), r2;
          }
          if (e2.protocol && e2.protocol !== r2.protocol) {
            if (!b[e2.protocol]) {
              for (var h2 = Object.keys(e2), f2 = 0; f2 < h2.length; f2++) {
                var p2 = h2[f2];
                r2[p2] = e2[p2];
              }
              return r2.href = r2.format(), r2;
            }
            if (r2.protocol = e2.protocol, e2.host || y[e2.protocol])
              r2.pathname = e2.pathname;
            else {
              for (var d2 = (e2.pathname || "").split("/"); d2.length && !(e2.host = d2.shift()); )
                ;
              e2.host || (e2.host = ""), e2.hostname || (e2.hostname = ""), "" !== d2[0] && d2.unshift(""), d2.length < 2 && d2.unshift(""), r2.pathname = d2.join("/");
            }
            if (r2.search = e2.search, r2.query = e2.query, r2.host = e2.host || "", r2.auth = e2.auth, r2.hostname = e2.hostname || e2.host, r2.port = e2.port, r2.pathname || r2.search) {
              var g2 = r2.pathname || "", m2 = r2.search || "";
              r2.path = g2 + m2;
            }
            return r2.slashes = r2.slashes || e2.slashes, r2.href = r2.format(), r2;
          }
          var v2 = r2.pathname && "/" === r2.pathname.charAt(0), w = e2.host || e2.pathname && "/" === e2.pathname.charAt(0), _ = w || v2 || r2.host && e2.pathname, k = _, S = r2.pathname && r2.pathname.split("/") || [], E = (d2 = e2.pathname && e2.pathname.split("/") || [], r2.protocol && !b[r2.protocol]);
          if (E && (r2.hostname = "", r2.port = null, r2.host && ("" === S[0] ? S[0] = r2.host : S.unshift(r2.host)), r2.host = "", e2.protocol && (e2.hostname = null, e2.port = null, e2.host && ("" === d2[0] ? d2[0] = e2.host : d2.unshift(e2.host)), e2.host = null), _ = _ && ("" === d2[0] || "" === S[0])), w)
            r2.host = e2.host || "" === e2.host ? e2.host : r2.host, r2.hostname = e2.hostname || "" === e2.hostname ? e2.hostname : r2.hostname, r2.search = e2.search, r2.query = e2.query, S = d2;
          else if (d2.length)
            S || (S = []), S.pop(), S = S.concat(d2), r2.search = e2.search, r2.query = e2.query;
          else if (!i.isNullOrUndefined(e2.search)) {
            if (E)
              r2.hostname = r2.host = S.shift(), (I = !!(r2.host && r2.host.indexOf("@") > 0) && r2.host.split("@")) && (r2.auth = I.shift(), r2.host = r2.hostname = I.shift());
            return r2.search = e2.search, r2.query = e2.query, i.isNull(r2.pathname) && i.isNull(r2.search) || (r2.path = (r2.pathname ? r2.pathname : "") + (r2.search ? r2.search : "")), r2.href = r2.format(), r2;
          }
          if (!S.length)
            return r2.pathname = null, r2.search ? r2.path = "/" + r2.search : r2.path = null, r2.href = r2.format(), r2;
          for (var C = S.slice(-1)[0], T = (r2.host || e2.host || S.length > 1) && ("." === C || ".." === C) || "" === C, x = 0, A = S.length; A >= 0; A--)
            "." === (C = S[A]) ? S.splice(A, 1) : ".." === C ? (S.splice(A, 1), x++) : x && (S.splice(A, 1), x--);
          if (!_ && !k)
            for (; x--; x)
              S.unshift("..");
          !_ || "" === S[0] || S[0] && "/" === S[0].charAt(0) || S.unshift(""), T && "/" !== S.join("/").substr(-1) && S.push("");
          var I, P = "" === S[0] || S[0] && "/" === S[0].charAt(0);
          E && (r2.hostname = r2.host = P ? "" : S.length ? S.shift() : "", (I = !!(r2.host && r2.host.indexOf("@") > 0) && r2.host.split("@")) && (r2.auth = I.shift(), r2.host = r2.hostname = I.shift()));
          return (_ = _ || r2.host && S.length) && !P && S.unshift(""), S.length ? r2.pathname = S.join("/") : (r2.pathname = null, r2.path = null), i.isNull(r2.pathname) && i.isNull(r2.search) || (r2.path = (r2.pathname ? r2.pathname : "") + (r2.search ? r2.search : "")), r2.auth = e2.auth || r2.auth, r2.slashes = r2.slashes || e2.slashes, r2.href = r2.format(), r2;
        }, o.prototype.parseHost = function() {
          var e2 = this.host, t2 = a.exec(e2);
          t2 && (":" !== (t2 = t2[0]) && (this.port = t2.substr(1)), e2 = e2.substr(0, e2.length - t2.length)), e2 && (this.hostname = e2);
        };
      }, { "./util": 77, punycode: 51, querystring: 54 }], 77: [function(e, t, r) {
        "use strict";
        t.exports = { isString: function(e2) {
          return "string" == typeof e2;
        }, isObject: function(e2) {
          return "object" == typeof e2 && null !== e2;
        }, isNull: function(e2) {
          return null === e2;
        }, isNullOrUndefined: function(e2) {
          return null == e2;
        } };
      }, {}], 78: [function(e, t, r) {
        (function(e2) {
          (function() {
            function r2(t2) {
              try {
                if (!e2.localStorage)
                  return false;
              } catch (e3) {
                return false;
              }
              var r3 = e2.localStorage[t2];
              return null != r3 && "true" === String(r3).toLowerCase();
            }
            t.exports = function(e3, t2) {
              if (r2("noDeprecation"))
                return e3;
              var n = false;
              return function() {
                if (!n) {
                  if (r2("throwDeprecation"))
                    throw new Error(t2);
                  r2("traceDeprecation") ? console.trace(t2) : console.warn(t2), n = true;
                }
                return e3.apply(this, arguments);
              };
            };
          }).call(this);
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
      }, {}], 79: [function(e, t, r) {
        t.exports = function e2(t2, r2) {
          if (t2 && r2)
            return e2(t2)(r2);
          if ("function" != typeof t2)
            throw new TypeError("need wrapper function");
          Object.keys(t2).forEach(function(e3) {
            n[e3] = t2[e3];
          });
          return n;
          function n() {
            for (var e3 = new Array(arguments.length), r3 = 0; r3 < e3.length; r3++)
              e3[r3] = arguments[r3];
            var n2 = t2.apply(this, e3), i = e3[e3.length - 1];
            return "function" == typeof n2 && n2 !== i && Object.keys(i).forEach(function(e4) {
              n2[e4] = i[e4];
            }), n2;
          }
        };
      }, {}], 80: [function(e, t, r) {
        "use strict";
        t.exports = function() {
          throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object");
        };
      }, {}], 81: [function(e, t, r) {
        t.exports = function() {
          for (var e2 = {}, t2 = 0; t2 < arguments.length; t2++) {
            var r2 = arguments[t2];
            for (var i in r2)
              n.call(r2, i) && (e2[i] = r2[i]);
          }
          return e2;
        };
        var n = Object.prototype.hasOwnProperty;
      }, {}], 82: [function(e, t, r) {
        "use strict";
        t.exports = function(e2) {
          e2.prototype[Symbol.iterator] = function* () {
            for (let e3 = this.head; e3; e3 = e3.next)
              yield e3.value;
          };
        };
      }, {}], 83: [function(e, t, r) {
        "use strict";
        function n(e2) {
          var t2 = this;
          if (t2 instanceof n || (t2 = new n()), t2.tail = null, t2.head = null, t2.length = 0, e2 && "function" == typeof e2.forEach)
            e2.forEach(function(e3) {
              t2.push(e3);
            });
          else if (arguments.length > 0)
            for (var r2 = 0, i2 = arguments.length; r2 < i2; r2++)
              t2.push(arguments[r2]);
          return t2;
        }
        function i(e2, t2, r2) {
          var n2 = t2 === e2.head ? new a(r2, null, t2, e2) : new a(r2, t2, t2.next, e2);
          return null === n2.next && (e2.tail = n2), null === n2.prev && (e2.head = n2), e2.length++, n2;
        }
        function o(e2, t2) {
          e2.tail = new a(t2, e2.tail, null, e2), e2.head || (e2.head = e2.tail), e2.length++;
        }
        function s(e2, t2) {
          e2.head = new a(t2, null, e2.head, e2), e2.tail || (e2.tail = e2.head), e2.length++;
        }
        function a(e2, t2, r2, n2) {
          if (!(this instanceof a))
            return new a(e2, t2, r2, n2);
          this.list = n2, this.value = e2, t2 ? (t2.next = this, this.prev = t2) : this.prev = null, r2 ? (r2.prev = this, this.next = r2) : this.next = null;
        }
        t.exports = n, n.Node = a, n.create = n, n.prototype.removeNode = function(e2) {
          if (e2.list !== this)
            throw new Error("removing node which does not belong to this list");
          var t2 = e2.next, r2 = e2.prev;
          return t2 && (t2.prev = r2), r2 && (r2.next = t2), e2 === this.head && (this.head = t2), e2 === this.tail && (this.tail = r2), e2.list.length--, e2.next = null, e2.prev = null, e2.list = null, t2;
        }, n.prototype.unshiftNode = function(e2) {
          if (e2 !== this.head) {
            e2.list && e2.list.removeNode(e2);
            var t2 = this.head;
            e2.list = this, e2.next = t2, t2 && (t2.prev = e2), this.head = e2, this.tail || (this.tail = e2), this.length++;
          }
        }, n.prototype.pushNode = function(e2) {
          if (e2 !== this.tail) {
            e2.list && e2.list.removeNode(e2);
            var t2 = this.tail;
            e2.list = this, e2.prev = t2, t2 && (t2.next = e2), this.tail = e2, this.head || (this.head = e2), this.length++;
          }
        }, n.prototype.push = function() {
          for (var e2 = 0, t2 = arguments.length; e2 < t2; e2++)
            o(this, arguments[e2]);
          return this.length;
        }, n.prototype.unshift = function() {
          for (var e2 = 0, t2 = arguments.length; e2 < t2; e2++)
            s(this, arguments[e2]);
          return this.length;
        }, n.prototype.pop = function() {
          if (this.tail) {
            var e2 = this.tail.value;
            return this.tail = this.tail.prev, this.tail ? this.tail.next = null : this.head = null, this.length--, e2;
          }
        }, n.prototype.shift = function() {
          if (this.head) {
            var e2 = this.head.value;
            return this.head = this.head.next, this.head ? this.head.prev = null : this.tail = null, this.length--, e2;
          }
        }, n.prototype.forEach = function(e2, t2) {
          t2 = t2 || this;
          for (var r2 = this.head, n2 = 0; null !== r2; n2++)
            e2.call(t2, r2.value, n2, this), r2 = r2.next;
        }, n.prototype.forEachReverse = function(e2, t2) {
          t2 = t2 || this;
          for (var r2 = this.tail, n2 = this.length - 1; null !== r2; n2--)
            e2.call(t2, r2.value, n2, this), r2 = r2.prev;
        }, n.prototype.get = function(e2) {
          for (var t2 = 0, r2 = this.head; null !== r2 && t2 < e2; t2++)
            r2 = r2.next;
          if (t2 === e2 && null !== r2)
            return r2.value;
        }, n.prototype.getReverse = function(e2) {
          for (var t2 = 0, r2 = this.tail; null !== r2 && t2 < e2; t2++)
            r2 = r2.prev;
          if (t2 === e2 && null !== r2)
            return r2.value;
        }, n.prototype.map = function(e2, t2) {
          t2 = t2 || this;
          for (var r2 = new n(), i2 = this.head; null !== i2; )
            r2.push(e2.call(t2, i2.value, this)), i2 = i2.next;
          return r2;
        }, n.prototype.mapReverse = function(e2, t2) {
          t2 = t2 || this;
          for (var r2 = new n(), i2 = this.tail; null !== i2; )
            r2.push(e2.call(t2, i2.value, this)), i2 = i2.prev;
          return r2;
        }, n.prototype.reduce = function(e2, t2) {
          var r2, n2 = this.head;
          if (arguments.length > 1)
            r2 = t2;
          else {
            if (!this.head)
              throw new TypeError("Reduce of empty list with no initial value");
            n2 = this.head.next, r2 = this.head.value;
          }
          for (var i2 = 0; null !== n2; i2++)
            r2 = e2(r2, n2.value, i2), n2 = n2.next;
          return r2;
        }, n.prototype.reduceReverse = function(e2, t2) {
          var r2, n2 = this.tail;
          if (arguments.length > 1)
            r2 = t2;
          else {
            if (!this.tail)
              throw new TypeError("Reduce of empty list with no initial value");
            n2 = this.tail.prev, r2 = this.tail.value;
          }
          for (var i2 = this.length - 1; null !== n2; i2--)
            r2 = e2(r2, n2.value, i2), n2 = n2.prev;
          return r2;
        }, n.prototype.toArray = function() {
          for (var e2 = new Array(this.length), t2 = 0, r2 = this.head; null !== r2; t2++)
            e2[t2] = r2.value, r2 = r2.next;
          return e2;
        }, n.prototype.toArrayReverse = function() {
          for (var e2 = new Array(this.length), t2 = 0, r2 = this.tail; null !== r2; t2++)
            e2[t2] = r2.value, r2 = r2.prev;
          return e2;
        }, n.prototype.slice = function(e2, t2) {
          (t2 = t2 || this.length) < 0 && (t2 += this.length), (e2 = e2 || 0) < 0 && (e2 += this.length);
          var r2 = new n();
          if (t2 < e2 || t2 < 0)
            return r2;
          e2 < 0 && (e2 = 0), t2 > this.length && (t2 = this.length);
          for (var i2 = 0, o2 = this.head; null !== o2 && i2 < e2; i2++)
            o2 = o2.next;
          for (; null !== o2 && i2 < t2; i2++, o2 = o2.next)
            r2.push(o2.value);
          return r2;
        }, n.prototype.sliceReverse = function(e2, t2) {
          (t2 = t2 || this.length) < 0 && (t2 += this.length), (e2 = e2 || 0) < 0 && (e2 += this.length);
          var r2 = new n();
          if (t2 < e2 || t2 < 0)
            return r2;
          e2 < 0 && (e2 = 0), t2 > this.length && (t2 = this.length);
          for (var i2 = this.length, o2 = this.tail; null !== o2 && i2 > t2; i2--)
            o2 = o2.prev;
          for (; null !== o2 && i2 > e2; i2--, o2 = o2.prev)
            r2.push(o2.value);
          return r2;
        }, n.prototype.splice = function(e2, t2, ...r2) {
          e2 > this.length && (e2 = this.length - 1), e2 < 0 && (e2 = this.length + e2);
          for (var n2 = 0, o2 = this.head; null !== o2 && n2 < e2; n2++)
            o2 = o2.next;
          var s2 = [];
          for (n2 = 0; o2 && n2 < t2; n2++)
            s2.push(o2.value), o2 = this.removeNode(o2);
          null === o2 && (o2 = this.tail), o2 !== this.head && o2 !== this.tail && (o2 = o2.prev);
          for (n2 = 0; n2 < r2.length; n2++)
            o2 = i(this, o2, r2[n2]);
          return s2;
        }, n.prototype.reverse = function() {
          for (var e2 = this.head, t2 = this.tail, r2 = e2; null !== r2; r2 = r2.prev) {
            var n2 = r2.prev;
            r2.prev = r2.next, r2.next = n2;
          }
          return this.head = t2, this.tail = e2, this;
        };
        try {
          e("./iterator.js")(n);
        } catch (e2) {
        }
      }, { "./iterator.js": 82 }] }, {}, [12])(12);
    });
  }
});
export default require_mqtt_min();
//# sourceMappingURL=mqtt_dist_mqtt__min.js.map
