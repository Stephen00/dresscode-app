import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "./container.css";

import Article from "../../views/article-page/article-page";
import Quiz from "../../views/quiz-page/quiz-page";
import DiscoverArticle from "../../views/discover-article-page/discover-article-page";
import DiscoverQuiz from "../../views/discover-quiz-page/discover-quiz-page";
import DiscoverPoll from "../../views/discover-poll-page/discover-poll-page";
import Discover from "../../views/discover-page/discover-page";
import Error404Page from "../../views/error-404-page/error-404-page"
import Home from "../../views/home-page/home-page";
import More from "../../views/more-page/more-page";
import People from "../../views/people-page/people-page";

const AppContainer = () => {
  return (
    <Container className="body-container">
      <Switch>
        <Route exact path="/">
          <Redirect to="/latest" />
        </Route>
        <Route path="/latest" component={Home} />
        <Route path="/discover/articles" component={DiscoverArticle} />
        <Route path="/article/:slug" component={Article} />
        <Route path="/discover/quizzes" component={DiscoverQuiz} />
        <Route path="/quiz/:slug" component={Quiz} />
        <Route path="/discover/polls" component={DiscoverPoll} />
        <Route path="/more" component={More} />
        <Route path="/discover" component={Discover} />
        <Route path="/people" component={People} />
        <Route path="*" component={Error404Page} />
      </Switch>
    </Container>
  );
};

export default AppContainer;
