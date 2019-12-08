const trello = require('./trello')
const args = process.argv.slice(2)
const run = async () => {
  try {
    const listName = args[0]
    const listId = trello.getListId(listName)
    if (args.length > 1) {
      const card = {
        name: args[1],
        ...(args[2] ? { desc: args[2] } : '')
      }
      console.log(card)
      const res = await trello.create(listId, card)
      console.log(`created ${listName} item: ${res.id}`)
    } else {
      const cards = await trello.list(listId)
      console.log(cards)
    }
  } catch (err) {
    console.error(err.message)
  }
}
run()