const User = require('../model/User')
const router = require('express').Router()
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

router.put('/:id', verifyToken, async(req, res) => {
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
 router.delete('/:id', async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('user has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})
 router.get('/', verifyToken, async(req, res) => {
    //const query = req.query.new
    try {
        const users = await User.find()
       // const users = query ? await User.find().sort({_id:-1}).limits(5) : await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.get('/find/:id',  async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.get('/stats', async(req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await User.aggregate([
            { $match: { createdAt: {$gte: lastYear}}},
            { $project: {
                month: {$month: '$createdAt'},
            },
        },
        {
            $group:{
                _id: $month,
                total:{$sum: 1}
            }
        }
        ])
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router 