<template>
  <div>
    <base-dialog :show="!!error" title="An error" @tryClose="handleError">
      {{ error }}
    </base-dialog>
    <base-dialog
      :show="successSend"
      title="successSend"
      @tryClose="redirectPage"
    ></base-dialog>
    <form @submit.prevent="validForm">
      <div class="form-control">
        <label for="email">Your Email</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="message">Your Message</label>
        <textarea rows="5" id="message" v-model.trim="message"></textarea>
      </div>
      <p class="errors" v-if="!formValid">
        Please enter a valid email and unempty message.
      </p>
      <div v-if="sendMessageStatus"><base-spinner></base-spinner></div>
      <div class="actions">
        <base-button>Send Message</base-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      formValid: true,
      error: null,
      sendMessageStatus: false,
      successSend: false,
    };
  },
  methods: {
    async validForm() {
      this.formValid = true;
      if (
        !this.email.includes('@') ||
        this.email === '' ||
        this.message === ''
      ) {
        this.formValid = false;
        return;
      } else {
        this.sendMessageStatus = true;
        try {
          await this.$store.dispatch('request/saveRequests', {
            coachId: this.$route.params.id,
            email: this.email,
            message: this.message,
          });
        } catch (error) {
          this.error = error.message || 'something went wrong';
          console.log(error);
        }
        this.sendMessageStatus = false;
      }
      this.successSend = true;
    },

    handleError() {
      this.error = null;
    },
    redirectPage() {
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 30px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  background-color: #faf6ff;
  border-color: #3d008d;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>