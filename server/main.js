import { Meteor } from 'meteor/meteor';

import { SensorData } from '../both/collections.js';

import '/imports/startup/server';
import '/imports/startup/both';

Meteor.startup(() => {
  // code to run on server at startup

	console.log('starting');

	Meteor.onConnection(function(connection){
			console.log("New connection: ");
			console.log(connection);
	});

});
