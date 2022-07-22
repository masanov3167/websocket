const fs = require('fs');
const path = require('path')
const jwt = require('jsonwebtoken');

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'model', 'users.json')));
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'model', 'data.json')));

const Token = payload => jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn:"24h"
})
// cookie("token", token({id:234}))

const sign  = (req,res, next) =>{
    const{name, password, email} = req.body;
    const { picture } = req.files
    const find = users.find(a =>  a.password == password || a.email == email);
    if(find){
        return res.render('sign.ejs', {message: "password yoki email avvaldan mavjud :("})
    }
    req.id = users.at(-1)?.id +1 || 1,
    users.push({
        id: users.at(-1)?.id +1 || 1,
        name,
        password,
        email,
        pictureurl: picture[0].filename,
    });


    fs.writeFileSync(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(users, null, 4));
    res.cookie('name', name)
    next();
}

const login  = (req,res, next) =>{
    const{name, password} = req.body;
    const find = users.find(a => a.name == name && a.password == password);
    if(!find){
        return res.render('login.ejs', {message: "password yoki name xato :("})
    }
    next();
}

const verify = (req,res, next) =>{
    const {token}  = req.cookies;
   
    if(token){
        
             
            return res.redirect('/chat')
    }
    
  next();
}

module.exports = {
    sign, login, Token, verify
}