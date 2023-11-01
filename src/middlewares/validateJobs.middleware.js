import { body,validationResult } from "express-validator";

const validatePostRequest = async (req,res,next)=>{
    //use express validator
    //1.Set up rules for validation
    const rules = [
        body('joblocation').notEmpty().withMessage("Job Location is required"),
        body('companyname').notEmpty().withMessage("Company Name is required"),
        body('salary')
        .notEmpty().withMessage("Salary is required")
        .custom((value) => {
            if (value <= 0) {
                throw new Error("Salary should be greater than 0");
            }
            return true;
        }),
        body('numberofopenings')
        .notEmpty().withMessage("Total positions field is required")
        .custom((value) => {
            if (value <= 0) {
                throw new Error("Total positions should be greater than 0");
            }
            return true;
        }),
        body('numberofopenings')
            .notEmpty().withMessage("Total positions field is required")
            .isNumeric({gt:0}).withMessage("Total positions should be greater than 0"),
        body('skillsrequired')
        .isArray({ min: 3})
        .withMessage("Select a minimum of 3 skills"),
        body('applyby').notEmpty().withMessage("Apply by field is required"),
    ];

    //2.run those rules
    await Promise.all(rules.map((rule) => rule.run(req)));


    //3.check if there are any errors after running the rules
    var validationErrors = validationResult(req);


    //4. if there are errors return them
    if(!validationErrors.isEmpty()){
        return res.render('addJobs',{message:validationErrors.array()[0].msg});
    }

    next();
};

export default validatePostRequest;