export interface Notification {
  token: string;
  topics: {
    am: boolean;
    pm: boolean;
  }
}
