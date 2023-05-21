const UserAgent =  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version} Safari/537.36';
Object.defineProperty(navigator,'userAgent',{
  value:UserAgent,
  writable:false
});
