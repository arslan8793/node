const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const {customMiddleware } = require('./src/routes/middleware/middleware');

const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json())
app.use(cors());

const PORT = 4000;

const Einsert = require('./src/routes/employee/insert');
const Eupdate = require('./src/routes/employee/update');
const Edelete = require('./src/routes/employee/delete');
const Efetch = require('./src/routes/employee/fetch');

const EDinsert = require('./src/routes/education/insert');
const EDupdate = require('./src/routes/education/update');
const EDdelete = require('./src/routes/education/delete');
const EDfetch = require('./src/routes/education/fetch');

const Ainsert = require('./src/routes/address/insert');
const Aupdate = require('./src/routes/address/update');
const Adelete = require('./src/routes/address/delete');
const Afetch = require('./src/routes/address/fetch');

const employeePdf = require('./src/routes/reports/employee/employee');
const educationPdf = require('./src/routes/reports/education/education');
const addressPdf = require('./src/routes/reports/address/address');

const employeeExcel = require('./src/routes/excelsheet/employee/emloyee');
const educationExcel = require('./src/routes/excelsheet/education/education');
const addressExcel = require('./src/routes/excelsheet/address/address')

app.use(customMiddleware);

app.use(Einsert);
app.use(Eupdate)
app.use(Edelete);
app.use(Efetch);

app.use(EDinsert);
app.use(EDupdate);
app.use(EDdelete);
app.use(EDfetch);

app.use(Ainsert);
app.use(Aupdate);
app.use(Adelete);
app.use(Afetch);

app.use(employeePdf);
app.use(educationPdf);
app.use(addressPdf)

app.use(employeeExcel);
app.use(educationExcel);
app.use(addressExcel);

app.listen(PORT ,()=>{
    console.log(`server is rnning on port ${PORT}`);
})
