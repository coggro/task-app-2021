import jsonwebtoken from 'jsonwebtoken'
import User from '../models/user.js'

const auth = async (req, res, next) => {
  try {
    const token = req.header(`Authorization`).replace(`Bearer `, ``)
    const decoded = jsonwebtoken.verify(
      token,
      `dactyl-hedgehog-columnar-bane-alleyway-finish-outclass-fructify`
    )
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!user) {
      throw new Error()
    }

    req.token = token
    req.user = user
    next()
  } catch (e) {
    // If they don't validate, don't run next()
    res.status(401).send({ error: `Please authenticate.` })
  }
}

export default auth
