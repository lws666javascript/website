class page{
  constructor({url,dir,size}){
    this.url = url;
    this.dir = dir || [];
    this.size = size || [];
    this.tools = null;
    this.page = null;
    this.iframe = null;
  }
  show(p){
    let e = document.createElement("div");
    e.className = "adding-iframe-page center";
    p.appendChild(e);
    createIframe();
    createTools();
    this.page = e;
    let page = this.page;
    return  this;
  }
  render(){
    let p = this.page;
    this.iframe.src = this.url;
    p.style.left = this.dir[0];
    p.style.top = this.dir[1];
    p.style.width = this.size[0];
    p.style.height  = this.size[1];
  }
  change({url,dir,size}){
    this.url = url || this.url;
    this.dir = dir || this.dir;
    this.size = size || this.size;
  }
  bind(){
  
  }
  createIframe(){
    let i = document.createElement("iframe");
    i.className = "adding-iframe";
    i.src = this.url;
    this.page.appendChild(i);
    this.iframe = i;
    return  this;
  }
  createTools(){
    
  }
  
}
