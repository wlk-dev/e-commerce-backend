const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll( {include : Product} )
    .then( categories => res.status(200).json( categories.map( p => p.get({plain : true}) )))
    .catch(err => res.status(400).json(err))

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const id = req.params.id
  if(id) {
    Category.findByPk( id, {include : Product} ).then( category => res.status(200).json(category) )
      .catch( err => res.status(400).json(err) )
  } else {
    res.status(400).json({msg : 'no id'})
  }

});

router.post('/', async (req, res) => {
  // create a new category
  const category_name = req.body['category_name']
  Category.create( {category_name} ).then( cat => res.status(200).json(cat) )
    .catch( err => res.status(400).json(err) )
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const {category_name} = req.body
  const id = req.params.id
  if(id) {
    Category.update(
      {
        category_name,
      },
      {
        where : {
          id,
        }
      }
    ).then( updatedCategory => res.status(200).json(updatedCategory) )
    .catch( err => res.status(400).json(err) )
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const id = req.params.id
  if(id) {
    Category.destroy( {
      where : {
        id,
      }
    }).then( deletedCategory => res.status(200).json(deletedCategory) )
      .catch( err => res.status(400).json(err) )
  }

});

module.exports = router;
