// import variables from packages here

import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { ActiveRoute } from 'meteor/zimme:active-route';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { FineModalUtil } from 'meteor/apotex:finemodal';
import { AutoForm } from 'meteor/aldeed:autoform';

import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

// import npm modules here
import moment from 'moment';
import bootstrap from 'bootstrap-sass';

// import collections here
import { Organizations } from '../../../api/organizations/organizations.js';
import { Elections } from '../../../api/elections/elections.js';


// import html file(s) here
import './electionTitleBar.html';
import './electionTitleBar.scss';




// define template stuff here

Template.electionTitleBar.onCreated(function(){
  console.log('Template electionTitleBar created');

  this.getElectionId = () => FlowRouter.getParam('electionId');
  console.log('electionId', this.getElectionId());


  this.autorun(() => {
    // const orgHandle = this.subscribe('organization.private', this.getOrgId());
    const elecHandle = this.subscribe('election.private', this.getElectionId());
  });
});

Template.electionTitleBar.onRendered(function(){
  console.log('Template electionTitleBar rendered');
  console.log('Template electionTitleBar currentData()', this.data);
  const instance = Template.instance();
  const electionId = instance.getElectionId();

  this.autorun(() => {
    if(instance.subscriptionsReady()){
      console.log('Subscriptions ready!');
    }
  });
});

Template.electionTitleBar.helpers({
  election: function(){
    const instance = Template.instance();
    const electionId = instance.getElectionId();
    return Elections.findOne(electionId);
  },
  orgName: function(){
    const instance = Template.instance();
    const orgId = instance.getOrgId();
    return Organizations.findOne(orgId).country;
  }
});

Template.electionTitleBar.events({
  // 'click .modal-close' (event,instance){
  //   event.preventDefault();
  //   Session.set('showAddElectionModal',false);
  //
  //
  // }

  // 'click [data-action="close"]'() {
  //  }
});
