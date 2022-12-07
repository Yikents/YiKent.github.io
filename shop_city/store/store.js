//store.js
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		cartList: [], //购物车列表
		orderList: [], //订单列表
		collectList:[], //收藏 
	},
	mutations: {
		
		
		addCartItem(state, {
			id,
			src,
			name,
			price,
			num
		}) {
			state.cartList = [{
					id,
					src,
					name,
					price,
					num,
					isChecked: false,
					sumPrice: price * num
				},
				...state.cartList
			]
		},


		togglecart(state, {
			id
		}) {
			state.cartList = state.cartList.map(t => {
				if (t.id == id) {
					return {
						...t,
						isChecked: !t.isChecked
					}
				}

				return t
			})
		},
		
		//添加订单
		addOrder(state, {
			id,
			src,
			name,
			price,
			num}) {
				state.orderList = [{
					id,
					src,
					name,
					price,
					num
				},
				...state.orderList
				]
			},
			
		removeCart(state, { id }) {
		      state.cartList = state.cartList.filter(t => t.id !== id)
		    },
		 
		 addCollect(state, {id,name,src}) {
			 state.collectList = [{
				 id,
				 src,
				 name
			 },
				...state.collectList
			 ]
		 },
		 
		 removeCollect(state, {id}) {
			 state.collectList = state.collectList.filter(t => t.id !== id)
		 },
	}


})

export default store;
