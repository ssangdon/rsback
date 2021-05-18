import engineControl from './resolverF/engineControl';
import getToken from './resolverF/getToken';
const resolvers = {
    Query:{
        engineControl,
        getToken
    },
    Mutation:{
        
    }
}      

export default resolvers;
