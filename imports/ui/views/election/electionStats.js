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
import countdown from 'countdown';
import momentcountdown from 'moment-countdown';

// import collections here
import { Elections } from '../../../api/elections/elections.js';


// import html file(s) here
import './electionStats.html';
import './electionStats.scss';


// define template stuff here

Template.electionStats.onCreated(function(){
  console.log('Template electionStats created');
  this.getElectionId = () => FlowRouter.getParam('electionId');
  console.log('electionId', this.getElectionId());

  this.autorun(() => {
    const handle = this.subscribe('election.private', this.getElectionId());

  });
});

Template.electionStats.helpers({
  electionId: function(){
    const instance = Template.instance();
    return instance.getElectionId();
  }
});

Template.electionStats.events({
  // 'click [element]'(event,instance){
  //
  // }
});
