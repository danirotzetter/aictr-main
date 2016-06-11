export class EducontrolMainPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('educontrol-main-app h1')).getText();
  }
}
