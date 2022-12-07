<template>
	<view class="user-box">

		<view class="login-active" v-if="!showlogin">
			<view class="user-info-wrap">
				<view class="user-login">
					<image class="user-unlogin-img" src="../../static/user/login_active-headimg.jpg"></image>
					<view class="login">
						<text>罗汉果</text>
					</view>
				</view>
			</view>

			<view class="content-box">
				<!-- 功能 -->
				<view class="user-content">
					<view class="order-item" @click="goOrder">
						<view class="order-icon">
							<van-icon name="records" color="#c72f1e" size="24" />
						</view>
						<text>全部订单</text>
					</view>
					<view class="favorite-wares" @click="goCollect()">
						<view class="num">{{collectList.length}}</view>
						<text>收藏的商品</text>
					</view>

					<view class="my-mark">
						<view class="num">0</view>
						<text>我的足迹</text>
					</view>

				</view>


				<!-- 订单 -->
				<!-- <view class="use_order">
					<view class="my-order">我的订单</view>
					<view class="order">

						<view class="order-item" @click="goOrder">
							<view class="order-icon">
								<van-icon name="records" color="#c72f1e" size="24" />
							</view>
							<text>全部订单</text>
						</view>

						<view class="order-item">
							<view class="order-icon">
								<van-icon name="balance-pay" color="#c72f1e" size="24" />
							</view>
							<text>待付款</text>
						</view>

						<view class="order-item">
							<view class="order-icon">
								<van-icon name="logistics" color="#c72f1e" size="24" />
							</view>
							<text>待收货</text>
						</view>

						<view class="order-item">
							<view class="order-icon">
								<van-icon name="cash-back-record" color="#c72f1e" size="24" />
							</view>
							<text>退款退货</text>
						</view>

					</view>
				</view>
 -->
				<!-- 其他 -->
				<view class="user-other">
					<view class="info">收货地址管理</view>
					<view class="info">联系客服</view>
					<view class="info" @click="goLogin()">退出登录</view>
				</view>

			</view>


		</view>


	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		computed: {
			...mapState(['collectList'])
		},
		data() {
			return {
				
			}
		},
		methods: {
			
			goOrder() {
				uni.navigateTo({
					url:'/pages/Order/Order'
				});
			},
			
			goCollect() {
				uni.navigateTo({
					url:'/pages/Collect/Collect'
				})
			},
			
			goLogin(){
				uni.reLaunch({
					url:'/pages/Login/Login'
				})
			},
			
		}
	}
</script>

<style lang="scss">
	.user-box {
		width: 100vw;
		height: 100vh;
		background-color: #f0f3f6;
		.login-active {
			.user-info-wrap {
				background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.5tu.cn%2Fattachments%2Fimage_files%2Fmonth_1905%2F201904291406036537.jpg&refer=http%3A%2F%2Fimg.5tu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671536616&t=fecb0589880263aadf3ce1b04cde2497);
				background-size: cover;
				background-repeat: no-repeat;
				height: 30vh;
				padding-top: 10px;
				
				.user-login {

					.user-unlogin-img {
						width: 70px;
						height: 70px;
						display: block;
						border-radius: 999px;
						margin: 30px auto 0;
						overflow: hidden;
						box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.5);
					}

					.login {
						// width: 60px;
						height: 30px;
						border-radius: 999px;
						color: #ddd;
						font-size: 18px;
						margin: 20px auto 0;
						text-align: center;
						line-height: 30px;
					}
				}

			}


			.content-box {
				position: fixed;
				top: 29vh;
				left: 0;
				width: 100%;
				height: 70vh;

				.user-content {
					display: flex;
					justify-content: space-between;
					text-align: center;
					background-color: #fff;
					border-radius: 10px;
					margin: 0 10px 10px;
					padding: 10px;

					.num {
						color: #c72f1e;
					}
				}


				// .use_order {
				// 	margin: 0 10px;
				// 	background-color: #fff;
				// 	border-radius: 10px;

				// 	.my-order {
				// 		height: 40px;
				// 		line-height: 40px;
				// 		padding-left: 10px;
				// 		border-bottom: 1px solid #ddd;
				// 	}

				// 	.order {
				// 		padding: 0 10px;
				// 		display: flex;
				// 		justify-content: space-between;
				// 		height: 70px;
				// 		line-height: 70px;

				// 		.order-item {
				// 			height: 70px;

				// 			.order-icon {
				// 				text-align: center;
				// 				height: 20px;
				// 			}
				// 		}
				// 	}
				// }

				.user-other {
					background-color: #fff;
					border-radius: 10px;
					margin: 20px 10px 0;

					.info {
						height: 44px;
						line-height: 44px;
						font-size: 16px;
						color: #333;
						border-bottom: 1px solid #ddd;
						padding: 0 15px;

						&:last-child {
							border: 0;
						}
					}

				}

			}

		}


		// .login {
		// 	.head-img {
		// 		padding-top: 30px;
		// 		.user-unlogin-img {
		// 			width: 70px;
		// 			height: 70px;
		// 			display: block;
		// 			border-radius: 999px;
		// 			margin: 0 auto;
		// 			overflow: hidden;
		// 		}
		// 	}

		// 	.login-buttom {
		// 		height: 40px;
		// 		width: 230px;
		// 		line-height: 40px;
		// 		color: #fff;
		// 		text-align: center;
		// 		font-size: 16px;
		// 		background-color: #c72f1e;
		// 		border-radius: 999px;
		// 		margin: 30px auto;
		// 	}

		// 	.login-tips {
		// 		width: 130px;
		// 		height: 30px;
		// 		font-size: 12px;
		// 		color: #999;
		// 		margin: 0 auto;
		// 	}

		// }

	}
</style>
