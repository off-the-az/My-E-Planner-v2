const crypto = require('crypto');

function generatePassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
}

function generateToken() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < 256; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    token += chars[randomIndex];
  }
  return token;
}

function md5(key){
    let algorithm = "md5";
    let result = crypto.createHash(algorithm).update(key).digest("base64");
    console.log(`${typeof result} for - ${result}`);
    return result;
}

module.exports = {
    generatePassword,
    generateToken,
    md5
}