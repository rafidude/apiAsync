const Api = require('./api')

function promiseLoops () {  
    const api = new Api()
    api.getUser()
      .then((user) => {
        return api.getFriends(user.id)
      })
      .then((returnedFriends) => {
        const getFriendsOfFriends = (friends) => {
          if (friends.length > 0) {
            let friend = friends.pop()
            return api.getFriends(friend.id)
              .then((moreFriends) => {
                console.log('promiseLoops', moreFriends)
                return getFriendsOfFriends(friends)
              })
          }
        }
        return getFriendsOfFriends(returnedFriends)
      })
}
  
async function asyncAwaitLoops () {
    const api = new Api()
    const user = await api.getUser()
    const friends = await api.getFriends(user.id)
  
    for (let friend of friends) {
      let moreFriends = await api.getFriends(friend.id)
      console.log('asyncAwaitLoops', moreFriends)
    }
}

async function asyncAwaitLoopsParallel () {
    const api = new Api()
    const user = await api.getUser()
    const friends = await api.getFriends(user.id)
    const friendPromises = friends.map(friend => api.getFriends(friend.id))
    const moreFriends = await Promise.all(friendPromises)
    console.log('asyncAwaitLoopsParallel', moreFriends)
}
  
promiseLoops ()
asyncAwaitLoops ()
asyncAwaitLoopsParallel ()