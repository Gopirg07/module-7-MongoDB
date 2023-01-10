const os=require("os");

//1KB =1024bytes
//1MB =1024kb
//1GB =1024mb
console.log("free memory :",os.freemem()/1024/1024/1024)
console.log("total memory :",os.totalmem()/1024/1024/1024)
console.log("Version :",os.version())
console.log("Cpu :",os.cpus())

//node specs.js