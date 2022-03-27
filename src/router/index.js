import StoreProduct from "../components/StoreProduct";
import ShoppingCart from "../components/ShoppingCart";
import { createRouter, createWebHashHistory } from "vue-router";
import CheckOut from "../components/CheckOut";
import OrderThanks from "../components/OrderThanks";
// import FormValidation from "../components/FormValidation"
import Authentication from "../components/admin/AuthenticationComponent";
import Admin from "../components/admin/AdminComponent";
import dataStore from "../store";
import ProductAdmin from "../components/admin/ProductAdmin";
import OrderAdmin from "../components/admin/OrderAdmin";

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: [
        // { path: "/", component: FormValidation },
        { path: "/", component: StoreProduct },
        { path: "/cart", component: ShoppingCart },
        { path: "/checkout", component: CheckOut },
        { path: "/thanks/:id", component: OrderThanks },
        { path: "/login", component: Authentication },
        {
            path: "/admin", component: Admin,
            beforeEnter(to, from, next) {
                if (dataStore.state.auth.authenticated) {
                    next();
                } else {
                    next("/login");
                }
            },
            children: [
                { path: "products", component: ProductAdmin },
                { path: "orders", component: OrderAdmin },
                { path: "", redirect: "/admin/products" }
            ]
        },
        // { path: "*", redirect: "/" },
    ]
}
)

export default router;