import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "./poll-page.css";
import DetailsLayout from "../../features/details-layout/details-layout";
import { DetailsProps } from "../commonProps";

const PollPage: React.FC<RouteComponentProps<DetailsProps>> = ({ match }) => {
  return <DetailsLayout slug={match.params.slug} path={match.path} />;
};

export default observer(PollPage);
