const express = require('express')
const bodyParser = require('body-parser') 
const fileUpload = require('express-fileupload')
const expressSession = require('express-session');
const flash = require('connect-flash');


const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

const app = new express()

const ejs = require('ejs') 
app.set('view engine','ejs')
app.use(flash());

const validateMiddleware = require("./middleware/validationMiddleware");
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')


app.use(express.static('public'))
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use('/posts/store',validateMiddleware)
// app.use(expressSession({secret: 'keyboard cat' }))
app.use(expressSession({
  secret: 'meow',
  resave: true,
  saveUninitialized: true
}));

global.loggedIn = null;
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

app.listen(4000, ()=>{
    console.log('App listening on port 4000')
})

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost') 
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout') 



app.get('/',homeController) 
app.get('/post/:id',getPostController) 
// app.get('/posts/new',authMiddleware, newPostController)
// app.post('/posts/store', authMiddleware, storePostController)
app.get('/posts/new',newPostController)
app.get('/auth/register', newUserController)
app.get('/auth/login', loginController)
app.post('/posts/store', storePostController)
app.post('/users/register', storeUserController)
app.post('/users/login',loginUserController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController) 
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController) 
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController) 
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'));



// app.post('/posts/store', async (req,res)=>{ 
//     await BlogPost.create(req.body)
//     res.redirect('/') })

// app.post('/posts/store', async (req, res) => {
//     const { title, body } = req.body;
//     await BlogPost.create({ title, body });
//     res.redirect('/');
// });

// app.post('/posts/store', async(req,res) =>{
//     const blogPost = new BlogPost(req.body);
//     await blogPost.save()
//       .then(item =>{
//         res.send("Information saved to database");
//       })
//       .catch(err =>{
//         res.status(400).send("Unable to save to database");
//       });
//   });

// app.get('/',async (req,res)=>{
//     const blogposts = await BlogPost.find({})
//     res.render('index',{ 
//         blogposts
//     }); 
//     console.log(blogposts)
// })

// app.get('/post/:id',async (req,res)=>{
//     const blogpost = await BlogPost.findById(req.params.id) 
//     res.render('post',{
//         blogpost 
//     })
// })

    
app.get('/',(req,res)=>{
    res.render('index');
    })

// app.get('/about',(req,res)=>{
//     res.render('about');
//     })

// app.get('/contact',(req,res)=>{ 
//     res.render('contact');
// })

// app.get('/post',(req,res)=>{ 
//     res.render('post');
// })
