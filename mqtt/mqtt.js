import { v4 } from "uuid";
import mqttManager from './MqttManager.js'
/**
 * MQTTv5 客户端模块
 * @module mqttv5
 */
const mqttPlugin=uni.requireNativePlugin('mqttPlugin');

function getClientId(){
	var clientID;
	if(uni.getStorageSync("mqtt-clientId")){
		clientID=uni.getStorageSync("mqtt-clientId");
	}
	else{
		clientID="app-"+v4();
		uni.setStorageSync("mqtt-clientId",clientID);
	}
	return clientID;
}

const mqttv5={
	config:{
		serverURI:"tcp://120.46.54.180:1883",
		clientId:getClientId(),
		username:"zechuan",
		password:"pu200207"
	},
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
	    serverURI|| this.config.serverURI,
	    clientId || this.config.clientId,
	    username || this.config.username,
	    password || this.config.password,
	    (result) => {
	      if (result.success) {
	        callback(true, result.message);
	      } else {
	        callback(false, result.message || 'Connection failed');
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
	subscribe(topic, qos, callback) {
	  mqttPlugin.subscribe(
	    topic,
	    qos,
	    (result) => {
	      if (result.success) {
	        callback(true, result.message);
	      } else {
	        callback(false, result.message || 'Subscribe failed');
	      }
	    }
	  );
	},
	/**
	 * 订阅多个主题
	 * @param {string[]} topics 要订阅的主题
	 * @param {number[]} qoss 服务质量等级 (0, 1 或 2)
	 * @param {Function} callback 回调函数 (success, result)
	 */
	subscribeMultiTopics(topics, qoss, callback) {
	  mqttPlugin.subscribeMultiTopics(
	    topics,
	    qoss,
	    (result) => {
	      if (result.success) {
	        callback(true, result.message);
	      } else {
	        callback(false, result.message || 'Subscribe failed');
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
	        callback(false, result.message || 'Publish failed');
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
	        callback(false, result.message || 'Disconnect failed');
	      }
	    }
	  );
	},
	/**
	 * 取消订阅
	 * @param {Function} callback 回调函数 (success, result)
	 * @param {String} topic 要取消订阅的主题
	 */
	unsubscribe(topic,callback){
		mqttPlugin.unsubscribe(
		  topic,
		  (result) => {
		    if (result.success) {
		      callback(true, result.message);
		    } else {
		      callback(false, result.message || 'unsubscribe failed');
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
	    if (result.type === 'message') {
			const message=JSON.parse(result.message);
			message.success=true
			mqttManager.dispatch(result.topic,message);
	    }
	  });
	},
	/**
	 * 设置事件回调
	 * @param {Function} event 订阅事件类型 支持
	 * @param {Function} callback 事件回调函数 (result)
	 */
	setEventCallback(event,callback) {
	  mqttPlugin.setEventCallback(event,(result) => {
	    callback({
			isConnected:result.isConnected,
	        event: result.event,
	        reason:result.reason,
			message:result.message
	      });
	  });
	}
}

export default mqttv5;