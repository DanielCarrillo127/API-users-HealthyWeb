const {Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema =new Schema({
    nombre : String,
    email : String,
    contraseña : String,
    peso : Number,
    altura : Number,
    edad : Number,
    sexo : String,
    tipo_ejercicio : String
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.contraseña);
};


module.exports = model('usersdata',UserSchema)

//daniel carrillo es el programador de este codigo
