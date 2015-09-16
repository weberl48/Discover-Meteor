Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('posts'), Meteor.subscribe('notifications')]
  }
});

  //waitOn : for every route on the site subscribe to posts and comments
Router.route('/', {
  name: 'postsList'
})

Router.route('/posts/:_id', {
  name: 'postPage',
  waitOn: function() {
    return Meteor.subscribe('comments', this.params._id);
  },
  data: function() {
    return Posts.findOne(this.params._id);
  }
});
Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  data: function() { return Posts.findOne(this.params._id); }
});
Router.route('/submit', {
  name: 'postSubmit'
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}
Router.onBeforeAction('dataNotFound', {
  only: 'postPage'
});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
// told the router to use the layout template we just created as the default layout for all routes.
//
// Second, we've defined a new route named postsList and mapped it to the root / path.

//get the proper data context by looking for our post based on the _id we got from the URL
