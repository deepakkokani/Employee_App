const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config(); //load env file into process variable
const PORT = process.env.PORT || 5000
require('./Models/db.js');
const EmployeeRouter = require('./Routes/EmployeeRoutes.js');

app.get('/', (req,res) => {
    res.send('Employee Management Server is running');
})

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/api/employees', EmployeeRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})