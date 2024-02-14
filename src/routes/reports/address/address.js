const express = require('express');
const DB = require('../../../DB/db');
const puppeteer = require('puppeteer');

const router = express.Router();

router.get('/address/pdf',async(req,res)=>{
     
    try{
        const empid = req.body.empid;

        if(!empid)
        {
            res.send("Enter the employee id ");
        }

        const employeeQuery = `SELECT * FROM EMPLOYEE_DETAIL WHERE EMPLOYEE_ID = ${empid}`
        const employeeResult = await DB(employeeQuery);
    
        const addressQuery = `SELECT * FROM ADDRESS_DETAIL WHERE EMPLOYEE_ID = ${empid}`
        const addressResult = await DB(addressQuery);
    
        if(employeeResult.recordset.length > 0 && addressResult.recordset.length > 0)
        {
            const employeeData = employeeResult.recordset;
            const addressData = addressResult.recordset;
    
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
    
            let employeeStore = '' ;
            let addressStore = '';
    
            for(const emp of employeeData)
            {
                const EMPLOYEE_ID = emp.EMPLOYEE_ID;
                const NAME = emp.NAME;
                const EMAIL = emp.EMAIL;
                const PHONE = emp.PHONE;
                const GENDER = emp.GENDER;
    
                 employeeStore += `
                 <tr class ='box1'>
                 <td>${EMPLOYEE_ID}</td>
                 <td>${NAME}</td>
                 <td>${EMAIL}</td>
                 <td>${PHONE}</td>
                 <td>${GENDER}</td>
                 </tr>
                 `
            }
    
            for(const add of addressData)
            {
                const ADDRESS_ID = add.ADDRESS_ID;
                const EMPLOYEE_ID = add.EMPLOYEE_ID;
                const NAME = add.NAME;
                const ADDRESS_1 = add.ADDRESS_1;
                const ADDRESS_2 = add.ADDRESS_2;
                const CITY = add.CITY;
                const STATE = add.STATE;
                const COUNTRY = add.COUNTRY;
    
                addressStore += `
                <tr class = 'box'>
                     <td> ${ADDRESS_ID} </td>
                     <td> ${EMPLOYEE_ID} </td>
                     <td> ${NAME} </td>
                     <td> ${ADDRESS_1} </td>
                     <td> ${ADDRESS_2} </td>
                     <td> ${CITY} </td>
                     <td> ${STATE} </td>
                     <td> ${COUNTRY} </td>
                </tr>
                `;
            }
    
            await page.setContent(`
             <table class="table1">
                 <tr>
                 <th> <h4> EMPLOYEE ID </h4></th>
                 <th> <h4> NAME </h4></th>
                 <th> <h4> EMAIL </h4></th>
                 <th> <h4> PHONE </h4></th>
                 <th> <h4> GENDER </h4></th>
                 </tr>
                   ${employeeStore}
             </table>
    
             <table class="table">
             <tr>
             <th><h4> ADDRESS ID </th></h4>
             <th><h4> EMPLOYEE ID </th></h4>
             <th><h4> NAME </th></h4>
             <th><h4> ADDRESS 1 </th></h4>
             <th><h4> ADDRESS 2 </th></h4>
             <th><h4> CITY </th></h4>
             <th><h4> STATE </th></h4>
             <th><h4> COUNTRY </th></h4>
             </tr>
                  ${addressStore}
             </table>
    
             <style>

             body{
                border:2px solid black;
                padding:15px;
            }

           .table {
            padding : 0;
            width : 100%;
            border: 2px solid black;
            margin-top: 20%;
            // background-color: yellow;
           }

           .table1{
            border:2px solid black;
            width : 100%;
            margin-top: 8%;
            // background-color: green;
        }

     .table tr th h4 {
            margin : 0;
            border : 2px solid black;
            height:25px;
            display:flex;
            align-items: center;
            justify-content: space-evenly;
            padding: 1px;
            // background-color: pink;
            font-size: 14px;
         }
         
         .table1 tr th h4 {
            margin: 0;
            border: 2px solid black;
            padding: 1px;
        //  background-color: green;
        }

         .box td {
          margin : 0;
          height : 30px;
          border: 2px solid black;
        //   background-color: green;
          text-align: center;
     }

     .box1 td {
        border: 2px solid black;
        font-weight: bold;
        width: 200px;
        text-align: center;
        //  background-color: green;
    }
          </style>
            `)
    
            await page.pdf({path:"address_new.pdf" , format: 'A3' ,printBackground: true });
            await page.setViewport({width:1080 , height:1024})
            await browser.close();
    
            res.send("Address pdf is generated sucesfully");
        }
        else
        {
            res.send("Address pdf is not generated");
        }    
    }
    catch(error)
    {
        res.send("error occour in address catch block")
    }

})

module.exports = router;