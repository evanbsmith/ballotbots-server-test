import { Meteor } from 'meteor/meteor';

// import mqtt from 'mqtt';

import { SensorData } from '../both/collections.js';

// var mqttClient = mqtt.connect('mqtt://localhost:1883', {
// 	clientId: "fromServer"
// });
//
// mqttClient.on("connect", Meteor.bindEnvironment(function() {
// 	console.log("Connected");
//
// 	mqttClient.on("message", Meteor.bindEnvironment(function(topic, message) {
// 		console.log("Server message", topic, message.toString());
// 		// TestMessages.insert({
// // 			topic: topic,
// // 			message: message.toString(),
// // 			timeStamp: new Date()
// // 		});
// 	}));
//
// 	mqttClient.on("error", function(param) {
// 		console.log("Wahhhh");
// 	});
//
// 	mqttClient.subscribe("test/+", function(err,granted){});
//
// 	var counter = 1;
// 	Meteor.setInterval(function(){
// 		var message = "hello world: " + counter;
// 		mqttClient.publish("test/topic", message, function() {
// 			// console.log("Sent Sir!");
// 		});
// 		counter++;
// 	},60000);
// }));

Meteor.methods({
	'sendTestSensorData'(message){
		console.log('sendTestSensorData method called!');
		
		SensorData.insert(message);
		// var mqttClient = mqtt.connect('mqtt://localhost:1883', {
// 			clientId: "fromServer"
// 		});
//
// 		mqttClient.on("connect", Meteor.bindEnvironment(function() {
// 			console.log("Connected");
//
// 			mqttClient.on("error", function(param) {
// 				console.log("Wahhhh");
// 			});
//
// 			mqttClient.publish("test/topic", message, function() {
// 				mqttClient.end();
// 			});
// 		}));
	},
	'clearSensorData'(){
		console.log('clearSensorData method called!');
		SensorData.remove({});
	}
});