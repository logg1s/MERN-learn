const express= require('express')
const router = express.Router()

const DUMMY_PLACE = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the famous sky in the world',
        imageUrl: 'https://media.timeout.com/images/101705309/1024/576/image.webp',
        address: '20 W 34th St., New York, NY 10001, Hoa Kỳ',
        location: {
          lat: 40.7484405,
          lng: -73.9856644
        },
        creator: 'u1'
      },
      {
        id: 'p2',
        title: 'Empire',
        description: 'One of the famous sky in the world',
        imageUrl:
          'https://lh3.googleusercontent.com/p/AF1QipN8CEMCG4Qrk5HIkMWAAgGg4DZt2pL-E_324a1q=s1360-w1360-h1020',
        address: '20 W 34th St., New York, NY 10001, Hoa Kỳ',
        location: {
          lat: 40.7484405,
          lng: -73.9856644
        },
        creator: 'u2'
      }
]

router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid
    const place = DUMMY_PLACE.find(p => p.id === placeId)

    if (place) {
      return res.json({place})
    }

    const err = new Error("doesn't exist place")
    err.code = 404
    next(err)

})

router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid
    const place = DUMMY_PLACE.find(p => p.creator === userId)
    if (place) {
      return res.json({place})
    }

    const err = new Error("doesn't exist user")
    err.code = 404
    next(err)
})




module.exports = router
