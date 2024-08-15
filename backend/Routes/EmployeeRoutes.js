const { createEmployee, getAllEmployees, getEmployeeById, deleteEmployeeById, updateEmployeeById } = require('../Controllers/EmployeeController.js');
const { cloudinaryFileUploader } = require('../Middlewares/FileUploader.js');

const routes = require('express').Router();

routes.get('/',getAllEmployees);

routes.post('/', cloudinaryFileUploader.single('profileImage'), createEmployee);

routes.put('/:id', cloudinaryFileUploader.single('profileImage'), updateEmployeeById);

routes.get('/:id',getEmployeeById);

routes.delete('/:id',deleteEmployeeById);

module.exports = routes;
