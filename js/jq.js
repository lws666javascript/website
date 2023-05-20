function jq(ele){
  //判断是否为元素，不是则获取元素
  let jqE = ((typeof ele) === "string")?document.querySelector(ele):ele;
  //创建jq对象
  const o = {
    //对元素的引用，使jq对象与DOM对象链接
    self:jqE,
    init(){
      //创建this的引用
      const _this = this;
      //初始化对象属性
      this.type = this.self.tagName;
      this.id = this.self.id;
      this.class = this.self.className;
      this.inner = this.self.innerHTML;
      this.bind("input",function(){
        this.value = this.self.value;
      });
      this.value = this.self.value;
      this.attribute = {
        get:this.self.getAttribute,
        set:this.self.setAttribute,
        remove:this.self.setAttribute
      };
      this.Data = {
        init(){
          _this.self.jqData = _this.self.jqData || {};
          _this.data = _this.self.jqData;
          return _this;
        },
        item(){
          let a = [];
          for(let i in _this.data){
            a.push(i);
          }
          return a;
        },
        set(key,value){
          _this.data[key] = value;
          _this.self.jqData = _this.data;
          return _this;
        },
        remove(key){
          delete _this.data[key];
          _this.self.jqData = _this.data;
          return _this;
        },
        get(key){
          return _this.data[key];
        }
      }
      this.Data.init();
      this.update();
      return this;
    },
    toggleClass(c){
      this.self.classList.toggle(c);
      this.class = this.self.className;
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
    set(o){
      //设置属性
      let s = this.self;
      if(o){
        this.id = o.id || this.id;
        this.class = o.class || this.class;
        this.inner = o.inner || this.inner;
        this.value = o.value || this.value;
        this.set();
      }
      s.id = this.id;
      s.className = this.class;
      s.innerHTML = this.inner;
      s.value = this.value;
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
    click(f){
      this.bind("click",f);
      return this;
    },
    animation(f){
      function anm(t,f){
        if(f(t)){
          requestAnimationFrame(function(){
            anm(t,f);
          });
        } 
      }
      requestAnimationFrame(function(){
        anm(this,f);
      }.bind(this));
      return this;
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
    hidden(){
      this.css({
        display:"none"
      });
      return this;
    },
    show(){
      this.css({
        display:"block"
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
    find(txt){
      let ele = this.self.querySelector(txt);
      return jq(ele);
    },
    parent(){
      return jq(this.self.parentNode);
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
  j.id = o && o.id || "";
  j.class = o && o.class || "";
  j.inner = o && o.inner || "";
  j.set();
  o && o.size && j.resize(o.size);
  o && o.css && j.css(o.css);
  return j;
}
jq.all = function(txt){
  let arr = document.querySelectorAll(text);
  let r = [];
  for(let v of arr){
    r.push(jq(v));
  }
  return r;
}
jq.get = function(){
  let jqEle = [];
  for(let v of arguments){
    jqEle.push(jq(v));
  }
  return jqEle;
}

//jq.animation 子模块
jq.animation = {
  funs:[function(){}],
  start(){
    this.timer  = requestAnimationFrame(function(){
      for(let v of this.funs){
        v();
      }
      this.timer = requestAnimationFrame(arguments.callee.bind(this));
    }.bind(this));
    return this;
  },
  add(){
    for(let v of arguments){
      this.funs.push(v);
    }
    return this;
  },
  remove(f){
    let i = this.funs.indexOf(f);
    this.funs.splice(i,1);
    return this;
  },
  stop(){
    cancelAnimationFrame(this.timer);
    return this;
  }
}
jq.interval = {
  funs:[function(){}],
  start(time){
    this.time = time || 100;
    this.timer = setInterval(function(){
      for(let v of this.funs){
        v();
      }
    }.bind(this),this.time);
  },
  add:jq.animation.add,
  remove:jq.animation.remove,
  stop(){
    clearInterval(this.timer);
    return this;
  }
}
//常用元素的引用
window.addEventListener("load",function(){
  jq.body = jq(document.body);
  jq.html = jq(document.documentElement);
});
