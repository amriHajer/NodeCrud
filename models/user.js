const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username: {type:String , unique: true } ,
    password: {type: String}
}) ;



module.exports =User =mongoose.model('user',userSchema) ;
userSchema.pre('save', async function(next){
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password , 10);
    }
    next();
});










