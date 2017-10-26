// Bot Data

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

if(Meteor.isServer){
  import { Restivus } from 'meteor/nimble:restivus';
}

// collection and schema

export const BotData = new Mongo.Collection('botdata');

let dataSchema = new SimpleSchema({ // add collection hooks to insert stationId, electionId, and organizationId before saving and timestamp of being saved to collection
  type: {
    type: String,
    label: "Type of data"
  },
  recordedBy: {
    type: String,
    label: "Sensor recording the data"
  },
  recordedAt: {
    type: Date,
    label: "Date/Time Data recorded"
  },
  value: {
    type: Number,
    label: "Value of Data",
    optional: true
  },
  botId: {
    type: String
  }
});

BotData.attachSchema(dataSchema);

// collection hooks




// collection API
