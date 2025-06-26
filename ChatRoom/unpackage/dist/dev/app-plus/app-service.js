if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function requireNativePlugin(name) {
    return weex.requireModule(name);
  }
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const storage = {
    set(key, value) {
      uni.setStorageSync(key, value);
    },
    get(key) {
      return uni.getStorageSync(key);
    }
  };
  const byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  }
  var lookup = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    62,
    0,
    62,
    0,
    63,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    0,
    0,
    0,
    0,
    63,
    0,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51
  ];
  function base64Decode(source, target) {
    var sourceLength = source.length;
    var paddingLength = source[sourceLength - 2] === "=" ? 2 : source[sourceLength - 1] === "=" ? 1 : 0;
    var tmp;
    var byteIndex = 0;
    var baseLength = sourceLength - paddingLength & 4294967292;
    for (var i = 0; i < baseLength; i += 4) {
      tmp = lookup[source.charCodeAt(i)] << 18 | lookup[source.charCodeAt(i + 1)] << 12 | lookup[source.charCodeAt(i + 2)] << 6 | lookup[source.charCodeAt(i + 3)];
      target[byteIndex++] = tmp >> 16 & 255;
      target[byteIndex++] = tmp >> 8 & 255;
      target[byteIndex++] = tmp & 255;
    }
    if (paddingLength === 1) {
      tmp = lookup[source.charCodeAt(i)] << 10 | lookup[source.charCodeAt(i + 1)] << 4 | lookup[source.charCodeAt(i + 2)] >> 2;
      target[byteIndex++] = tmp >> 8 & 255;
      target[byteIndex++] = tmp & 255;
    }
    if (paddingLength === 2) {
      tmp = lookup[source.charCodeAt(i)] << 2 | lookup[source.charCodeAt(i + 1)] >> 4;
      target[byteIndex++] = tmp & 255;
    }
  }
  const crypto = {
    getRandomValues(arr) {
      if (!(arr instanceof Int8Array || arr instanceof Uint8Array || arr instanceof Int16Array || arr instanceof Uint16Array || arr instanceof Int32Array || arr instanceof Uint32Array || arr instanceof Uint8ClampedArray)) {
        throw new Error("Expected an integer array");
      }
      if (arr.byteLength > 65536) {
        throw new Error("Can only request a maximum of 65536 bytes");
      }
      var crypto2 = requireNativePlugin("DCloud-Crypto");
      base64Decode(crypto2.getRandomValues(arr.byteLength), new Uint8Array(
        arr.buffer,
        arr.byteOffset,
        arr.byteLength
      ));
      return arr;
    }
  };
  let getRandomValues;
  const rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      if (typeof crypto === "undefined" || !crypto.getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
      getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
  }
  const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  const native = { randomUUID };
  function v4(options, buf, offset) {
    var _a;
    if (native.randomUUID && !buf && !options) {
      return native.randomUUID();
    }
    options = options || {};
    const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
    if (rnds.length < 16) {
      throw new Error("Random bytes length must be >= 16");
    }
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      if (offset < 0 || offset + 16 > buf.length) {
        throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
      }
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  const mqttPlugin = requireNativePlugin("mqttPlugin");
  function getClientId() {
    var clientID;
    if (uni.getStorageSync("mqtt-clientId")) {
      clientID = uni.getStorageSync("mqtt-clientId");
    } else {
      clientID = "app-" + v4();
      uni.setStorageSync("mqtt-clientId", clientID);
    }
    return clientID;
  }
  const mqttv5 = {
    config: {
      serverURI: "tcp://120.46.54.180:1883",
      clientId: getClientId(),
      username: "admin",
      password: "pu200207"
    },
    subscriptions: /* @__PURE__ */ new Map(),
    // 存储结构：{ topic => Set<{page, callback}> }
    /**
     * 连接 MQTT 服务器
     * @param {Object} options 连接选项
     * @param {string} options.serverURI 服务器地址 (e.g. "tcp://mqtt.example.com:1883")
     * @param {string} [options.clientId] 客户端ID (可选，不传则自动生成)
     * @param {string} [options.username] 用户名 (可选)
     * @param {string} [options.password] 密码 (可选)
     * @param {Function} callback 回调函数 (success, result)
     */
    connect(options, callback) {
      const { serverURI, clientId, username, password } = options;
      mqttPlugin.connect(
        serverURI || this.config.serverURI,
        clientId || this.config.clientId,
        username || this.config.username,
        password || this.config.password,
        (result) => {
          if (result.success) {
            callback(true, result.message);
          } else {
            callback(false, result.message || "Connection failed");
          }
        }
      );
    },
    /**
     * 订阅主题
     * @param {string} topic 要订阅的主题
     * @param {number} qos 服务质量等级 (0, 1 或 2)
     * @param {Function} callback 回调函数 (success, result)
     */
    subscribe(topic, qos, subCallback, msgCallback) {
      mqttPlugin.subscribe(
        topic,
        qos,
        (result) => {
          if (result.success) {
            subCallback(true, result.message);
            if (!this.subscriptions.has(topic)) {
              this.subscriptions.set(topic, /* @__PURE__ */ new Set());
            }
            this.subscriptions.get(topic).add({ msgCallback });
          } else {
            subCallback(false, result.message || "Subscribe failed");
          }
        }
      );
    },
    /**
     * 发布消息
     * @param {string} topic 目标主题
     * @param {string} message 消息内容
     * @param {number} qos 服务质量等级 (0, 1 或 2)
     * @param {boolean} retained 是否保留消息
     * @param {Function} callback 回调函数 (success, result)
     */
    publish(topic, message, qos, retained, callback) {
      mqttPlugin.publish(
        topic,
        message,
        qos,
        retained,
        (result) => {
          if (result.success) {
            callback(true, result.message);
          } else {
            callback(false, result.message || "Publish failed");
          }
        }
      );
    },
    /**
     * 断开连接
     * @param {Function} callback 回调函数 (success, result)
     */
    disconnect(callback) {
      mqttPlugin.disconnect(
        (result) => {
          if (result.success) {
            callback(true, result.message);
          } else {
            callback(false, result.message || "Disconnect failed");
          }
        }
      );
    },
    /**
     * 取消订阅
     * @param {Function} callback 回调函数 (success, result)
     * @param {String} topic 要取消订阅的主题
     */
    unsubscribe(topic, callback) {
      mqttPlugin.unsubscribe(
        topic,
        (result) => {
          if (result.success) {
            callback(true, result.message);
          } else {
            callback(false, result.message || "unsubscribe failed");
          }
        }
      );
    },
    /**
     * 设置消息接收回调
     * @param {Function} callback 消息回调函数 (result)
     */
    setMessageCallback() {
      mqttPlugin.setMessageCallback((result) => {
        if (result.type === "message") {
          const message = JSON.parse(result.message);
          const payload = {
            topic: result.topic,
            message
          };
          if (this.subscriptions.has(result.topic)) {
            const subs = this.subscriptions.get(result.topic);
            subs.forEach((sub) => {
              sub.msgCallback(payload);
            });
          }
        }
      });
    },
    /**
     * 设置事件回调
     * @param {Function} event 订阅事件类型 支持
     * @param {Function} callback 事件回调函数 (result)
     */
    setEventCallback(event, callback) {
      mqttPlugin.setEventCallback(event, (result) => {
        callback({
          isConnected: result.isConnected,
          event: result.event,
          reason: result.reason,
          message: result.message
        });
      });
    }
  };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$1 = {
    data() {
      return {
        messages: [
          { id: 1, sender: "other", content: "你好呀！", time: new Date(Date.now() - 6e4) },
          { id: 2, sender: "me", content: "嗨！最近怎么样？", time: new Date(Date.now() - 3e4) },
          { id: 3, sender: "other", content: "还不错，有个新项目想和你聊聊", time: /* @__PURE__ */ new Date() }
        ],
        inputMessage: "",
        messageId: 4,
        mqttclient: null,
        clientId: ""
      };
    },
    computed: {
      lastMessageId() {
        if (this.messages.length === 0)
          return "";
        return "msg" + this.messages[this.messages.length - 1].id;
      }
    },
    methods: {
      getClientId() {
        const key = "talk-client";
        var clientId = storage.get(key);
        if (clientId == void 0 || clientId == null || clientId == "") {
          clientId = "talk_user_" + v4();
          storage.set(key, clientId);
          formatAppLog("log", "at pages/index/index.vue:85", clientId);
        }
        return clientId;
      },
      formatTime(date) {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      },
      sendMessage() {
        const content = this.inputMessage.trim();
        if (!content)
          return;
        const newMessage = {
          id: this.messageId++,
          sender: "me",
          content,
          time: /* @__PURE__ */ new Date()
        };
        this.messages.push(newMessage);
        this.inputMessage = "";
        const message = {
          clientId: this.clientId,
          content
        };
        message.clientType = "APP";
        this.mqttclient.publish("demo/msg", JSON.stringify(message), 0, false, (state, result) => {
          formatAppLog("log", "at pages/index/index.vue:117", result);
        });
      },
      receiveMessage(payload) {
        const message = payload.message;
        formatAppLog("log", "at pages/index/index.vue:123", payload);
        if (message.clientId != this.clientId) {
          const newMessage = {
            id: this.messageId++,
            sender: "other",
            content: message.content,
            time: /* @__PURE__ */ new Date(),
            clientType: message.clientType
          };
          this.messages.push(newMessage);
        }
      },
      async connectMqtt() {
        this.clientId = this.getClientId();
        this.mqttclient = mqttv5;
        this.mqttclient.connect({}, (state, result) => {
          formatAppLog("log", "at pages/index/index.vue:148", result);
        });
        this.mqttclient.setMessageCallback();
        this.mqttclient.subscribe("demo/msg", 0, (state, result) => {
          formatAppLog("log", "at pages/index/index.vue:152", result);
        }, this.receiveMessage);
      }
    },
    created() {
      this.connectMqtt();
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "chat-container" }, [
      vue.createCommentVNode(" 消息列表区域 "),
      vue.createElementVNode("scroll-view", {
        class: "message-list",
        "scroll-y": "true",
        "scroll-into-view": $options.lastMessageId,
        "scroll-with-animation": ""
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.messages, (msg, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: msg.id,
              id: "msg" + msg.id,
              class: vue.normalizeClass(["message-item", { "message-right": msg.sender === "me", "message-left": msg.sender === "other" }])
            }, [
              vue.createElementVNode("view", { class: "message-bubble" }, [
                vue.createCommentVNode(" 对方名称 "),
                msg.sender === "other" ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "sender-name"
                  },
                  vue.toDisplayString(msg.clientType),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(" 消息内容 "),
                vue.createElementVNode(
                  "text",
                  { class: "message-content" },
                  vue.toDisplayString(msg.content),
                  1
                  /* TEXT */
                ),
                vue.createCommentVNode(" 消息时间 "),
                vue.createElementVNode(
                  "text",
                  { class: "message-time" },
                  vue.toDisplayString($options.formatTime(msg.time)),
                  1
                  /* TEXT */
                )
              ])
            ], 10, ["id"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 8, ["scroll-into-view"]),
      vue.createCommentVNode(" 输入区域 "),
      vue.createElementVNode("view", { class: "input-area" }, [
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "input-box",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.inputMessage = $event),
            placeholder: "输入消息...",
            "confirm-type": "send",
            onConfirm: _cache[1] || (_cache[1] = (...args) => $options.sendMessage && $options.sendMessage(...args))
          },
          null,
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [vue.vModelText, $data.inputMessage]
        ]),
        vue.createElementVNode("button", {
          class: "send-button",
          disabled: !$data.inputMessage.trim(),
          onClick: _cache[2] || (_cache[2] = (...args) => $options.sendMessage && $options.sendMessage(...args))
        }, "发送", 8, ["disabled"])
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/mqtt/mqttv5PluginForUniapp/mqttDemo/pages/index/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/mqtt/mqttv5PluginForUniapp/mqttDemo/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
