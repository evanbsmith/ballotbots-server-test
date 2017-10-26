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
import './leftNav.html';
import './leftNav.scss';


// define template stuff here

Template.leftNav.onCreated(function(){
  Session.set('nav-open',false);
});

Template.leftNav.helpers({
  navOpenClass: function(){
    return Session.get('nav-open') ? 'navOpen' : '';
  }
});

Template.leftNav.events({
  'click a#leftNavMenuButton'(event,instance){
    event.preventDefault();
    console.log('menu button clicked!');
    console.log(event, instance.$());
    Session.get('nav-open') ? Session.set('nav-open',false) : Session.set('nav-open', true);
  }
});
