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


// import html file(s) here
import './orgMap.html';
import './orgMap.scss';




// define template stuff here

Template.orgMap.onCreated(function(){
  console.log('Template orgMap created');
  this.getOrgId = () => FlowRouter.getParam('orgId');
  console.log('orgId', this.getOrgId());

  this.autorun(() => {
    const handle = this.subscribe('organization.private', this.getOrgId());

  });
});

Template.orgMap.onRendered(function(){
  console.log('Template orgMap rendered');
  console.log('Template orgMap currentData()', this.data);
  const instance = Template.instance();
  const orgId = instance.getOrgId();
  var orgMap = L.map('orgMapPane');
  L.tileLayer('https://api.mapbox.com/styles/v1/evanbsmith/citzwb4fc008r2io461l41xeq/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXZhbmJzbWl0aCIsImEiOiJJcG5XSTlvIn0.z7GQsUVmO0fPgUI9VtIOgg').addTo(orgMap);

  this.autorun(() => {
    if(instance.subscriptionsReady()){
      console.log('Subscriptions ready!');
      let org = Organizations.findOne(orgId);
      orgMap.setView(org.latLong,8);
      var marker = L.circleMarker(org.latLong, {
        color: '#0096d6',
        fillColor: '#0096d6',
        fillOpacity: 0.5,
        radius: 15
      }).addTo(orgMap);
      marker.bindPopup(org.name);
    }
  });
});

Template.orgMap.helpers({
  orgName: function(){
    const instance = Template.instance();
    const orgId = instance.getOrgId();
    console.log('org collection test',Organizations.findOne(orgId));
    return Organizations.findOne(orgId).name;
  },
  orgLocation: function(){

  }
});

Template.orgMap.events({
  // 'click [element]'(event,instance){
  //
  // }
});
