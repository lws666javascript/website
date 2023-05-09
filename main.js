//获取元素
let userInput = document.querySelector("#UserInput"),
    userSubmit = document.querySelector("#UserSubmit"),
    mainPage = document.querySelector("#mainPage");
//调试按钮
document.querySelector("#ConsoleButton").addEventListener("click",function(){
  try{
    alert(eval(prompt("调试代码")));
  }catch(e){
    alert(e)
  }
})
//绑定事件添加iframe
userSubmit.addEventListener("click",function(){
  let v = userInput.value;
  let iframe = document.createElement("iframe");
  iframe.src = v;
  iframe.className = "adding-iframe center";
  mainPage.appendChild(iframe);
  createCloseBtn(iframe);
})
//定义函数添加button
function createCloseBtn(e){
  let c = document.createElement("button");
  c.innerHTML = "×";
  c.className = "closePageButton";
  mainPage.appendChild(c);
  c.style.left = e.offsetLeft + e.offsetWidth - c.offsetWidth + "px";
  c.style.top = e.offsetTop - c.offsetHeight + "px";
  c.addEventListener("click",function(){
    e.remove();
    c.remove();
  });
}
document.querySelector("#viewScore").addEventListener("click",function(e){
  let f = e.target;
  let text = document.documentElement.outerHTML.replace(/</g,"&lt;").replace(/>/g,"&gt;<br />&#32;&#32;");
  if(!f.viewState){
    f.viewScoreStorage = mainPage.innerHTML;
    mainPage.innerHTML = text;
    f.viewState = 1;
  }else{
    mainPage.innerHTML = f.viewScoreStorage;
    f.viewState = 0;
  }
});
