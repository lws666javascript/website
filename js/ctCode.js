function ctCode(str){
  let reg = new RegExp(`\\\\${str}\\\\`);
  reg.codeTest = function(s){
    if(/^.*=.*$/.test(str)){
      let s1 = s.match(reg);
      let p1 = s1.match(/^.*=/).replace("=",""),
          p2 = s1.match(/=.*$/).replace("=","");
      return {
        p1:p2
      }
    }else{
      return reg.test(s);
    }
  }
}
