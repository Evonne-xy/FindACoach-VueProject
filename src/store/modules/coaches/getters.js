export default{
        coaches(state){
            return state.coaches;
        },
        hasCoaches(state){
            return state.coaches && state.coaches.length > 0;
        },
        coachExist(state,_1, _2,rootGetters){
            return state.coaches.some(coach => coach.id === rootGetters.userId);
        },
        shouldUpdate(state){
            const lastFetch = state.lastFetch;
            if(!lastFetch){
                return true;
            }
            return new Date().getTime - lastFetch > 60000;
        }
}