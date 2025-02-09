const bcrypt = require('bcryptjs');

const password = 'newpassword';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
  if (err) throw err;
  console.log('Hashed Password:', hashedPassword);
});