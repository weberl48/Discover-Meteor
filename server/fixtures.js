// Fixture data
if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var joeId = Meteor.users.insert({
    profile: { name: 'Joe Smith' }
  });
  var joe = Meteor.users.findOne(joeId);
  var janeId = Meteor.users.insert({
    profile: { name: 'Jane Smith' }
  });
  var jane = Meteor.users.findOne(janeId);

  var telescopeId = Posts.insert({
    title: 'Introducing Telescope',
    userId: jane._id,
    author: jane.profile.name,
    url: 'http://janegreif.com/introducing-telescope/',
    submitted: new Date(now - 7 * 3600 * 1000)
  });

  Comments.insert({
    postId: telescopeId,
    userId: joe._id,
    author: joe.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Interesting project jane, can I get involved?'
  });

  Comments.insert({
    postId: telescopeId,
    userId: jane._id,
    author: jane.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'You sure can joe!'
  });

  Posts.insert({
    title: 'Meteor',
    userId: joe._id,
    author: joe.profile.name,
    url: 'http://meteor.com',
    submitted: new Date(now - 10 * 3600 * 1000)
  });

  Posts.insert({
    title: 'The Meteor Book',
    userId: joe._id,
    author: joe.profile.name,
    url: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000)
  });
}
// load up three posts whenever the server starts, as long as the Posts collection is empty:
