
const express = require('express');
const DB = require('../../DB/db');
const {sendMail} = require('../mail/nodemailer');
const router = express.Router();

router.put('/education/update',async(req,res)=>{

  try{
    const id = req.body.id;

    if(!id)
    {
        res.send("Enter the employee id");
    }

    const name = req.body.name;
    const x_percent = req.body.x_percent;
    const xii_percent = req.body.xii_percent;
    const graduation = req.body.graduation;
    const masters = req.body.masters;

    let employeeQuery = `SELECT * FROM EDUCATION_DETAIL WHERE EDUCATION_ID = ${id}`
    let employeeResult = await DB(employeeQuery);
    // console.log(`SELECT * FROM EDUCATION_DETAIL WHERE EDUCATION_ID = ${id}`);

    if(employeeResult.recordset.length > 0)
    {
        let updateQuery = ` UPDATE EDUCATION_DETAIL SET`

        if(name)
        {
            updateQuery += ` NAME = '${name}'`
        }
        if(x_percent)
        {
            updateQuery += ` X_PERCENT = '${x_percent}'`
        }
        if(xii_percent)
        {
            updateQuery += ` xii_percent = '${xii_percent}'`
        }
        if(graduation)
        {
            updateQuery += ` GRADUATION = '${graduation}'`
        }
        if(masters)
        {
            updateQuery += ` MASTERS = '${masters}'`
        }
         updateQuery += ` WHERE EDUCATION_ID = ${id}`
            let result = await DB(updateQuery);

            text = 'Education details updated successfully';
            sendMail(text);
            
          res.send("Education detail is updated sucesfully");
    }
    else
    {
        res.send("education detail is not updated sucesfullly")
    }
  }
  catch(err)
  {
    res.send("error occour in education catch block")
  }

})
 
module.exports = router;