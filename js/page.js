class Page{
  constructor({url,dir,size}){
    this.url = url;
    this.dir = dir || [];
    this.size = size || [];
    this.tools = {};
    this.page = null;
    this.iframe = null;
  }
  show(p){
    let e = document.createElement("div");
    e.className = "adding-iframe-page center";
    p.appendChild(e);
    this.page = e;
    let page = this.page;
    this.createIframe(e);
    this.createTools(e);
    this.bind();
    this.render();
    return this;
  }
  render(){
    let p = this.page;
    this.iframe.src = this.url;
    p.style.left = this.dir[0] + "px";
    p.style.top = this.dir[1] + "px";
    p.style.width = this.size[0] + "px";
    p.style.height  = this.size[1] + "px";
    this.updateStyle([this.tools.close,{
      height:this.tools.close.offsetWidth + "px",
      fontSize:this.tools.close.offsetWidth * 0.9 + "px",
      lineHeight:this.tools.close.offsetWidth + "px"
    }],[this.tools.tools,{
      fontSize:this.tools.tools.offserHeight * 0.8 + "px"
    }]);
    return this;
  }
  change({url,dir,size}){
    this.url = url || this.url;
    this.dir = dir || this.dir;
    this.size = size || this.size;
    this.render();
    return this;
  }
  bind(){
    let p = this.page;
    let _this = this;
    p.ontouchstart = function(e){
      let t = e.touches[0];
      let beginDir = [t.pageX,t.pageY];
      let beginBDir = [_this.dir[0],_this.dir[1]];
      let addition = [beginDir[0] - beginBDir[0],beginDir[1] - beginBDir[1]];
      p.ontouchmove = function(e){
        let t = e.touches[0];
        let dir = [t.pageX - addition[0],t.pageY - addition[1]];
        _this.change({dir});
        p.ontouchend = function(){
          p.ontouchmove = null;
        }
      }
    }
    p.onmousedown = function(e){
      let dir = _this.dir,
          addition = [e.pageX - dir[0],e.pageY - dir[1]];
      p.onmousemove = function(e){
        let dir = [e.pageX - addition[0],e.pageY - addition[1]];
        _this.change({dir});
        p.onmouseup = function(){
          p.onmousemove = null;
        }
      }
    }
    p.touchstartEvent = p.ontouchstart;
    p.mouseEvent = p.onmousedown;
    p.addEventListener("dblclick",function(){
      let t = _this.tools;
      if(!t.hiddenState){
        t.tools.style.visibility = "hidden";
        //_this.iframe.style.height = "100%";
        t.hiddenState = 1;
        p.ontouchstart = null;
        p.onmousedown = null;
      }else{
        t.tools.style.visibility = "visible";
        //_this.iframe.style.height = "90%";
        t.hiddenState = 0;
        p.ontouchstart = p.touchstartEvent;
        p.onmousedown = p.mouseEvent;
      }
    });
  }
  createIframe(p){
    let i = document.createElement("iframe");
    i.className = "adding-iframe";
    i.src = this.url;
    p.appendChild(i);
    this.iframe = i;
    return this;
  }
  createTools(p){
    let d = document.createElement("div");
    d.className = "pageTools";
    p.appendChild(d);
    this.tools.tools = d;
    let close = this.createCloseBtn(d);
    let change = this.createChangeBox(d);
    this.tools.close = close;
    this.tools.change = change;
  }
  createCloseBtn(p){
    let b = document.createElement("div");
    b.className = "closePageButton";
    b.innerHTML = "×";
    p.appendChild(b);
    let page = this.page,
        _this = this;
    b.addEventListener("click",function(e){
      page.remove();
      b.remove();
    });
    return b;
  }
  createChangeBox(p){
    let b = document.createElement("div");
    b.className = "pageChangeBox";
    b.innerHTML = `<input placeholder="url" class="pageURL"><input placeholder="请输入长度和宽度（用,相隔）" class="pageSize"><button class="pageChangeBtn">修改</button>`;
    p.appendChild(b);
    let page = this.page;
    let url = b.querySelector(".pageURL"),
        size = b.querySelector(".pageSize"),
        btn = b.querySelector(".pageChangeBtn");
    url.vaule = this.url;
    size.value = this.size.join(",");
    let _this = this;
    b.addEventListener("click",function(){
      _this.change({
        url:url.value,
        size:size.value.split(",")
      });
    });
    return b;
  }
  updateStyle(){
    for(let v of [...arguments]){
      let p = v[0];
      for(let i in v[1]){
        p.style[i] = v[1][i];
      }
    }
  }
}
