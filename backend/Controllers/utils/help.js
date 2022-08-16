const crypto=require('crypto')


exports.createrandombyte = () =>{
    new Promise((resolve,reject)=>
    {
      crypto.randomBytes(30,(err,buff)=>{
        if(err) reject(err)
        const token = buff.toString('hex')
        console.log('token:  '+token)
        resolve(token)
        console.log(token)
      })
    })
}