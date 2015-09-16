Meteor.publish('posts', function() {
  return Posts.find();
});
Meteor.publish('comments', function() {
  return Comments.find();
});
// Meteor.publish() returns a cursor referencing all posts
