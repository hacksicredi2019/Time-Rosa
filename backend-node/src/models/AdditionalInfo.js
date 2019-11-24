const {Schema,model} = require('mongoose');

const AdditionalInfoSchema = new Schema({
    school:{
        type:Schema.Types.ObjectId,
        ref:'School'
    }
    ,avaliableVacancies:{
        type:String,
        required:true
    }
    ,pedagogicalProposal:String
    ,specialVacancies:Number
    ,sustainablePractices:String
    ,extracurricularActivities:String
    ,schoolDifferential:String
    
},{
    timestamps:true   
}
);

module.exports = model('AdditionalInfo', AdditionalInfoSchema);