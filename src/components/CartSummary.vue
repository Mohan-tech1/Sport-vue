<template>
  <div class="float-right">
    <small>
      Your cart:
      <span v-if="itemCount > 0">
        {{ itemCount }} item(s) {{ currency(totalPrice) }}
      </span>
      <span v-else> (empty) </span>
    </small>
    <router-link
      to="/cart"
      class="btn btn-sm bg-dark text-white"
      v-bind:disabled="itemCount == 0"
    >
      <i class="fa fa-shopping-cart"></i>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      itemCount: "cart/itemCount",
      totalPrice: "cart/totalPrice",
    }),
  },
  methods: {
    currency(value) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    },
  },
};
</script>

<style></style>
