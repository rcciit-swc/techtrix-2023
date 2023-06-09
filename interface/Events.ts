import { Event_categories } from "./EventCategories";
import { Users } from "./Users";

export interface Events {
  id: number /* primary key */;
  name: string;
  type: string;
  team_size: number;
  rules_regulations: string;
  is_open: boolean;
  poster_image?: string;
  category?: string /* foreign key to event_categories.name */;
  details?: string;
  min_team_size: number;
  event_categories?: Event_categories;
  multiple_registrations_allowed?: boolean;
  events?: number;
  fees: number;
  users?: Users;
}
