function enrich(element) {
  if (!element) return element;

  element.__listeners = {};

  element.listen = function (evtNames, handler) {
    if (!evtNames.map) evtNames = [evtNames];
    evtNames.forEach((evtName) => {
      element.addEventListener(evtName, handler);
      if (!element.__listeners[evtName]) {
        element.__listeners[evtName] = [];
      }
      element.__listeners[evtName].push(handler);
    });
  }.bind(element);

  element.ignore = function (evtNames, handler) {
    if (!evtNames.map) evtNames = [evtNames];
    evtNames.forEach((evtName) => {
      if (!handler) {
        return element.__listeners[evtName].forEach((h) =>
          element.removeEventListener(evtName, h)
        );
      }
      element.removeEventListener(evtName, handler);
    });
  }.bind(element);

  return element;
}

export { enrich };
