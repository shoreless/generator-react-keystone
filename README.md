# React-Keystone Generator

This [Yeoman](http://yeoman.io) generator scaffolds an isomorpic [ReactJS](https://facebook.github.io/react/) and [KeystoneJS](http://keystonejs.com) project. 

The goal of this project is to follow ReactJS best practice to saffold well performing isomorpic web app that is easy to get started with and extend.

To do this I've combined
- [Flux](https://github.com/facebook/flux)
- [ImmutableJS](https://github.com/facebook/immutable-js)
- [ReactRouter](https://github.com/rackt/react-router)
- [Babel](https://babeljs.io/)
- [Webpack](https://github.com/webpack/webpack)

Also important: webpack-dev-server, webpack hot module replacement, SASS, autoprefixer, gulp, normalize (the sass version)


## Quick start

You will need:
- Node.js >= 0.10.x
- MongoDB >= 2.4.x
- Yeoman 

If you don't have Node or MongoDB intalled, you can follow [the instructions of the keystone generator](https://github.com/keystonejs/generator-keystone)

`yo react-keystone` will scaffold a new project for you.

`gulp dev` will start the webpack-dev-server which hosts the style and js of the front-end app (with hot-module-replacement)

`node keystone.js` will start the backend server

`npm start` will run `gulp dev` and `node --harmony keystone.js` at the same time, but this makes it difficult to see logs

`npm build` or `gulp webpack` will build your front-end app and styles into dist/ minified


## Things to know

The frontend app initialises in the browser through client.jsx, which renders app.jsx

The backend wraps html.jsx around the rendered app.jsx, and attaches the initial state in a script-tag

Webpack builds extracts the styles based on `require('./component.scss')` calls in the component chain of client.jsx. This means that you should write styles that can be loaded out of order.

Note: This is a generator I set up for myself to allow me to scaffold new projects quickly, I want to keep developing it as I figure out better ways of doing things. Feel free to contribute.


### Improvement

Here's a list of improvements I'm going to implement:
- This is the first time I've used webpack to build by stylesheets, so improvements must exist. 
- React 0.13.x: Currently React 0.13.x breaks something due to upgrading React Router. This upgrade will be done soon
- License



## License

This needs to be worked out properly..

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
