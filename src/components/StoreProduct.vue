<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col bg-dark text-white">
        <a class="navbar-brand">SPORTS STORE</a>
        <cart-summary />
      </div>
    </div>
    <div class="row">
      <div class="col-3 bg-info p-2">
        <CategoryControls />
      </div>
      <div class="col-9 p-2">
        <SearchComponent />
        <product-list />
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from "./ProductList";
import CategoryControls from "./CategoryControls.vue";
import CartSummary from "./CartSummary";
import { mapMutations } from "vuex";
import SearchComponent from "./SearchComponent.vue";

export default {
  name: "StoreProduct",
  components: {
    ProductList,
    CategoryControls,
    CartSummary,
    SearchComponent,
  },
  methods: {
    ...mapMutations(["setShowSearch"]),
  },
};
</script>

<style></style>
