import express from 'express';
import path from 'path';
import ejsLayouts from "express-ejs-layouts";
import UserController from './src/controllers/user.controller.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';
import jobController from './src/controllers/job.controller.js';
import bodyParser from 'body-parser';
import applicantController from './src/controllers/applicant.controller.js';
import { resumeUpload } from './src/middlewares/fileUpload.middleware.js';
import {auth} from './src/middlewares/auth.middleware.js'
import validateRequest from './src/middlewares/validation.middleware.js';
import validatePostRequest from './src/middlewares/validateJobs.middleware.js';



const server = express();

//parse form data
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.static('public'));


//use ejs-layouts
server.use(ejsLayouts);

//set up view engine settings
server.set("view engine","ejs");
server.set("views",path.join(path.resolve(),"src","views"));

//Cookie and Session
server.use(cookieParser());
server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false},
}));



const usersController = new UserController();
const jobsController = new jobController();
const applicantsController = new applicantController();

server.get("/",(req, res) => {
    res.render("main");
});


//Register and Login
server.get("/register",usersController.getRegister);
server.get("/login",usersController.getLogin);
server.post("/register",usersController.postRegister);
server.post("/login",usersController.postLogin);
server.get("/logout",usersController.logout);


//Post a new job
server.get("/add",auth,jobsController.getPostJobs);
server.post("/add",auth,validatePostRequest,jobsController.addJobs);

//List all jobs
server.get("/jobs",setLastVisit,jobsController.showJobs);

//Job filtering
server.post('/filterJobs', jobsController.filterJob);

//View details of a job
server.get("/:id",jobsController.getOne);
server.get("/:id/viewDetails",jobsController.getViewDetails);

//Update details of a job
server.get("/update/:id",auth,jobsController.getUpdateView);
server.post("/update/:id",auth,jobsController.putUpdate);

//Delete a job
server.post("/delete/:id",auth,jobsController.deleteJob);


//Apply jobs
server.get("/:id/apply",applicantsController.getApply);
server.post("/:id/apply/",resumeUpload.single("resume"),validateRequest,applicantsController.addApplicant);


//Applicants page
server.get("/:id/applicants",auth,applicantsController.getApplicants);

//Update Page
server.get("/:id/update/:applicantid",auth,applicantsController.getUpdateApplicant);
server.post("/:id/update/:applicantid",auth,resumeUpload.single("resume"),applicantsController.updateApplicant);

server.post("/:id/delete/:applicantid",auth,applicantsController.deleteApplicant);

server.get("/error",)

server.listen(4000,()=>{
    console.log("Server is listening on 4000");
});
