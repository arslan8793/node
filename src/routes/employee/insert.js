const express = require('express');
const DB = require('../../DB/db.js');
const {sendMail} = require('../mail/nodemailer');
 
const router = express.Router();

router.post('/employee/insert',async(req,res)=>{
try{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const gender = req.body.gender;

    if(!name || !email || !password || !phone || !gender)
    {
        res.send('enter the name , email , password , phone , gender');
    }

    let query = `INSERT INTO EMPLOYEE_DETAIL(NAME , EMAIL , PASSWORD , PHONE , GENDER) VALUES ('${name}' ,'${email}' ,'${password}','${phone}' ,'${gender}')`;

    let result = await DB(query);
    let insertData = result.rowsAffected;

    if(insertData.length > 0)
    {
        text = 'EMPLOYEE DATA IS INSERTED SUCESFULLY';

        sendMail(text);
        res.send({'data inserted sucesfully' : insertData});
    }
    else
    {
        res.json({'data is not inserted' : insertData});
    }
}
    catch(err)
  {
         res.json({'error occour in insert catch block' : err})
  }

})

module.exports = router;
