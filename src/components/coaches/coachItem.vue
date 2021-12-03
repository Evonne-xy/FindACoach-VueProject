<template>
<li>
  <h3>{{ fullName }}</h3>
  <h3>{{ hourlyRate }}/hours</h3>
 
  <ul>
     <base-badge v-for="area in areas" :key="area" :title = "area" :mode = "area"></base-badge>
  </ul>
 
  <div class="actions">
    <base-button link :to="coachContactLink" mode = "outline"> Contact</base-button>
    <base-button link :to="coachDetailsLink" > View Details</base-button>
    
  </div>
</li>
</template>

<script>
import BaseBadge from '../ui/BaseBadge.vue';
export default {
  components: { BaseBadge },
  props: ['id', 'firstName', 'lastName', 'hourlyRate', 'areas'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    coachDetailsLink() {
      return this.$route.path + '/' + this.id;
    },
    coachContactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    },
  },
};
</script>

<style scoped>
li{
    margin:1rem 0;
    border:1px solid #424242;
    border-radius: 12px;
    padding:1rem;
}

h3{
    font-size: 1.5rem;
}

h3,
h4{
    margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>