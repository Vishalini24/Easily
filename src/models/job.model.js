
export default class jobModel{
    constructor(id,jobcategory,jobdesignation,joblocation,companyname,
        salary,applyby,skillsrequired,numberofopenings,applicants){
        this.id=id;
        this.jobcategory=jobcategory;
        this.jobdesignation= jobdesignation;
        this.joblocation=joblocation;
        this.companyname=companyname;
        this.salary=salary;
        this.applyby=applyby;
        this.skillsrequired=skillsrequired;
        this.numberofopenings=numberofopenings;
        this.jobposted=new Date().toLocaleString();
        this.applicants = applicants || [];       
    }

    static jobs = [
        new jobModel(1,'Tech','SDE','Noida IND Remote','Coding Ninjas',14,'2023-10-27',['SQL','C++','Java'],10),
        new jobModel(2,'Tech','MERN Developer','Chennai IND Remote','Go Digit',12,'2023-10-29',['NodeJs','JS','Angular'],20),
        new jobModel(3,'Tech','Front-End Developer','Pune IND Remote','Juspay',20,'2023-11-01',['JS','Express','MongoDB'],5),
    ];

    static addJob(query){
        const newJob = new jobModel(jobModel.jobs.length+1,query.jobcategory,query.jobdesignation,query.joblocation,query.companyname,query.salary,query.applyby,query.skillsrequired,
            query.numberofopenings,query.jobposted,query.applicants);
        jobModel.jobs.push(newJob);
        return newJob;

    }
    static get(){
        return jobModel.jobs;
    }

    static getById(id){
        const result = jobModel.jobs.find((job)=>{
            return job.id == id;
        });
        return result;
    }

    static update(query,id){
        const tobeUpdated = jobModel.jobs.find((job)=>{
            return job.id == id;
        });
        if (tobeUpdated) {
            // Loop through the fields in the query and update only those fields in the job
            for (const field in query) {
                if (query.hasOwnProperty(field)) {
                    tobeUpdated[field] = query[field];
                }
            }
        }    
        return tobeUpdated;
    }

    static delete(id){
        const index = jobModel.jobs.findIndex((p)=>p.id == id);
        jobModel.jobs.splice(index,1);
        return jobModel.jobs;
    }

    static generateUniqueApplicantId() {
        const maxApplicantId = Math.max(...this.applicants.map(applicant => applicant.applicantid), 0);
        return maxApplicantId + 1;
    }

    static filter(data){
        console.log(data);
        // Get all jobs
        let filteredJobs = jobModel.get();
        console.log(filteredJobs);
        // Apply filters
        if (data) {
            filteredJobs = filteredJobs.filter((job) =>
                job.jobdesignation == data.search
            );
        }
        console.log(filteredJobs);
        return filteredJobs;
    }

}

