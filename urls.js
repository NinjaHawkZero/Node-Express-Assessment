const fs = require('fs');
const process = require('process');
const axios = require('axios');









  function handleOutput(text, out) {
    if (out) {
        
        
        let newout;
        console.log(out[4])
        if(out[4] === 's') {newout = out.slice(8, out.length-17)} else
        { newout = out.slice(7, out.length)}
         console.log(newout)
        //You need to write to a new file for each request, currently it appends every data from request to file.
      fs.writeFile(newout, text, 'utf8', function(err) {
        if (err) {
          console.error(`Couldn't write ${out}: ${err}`);
          
        }
      });
    } else {
      console.log(text);
    }
  }




async function webCat(url) {
    try {
        
      let newout = url
      let resp = await axios.get(url);
      handleOutput(resp.data, newout);
    } catch (err) {
      console.error(`Error fetching ${url}: ${err}`);
      
    }
  }


  



  function fileread(path) {
    fs.readFile(path, function(err, data) {
        if(err) throw err;
    
        const arr = data.toString().replace(/\r\n/g,'\n').split('\n');
        arr.length = 4
        console.log(arr)
        for(let url of arr) {
            webCat(url)
        }
        
    })};


let path;
let out;


if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
  } else {
    path = process.argv[2];
  }
fileread(path)