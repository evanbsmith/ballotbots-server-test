import d3 from 'd3';

import nvd3 from 'nvd3';

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { SensorData } from '../both/collections.js';

Template.stationCharts.onCreated(function() {

});

Template.stationCharts.onRendered(function(){

});

Template.stationCharts.helpers({
	sensors: function(stationId){
		console.log('sensors called', "stationId: " + stationId, _.chain(SensorData.find({stationId: stationId}).fetch()).pluck('sensorId').uniq().value())
		return _.chain(SensorData.find({stationId: stationId, sensorId: {$exists: true}}).fetch()).pluck('sensorId').uniq().value();
	}
});

Template.stationCharts.events({
	
});
