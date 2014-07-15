nitro.Routes({
  '/app/v5/personalization/*': function (menu) {
    menu.appendLink('Personalization', function () {
      $('#next-button').click();
    });
  }
});

$(function () {
  nitro.goTo(window.location.pathname);
});
