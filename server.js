// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');  // Import the 'path' module
const UserModel = require('./models/Usermodel');
const dotenv=require('dotenv')

// Create an Express app
const app = express();
dotenv.config();

// Use middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Db connected');
}).catch((err) => {
    console.log(err);
});

// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// app.get('/frontend/index.html', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/frontend/index.html'));
// });
app.use(express.json());

app.post("/contact", (req, res) => {
    ContactModel.create(req.body)
        .then((contact) => res.json(contact))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

app.post("/login",(req,res)=>{
    UserModel.findOne({email:email})
    .then(user=>{
        if(user){
        if(user.password===password){
            res.json({ success: true});
        }
        else{
            res.json("the password is incorrect")
        }
    }
    else{
        res.json("No record existed")
    }
    })
})

// Registration route
app.post('/', (req, res) => {
    console.log(req.body);
    UserModel.create(req.body)
        .then((user) => {
            // Redirect to index.html on the client-side
            
            res.json({ success: true});
        })
        .catch((err) => res.status(500).json({ success: false, error: err }));
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
