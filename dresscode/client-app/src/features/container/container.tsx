import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "./container.css";

import Article from "../../views/article-page/article-page";
import Quiz from "../../views/quiz-page/quiz-page";
import DiscoverArticle from "../../views/discover-article-page/discover-article-page";
import DiscoverQuiz from "../../views/discover-quiz-page/discover-quiz-page";
import DiscoverPoll from "../../views/discover-poll-page/discover-poll-page";
import Error404Page from "../../views/error-404-page/error-404-page";
import Home from "../../views/home-page/home-page";
import More from "../../views/more-page/more-page";
import People from "../../views/people-page/people-page";
import { observer } from "mobx-react-lite";

const AppContainer: React.FC = () => {
  return (
    <Container className="body-container">
      <Switch>
        <Route exact path="/">
          <Redirect to="/latest" />
        </Route>
        <Route exact path="/latest" component={Home} />
        <Route exact path="/articles/:slug" component={Article} />
        <Route exact path="/quizzes/:slug" component={Quiz} />
        <Route exact path="/discover/articles" component={DiscoverArticle} />
        <Route exact path="/discover/quizzes" component={DiscoverQuiz} />
        <Route exact path="/discover/polls" component={DiscoverPoll} />

        <Route exact path="/more" component={More} />
        <Route exact path="/people" component={People} />
        <Route component={Error404Page} />
      </Switch>
    </Container>
  );
};

export default observer(AppContainer);
