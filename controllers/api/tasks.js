const Task = require('../../models/task');
const Category = require('../../models/category');

module.exports = {
    index,
    show,
    delete: deleteTask,
    update,
    addTaskToCategory
};

async function index(req, res) {
    try {
        await Task.find({user: req.user._id}).populate('category').exec().then(tasks => {
            res.json(tasks);
        });
        } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};

async function show(req, res) {
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};



async function deleteTask(req, res) {
    try {
        await Task.deleteOne({_id: req.params.id, user: req.user._id});
        res.json(true);
    } catch (err) {
        res.status(400).json(err);
    }
};

async function update(req, res) {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body);
        res.json(task);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
};

async function addTaskToCategory(req, res) {
    try {
        const category = await Category.findById(req.body.categoryId);
        const task = await Task.create({
            name: req.body.taskText.name,
            category: req.body.categoryId,
            description: req.body.taskText.description,
            user: req.user._id,
            time: req.body.taskText.time,
            priority: req.body.taskText.priority,
            image: req.body.taskText.image
        });
        category.tasks.push(task);
        category.save();
        res.json(task);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};