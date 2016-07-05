import { Mongo } from 'meteor/mongo';
 
export const SensorData = new Mongo.Collection('SensorData');

SensorData.before.insert(function(userId, doc){
	doc.timestamp = new Date();
	doc.dateTime = new Date(doc.dateTime);
});