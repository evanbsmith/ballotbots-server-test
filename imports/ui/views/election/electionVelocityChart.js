// import variables from packages here

import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { ActiveRoute } from 'meteor/zimme:active-route';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

// import npm packages here
import moment from 'moment';
import Chart from 'chart.js';

// import collections here
import { Elections } from '../../../api/elections/elections.js';


// import html file(s) here
import './electionVelocityChart.html';
import './electionVelocityChart.scss';


// define template stuff here

Template.electionVelocityChart.onCreated(function(){
  console.log('Template electionVelocityChart created');
  this.getElectionId = () => FlowRouter.getParam('electionId');
  console.log('electionId', this.getElectionId());

  this.autorun(() => {
    const handle = this.subscribe('election.private', this.getElectionId());

  });
});

Template.electionVelocityChart.onRendered(function(){
  console.log('Template electionVelocityChart rendered');

  let canvasEl = this.find('canvas');

  this.autorun(() => {
    if(this.subscriptionsReady()){
      console.log('electionVelocityChart Subscriptions ready!');
      console.log("template instance",this);
      var instance = this;
      instance.election = Elections.findOne(instance.getElectionId());
      const pollsOpenString = instance.election.pollsOpen.toString();
      const pollsOpenArray = [pollsOpenString.substring(0, pollsOpenString.length - 2),pollsOpenString.substring(pollsOpenString.length - 2)];
      instance.pollsOpenAt = moment(instance.election.electionDate).hour(parseInt(pollsOpenArray[0])).minute(parseInt(pollsOpenArray[1])).valueOf();

      const pollsCloseString = instance.election.pollsClose.toString();
      const pollsCloseArray = [pollsCloseString.substring(0, pollsCloseString.length - 2),pollsCloseString.substring(pollsCloseString.length - 2)];
      instance.pollsCloseAt = moment(instance.election.electionDate).hour(parseInt(pollsCloseArray[0])).minute(parseInt(pollsCloseArray[1])).valueOf();


      console.log("min time: ", moment(instance.pollsOpenAt).format("h:mm:ss a"));
      console.log('max time: ', moment(instance.pollsCloseAt).format("h:mm:ss a"));

      // add dummy data
      let testData = [];
      for(var i = 0; i<10; i++){

        var obj = {
          x: moment(instance.pollsOpenAt).hour(parseInt(pollsOpenArray[0])+i),
          y: i * i
        };
        testData.push(obj);
      }

      console.log("testData", testData);

      var myChart = new Chart(canvasEl, {
    	    type: 'line',
    	    data: {
            datasets: [{
              label: 'Detections',
              data: testData,
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
                // min: moment(instance.pollsOpenAt).format("h:mm a"),
                // max: moment(instance.pollsCloseAt).format("h:mm a"),
                // parser: "h:mm a",
                time: {
                  unit: "hour",
                  displayFormats: {
                          hour: 'h:mm a'
                      }
                }
                // minUnit: "minute",
                // time: {
                //     displayFormats: {
                //         minute: 'h:mm a'
                //     }
                // }
    					}]
            },
    				animation: {
    					duration: 500
    				}
    	    }
    	});

    }
  });

});

Template.electionVelocityChart.helpers({
  electionId: function(){
    const instance = Template.instance();
    return instance.getElectionId();
  }
});

Template.electionVelocityChart.events({
  // 'click [element]'(event,instance){
  //
  // }
});
