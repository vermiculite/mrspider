const spider = require('..')()
const start = 'https://www.pisos.com/'

spider.addUrl(start)
spider.start()

