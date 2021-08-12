import { Schema, Model } from "mongoose";
const mongoose = require("mongoose");

export const boardSchema: Schema = new Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 100
    },
    desc: {
      type: String,
      required: false,
      trim: true,
      minLength: 2,
      maxlength: 1000
    },
    workspaceId: mongoose.SchemaTypes.ObjectId,
    theme: {
      type: String,
      trim: true,
      required: false,
    },
    lists: {
      type: [{}],
      ref: 'Users',
      required: true
    },
    activities: [{}],
    permissionLevel: {
      type: String,
      required: false,
      trim: true
    },
    createdBy: mongoose.SchemaTypes.ObjectId,
},
{ timestamps: true },
);

/* 
prefs: {permissionLevel: "org", hideVotes: false, voting: "disabled", comments: "members",…}
background: "pink"
backgroundBottomColor: "#CD5A91"
backgroundBrightness: "dark"
backgroundColor: "#CD5A91"
backgroundImage: null
backgroundImageScaled: null
backgroundTile: false
backgroundTopColor: "#CD5A91"
calendarFeedEnabled: false
canBeEnterprise: true
canBeOrg: true
canBePrivate: true
canBePublic: true
canInvite: true
cardAging: "regular"
cardCovers: true
comments: "members"
hideVotes: false
invitations: "members"
isTemplate: false
permissionLevel: "org"


// Lists
closed: false
idBoard: "6115b133bc29ea1d1c59082b"
name: "Test list"
pos: 65535


**** CARDS PAYLOAD *****
cardRole: null
closed: false
dateLastActivity: 1628811938473
idBoard: "6115b133bc29ea1d1c59082b"
idLabels: []
idList: "6115b2462c07607ea4a58648"
idMembers: []
name: "Test card"
pos: 65535
token: "5b5b0d40e4714c75ac3a9bef/u8NYMRzwbiGY4tTnlB3VmOZfRsnTWLEob5YzLG1GMnOsPq9ailclsyBXn3sVaASO"

******* CARDS RESPONSE *****
attachments: []
badges: {attachmentsByType: {trello: {board: 0, card: 0}}, location: false, votes: 0,…}
cardRole: null
checkItemStates: []
closed: false
cover: {idAttachment: null, color: null, idUploadedBackground: null, size: "normal", brightness: "dark",…}
dateLastActivity: "2021-08-12T23:45:38.681Z"
desc: ""
descData: {emoji: {}}
due: null
dueComplete: false
dueReminder: null
email: "uzoamakaanyan+2qoiaxkzi2vexdpmgvj+2wvajmmis08wglt54m2+0f6l6jf49u@boards.trello.com"
id: "6115b2a21e24c156cc9b579a"
idAttachmentCover: null
idBoard: "6115b133bc29ea1d1c59082b"
idChecklists: []
idLabels: []
idList: "6115b2462c07607ea4a58648"
idMembers: []
idMembersVoted: []
idShort: 1
isTemplate: false
labels: []
limits: {}
manualCoverAttachment: false
name: "Test card"
pos: 65535
shortLink: "OdhgKga3"
shortUrl: "https://trello.com/c/OdhgKga3"
start: null
stickers: []
subscribed: false
url: "https://trello.com/c/OdhgKga3/1-test-card"

*/