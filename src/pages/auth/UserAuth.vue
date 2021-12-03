<template>
  <div>
    <base-dialog :show="!!error" @tryClose="handleError"
      ><p>{{ error }}</p></base-dialog
    >
    <base-dialog fixed :show="isLoading" title="Authenticating...">
      <base-spinner v-if="isLoading"></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" v-model.trim="email" />
        </div>
        <p v-if="!formIsValid">
          please enter valid name and password(must be at least 6 characters)
        </p>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model.trim="password"
          />
        </div>

        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button mode="flat" type="button" @click="switchAuthMode">{{
          switchModeButton
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'logIn',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'logIn') {
        return 'logIn';
      } else {
        return 'SignUp';
      }
    },
    switchModeButton() {
      if (this.mode === 'SignUp') {
        return 'login';
      } else {
        return 'SignUp';
      }
    },
  },
  methods: {
    switchAuthMode() {
      if (this.mode === 'logIn') {
        this.mode = 'SignUp';
      } else {
        this.mode = 'logIn';
      }
    },
    async submitForm() {
      this.isLoading = true;
      this.validateForm();

      try {
        if (this.mode == 'logIn') {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch('signup', {
            email: this.email,
            password: this.password,
          });
        }
        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches')
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.error = error.message || 'Fail to authenticate';
      }
      this.isLoading = false;
    },
    validateForm() {
      this.formIsValid = true;
      if (
        !this.email.includes('@') ||
        this.email === '' ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
    },

    handleError() {
      this.error = null;
    },
  },
};
</script>


<style scoped>
form {
  margin: 1rem;
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

.actions {
  text-align: center;
}
</style>