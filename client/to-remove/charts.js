import d3 from 'd3';

import nvd3 from 'nvd3';

import naturalSort from 'javascript-natural-sort';

naturalSort.insensitive = true;

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { SensorData } from '../../both/collections.js';

import './charts.html';

Template.charts.onCreated(function() {
	this.subscribe('sensordata');
});

Template.charts.onRendered(function(){

});

Template.charts.helpers({
	sensorData: function(){
		return SensorData.find({},{sort:{dateTime:1}}).fetch();
	},
	stations: function(){
		return _.chain(SensorData.find({stationId:{$exists: true}},{fields:{stationId:1}}).fetch()).pluck('stationId').uniq().value().sort(naturalSort);
	},
	sensors: function(stationId){
		console.log('sensors called', "stationId: " + stationId, _.chain(SensorData.find({stationId: stationId}).fetch()).pluck('sensorId').uniq().value())
		return _.chain(SensorData.find({stationId: stationId}).fetch()).pluck('sensorId').uniq().value();
	},
	formatDate: function(string, stringDisplayFormat){
		return moment(string).format(stringDisplayFormat);
	}
});

Template.charts.events({
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
