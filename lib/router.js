Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() { return Meteor.subscribe('posts'); }
})
//waitOn : for every route on the site subscribe to posts
Router.route('/', {name: 'postsList'})
// told the router to use the layout template we just created as the default layout for all routes.
//
// Second, we've defined a new route named postsList and mapped it to the root / path.
