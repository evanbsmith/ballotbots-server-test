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

// import npm modules here
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// import collections here
import { Organizations } from '../../../api/organizations/organizations.js';
import { Elections } from '../../../api/elections/elections.js';


// import html file(s) here
import './electionMap.html';
import './electionMap.scss';




// define template stuff here

Template.electionMap.onCreated(function(){
  console.log('Template electionMap created');
  this.getElectionId = () => FlowRouter.getParam('electionId');
  console.log('electionId', this.getElectionId());

  this.autorun(() => {
    const electionHandle = this.subscribe('election.private', this.getElectionId());
    const orgHandle = this.subscribe('organization.private.fromElectionId', this.getElectionId());

  });
});

Template.electionMap.onRendered(function(){
  console.log('Template electionMap rendered');
  console.log('Template electionMap currentData()', this.data);
  const instance = Template.instance();
  var electionMap = L.map('electionMapPane');
  L.tileLayer('https://api.mapbox.com/styles/v1/evanbsmith/citzwb4fc008r2io461l41xeq/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXZhbmJzbWl0aCIsImEiOiJJcG5XSTlvIn0.z7GQsUVmO0fPgUI9VtIOgg').addTo(electionMap);

  this.autorun(() => {
    if(instance.subscriptionsReady()){
      console.log('Subscriptions ready!');
      let org = Organizations.findOne();
      electionMap.setView(org.latLong,8);
      var marker = L.circleMarker(org.latLong, {
        color: '#0096d6',
        fillColor: '#0096d6',
        fillOpacity: 0.5,
        radius: 15
      }).addTo(electionMap);
      marker.bindPopup(org.name);
    }
  });
});

Template.electionMap.helpers({
  // orgName: function(){
  //   const instance = Template.instance();
  //   const orgId = instance.getOrgId();
  //   console.log('org collection test',Organizations.findOne(orgId));
  //   return Organizations.findOne(orgId).name;
  // },
  // orgLocation: function(){
  //
  // }
});

Template.electionMap.events({
  // 'click [element]'(event,instance){
  //
  // }
});
