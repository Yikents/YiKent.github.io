<template>
	<view class="search-details">
		<view class="search-goods-content">
			<van-tabs>
				<van-tab title="综合">

					<view class="" v-for="g in goodsnamedata.goods" :key="g.cat_id">
						<view class="goods-list" @click="gotoGoodsDetails(g.goods_id)">
							<view class="goods-list-img">
								<image class="goods-img" :src="g.goods_big_logo" mode=""></image>
							</view>
							<view class="goods-list-text">
								<p class="goods-title">{{g.goods_name}}</p>
								<text class="goods-pic">￥{{g.goods_price}}</text>
							</view>
						</view>
					</view>
				</van-tab>
				<van-tab title="销量">销量</van-tab>
				<van-tab title="价格">
					价格
				</van-tab>
			</van-tabs>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsid: '',
				goodsnamedata: [],
				PriceData: []
			};
		},
		// 页面加载完成后接收传递过来的id
		onLoad(options) {
			this.goodsid = options.goodsid
			console.log(this.goodsid);
			this.getsearchgoodsdata();
		},
		methods: {
			async getsearchgoodsdata() {
				let {
					data
				} = await uni.$http.get(
					`https://api-hmugo-web.itheima.net/api/public/v1/goods/search/?query=${this.goodsid}`);
				this.goodsnamedata = data.message;
				console.log("this.goodsnamedata ==>",this.goodsnamedata);
			},
			gotoGoodsDetails(goodsid) {
				uni.navigateTo({
					url: `/pages/GoodsDetails/GoodsDetails?detailsid=${goodsid}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-details {

		.search-goods-content {

			.goods-list {
				width: 100vw;
				height: 22vh;
				justify-content: space-between;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #ddd;

				.goods-list-img {
					width: 35%;
					height: 95%;
					margin-right: 20rpx;

					.goods-img {
						width: 100%;
						height: 100%;
						display: block;
					}
				}

				.goods-list-text {
					width: 60%;
					font-size: 12px;

					.goods-title {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.goods-pic {
						display: block;
						margin-top: 100rpx;
						color: #c00;
						content: '';
					}
				}

			}
		}

	}
</style>
