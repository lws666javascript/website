function ctText(value,animation){
    let p = jq.create("p");
    p.inner = value;
    p.class = "text"
    p.set();
    p.animation(animation);
    jq.body.append(p);
}
jq("button").bind("click",function(){
    let i = jq("input"),
        IArr = i.self.value.split(","),
        t = ctCode("time=.*"),
        ts = ctCode("textSize=.*"),
        text = IArr[0],
        code = IArr[1];
    ctText(text,function(){
        
    });    
});
