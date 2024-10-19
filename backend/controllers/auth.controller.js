const { authService, userService, emailService } = require("../services")
const { Auth, ActionToken, User, OldPassword } = require("../models")
const { FORGOT_PASS } = require("../enum/email-action.enum")
const { FORGOT_PASSWORD } = require("../enum/tokenActionEnum")
const { FRONTEND_URL } = require("../configs/config")

module.exports = {
  registration: async (req, res, next) => {
    try {
      const hashPassword = await authService.hashPassword(req.body.password)

      const user = await userService.create({
        ...req.body,
        password: hashPassword,
      })

      res.status(201).json(user)
    } catch (e) {
      next(e)
    }
  },

  login: async (req, res, next) => {
    try {
      const { user, body } = req

      await authService.comparePasswords(user.password, body.password)

      const tokenPair = authService.generateAccessTokenPair({ id: user._id })

      await Auth.create({ ...tokenPair, _user_id: user._id })

      // await emailService.sendEmail(req.user.email, WELCOME, {userName: user.name});

      res.status(200).json({ user, ...tokenPair })
    } catch (e) {
      next(e)
    }
  },

  refresh: async (req, res, next) => {
    try {
      const { refreshToken, _user_id } = req.tokenInfo

      await Auth.deleteOne({ refreshToken })

      const tokenPair = authService.generateAccessTokenPair({ id: _user_id })

      await Auth.create({ ...tokenPair, _user_id })

      res.status(201).json(tokenPair)
    } catch (e) {
      next(e)
    }
  },

  account: async (req, res, next) => {
    try {
      const user = await userService.findOneByParams({ _id: req.userInfo.id })

      res.status(200).json(user)
    } catch (e) {
      next(e)
    }
  },

  logoutAll: async (req, res, next) => {
    try {
      const { _user_id } = req.tokenInfo

      await Auth.deleteMany({ _user_id })

      res.sendStatus(204)
    } catch (e) {
      next(e)
    }
  },

  forgotPassword: async (req, res, next) => {
    try {
      const { _id, email, name } = req.user

      const actionToken = authService.generateActionToken(FORGOT_PASSWORD, {
        email: email,
      })

      const forgotPassUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`

      await ActionToken.create({
        token: actionToken,
        tokenType: FORGOT_PASSWORD,
        _user_id: _id,
      })

      await emailService.sendEmail(email, FORGOT_PASS, {
        url: forgotPassUrl,
        userName: name,
      })

      res.status(200).json("Success")
    } catch (e) {
      next(e)
    }
  },

  forgotPasswordAfterForgot: async (req, res, next) => {
    try {
      const { user, body } = req

      const hashPassword = await authService.hashPassword(body.password)

      await OldPassword.create({ _user_id: user._id, password: user.password })

      const actionTokenBearer = req.get("Authorization")

      const actionToken = actionTokenBearer.replace("Bearer ", "")

      await ActionToken.deleteOne({ token: actionToken })

      await User.updateOne({ _id: user._id }, { password: hashPassword })

      res.status(201).json("Success")
    } catch (e) {
      next(e)
    }
  },
}
