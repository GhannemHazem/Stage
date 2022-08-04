const bcrypt = require('bcryptjs')

const users =[
    {

isadmin: true,
email: 'moonki@g.g' ,
firstName: 'bobo',
password: bcrypt.hashSync('123',10),
lastName: 'odji',
phone: '20151258',
image: 'image/go',
},{
    isadmin: false,
    email: 'ok@g.g' ,
    firstName: 'ok',
    password: bcrypt.hashSync('123',10),
    lastName: 'ok',
    phone: '20151258',
    image: 'image/ok',
}
]
module.exports= users