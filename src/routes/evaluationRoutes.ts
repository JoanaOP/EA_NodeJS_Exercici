import {Request, response, Response, Router} from 'express';

import Evaluation from '../models/Evaluation';

class EvaluationRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes(); //This has to be written here so that the method can actually be configured when called externally.
    }

    public async getEvaluations(req: Request, res: Response) : Promise<void> { //It returns a void, but internally it's a promise.
        const allEvaluations = await Evaluation.find();
        if (allEvaluations.length == 0){
            res.status(404).send("There are no evaluations yet!")
        }
        else{
            res.status(200).send(allEvaluations);
        }
    }

    public async getEvaluationByName(req: Request, res: Response) : Promise<void> {
        const evaluationFound = await Evaluation.findOne({name: req.params.nameEvaluation});
        if(evaluationFound == null){
            res.status(404).send("The evaluation doesn't exist!");
        }
        else{
            res.status(200).send(evaluationFound);
        }
    }

    public async addEvaluation(req: Request, res: Response) : Promise<void> {
        console.log(req.body);
        const {evaluation, description, name} = req.body;
        const newEvaluation = new Evaluation({evaluation, description, name});
        await newEvaluation.save();
        res.status(200).send('Evaluation added!');
    }

    public async updateEvaluation(req: Request, res: Response) : Promise<void> {
        const evaluationToUpdate = await Evaluation.findOneAndUpdate ({name: req.params.nameEvaluation}, req.body);
        if(evaluationToUpdate == null){
            res.status(404).send("The evaluation doesn't exist!");
        }
        else{
            res.status(200).send('Updated!');
        }
    }

    public async deleteEvaluation(req: Request, res: Response) : Promise<void> {
        const evaluationToDelete = await Evaluation.findOneAndDelete ({name:req.params.nameEvaluation}, req.body);
        if (evaluationToDelete == null){
            res.status(404).send("The evaluation doesn't exist!")
        }
        else{
            res.status(200).send('Deleted!');
        }
    } 
    routes() {
        this.router.get('/', this.getEvaluations);
        this.router.get('/:nameEvaluation', this.getEvaluationByName);
        this.router.post('/', this.addEvaluation);
        this.router.put('/:nameEvaluation', this.updateEvaluation);
        this.router.delete('/:nameEvaluation', this.deleteEvaluation);
    }
}
const evaluationRoutes = new EvaluationRoutes();

export default evaluationRoutes.router;