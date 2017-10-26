import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Organizations } from '../organizations.js';
import { Elections } from '../../elections/elections.js';

Meteor.publish('organization.private',function(orgId){
  // new SimpleSchema({
  //   orgId: {type: String}
  // }).validate({ params });

  // add check for logged in user

  return Organizations.find(orgId,{
    limit: 1
  });
});

Meteor.publish('organization.private.fromElectionId',function(electionId){
  // new SimpleSchema({
  //   orgId: {type: String}
  // }).validate({ params });

  // add check for logged in user

  var orgId = Elections.findOne(electionId).organizationId;

  return Organizations.find(orgId,{
    limit: 1
  });
});
