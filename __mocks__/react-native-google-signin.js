module.exports = {
    GoogleSignin: {
        configure() {},
        signIn() {
          return {
            idToken: 'id',
            name: 'test',
            photo: 'http://www.crossplatform,se/'
          }
        }
      }
}