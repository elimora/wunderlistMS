const Pool= require('pg').Pool; 


const pool= new Pool({
    user:'postgres', 
    password:'elimora', 
    host: 'localhost', 
    port: 5432,
    database: 'wunderlist'
}); 

module.exports= pool; 