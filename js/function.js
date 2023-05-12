function jq(text,ele){
  let jq = text?document.querySelector(text):ele;
  const o = {
    self:jq,
    type:"jqObject",
    id:this.self.id,
    class:this.self.className,
    inner:this.self.innerHTML,
    size:[this.self.offsetWidth,this.self.offsetHeight],
    parent:jq(this.self.parentNode),
    children:(function(s){
      let cs = s.children;
      const a = [];
      for(let i of [...cs]){
        a.push(jq(i));
      }
      return a;
    })(this.self),
    dir:[this.self.offsetLeft,this.self.offsetTop],
    style:(function(t){
      let s = {};
      for(let i in t.style){
        s[i] = getComputedStyle(t,t[i]);
      }
      return s;
    })(this.self),
    set(){
      let s = this.self;
      s.id = this.id;
      s.className = this.class;
      s.innerHTML = this.inner;
      return this;
    },
    bind(e,f){
      this.self.addEventListener(e,f);
      return this;
    },
    css(o){
      let s = this.self;
      for(let i in o){
        s.style[i] = o[i];
      }
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
      }
      return this;
    },
    toString(){
      return "[Object jqElementObject]";
    }
  }
  return o;
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
