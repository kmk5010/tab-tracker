const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
    const SALT_FACTOR = 8
    if (!user.changed('password')) {
        return;
    }
     return bcrypt
        .hashAsync(user.password, bcrypt.genSaltSync(SALT_FACTOR), null)
        .then(hash => { 
            user.setDataValue('password', hash)
        }) 
        
}

module.exports = (sequelize, DataTypes)  => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    }, 
    {
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword
        }
    })
User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
    }

return User
}
