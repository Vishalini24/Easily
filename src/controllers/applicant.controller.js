import applicantModel from "../models/applicant.model.js";
import path from 'path';
import jobModel from "../models/job.model.js";
import { sendMail } from "../middlewares/email.middleware.js";

export default class applicantController{


    addApplicant = async(req,res)=>{
        const jobId = req.params.id; // Get the job ID from the URL
        const relativePath = path.relative('public', req.file.path);
        const createdRecord = applicantModel.add(req.body, jobId, relativePath);
        
        try {
            await sendMail(createdRecord.name, createdRecord.email);   
            const result = jobModel.getById(jobId);
            res.render('view-details', { job: result, message: 'Applied to job successfully' });
        } catch (error) {
            console.error(error);
        }
    }

    getApplicants(req, res) {
        const jobId = req.params.id; // Get the job ID from the URL
        const applicants = applicantModel.getApplicantsByJob(jobId); // Get applicants for the specific job
        res.render('applicants', {  jobId,applicants : applicants});
    }

    getApply(req, res) {
        res.render('applyJobs',{id:req.params.id,message:null});
    }

    getUpdateApplicant(req,res){
        const jobID = req.params.id;
        const applicantID = req.params.applicantid;
        const applicant = applicantModel.getApplicantById(jobID,applicantID);
        res.render('updateApplicant', {jobID,applicant});
    }

    updateApplicant(req,res){
        const jobId = req.params.id;
        const applicantId = req.params.applicantid; 
        const updatedData = req.body; 

        const updatedApplicant = applicantModel.updateApplicantDetails(jobId, applicantId, updatedData);
    
        if (updatedApplicant) {
            const applicants = applicantModel.getApplicantsByJob(jobId);
            res.render('applicants', { jobId, applicants});
        } else {
            const applicants = applicantModel.getApplicantsByJob(jobId);
            res.render('applicants',{ message: 'Applicant not found or job not found',jobId, applicants });
        }
    }

    deleteApplicant(req, res) {
        const jobId = req.params.id;
        const applicantId = req.params.applicantid; 
    
        const success = applicantModel.deleteApplicant(jobId, applicantId);
        const applicants = applicantModel.getApplicantsByJob(jobId);
    
        if (success) {
            res.render('applicants', { jobId, applicants});
        } 
    }
}

