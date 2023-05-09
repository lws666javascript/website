class page{
  constructor({url,dir,size}){
    this.url = url;
    this.dir = dir || [];
    this.size = size || [];
    this.tools = null;
  }
  show(p){
    let i = document.createElement("iframe");
    i.url = this.url;
    i.className = ""
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
  createTools(){
  
  }
}
