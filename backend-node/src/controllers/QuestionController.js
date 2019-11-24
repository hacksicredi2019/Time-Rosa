const Question = require('../models/Question');

module.exports = {
    async index(req,res){
         const question = await Question.find() ;

         return res.status(200).json(question);

    },
    async store(req,res){
        const {description,order,type} = req.body;
        var question = await Question.findOne({description});

        if(question){
            return res.status(200).json(question);    
        }else{
            question = await Question.create({description,order,type});
            return res.status(201).json(question);    
        }
        

   }
}