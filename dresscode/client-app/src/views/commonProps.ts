import { IPoll } from "../app/models/poll";

export interface DiscoverProps {
  path: string;
}

export interface PollComponentProps {
  poll: IPoll;
}

export interface DetailsProps {
  slug: string;
  path: string;
}
