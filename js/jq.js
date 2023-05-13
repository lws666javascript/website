function jq(ele){
  //判断是否为元素，不是则获取元素
  let jqE = ((typeof ele) === "string")?document.querySelector(ele):ele;
  //创建jq对象
  const o = {
    //对元素的引用，使jq对象与DOM对象链接
    self:jqE,
    type:jqE.tagName,
    id:jqE.id,
    class:jqE.className,
    inner:jqE.innerHTML,
    size:[jqE.offsetWidth,jqE.offsetHeight],
    dir:[jqE.offsetLeft,jqE.offsetTop],
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
      this.size = [this.self.offsetWidth,this.self.offsetHeight];
      this.dir = [this.self.offsetLeft,this.self.offsetTop];
      this.style = this.getStyle();
    },
    bind(e,f){
      //绑定事件，传入this参数，便于事件处理
      this.self.addEventListener(e,f.bind(this));
      return this;
    },
    css(o){
      //css样式修改
      let s = this.self,
          c = getComputedStyle(s);
      for(let i in o){
        c.setProperty(i,o);
      }
      //对jq对象进行更新
      this.update();
      return this;
    },
    size(s){
      //基于this.css的元素大小修改
      size = this.size = [s[0] || this.size[0],s[1] || this.size[1]];
      this.css({
        width:size[0],
        height:size[1]
      });
      return this;
    },
    move(d){
      dir = this.dir = [d[0] || this.dir[0],d[1] || this.dir[1]];
      this.css({
        left:dir[0],
        right:dir[1]
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
  return o;
}
//jq函数create方法，可以创建DOM对象并生成jq对象返回
jq.create = function(tag,{id,className,inner,size,css}){
  let e = document.createElement(tag);
  let jq = jq(e);
  jq.id = id || "";
  jq.class = className || "";
  jq.inner = inner || "";
  jq.set();
  size && jq.size();
  css && jq.css();
  return jq;
}
//常用元素的引用
jq.body = jq(document.body);
jq.html = jq(document.documentElement);
//random模块，仿python
const random = {
  random(){
    return Math.random();
  },
  randInt(x,y){
    return Math.random() * (y - x) + x;
  },
  choice(arr){
    return arr[this.randInt(0,arr.length - 1)];
  },
  sample(arr,k){
    const a = [];
    while(k){
      let r = this.randInt(0,arr.length - 1);
      if(!(arr[r] in a)){
        a.push(arr[r]);
      }
    }
  }
}
