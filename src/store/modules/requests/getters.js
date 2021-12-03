export default{
    getRequests(state, _, _2, rootGetters){
        const coachId = rootGetters.userId;
        console.log(coachId);
        const requests =state.request.filter(req => req.coachId === coachId);
        return requests;
    },
    hasRequests(_,getters){
      return getters.getRequests && getters.getRequests.length >0;
    }
}