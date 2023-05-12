//获取元素
let userInput = document.querySelector("#UserInput"),
    userSubmit = document.querySelector("#UserSubmit"),
    mainPage = document.querySelector("#mainPage"),
    hlep = document.querySelector("#help");

//调试按钮
document.querySelector("#ConsoleCode").addEventListener("click",function(){
  try{
    let a = eval(prompt("调试代码"));
    alert(a);
  }catch(e){
    console.log(e)
  }
});
//绑定事件添加iframe
userSubmit.addEventListener("click",function(){
  let v = userInput.value;
  let body = document.body,
      w = body.offsetWidth,
      h = body.offsetHeight;
  let page = new Page({
    url:v,
    size:[w * 0.9,h * 0.9],
    dir:[w * 0.05,h * 0.05]
  });
  page.show(document.body);
});
