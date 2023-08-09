//Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid/v4');
const morgan = require('morgan');

//create an express app
const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

//comments
const comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

//create a route
app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    const newComment = {
        id: uuid(),
        username: req.body.username,
        comment: req.body.comment
    }
    comments.push(newComment);
    res.json(newComment);
});

app.get('/comments/:id', (req, res) => {
    const foundComment = comments.find(comment => comment.id === req.params.id);
    res.json(foundComment);
});

app.put('/comments/:id', (req, res) => {
    const foundComment = comments.find(comment => comment.id === req.params.id);
    foundComment.username = req.body.username;
    foundComment.comment = req.body.comment;
    res.json(foundComment);
});

app.delete('/comments/:id', (req, res) => {
    const commentIndex = comments.findIndex(comment => comment.id === req.params.id);
    comments.splice(commentIndex, 1);
    res.json({ msg: 'Comment deleted!' });
});

//listen on port 5000
app.listen(5000, () => {
    console.log('listening on http://localhost:5000');
});