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

const whiteList = ['/login', '/register']
const handleAuthorize = (req, res) => {
  if (whiteList.indexOf(req.path) !== -1)  return true 
  const token = req.header('Authorization')
  if (!token) {
    return false
  }
  return true
}


module.exports = (req, res, next) => {
  res.setHeader('X-Hello', 'World')
  const auth = handleAuthorize(req, res)
  if (!auth) {
    return res.status(401).json(new Res(`token不存在或者无效`, 1))
  }
  if (req.method === 'POST') {
    if (req.path === '/login') return handleLogin(req, res)
    if (req.path === '/register') return handleRegister(req, res)
    handleMismatch(req, res)
  }
  if (req.method === 'GET') {
    next() // 如果POST里使用了next()，会报Cannot set headers after they are sent to the client的错误
  }
}