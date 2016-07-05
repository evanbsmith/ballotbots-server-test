import Chart from 'chart.js';

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { SensorData } from '../both/collections.js';

Template.chartTemplate.onCreated(function helloOnCreated() {
	this.subscribe('sensordata');
});

Template.chartTemplate.onRendered(function(){
	var ctx = document.getElementById("chart");
	
	var sensorData = SensorData.find({},{fields:{dateTime:1},sort:{dateTime:1}}).map(function(obj,index,cursor){
		return {
			x: obj.dateTime,
			y: index + 1
		}
	});
	console.log('snesorData',sensorData);
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
//	        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
	        datasets: [{
	            label: '# of Detections',
	            data: sensorData,
	            // backgroundColor: [
	            //     'rgba(255, 99, 132, 0.2)'
	            // ],
	            // borderColor: [
	            //     'rgba(255,99,132,1)',
	            // ],
	            // borderWidth: 1
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
						displayFormats: {
							minute: "h:mm a"
						}
					}
				}]
	        }
	    }
	});
});

Template.chartTemplate.helpers({
	
});

Template.chartTemplate.events({
	
});