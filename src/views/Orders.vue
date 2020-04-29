<template>
    <section class="container">
        <div class="paymentForm">
            <form>
                <div class="columns">
                    <div class="column">
                            <b-field label="Name" expanded>
                                <b-field>
                                    <b-select placeholder="Title">
                                        <option>Mr.</option>
                                        <option>Ms.</option>
                                    </b-select>
                                    <b-input placeholder="Name" expanded></b-input>
                                </b-field>
                         </b-field>
                         </div>
                    <div class="column">
                        <b-field label="Surname">
                                <b-input v-model="surname" placeholder="Surname" value=""></b-input>
                            </b-field>
                        </div>
                  </div>
                  <div class="columns">
                      <div class="column">
                          <b-field label="Email">
                              <b-input v-model="email" placeholder="some@email.com"></b-input>
                          </b-field>
                      </div>
                      <div class="column">
                          <b-field label="Phone Number">
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
                          <b-field label="Address">
                              <b-input v-model="address" placeholder="address"></b-input>
                          </b-field>
                      </div>
                  </div>
                  <div class="block">
                        <b-radio v-model="radio"
                            name="name"
                            native-value="Flint">
                            I agree with terms and conditions
                        </b-radio>
                  </div>
                  <div class="buttons is-right">
                      <b-button type="button is-medium is-primary">Pay</b-button>
                  </div>
            </form>
        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style>
.paymentForm{
    width: 70%;
    margin: 0 auto;
}
</style>
