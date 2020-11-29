import React, {Component} from 'react';
import { Switch, Route } from "react-router-dom";

import './container.css';

import Article from '../../views/article-page/article-page'
import Discover from '../../views/discover-page/discover-page'
import Home from '../../views/home-page/home-page'
import Latest from '../../views/latest-page/latest-page'
import More from '../../views/more-page/more-page'
import People from '../../views/people-page/people-page'

class Container extends Component {
    render() {
      return (
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/article" component={Article} />
            <Route path="/more" component={More} />
            <Route path="/latest" component={Latest} />
            <Route path="/discover" component={Discover} />
            <Route path="/people" component={People} />
          </Switch>
        </div>
      )
    }
  }

  export default Container