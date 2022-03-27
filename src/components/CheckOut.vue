<template>
  <div class="container w-50">
    <div class="">
      <div class="row">
        <div class="col bg-dark text-white">
          <a class="navbar-brand">SPORTS STORE</a>
        </div>
      </div>
    </div>
    <div class="m-2">
      <div class="form-group m-2">
        <label>Name</label>
        <input v-model="order.name" class="form-control" />
        <validation-error v-bind:validation="v$.order.name" />
      </div>
    </div>
    <div class="m-2">
      <div class="form-group m-2">
        <label>Email</label>
        <input v-model="order.email" class="form-control" />
        <validation-error v-bind:validation="v$.order.email" />
      </div>
    </div>
    <div class="m-2">
      <div class="form-group m-2">
        <label>Address</label>
        <input v-model="order.address" class="form-control" />
        <validation-error v-bind:validation="v$.order.address" />
      </div>
    </div>
    <div class="m-2">
      <div class="form-group m-2">
        <label>City</label>
        <input v-model="order.city" class="form-control" />
        <validation-error v-bind:validation="v$.order.city" />
      </div>
    </div>
    <div class="m-2">
      <div class="form-group m-2">
        <label>Zip</label>
        <input v-model="order.zip" class="form-control" />
        <validation-error v-bind:validation="v$.order.zip" />
      </div>
    </div>
    <div class="text-center">
      <router-link to="/cart" class="btn btn-secondary m-1"> Back </router-link>
      <button class="btn btn-primary m-1" v-on:click="submitOrder">
        Place Order
      </button>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "vuelidate/lib/validators";
import ValidationError from "./ValidationError";
import { mapActions } from "vuex";
export default {
  components: { ValidationError },
  setup() {
    return { v$: useVuelidate() };
  },
  data: function () {
    return {
      order: {
        name: null,
        email: null,
        address: null,
        city: null,
        zip: null,
      },
    };
  },
  validations: {
    order: {
      name: { required },
      email: { required, email },
      address: { required },
      city: { required },
      zip: { required },
    },
  },
  methods: {
    ...mapActions({
      storeOrder: "storeOrder",
      clearCart: "cart/clearCartData",
    }),
    async submitOrder() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        let order = await this.storeOrder(this.order);
        this.clearCart();
        this.$router.push(`/thanks/${order}`);
      }
    },
  },
};
</script>

<style></style>
