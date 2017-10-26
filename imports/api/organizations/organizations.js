// Organizations

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

if(Meteor.isServer){
  import { Restivus } from 'meteor/nimble:restivus';
}

// collection and schema

export const Organizations = new Mongo.Collection('organizations');

let organizationSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Organization Name"
  },
  country: {
    type: String,
    label: "Organization Country"
  },
  status: {
    type: String,
    label: "Organization Status",
    allowedValues: ["active","inactive"]
  },
  latLong: {
    type: [Number],
    label: "LatLong of Organization Main Office/Location",
    decimal: true
  }
});

Organizations.attachSchema(organizationSchema);

// collection hooks




// collection API
