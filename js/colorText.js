function ctText(value,animation){
    let p = jq.create("p");
    p.inner = value;
    p.class = "text"
    p.set();
    p.animation(animation);
}
