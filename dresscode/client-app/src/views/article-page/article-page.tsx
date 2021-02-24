import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "./article-page.css";
import DetailsLayout from "../../features/details-layout/details-layout";
import { DetailsProps } from "../../views/commonProps";

const ArticlePage: React.FC<RouteComponentProps<DetailsProps>> = ({
  match,
}) => {
  return <DetailsLayout slug={match.params.slug} path={match.path} />;
};

export default observer(ArticlePage);
