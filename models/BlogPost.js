// const mongoose = require('mongoose') 

// const mySchema = new mongoose.Schema({
//     title: String, 
//     body: String,
//   });

// const BlogPost = mongoose.model('BlogPost', mySchema);
 
// module.exports = BlogPost

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    body: String,
    // username: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
        },
    datePosted:{
        type: Date,
        default: new Date()
    },
    image: String
});

const BlogPost = mongoose.model('BlogPost',BlogPostSchema);
module.exports = BlogPost;
