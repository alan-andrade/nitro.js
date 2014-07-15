//Append menu to the very top of the page.
//var $menu = $('<div>'),
    //$createAccount = $('<a href="#">').text('Create account');

//$menu.css({
  //position: 'absolute',
  //top: 0,
  //left: 10,
  //'z-index': 9999,
  //padding: 10,
  //background: '#eee'
//});

//$createAccount.appendTo($menu);

//var routes = {
  //'app/v5/personalization/*': function () {
    //$menu.appendTo($('body'));
    //$createAccount.bind('click', createAccount);
  //},

  //'/': function () {
    //alert('homepage');
  //}
//};

//$.each(routes, function (url, handler) {
  //var route = new RegExp(url);
  //if (route.test(window.location.pathname)) {
    //handler.call();
    //return false;
  //}
//});

//function createAccount(e) {
  //e.preventDefault();
  //$('a[event_tracking_cta_id]')[0].click();
//}

(function () {
  var nitro = window.nitro = {};

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
    this.routeSet = $.map(routes, function (handler, url) {
      return new Route(url, handler);
    });
  };

  Routes.prototype.match = function (url) {
    $.each(this.routeSet, function (_, route) {
      if (route.matcher.test(url)) {
        route.handler.call();
        return false;
      }
    });
  };

})();
