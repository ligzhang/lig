var getJSON2 = (url, method = 'GET') => {
  console.log(this, 'from getJSON2')
  return new Promise((resolve, reject) => {
    // handler 使用箭头函数，得不到想要的结果，使用一般函数声明则可以
    console.log(this, 'from Promise')
    // this 指向window
    const handler = function() {
      console.log(this, 'from handler')
      // this 指向 引用对象
      if (this.readyState !== 4) {
        return
      }
      if (this.status == 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    // console.log(handler(), 'from console.log')
    // handler 中this 本身指向window, client.onreadystatechange 改变了handler中this的指向引用
    // 那么是不是有一个问题，箭头函数不会因为引用改变this的指向，如果为真，所有问题都成立了。事实证明确实不会变
    const client = new XMLHttpRequest()
    client.open(method, url)
    client.onreadystatechange = handler
    // client.responseType = 'json'
    // client.setRequestHeader('Accept', 'application/json')
    client.send()
  })
}

getJSON2('http://127.0.0.1:3000')
  .then(
    json => {
      console.log(json, 'json')
    },
    error => {
      console.log(error)
    }
  )
  .catch(err => {
    console.log(err)
  })

