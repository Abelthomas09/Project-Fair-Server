const { response } = require('express');
const projects = require('../models/projectModel')

//add project
exports.addProjectController = async (req,res)=>{
    console.log("inside addProjectController");
    const userId = req.userId
    // console.log(userId);
    // console.log(req.body);
    // console.log(req.file);
    const {title,languages,overview,github,website} = req.body
    const projectImage = req.file.filename
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project Already Existes...Pls try another!!!")
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

//get home page - guest User
exports.getHomeProjectsController = async (req,res)=>{
    console.log("inside getHomeProjectsController");
    try{
        const allHomeProjects = await projects.find().limit(3)
        res.status(200).json(allHomeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

//get user projects - authorised User
exports.getUserProjectsController = async (req,res)=>{
    console.log("inside getUserProjectsController");
    const userId = req.userId
    try{
        const allUserProjects = await projects.find({userId})
        res.status(200).json(allUserProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

//get all projects - authorised User
exports.getAllProjectsController = async (req,res)=>{
    console.log("inside getAllProjectsController");
    //to get query parameters from url req,search
    const searchKey = req.query.search
    try{
        //to get document from model which matches search query in languages 
        const allProjects = await projects.find({
            languages:{
                $regex:searchKey,$options:"i"
            }
        })
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

//edit project - use findByIdAndUpdate
exports.editProjectController = async (req,res)=>{
    console.log("inside editProjectController");
    //get product id from request parms
    const {id} = req.params
    //req.body -contains only the text type data
    const {title, languages, overview, github, website, projectImage} = req.body
    //to get file data req.file
    const reUploadImageFileName = req.file?req.file.filename:projectImage
    //to get user Id use jwtmiddleware
    const userId = req.userId
    console.log(id, title, languages, overview, github, website, reUploadImageFileName,userId);
    try{
        const updatedProject = await projects.findByIdAndUpdate({_id:id},{
            title,languages,overview,github,website, projectImage:reUploadImageFileName,userId
        },{new:true})
        await updatedProject.save()
        res.status(200).json(updatedProject)
    }catch(err){
        res.status(401).json(err)
    }
}

//delete the project- use findByAndDelete
exports.removeProjectController = async (req,res)=>{
    console.log("inside removeProjectController");
    //get product id from request parms
    const {id} = req.params
    //delete project with given id from model
    try{
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    }catch(err){
        res.status(401).json(err)
    }
}