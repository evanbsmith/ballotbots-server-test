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

// import collections here

// import html file(s) here
import './mainContent.html';
import './mainContent.scss';


// define template stuff here

Template.placeholderMainContent.onCreated(function(){
  console.log('Template placeholderMainContent created');
});

Template.placeholderMainContent.helpers({

});

Template.placeholderMainContent.events({
  // 'click [element]'(event,instance){
  //
  // }
});
