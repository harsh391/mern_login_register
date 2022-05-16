const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getUsers = async (req,res) => {
    const users = await Users.find({})
    res.status(201).json({users})
}

const register = async (req,res) => {
    try {
        const {firstname,lastname,email,password} = req.body;

        const existingUser = await Users.findOne({email})
        if(existingUser) return res.status(400).json({msg: 'The email already exists.'})

        if(password.length < 6)
        {
          return res.status(400).json({msg: 'Password must be atleast 6 characters long.'})  
        } 

        // password encryption
        const passwordHash = await bcrypt.hash(password,10)

        const user = await Users.create({
            firstname,lastname,email,password:passwordHash
        });

        // jwt
        const accesstoken = createAccessToken({
            id: user._id
        })
        const refreshtoken = createRefreshToken({
            id: user._id
        })

        // storing tokens to cookie

        res.cookie('refreshtoken',refreshtoken, {
            httpOnly: 'true',
            path: '/user/refresh_token',
            // maxAge: 7*24*60*1000
        })



        res.status(201).json({accesstoken})
        // res.status(201).json({msg:'Registration successful.'})

    } catch (err) {
        return res.status(500).json({msg: err.message})        
    }
}

const login = async (req,res) => {
    try {
        const {email,password} = req.body;
        
        const user = await Users.findOne({email})
        if(!user)
        return res.status(400).json({msg: 'Email not found.'}) 

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)
        return res.status(400).json({msg: 'Incorrect password.'}) 

        //success

        // jwt
        const accesstoken = createAccessToken({
            id: user._id
        })
        const refreshtoken = createRefreshToken({
            id: user._id
        })

        // storing tokens to cookie

        res.cookie('refreshtoken',refreshtoken, {
            httpOnly: 'true',
            path: '/user/refresh_token',
            // maxAge: 7*24*60*1000
        })

        res.status(201).json({accesstoken})

    } catch (err) {
        return res.status(500).json({msg: err.message})        
    }
}

const refreshToken = (req,res) => {
    try {
        const rf_token = req.cookies.refreshtoken;

        if(!rf_token) return res.status(400).json({msg: 'Please Login or Register'})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err,user) => {
            if(err) return res.status(400).json({msg: 'Please Login or Register.'})

            const accesstoken = createAccessToken({id: user.id})
            res.json({accesstoken})
        })
    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

const logout = async (req,res) => {
    try {
        res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
        return res.json({msg: 'Logged Out'})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const getUserInfo = async (req,res) => {
    try {
        const user = await Users.findById(req.user.id).select('-password')
        if(!user) return res.status(400).json({msg: 'User does not exist.'})

        res.json(user)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const createAccessToken = (id) => {
    return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (id) => {
    return jwt.sign(id, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}



module.exports = {login,register,getUsers, refreshToken, logout, getUserInfo}