import { Meteor } from 'meteor/meteor';

import { SensorData } from '../both/collections.js';

Meteor.publish('sensordata',function(){
	return SensorData.find({});
});