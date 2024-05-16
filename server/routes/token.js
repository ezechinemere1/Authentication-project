// import JWT from "jsonwebtoken"
// import { User } from "../models/userModel"

// const user = User.findOne({email})

// const token = JWT.sign({username: user.username}, process.env.TOKEN_KEY, {expiresIn:"1h"})

// export {token as token}

import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const signUpControle = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.json({ message: "User already exists" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: encryptedPassword,
    });

    await newUser.save();

    return res.json({ status: true, message: "User created" });
  } catch (error) {
    console.error("Error in sign-up:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signInControle = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "this email or password does not  exist" });
  }

  const verifiedPassword = await bcrypt.compare(password, user.password);

  if (!verifiedPassword) {
    return res.json({ message: "Wrong Password" });
  }

  const token = JWT.sign({ username: user.username }, process.env.TOKEN_KEY, {
    expiresIn: "1h",
  });

  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: " sign in successfully" });
};

const forgotpassword = async (req, res) => {
  const { email } = req.body;

  
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "user does not exist" });
    }
    

  //reset password token generate
  const resettoken = JWT.sign({ id: user._id }, process.env.TOKEN_KEY, {
    expiresIn: "8m",
  });

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chibuzosuccessgodswill@gmail.com",
      pass: "tjcg kzho saxm qwlv",
    },
  });

  var mailOptions = {
    from: "chibuzosuccessgodswill@gmail.com",
    to: email,
    subject: "Reset password",
    text: `http://localhost:5173/reset-password/${resettoken}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.json({ message: "error sending email" }, error);
    } else {
      console.log("Email sent: " + info.response);
      return res.json({
        message: "mail sent",
        status: true,
        response: info.response,
      });
    }
  });
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = JWT.verify(token, process.env.TOKEN_KEY);
    const decodedToken = JWT.decode(token)
    console.log(decodedToken)
    const id = decoded.id;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
    return res.json({
      status: "true",
      message: "Updated password successfully",
    });

    
  } catch (error) {
    console.log(error);
    return res.json({ message: "invalide token" });
  }
};


const verifyUser  = async (req, res, next) =>{
try {
  const token = req.cookies.token;

  if(!token){
    return res.json({status: false, Message:" no token"})
  }

  const decoded =  JWT.verify(token, process.env.TOKEN_KEY)

  next();
} catch (error) {
  console.error(error)
  return res.status(401).json({ status: false, message: "Token invalid or expired" });
}

  
}

const logoutFunction = async (req, res,) =>{
  res.clearCookie('token')
  return res.json({message: "authorised", status: true})

}




const controllers = {
  signInControle,
  signUpControle,
  forgotpassword,
  resetPassword,
  verifyUser,
  logoutFunction ,
};

export { controllers as controllers };
