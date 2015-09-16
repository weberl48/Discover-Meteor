- code in the /server directory only runs on the server.
- code in the /client directory only runs on the client.
- Everything else runs on both the client and server
- You static assets go in the public directory
- Files in /lib are loaded before anything else
- any main.* file is loaded after everything else.
- everything else loads in alphabetical order based on the file name.

#chp2
- no matter where you put your code meteor will find it and compile it
- no need to manually write include paths for javascript or css Files
- <template name="postsList"> postList attribute used by Meteor to keep track of what template goes where
##Spacebars
- meteors templating system,
- html with addition of inclusions, expressions and block helpers.
- inclusion: {{> templateName}}, tells meteor to replace the {{> inclusion}} with the template whos name corresponds.

- Expressions: {{title}},call a property of the current object, or the return value of a template helper as defined in the current template's manager

- Block Helpers: tags which control the flow of the template. {{#each }} {{/each}} {{#if}}{{/if}}

Template Helpers:
  - Meteor keeps templates and their logic separated
  - in order to come to like a template needs helpers
  - prepare raw data
  - while the template's role is limited to displaying or looping over variables, the helpers are the one who actually do the heavy lifting by assigning a value to each variable.
