alert("Run!");
//获取元素
let userInput = document.querySelector("#UserInput"),
    userSubmit = document.querySelector("#UserSubmit"),
    mainPage = document.querySelector("#mainPage");
userSubmit.addEventListener("click",function(){
  let v = userInput.value;
  let iframe = document.creatElement("iframe");
  iframe.src = "http://" + v;
  iframe.className = "adding-iframe center";
  mainPage.appendChild(iframe);
  createCloseBtn(iframe);
})
function createCloseBtn(e){
  let c = document.createElement("button");
  c.innerHTML = "关闭";
  c.className = "closePageButton";
  mainPage.appendChild(c);
  c.addEventListener("click",function(){
    e.remove();
    c.remove();
  });
}
document.querySelector("#viewScore").addEventListener("click",function(){
  let text = document.documentElement.outerHTML.replace(/</g,"&lt;");
  alert(text)
  mainPage.innerHTML = text.replace(/>/g,"&gt;");
})
