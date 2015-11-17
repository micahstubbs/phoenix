define(function (require) {
  var d3 = require('d3');

  return function text() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var dx = function (d) { return d.dx || 0; };
    var dy = function (d) { return d.dy || 0; };
    var transform = null;
    var cssClass = 'text';
    var fill = '#ffffff';
    var anchor = 'middle';
    var pointerEvents = null;
    var texts = '';

    function element(selection) {
      selection.each(function (data) {
        var text = d3.select(this).selectAll('text')
          .data(data);

        text.exit().remove();

        text.enter().append('text');

        text
          .attr('class', cssClass)
          .attr('transform', transform)
          .attr('x', x)
          .attr('y', y)
          .attr('dx', dx)
          .attr('dy', dy)
          .attr('fill', fill)
          .style('text-anchor', anchor)
          .style('pointer-events', pointerEvents)
          .text(texts);
      });
    }

    // Public API
    element.x = function (_) {
      if (!arguments.length) return x;
      x = d3.functor(_);
      return element;
    };

    element.y = function (_) {
      if (!arguments.length) return y;
      y = d3.functor(_);
      return element;
    };

    element.dx = function (_) {
      if (!arguments.length) return dx;
      dx = d3.functor(_);
      return element;
    };

    element.dy = function (_) {
      if (!arguments.length) return dy;
      dy = d3.functor(_);
      return element;
    };

    element.transform = function (_) {
      if (!arguments.length) return transform;
      transform = _;
      return element;
    };

    element.class= function (_) {
      if (!arguments.length) return cssClass;
      cssClass = _;
      return element;
    };

    element.anchor = function (_) {
      if (!arguments.length) return anchor;
      anchor = _;
      return element;
    };

    element.fill = function (_) {
      if (!arguments.length) return fill;
      fill = _;
      return element;
    };

    element.pointerEvents = function (_) {
      if (!arguments.length) return pointerEvents;
      pointerEvents = _;
      return element;
    };

    element.text = function (_) {
      if (!arguments.length) return texts;
      texts = _;
      return element;
    };

    return element;
  };
});
