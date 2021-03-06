#!/usr/bin/env node

let fs = require("fs");

let cmd=process.argv.slice(2);

( function () {
    let option=[];
    let file=[];
    let str="";
    for(let x in cmd){
        if(cmd[x].startsWith("-") && cmd[x].length==2){
            option.push(cmd[x]);
        }
        else{
            file.push(cmd[x]);
            if(!fs.existsSync(cmd[x])){
                console.log(cmd[x]+"File not exist");
                return;
            }
        }
    }

    for(let x in file){
        str+=fs.readFileSync(file[x]).toString();
    }
    str=str.split("\n");
    if(option.includes("-s")){
        str=remove(str);
    }
    if(option.includes("-n") && option.includes("-b")){
        if(option.indexOf("-b")>option.indexOf("-n")){
            addScount(str);
        }
        else{
            addcount(str);
        }
    }
    else{
        if(option.includes("-b")){
            addcount(str);
        }
        else if(option.includes("-n")){
            addScount(str);
        }
    }

    str=str.join("\n");

    console.log(str);
    console.log(option);
    console.log(file);

})();

function remove(arr) {
    let ans = [];
    for (let i = 0; i < arr.length; i++) {
      let prev = arr[i];
      let curr = arr[i + 1];
      if ((prev == "" && curr == "") || (prev == "\r" && curr == "\r")) {
      } else {
        ans.push(arr[i]);
      }
    }
    return ans;
};

function addcount(arr){
    let count=1;
    for(let i in arr){
        if(arr[i]!="" && arr[i]!="\r"){
            arr[i]=count+"."+arr[i];
            count+=1;
        }
    }
    return arr;
};

function addScount(arr){
    let count=1;
    for(let i in arr){
        arr[i]=count+"."+arr[i];
        count+=1;
    }
    return arr;
};
// console.log(remove([1,"",2,3,"","","",4]));
