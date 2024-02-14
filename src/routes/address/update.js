const express = require('express');
const DB = require('../../DB/db');
const {sendMail} = require('../mail/nodemailer');

const router = express.Router();

router.put('/address/update', async(req,res)=>{
  try{
    const id = req.body. id;

    if(!id)
    {
        res.send("Enter the addres id to update the data");
    }

    const name = req.body.name;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;

    let addressQuery = `SELECT * FROM ADDRESS_DETAIL WHERE ADDRESS_ID = ${id}`
    let resultData = await DB(addressQuery);

    if(resultData.recordset.length > 0)
    {
    let query = ` UPDATE ADDRESS_DETAIL SET`

    if(name)
    {
        query += ` NAME = '${name}'`
    }
    if(address1)
    {
        query+= ` ADDRESS_1 = '${address1}'`
    }
    if(address2)
    {
        query += ` ADDRESS_2 = '${address2}'`
    }
    if(city)
    {
        query += ` CITY = '${city}'`
    }
    if(state)
    {
        query += ` STATE = '${state}'`
    }
    if(country)
    {
        query += ` COUNTRY = '${country}'`
    }
    
    query += ` WHERE ADDRESS_ID = ${id}`

    let result = await DB(query);

    text = 'Address detail updated successfully';
    sendMail(text)
    res.send({"address detail is updated sucesfully ":result.rowsAffected});
}
else
{
    res.send("address detail id is not presnt  in the database");
}
  }
    catch(error)
    {
        console.log(error);
        // res.send("error occour in address detail catch block");
    }
})

module.exports = router;