const Api = require('./api')

function callbackErrorHell () {
    const api = new Api()
    let user, friends
    api.getUser().then(function (returnedUser) {
      user = returnedUser
      api.getFriends(user.id).then(function (returnedFriends) {
        friends = returnedFriends
        console.log('callbackErrorHell Throwing Error')        
        api.throwError().then(function () {
          console.log('Error was not thrown')
          api.getPhoto(user.id).then(function (photo) {
            console.log('callbackErrorHell', { user, friends, photo })
          }, function (err) {
            console.error(err)
          })
        }, function (err) {
          console.error(err)
        })
      }, function (err) {
        console.error(err)
      })
    }, function (err) {
      console.error(err)
    })
}

function callbackErrorPromiseChain () {
    const api = new Api()
    let user, friends
    api.getUser()
      .then((returnedUser) => {
        user = returnedUser
        return api.getFriends(user.id)
      })
      .then((returnedFriends) => {
        friends = returnedFriends
        console.log('callbackErrorPromiseChain Throwing Error')    
        return api.throwError()
      })
      .then(() => {
        console.log('Error was not thrown')
        return api.getPhoto(user.id)
      })
      .then((photo) => {
        console.log('callbackErrorPromiseChain', { user, friends, photo })
      })
      .catch((err) => {
        console.error(err)
      })
}

async function aysncAwaitTryCatch () {
    try {
      const api = new Api()
      const user = await api.getUser()
      const friends = await api.getFriends(user.id)
  
      console.log('aysncAwaitTryCatch Throwing Error')
      await api.throwError()
      console.log('Error was not thrown')
  
      const photo = await api.getPhoto(user.id)
      console.log('async/await', { user, friends, photo })
    } catch (err) {
      console.error(err)
    }
}

callbackErrorHell ()
callbackErrorPromiseChain ()
aysncAwaitTryCatch ()