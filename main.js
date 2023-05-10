//获取元素
let userInput = document.querySelector("#UserInput"),
    userSubmit = document.querySelector("#UserSubmit"),
    mainPage = document.querySelector("#mainPage");
//调试按钮
document.querySelector("#ConsoleCode").addEventListener("click",function(){
  try{
    let a = eval(prompt("调试代码"));
    alert(a);
  }catch(e){
    alert(e)
  }
});
//绑定事件添加iframe
userSubmit.addEventListener("click",function(){
  
  let v = userInput.value;
  /*
  let iframe = document.createElement("iframe");
  iframe.src = v;
  iframe.className = "adding-iframe center";
  mainPage.appendChild(iframe);
  createCloseBtn(iframe);
  */
  let body = document.body,
      w = body.offsetWidth,
      h = body.offsetHeight;
  let page = new Page({
    url:v,
    size:[w * 0.8,h * 0.8],
    dir:[w * 0.1,h * 0.1]
  });
  page.show(document.body);
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
