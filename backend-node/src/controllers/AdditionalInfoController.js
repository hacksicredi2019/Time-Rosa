const School = require('../models/School');
const AdditionalInfo = require('../models/AdditionalInfo');

module.exports = {
    async store(req,res){
        const {school_id} = req.params;

        const {avaliableVacancies
        ,pedagogicalProposal
        ,specialVacancies
        ,sustainablePractices
        ,extracurricularActivities
        ,schoolDifferential} = req.body;
     
        
        const school = await School.findById(school_id);

        if(!school){
            return res.json({"erro":'Escola inexistente'});    
        }

        const additionalInfo = await AdditionalInfo.create(
            {
            school:school._id
            ,avaliableVacancies
            ,pedagogicalProposal
            ,specialVacancies
            ,sustainablePractices
            ,extracurricularActivities
            ,schoolDifferential
        });

        return res.status(201).json(additionalInfo);
    },
    async show(req,res){
        const {school_id} = req.params;
        
        const school = await School.findById(school_id);

        if(!school){
            return res.json({"erro":'Escola inexistente'});    
        }

        const additionalInfo = await AdditionalInfo.findOne({school:school._id});

        if(!additionalInfo){
            return res.json({"mensagem":'Escola não enviou informações adicionais'});    
        }
        
        return res.json(additionalInfo);
    }
}