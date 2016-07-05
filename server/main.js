import { Meteor } from 'meteor/meteor';

import { SensorData } from '../both/collections.js';

// var ascoltatore = {
//   //using ascoltatore
//   type: 'mongo',
//   url: 'mongodb://ballotbotsmqtttest:DI1500KStreet@candidate.45.mongolayer.com:10735,candidate.12.mongolayer.com:11147/ballotbotsmqtttest?replicaSet=set-55df692f726d96de68000582',
//   pubsubCollection: 'ascoltatori',
//   mongo: {}
// };
//
// var settings = {
// 	interfaces:[
// 		{ type: "mqtt", port: 1883 }
// 	],
// 	backend: ascoltatore,
// 	persistence: {
// 		factory: mosca.persistence.Mongo,
// 		url: 'mongodb://ballotbotsmqtttest:DI1500KStreet@candidate.45.mongolayer.com:10735,candidate.12.mongolayer.com:11147/ballotbotsmqtttest?replicaSet=set-55df692f726d96de68000582'
// 	}
// };
//
// var server = new mosca.Server(settings);
//
// function setup() {
// 	console.log('Mosca Server is Ready!');
// }



Meteor.startup(() => {
  // code to run on server at startup
	
	console.log('starting');
	
	// server.on('ready', setup);
//
// 	server.on('published', Meteor.bindEnvironment(function(packet,client){
// 		console.log('new message published!');
// 		console.log('packet', packet);
//
// 		packet.message = packet.payload.toString();
// 		packet.timestamp = new Date();
// 		TestMessages.insert(packet);
//
// 		// let payload = packet.payload;
// // 		console.log('packet payload', payload.toString());
// 		// console.log('client', client);
// 	}));
});
