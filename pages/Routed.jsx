var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route =  ReactRouter.Route;
var Page = require("../components/Page.jsx");

// get all the sections, and generate <Route> objects for each.
var sections = require("../components/sections");
var generateSingleSection = require("./generateSingleSection");
var pageIDs = Object.keys(sections);

// mind you, "preface" is our root page, so we take it out before generating named routes.
pageIDs.splice(pageIDs.indexOf("preface"), 1);

// Then we generate each page's <Route>
var pages = [
  <Route path="/" component={generateSingleSection("preface")} key="preface"/>
].concat(
  pageIDs.map(id => <Route path={id} component={generateSingleSection(id)} key={id}/>)
);

// And finally, the full app's route set.
var RouteSet = <Router>{pages}</Router>;

// Done, let's run this thing.
var ReactDOM = require('react-dom');
ReactDOM.render(RouteSet, document.getElementById("article"));
