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
##Spacebars
- meteors templating system,
- html with addition of inclusions, expressions and block helpers.
- inclusion: {{> templateName}}, tells meteor to replace the {{> inclusion}} with the template whos name corresponds.

- Expressions: {{title}},call a property of the current object, or the return value of a template helper as defined in the current template's manager

- Block Helpers: tags which control the flow of the template. {{#each }} {{/each}} {{#if}}{{/if}}
#Chp 3 Templates
Template Helpers:
  - Meteor keeps templates and their logic separated
  - in order to come to like a template needs helpers
  - prepare raw data
  - similar to controllers but have a slightly different role
  - while the template's role is limited to displaying or looping over variables, the helpers are the one who actually do the heavy lifting by assigning a value to each variable.

- the {{#each}} block helper not only iterates, it also sets the value of "this" inside the block to the iterated object.

#Chp 4 Collections
Collection:
  - core feature of meteor is the automatic synchronisation of data between client and server.
  - collection is a special data structure that takes care of storing your data in MongoDB
  - synchronising data with each connected user's browser in real time
  - place collection in lib directory to make sure they are defined first

Storing Data:
  - Browser Memory: data local to the current browser tab, not permanent (Javascript Variables)

  - Browser Storage: cookies or local storage. local to current user but available across all tabs

  - Server-side database: stores permanent data. Available to more than one user

  Client & Server:
    - code not place inside client or server folders will run in both contexts.
    - collections are available to both client and server
    - server side collection has the job of talking to the MongoDB database
    - client side collection is a copy of a subset of the real, canonical collection.   
  Server-Side Collections:
    - acts as an API into MongoDB
    - write Mongo commands like Collection.insert()


  Mongo:
    - sccess your deployed app's Mongo shell with "meteor mongo myApp".

  Client-Side Collections:
    - Posts = new Mongo.Collection('posts') client side is a local, in-browser cache of the real Mongo collection.
    - cache is a subset of data for quick access
    - documents stored in browser Memory

    MiniMongo:
      - Meteor's client-side Mongo implementation

  Flow:
    server-side collection was informed by a client collection of a new post, and took on the task of distributing that post into the Mongo database and back out to all the other connected post collections.
