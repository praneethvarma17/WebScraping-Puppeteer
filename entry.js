const reader = require('xlsx');

const pupp = require('./index');
// console.log(pupp)
const file = reader.readFile("C:/Users/prava/Downloads/Batch 5 - out of stock.xlsx");

let data = [] 

const sheets = file.SheetNames 
  
for(let i = 0; i < sheets.length; i++) 
{ 
   const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]); 
   temp.forEach((res) => { 
      data.push(res) 
   }) 
} 

// Printing data 
// console.log(data)


data = data.slice(600,603)


console.log(data);
let finalRes;
(async () => {
    finalRes = await pupp.pupp(data);
      
    const ws = reader.utils.json_to_sheet(finalRes) 
      
    reader.utils.book_append_sheet(file,ws,"Sheet5") 
      
    // Writing to our file 
    reader.writeFile(file,"C:/Users/prava/Downloads/Batch 5 - out of stock.xlsx") 
})()

console.log('Lets Start Prem Anna :) ')