const { ImageMarket }=require('../models/ImageMarket.model');
const Admin =require('../models/Admin');

exports.addImageMarket=async(req,res)=>{
    try{
        if (req.file === undefined) return res.status(500).send("you must select a file.");
        const admin =await Admin.findById({_id:req.params.id});
        req.body.Admin=admin._id;
        req.body.image=`http://localhost:3000/file/${req.file.filename}`;
        if(admin){
          const  market=new ImageMarket(req.body);
          market.save((err,image) => {
                if(err) return res.status(508).send(err);
                return res.status(200).json(image);
            })
        }else{
            return res.status(509).send("User not found");
        }

    }catch(err){
        return res.status(519).send("error"+err);
    }
   
    
}

exports.getAll=async (req,res)=>{
    if(req.user.role!="ADMIN") return res.status(505).send("Sorry only the admin can display this data");
    try{
      ImageMarket.find({}).populate('Admin').then(data=>{
            return res.status(200).send(data);
       }).catch(err=>{
            return res.status(500).send(err);
       });

    }catch(err){
        return res.status(519).send("error"+err);
    }
   
}

exports.getAllForSimpleUser=async (req,res)=>{
    if(req.user.role=="ADMIN") return res.status(505).send("Sorry only the users can display this data");
    try{
        const admin=await Admin.findOne({email:req.user.name});
       
      ImageMarket.find({AdminAnswer:true,Admin:admin._id}).populate('Admin').then(data=>{
          
            return res.status(200).send(data);
       }).catch(err=>{
            return res.status(500).send(err);
       });

    }catch(err){
        return res.status(519).send("error"+err);
    }
   
}

exports.updateMarket=async (req,res)=>{
    try{
        if(req.user.role!="ADMIN") return res.status(505).send("Sorry only the Admin can display this data");
        await ImageMarket.findByIdAndUpdate({_id:req.params.id},req.body).then(imageMarket=>{
            if(!imageMarket)return res.status(400).send("Admin not found");
            ImageMarket.findById({_id:req.params.id}).then(data=>{
                if(data){
                    return res.status(200).json(data);
                }else{
                    return res.status(401).json({error:"error"});
                }
            }) 
        })
    }catch(err){
        return res.status(406).json({error:err});
    }
    
}

