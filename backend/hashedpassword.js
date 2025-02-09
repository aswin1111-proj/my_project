const bcrypt = require('bcryptjs');

const password = 'password3';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
  if (err) throw err;
  console.log('Hashed Password:', hashedPassword);
});