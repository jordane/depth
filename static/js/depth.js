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

var ctx;
var WIDTH = 640, HEIGHT = 480;
var stats;

var map;
var sprites = [];
var objs = [];
var camera;

function init() {
  // Create a canvas
  var canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  document.body.appendChild(canvas);

  stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms
  document.body.appendChild(stats.domElement);

  var cell;
  var opts;
  var x, y;
  var image;

  ctx = canvas.getContext("2d");

  var temp = cartographer.maps.convolutionExample();
  map = temp.map;
  objs = objs.concat(temp.objs);

  var h = new Hero({x: 320, y: 160});
  objs.push(h);

  objs.push(new Goo({x: 352, y: 160}));

  camera = new Camera({target: h});

  requestAnimFrame(render);
}

var lastFrame = +new Date();
function render() {
  stats.begin();

  var i, l;
  var thisFrame = +new Date();
  var dt = thisFrame - lastFrame;

  ctx.fillStyle = 'black';
  ctx.rect(0, 0, WIDTH, HEIGHT);

  ctx.save();
  camera.transform(ctx);

  for (i=0; i < objs.length; i++) {
    objs[i].tick(dt);
    objs[i].render(ctx);
  }

  ctx.restore();

  requestAnimFrame(render);

  lastFrame = thisFrame;
  stats.end();
}

window.game = {};

window.game.walkable = function(x, y) {
  return map[y][x] !== 1;
};

window.game.pixelToTile = function(x, y) {
  return [Math.floor(x / 32), Math.floor(y / 32)];
};


$(init);

})();