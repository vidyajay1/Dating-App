// backend/database.js

const users = {}

export function findUser(humanId) {
  return users[humanId] || null
}

export function createUser(user) {
  users[user.humanId] = user
}
