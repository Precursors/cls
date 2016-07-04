'use strict';

function Eraser (dom, src) {

  var $dom = $(dom);
  var top = $dom.offset().top;
  var left = $dom.offset().left;
  var width = $dom.width();
  var height = $dom.height();

  var $img = $('<img>');
  var img = $img[0];

  var roundRect = function (context, x, y, w, h, r) {
    var min_size = Math.min(w, h);
    if (r > min_size / 2) r = min_size / 2;
    // 开始绘制
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + w, y, x + w, y + h, r);
    context.arcTo(x + w, y + h, x, y + h, r);
    context.arcTo(x, y + h, x, y, r);
    context.arcTo(x, y, x + w, y, r);
    context.closePath();
    return this;
  }

  $img.css({
    display: 'none',
    width: width,
    height: height
  }).attr({
    src: src
  });
  $img.appendTo($dom.parent());
  $img.on('load', function () {
    var $canvas = $('<canvas>');
    var context = $canvas[0].getContext('2d');

    $canvas.css({
      position: 'absolute',
      top: top,
      left: left
    }).attr({
      width: width,
      height: height
    })

    $canvas.appendTo($dom.parent())

    $canvas.on('mousemove', function (e) {
      var radius = 100;
      var top = e.offsetY - radius;
      var left = e.offsetX - radius;
      var width = radius * 2;
      var height = radius * 2;
      var pattern = context.createPattern(img, "no-repeat");
      context.roundRect(left, top, width, height, 100);
      context.fillStyle = pattern;
      context.fill()
    })
  })
}

$(function () {
  var eraser = new Eraser($('.bg'), 'http://sandbox.runjs.cn/uploads/rs/85/jud8ox3q/br.jpg');
})
