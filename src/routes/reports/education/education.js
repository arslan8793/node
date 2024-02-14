const express = require('express');
const DB = require('../../../DB/db');
const puppeteer = require('puppeteer');

const router = express.Router();


router.get('/education/pdf', async(req, res) => {
    try {
        const empid = req.body.empid; 

        if(!empid)
        {
            res.send("Enter the employee id");
        }

        let employeeQuery = `SELECT * FROM EMPLOYEE_DETAIL WHERE EMPLOYEE_ID = ${empid}`;
        let employeeResult = await DB(employeeQuery);

        let educationQuery = `SELECT * FROM EDUCATION_DETAIL WHERE EMPLOYEE_ID = ${empid}`;
        let educationResult = await DB(educationQuery);

        if (employeeResult.recordset.length > 0 && educationResult.recordset.length > 0) {
            const employeeData = employeeResult.recordset;
            const educationData = educationResult.recordset;

            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            let employeeStore = '';
            let educationStore = '';

            for (const emp of employeeData) {
                const EMPLOYEE_ID = emp.EMPLOYEE_ID;
                const NAME = emp.NAME;
                const EMAIL = emp.EMAIL;
                const PHONE = emp.PHONE;
                const GENDER = emp.GENDER;

                employeeStore += `
                <tr class='box1'>
                    <td>${EMPLOYEE_ID} </td>
                    <td>${NAME}</td>
                    <td>${EMAIL} </td>
                    <td>${PHONE}</td>
                    <td>${GENDER}</td>
                </tr>
                `;
            }

            for (const edu of educationData) {
                const EDUCATION_ID = edu.EDUCATION_ID;
                const EMPLOYEE_ID = edu.EMPLOYEE_ID;
                const NAME = edu.NAME;
                const X_PERCENT = edu.X_PERCENT;
                const XII_PERCENT = edu.XII_PERCENT;
                const GRADUATION = edu.GRADUATION;
                const MASTERS = edu.MASTERS;

                educationStore += `
                <tr class = 'box'>
                <td> ${EDUCATION_ID} </td>
                <td> ${EMPLOYEE_ID} </td>
                <td> ${NAME} </td>
                <td> ${X_PERCENT}</td>
                <td> ${XII_PERCENT}</td>
                <td> ${GRADUATION} </td>
                <td> ${MASTERS} </td>
                </tr>
             `;
           }

            await page.setContent(`
                <Table class="table1">
                    <tr>
                        <th><h4>EMPLOYEE ID</4></th>
                        <th><h4>NAME</h4></th>
                        <th><h4>EMAIL</h4></th>
                        <th><h4>PHONE</h4></th>
                        <th><h4>GENDER</h4></th>
                    </tr>
                    ${employeeStore}
                </Table>

                <Table class="table">
                   <tr>
                   <th><h4> EDUCATION ID </th></h4>
                   <th><h4> EMPLOYEE ID </th></h4>
                   <th><h4> NAME </th></h4>
                   <th><h4> X PERCENT </th></h4>
                   <th><h4> XII PERCENT </th></h4>
                   <th><h4> GRADUATION </th></h4>
                   <th><h4> MASTERS </th></h4>

                   </tr>
                    ${educationStore}
                </Table>

                <style>

                body{
                    border:2px solid black;
                    padding:15px;
                }

               .table {
                padding : 0;
                width : 100%;
                height : 10vh;
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
            `);

            await page.pdf({ path: 'education_new.pdf', format: 'A4', printBackground: true });
            await page.setViewport({ width: 1080, height: 1024 });
            await browser.close();

            res.send("Education PDF is generated successfully");
        } else {
            res.send("Education PDF is not generated");
        }
    } catch (error) {
        res.send("Error occurred in the catch block");
    }
});

module.exports = router;



