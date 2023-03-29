export interface Participation {
  team_name?: string;
  team_member_1?: string /* foreign key to users.email */;
  team_member_2?: string /* foreign key to users.email */;
  team_member_3?: string /* foreign key to users.email */;
  team_member_4?: string /* foreign key to users.email */;
  team_member_5?: string /* foreign key to users.email */;
  event_id: number /* foreign key to events.id */;
  transaction_id?: string;
  transaction_verified?: boolean;
  team_member_0?: string /* foreign key to users.email */;
  id: string /* primary key */;
  registered_by: string /* foreign key to users.email */;
  registration_cancelled?: boolean /* whether participant has cancelled registration */;
  valorant_id?: string[];
  events?: {
    id: number;
    name: string;
    poster_image: string;
    fees: number;
  } /* join with events table through event id */;
}
