function qryEle(text){
  let jq = document.querySelector(text);
  return jq;
}
const random = {
  random(){
    return Math.random();
  },
  randInt(x,y){
    return Math.random() * (y - x) + x;
  },
  choice(arr){
    return arr[this.randInt(0,arr.length - 1)];
  },
  sample(arr,k){
    const a = [];
    while(k){
      let r = this.randInt(0,arr.length - 1);
      if(arr[r] in a){
        a.push(arr[r]);
      }
    }
  }
}
