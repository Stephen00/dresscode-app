import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "./container.css";

import Article from "../../views/article-page/article-page";
import Quiz from "../../views/quiz-page/quiz-page";
import DiscoverArticle from "../../views/discover-article-page/discover-article-page";
import DiscoverQuiz from "../../views/discover-quiz-page/discover-quiz-page";
import DiscoverPoll from "../../views/discover-poll-page/discover-poll-page";
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
        <Route path="/latest" component={Home} />
        <Route path="/article/:slug" component={Article} />
        <Route path="/quiz/:slug" component={Quiz} />
        <Route path="/more" component={More} />
        <Route path="/people" component={People} />
        <Route path="/discover/articles" component={DiscoverArticle} />
        <Route path="/discover/quizzes" component={DiscoverQuiz} />
        <Route path="/discover/polls" component={DiscoverPoll} />
      </Switch>
    </Container>
  );
};

export default withRouter(observer(AppContainer));
