import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

if(Meteor.isServer){
  import { Restivus } from 'meteor/nimble:restivus';
}

// collection and schema

export const BotLog = new Mongo.Collection('botlog');

let dataSchema = new SimpleSchema({ // add collection hooks to insert stationId, electionId, and organizationId before saving and timestamp of being saved to collection
  action: {
    type: String,
    label: "Action being logged"
  },
  actionBy: {
    type: String,
    label: "ID of user making change"
  },
  loggedAt: {
    type: Date,
    label: "Date/Time action logged"
  },
  stationId: {
    type: String,
    label: "ID of current bot station"
  },
  electionId:{
    type: String,
    label: "ID of current bot election"
  },
  botId: {
    type: String,
    label: "ID of bot"
  }
});

BotLog.attachSchema(dataSchema);

// collection hooks




// collection API
