<template>
  <div>
    <div v-for="p in products" v-bind:key="p.id" class="card m-1 p-1 bg-light">
      <h4>
        {{ p.name }}
        <span class="badge float-end bg-info">
          {{ currency(p.price) }}
        </span>
      </h4>
      <div class="card-text bg-white p-1">{{ p.description }}</div>
    </div>
    <page-controls />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PageControls from "./PageControls";
export default {
  name: "ProductList",
  components: {
    PageControls,
  },
  computed: {
    ...mapGetters({ products: "processedProducts" }),
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
