const express = require('express');
const jsonWebtoken = require('jsonwebtoken');

const app = express();

app.use(express.json());

// firstly a create a regitration for a user
const User = [];
const secretkey = 'vihal123';
app.post('/register',(req,res)=>{
    const {username,password} = req.body;
    const user = {id:User.length+1,username,password};

    User.push(user)
    
    res.send(`the User is registered successfully ${user.username}`)

});

// for login the user and the sign the data in token form 

app.post('/login',(req,res)=>{
    const {username,password} = req.body;
    const user = User.find(user =>{
       return  user.username === username;
    });
    console.log(user);
    // then we create a jsonwebToken
    if(user){
        const token = jsonWebtoken.sign({ user},secretkey,{expiresIn:'1h'});
        console.log('the user token',token)
        res.json({message:'the user is logged in',token})
    }else{
        res.send('the user is not verified')
    }
});

// atuherized a user by verify the user is authenticated or not 

app.get('/dashboard',(req,res)=>{
   const token = req.headers['authorization']?.split(' ')[1];
   console.log('the token is provided by server',token);
   console.log('Decoded token (without verification):', jsonWebtoken.decode(token));
   if(token){
    jsonWebtoken.verify(token,secretkey,(err,user)=>{
        // console.log('the token from the client user data ',user)
         if(err){
            console.log('the error in the jsonwebToken',err)
            return res.send('the user have not signed')
         }else{
            console.log('the user data from the verify',user)
            req.user = user;

            res.send(`the user is ${req.user.user.username}`)

         }
    });
    
   }else{
     res.send('the user have not authenticated')
   }
});

// create server for this

app.listen(8000,()=>{
    console.log(`the server running on the http://localhost:${8000}`)
});