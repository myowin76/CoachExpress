import { CoachExpressPage } from './app.po';

describe('coach-express App', function() {
  let page: CoachExpressPage;

  beforeEach(() => {
    page = new CoachExpressPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
