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
import './addElectionModal.html';
import './addElectionModal.scss';




// define template stuff here

Template.addElectionModal.onCreated(function(){
  console.log('Template addElectionModal created');

  this.getOrgId = () => FlowRouter.getParam('orgId');
  console.log('orgId', this.getOrgId());

  // var currentModal = FineModalUtil.currentModal();



  this.autorun(() => {
    const orgHandle = this.subscribe('organization.private', this.getOrgId());
    const elecHandle = this.subscribe('elections.private', this.getOrgId());

  });
});

Template.addElectionModal.onRendered(function(){
  console.log('Template addElectionModal rendered');
  console.log('Template addElectionModal currentData()', this.data);
  const instance = Template.instance();
  const orgId = instance.getOrgId();

  var currentModal = FineModalUtil.currentModal();
  console.log('currentModal',currentModal);

  AutoForm.hooks({
    addElectionForm: {
      onSuccess: function(formType, result) {
        console.log("Yay, succeeded!",this.template);
        console.log('currentModal',currentModal);
        currentModal.hide();
      },
      onError: function(formType, error) {
        alert("Boo, failed!");
        console.log("Boo, failed!",this.template);
      }
    }
  });

  this.autorun(() => {
    if(instance.subscriptionsReady()){
      console.log('Subscriptions ready!');

    }
  });
});

Template.addElectionModal.helpers({
  getOrgId: function(){
    const instance = Template.instance();
    return instance.getOrgId();
  },
  // elections: function(){
  //   const instance = Template.instance();
  //   const orgId = instance.getOrgId();
  //   console.log('org collection test',Organizations.findOne(orgId));
  //   console.log('election collection test',Elections.find({organizationId:orgId}).fetch());
  //   return Elections.find({organizationId:orgId});
  // },
  // formatElectionDate(date){
  //   // console.log(date);
  //   return moment(date).format("MMMM D, YYYY");
  // },
  // formatElectionTime(time){ // expects time as "Hmm" integer, returns in "hh:mm a" using moment.js formats
  //   return moment(time,"Hmm").format("h:mm a");
  // },
  // showAddElectionModal(){
  //   return Session.get('showAddElectionModal');
  // },
  electionsCollection: function(){
    // const instance = Template.instance();
    // const orgId = instance.getOrgId();
    // console.log('org collection test',Organizations.findOne(orgId));
    // console.log('election collection test',Elections.find({organizationId:orgId}).fetch());
    return Elections;
  }
});

Template.addElectionModal.events({
  // 'click .modal-close' (event,instance){
  //   event.preventDefault();
  //   Session.set('showAddElectionModal',false);
  //
  //
  // }

  'click [data-action="close"]'() {
       FineModalUtil.currentModal().hide();
   }
});
