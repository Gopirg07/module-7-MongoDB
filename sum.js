
const sum=(n,m)=> n+m;

console.log(sum(+process.argv[2],+process.argv[3])); 
console.log(process.argv); 
//// node sum.js process.argv