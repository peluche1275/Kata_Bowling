let str = "Test";
let result = str.match(/^[a-zA-Z]\w{3,20}$/g);
console.log(result);

str = "Tes";
result = str.match(/^[a-zA-Z]\w{3,20}$/g);
console.log(result);

str = "test";
result = str.match(/^[a-zA-Z]\w{3,20}$/g);
console.log(result);



if(result){
    console.log("yes")
}


