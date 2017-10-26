// Elections

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

if(Meteor.isServer){
  import { Restivus } from 'meteor/nimble:restivus';
}

// other collections depended on

import { Organizations } from '../organizations/organizations.js';

// collection and schema

export const Elections = new Mongo.Collection('elections');

let electionSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Election Name"
  },
  electionType: {
    type: String,
    label: "Election Type"
  },
  electionDate: {
    type: Date,
    label: "Election Date"
  },
  pollsOpen: {
    type: Number, // 24-hour time without : (e.g., 800, 1500, 1730)
    label: "Poll Opening Time"
  },
  pollsClose: {
    type: Number, // 24-hour time without : (e.g., 800, 1500, 1730)
    label: "Poll Closing Time"
  },
  organizationId: {
    type: String,
    label: "Organization ID for Election"
  },
  stations: {
    type: [String], // array of stationIds
    optional:true,
    label: "Station IDs for Stations Included in this Election"
  },
  registeredVoters: {
    type: Number,
    optional:true,
    label: "Number of Registered Voters for this Election"
  }
});

Elections.attachSchema(electionSchema);

// collection hooks


// collection API
