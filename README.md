#µBlog
µBlog is a project designed to be a personal twitter.
The main goal of the project is to have a twitter like (But different in terms of purpose, since the personal content of the blog owner is the main focus) interface, with live updates being sent via Websockets to the Client.

The blog should be able to handle code snippets, pictures, video and generally better markdown content than Twitter currently supports.

The scope can be very varied, and the first version will likely not contain the live update feature. The scope can also be varied by including comment sections for posts. These could then also be managed via the live update system.


##Technological Specification
### Server Framework
The server will be build upon Node.js express and socket.io. This is for the two-parted functionality of rest-based communication and websocket based communication.

I have also never done anything in Node previously, so this will be a new challange for me.
### Client Framework
The client framework will be Angular.JS. The framework feels very natural to work with for me, and the small tests I've done, continue to verify this.

For the styling, I've choosen a new framework called Semantic UI. [Semantic UI](http://semantic-ui.com)
### Storage
Storage framework will probably be Sequelize, an ORM built on Node.JS that supports MySQL, PostgreSQL and more.
### Authentication
Authentication will be managed via Oauth, or Oauth2. The comment section will probably be using Facebook credentials or a similar "easy access" service.
### Testing framework
Unit testing will be driven by Jasmine, a behaviour driven testing framework. Karma will be the test-runner, which means a wide variety of tests on browsers can be run.
