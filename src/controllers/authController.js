const { Router } = require('express');
const user = require('../models/user');
const router = Router();

const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken')
const config = require('../config');
const User = require('../models/user');

router.post('/login', async(req,res,next) =>{
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(404).send('email not exist');
    }
    const passwordIsvalid = await  user.comparePassword(req.body.password, user.password);
    if(!passwordIsvalid){
        return res.status(401).json({
            auth: false,
            message:'token null'
        })
    }
    const token = jwt.sign({id:user._id},config.secret,{expiresIn:60*60*24});
    res.json({auth: true, token});
})
 
router.post('/register', async(req,res,next) =>{
    const { username,email,password,peso,altura,edad,sexo,tipo_ejercicio } = req.body;
    const user = new User({
        nombre: username,
        email: email,
        contraseña: password,
        peso:peso,
        altura:altura,
        edad:edad,
        sexo:sexo,
        tipo_ejercicio:tipo_ejercicio
    })
    user.contraseña = await user.encryptPassword(user.contraseña);
    await user.save()
     const token = jwt.sign({id:user._id},config.secret,{expiresIn:60*60*24})
    console.log('save')
    res.json({auth: true,token: token})
})

router.get('/user',verifyToken, async (req,res,next) =>{
    const User = await user.findById(req.userId, {contraseña: 0});
    if(!User){
        return res.status(404).send('No user found');
    }
    res.json(User);
})

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
  });

module.exports = router;
