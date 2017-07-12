import { ProjmPage } from './app.po';

describe('projm App', () => {
  let page: ProjmPage;

  beforeEach(() => {
    page = new ProjmPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
