const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const raw = await Category.findAll( {include : Product} );
  const data = raw.map( p => p.get({plain : true}) )
  if(data) {
    res.status(200).json(data)
  } else {
    res.status(400).json({msg : 'no data found'})
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  let id = req.params.id
  if(id) {
    const raw = await Category.findByPk(id,  {include : Product} );
    const data = raw.get({plain : true})
    res.status(200).json(data)
  } else {
    res.status(400).json({msg : "no id provided"})
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
