const express = require('express');
const DB = require('../../DB/db');
const {sendMail} = require('../mail/nodemailer');

const router = express.Router();

router.delete('/employee/delete',async(req,res)=>{
try{
    const id = req.body.id;

    if(!id)
    {
        res.send("enter the employee id to delete the data");
    }
      
    let query = `DELETE FROM EMPLOYEE_DETAIL WHERE EMPLOYEE_ID = ${id}`

    let result = await DB(query);
    let deleteData = result.rowsAffected;

    if(deleteData.length > 0)
    {
        text = 'EMPLOYEE DATA IS DELETED SUCESFULLY';
        sendMail(text);

        res.send({'employee id deleted sucesfully': deleteData});
    }
    else
    {
        res.send({'employee id is not deleted': deleteData});
    }
}  catch(error)
{
    res.send("error occour in delete catch block");
}

    
})

module.exports = router;

