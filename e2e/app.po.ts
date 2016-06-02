export class AictrMainPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('aictr-main-app h1')).getText();
  }
}
