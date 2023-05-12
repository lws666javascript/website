function jq(text,ele){
  let jqE = text?document.querySelector(text):ele;
  const o = {
    self:jqE,
    type:this.self.tagName,
    id:this.self.id,
    class:this.self.className,
    inner:this.self.innerHTML,
    size:[this.self.offsetWidth,this.self.offsetHeight],
    dir:[this.self.offsetLeft,this.self.offsetTop],
    parent:jq(this.self.parentNode),
    children:this.getChildren(),
    getChildren:function(){
      let cs = this.self.children;
      const a = [];
      for(let i of [...cs]){
        a.push(jq(i));
      }
      return a;
    },
    getStyle(){
      let t = this.self;
      let s = {};
      for(let i in t.style){
        s[i] = getComputedStyle(t,t[i]);
      }
      return s;
    },
    set(){
      let s = this.self;
      s.id = this.id;
      s.className = this.class;
      s.innerHTML = this.inner;
      return this;
    },
    update(){
      this.size = [this.self.offsetWidth,this.self.offsetHeight];
      this.dir = [this.self.offsetLeft,this.self.offsetTop];
      this.style = this.getStyle();
      this.children = this.getChildren();
      this.parent = jq(this.self.parentNode);
    },
    bind(e,f){
      this.self.addEventListener(e,f.bind(this));
      return this;
    },
    css(o){
      let s = this.self;
      for(let i in o){
        s.style[i] = o[i];
      }
      this.update();
      return this;
    },
    size(s){
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
      this.self.remove();
      return this;
    },
    append(){
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
jq.create = function(){

}
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
