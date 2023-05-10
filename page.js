class page{
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
    this.bind();
    this.createIframe();
    this.createTools(p);
    return this;
  }
  render(){
    let p = this.page;
    this.iframe.src = this.url;
    p.style.left = this.dir[0];
    p.style.top = this.dir[1];
    p.style.width = this.size[0];
    p.style.height  = this.size[1];
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
    p.addEventListener("touchstart",function(e){
      let t = e.touches[0];
      let beginDir = [t.pageX,t.pageY];
      p.addEventListener("touchmove",function(e){
        let t = e.touches[0];
        let x = beginDir[0],
            y = beginDir[1];
        let addtion = [t.pageX - x,t.pageY - y];
        console.log(addition)
        let dir = [_this.dir[0] + addtion[0],_this.dir[1] + addtion[1]];
        console.log(dir)
        _this.change({dir});
      });
    });
  }
  createIframe(){
    let i = document.createElement("iframe");
    i.className = "adding-iframe";
    i.src = this.url;
    this.page.appendChild(i);
    this.iframe = i;
    return this;
  }
  createTools(p){
    let d = document.createElement("div");
    d.className = "pageTools";
    p.appendChild(d);
    this.tools.close = this.createCloseBtn(d);
    this.tools.change = this.createChangeBox(d);
  }
  createCloseBtn(p){
    let b = document.createElement("div");
    b.className = "closePageButton";
    b.style.width = b.offsetHeight + "px";
    b.style.fontSize = b.offsetHeight * 0.8 + "px";
    p.appendChild(b);
    let page = this.page;
    b.addEventListener("click",function(e){
      page.remove();
      b.remove();
    });
    return b;
  }
  createChangeBox(p){
    let b = document.createElement("div");
    b.className = "pageChangeBox";
    b.innerHTML = `
      <input placeholder="url" class="pageURL">
      <input placeholder="请输入长度和宽度（用,相隔）" class="pageSize">
      <button class="pageChangeBtn">修改大小</button>`;
    p.appendChild(b)
    let page = this.page;
    let url = b.querySelector(".pageURL"),
        size = b.querySelector(".pageSize"),
        btn = b.querySelector(".pageChangeBtn");
    url.vaule = this.url;
    size.value = this.size;
    let _this = this;
    b.addEventListener("click",function(){
      _this.change({
        url:url.value,
        size:size.value
      });
    });
    return b;
  }
}
