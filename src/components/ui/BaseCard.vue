<template>
  <div class = "card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card{
    border-radius:12px;
    max-width:40rem;
    box-shadow: 1px 5px 5px 5px rgba(189, 189, 189, 0.26);
    padding:1rem;
    margin:2rem auto;
}

</style>


