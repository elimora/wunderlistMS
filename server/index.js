const express=require('express');
const app=express(); 
const cors= require('cors'); 
const pool=require('./db')

//middleware
app.use(cors()); 
app.use(express.json()); 
 
//Routes//

//create a todo
app.post('/todos', async(req,res)=>{
    try {
        const {descripcion}=req.body; 
        const newTodo=await pool.query("INSERT INTO todo (descripcion) VALUES ($1) RETURNING *",
         [descripcion]
         ); 
        res.json(newTodo.rows[0]); 

    } catch (error) {
        console.error(error.message)
    }
})

//get all todo
app.get('/todos', async(req,res)=>{
    try {
        const allTodos=await pool.query('SELECT * FROM todo'); 
        res.json(allTodos.rows); 

    } catch (error) {
        console.error(error.message)
    }
})

//get a todo
app.get('/todos/:id', async(req,res)=>{
    try {
        const{id}=req.params; 
        const todo= await pool.query('SELECT * FROM todo WHERE id = $1',
        [id]); 
        res.json(todo.rows[0]); 

    } catch (error) {
        console.error(error.message); 
    }
})

//update a todo 

app.put('/todos/:id', async(req, res)=>{
    try {
        const {id}=req.params; 
        const {descripcion}= req.body; 
        const updateTodo= await pool.query('UPDATE todo SET descripcion = $1 WHERE id = $2',
        [descripcion,id]
        ); 

        res.json('tarea acualizada')
    } catch (error) {
        console.error(error.message); 
    }
})

//delete a todo 

app.delete('/todos/:id',async(req, res)=>{
    try {
        const {id}= req.params; 
        const deteleTodo= await pool.query('DELETE FROM todo WHERE id = $1',
        [id]
        ); 
        res.json('tarea borrada')
    } catch (error) {
        console.error(error.message)
    }
})
app.listen(5000, ()=>{
    console.log("Srevidor iniciado en el puerdo 5000")
}); 