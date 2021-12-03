export default {
  async saveRequests(context, payload) {
    const newRequest = {
      email: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://findyourcoach-90e7d-default-rtdb.firebaseio.com/request/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to post requests');
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('saveRequests', newRequest);
  },

  async loadRequests(context){
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch (
      `https://findyourcoach-90e7d-default-rtdb.firebaseio.com/request/${userId}.json?auth=` + token);
    const responseData = await response.json();
    if(!response.ok){
      const error = new Error(responseData.message + 'Fail to fetch data ');
      throw error;
    }
    const requests = [];
    for(const key in responseData){
      const request = {
        coachId:userId,
        id:key,
        email:responseData[key].email,
        message:responseData[key].message
      }
      requests.push(request);
    }
    context.commit('loadRequests',requests);

  }
};
