import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Stations } from '../stations.js';

Meteor.publish('stations.private',function(orgId){
  // new SimpleSchema({
  //   orgId: {type: String}
  // }).validate({ params });

  // add check for logged in user

  return Stations.find({organizationId:orgId},{

  });
});

Meteor.publish('station.private',function(stationId){
  // new SimpleSchema({
  //   orgId: {type: String}
  // }).validate({ params });

  // add check for logged in user

  return Stations.find(stationId,{
    limit:1
  });
});
