const User = require('../model/User')
const router = require('express').Router()
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

router.put('/:id', async(req, res) => {
        if(req.body.password) {
            const salt = await bcrypt.gensalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set:req.body
            }, {new: true})
            res.status(200).json(updatedUser)
        } catch (err) {
          res.send(500).json(err)  
        }
 })
 
 

module.exports = router 