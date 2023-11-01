import jobModel from "../models/job.model.js";


export default class jobController{

    addJobs(req,res){
        const createdRecord = jobModel.addJob(req.body);
        const jobs = jobModel.get();
        if(jobs){
            res.status(201).render('jobListings',{jobs,userEmail:req.session.userEmail,error:null});
        }
        else{
            res.status(400).render('jobListings',{error:'Job creation failed'});
        }
        
    }

    showJobs(req,res){
        const jobs = jobModel.get();
        res.render('jobListings',{jobs,userEmail:req.session.userEmail,error:null});    
    }
    
    getPostJobs(req,res){
        res.render('addJobs',{message:null});
    }

    getViewDetails(req,res){
        const result = jobModel.getById(req.params.id);
        res.render('view-details',{job:result,message:null,userEmail:req.session.userEmail});
    }

    getOne(req,res){
        const result = jobModel.getById(req.params.id);
        res.render('view-details',{job:result,message:null,userEmail:req.session.userEmail});
    }

    getUpdateView(req,res){
        const job = jobModel.getById(req.params.id);
        if(job){
            res.render('updateJobs',{job});
        }
        else{
            res.status(401).send("Job not Found");
        }
        
    }

    putUpdate(req,res){
       const id = req.params.id;
       const Updated = jobModel.update(req.body,id);
       const jobs = jobModel.get(id);
       if(Updated){
        res.render('view-details',{job:Updated,message:null,userEmail:req.session.userEmail});
       }
    }

    deleteJob(req,res){
        const id = req.params.id;
        const tobeDeleted = jobModel.getById(id);
        if(tobeDeleted){
            const jobs = jobModel.delete(id);
            res.render('jobListings',{jobs,userEmail:req.session.userEmail,error:null});
        }
    }

    filterJob(req,res){
       const filteredJobs =  jobModel.filter(req.body);
       if(filteredJobs){
            res.render('jobListings', {
                jobs: filteredJobs,
                userEmail: req.session.userEmail,
                error:null,
            }); 
       }
       else{
            res.render('jobListings', {
                jobs: filteredJobs,
                userEmail: req.session.userEmail,
                error:'No matching values were found!',
            });
       }
    }
}