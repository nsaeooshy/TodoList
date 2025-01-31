const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
require('express-paginate');

router.get('/', async (req, res) => {
    const {
        page = 1, limit = 8
    } = req.query;
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
    } catch (err) {
        res.json({
            message: err
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    } catch (err) {
        res.json({
            message: err
        })
    }
})

router.post('/', async (req, res) => {
    const task = new Task({
        heading: req.body.heading,
        description: req.body.description
    });
    try {
        const savedTask = await task.save();
        res.json(savedTask);
    } catch (err) {
        res.json({
            message: err
        });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        deletedTask = await Task.remove({
            _id: req.params.id
        });
        res.json(deletedTask);
    } catch (err) {
        res.json({
            message: err
        });
    }
})
router.delete('/', async (req, res) => {
    try {
        deletedTasks = await Task.remove({});
        res.json(deletedTasks);
    } catch (err) {
        res.json({
            message: err
        });
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        });
        const updatedDateTask = await Task.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                date: Date.now()
            }
        });
        res.json(updatedDateTask);

    } catch (err) {
        res.json({
            message: err
        });
    }
})

router.patch('/:id/hide_toggle', async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id
        });
        const updatedTask = await Task.updateOne({
            _id: req.params.id
        }, {
            $set: {
                is_hidden: !task.is_hidden
            }
        });
        res.json(updatedTask);

    } catch (err) {
        res.json({
            message: err
        });
    }
})

router.patch('/:id/complete_toggle', async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id
        });
        const updatedTask = await Task.updateOne({
            _id: req.params.id
        }, {
            $set: {
                is_completed: !task.is_completed
            }
        });
        res.json(updatedTask);

    } catch (err) {
        res.json({
            message: err
        });
    }
})

module.exports = router;