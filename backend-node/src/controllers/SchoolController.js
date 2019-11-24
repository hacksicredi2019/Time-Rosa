const School = require('../models/School');
const geolib = require('geolib');


module.exports = {
    async index(req,res){
        const query = req.query;
        const {latitude,longitude} = req.params;
        const {serie} = req.headers;
        var school = await School.find(query);
        school.forEach(element => {
            if(element.latitude){
                console.log(element.userDistance);
            element.userDistance = geolib.getDistance(
                { latitude, longitude },
                { latitude: element.latitude, longitude: element.longitude }
            );
            
            element.save();
            }
        });
        console.log(serie);
        
        if(serie){
            school = await School.find({series: {$in:[serie]}}).where(query).sort('userDistance')
        /*school = await School.find({
            
            $and:[
                {series: {$in:[serie]}}
                ,{query}
                ]
            }).sort('userDistance')*/
        }else{
            school = await School.find(query).sort('userDistance')
        }
        return res.json(school);
       
    },
    async show(req,res){
        const query = req.query;

        var school = await School.find(query);

        return res.json(school);

    },
    async store(req,res){
        const {
            name,
            thumbmail,
            type,
            state,
            city,
            district,
            morning,
            evening,
            night,
            lab_informatica,
            lab_ciencia,
            quadra_esportes,
            biblioteca,
            parque_infantil,
            bercario,
            banheiro_pne,
            dependencia_pne,
            banheiro_chuveiro,
            refeitorio,
            auditorio,
            alojamento_aluno,
            lavanderia,
            internet,
            alimentacao,
            atividade_complementar,
            educacao_indigena,
            final_semana,
            telefone,
            cep,
            latitude,
            longitude,
            reciclagem,
            serie,
        } = req.body;

        var school = await School.findOne({name});

        if(school){
            return res.json({"erro":`Escola ${name} já cadastrada`});    
        }

        school = await School.create({
            name,
            thumbmail,
            type,
            state,
            city,
            district,
            morning,
            evening,
            night,
            lab_informatica,
            lab_ciencia,
            quadra_esportes,
            biblioteca,
            parque_infantil,
            bercario,
            banheiro_pne,
            dependencia_pne,
            banheiro_chuveiro,
            refeitorio,
            auditorio,
            alojamento_aluno,
            lavanderia,
            internet,
            alimentacao,
            atividade_complementar,
            educacao_indigena,
            final_semana,
            telefone,
            cep,
            latitude,
            longitude,
            reciclagem,
            serie
        })
        
        return res.json(school);
    }
}