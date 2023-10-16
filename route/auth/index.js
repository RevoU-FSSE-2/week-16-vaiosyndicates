import express from "express";
import { testFetch, registerUser, loginUser } from "../../controller/auth/index.js";


const apirouter = express.Router();

apirouter.get('/auth', testFetch)
apirouter.post('/auth/register', registerUser)
apirouter.post('/auth/login', loginUser)
 
export default apirouter