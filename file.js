const fs=require("fs");
// const msg="Hello MR R.Gopinath";

// fs.writeFile("./gopi.html",msg,(err)=>{
//     console.log("completed!")
// })

const quote2="live more worry less"; 
//     for(let i=1;i<=(+process.argv[2]);i++)
//     {
//         fs.writeFile(`./backup/text-${i}.html`,quote2,(err)=>{
//             console.log(`text-${i} Created`);
//         })
//     }
    // `./backup/text-${i}.html`

    // fs.readFile("./gopi.html","utf-8",(err,data)=>{
    //     if(err){
    //         console.log("Error")
    //     } 
    //     else{
    //         console.log(data)
    //     }
    // })
    fs.appendFile("./gopi.html","\n"+quote2,(err)=>{
        console.log("Appending Completed")
    })
    //node file.js