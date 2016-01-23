var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route =  ReactRouter.Route;

var Page = require("../../components/Page.jsx");

// get all the sections, and generate <Route> objects for each.
var sections = require("../../components/sections");
var generateSingleSection = require("./generateSingleSection");
var pageIDs = Object.keys(sections);

// Then we generate each page's <Route>
var rootComponent = generateSingleSection(false);
var root = <Route path={'/'} component={rootComponent} key={'/'}/>;
var pages = [root].concat(
  pageIDs.map(id => {
    <Route path={id} component={generateSingleSection(id)} key={id}/>
  })
);

// And finally, the full app's route set, set to use "URL" rather than "hash" navigation.
// var createBrowserHistory = require('history/lib/createBrowserHistory');
// var history = createBrowserHistory();
module.exports = {
  sections: sections,
  paths: pageIDs,
  routes: pages,
  rootComponent: rootComponent,
  RouteSet: <Router>{pages}</Router>
};
