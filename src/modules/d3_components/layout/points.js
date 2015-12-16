define(function (require) {
  var d3 = require('d3');

  return function scatter() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var xScale = d3.scale.linear();
    var yScale = d3.scale.linear();
    var radius = d3.functor(5);

    function layout(data) {
      // Merge inner arrays => [[]] to []
      return data.reduce(function (a, b) {
          return a.concat(b);
        }, [])
        .forEach(function (d, i) {
          if (!d.coords) d.coords = {};

          d.coords.cx = X.call(this, d, i);
          d.coords.cy = Y.call(this, d, i);
          d.coords.radius = radius.call(this, d, i);
        });
    }

    function X(d, i) {
      if (typeof xScale.rangeRoundBands === 'function') {
        return xScale(x.call(this, d, i)) + xScale.rangeBand() / 2;
      }
      return xScale(x.call(this, d, i));
    }

    function Y(d, i) {
      return yScale(y.call(this, d, i));
    }

    // Public API
    layout.x = function (_) {
      if (!arguments.length) return x;
      x = d3.functor(_);
      return layout;
    };

    layout.y = function (_) {
      if (!arguments.length) return y;
      y = d3.functor(_);
      return layout;
    };

    layout.radius = function (_) {
      if (!arguments.length) return radius;
      radius = d3.functor(_);
      return layout;
    };

    layout.xScale = function (_) {
      if (!arguments.length) return xScale;
      xScale = typeof _ === 'function' ? _ : xScale;
      return layout;
    };

    layout.yScale = function (_) {
      if (!arguments.length) return yScale;
      yScale = typeof _ === 'function' ? _ : yScale;
      return layout;
    };

    return layout;
  };
});
