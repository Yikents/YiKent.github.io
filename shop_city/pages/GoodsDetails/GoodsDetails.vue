<template>
	<view class="goods-details-content">

		<swiper class="goodsdetai-img" :autoplay="true" :interval="2000" :circular=true :indicator-dots=true
			indicator-active-color="#ddd">
			<swiper-item class="img" v-for="d in detailsdata.pics" :key="d.pics_id">
				<image :src="d.pics_big" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="p-title">
			<p class="title-text">{{detailsdata.goods_name}}</p>
			<view class="price-text">
				<view class="price">￥{{detailsdata.goods_price}}</view>
				<view class="collect" @click="Toast()">
					<view class="collect-icon" :class="{collect:collect}">
					</view>
					<text>收藏</text>
				</view>
			</view>
		</view>

		<view class="image-text">
			<text class="details-text">详情</text>
			<view class="imag-content" v-for="de in detailsdata.pics">
				<image :src="de.pics_big" mode=""></image>
			</view>
		</view>

		<view class="specifications">
			<text>规格参数</text>

			<view class="" v-for="ar in detailsdata.attrs">
				<view class="specifications-content">
					<text class="attr-name">{{ar.attr_name}}:</text>
					<view class="attr-value">
						{{ar.attr_value}}
					</view>
				</view>
			</view>
		</view>

		<van-toast id="van-toast" />

		<van-goods-action>
			<van-goods-action-icon icon="chat-o" text="客服" dot />
			<van-goods-action-icon icon="cart-o" text="购物车" :info="cartLength" @click="goToCart" />
			<van-goods-action-icon icon="shop-o" text="店铺" />
			<van-goods-action-button text="加入购物车" type="warning" is-link @click="addcart" />
			<van-goods-action-button text="立即购买" @click="open2" />
		</van-goods-action>

	</view>
</template>

<script>
	import Toast from '../../wxcomponents/@vant/weapp/toast/toast';
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		computed: mapState(['cartList','collectList']),
		data() {
			return {
				goodsdetailsid: '',
				detailsdata: {},
				// 控制收藏and 取消收藏
				collect: false,
				show: false,
				cartLength: 0,
				goodsc: 1,
				goodscount: 1,
				goodsinfo: {
					id: '',
					src: '',
					name: '',
					price: '',
					num: 1,
				},
			};
		},


		onLoad(options) {	
			this.goodsdetailsid = options.detailsid
			this.cartLength = this.cartList.length //购物车的长度
			this.getgoodsdetailsdata();
		},
		
		onReady() {
			//判断商品是否已收藏
			this.$nextTick(() => {
				for(let t = 0; t <= this.collectList.length; t++) {
					let find = this.collectList.findIndex(it => {
						return it.id == this.goodsdetailsid	
					});	
					if(find !== -1) {
						this.collect = true
					}
				}
			})
		},
		
		beforeUpdate() {
			this.cartLength = this.cartList.length
		},

		methods: {
			async getgoodsdetailsdata() {
				let {
					data
				} = await uni.$http.get(
					`https://api-hmugo-web.itheima.net/api/public/v1/goods/detail/?goods_id=${this.goodsdetailsid}`
				)
				this.detailsdata = data.message;
				this.goodsinfo.id = data.message.goods_id;
				this.goodsinfo.name = data.message.goods_name;
				this.goodsinfo.price = data.message.goods_price;
				this.goodsinfo.src = data.message.goods_small_logo ? data.message.goods_small_logo :
					'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg';
			},

			Toast() {
				// console.log('ksdhk',this.collect)
				this.collect = !this.collect
				if (this.collect) {
					this.addCollect({
						id: this.goodsinfo.id,
						name: this.goodsinfo.name,
						src: this.goodsinfo.src
					})
					Toast('收藏成功！');
				} else {
					Toast('取消收藏！');
					this.removeCollect({
						id: this.goodsinfo.id
					})
				}
			},
			// 添加购物车
			addcart() {
				if (this.cartList.length == 0) {
					this.addCartItem({
							id: this.goodsinfo.id,
							src: this.goodsinfo.src,
							name: this.goodsinfo.name,
							price: this.goodsinfo.price,
							num: this.goodsinfo.num
						}),
						Toast.success('成功加入购物车');
				} else {
					for (let i = 0; i < this.cartList.length; i++) {
						let find = this.cartList.findIndex(it => {
							return it.id == this.goodsinfo.id
						});

						if (find == -1) {
							this.addCartItem({
									id: this.goodsinfo.id,
									src: this.goodsinfo.src,
									name: this.goodsinfo.name,
									price: this.goodsinfo.price,
									num: this.goodsinfo.num
								}),
								Toast.success('成功加入购物车');
						} else {
							Toast.success('购物车已有该商品');
						}
					}
				}

			},

			//跳转至购物车
			goToCart() {
				uni.switchTab({
					url: '/pages/ShoppingCart/ShoppingCart'
				})

			},

			...mapMutations([
				"addCartItem",
				"addCollect",
				"removeCollect"
			]),

		}
	}
