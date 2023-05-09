class page{
  constructor({url,dir,size}){
    this.url = url;
    this.dir = dir || [];
    this.size = size || [];
    this.tools = null;
  }
  show(p){
    let e = document.createElement("div");
    e.className = "adding-iframe-page center";
    p.appendChild(e);
    this.ele.page = e;
  }
  render({url,dir,size}){
    this.url = url;
    this.dir = dir;
    this.size = size;
    
  }
  move(){
  
  }
  bind(){
  
  }
  createIframe(){
    let i = document.createElement("iframe");
    i.className = "adding-iframe";
    this.ele.page.appendChild(i);
    
  }
  createTools(){
  
  }
}
