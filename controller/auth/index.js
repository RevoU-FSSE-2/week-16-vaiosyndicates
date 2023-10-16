import bcrypt from 'bcrypt'
import { checkUserbyEmail, getUser, postUser } from "../../model/index.js"
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config()

export const testFetch = async (req, res) => {
  const data = await getUser()

  res.status(200).json({
    responseCode: 200,
    message: "success",
    data: data, 
  });
  // res.send('hellow')
}

export const registerUser = async (req, res) => {
  const { email, name, address, password, role} = req.body

  try {

    const checkUser = await checkUserbyEmail(email)

    if(checkUser.responseCode == 200) {
      res.status(409).json({responseCode: 409, status: 'User already exist'})
    } else {
      const payload = {
        email: email,
        name: name,
        address: address,
        password: await bcrypt.hash(password, 10),
        role: role
      }
  
      const data = await postUser(payload)
      
      if(data.responseCode == 200) {
        res.status(200).json({
          responseCode: 200,
          message: "success",
        })
      } else {
        res.status(404).json({
          responseCode: 404,
          message: "failed",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      responseCode: 500,
      message: error.message,
    });
  }
}

export const loginUser = async (req, res) => {
  const { email, password, role } = req.body
  try {
    const checkUser = await checkUserbyEmail(email)
    if(checkUser !== null) {
      const checkpw = await bcrypt.compare(password, checkUser.data.password)
      if(checkpw) {
        const token = jwt.sign({id: checkUser.data.id ,name: checkUser.data.name, role: checkUser.data.role}, process.env.SECRET_JWT)
        res.status(200).json({
          responseCode: 200,
          message: 'Login success',
          data: {
            token: token
          },
        })
      } else {
        res.status(404).json({
          responseCode: 404, 
          status: 'Password not match',
        })
      }
    } else {
      res.status(404).json({
        responseCode: 404,
        message: "User not found",
      });
    }

  } catch (error) {
    res.status(500).json({
      responseCode: 500,
      message: error.message,
    });
  }
}