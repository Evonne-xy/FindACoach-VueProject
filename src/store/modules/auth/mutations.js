export default{
    setUser(state,payload){
        state.userId = payload.userId;
        state.token = payload.token;
       
    },
    setAutoLogOut(state){
        state.didAutoLogOut = true;
    }
};