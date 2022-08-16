const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const VerificationTokenSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId , required: true, ref:"User"},
    vtoken:{type:String, require:true},
    createdAt:{type:Date, expires:3600, default:Date.now()}
    
})
VerificationTokenSchema.pre("save",async function(next){
    if (this.isModified("vtoken")){
        const hash = await bcrypt.hash(this.vtoken, 10)
        this.vtoken = hash
    }
    next()
});

VerificationTokenSchema.methods.compareToken = async (vtoken)  => {
    const result = await bcrypt.compareSync(vtoken, this.vtoken);
    return result;
};

module.exports = mongoose.model('VerificationToken', VerificationTokenSchema)