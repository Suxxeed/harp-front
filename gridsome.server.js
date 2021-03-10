// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios')

  module.exports = function (api) {
    api.loadSource(async actions => {
      const { data } = await axios.get('http://localhost:1337/harfens')
  
      const collection = actions.addCollection({
        typeName: 'Harfen'
      })
  
      for (const product of data) {
        collection.addNode({
          id: product.id,
          title: product.title,
          description: product.description,
          amount: product.amount,
          thumbnail: product.harfe.formats.thumbnail.url,
          image: product.harfe.formats.medium.url,
        })
      }
    })
  }
