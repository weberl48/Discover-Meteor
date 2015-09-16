Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate:'loading',
  waitOn: function() { return Meteor.subscribe('posts'); }
})
//waitOn : for every route on the site subscribe to posts
Router.route('/', {name: 'postsList'})
Router.route('/posts/:_id', {
  name: 'postPage',
  data: function() { return Posts.findOne(this.params._id); }
});

// told the router to use the layout template we just created as the default layout for all routes.
//
// Second, we've defined a new route named postsList and mapped it to the root / path.

//get the proper data context by looking for our post based on the _id we got from the URL
