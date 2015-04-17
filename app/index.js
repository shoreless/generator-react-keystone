'use strict';

var util   = require('util');
var path   = require('path');
var _      = require('lodash');
var utils  = require('keystone-utils');
var colors = require('colors');
var yeoman = require('yeoman-generator');


var KeystoneGenerator = module.exports = function KeystoneGenerator(args, options, config) {

  // Set utils for use in templates
  this.utils = utils;

  // Initialise default values
  this.cloudinaryURL = false;
  this.mandrillAPI = false;

  // Apply the Base Generator
  yeoman.generators.Base.apply(this, arguments);

  console.log('\nWelcome to KeystoneJS.\n');

  // This callback is fired when the generator has completed,
  // and includes instructions on what to do next.
  var done = _.bind(function done() {
    var cmd = (this.newDirectory ? '"cd ' + utils.slug(this.projectName) + '" then ' : '') + '"node keystone"';
    console.log(
      '\n------------------------------------------------\n' +
      '\nYour KeystoneJS project is ready to go!\n' +
      '\nFor help getting started, visit http://keystonejs.com/guide' +

      ((this.usingTestMandrillAPI) ?
        '\n\nWe\'ve included a test Mandrill API Key, which will simulate email' +
        '\nsending but not actually send emails. Please replace it with your own' +
        '\nwhen you are ready.'
        : '') +

      ((this.usingDemoCloudinaryAccount) ?
        '\n\nWe\'ve included a demo Cloudinary Account, which is reset daily.' +
        '\nPlease configure your own account or use the LocalImage field instead' +
        '\nbefore sending your site live.'
        : '') +

      '\n\nTo start your new website, run ' + cmd + '.' +
      '\n');

  }, this);

  // Install Dependencies when done
  this.on('end', function () {

    this.installDependencies({
      bower: true,
      skipMessage: true,
      skipInstall: options['skip-install'],
      callback: done
    });

  });

  // Import Package.json
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

};

// Extends the Base Generator
util.inherits(KeystoneGenerator, yeoman.generators.Base);

KeystoneGenerator.prototype.prompts = function prompts() {

  var cb = this.async();

  var prompts = {

    project: [
      {
        name: 'projectName',
        message: 'What is the name of your project?',
        default: 'My Site'
      }, {
        name: 'userModel',
        message: 'What would you like to call the User model?',
        default: 'User'
      }, {
        name: 'adminLogin',
        message: 'Enter an email address for the first Admin user:',
        default: 'user@keystonejs.com'
      }, {
        name: 'adminPassword',
        message: 'Enter a password for the first Admin user:',
        default: 'admin'
      }, {
        type: 'confirm',
        name: 'newDirectory',
        message: 'Would you like to create a new directory for your project?',
        default: true
      }
    ],

    config: []

  };

  this.prompt(prompts.project, function(props) {

    _.each(props, function(val, key) {
      this[key] = val;
    }, this);

    // Keep an unescaped version of the project name
    this._projectName = this.projectName;

    // ... then escape it for use in strings (most cases)
    this.projectName   = utils.escapeString(this.projectName);
    this.adminLogin    = utils.escapeString(this.adminLogin);
    this.adminPassword = utils.escapeString(this.adminPassword);

    // Clean the userModel name
    this.userModel     = utils.camelcase(this.userModel, false);
    this.userModelPath = utils.keyToPath(this.userModel, true);

    // Create the directory if required
    if (this.newDirectory) {
      this.destinationRoot(utils.slug(this.projectName));
    }

    // TODO: configs for Mandrill and Cloudinary
    // Additional prompts may be required, based on selections
    // if (this.includeBlog || this.includeGallery || this.includeEmail) {
    //  if (this.includeEmail) {
    //    prompts.config.push({
    //      name: 'mandrillAPI',
    //      message: '------------------------------------------------' +
    //        '\n    Please enter your Mandrill API Key (optional).' +
    //        '\n    See http://keystonejs.com/guide/config/#mandrill for more info.' +
    //        '\n    ' +
    //        '\n    You can skip this for now (we\'ll include a test key instead)' +
    //        '\n    ' +
    //        '\n    Your Mandrill API Key:'
    //    });
    //  }

    //  if (this.includeBlog || this.includeGallery) {
    //    prompts.config.push({
    //      name: 'cloudinaryURL',
    //      message: '------------------------------------------------' +
    //        '\n    KeystoneJS integrates with Cloudinary for image upload, resizing and' +
    //        '\n    hosting. See http://keystonejs.com/docs/configuration/#services-cloudinary for more info.' +
    //        '\n    ' +
    //        '\n    CloudinaryImage fields are used by the ' + blog_gallery + '.' +
    //        '\n    ' +
    //        '\n    You can skip this for now (we\'ll include demo account details)' +
    //        '\n    ' +
    //        '\n    Please enter your Cloudinary URL:'
    //    });

    //  }

    // }

    if (!prompts.config.length) {
      return cb();
    }

    this.prompt(prompts.config, function(props) {

      _.each(props, function(val, key) {
        this[key] = val;
      }, this);

      // if (this.includeEmail && !this.mandrillAPI) {
      //  this.usingTestMandrillAPI = true;
      //  this.mandrillAPI = 'NY8RRKyv1Bure9bdP8-TOQ';
      // }

      // if (!this.cloudinaryURL && (this.includeBlog || this.includeGallery)) {
      //  this.usingDemoCloudinaryAccount = true;
      //  this.cloudinaryURL = 'cloudinary://333779167276662:_8jbSi9FB3sWYrfimcl8VKh34rI@keystone-demo';
      // }

      cb();

    }.bind(this));

  }.bind(this));

};


