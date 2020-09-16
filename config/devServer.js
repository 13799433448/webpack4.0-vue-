module.exports = {
  //...https://www.jianshu.com/p/f489e7764cb8
      devServer: {
          proxy: {
          '/api': {
              target: 'http://localhost:3000',
              pathRewrite: {'^/api' : ''}
          },
          '/bff': {
              target: 'http://localhost:3020',
              pathRewrite: {'^/bff' : ''}
          },

        }
      }
  };
