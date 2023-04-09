export interface Packages {
  id: number /* primary key */;
  event_id: number[] /* array of event ids */;
  discount: number /* discount amount */;
  details?: string /* details about the package */;
}
