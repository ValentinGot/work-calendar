import { WorkCalendarPage } from './app.po';

describe('work-calendar App', function() {
  let page: WorkCalendarPage;

  beforeEach(() => {
    page = new WorkCalendarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