/*
 * Prompt to include guide comments
*/
KeystoneGenerator.prototype.guideComments = function() {

  var cb = this.async();

  this.prompt([
    {
      type: 'confirm',
      name: 'includeGuideComments',
      message: '------------------------------------------------' +
        '\n    Finally, would you like to include extra code comments in' +
        '\n    your project? If you\'re new to Keystone, these may be helpful.',
      default: true
    }
  ], function(props) {

    this.includeGuideComments = props.includeGuideComments;
    cb();

  }.bind(this));

};


/*
 * Key generator
*/
KeystoneGenerator.prototype.keys = function keys() {
  var cookieSecretChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$%^&*()-=_+[]{}|;:",./<>?`~';
  this.cookieSecret     = utils.randomString(64, cookieSecretChars);
};


/*
 * Create the project files
*/
KeystoneGenerator.prototype.project = function project() {

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_env', '.env');
  this.template('_jshintrc', '.jshintrc');

  this.template('_keystone.js', 'keystone.js');

  this.copy('Dockerfile');
  this.copy('dockerignore', '.dockerignore');

  this.copy('gulpfile.js');
  this.copy('webpack.config.js');
  this.copy('webpack-dev.config.js');

  this.copy('editorconfig', '.editorconfig');
  this.copy('eslintrc', '.eslintrc');
  this.copy('gitignore', '.gitignore');
  
};


/*
 * Builds the model files based on handlebars tempates and values from the prompts
*/
KeystoneGenerator.prototype.models = function models() {

  var modelFiles = ['Post', 'PostCategory'];

  this.mkdir('models');
  this.template('models/_User.js', 'models/' + this.userModel + '.js');

  modelFiles.forEach(function(i) {
    this.template('models/' + i + '.js');
  }, this);

};


/*
 * Create the route files
*/
KeystoneGenerator.prototype.routes = function routes() {

  // Create react routes file
  this.copy('templates/default-react/routes.jsx', 'app/routes.jsx');

  this.mkdir('routes');
  this.template('routes/_index.js', 'routes/index.js');

  this.mkdir('routes/api');
  this.copy('routes/api/index.js', 'routes/api/index.js');

};


/*
 * Create the app files and hierarchy
*/
KeystoneGenerator.prototype.templates = function templates() {

  this.mkdir('app');
  this.mkdir('app/utils');
  this.mkdir('app/mixins');

  this.mkdir('app/actions');
  this.copy('templates/default-react/actions/AppDataActionCreators.js', 'app/actions/AppDataActionCreators.js');

  this.mkdir('app/constants');
  this.copy('templates/default-react/constants/AppConstants.js', 'app/constants/AppConstants.js');

  this.mkdir('app/components');

  this.mkdir('app/dispatcher');
  this.copy('templates/default-react/dispatcher/AppDispatcher.js', 'app/dispatcher/AppDispatcher.js');

  this.mkdir('app/stores');
  this.copy('templates/default-react/stores/PostStore.js', 'app/stores/PostStore.js');

  this.mkdir('app/views');
  this.copy('templates/default-react/views/index.jsx', 'app/views/index.jsx');

  this.mkdir('app/styles');
  this.copy('templates/default-style/site.scss', 'app/styles/site.scss');
  this.copy('templates/default-style/variables.scss', 'app/styles/variables.scss');


  this.copy('templates/default-react/app.jsx', 'app/app.jsx');
  this.copy('templates/default-react/html.jsx', 'app/html.jsx');   // the server html wrap
  this.copy('templates/default-react/client.jsx', 'app/client.jsx');   // the client initializer

};


/*
 * Copy the updates directory
*/
KeystoneGenerator.prototype.updates = function updates () {
  this.directory('updates');
};


/*
 * Copy the asset files
*/
KeystoneGenerator.prototype.files = function files() {
  this.directory('assets/fonts');
  this.directory('assets/images');
  this.copy('assets/favicon.ico');
};
