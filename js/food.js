(function() {
  var elements = []; // 方便后续删除食物元素

  // 构造函数
  function Food(width, height, color) {
    this.width = width || 20;
    this.height = width || 20;
    this.color = color || "green";
    // 坐标,后续为随机生成
    this.x = 0;
    this.y = 0;
  }

  // 添加方法
  // 初始化=========将food显示在地图上
  Food.prototype.init = function(map) {
    // 首先删除现有的食物,然后再初始化食物
    this.remove();

    var div = document.createElement("div");
    map.appendChild(div); //将该元素加入地图中

    // 设置其样式
    div.style.width = this.width + "px";
    div.style.height = this.height + "px";
    div.style.backgroundColor = this.color;
    // 使其脱标方便后续设置坐标
    div.style.position = "absolute";

    // 为其设置坐标
    // 获取随机坐标
    this.x =
      parseInt((Math.random() * map.offsetWidth) / this.width) * this.width;
    this.y =
      parseInt((Math.random() * map.offsetHeight) / this.height) * this.height;
    // 设置坐标
    div.style.left = this.x + "px";
    div.style.top = this.y + "px";

    // 将新生成的元素加入数组,方便后续删除
    elements.push(div);
  };

  // 删除多余的食物
  Food.prototype.remove = function() {
    for (var i = 0; i < elements.length; i++) {
      var ele = elements[i];
      ele.parentNode.removeChild(ele); // 在页面中删除该元素
      elements.splice(i, 1); // 在数组中删除该元素
    }
  };

  // 将食物对象暴露给window,方便外部调用
  window.Food = Food;
})();
