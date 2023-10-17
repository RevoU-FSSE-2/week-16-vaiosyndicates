import express from "express";
import { testFetch, registerUser, loginUser, reqRefreshToken } from "../../controller/auth/index.js";


const apirouter = express.Router();

apirouter.get('/auth', testFetch)
apirouter.post('/auth/register', registerUser)
apirouter.post('/auth/login', loginUser)
apirouter.post('/auth/refresh', reqRefreshToken)
 
export default apirouter