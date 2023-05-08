//获取元素
try{let userInput = document.querySelector("#UserInput"),
    userSubmit = document.querySelector("#UserSubmit"),
    mainPage = document.querySelector("#mainPage");
userSubmit.addEventListener("click",function(){
  try{
  let v = userInput.value;
  let iframe = document.creatElement("iframe");
  iframe.src = v;
  iframe.className = "adding-iframe center";
  mainPage.appendChild(iframe);
  createCloseBtn(iframe);
      }catch(e)alert(e)
})
function createCloseBtn(e){try{
  let c = document.createElement("div");
  c.innerHTML = "关闭";
  c.className = "closePageButton";
  mainPage.appendChild(c);
  c.addEventListener("click",function(){
    e.remove();
    c.remove();
  });
    }catch(e)alert(e)
}
}catch(e){
alert(e)
}
