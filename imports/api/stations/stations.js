// Stations

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

if(Meteor.isServer){
  import { Restivus } from 'meteor/nimble:restivus';
}

// collection and schema

export const Stations = new Mongo.Collection('stations');

let stationSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Polling Station Name"
  },
  latLong: {
    type: [Number],
    label: "Array of latitude, longitude for Polling Station",
    decimal: true
  },
  organizationId: {
    type: String,
    label: "Organization ID for Polling Station"
  }
});

Stations.attachSchema(stationSchema);


// collection hooks




// collection API
