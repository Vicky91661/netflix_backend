const { User } = require("../database/user");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

require('dotenv').config()
const jwt_secret_key = process.env.JWT_SECRET_KEY;
const saltRounds = Number(process.env.SALT_ROUNDS);

const userSignin = async(req,res)=>{
        const email = req.body.email;
        const password = req.body.password;
        const isSignin = req.body.isSignin;
        if(isSignin){
            try {
                const user = await User.findOne({email});
                if(user){
                    const isValidPassword =await bcrypt.compare(password, user.password)
                    if(isValidPassword){
                        var token = jwt.sign({ email }, jwt_secret_key);
                        return res.status(200).json({
                            message:"success",
                            name:user.name,
                            email:user.email,
                            token
                        })
                    }else{
                        return res.status(404).json({
                            message:"Incorrect Password"
                        })
                    }
                }else{
                    return res.status(404).json({
                        message:"Invalid User"
                    })
                }
            } catch (error) {
                return res.status(400).json({ message: "Something went wrong" });
            }
            
        }else{
            try {
                const name = req.body.name;
                const hashValue = await bcrypt.hash(password,saltRounds);
                console.log("hased password is",hashValue )
                const user = await User.findOne({email});
                console.log("user inside the database",user)
                if(user){
                    return res.status(404).json({
                        message:"Already a User"
                    })
                }else{
                    const createdUser = await User.create({
                        name:name,
                        email:email,
                        password:hashValue
                    })
                    if(createdUser){
                        var token = jwt.sign({ email }, jwt_secret_key);
                        return res.status(200).json({
                            message:"user created",
                            name:createdUser.name,
                            token,
                            email:createdUser.email
                        })
                    }else{
                        return res.status(404).json({
                            message:"user not created"
                        })
                    }
                   
                }
            } catch (error) {
                console.log("Error:", error);
                return res.status(400).json({ message: "Something went wrong" });
            }
    
        }
       
}

module.exports  = {userSignin}