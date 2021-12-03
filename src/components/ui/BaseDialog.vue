<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"> </div>
      <transition name = "dialog">
      <dialog open v-if="show">
        <header>
          <slot name="title">
            <h2>{{ title }}</h2>
          </slot>
        </header>

        <section>
          <slot></slot>
        </section>

        <menu v-if = "!fixed">
          <slot name="actions">
            <base-button @click="tryClose">Close</base-button>
          </slot>
        </menu>
      </dialog>
      </transition>
  </teleport>
</template>

<script>
export default {
  emits: ['tryClose'],
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed:{
      type:Boolean,
      required: false,
    }
  },
  methods: {
    tryClose() {
      this.$emit('tryClose');
    },
  },
};
</script>


<style scoped>
.backdrop {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.75);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
}

dialog {
  position: fixed;
  top: 30vh;
  width: 50%;
  z-index: 100;
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  overflow: hidden;
  background-color: white;
}
header {
  background-color: #3a0061;
  color: white;
  width: 100%;
  padding: 1rem;
  text-align: center;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu{
    padding:1rem;
    display:flex;
    justify-content: center;
    margin:0;
}

.dialog-enter-from,
.dialog-leave-to{
  opacity:0;
  transform:scale(0.8)
}

.dialog-enter-to,
.dialog-leave-from{
  opacity:1;
  transform:scale(1);
}

.dialog-enter-active{
  transition:all 0.3s ease-out;
}

.dialog-leave-active{
  transition:all 0.3s ease-in;
}

@media(min-width:768px){
    dialog{
        left:calc(50%-20rem);
        width:40rem;
    }
}
</style>