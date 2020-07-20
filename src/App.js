import React from 'react';
import {BrowserRouter, Router, Switch, Route, Link} from "react-router-dom";
import AddTemplate from "./components/add-template.component";
import Template from "./components/Template";
import Preview from "./components/Preview";
import Customer from "./components/Customer";
import TemplateList from "./components/TemplateList"; 
import CustomerList from "./components/CustomerList"; 

import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/"><img className="logo" alt="logo" src="../logo.png"></img></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                  <li className="nav-item">
                      <Link to={"/templates"} className="nav-link">Templates</Link>
                  </li>
                  <li className="nav-item">
                      <Link to={"/add"} className="nav-link">Add</Link>
                  </li>
                  <li className="nav-item">
                      <Link to={"/customers"} className="nav-link">Customers</Link>
                  </li>
                  {/* <li className="nav-item">
                      <Link to={"/preview"} className="nav-link">Preview</Link>
                  </li> */}
              </ul>
          </div>
      </nav>
      <div id="mainContainer" className="container mt-3">
        <Switch>
          <Route exact path={["/", "/templates"]} component={TemplateList} />
          <Route exact path="/add" component={AddTemplate} />
          <Route path="/templates/:id" component={Template} />
          <Route exact path={["/", "/customers"]} component={CustomerList} />
          <Route path="/customers/:id" component={Customer} />
          <Route path="/preview/:id" component={Preview} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
