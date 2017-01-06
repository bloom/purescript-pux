'use strict';

// module Pux.Html.Events

/* This is so that we can distinguish between pux-wrapped handlers
and handlers that didn't come from Pux. If a 3rd party component
is being wrapped, and specifies defaultProps that are functions,
we need to be able to tell them apart from pux-generated functions */
var mkPuxHandler = function (handler) {
  handler.isPuxEventHandlerWrapper = true
  return handler
}

exports.handler = function (key, action) {
  return [key, mkPuxHandler(function (input, parentAction) {
    return function (ev) {
      if ((key === 'onSubmit')
      || (key === 'onClick' && ev.currentTarget.nodeName.toLowerCase() === 'a')) {
        ev.preventDefault();
      }
      input(parentAction(action(ev)))();
    };
  })];
};

exports.onKeyHandler = function (keyName, action) {
  return ["onKeyUp", mkPuxHandler(function (input, parentAction) {
    return function (ev) {
      if (ev.key.toLowerCase() === keyName.toLowerCase()) {
        input(parentAction(action(ev)))();
      }
    };
  })];
};
