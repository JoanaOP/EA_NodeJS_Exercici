import {Schema, model} from 'mongoose';

const EvaluationSchema = new Schema({
    name: {type: String, required: true},
    evaluation: {type: Number, required: true },
    description: {type: String, required: true}    
})

export default model('Evaluation',EvaluationSchema);