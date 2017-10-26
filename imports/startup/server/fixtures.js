// import variables from packages here

import { Meteor } from 'meteor/meteor';

// import collections here

import { Organizations } from '../../api/organizations/organizations.js';
import { Elections } from '../../api/elections/elections.js';

// define database fixtures here

Meteor.startup(function(){
  console.log("adding fixtures!");

  if (Organizations.find().count() === 0 ){
    console.log('organization count is 0');
    const data = [
      {
        name: "DI High Election Commission",
        country: "USA",
        status: "active",
        latLong: [38.986129,-77.094938]
      }
    ]

    data.forEach((org) => {
      Organizations.insert(org)
    });
  }
  else{
    console.log('organization count is: ', Organizations.find().count());
    const orgs = Organizations.find({}).fetch();
    console.log(orgs);
  }

  if(Elections.find().count() === 0){
    console.log('election count is 0');
    const data = [
      {
        name: "Test Presidential Election 2016",
        orgName: "DI High Election Commission",
        electionType: "Presidential",
        electionDate: new Date("October 10, 2016"),
        pollsOpen: 830,
        pollsClose: 1830,
        registeredVoters: 100
      }
    ];

    data.forEach((election) => {
      const orgId = Organizations.findOne({name:election.orgName})._id;
      console.log('adding election for: ',orgId);
      election.organizationId = orgId;
      Elections.insert(_.omit(election,'orgName'));
    });
  }
  else{
    console.log('election count is: ', Elections.find().count());
    const elecs = Elections.find({}).fetch();
    console.log(elecs);
  }
});
