let ls = localStorage;
ls.savedURL = ls.savedURL || "[]";
function saveURL(url){
  let URL = JSON.parse(ls.savedURL),
      reg = new RegExp(url.replace(/\\.*\\/,"").replace(" ",""));
  if(/^https?/.test(url)){
    if(!URL.includes(reg)){
      URL.push(url);
      alert("保存成功！")
    }else if(setURL.nameURL(url)){
      URL[URL.search(url.replace(/\\.*\\/,""))] = url + " \\name=" + setURL.nameURL(url).name + "\\";
      alert("命名成功！")
    }else if(setURL.delURL(url)){
      URL.splice(URL.search(url.replace(/\\.*\\/,"")),1);
      alert("删除成功！")
    }else{
      alert("已经保存过了！");
    }
  }else{
    alert("请输入正确网址！");
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
    let r = ctCode("name=.*");
    return r.codeTest(url);
  },
  delURL(url){
    let r = ctCode("del");
    return r.codeTest(url);
  }
}
