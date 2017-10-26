import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Elections } from '../elections.js';

Meteor.publish('elections.private',function(orgId){
  // new SimpleSchema({
  //   orgId: {type: String}
  // }).validate({ params });

  // add check for logged in user

  return Elections.find({organizationId:orgId},{

  });
});

Meteor.publish('election.private',function(electionId){
  // new SimpleSchema({
  //   orgId: {type: String}
  // }).validate({ params });

  // add check for logged in user

  return Elections.find(electionId,{
    limit:1
  });
});
