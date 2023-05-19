function setCtrlScaleElement(ele,inner){
  let b = jq(ele),
      d = jq.create("div",{class:"closed-scale-ele scale-element"});
  d.inner = "<div class='scale-page-close-btn'>×</div>" + inner;
  d.set();
  b.bind('click',function(){
    d.class = "showed-scale-ele scale-element";
    d.set();
  });
  jq(d.self.firstChild()).bind("click",function(){
    d.class = "closed-scale-ele scale-element";
    d.set();
  })
}
