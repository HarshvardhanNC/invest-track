import jwt from 'jsonwebtoken'
import bycrypt from 'bcryptjs'
import User from '../model/user.model.js';

// register

const registerUser = async(req,res)=>{
    const {username,email,password} = req.body;

    try {

        const checkUser = await User.findOne({email})
        if(checkUser) res.json({success:false,message:"User Alredy Registered!"})

        const hashPassword = await bycrypt.hash(password,12);

        const newUser = new User({
            username,
            email,
            password:hashPassword
        })
        await newUser.save();

        res.status(200).json({
            success:true,
            message:"registered successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'error while registering'
        })
        
    }
}


//login
const login = async(req,res)=>{

    const {email,password} = req.body;
    
    try {

        const checkUser = await User.findOne({email})
        if(!checkUser){
            return res.json({success:false,message:"register the user!"})
        }

        const checkPassword = await bycrypt.compare(password,checkUser.password);
        if(!checkPassword){
            return res.json({
                success:false,
                message:"password is incorrect"
            })
        }

        const token = jwt.sign(
            {
                email:checkUser.email,
                role:checkUser.role,
                id:checkUser.id,
                username:checkUser.username
            },
            'password_client_for_jwt',
            {
                expiresIn:'1d'
            }
        )

        res.cookie('token',token,{httpOnly:true,secure:false}).json({
            success:true,
            message:'loggedIn successfully',
            user:{
                email:checkUser.email,
                id:checkUser.id,
                role:checkUser.role,
                username:checkUser.username
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'error while registering'
        })
        
    }
}

//logout

const logout = (req,res)=>{
    
    res.clearCookie("token").json({
        success:true,
        message:"user loggedOut"
    })

}

//middle ware for auth

const authMiddleWare = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success:false,
            message:'unauthorized user'
        })
    }
    try {
        const decoded = jwt.verify(token,'password_client_for_jwt');
        req.user = decoded
        next();
    } catch (error) {
         res.status(401).json({
            success:false,
            message:'unauthorized user'
        })
        
    }
}

export { registerUser, login, logout, authMiddleWare };
