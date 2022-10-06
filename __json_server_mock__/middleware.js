const jwt = require('jsonwebtoken')
const db = require('./db.json')
const Res = require('./model')

const handleLogin = (req, res) => {
  const { username, password } = req.body
  const curUser = db.accounts.find(ac => ac.username === username)
  if (curUser) {
    if (password !== curUser.password) {
      return res.status(400).json(new Res('密码错误', 1))
    } 
    const userInfo = db.users.find(u => u.name === username)
    const token = jwt.sign(userInfo, 'wuhu')
    return res.status(200).json(new Res({ ...userInfo, token }))
  }
  return res.status(400).json(new Res('没有这个用户', 1))
}

const handleRegister = (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json(new Res('用户名跟密码总得都填了吧兄弟', 1))
  }
  if (db.accounts.find(ac => ac.username === username)) {
    return res.status(200).json(new Res('有这个用户了兄弟', 1))
  }
  const id = db.users.length + 1
  const user = { id, name: username }
  db.accounts.push({ username, password })
  db.users.push(user)
  const token = jwt.sign(user, 'wuhu')
  return res.status(200).json(new Res({ ...user, token }))
}

const handleMismatch = (req, res) => res.status(404).json(new Res(`没有这个请求路径噢${req.path}`, 1))

module.exports = (req, res, next) => {
  res.setHeader('X-Hello', 'World')
  if (req.method === 'POST') {
    if (req.path === '/login') return handleLogin(req, res)
    if (req.path === '/register') return handleRegister(req, res)
  }
  handleMismatch(req, res)
  // next() //如果这里使用了next()，会报Cannot set headers after they are sent to the client的错误
}