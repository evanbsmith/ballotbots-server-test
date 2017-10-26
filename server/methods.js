import { Meteor } from 'meteor/meteor';

// import mqtt from 'mqtt';

import { SensorData } from '../both/collections.js';

Meteor.methods({
	'sendTestSensorData'(message){
		console.log('sendTestSensorData method called!');

		SensorData.insert(message);

	},
	'clearSensorData'(){
		console.log('clearSensorData method called!');
		SensorData.remove({});
	}
});
