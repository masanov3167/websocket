const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')
const path = require('path')
const multer = require('multer')
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'uploads/'))
    },
    filename: function (req, file, cb) {
      cb(null, uuid.v4() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

router
     .get('/sign', controller.verify, (_, res) => res.render("sign.ejs"))
     .post('/sign',upload.fields([{ name: 'picture', maxCount: 1 }]), controller.sign, (req, res) => {
          res.cookie('token', controller.Token({id:req.id}, { maxAge: 24*60*60*1000 })).redirect('/chat')
     })
     .get('/login',controller.verify, (req, res) => res.render("login.ejs"))
     .post('/login', controller.login, (req, res) => res.cookie('token', controller.Token({id:req.id}, { maxAge: 24*60*60*1000 })).redirect('/chat'))
     // .post('/upload', controller.upload)
     .get('/chat', (req,res) => {
      const {token} = req.cookies;
      if(!token){
        return res.redirect('/sign');
      }
      res.render('chat.ejs')
     });

module.exports = router;      