</script>

<style lang="scss">
	.goods-details-content {
		padding-bottom: 50px;
		background-color: #eee;


		.popup-content {
			box-sizing: border-box;
			width: 100vw;
			height: 50vh;
			padding: 30rpx;
			border-top-right-radius: 15px;
			border-top-left-radius: 15px;
			background-color: #fff;

			.popup-content-img-text {
				padding-bottom: 20rpx;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #ddd;

				.popup-img {
					width: 150rpx;
					height: 150rpx;
					border-radius: 15px;
					display: block;
					margin-right: 20rpx;
				}

				.popup-text {
					.goods-price {
						font-size: 30rpx;
						color: #c00;
					}

					.goods-count {
						font-size: 12px;
						color: #aaa;
					}
				}
			}

			.buy-count {
				padding: 30rpx;
				display: flex;
				align-items: center;

				.count {
					text-align: center;
					width: 100rpx;
				}

				.minus {
					margin-left: 10rpx;
					width: 60rpx;
					height: 60rpx;
					background-image: url('/static/imgs/minus.png');
					background-position: center center;
					background-repeat: no-repeat;
					background-size: cover;
				}

				.add {
					width: 60rpx;
					height: 60rpx;
					background-image: url('/static/imgs/add.png');
					background-position: center center;
					background-repeat: no-repeat;
					background-size: cover;
				}
			}

			.popup-bottom {
				box-sizing: border-box;
				position: fixed;
				bottom: 0;
				left: 0;
				height: 7vh;
				width: 100vw;
				display: flex;
				align-items: center;
				justify-content: space-around;
				padding: 0 20rpx;

				.add-cart {
					text-align: center;
					color: #fff;
					width: 100%;
					padding: 20rpx 0;
					border-radius: 999px;
					background-color: #ffa91a;
				}

				.buy {
					text-align: center;
					color: #fff;
					width: 100%;
					padding: 20rpx 0;
					border-radius: 999px;
					background-color: #f01626;
				}
			}
		}

		.goodsdetai-img {
			width: 750rpx;
			height: 50vh;

			.img {
				width: 100%;
				height: 100%;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.p-title {
			width: 95%;
			margin: 20rpx auto;
			border-radius: 10rpx;
			background-color: #fff;

			.title-text {
				padding: 20rpx;
				margin-bottom: 20rpx;
			}

			.price-text {
				padding: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.price {
					font-size: 50rpx;
					color: #c00;

				}

				.collect {
					display: flex;
					align-items: center;

					.collect-icon {
						width: 45rpx;
						height: 45rpx;
						margin-right: 10rpx;
						background-image: url("../../static/imgs/collect_1.png");
						background-position: center center;
						background-repeat: no-repeat;
						background-size: cover;

						&.collect {
							background-image: url("../../static/imgs/collect_2.png");
						}
					}
				}

			}

		}

		.image-text {
			padding: 5%;
			background-color: #fff;
			width: 100vw;

			.details-text {
				display: block;
				color: #c00;
				margin-bottom: 15rpx;
				font-weight: 50rpx;
				font-weight: bold;
				content: '';
			}

			.imag-content {
				width: 100%;

				// padding: 0 5%;
				image {
					width: 90%;

				}
			}
		}

		.specifications {
			margin-top: 20rpx;
			padding: 5%;
			background-color: #fff;
			width: 100vw;

			.specifications-content {
				display: flex;
				align-items: center;
				font-size: 25rpx;
				line-height: 50rpx;

				.attr-name {
					width: 30vw;
				}

				.attr-value {

					margin-left: 20rpx;
					width: 42vw;
				}

			}
		}
	}
</style>
