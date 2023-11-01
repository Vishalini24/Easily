import jobModel from "./job.model.js";

export default class applicantModel{
  
    constructor(applicantid, name, email, contact, resumePath) {
        this.applicantid = applicantid;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.resumePath = resumePath;
    }

    static add(query, jobId,resumePath) {
        const job = jobModel.getById(jobId);

        if (job) {
            const newApplicantId = job.applicants.length+1;
            const newApplicant = {
                applicantid: newApplicantId, 
                name: query.name,
                email: query.email,
                contact: query.contact,
                resumePath: resumePath,
            };
            job.applicants.push(newApplicant);
    
            return newApplicant;
        } else {
            return null;
        }
    }

    static getApplicantsByJob(jobId) {
        const job = jobModel.getById(jobId);
        if (job) {
            return job.applicants;
        } else {
            return null;
        }
    }

    static updateApplicantDetails(jobId, applicantId, updatedData){

        const job = jobModel.getById(jobId);
        const applicant = job.applicants.find((j)=>{
            return j.applicantid == applicantId;
        });
        if (applicant) {
            // Loop through the fields in the query and update only those fields in the job
                for (const field in updatedData) {
                    if (updatedData.hasOwnProperty(field)) {
                        applicant[field] = updatedData[field];
                    }
                }
        }  
        return applicant;
    }

    static deleteApplicant(jobId, applicantId) {
        const job = jobModel.getById(jobId);
    
        if (job) {
            const index = job.applicants.findIndex((a) => a.applicantid == applicantId);
    
            if (index !== -1) {
                // Remove the applicant from the array
                job.applicants.splice(index, 1);
                return true;
            } else {
                // Handle the case where the applicant with the specified ID doesn't exist
                return false;
            }
        } else {
            // Handle the case where the job with the specified ID doesn't exist
            return false;
        }
    }

    static getApplicantById(jobID,applicantId){
        const job = jobModel.getById(jobID);
        const applicant = job.applicants.find((j)=>{
            return j.applicantid == applicantId;
        });
        return applicant;
    }

}