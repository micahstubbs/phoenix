define(function (require) {
  var d3 = require('d3');
  var builder = require('src/modules/d3_components/helpers/builder');
  var rotate = require('src/modules/d3_components/generator/axis/rotate');

  return function axes() {
    var scale = d3.scale.linear();
    var orient = 'bottom';
    var tick = {
      number: 10,
      values: null,
      size: 6,
      innerTickSize: 6,
      outerTickSize: 6,
      padding: 3,
      format: null
    };
    var tickText = {
      transform: null,
      anchor: 'middle',
      x: 0,
      y: 9,
      dx: '',
      dy: '.71em'
    };
    var rotateLabels = { allow: false };
    var transform = 'translate(0,0)';
    var gClass = 'axis';
    var title = {
      class: 'axis title',
      x: 6,
      y: 6,
      dx: '',
      dy: '.71em',
      anchor: 'end',
      transform: 'translate(0,0)',
      text: ''
    };
    var g;
    var text;
    var rotation;

    function generator(selection) {
      selection.each(function () {
        var axis = d3.svg.axis()
          .scale(scale)
          .orient(orient)
          .ticks(tick.number)
          .tickValues(tick.values)
          .tickSize(tick.size)
          .innerTickSize(tick.innerTickSize)
          .outerTickSize(tick.outerTickSize)
          .tickPadding(tick.padding)
          .tickFormat(tick.format);

        if (!g) {
          g = d3.select(this).append('g');
        }

        // Attach axis
        g.attr('class', gClass)
          .attr('transform', transform)
          .call(axis);

        if (rotateLabels.allow) {
          var axisLength = Math.abs(scale.range()[1] - scale.range()[0]);

          if (!rotation) rotation = rotate();

          rotation.axisLength(axisLength);
          g.call(builder(rotateLabels, rotation));
        }

        if (!text) {
          text = g.append('text');
        }

        g.attr('class', title.class)
          .attr('x', title.x)
          .attr('y', title.y)
          .attr('dx', title.dx)
          .attr('dy', title.dy)
          .attr('transform', title.transform)
          .style('title-anchor', title.anchor)
          .text(title.text);
      });
    }

    // Public API
    generator.class = function (_) {
      if (!arguments.length) return gClass;
      gClass = _;
      return generator;
    };

    generator.transform = function (_) {
      if (!arguments.length) return transform;
      transform = _;
      return generator;
    };

    generator.scale = function (_) {
      if (!arguments.length) return scale;
      scale = _;
      return generator;
    };

    generator.orient = function (_) {
      if (!arguments.length) return orient;
      orient = _;
      return generator;
    };

    generator.tick = function (_) {
      if (!arguments.length) return tick;
      tick.number = typeof _.number !== 'undefined' ? _.number : tick.number;
      tick.values = typeof _.values !== 'undefined' ? _.values : tick.values;
      tick.size = typeof _.size !== 'undefined' ? _.size : tick.size;
      tick.padding = typeof _.padding !== 'undefined' ? _.padding : tick.padding;
      tick.format = typeof _.format !== 'undefined' ? _.format : tick.format;
      tick.innerTickSize = typeof _.innerTickSize !== 'undefined' ? _.innerTickSize : tick.innerTickSize;
      tick.outerTickSize = typeof _.outerTickSize !== 'undefined' ? _.outerTickSize : tick.outerTickSize;
      return generator;
    };

    generator.tickText = function (_) {
      if (!arguments.length) return tickText;
      tickText.transform = typeof _.transform !== 'undefined' ? _.transform : tickText.transform;
      tickText.anchor = typeof _.anchor !== 'undefined' ? _.anchor : tickText.anchor;
      tickText.x = typeof _.x !== 'undefined' ? _.x : tickText.x;
      tickText.y = typeof _.y !== 'undefined' ? _.y : tickText.y;
      tickText.dx = typeof _.dx !== 'undefined' ? _.dx : tickText.dx;
      tickText.dy = typeof _.dy !== 'undefined' ? _.dy : tickText.dy;
      return generator;
    };

    generator.rotateLabels = function (_) {
      if (!arguments.length) return rotateLabels;
      rotateLabels = typeof _ !== 'object' ? rotateLabels : _;
      return generator;
    };

    generator.title = function (_) {
      if (!arguments.length) return title;
      title.class = typeof _.class !== 'undefined' ? _.class : title.class;
      title.x = typeof _.x !== 'undefined' ? _.x : title.x;
      title.y = typeof _.y !== 'undefined' ? _.y : title.y;
      title.dx = typeof _.dx !== 'undefined' ? _.dx : title.dx;
      title.dy = typeof _.dy !== 'undefined' ? _.dy : title.dy;
      title.transform = typeof _.transform !== 'undefined' ? _.transform : title.transform;
      title.anchor = typeof _.anchor !== 'undefined' ? _.anchor : title.anchor;
      title.text = typeof _.text !== 'undefined' ? _.text : title.text;
      return generator;
    };

    return generator;
  };
});