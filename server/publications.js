Meteor.publish('posts', function() {
  return Posts.find();
});
// Meteor.publish() returns a cursor referencing all posts
