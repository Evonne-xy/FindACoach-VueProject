<template>
  <div>
    <base-dialog :show="!!error" title="An error" @tryClose="handleError">
      {{ error }}
    </base-dialog>
    <base-card>
      <header>
        <h2>Request received</h2>
      </header>
      <div v-if="isLoading"><base-spinner></base-spinner></div>
      <ul v-if="hasRequests">
        <request-item
          v-for="request in getRequests"
          :key="request.id"
          :email="request.email"
          :message="request.message"
        >
        </request-item>
      </ul>
      <h3 v-else>Sorry, there is not have any requests</h3>
    </base-card>
  </div>
</template>

<script>
import requestItem from '../../components/requests/requestItem.vue';
export default {
  components: {
    requestItem,
  },
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  computed: {
    getRequests() {
      return this.$store.getters['request/getRequests'];
    },

    hasRequests() {
      return this.$store.getters['request/hasRequests'];
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('request/loadRequests');
      } catch (error) {
        this.error = error.message || 'Something error occurred';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}
ul {
  margin: 2rem auto;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>