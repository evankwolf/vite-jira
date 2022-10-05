class Res {
  constructor(data, fail) {
    this.code = fail ? -1 : 0
    // 处理data，如果data为字符串则设为msg，否则为data
    if (typeof data === 'string') {
      this.msg = data
    } else {
      this.data = data || {}
    }
    this.genRes()
  }

  genRes() {
    if (this.code) {
      this.failRes()
    } else {
      this.successRes()
    }
  }

  successRes() {
    this.msg = this.msg || '请求成功！'
    const res = {
      code: this.code,
      msg: this.msg,
      data: this.data,
    }
    return res
  }

  failRes() {
    this.msg = this.msg || '请求失败！'
    const res = {
      code: this.code,
      msg: this.msg,
      data: this.data,
    }
    return res
  }
}

module.exports = Res