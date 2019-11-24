const User = require('../models/User');

module.exports = {
    async index(req,res){
        const user = await User.find();
        return res.json(user);
    },
    async store(req,res){
        const {name,phone} = req.body;

        var user = await User.findOne({phone});

        if(user){
            return res.json({"erro":`Número ${phone} já cadastrado`});    
        }

        user = await User.create({name,phone})
        
        return res.json(user);
    }
}