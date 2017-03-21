var React = require("react");
var Locale = require("../lib/locale");
var locale = new Locale();

module.exports = function generateBase(page, handler) {

  // the basic class just has a title and basic content.
  var componentClass = {
    getDefaultProps: function() {
      return {
        title: locale.getTitle(page)
      };
    },

    render: function() {
      return locale.getContent(page, this);
    }
  };

  // if the content requires code bindings, ensure those exist:
  if (handler) {
    Object.keys(handler).forEach(key => {
      componentClass[key] = handler[key];
    });
  }

  // then build the actual React class
  return React.createClass(componentClass);

};
