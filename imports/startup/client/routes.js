// import variables from packages here

import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// import templates here

import '../../ui/layouts/layout1.js';
import '../../ui/layouts/layout2.js';
import '../../ui/components/index.js';
import '../../ui/views/index.js';

// define routes here

FlowRouter.route('/', {
  name: 'home',
  action(params, queryParams) {
    console.log("We're at home!");
	  BlazeLayout.render('layout1',{top:"topNav",main:"messagesList"});
  }
});

FlowRouter.route('/list', {
  name: 'list',
  action(params, queryParams) {
    console.log("Looking at the list!");
	  BlazeLayout.render('layout1',{top:"topNav",main:"messagesList"});
  }
});

FlowRouter.route('/charts', {
  name: 'charts',
  action(params, queryParams) {
    console.log("Looking at the charts!");
	  BlazeLayout.render('layout1',{top:"topNav",main:"charts"});
  }
});

FlowRouter.route('/organization/:orgId', {
  name: 'organizationView',
  action(params, queryParams){
    BlazeLayout.render('layout2',{leftNav:"leftNav",titleBar:"orgTitleBar", content1:"orgDetails", content2:"orgElections",footer:"footer"});
  }
});

FlowRouter.route('/election/:electionId', {
  name: 'electionView',
  action(params, queryParams){
    BlazeLayout.render('layout2',{leftNav:"leftNav",titleBar:"electionTitleBar", content1:"electionDetails", content2:"electionStations",footer:"footer"});
  }
});
