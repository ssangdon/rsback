const schema = `
    scalar Upload

    type pet{
        pid:String
        name:String
        age:Int 
        owner:String
        status:String
    }

    type Query{
        engineControl(token:String,status:String):String
        getToken(password:String,fcmToken:String):String
    }
    type Mutation{
        logout(token:String):String
    }
`
export default schema;