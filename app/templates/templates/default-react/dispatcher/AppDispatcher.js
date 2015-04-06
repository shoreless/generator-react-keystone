const Dispatcher   = require('flux').Dispatcher;
const AppConstants = require('../constants/AppConstants');
const assign       = require('object-assign');

/* Dispatcher constants */
const PayloadSources = AppConstants.PayloadSources;


const AppDispatcher = assign(new Dispatcher(), {
  handleServerAction: function (action) {
    let payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleViewAction: function (action) {
    let payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = AppDispatcher;