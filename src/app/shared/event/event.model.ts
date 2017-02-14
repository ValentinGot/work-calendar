export interface Event {
  id?: number,
  title: string,
  start: string,
  end?: string,
  color?: string,
  comment?: string
}

export const EventColors = {
  AM: '#ED7F68',
  PM: '#86D286'
};
