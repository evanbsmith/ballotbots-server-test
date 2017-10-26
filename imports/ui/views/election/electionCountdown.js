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

// import collections here
import { Elections } from '../../../api/elections/elections.js';


// import html file(s) here
import './electionCountdown.html';
import './electionCountdown.scss';


// define template stuff here

Template.electionCountdown.onCreated(function(){
  console.log('Template electionCountdown created');
  // this.getElectionId = () => FlowRouter.getParam('electionId');
  // console.log('electionId', this.getElectionId());
  this.timeleft = new ReactiveVar(0);
  this.autorun(() => {
    const handle = this.subscribe('election.private', this.data);

  });
});

Template.electionCountdown.onRendered(function(){
  console.log('Template electionCountdown rendered');
  console.log('this.data',this.data);




  this.autorun(() => {
    if(this.subscriptionsReady()){
      console.log('Subscriptions ready!');
      console.log("template instance",this);
      var instance = this;
      instance.election = Elections.findOne(instance.data);
      const pollsOpenString = instance.election.pollsOpen.toString();
      const pollsOpenArray = [pollsOpenString.substring(0, pollsOpenString.length - 2),pollsOpenString.substring(pollsOpenString.length - 2)];
      instance.pollsOpenAt = moment(instance.election.electionDate).hour(parseInt(pollsOpenArray[0])).minute(parseInt(pollsOpenArray[1])).valueOf();

      const pollsCloseString = instance.election.pollsClose.toString();
      const pollsCloseArray = [pollsCloseString.substring(0, pollsCloseString.length - 2),pollsCloseString.substring(pollsCloseString.length - 2)];
      instance.pollsCloseAt = moment(instance.election.electionDate).hour(parseInt(pollsCloseArray[0])).minute(parseInt(pollsCloseArray[1])).valueOf();

      instance.time = new ReactiveVar(moment().valueOf());
    }
  });

  this.autorun(() => {
    if(this.subscriptionsReady()){
      // console.log('this.countdown test', this.timeleft.get());
    }
  });

  var instance = this;

  Meteor.setInterval(function(){
    instance.time.set(moment().valueOf());
  },1000);

});

Template.electionCountdown.helpers({
  beforeElection: function(){
    const instance = Template.instance();
    return instance.time.get() < instance.pollsOpenAt ? true : false;
  },
  duringElection: function(){
    const instance = Template.instance();
    return (instance.time.get() >= instance.pollsOpenAt && instance.time.get() < instance.pollsCloseAt) ? true : false;
  },
  afterElection: function(){
    const instance = Template.instance();
    return instance.time.get() >= instance.pollsCloseAt ? true : false;
  },
  showOpenClock: function(){
    const instance = Template.instance();
    return moment.duration(instance.pollsOpenAt - instance.time.get()).asDays() < 4 ? true : false;
  },
  openClockValues: function(){
    const instance = Template.instance();
    var duration = moment.duration(instance.pollsOpenAt - instance.time.get());
    const hours = Math.floor(duration.asHours()).toString().length === 2 ? Math.floor(duration.asHours()).toString() : ('0' + Math.floor(duration.asHours()).toString());
    const minutes = duration.minutes().toString().length === 2 ? duration.minutes().toString() : ('0' + duration.minutes().toString());
    const seconds = duration.seconds().toString().length === 2 ? duration.seconds().toString() : ('0' + duration.seconds().toString());

    var clockObj = {
      hours: hours,
      minutes:minutes,
      seconds:seconds
    };
    return clockObj;
  },
  openDays:function(){
    const instance = Template.instance();
    return moment.duration(instance.pollsOpenAt - instance.time.get()).asDays();
  },
  duringElectionClockValues: function(){
    const instance = Template.instance();
    var duration = moment.duration(instance.time.get() - instance.pollsOpenAt);
    const hours = Math.floor(duration.asHours()).toString().length === 2 ? Math.floor(duration.asHours()).toString() : ('0' + Math.floor(duration.asHours()).toString());
    const minutes = duration.minutes().toString().length === 2 ? duration.minutes().toString() : ('0' + duration.minutes().toString());
    const seconds = duration.seconds().toString().length === 2 ? duration.seconds().toString() : ('0' + duration.seconds().toString());

    var clockObj = {
      hours: hours,
      minutes:minutes,
      seconds:seconds
    };
    return clockObj;
  },
  showCloseClock: function(){
    const instance = Template.instance();
    // console.log('showCloseClock',moment.duration(instance.time.get() - instance.pollsCloseAt).asDays());
    return moment.duration(instance.time.get() - instance.pollsCloseAt).asDays() < 4 ? true : false;
  },
  closeClockValues: function(){
    const instance = Template.instance();
    var duration = moment.duration(instance.time.get() - instance.pollsCloseAt);
    const hours = Math.floor(duration.asHours()).toString().length === 2 ? Math.floor(duration.asHours()).toString() : ('0' + Math.floor(duration.asHours()).toString());
    const minutes = duration.minutes().toString().length === 2 ? duration.minutes().toString() : ('0' + duration.minutes().toString());
    const seconds = duration.seconds().toString().length === 2 ? duration.seconds().toString() : ('0' + duration.seconds().toString());

    var clockObj = {
      hours: hours,
      minutes:minutes,
      seconds:seconds
    };
    return clockObj;
  },
  closeDays:function(){
    const instance = Template.instance();
    return Math.floor(moment.duration(instance.time.get() - instance.pollsCloseAt).asDays());
  }
});

Template.electionCountdown.events({
  // 'click [element]'(event,instance){
  //
  // }
});
