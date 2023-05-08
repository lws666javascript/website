//获取元素
let userInput = document.querySelector("#UserInput"),
    userSubmit = document.querySelector("#UserSubmit"),
    mainPage = document.querySelector("#mainPage");
userSubmit.addEventListener("click",function(){
  let v = userInput.value;
  let iframe = document.creatElement("iframe");
  iframe.src = v;
  iframe.class = "adding-iframe";
  mainPage.appendChild(iframe);
  createCloseBtn(iframe);
})
function createCloseBtn(e){
  let c = document.createElement("div");
  c.innerHTML = "关闭";
  c.class = "closePageButton";
  mainPage.appendChild(c);
  c.addEventListener("click",function(){
    e.remove();
    c.remove();
  });
}
