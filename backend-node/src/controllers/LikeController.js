const School = require('../models/School');
const User = require('../models/User');

module.exports = {
    async store(req,res){
        const {school_id} = req.params;
        const {user_id} = req.headers;
        console.log(school_id);
        const school = await School.findById(school_id);

        if(!school){
            return res.json({"erro":'Escola inexistente'});    
        }

        const user = await User.findById(user_id);

        if(!user){
            return res.json({"erro":'Usuário não cadastrado'});    
        }

        school.likes.push(user._id);

        await school.save();
        
        return res.json(school);
    }
}