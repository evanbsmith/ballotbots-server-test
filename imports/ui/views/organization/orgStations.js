// import variables from packages here

import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { ActiveRoute } from 'meteor/zimme:active-route';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { FineModal } from 'meteor/apotex:finemodal';

import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

// import npm modules here
import moment from 'moment';
// import bootstrap from 'bootstrap-sass';

// import collections here
import { Organizations } from '../../../api/organizations/organizations.js';
import { Elections } from '../../../api/elections/elections.js';


// import html file(s) here
import './orgStations.html';
import './orgStations.scss';




// define template stuff here

Template.orgStations.onCreated(function(){
  console.log('Template orgStations created');
  this.getOrgId = () => FlowRouter.getParam('orgId');
  console.log('orgId', this.getOrgId());

  // this.addElectionModal = new FineModal({
  //   template: Template.addElectionModal, // The template that houses the modal.
  //   data: 'Horse Potato'
  // });

  this.autorun(() => {
    const orgHandle = this.subscribe('organization.private', this.getOrgId());
    const elecHandle = this.subscribe('elections.private', this.getOrgId());

  });
});

Template.orgStations.onRendered(function(){
  console.log('Template orgStations rendered');
  console.log('Template orgStations currentData()', this.data);
  const instance = Template.instance();
  const orgId = instance.getOrgId();

  this.autorun(() => {
    if(instance.subscriptionsReady()){
      console.log('Subscriptions ready!');

    }
  });
});

Template.orgStations.helpers({
  // orgName: function(){
  //   const instance = Template.instance();
  //   const orgId = instance.getOrgId();
  //   console.log('org collection test',Organizations.findOne(orgId));
  //   return Organizations.findOne(orgId).name;
  // },
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
  // electionPath(elecId){
  //   return FlowRouter.path("electionView",{
  //     electionId:elecId
  //   });
  // }
});

Template.orgStations.events({
  // 'click #add-election-button' (event,instance){
  //   instance.addElectionModal.show();
  // },
  // 'click .manage-election-button' (event,instance){
  //   FlowRouter.go()
  // }
});
