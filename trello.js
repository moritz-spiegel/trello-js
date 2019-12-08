const superagent = require('superagent')
require('dotenv').config()
const KEY = process.env.TRELLO_KEY
const TOKEN = process.env.TRELLO_TOKEN
const BOARD_ID = process.env.TRELLO_BOARD_ID
const TASK_LIST = process.env.TRELLO_TASKS_ID
const NOTICE_LIST = process.env.TRELLO_NOTICE_ID
const lists = new Map([['task', TASK_LIST], ['notice', NOTICE_LIST]])
const baseOptions = { key: KEY, token: TOKEN }
const baseUrl = 'https://api.trello.com/1/'
const create = async (listId, card) => {
  const url = `${baseUrl}cards`
  const options = {
    idList: listId,
    ...baseOptions
  }
  const res = await superagent.post(url).query(options).send(card)
  return res.body
}
const list = async (listId) => {
  try {
    const options = {
      fields: 'id,name',
      ...baseOptions
    }
    const res = await superagent.get(`${baseUrl}lists/${listId}/cards`).query(options)
    return res.body
  } catch (err) {
    console.error(err.message)
  }

}
const getListId = (listName) => {
  const listId = lists.get(listName)
  if (typeof (listId) === 'undefined') throw Error('invalid list name')
  return listId
}

module.exports = { getListId, create, list }