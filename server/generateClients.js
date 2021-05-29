/* eslint-disable */
const fs = require('fs');
const { name, image, internet } = require('faker');


const database = { clients: [] }

for (let i = 1; i <= 20; i++) {
  const newUser = {
    id: i,
    firstName: name.firstName(),
    lastName: name.lastName(),
    email: internet.email(),
    password: internet.password(),
    avatar: image.avatar(),
  }

  database.clients.push(newUser)
}

fs.writeFile('./server/db.json', JSON.stringify(database), function (err) {
  if (err) return console.log(err)
  console.log('Generated Users Database > ./server/db.json')
})