const express = require('express');

const Post = require('../data/helpers/postDb');
const User = require('../data/helpers/userDb')
const router = express.Router();
router.use(express.json());





router.get('/', async (req, res) => {
  try {
    const post = await Post.get(req.query);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the hubs' });
  }
});

router.get('/:id', async (req, res) => {
  const post = await Post.getById(req.params.id);
  try {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found!' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving the post' });
  }
});

router.get('/users/:id', async (req, res) => {
    const post = await User.getUserPosts(req.params.id);
    try {
        if (post){
            res.status(200).json(post)
        }else{
            res.status(404).json({ message: 'Posts not found!' });
        }
    }
    catch(error) {
        res.status(500).json({message: 'Error retrieving the post'})
    }
})

router.post('/', async (req, res) => {
  const post = await Post.insert(req.body);
  try {
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.update(req.params.id, req.body);
    if (updatedPost)
      res
        .status(200)
        .json({ message: `Updated user: ${updatedPost}`, postInfo: req.body });
    else res.status(404).json({ message: 'The user could not be found!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updated post' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.remove(req.params.id);
    if (deletedPost > 0) {
      res.status(200).json({ message: 'The Post has been deleted!' });
    } else {
      res.status(404).json({ message: 'The Post could not be found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing the post' });
  }
});



module.exports = router;