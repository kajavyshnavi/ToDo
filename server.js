const express = require('express');
const mongoose = require('mongoose');
const ToDo = require('./model');

const app = (express());
app.use(express.json());

mongoose.connect('mongodb+srv://kajavyshnavi324_db_user:.mongodb.net/').then(()=> console.log('connected to database')
).catch (err =>console.log(err));

app.post('/createTask', async(req,res)=>{
    const{title} = req.body;
    const{description} = req.body;
    const{completed} = req.body;
    const{priority} = req.body;
    const{dueDate} = req.body;
try{
    const newData = new ToDo({title, description, completed, priority, dueDate});
    await newData.save();
    return res.json({message: 'Task created successfully'});
}
catch(err){
    console.log(err);
}

});

app.get('/get-all_ToDo', async(req,res)=>{
    try{
        const allData = await ToDo.find();
        return res.json(allData);
    }
    catch(err){
        console.log(err);
    }
})

app.put('/update/:id' , async(req,res)=>{
    const{title} = req.body;
    const{description} = req.body;
    const{completed} = req.body;
    const{priority} = req.body;
    const{dueDate} = req.body;

    try{
        await ToDo.findByIdAndUpdate(req.params.id, {title,description,completed,priority,dueDate},
            {new: true}
        );

        return res.json(await ToDo.find());
    }
    catch (err) {
        console.log(err.message);
    }
});

app.put('/updatestatus/:id', async(req,res)=>{
    const{completed} = req.body;

    try{
        await ToDo.findByIdAndUpdate(req.params.id, {completed},
            {new: true}
        );
        return res.json('task completed');
    }
    catch (err) {
        console.log(err.message);
    }
});
app.delete('/delete/:id', async(req,res)=>{

    try{
        await ToDo.findByIdAndDelete(req.params.id);
        return res.json(await ToDo.find());
    }
    catch(err){
        console.log(err.message)
    }


});


app.listen(8000,()=>console.log(' server running on http://localhost:8000'));
