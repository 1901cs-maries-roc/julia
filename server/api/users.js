const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//added -- marilyn
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: req.params.userId
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})
