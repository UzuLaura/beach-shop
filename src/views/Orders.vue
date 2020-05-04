<template>
  <div class="payment">
    <section class="hero is-bold is-dark">
        <div class="hero-body">
            <div class="container">
              <h1 class="title">Payment Form</h1>
              <h2 class="subtitle">All fields are required</h2>
            </div>
        </div>
    </section>
    <section class="container">
        <div class="paymentForm">
          <b-notification :active.sync="isActive" v-bind:class="color" aria-close-label="Close notification">
          {{ notification }}
          </b-notification>
        <form @submit.prevent="addInfo">
          <div class="columns">
            <div class="column">
              <b-field grouped>
                <b-field label="Title">
                  <b-select placeholder="Title">
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                  </b-select>
                </b-field>
                <b-field label="Name"
                  v-bind:type="errorName.color"
                  v-bind:message="errorName.message"
                  expanded>
                  <b-input placeholder="Name" type="text" v-model="name" required></b-input>
                </b-field>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Surname"
                v-bind:message="errorSurname.message"
                v-bind:type="errorSurname.color">
                <b-input placeholder="Surname" type="text" v-model="surname" required></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="Email"
                 v-bind:message="errorEmail.message"
                 v-bind:type="errorEmail.color">
                <b-input v-model="email" type="email" placeholder="some@email.com" required></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Phone Number"
                v-bind:type="errorPhone.color"
                v-bind:message="errorPhone.message">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-static">
                        +370
                    </a>
                  </p>
                    <b-input v-model="number" type="number" placeholder="Your phone number" required expanded></b-input>
                </div>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="Address"
                v-bind:type="errorAdress.color"
                v-bind:message="errorAdress.message">
                <b-input v-model="address" type="text" placeholder="1234 Main street" required></b-input>
              </b-field>
            </div>
          </div>
          <b-field label="Message(optional)">
              <b-input maxlength="200" type="textarea"></b-input>
            </b-field>
          <div class="block">
            <b-radio
                native-value="Flint"
                v-model="conditions">
                I agree with terms and conditions
            </b-radio>
          </div>
          <div class="buttons is-right">
            <b-button id="btn" type="button is-warning is-medium" native-type="submit" @click="isComponentModalActive = true">Pay - {{ amount }} € </b-button>
          </div>
          <!-- <b-modal :active.sync="isComponentModalActive"
                  has-modal-card
                  trap-focus
                  :destroy-on-hide="false"
                  aria-role="dialog"
                  aria-modal>
            <modal-form>
            </modal-form>
          </b-modal> -->
        </form>
      </div>
    </section>
  </div>
</template>

<script>
// // import { stripeKey, stripeOptions } from './stripeConfig.json'
// import { Card, CreateToke } from 'vue-stripe-elements-plus'

import firebase from 'firebase/app'
import 'firebase/firebase-firestore'

export default {
  name: 'Orders',
  data () {
    return {
      name: '',
      surname: '',
      email: '',
      number: '',
      address: '',
      conditions: '',
      amount: 0,
      notification: '',
      errorName: {
        message: '',
        color: ''
      },
      errorSurname: {
        message: '',
        color: ''
      },
      errorEmail: {
        message: '',
        color: ''
      },
      errorPhone: {
        message: '',
        color: ''
      },
      errorAdress: {
        message: '',
        color: ''
      },
      color: '',
      isComponentModalActive: false,
      //   complete: false,
      isActive: false
    }
  },
  //   components: { Card },
  methods: {
    formValidation () {
      // Validation patterns Regex
      const namePattern = /[a-zA-Z ][a-zA-Z]*$/
      const surnamePattern = /[a-zA-Z ]([-]?)[a-zA-Z]*$/
      const emailPattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
      const numberPattern = /^[0-9]*$/
      if (!this.name ||
      !namePattern.test(this.name) ||
      !this.surname ||
      !surnamePattern.test(this.surname) ||
      !this.email ||
      !emailPattern.test(this.email) ||
      !this.number ||
      !numberPattern.test(this.number) ||
      !this.address) {
        // Validating Name and Surname
        if (!this.name) {
          this.errorName.message = 'Please enter name'
          this.errorName.color = 'is-danger'
        } else if (!namePattern.test(this.name)) {
          this.errorName.message = 'Name should contain letters only'
          this.errorName.color = 'is-danger'
        } else {
          this.errorName.message = ''
          this.errorName.color = ''
        }
        if (!this.surname) {
          this.errorSurname.message = 'Please enter surname'
          this.errorSurname.color = 'is-danger'
        } else if (!surnamePattern.test(this.surname)) {
          this.errorSurname.message = 'Surname should contain letters only'
          this.errorSurname.color = 'is-danger'
        } else {
          this.errorSurname.message = ''
          this.errorSurname.color = ''
        }
        // Validating email
        if (!this.email) {
          this.errorEmail.message = 'Please enter email'
          this.errorEmail.color = 'is-danger'
        } else if (emailPattern.test(this.email) === false) {
          this.errorEmail.message = 'Please enter valid email'
          this.errorEmail.color = 'is-danger'
        } else {
          this.errorEmail.message = ''
          this.errorEmail.color = ''
        }
        // Validating phone number
        if (!this.number) {
          this.errorPhone.message = 'Please enter phone number'
          this.errorPhone.color = 'is-danger'
        } else if (!numberPattern.test(this.number)) {
          this.errorPhone.message = 'Please enter valid phone number (numbers only)'
          this.errorPhone.color = 'is-danger'
        } else {
          this.errorPhone.message = ''
          this.errorPhone.color = ''
        }
        // Validating address
        if (!this.address) {
          this.errorAdress.message = 'Please enter adress'
          this.errorAdress.color = 'is-danger'
        } else {
          this.errorAdress.message = ''
          this.errorAdress.color = ''
        }
        return false
      }
      // Validating terms and conditions error notification is in addInfo() method
      if (!this.conditions) {
        return false
      }
      return true
    },
    addInfo () {
      if (this.formValidation()) {
        firebase.firestore().collection('users').add({
          // Make sure that name and surename in database are written with first capital letter
          name: this.name.charAt(0).toUpperCase() + this.name.slice(1),
          surname: this.surname.charAt(0).toUpperCase() + this.surname.slice(1),
          email: this.email,
          number: this.number,
          address: this.address,
          time: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
          this.isActive = true
          this.notification = 'You have successfully made a payment'
          this.color = 'is-warning'
          this.name = ''
          this.surname = ''
          this.email = ''
          this.number = ''
          this.address = ''
          // localStorage.clear()
          // window.location.reload()
        })
      } else {
        this.isActive = true
        this.color = 'is-danger'
        if (!this.conditions) {
          this.notification = 'You must agree with terms and conditions'
        } else {
          this.notification = 'Payment was not successful, please try again'
        }
      }
    },
    getPrice () {
      const price = JSON.parse(localStorage.getItem('cart'))
      this.amount = price.reduce((acc, cur) => acc + Number(cur.price), 0)
    }
  },
  beforeMount () {
    this.getPrice()
  }

}
</script>

<style scoped>
.paymentForm {
  margin: 30px 0;
  padding: 30px;
  box-shadow: 0 0px 2px 2px #eee;
  border-radius: 8px;
}
.subtitle {
  text-transform: uppercase;
}
/* .stripe-card {
  width: 300px;
  border: 1px solid grey;
}
.stripe-card.complete {
  border-color: green;
} */
</style>
