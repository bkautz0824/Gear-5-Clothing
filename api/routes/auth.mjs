import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import User  from '../models/user.mjs'
import express from 'express'
const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).send('Incorrect username or password.');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.status(400).send('Incorrect email or password.');

    const token = jwt.sign({ _id: user._id }, 'secret');
    console.log('this is token' + token)

    res.header({ 'x-auth-token': token, 'authorization': `Bearer ${token}` })
    .send(_.assign({ token: token }, _.pick(user, ['_id', 'email', 'username', 'item_listings', 'items_saved', 'cart'])));
 
})

authRouter.post('/verify', async (req, res, next) => {
  // console.log(req.body.token, 'this is the verify token')
  return await jwt.verify(req.body.token, 'secret',
    // process.env.TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.status(403).send('invalid token')
      let userData
      try { await User.findOne({ _id: user._id }).then(r=>userData =r) } catch (error) {
        return res.status(401).send(error)
      }
      // console.log(userData)
      userData.active = true
      await userData.save()
      return res.send(userData)
    }
  )
}
)


export default authRouter