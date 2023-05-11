let ls = localStorage;
ls.savedURL = ls.savedURL || "[]";
function saveURL(url){
  let URL = JSON.parse(ls.savedURL);
  URL.push(url);
  ls.savedURL = JSON.stringify(URL);
  return ls.savedURL;
}
function getURL(){
  let URL = JSON.parse(ls.savedURL);
  return URL;
}
