const express = require('express');
const DB = require('../../DB/db');
const {sendMail} = require('../mail/nodemailer');


const router = express.Router();

router.post('/education/insert',async(req,res)=>{

  try{
    const id = req.body.id;
    const name = req.body.name;
    const x_percent = req.body.x_percent;
    const xii_percent = req.body.xii_percent;
    const graduation = req.body.graduation;
    const masters = req.body.masters;

    if(!id || !name || !x_percent || !xii_percent || !graduation || !masters)
    {
        res.send("enter the id , name , x_percent , xii_percent , graduation , master ");
    }

    let employeeQuery = `SELECT * FROM EMPLOYEE_DETAIL WHERE EMPLOYEE_ID = ${id}`

    let employeeResult = await DB(employeeQuery);
    //  console.log(employeeResult);
    if(employeeResult.recordset.length > 0)
    {
        let query = `INSERT INTO EDUCATION_DETAIL (EMPLOYEE_ID , NAME , X_PERCENT , XII_PERCENT , GRADUATION , MASTERS) VALUES ( ${id} , '${name}' , '${x_percent}' , '${xii_percent}' , '${graduation}' , '${masters}' )`
        let result = await DB(query);

        text = 'Education Details Added Successfully';
        sendMail(text);
        
        res.send({"data inserted sucesfully":result.rowsAffected});
    }
    else
    {
        res.send("data is not inserted" );
    }
  }                                                                           
  catch(err)
  {
    console.log(err);
    res.send("error occour in education insert catch block");
  }

})

module.exports = router;


