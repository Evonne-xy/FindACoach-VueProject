export default{
    saveRequests(state,payload){
        state.request.push(payload);
    },
    loadRequests(state,payload){
        state.request = payload;
        console.log(state.request);
    }
}