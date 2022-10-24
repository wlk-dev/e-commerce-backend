const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll( {include : Product} ).then( tagData => res.status(200).json(tagData) )
    .catch( err => res.status(400).json(err) )
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const id = req.params.id
  if(id) {
    Tag.findByPk(id, {include : Product}).then( tagData => res.status(200).json(tagData) )
      .catch( err => res.status(400).json(err) )
  } else {
    res.status(400).json({msg : 'no id'})
  }
});

router.post('/', (req, res) => {
  // create a new tag
  const { tag_name } = req.body
  if(tag_name) {
    Tag.create( {tag_name} ).then( tag => res.status(200).json(tag) )
      .catch( err => res.status(400).json(err) )
  } else {
    res.status(400).json({msg : "missing tag_name in body"})
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const id = req.params.id
  const {tag_name} = req.body
  if(id && tag_name) {
    Tag.update(
      {
        tag_name
      },
      {
        where : {
          id,
        }
      }).then( updatedTag => res.status(200).json(updatedTag) )
        .catch( err => res.status(400).json(err) )
  } else {
    res.status(400).json({msg : 'no id or tag_name'})
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const id = req.params.id
  if(id) {
    Tag.destroy( {
      where : {
        id,
      }
    }).then( deletedTag => res.status(200).json(deletedTag) )
      .catch( err => res.status(400).json(err) )
  } else {
    res.status(400).json({msg : 'no id'})
  }
});

module.exports = router;
