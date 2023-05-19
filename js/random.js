const random = {
    random(){
        return Math.random();
    },
    randInt(x,y){
        return Math.floor(Math.random() * (y - x + 1) + x);
    },
    choice(arr){
        return arr[0,this.randInt(0,arr.length - 1)];
    },
    sample(arr,k){
        const r = [];
        while(k){
            let v = this.choice(arr)
            if(!(v in r)){
                r.push(v);
                k--;
            }
        }
        return r;
    }
}
