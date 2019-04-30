(function() {
  var elements = []; // 方便后续删除蛇元素

  // 构造函数
  function Snake(width, height) {
    this.width = width || 20;
    this.height = height || 20;
    // 坐标及颜色信息
    this.body = [
      { x: 3, y: 2, color: "red" },
      { x: 2, y: 2, color: "yellow" },
      { x: 1, y: 2, color: "yellow" }
    ];
    // 方向
    this.direction = "right";
  }

  // 添加原型方法
  // Initialization snake . make it appear on the map
  Snake.prototype.init = function(map) {
    this.remove(); // remove previous snake
    for (var i = 0; i < this.body.length; i++) {
      // creat a body
      var div = document.createElement("div");
      // add it to the map
      map.appendChild(div);
      // Set up related styles
      div.style.width = this.width + "px";
      div.style.height = this.height + "px";
      div.style.position = "absolute";

      div.style.backgroundColor = this.body[i].color;
      // Set coordinates
      div.style.left = this.body[i].x * this.width + "px";
      div.style.top = this.body[i].y * this.height + "px";

      // add it to the array
      elements.push(div);
    }
  };

  // let snake move
  Snake.prototype.move = function(food, map) {
    for (var i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }

    this.eat(food, map);

    switch (this.direction) {
      case "left":
        this.body[0].x -= 1;
        break;
      case "top":
        this.body[0].y -= 1;
        break;
      case "right":
        this.body[0].x += 1;
        break;
      case "bottom":
        this.body[0].y += 1;
        break;
    }
  };

  // snake eat food now
  Snake.prototype.eat = function(food, map) {
    var headX = this.body[0].x * this.width;
    var headY = this.body[0].y * this.height;
    var lastBody = this.body[this.body.length - 1];
    // make the body longer
    if (headX == food.x && headY == food.y) {
      this.body.push({
        x: lastBody.x,
        y: lastBody.y,
        color: lastBody.color
      });
      // delete food
      food.init(map);
    }
  };
  // remove previous snake
  Snake.prototype.remove = function() {
    for (var i = elements.length - 1; i >= 0; i--) {
      var ele = elements[i];
      ele.parentNode.removeChild(ele); // delete the body in map
      elements.splice(i, 1); // delete the body in array
    }
  };

  window.Snake = Snake;
})();
