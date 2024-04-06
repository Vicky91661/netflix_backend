var jwt = require('jsonwebtoken');
const { User } = require('../database/user');

const userAuth = async(req,res,next)=>{
    try {
        const token = req.headers.token;
        const decodedData = jwt.decode(token);
        const email = decodedData.email;
        const user = await User.findOne({email});
        if(user){
            next()
        }else{
            res.status(400).json({
                message:"Not an authenticated user"
            })
        }
    } catch (error) {
        res.status(400).json({
            message:"Something went wrong while fetching data"
        })
    }
}
module.exports = {userAuth}