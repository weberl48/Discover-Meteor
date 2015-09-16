Template.postItem.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }

});
// takes a URL and returns its domain (Magic)
// {{#each}} tags, each post is assigned to this successively, and that extends all the way inside the included template's manager (post_item.js).
