import { FlowRouter } from 'meteor/kadira:flow-router';

import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'home',
  action(params, queryParams) {
    console.log("We're at home!");
	BlazeLayout.render('layout',{top:"header",main:"messagesList"});
  }
});

FlowRouter.route('/list', {
  name: 'list',
  action(params, queryParams) {
    console.log("Looking at the list!");
	BlazeLayout.render('layout',{top:"header",main:"messagesList"});
  }
});

FlowRouter.route('/charts', {
  name: 'charts',
  action(params, queryParams) {
    console.log("Looking at the charts!");
	BlazeLayout.render('layout',{top:"header",main:"charts"});
  }
});