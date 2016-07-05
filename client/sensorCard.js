import Chart from 'chart.js';

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { SensorData } from '../both/collections.js';

Template.sensorCard.onCreated(function helloOnCreated() {
	this.subscribe('sensordata');
});

Template.sensorCard.onRendered(function(){
	
	console.log('sensorCard rendered', this);
	var ctx = this.find('canvas');
	var dataContext = this.data;
	
	
	var sensorData = SensorData.find({sensorId:dataContext.sensorId, stationId:dataContext.stationId},{fields:{dateTime:1},sort:{dateTime:1}}).map(function(obj,index,cursor){
		return {
			x: obj.dateTime,
			y: index + 1
		}
	});
	console.log('sensorData',sensorData);
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        datasets: [{
	            label: 'Detections',
	            data: sensorData,
				lineTension: 0,
				backgroundColor: 'rgba(0, 191, 165, 0.2)',
				borderColor: 'rgba(0, 191, 165, 0.8)',
				pointBorderWidth: 3,
				pointBackgroundColor: 'rgba(0, 191, 165, 0.8)'
	        }]
	    },
	    options: {
			legend: {
				display: false
			},
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }],
				xAxes: [{
					type: 'time',
					position: 'bottom',
					time: {
						tooltipFormat: 'MMM D YYYY, h:mm:ss a'
					}
				}]
	        },
			animation: {
				duration: 500
			}
	    }
	});
	
	this.autorun(function(){
		var newSensorData = SensorData.find({sensorId:dataContext.sensorId, stationId:dataContext.stationId},{fields:{dateTime:1},sort:{dateTime:1}}).map(function(obj,index,cursor){
			return {
				x: obj.dateTime,
				y: index + 1
			}
		});
		console.log('autorun triggered', 'new data', newSensorData);
		myChart.data.datasets[0].data = newSensorData;
		myChart.update();
	});
});

Template.sensorCard.helpers({
	sensorName: function(sensorId){
		console.log('sensorName', sensorId, SensorData.findOne({sensorId:sensorId}));
		
		return SensorData.findOne({sensorId:sensorId}).sensorName;
	},
	sensorDataCount: function(data){
		console.log('sensorDataCount', data);
		return SensorData.find({stationId: data.stationId, sensorId: data.sensorId}).count();
	},
	latestSensorData: function(data){
		console.log('latestSensorData', SensorData.find({stationId: data.stationId, sensorId: data.sensorId},{sort:{dateTime:-1}, fields:{dateTime:1,timestamp:1}}).fetch());
		return moment(_.pluck(SensorData.find({stationId: data.stationId, sensorId: data.sensorId},{sort:{dateTime:-1}, fields:{dateTime:1,timestamp:1}}).fetch(),'timestamp')[0]).format('MMM D YYYY, h:mm:ss a');
	}
	
});

Template.sensorCard.events({
	
});