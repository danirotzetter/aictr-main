import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { AictrMainAppComponent } from '../app/aictr-main.component';

beforeEachProviders(() => [AictrMainAppComponent]);

describe('App: AictrMain', () => {
  it('should create the app',
      inject([AictrMainAppComponent], (app: AictrMainAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'aictr-main works!\'',
      inject([AictrMainAppComponent], (app: AictrMainAppComponent) => {
    expect(app.title).toEqual('aictr-main works!');
  }));
});
