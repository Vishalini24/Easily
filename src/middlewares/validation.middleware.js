import { body,validationResult } from "express-validator";

const validateRequest = async (req,res,next)=>{
    //use express validator
    //1.Set up rules for validation
    const rules = [
        body('name').notEmpty().withMessage("Name is required"),
        body('email').isEmail().withMessage("Invalid email address"),
        body('contact').notEmpty().withMessage("Contact is required"),
        body('contact')
            .isLength({ min: 10, max: 10 }).withMessage("Contact should be exactly 10 digits")
            .not().matches(/^0/).withMessage("Contact should not start with 0"),
        body('resume').custom((value , {req})=>{
            if(!req.file){
                throw new Error("Resume is required");
            }
            return true;
        }),
    ];

    //2.run those rules
    await Promise.all(rules.map((rule) => rule.run(req)));


    //3.check if there are any errors after running the rules
    var validationErrors = validationResult(req);


    //4. if there are errors return them
    if(!validationErrors.isEmpty()){
        return res.render('applyJobs',{id:req.params.id,message:validationErrors.array()[0].msg});
    }

    next();
};

export default validateRequest;