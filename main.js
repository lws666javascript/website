const UserAgent =  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version} Safari/537.36';
Object.defineProperty(navigator,'userAgent',{
  value:UserAgent,
  writable:false
})
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
  data.times>=0?(page.show(body),!data.userState && data.times--):alert("可用次数不足！");
  !data.userState && data.times && alert("剩余次数："+data.times);
  localStorage.Data = JSON.stringify(data);
});
//首页轮播图
setInterval(function(){
  let m = jq("#mainPage"),
      HuTaoImage = "./image/HuTao/HuTao",
      imageSrc = [HuTaoImage + "1.jpg",HuTaoImage + "2.jpg",HuTaoImage + "3.jpg"]; 
  m.self.index = m.self.index || 1;
  m.self.index = (m.self.index > imageSrc.length) ? 1: m.self.index;
  m.css({
    backgroundImage:`url(${imageSrc[m.self.index - 1]})`
  });
  m.self.index += 1;
},5000);
