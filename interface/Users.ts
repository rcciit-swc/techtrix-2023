export interface Users {
  id: string /* primary key */;
  email?: string;
  name?: string;
  role: string;
  phone?: string;
  college?: string;
  year?: string;
  coordinating_event_id?: number;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {}; // The data expected to be returned from a "select" statement.
        Insert: {}; // The data expected passed to an "insert" statement.
        Update: {}; // The data expected passed to an "update" statement.
      };
    };
  };
}
