const express = require('express');
const postRoutes = express.Router();

// Require Post model in our routes module
let Post = require('./post.model');

// Defined store route
postRoutes.route('/add').post((req, res) => {
  let post = new Post(req.body);
  post.save()
    .then(() => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
postRoutes.route('/').get((req, res) => {
  Post.find((err, posts) => {
    err ? res.json(err) : res.json(posts);
  });
});

// Defined get post route
postRoutes.route('/post/:id').get((req, res) => {
  let id = req.params.id;
  Post.findById(id, (err, post) => {
    err ? res.json(err) : res.json(post);
  });
});

//  Defined update route
postRoutes.route('/update/:id').patch((req, res) => {
    Post.findById(req.params.id, (err, post) => {
    if (!post)
      res.status(404).send("data is not found");
    else {
      post.title = req.body.title;
      post.body = req.body.body;

      post.save().then(() => {
        res.json('Update complete');
      }).catch(() => {
          res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
postRoutes.route('/delete/:id').delete((req, res) => {
    Post.findByIdAndRemove({_id: req.params.id}, (err) => {
      err ? res.json(err) : res.json('Successfully Removed.');
    });
});

module.exports = postRoutes;