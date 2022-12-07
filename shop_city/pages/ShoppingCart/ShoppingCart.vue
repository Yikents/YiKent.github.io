<template>
	<view class="shopping-cart">

		<view class="no-shopping" v-if="!productList">
			<van-empty description="购物车为空" />
		</view>

		<!-- 商品列表 -->
		<view class="shoppingCartList" v-if="productList">
			<checkbox-group>
				<view class="shoppingCartItem" v-for="(item,index) in cartList" :key="item.id" :ref="item.id">
					<!-- 选择框 -->
					<label>
						<checkbox  class="round red" :checked="item.isChecked"
							@click="togglecart({id:item.id})" />
					</label>

					<!-- 商品详情 -->
					<van-card class="card-item" :price="item.price" :desc="item.name" :thumb="item.src">
						<view class="van-multi-ellipsis--l2" slot="desc">{{item.name}}</view>
						<view slot="footer" class="number">
							<view class="add" @click="add(item.id)">+</view>
							{{item.num}}
							<view class="reduce" @click="reduce(item.id)">-</view>
						</view>
					</van-card>

				</view>
			</checkbox-group>
			
			<van-toast id="van-toast" />
			<van-submit-bar :price="cartTotalPrice" button-text="提交订单" @submit="placeOrder()" />
		</view>

	</view>
</template>

<script>
	import Toast from '../../wxcomponents/@vant/weapp/toast/toast';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				productList: false
			}
		},

		onShow() {
			this.$nextTick(() => {
				if (this.cartList.length != 0) {
					this.productList = true
				} else {
					this.productList = false
				}
			})
		},

		computed: {
			cartTotalPrice() {
				var totalPrice = 0 //总金额
				this.cartList.forEach(el => {
					if (el.isChecked) {
						totalPrice += el.sumPrice;
					}
				})
				return totalPrice * 100
			},

			...mapState(['cartList']),
		},

		methods: {
			...mapMutations(['togglecart', 'addOrder','removeCart']),
			// 减少商品
			reduce(id) {
				this.cartList.forEach(el => {
					if (el.id == id) {
						if (el.num > 1) {
							el.num--
							el.sumPrice = el.num * el.price
						} else {
							return 1
						}
					}
				})
			},
			// 添加商品
			add(id) {
				this.cartList.forEach(el => {
					if (el.id == id) {
						if (el.num < 10) {
							el.num++
							el.sumPrice = el.num * el.price
						} else {
							el.num = 10
						}
					}
				})
			},
				
	
				
			//提交订单
			placeOrder() {	
				for (let i = this.cartList.length-1; i >= 0; i--) {
					if (this.cartList[i].isChecked) {
						this.addOrder({
							id: this.cartList[i].id,
							name: this.cartList[i].name,
							src: this.cartList[i].src,
							price: this.cartList[i].price,
							num: this.cartList[i].num
						}) 	 
						this.removeCart({id:this.cartList[i].id})
						 
						Toast('订单提交成功')
						if(this.cartList.length == 0) {
							this.productList = false
						}
					} 
				}
				

			},
		}
	}
</script>

<style lang="scss">
	.shopping-cart {
		width: 100vw;

		.no-shopping {
			margin: 0 auto;
			margin-top: 40%;
			width: 400rpx;
			height: 400rpx;
		}

		.shoppingCartList {
			padding: 0 30rpx 60px;


			.shoppingCartItem {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;
				overflow: hidden;



				.card-item {
					position: relative;

					.number {
						display: flex;
						position: absolute;
						bottom: 0;
						right: 10px;
						line-height: 20px;

						.add,
						.reduce {
							background-color: #ddd;
							width: 20px;
							height: 20px;
							color: #555;
							font-size: 20px;
							border-radius: 999px;
							overflow: hidden;
							text-align: center;
							line-height: 20px;
							margin: 0 5px;
						}
					}
				}
			}
		}


	}
</style>
