function ctCode(str){
  let reg = new RegExp(`\\\\${str}\\\\`);
  reg.codeTest = function(s){
    if(/^.*=.*$/.test(str)){
      let s1 = s.match(reg)[0],
          p1 = s1.match(/^.*=/)[0].replace("=",""),
          p2 = s1.match(/=.*$/)[0].replace("=","");
      p2 = /,/.test(p2)?p2.split(","):p2;
      return {
        [p1]:p2
      }
    }else{
      return reg.test(s);
    }
  }
  return reg;
}
