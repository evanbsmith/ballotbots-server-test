import moment from 'moment';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { SensorData } from '../both/collections.js';

import './main.html';

Template.messagesList.onCreated(function helloOnCreated() {
	this.subscribe('sensordata');
});

Template.messagesList.onRendered(function(){
	
});

Template.messagesList.helpers({
	messages: function(){
		return SensorData.find({},{sort:{timestamp:-1}}).fetch();
	},
	formatDate: function(string, stringDisplayFormat){
		return moment(string).format(stringDisplayFormat);
	},
	getLag: function(data){
		return moment(data.timestamp).diff(moment(data.dateTime));
	}
});

Template.messagesList.events({
	'click a#sendTestSensorData'(event, instance) {
		event.preventDefault();
		console.log('sendTestSensorData clicked!');
		Meteor.call('sendTestSensorData',{
			sensorId: 'x0',
			sensorName: 'Web Client Test',
			dateTime: new Date(),
			topic: 'test/webclient',
			message: 'Test Sensor Data!',
			stationId: 'Test Data'
		});
	},
	'click a#clearSensorData'(event, instance) {
		event.preventDefault();
		console.log('clearSensorData clicked!');
		Meteor.call('clearSensorData');
	}
});