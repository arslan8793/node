const express = require("express");
const DB = require("../../DB/db");
const router = express.Router();

router.get("/employee/fetch", async (req, res) => {
  try {
    // const token = req.headers.authorization;
    // console.log({ token });
    // if (token) {
    //   const tokenCheck = verifyToken(token);
    //   console.log({ tokenCheck });
    //   if (tokenCheck) {
        const id = req.body.id;

        if (!id) {
          res.send("enter the employee id");
        }

        let query = `SELECT * FROM EMPLOYEE_DETAIL WHERE EMPLOYEE_ID = ${id}`;

        let result = await DB(query);
        let resulData = result.recordset;

        if (resulData.length > 0) {
          res.send({ "sucesfully get the employee data": resulData });
        } else {
          res.send({ "employee data is empty": resulData });
        }
    //   } else {
    //     res.send("Invalid token");
    //   }
    // } else {
    //   res.send("token not passed");
    // }
  } catch (err) {
    res.send("error occour in fetch catch block");
  }
});

module.exports = router;
