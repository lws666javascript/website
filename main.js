//调试按钮
document.querySelector("#ConsoleCode").addEventListener("click",function(){
  try{
    let a = eval(prompt("调试代码"));
    alert(a);
    console.log(a);
  }catch(e){
    console.log(e)
  }
});
//绑定事件添加iframe
jq("#UserSubmit").bind("click",function(){
  let v = jq("#UserInput").self.value,
      data = JSON.parse(localStorage.Data);
  let body = document.body,
      w = body.offsetWidth,
      h = body.offsetHeight;
  let page = new Page({
    url:v,
    size:[w * 0.9,h * 0.9],
    dir:[w * 0.05,h * 0.05]
  });
  page.show(body);
  data.times--;
  localStorage.Data = JSON.stringify(data);
});
