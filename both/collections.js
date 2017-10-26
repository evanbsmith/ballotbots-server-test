import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

if(Meteor.isServer){
  import { Restivus } from 'meteor/nimble:restivus';
}

export const SensorStats = new Mongo.Collection('SensorStats');

export const SensorData = new Mongo.Collection('SensorData');

SensorData.before.insert(function(userId, doc){
  console.log("SensorData before insert doc: ", doc);
  doc.timestamp = new Date();
  if(doc.dateTime.length === 13){
    console.log("dateTime: Should be UNIX ms. ", doc.dateTime);
    console.log("parseInt: ", parseInt(doc.dateTime));
    var date = new Date(parseInt(doc.dateTime));
    console.log("Date object: ", date);
    doc.dateTime = date;
  }
  else if (doc.dateTime.length === 10){
    console.log("dateTime: Should be UNIX sec. ", doc.dateTime);
    console.log("parseInt: ", parseInt(doc.dateTime));
    var date = new Date(parseInt(doc.dateTime));
    console.log("Date object: ", date);
    doc.dateTime = new Date(parseInt(doc.dateTime)*1000);
  }
  else {
    console.log("dateTime: Should be non UNIX date format. ", doc.dateTime);
    doc.dateTime = new Date(doc.dateTime);
  }

});

SensorStats.before.insert(function(userId, doc){
  console.log("SensorStats before insert doc: ", doc);
  doc.timestamp = new Date();
  if(doc.dateTime.length === 13){
    console.log("dateTime: Should be UNIX ms. ", doc.dateTime);
    console.log("parseInt: ", parseInt(doc.dateTime));
    var date = new Date(parseInt(doc.dateTime));
    console.log("Date object: ", date);
    doc.dateTime = date;
  }
  else if (doc.dateTime.length === 10){
    console.log("dateTime: Should be UNIX sec. ", doc.dateTime);
    console.log("parseInt: ", parseInt(doc.dateTime));
    var date = new Date(parseInt(doc.dateTime));
    console.log("Date object: ", date);
    doc.dateTime = new Date(parseInt(doc.dateTime)*1000);
  }
  else {
    console.log("dateTime: Should be non UNIX date format. ", doc.dateTime);
    doc.dateTime = new Date(doc.dateTime);
  }

  doc.batteryLevel = parseInt(doc.batteryLevel);

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

  Api.addCollection(SensorStats,{
    routeOptions: {
      authRequired: false
    }
  });


}
