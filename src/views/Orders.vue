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
          {{notification}}
          </b-notification>
        <form @submit.prevent="addInfo">
          <div class="columns">
            <div class="column">
              <b-field label="Name" v-bind:type="color" v-bind:message="errorName" expanded>
                <b-field >
                  <b-select placeholder="Title">
                    <option>Mr.</option>
                    <option>Ms.</option>
                  </b-select>
                  <b-input placeholder="Name" v-model="name" expanded></b-input>
                </b-field>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Surname" v-bind:message="errorSurname" v-bind:type="color">
                <b-input v-model="surname"  placeholder="Surname" value=""></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="Email"
                 v-bind:message="errorEmail"
                 v-bind:type="color">
                <b-input v-model="email" placeholder="some@email.com"></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Phone Number" v-bind:type="color"  v-bind:message="errorPhone">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-static">
                        +370
                    </a>
                  </p>
                  <p class="control is-expanded">
                    <input class="input" v-model="number" type="tel" placeholder="Your phone number">
                  </p>
                </div>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="Address" v-bind:type="color" v-bind:message="errorAdress">
                <b-input v-model="address" placeholder="1234 Main street"></b-input>
              </b-field>
            </div>
          </div>
          <b-field label="Message(optional)">
              <b-input maxlength="200" type="textarea"></b-input>
            </b-field>
          <div class="block">
            <b-radio
                native-value="Flint">
                I agree with terms and conditions
            </b-radio>
          </div>
          <div class="buttons is-right">
            <b-button id="btn" type="button is-warning is-medium" native-type="submit" @click="isComponentModalActive = true">Pay - {{ amount }} € </b-button>
          </div>
          <Card
                class='stripe-card'
                :class='{ complete }'
                stripe='pk_test_i28ouERO9Dli1OlxDdGM7HFA00hCEjnkrw'
                :options='stripeOptions'
                @change='complete = $event.complete'
              />
          <!-- <b-modal :active.sync="isComponentModalActive"
                  has-modal-card
                  trap-focus
                  :destroy-on-hide="false"
                  aria-role="dialog"
                  aria-modal>
            <modal-form>
              <Card
                class='stripe-card'
                :class='{ complete }'
                stripe='pk_test_i28ouERO9Dli1OlxDdGM7HFA00hCEjnkrw'
                :options='stripeOptions'
                @change='complete = $event.complete'
              />
              <b-button type="button is-warning" native-type="submit">Submit</b-button>
            </modal-form>
          </b-modal> -->
        </form>
      </div>
    </section>
  </div>
</template>

<script>
// // import { stripeKey, stripeOptions } from './stripeConfig.json'
import { Card, createToken } from 'vue-stripe-elements-plus'

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
      amount: 0,
      notification: '',
      errorName: '',
      errorSurname: '',
      errorEmail: '',
      errorPhone: '',
      errorAdress: '',
      isComponentModalActive: false,
      complete: false,
      isActive: false,
      stripeOptions: {

      },
      color: ''
    }
  },
  components: { Card },
  methods: {
    formValidation () {
      // Validating Name and Surname
      const nameSurnamePattern = /^([a-zA-Z ]){2,30}$/
      if (!this.name) {
        console.log('Please enter name')
        this.errorName = 'Please enter name'
        this.color = 'is-danger'
        return false
      } else if (!nameSurnamePattern.test(this.name)) {
        console.log('Name should contain letters only')
        return false
      }
      if (!this.surname) {
        console.log('Please enter surname')
        this.errorSurname = 'Please enter surname'
        this.color = 'is-danger'
        return false
      }
      // Validating email
      const emailPattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
      if (!this.email) {
        console.log('Please enter email')
        this.errorEmail = 'Please enter email'
        this.color = 'is-danger'
        return false
      } else if (emailPattern.test(this.email) === false) {
        console.log('Please enter valid email')
        this.errorEmail = 'Please enter valid email'
        this.color = 'is-danger'
        return false
      }
      // Validating phone number
      if (!this.number) {
        console.log('Please enter phone number')
        this.errorPhone = 'Please enter phone number'
        this.color = 'is-danger'
        return false
      }
      // Validating address
      if (!this.address) {
        console.log('Please enter address')
        this.errorAdress = 'Please enter adress'
        this.color = 'is-danger'
        return false
      }
      return true
    },
    addInfo () {
      if (this.formValidation()) {
        createToken().then((response) => {
          console.log(response)
          firebase.firestore().collection('users').add({
          // Make sure that name and surename in database are written with first capital letter
            name: this.name.charAt(0).toUpperCase() + this.name.slice(1),
            surname: this.surname.charAt(0).toUpperCase() + this.surname.slice(1),
            email: this.email,
            number: this.number,
            address: this.address,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            card: response.token
          })
        }).then(() => {
          this.isActive = true
          this.notification = 'You have successfully made a payment'
          this.color = 'is-warning'
          this.name = ''
          this.surname = ''
          this.email = ''
          this.number = ''
          this.address = ''
          localStorage.clear()
        })
      } else {
        this.isActive = true
        this.color = 'is-danger'
        this.notification = 'Payment was not successful, please try again'
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
  /* width: 80%;
  margin: 0 auto; */
  margin: 30px 0;
  padding: 30px;
  box-shadow: 0 0px 2px 2px #eee;
  border-radius: 8px;
}
.subtitle {
  text-transform: uppercase;
}
.stripe-card {
  width: 500px;
  border: 1px solid grey;
  padding: 10px;
  color: white;
}
.stripe-card.complete {
  border-color: green;
}
</style>
