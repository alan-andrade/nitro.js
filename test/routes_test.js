module('Routes', {
  setup: function () {
    this.routes = new nitro.Routes({
      '/foo/*' : function () { ok(true, 'Foo handler is used'); },
      '/' : function () { ok(true, 'Global handler is used'); }
    });
  }
});

asyncTest('matches wildcard routes', function () {
  expect(2);
  this.routes.match('/foo');
  this.routes.match('/foo/zas');
  this.routes.match('/hommie/foo/zas');
  start();
});

asyncTest('matches the root path without conflicts', function () {
  expect(1);
  this.routes.match('/');
  this.routes.match('/a');
  this.routes.match('/conflict/');
  start();
});
