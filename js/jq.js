function jq(ele){
  //判断是否为元素，不是则获取元素
  let jqE = ((typeof ele) === "string")?document.querySelector(ele):ele;
  //创建jq对象
  const o = {
    //对元素的引用，使jq对象与DOM对象链接
    self:jqE,
    init(){
      //初始化对象属性
      this.type = this.self.tagName;
      this.id = this.self.id;
      this.class = this.self.className;
      this.inner = this.self.innerHTML;
      this.update();
      return this;
    },
    getStyle(){
      let c = getComputedStyle(this.self);
      let o = {};
      for(let i in c){
        let n = c.item(i);
        o[n] = c.getPropertyValue(n);
      }
      return o;
    },
    set(){
      //设置属性
      let s = this.self;
      s.id = this.id;
      s.className = this.class;
      s.innerHTML = this.inner;
      //每次返回this，便于链式调用
      return this;
    },
    update(){
      //更新样式
      this.style = this.getStyle();
      this.size = [this.self.offsetWidth,this.self.offsetHeight];
      this.dir = [this.self.offsetLeft,this.self.offsetTop];
      this.w = this.size[0];
      this.h = this.size[1];
      this.x = this.dir[0];
      this.y = this.dir[1];
      return this;
    },
    bind(e,f){
      //绑定事件，传入this参数，便于事件处理
      let fun = f.bind(this)
      this.self.addEventListener(e,fun);
      return this;
    },
    animation(f){
      function anm(t,f){
        if(f(t)){
          f(t);
          requestAnimationFrame(arguments.callee);
        } 
      }
      requestAnimationFrame(function(){
        anm(this);
      }.bind(this));
    },
    css(o){
      //css样式修改
      let s = this.self;
      for(let i in o){
        s.style[i] = o[i];
      }
      //对jq对象进行更新
      this.update();
      return this;
    },
    resize(s){
      //基于this.css的元素大小修改
      size = [s[0] || this.style.width,s[1] || this.style.height];
      this.css({
        width:size[0],
        height:size[1]
      });
      return this;
    },
    move(d){
      dir = [d[0] || this.style.left,d[1] || this.style.top];
      this.css({
        left:dir[0],
        top:dir[1]
      });
      return this;
    },
    remove(){
      //删除元素
      this.self.remove();
      return this;
    },
    append(){
      //添加元素，可添加多个
      for(let i of [...arguments]){
        this.self.appendChild(i.self);
        this.update();
      }
      return this;
    },
    toString(){
      return "[Object jqElementObject]";
    }
  }
  return o.init();
}
//jq函数create方法，可以创建DOM对象并生成jq对象返回
jq.create = function(tag,o){
  let e = document.createElement(tag);
  let j = jq(e);
  j.id = o.id || "";
  j.class = o.class || "";
  j.inner = o.inner || "";
  j.set();
  o.size && j.size();
  o.css && j.css();
  return j;
}
//常用元素的引用
jq.body = jq(document.body);
jq.html = jq(document.documentElement);
