import Axios from "axios";
import Vuex from "vuex";
import CartModule from "./cart";
import OrdersModule from "./orders";
import AuthModule from "./auth";

const baseUrl = "http://localhost:3500";
const productsUrl = `${baseUrl}/products`;
const categoriesUrl = `${baseUrl}/categories`;
const testData = [];
for (let i = 1; i <= 10; i++) {
    testData.push({
        id: i, name: `Product #${i}`, category: `Category ${i % 3}`,
        description: `This is Product #${i}`, price: i * 50
    })
}
export default new Vuex.Store({
    strict: true,
    modules: { cart: CartModule, orders: OrdersModule, auth: AuthModule },
    state: {
        products: [],
        categoriesData: [],
        productsTotal: 0,
        currentPage: 1,
        pageSize: 4,
        currentCategory: "All",
        searchTerm: "",
        showSearch: false
    },
    getters: {
        productsFilteredByCategory: state => state.products
            .filter(p => state.currentCategory == "All"
                || p.category == state.currentCategory),
        processedProducts: (state, getters) => {
            let index = (state.currentPage - 1) * state.pageSize;
            return getters.productsFilteredByCategory
                .slice(index, index + state.pageSize);
        },
        pageCount: (state, getters) =>
            Math.ceil(getters.productsFilteredByCategory.length / state.pageSize),
        categories: state => ["All", ...state.categoriesData]
    },
    mutations: {
        setCurrentPage(state, page) {
            state.currentPage = page;
        },
        setPageSize(state, size) {
            state.pageSize = size;
            state.currentPage = 1;
        },
        setCurrentCategory(state, category) {
            state.currentCategory = category;
            state.currentPage = 1;
        },
        setData(state, data) {
            state.products = data.pdata;
            state.productsTotal = data.pdata.length;
            state.categoriesData = data.cdata.sort();
        },
        setShowSearch(state, show) {
            state.showSearch = show;
        },
        setSearchTerm(state, term) {
            state.searchTerm = term;
            state.currentPage = 1;
        },
    },
    actions: {
        async getData(context) {
            let pdata = (await Axios.get(productsUrl)).data;
            let cdata = (await Axios.get(categoriesUrl)).data;
            context.commit("setData", { pdata, cdata });

        },
        async getPage(context, getPageCount = 1) {
            let url = `${productsUrl}?_page=${context.state.currentPage}`
                + `&_limit=${context.state.pageSize * getPageCount}`;
            if (context.state.currentCategory != "All") {
                url += `&category=${context.state.currentCategory}`;
            }
            if (context.state.searchTerm != "") {
                url += `&q=${context.state.searchTerm}`;
            }
            let response = await Axios.get(url);
            context.commit("setPageCount", response.headers["x-total-count"]);
            context.commit("addPage", {
                number: context.state.currentPage,
                data: response.data, pageCount: getPageCount
            });
        },
        setCurrentPage(context, page) {
            context.commit("_setCurrentPage", page);
            if (!context.state.pages[page]) {
                context.dispatch("getPage");
            }
        },
        setPageSize(context, size) {
            context.commit("clearPages");
            context.commit("_setPageSize", size);
            context.dispatch("getPage", 2);
        },
        setCurrentCategory(context, category) {
            context.commit("clearPages");
            context.commit("_setCurrentCategory", category);
            context.dispatch("getPage", 2);
        },
        search(context, term) {
            context.commit("setSearchTerm", term);
            context.commit("clearPages");
            context.dispatch("getPage", 2);
        },
        clearSearchTerm(context) {
            context.commit("setSearchTerm", "");
            context.commit("clearPages");
            context.dispatch("getPage", 2);
        }
    }
})