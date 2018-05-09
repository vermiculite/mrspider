const { URL } = require('url')
const downloader = require('./downloader')()

const DEFAULT_POLITENESS = 1000

module.exports = class Spider {
  constructor({ politeness = DEFAULT_POLITENESS }) {
    this.urls = []
    this.pageHandlers = []
    this.politeness = politeness
    this.waitingFor = 0
  }

  addUrl(path, base) {
    this.urls.push(new URL(path, base))
  }

  registerPageHandler(pageHandler) {
    this.pageHandlers.push(pageHandler)
  }

  crawl() {
    const url = this.urls.pop()
    if (url) {
      this.waitingFor++
        downloader(url.href, (error, response, body) => {
          console.log(error)
          console.log(response)
          console.log(body)
          this.waitingFor--
        })
    }
    else if (!this.waitingFor) {
      clearInterval(this.timerID)
    }
  }

  start() {
    this.timerID = setInterval(() => {
      this.crawl()
    }, this.politeness)
  }
}
