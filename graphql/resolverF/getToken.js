

const getToken=async(_,args,context)=>{
    try{
        console.log(context.password)
        console.log(args.password)
        if(context.password==args.password){
            context.tokens.push(args.fcmToken);
            const webToken=await context.jwt.sign({password:args.password,FCM:args.fcmToken},'hahaha123');
            return webToken;
        }else{
            return null;
        }
    }catch(err){
        return null;
    }
}
export default getToken;