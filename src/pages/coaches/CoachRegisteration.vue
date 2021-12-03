<template>
  <div>
    <!-- <coach-form @register-form = "registerForm"></coach-form> -->
    <coach-form @save-data="saveData"></coach-form>
  </div>
</template>

<script>
import coachForm from '../../components/coaches/coachForm.vue';
export default {
  components: {
    coachForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.replace('/coaches');
    },
  },
};
</script>