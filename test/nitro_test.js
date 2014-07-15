module('Routes', {
  setup: function () {
    nitro.Routes({
      '/foo/*' : function () { ok(true, 'Foo handler is used'); },
      '/' : function () { ok(true, 'Global handler is used'); }
    });
  }
});

asyncTest('matches wildcard routes', function () {
  expect(2);
  nitro.goTo('/foo');
  nitro.goTo('/foo/zas');
  nitro.goTo('/hommie/foo/zas');
  start();
});

asyncTest('matches the root path without conflicts', function () {
  nitro.goTo('/');
  nitro.goTo('/a');
  nitro.goTo('/conflict/');
  start();
});


module('Menus');

test('attaches a fixed menu at the top', function () {
  ok($('#nitro-menu').length === 0, 'It starts blank');
  nitro.Menu.attach();
  ok($('#nitro-menu').length === 1, 'It appends the menu');
});

asyncTest('its passed as a callback argument', function () {
  nitro.Routes({
    '/home': function (menu) {
      ok(menu, 'menu passed as callback argument');
    }
  });

  nitro.goTo('/home');
  start();
});
