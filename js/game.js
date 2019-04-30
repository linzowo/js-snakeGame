(function() {
  // construct function
  function Game(map) {
    // Initialization game elemrents
    this.map = map;
    this.food = new Food();
    this.snake = new Snake();
  }

  // Initialization Game
  Game.prototype.init = function() {
    this.food.init(this.map);
    this.snake.init(this.map);
    this.bindKey();
    // let snake move
    this.runSnake();
  };

  // let snake move all the time
  Game.prototype.runSnake = function() {
    var that = this;
    var timeid = setInterval(
      function() {
        this.snake.move(this.food, this.map);
        this.snake.init(this.map);
        this.stop(timeid);
      }.bind(that),
      150
    );
  };

  // stop game
  Game.prototype.stop = function(timeid) {
    //   Determine whether to hit the wall====game over
    var headX = this.snake.body[0].x;
    var headY = this.snake.body[0].y;

    var maxX = this.map.offsetWidth / this.snake.width;
    var maxY = this.map.offsetHeight / this.snake.height;
    if (headX < 0 || headY < 0 || headX >= maxX || headY >= maxY) {
      clearInterval(timeid);
      alert("游戏结束");
    }
  };

  // listening for user button events
  Game.prototype.bindKey = function() {
    var that = this;
    document.addEventListener(
      "keydown",
      function(e) {
        switch (e.keyCode) {
          case 37:
            this.snake.direction = "left";
            break;
          case 38:
            this.snake.direction = "top";
            break;
          case 39:
            this.snake.direction = "right";
            break;
          case 40:
            this.snake.direction = "bottom";
            break;
        }
      }.bind(that),
      false
    );
  };

  window.Game = Game;
})();
