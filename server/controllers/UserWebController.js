
const Admin=require('../models/Admin');
const UserMobileApp=require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


exports.signup=async(req,res)=>{
    req.body.profilepic=`http://localhost:3000/file/${req.file.filename}`;
    Admin.findOne({
        email : req.body.email            
    }).exec( (err,us) => {
        if(us) return res.status(501).send("User already exists !!");
        UserMobileApp.findOne({
            email : req.body.email 
        }).exec( (err1,uss) => {
                const _User=new Admin(req.body);
                if(uss) return res.status(501).send("User already exists !!");
                _User.save((error,user)=>{
                    if(error) return res.status(500).send("error"+error);
                    return res.status(200).json(user);
                })
        })  
    })
}


exports.login=async(req,res)=>{
    await Admin.findOne({
        email : req.body.email            
    }).exec((error,admin)=>{
    if(error) return res.status(400).json({ error })
    if(admin){
        if(admin.role!="ADMIN" && admin.Status==false)return res.status(409).send("Please contact the admin to activate your account");
        admin.authenticate(req.body.Password).then(data=>{
            if(data){
                const admin1={name:admin.email,role:admin.role}
                const token =jwt.sign(admin1,process.env.JWT_SECRET,{expiresIn: "1d"});
              return   res.status(200).json({Admin:admin,AccessToken: token})
            }else{
                return res.status(405).json({message:"Error login !"})
            }
        });
    }  else{
        res.status(402).json({error: "erreur !"});
    }
    })
}
exports.getUserById=async(req,res)=>{
    try{
        Admin.findById({_id:req.params.id}).then(ress=>{
            if(res) return res.status(200).json(ress);
            res.status(507).send("error");
        })
    }catch(err){
        res.status(506).send(err);
    }
}
exports.getAdminData=async(req,res)=>{
    if(req.user.role!="ADMIN") return res.status(505).send("Sorry only the admin can display this data");
    const admin=await Admin.find({email:{$ne:req.user.name}}).select([
        "email","username","Status","profilepic","role"
    ]);
    
    if(admin){
        res.status(200).json(admin);
    }else{
        res.status(503).send('no data found');
    }
}

exports.deleteuser=async(req,res)=>{
    if(req.user.role!="ADMIN") return res.status(505).send("Sorry only the admin can touch this");
    await Admin.findByIdAndRemove({_id:req.params.id}).then(admin=>{
        try{
            if(admin) return res.status(200).send("User deleted !!");
                return res.status(505).send("You have an error please try again");
        }catch(err){
            return res.status(506).send(err);
        }
    })
}

exports.updateAdmin=async(req,res)=>{
    if(req.user.role!="ADMIN") return res.status(505).send("Sorry only the admin can touch this");
    await Admin.findByIdAndUpdate({_id:req.params.id},req.body).then(admin=>{
        if(!admin)return res.status(400).send("Admin not found");
    })
    Admin.findById({_id:req.params.id}).select([
        "email","username","Status","profilepic","role"
    ]).then(data=>{
        if(data){
            return res.status(200).json(data);
        }else{
            return res.status(401).json({error:"error"});
        }
    })
}


exports.getUserConnect = async(req,res) => {
    try{
        Admin.find({email:req.user.name}).then(admin=>{
            if(admin) return res.status(200).json(admin);
            return res.status(555).send("error");
        })
    }catch(err){
        return res.status(556).send(err);
    }
    
}