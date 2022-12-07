<template>
	<view class="index-content">
		<view class="classipt">
		<van-search shape="round" background="#fff" placeholder="搜索商品"/>
		</view>
		<view class="message">
			<swiper class="carousel" :autoplay="true" :interval="2000" :circular=true :indicator-dots=true
				indicator-active-color="#ddd">
				<swiper-item class="message-carousel" v-for="m in message" :key="m.id">
					<image class="carousel-imgs" :src="m.image_src" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="nav-content">
			<view class="" v-for="(n,i) in navdata" :key="i">
				<view class="nav-img">
					<image :src="n.image_src" mode=""></image>
				</view>
			</view>
		</view>

		<view class="floor-content">
			<view class="" v-for="f in floordata">
				<view class="floor-img-title">
					<image :src="f.floor_title.image_src" mode=""></image>
					<view class="product-content">
						<view class="for-pro" v-for="(p,index) in  f.product_list">
							<view class="" v-if="index == 0">
								<image :class="{heimg:index==0}" class="p-imag" :src="p.image_src" mode=""></image>
							</view>
							<view class="square" v-if="index > 0">
								<image class="p-imag" :src="p.image_src" mode=""></image>
							</view> 
						</view>
					</view>

				</view>
			</view>
		</view>



	</view>
</template>

<script>
	// import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				message: [],
				navdata: [],
				floordata: []

			}
		},

		onLoad() {
			this.getdata(),
				this.getnavdata(),
				this.getfloordata()
		},
		methods: {
		
			async getdata() {
				let {
					data
				} = await uni.$http.get("https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata")
				this.message = data.message

			},
			async getnavdata() {
				let {
					data
				} = await uni.$http.get("https://api-hmugo-web.itheima.net/api/public/v1/home/catitems")
				this.navdata = data.message
			},

			async getfloordata() {
				let {
					data
				} = await uni.$http.get("https://api-hmugo-web.itheima.net/api/public/v1/home/floordata")
				this.floordata = data.message
			},
		}
	}
</script>

<style lang="scss">
	.index-content {
		padding-top: 55px;
		.classipt {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			background-color: #fff;
			z-index: 10;
		}
			
		.message {
			.carousel {
				.message-carousel {
					width: 750rpx;
					height: 400rpx;

					.carousel-imgs {
						width: 100%;
						height: 100%;
						display: block;
					}
				}
			}
		}

		.nav-content {
			padding: 20rpx;
			display: flex;
			align-items: center;

			.nav-img {
				width: 180rpx;
				height: 180rpx;

				image {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}

		.floor-content {
			.floor-img-title {
				width: 100vw;
				image {
					width: 750rpx;
					height: 100rpx;
				}
			}

			.floor-img-title {
				box-sizing: border-box;
				width: 100vw;

				.product-content {
					height: 465rpx;
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-end;
					align-items: center;
					margin-bottom: 20rpx;

					.for-pro {
						height: 200rpx;
					}

					.square {
						height: 220rpx;
						height: 200rpx;
						.p-imag {
							margin-right: 10rpx;
							width: 210rpx;
							height: 220rpx;
							display: block;
						}

					}

					.p-imag {
						width: 300rpx;

						&.heimg {
							height: 455rpx;
							margin-right: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
