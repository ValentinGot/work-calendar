import { WorkCalendarNewPage } from './app.po';

describe('work-calendar-new App', () => {
  let page: WorkCalendarNewPage;

  beforeEach(() => {
    page = new WorkCalendarNewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
