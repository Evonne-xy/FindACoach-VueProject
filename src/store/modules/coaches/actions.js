export default {
  async registerCoach(context, formData) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const newCoach = {
      firstName: formData.fName,
      lastName: formData.lName,
      areas: formData.areas,
      description: formData.desc,
      hourlyRate: formData.rate,
    };
    const response = await fetch(
      `https://findyourcoach-90e7d-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` + token,
      {
        method: 'PUT',
        body: JSON.stringify(newCoach),
      }
    );
    if (!response.ok) {
      console.log('response has error');
    }
    context.commit('registerCoach', { id: userId, ...newCoach });
  },

  async loadCoaches(context,payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(
      'https://findyourcoach-90e7d-default-rtdb.firebaseio.com/coaches.json'
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Fails to fetch');
      console.log(responseData.message);
      throw error;
    }
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setLastFetch');
  },
};
