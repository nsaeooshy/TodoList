const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
require('express-paginate');

router.get('/', async (req,res)=>{
    const { page = 1, limit = 8 } = req.query;
    try {
        const tasks = await Task.find().select('-description')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        const count = await Task.countDocuments();
        res.json({
        tasks,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (err){
        res.json({message: err})
    }
})

router.get('/:id',(req,res)=>{
})

router.post('/',async(req,res)=>{
    const task = new Task({
        heading: req.body.heading,
        description : req.body.description
    });
    try{
        const savedTask = await task.save();
        res.json(savedTask);
    } catch(err){
        res.json({message:err});
    }
})

router.delete('/:id',(req,res)=>{
})

router.patch('/:id',(req,res)=>{
})

router.patch('/:id/hide',(req,res)=>{

})

router.patch('/:id/complete',(req,res)=>{
    
})

module.exports =  router;