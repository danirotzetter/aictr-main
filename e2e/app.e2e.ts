import { EducontrolMainPage } from './app.po';

describe('educontrol-main App', function() {
  let page: EducontrolMainPage;

  beforeEach(() => {
    page = new EducontrolMainPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('educontrol-main works!');
  });
});
