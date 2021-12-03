<template>
  <base-card>
    <h2>Register as a coach now</h2>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ invalid: !fName.isValid }">
        <label for="fName">First Name</label>
        <input
          type="text"
          id="fName"
          name="fName"
          v-model.trim="fName.value"
          @blur="clearValidity('fName')"
        />
        <p v-if="!fName.isValid">First Name cannot be emty</p>
      </div>
      <div class="form-control" :class="{ invalid: !lName.isValid }">
        <label for="lName">Last Name</label>
        <input
          type="text"
          id="lName"
          name="lName"
          v-model.trim="lName.value"
          @blur="clearValidity('lName')"
        />
        <p v-if="!lName.isValid">Last Name cannto be emty</p>
      </div>

      <div class="form-control" :class="{ invalid: !desc.isValid }">
        <label for="desc">Description</label>
        <textarea
          id="desc"
          name="desc"
          rows="4"
          cols="50"
          v-model.trim="desc.value"
          @blur="clearValidity('desc')"
        ></textarea>
        <p v-if="!desc.isValid">desc cannto be emty</p>
      </div>

      <div class="form-control" :class="{ invalid: !rate.isValid }">
        <label for="rate">Hourly Rate</label>
        <input
          type="number"
          id="rate"
          name="rate"
          v-model.number="rate.value"
          @blur="clearValidity('rate')"
        />
        <p v-if="!rate.isValid">rate cannto be emty</p>
      </div>

      <div class="form-control" :class="{ invalid: !areas.isValid }">
        <h3>Areas of Expertise</h3>
        <div>
          <input
            type="checkbox"
            id="fontend"
            name="fontend"
            value="fontend"
            v-model="areas.value"
            @blur="clearValidity('areas')"
          />
          <label for="fontend">fontend</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="backend"
            name="backend"
            value="backend"
            v-model="areas.value"
            @blur="clearValidity('areas')"
          />
          <label for="backend">backend</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="career"
            name="career"
            value="career"
            v-model="areas.value"
            @blur="clearValidity('areas')"
          />
          <label for="career">career</label>
        </div>
      </div>
      <p v-if="!areas.isValid">areas cannto be emty</p>
      <base-button>Register</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      fName: {
        value: '',
        type: String,
        isValid: true,
      },
      lName: {
        value: '',
        type: String,
        isValid: true,
      },
      desc: {
        value: '',
        type: String,
        isValid: true,
      },
      rate: {
        value: null,
        type: Number,
        isValid: true,
      },
      areas: {
        value: [],
        type: Array,
        isValid: true,
      },
      formValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      if (
        (this[input].value !== '' && this[input].type === String) ||
        (this[input].value.length > 0 && this[input].type === Array) ||
        (this[input].value &&
          this[input].value > 0 &&
          this[input].type === Number)
      ) {
        this[input].isValid = true;
      }
    },
    formValidation() {
      this.formValid = true;
      if (this.fName.value === '') {
        this.fName.isValid = false;
        this.formValid = false;
      }
      if (this.lName.value === '') {
        this.lName.isValid = false;
        this.formValid = false;
      }
      if (this.desc.value === '') {
        this.desc.isValid = false;
        this.formValid = false;
      }
      if (!this.rate.value) {
        this.rate.isValid = false;
        this.formValid = false;
      }
      if (this.areas.value.length === 0 ) {
        this.areas.isValid = false;
        this.formValid = false;
      }
    },
    submitForm() {
      this.formValidation();

      if (!this.formValid) {
        return;
      }
      const formData = {
        fName: this.fName.value,
        lName: this.lName.value,
        desc: this.desc.value,
        rate: this.rate.value,
        areas: this.areas.value,
      };
      this.$emit('save-data', formData);
      console.log(formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem;
}

label {
  font-weight: bold;
  margin: 0.5rem 0;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
}

input[type='checkbox']:focus {
  outline: solid 1px #3d008d;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid input,
.invalid textarea {
  border: solid 1px red;
}

.invalid label {
  color: red;
}

p{
  color:red;
  font-size:0.7rem
}
</style>
