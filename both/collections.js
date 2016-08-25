import { Mongo } from 'meteor/mongo';

if(Meteor.isServer){
  import { Restivus } from 'meteor/nimble:restivus';
}

export const SensorData = new Mongo.Collection('SensorData');

SensorData.before.insert(function(userId, doc){
	doc.timestamp = new Date();
	doc.dateTime = new Date(doc.dateTime);
});

if(Meteor.isServer){
  var Api = new Restivus({
    prettyJson: true
  });

  Api.addCollection(SensorData,{
    routeOptions: {
      authRequired: false
    }
  });



}
