let ls = localStorage;
ls.savedURL = ls.savedURL || "[]";
function saveURL(url){
  let URL = JSON.parse(ls.savedURL);
  if(/^http/.test(url)){
    URL.push(url);
    alert("保存成功！")
  }else{
    alert("请输入正确网址！")
  }
  ls.savedURL = JSON.stringify(URL);
  return ls.savedURL;
}
function getURL(){
  let URL = JSON.parse(ls.savedURL);
  return URL;
}
const setURL = {
  nameURL(url){
    let r = /\\name=.*\\/;
    url.serach(r);    
  },
  delURL(url){
    let r = /\\del\\/;
    if(r.test(url)){
      let u = getURL();
      
    }
  }
}
