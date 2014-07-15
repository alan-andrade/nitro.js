nitro.Routes({
  '/app/v5/personalization/*': function (menu) {
    menu.text('Solve');
  }
});

$(function () {
  nitro.goTo(window.location.pathname);
});
