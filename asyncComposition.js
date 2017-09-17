const Api = require('./api')

async function getUserInfo () {
    const api = new Api()
    const user = await api.getUser()
    const friends = await api.getFriends(user.id)
    const photo = await api.getPhoto(user.id)
    return { user, friends, photo }
}
  
function promiseUserInfo () {
    getUserInfo().then(({ user, friends, photo }) => {
      console.log('promiseUserInfo', { user, friends, photo })
    })
}

async function awaitUserInfo () {
    const { user, friends, photo } = await getUserInfo()
    console.log('awaitUserInfo', { user, friends, photo })
}

async function getLotsOfUserData () {
    const users = []
    while (users.length < 10) {
      users.push(await getUserInfo())
    }
    console.log('getLotsOfUserData', users)
}

async function getLotsOfUserDataFaster () {
    try {
      const userPromises = Array(10).fill(getUserInfo())
      const users = await Promise.all(userPromises)
      console.log('getLotsOfUserDataFaster', users)
    } catch (err) {
      console.error(err)
    }
}

getUserInfo ()
promiseUserInfo ()
awaitUserInfo ()
getLotsOfUserData ()
getLotsOfUserDataFaster ()