const XLSX = require('xlsx');
const axios = require('axios');
const workbook = XLSX.readFile('C:\\Users\\USER\\OneDrive\\Escritorio\\archivos-excel\\prueba.xlsx');
const sheet_name_list = workbook.SheetNames;
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

const webhookUrl = 'https://hooks.zapier.com/hooks/catch/12252834/3ovyykp/';

let i = 0;
let total = data.length;

console.log("Inicio el proceso!");
const intervalData = setInterval(() => {

    axios.post(webhookUrl, data[i])
        .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    }); 

    if(i === total - 1){
        clearInterval(intervalData);
    }

    i++;

}, 60000);
