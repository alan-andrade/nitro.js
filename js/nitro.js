(function () {
  var nitro = window.nitro = {};

  nitro.config = {
    menu: 'body'
  };

  var Route = nitro.Route = function (url, handler) {
    this.url = url;
    this.handler = handler;
    this.matcher = (function () {
      var hasWildcard = /\*$/.test(url),
          matcher_string = '^' + url;

      if (!hasWildcard) {
        matcher_string = matcher_string + '$';
      }

      return new RegExp(matcher_string);
    })();
  };


  var Routes = nitro.Routes = function (routes) {
    Routes._routeSet = $.map(routes, function (handler, url) {
      return new Route(url, handler);
    });
  };

  Routes.match = function (url) {
    $.each(this._routeSet, function (_, route) {
      if (route.matcher.test(url)) {
        route.handler.call(this, Menu);
        return false;
      }
    });
  };

  nitro.goTo = function (path) {
    if (!nitro.isStarted) {
      nitro.start();
    }

    Routes.match(path);
  };

  nitro.start = function () {
    nitro.isStarted = true;
    Menu.attach();
  };

  var Menu = nitro.Menu = $('<div/>', {
    id: 'nitro-menu'
  });

  Menu.attach = function () {
    Menu.appendTo($(nitro.config.menu));
  };
})();
