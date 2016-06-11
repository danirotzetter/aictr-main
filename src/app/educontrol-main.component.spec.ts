import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { EducontrolMainAppComponent } from '../app/educontrol-main.component';

beforeEachProviders(() => [EducontrolMainAppComponent]);

describe('App: EducontrolMain', () => {
  it('should create the app',
      inject([EducontrolMainAppComponent], (app: EducontrolMainAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'educontrol-main works!\'',
      inject([EducontrolMainAppComponent], (app: EducontrolMainAppComponent) => {
    expect(app.title).toEqual('educontrol-main works!');
  }));
});
