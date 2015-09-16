#Chp 1 Intro
  - code in the /server directory only runs on the server.
  - code in the /client directory only runs on the client.
  - Everything else runs on both the client and server
  - You static assets go in the public directory
  - Files in /lib are loaded before anything else
  - any main.* file is loaded after everything else.
  - everything else loads in alphabetical order based on the file name.
  - in Meteor, the var keyword limits the scope of an object to the current file.

#Chp 2 Getting Started
  - no matter where you put your code meteor will find it and compile it
  - no need to manually write include paths for javascript or css Files
  - <template name="postsList"> postList attribute used by Meteor to keep track of what template goes where
###Spacebars
    - meteors templating system,
    - html with addition of inclusions, expressions and block helpers.
    - inclusion: {{> templateName}}, tells meteor to replace the {{> inclusion}} with the template whos name corresponds.

###Expressions:
  {{title}},call a property of the current object, or the return value of a template helper as defined in the current template's manager

###Block Helpers:
  - tags which control the flow of the template. {{#each }} {{/each}} {{#if}}{{/if}}

#Chp 3 Templates
###Template Helpers:
    - Meteor keeps templates and their logic separated
    - in order to come to like a template needs helpers
    - prepare raw data
    - similar to controllers but have a slightly different role
    - while the template's role is limited to displaying or looping over variables, the helpers are the one who actually do the heavy lifting by assigning a value to each variable.

  - the {{#each}} block helper not only iterates, it also sets the value of "this" inside the block to the iterated object.

#Chp 4 Collections
###Collection:
    - core feature of meteor is the automatic synchronisation of data between client and server.
    - collection is a special data structure that takes care of storing your data in MongoDB
    - synchronising data with each connected user's browser in real time
    - place collection in lib directory to make sure they are defined first

###Storing Data:
    - Browser Memory: data local to the current browser tab, not permanent (Javascript Variables)

    - Browser Storage: cookies or local storage. local to current user but available across all tabs

    - Server-side database: stores permanent data. Available to more than one user
###Client & Server:
    - code not place inside client or server folders will run in both contexts.
    - collections are available to both client and server
    - server side collection has the job of talking to the MongoDB database
    - client side collection is a copy of a subset of the real, canonical collection.   
###Server-Side Collections:
    - acts as an API into MongoDB
    - write Mongo commands like Collection.insert()


###Mongo:
    - sccess your deployed app's Mongo shell with "meteor mongo myApp".

###Client-Side Collections:
    - Posts = new Mongo.Collection('posts') client side is a local, in-browser cache of the real Mongo collection.
    - cache is a subset of data for quick access
    - documents stored in browser Memory
###MiniMongo:
    - Meteor's client-side Mongo implementation

###Flow:
    server-side collection was informed by a client collection of a new post, and took on the task of distributing that post into the Mongo database and back out to all the other connected post collections.

###Find & Fetch:
    - find() returns a cursor, which is a reactive data source.
    - use fetch() on that cursor to transform it into an array .

###Connecting Collections: Publications and Subscriptions
    - autopublish package not intended for production applications
    - autopublish says that each collection should be shared in its entirety to each connected client.
    - "meteor remove autopublish"
#Chp 5 Publications and Subscriptions
  Publications and subscriptions are one of the most fundamental and important concepts in Meteor
## Magic
  - Misunderstandings:
    - Meteor is insecure
    - Meteor apps can't deal with large amounts of data
  - magic is ultimately very useful, it can obscure
  -
###The Olden Days (2011)
####Rails Example:
    - browser sends a request to your app, which is living on the server
    1. app's first job is to figure out what data the user needs to see (bookstore clerk)
    2. app's second job is translating that data into nice, human-readable HTML or JSON (wrapping the book and putting it in a nice bag) View part of MVC
    3. app takes that HTML code and sends it over to the browser
#### Meteor way
    - Rails app only lives on the server, a Meteor app also includes a client-side component that will run on the client(MiniMongo)
    - allows meteor to make database calls from everywhere.
    - instead of sending HTML code to the client, Meteor will send that actual data (data on the wire)
    - access and even modify that data instantaneously
###Publishing
  - a way of telling Meteor which subset of data can be sent to the client
  - a funnel that transfers data from a server-side (source) collection to a client-side (target) collection.
  - protocol used DDP (Distributed Data Protocol).
###Subscribing
  - a way for clients to specify which subset of that data they need at any particular moment
  - subscribed data will be mirrored on the client via MiniMongo
###autopublish
  - by default autopublish package enabled
  - mirroring all data from the server on the client
  - Data is ubiquitous
  - not for production use
### Magic
 - publishCursor() if you return a cursor (i.e. Posts.find({'author':'Tom'})) in a publish function

 publishCursor() does:

  - It checks the name of the server-side collection.

  - It pulls all matching documents from the cursor and sends it into a client-side collection of the same name. (It uses .added() to do this).

  - Whenever a document is added, removed or changed, it sends those changes down to the client-side collection. (It uses .observe() on the cursor and .added(), .changed() and removed() to do this).

#Chp6 Routing
  - http://myapp.com/posts/xyz (where xyz is a MongoDB id identifier)
  - routing to look at what's inside the browser's URL bar and display the right content accordingly.

###Iron Router package
  - conceived specifically for Meteor apps
  - sets up paths and filters( actions to paths)
  - manage subscriptions ( which path has access to data)
  - "meteor add iron:router"
### Vocabulary
  - Routes: set of instructions that tell the app where to go and what to do.
  - Paths: URL within your app, can include query parameters
  - Segments: different parts of a path, deliminator(/)
  - Hooks: actions to perform before, after or during the routing process(checking if the user has the proper rights before displaying a page)
  - Filters: hooks that you define globally for one or more routes.
  - Route Templates: Each route needs to point to a template.
  - Layouts: contain all the HTML code that wraps the current template,
  - Controllers: contain all the common routing logic.

### Mapping URLs To Templates
 - iron router take over what renders inside the <body> tag
 - {{> yield}}
  - dynamic zone that will automatically render whichever template corresponds to the current route

### Named Routes
 - by default Iron Router will look for a template with the same name as the route name
 - will infer name from path
 - Naming routes lets us use Iron Router features for building links inside app
 - {{pathFor}} Spacebars helper returns the URL path component of any route
 - <a class="navbar-brand" href="{{pathFor 'postsList'}}">PostList</a>

###Magic
  - Iron Router comes with a built-in way to delay showing a template until the route calling it is ready, and show a loading template instead
    - Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('posts'); }
});
- wait on the subscription. prevents page from loading until subscription is ready

- spin package: animated loading spinner {{>spinner}}

- wait on your subscriptions, not just for the user experience, but also because it means you can safely assume that data will always be available from within a template.
###Magic
- Reactivity: how does the router know when to redirect the user back to the right page once the data comes through?

### Routing to A Specific Path
  - :id syntax tells the router to match any route of the form /posts/xyz/
  - Second, to put whatever it finds in this “xyz” spot inside an id property in the router's params array.
### Data context
  - By setting a template's data context, you can control the value of "this" inside template helpers.
  - {{#with}} take this object, and apply the following template to it
    - {{#with myWidget}}
        {{> widgetPage}}
      {{/with}}
  - 
