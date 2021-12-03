<template>
<div>
<!-- //TODO: !!error的意思就是如果error是truthy，就将这个string使用！！转化为Boolean -->
  <base-dialog :show = "!!error" title = "An error occured" @tryClose = "handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <coach-filter @filter-coach="setFilter"></coach-filter>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
        <base-button v-if="!coachExist && !isLoading && isLogin" link to="/register"
          >Register a Coach</base-button>
        <base-button link to = "/auth?redirect=register" v-if = "!isLogin">Login to Register as a Coaches</base-button>
      </div>
      <div v-if="isLoading"><base-spinner></base-spinner></div>

      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in getCoaches"
          :key="coach.id"
          :id="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :hourlyRate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <h3 v-else>No coaches found</h3>
    </base-card>
  </section>
  </div>
</template>

<script>
import coachItem from '../../components/coaches/coachItem.vue';
import coachFilter from '../../components/coaches/coachFilter.vue';
export default {
  components: {
    coachItem,
    coachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    getCoaches() {
      const allCoaches = this.$store.getters['coaches/coaches'];

      return allCoaches.filter((coach) => {
        if (this.activeFilter.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilter.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilter.career && coach.areas.includes('career')) {
          return true;
        }
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    coachExist() {
      return this.$store.getters['coaches/coachExist'];
    },
    isLogin(){
      return this.$store.getters.isAuthenticated;
    }
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilter(updatedFilter) {
      this.activeFilter = updatedFilter;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches',{forceRefresh:refresh});
      } catch (error) {
        this.error = error.message || 'Something Went Wrong!';
      }

      this.isLoading = false;
    },
    handleError(){
      this.error = null;
    }
  },
};
</script>

<style>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>