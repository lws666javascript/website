//需要使用jq.js
class Notice{
    constructor(o){
        this.title = o.title || "";
        this.message = o.message || "";
        this.state = o.state || 0;
        this.bgColor = o.bgColor || "white";
        this.bgImage = o.bgImage || "";
        this.txtSize = o.txtSize || "";
        this.txtColor = o.txtColor || "";
    }
    show(){
        let p = jq.create("div");
        p.inner = this.getInner;
        p.set();
        jq(document.body).append(p);
    }
    getInner(){
        let t = this.title,
            m = this.message,
            s = this.state;
        let tt = `<div class="noticeTitle">${t}</div>`,
            ms = `<div class="noticeMessage">&#nbsp;&#nbsp;${m}</div>`,
            btn = `<div class="noticeCfmBtn">确认收到</div>`;
        this.setStyle();
        return `<div class="hdNotice center" id="notice">${tt}${ms}${btn}</div>`;
    }
    setStyle(){
        let sty = `
            #notice{
                position:absolute;
                transition:width 0.3s,height 0.3s,opacity 0.3s;
                overflow:hidden;
            }
            .hdNotice{
                width:0;
                height:0;
                opacity:0;
            }
            .aprNotice{
                width:0.7vw;
                height:0.8vh;
                opacity:1;
                border:1px solid black;
                border-radius:20px;
                background-color:white;
            }
            .noticeTitle{
                text-align:center;
                width:100%;
                height:20%;
                font-size:15%;
                line-height:130%;
                font-weight:bold;
            }
            .noticeMessage{
                height:70%;
            }
            .noticeCfmBtn{
                position:absolute;
                bottom:10px;
                right:0;
                left:0;
                margin:auto;
                width:30%;
                text-align:center;
                height:10%;
                font-size:9%;
                outline:2px solid black;
                background-color:white;
                line-height:100%;
            }
        `;
        let s = jq.create("style");
        s.inner = sty;
        s.set();
        jq("head").append(s);
    }
}
