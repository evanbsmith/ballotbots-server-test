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
import { Organizations } from '../../../api/organizations/organizations.js';


// import html file(s) here
import './orgTitleBar.html';
import './orgTitleBar.scss';


// define template stuff here

Template.orgTitleBar.onCreated(function(){
  console.log('Template orgTitleBar created');
  this.getOrgId = () => FlowRouter.getParam('orgId');
  console.log('orgId', this.getOrgId());

  this.autorun(() => {
    const handle = this.subscribe('organization.private', this.getOrgId());

  });
});

Template.orgTitleBar.helpers({
  orgName: function(){
    const instance = Template.instance();
    const orgId = instance.getOrgId();
    return Organizations.findOne(orgId).name;
  },
  orgCountry: function(){
    const instance = Template.instance();
    const orgId = instance.getOrgId();
    return Organizations.findOne(orgId).country;
  }
});

Template.orgTitleBar.events({
  // 'click [element]'(event,instance){
  //
  // }
});
