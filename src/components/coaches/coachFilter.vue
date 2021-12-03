<template>
  <base-card>
    <h2>Find your coach</h2>
    <span class="filterOption">
      <input
        type="checkbox"
        id="frontend"
        value="frontend"
        checked
        @change="userChosen"
      />
      <label for="frontend">frontend</label>
    </span>

    <span class="filterOption">
      <input type="checkbox" id="backend" checked @change="userChosen" />
      <label for="backend">backend</label>
    </span>

    <span class="filterOption">
      <input type="checkbox" id="career" checked @change="userChosen" />
      <label for="career">career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['filter-coach'],
  data() {
    return {
      filter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    userChosen(event) {
      const optionId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilter = {
        ...this.filter,
        [optionId]: isActive,
      };
      this.filter = updatedFilter;
      this.$emit('filter-coach', updatedFilter);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filterOption {
  margin-right: 1rem;
}

.filterOption.label,
.filterOption.input {
  vertical-align: middle;
}
</style>