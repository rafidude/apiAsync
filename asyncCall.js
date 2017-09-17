const Api = require('./api')

function callbackHell () {
    const api = new Api()
    let user, friends
    api.getUser().then(function (returnedUser) {
      user = returnedUser
      api.getFriends(user.id).then(function (returnedFriends) {
        friends = returnedFriends
        api.getPhoto(user.id).then(function (photo) {
          console.log('callbackHell: ', { user, friends, photo })
        })
      })
    })
  }
  
function promiseChain () {
    const api = new Api()
    let user, friends
    api.getUser()
      .then((returnedUser) => {
        user = returnedUser
        return api.getFriends(user.id)
      })
      .then((returnedFriends) => {
        friends = returnedFriends
        return api.getPhoto(user.id)
      })
      .then((photo) => {
        console.log('promiseChain: ', { user, friends, photo })
      })
}
  
async function asyncAwaitIsYourNewBestFriend () {
    const api = new Api()
    const user = await api.getUser()
    const friends = await api.getFriends(user.id)
    const photo = await api.getPhoto(user.id)
    console.log('asyncAwaitIsYourNewBestFriend: ', { user, friends, photo })
}
  
callbackHell()
promiseChain()
asyncAwaitIsYourNewBestFriend()