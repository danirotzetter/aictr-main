import { AictrMainPage } from './app.po';

describe('aictr-main App', function() {
  let page: AictrMainPage;

  beforeEach(() => {
    page = new AictrMainPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('aictr-main works!');
  });
});
