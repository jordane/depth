(function() {

var requestAnimFrame = (function(){
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();

var map = cartographer.blankMap(35, 35);

var sprites = [];
var objs = [];
var ctx;
var WIDTH = 640, HEIGHT = 480;

function init() {
  // Create a canvas
  var canvas = document.createElement("canvas");
  var cell;
  var opts;
  var x, y;
  var image;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  document.body.appendChild(canvas);

  ctx = canvas.getContext("2d");

  var convoluted = cartographer.convolute(map);

  for (y = 0; y < map.length; y++) {
    for (x = 0; x < map[0].length; x++) {
      cell = convoluted[y][x];
      objs.push(new Tile({
        x: x * 32,
        y: y * 32,
        image: cell
      }));
    }
  }

  objs.push(new Hero({x: 320, y: 224}));

  requestAnimFrame(render);
}

function render() {
  var i, l;
  var dt = 0.05;

  for (i=0; i < objs.length; i++) {
    objs[i].tick(dt);
    objs[i].render(ctx);
  }

  requestAnimFrame(render);
}

$(init);

})();