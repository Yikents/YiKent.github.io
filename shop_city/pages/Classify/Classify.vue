<template>
	<view class="classify-view">
		<view @click="gotoSearchList()">
			<van-search class="classipt" shape="round" background="#fff" placeholder="搜索商品" />
		</view>
		
		<view class="classify">

			<view class="classify-left">

				<scroll-view scroll-y="true" class="c-solly">
					<view class="classify-scroll" v-for="c in calssify" :key="c.cat_id">
						<p class="goods-name-title" :class="{changegooods:goodsid ==c.cat_id}"
							@click="changeovergoodsclass(c.cat_id)">{{c.cat_name}}</p>
					</view>
				</scroll-view>

			</view>
			<view class="classify-right">
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="" v-for="(a,i) in calssify">
						<view class="" v-if="goodsid == a.cat_id">
							<view class="goods-class" v-for="b in a.children">
								<p class="goods-class-name"> <span> / </span>{{b.cat_name}}<span> / </span></p>
								<view class="goods-content">

									<view v-for="c in b.children" :key="c.cat_id">
										<view class="goods-name-img" @click="gotogoodsdetail(c.cat_name)">
											<image class="goods-img" :src="c.cat_icon"></image>
											<p class="goods-text">{{c.cat_name}}</p>
										</view>

									</view>
								</view>
							</view>
						</view>

					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 数据
				calssify: [],
				// 默认分类
				goodsid: 1
			};

		},
		onLoad() {
			this.getClassifydata()
		},
		methods: {
			// 获取分类数据
			async getClassifydata() {
				let {
					data
				} = await uni.$http.get("https://api-hmugo-web.itheima.net/api/public/v1/categories")
				this.calssify = data.message
			},
			//详情
			gotogoodsdetail(goodsname) {
				uni.navigateTo({
					url: `/pages/SearchDetails/SearchDetails?goodsid=${goodsname}`
				})
			},
			//搜索
			gotoSearchList() {
				uni.navigateTo({
					url: "/pages/SearchList/SearchList"
				})
			},

			changeovergoodsclass(goodsid) {
				this.goodsid = goodsid
			}

		}
	}
</script>

<style lang="scss">
	.classify-view {
			padding-top: 55px;
			.classipt {
				position: fixed;
				top: 0;
				left: 0;
				width: 100vw;
				z-index: 2;
			}
			
		.classify {
			width: 750vw;
			display: flex;
			align-items: center;

			.classify-left {
				width: 250rpx;

				.c-solly {
					height: 90vh;

					.classify-scroll {
						.goods-name-title {
							margin-bottom: 40rpx;
							text-align: center;

							&.changegooods {
								border-left: 2px solid #c00;
								color: #c00;
							}
						}
					}
				}

			}

			.classify-right {
				width: 500rpx;

				.scroll-Y {
					height: 90vh;
				}

				.goods-class {
					.goods-class-name {
						width: 100%;
						margin-bottom: 20rpx;
						text-align: center;

						span {

							color: #ddd;
							margin: 0 40rpx;

						}
					}

					.goods-content {
						display: flex;
						flex-wrap: wrap;
						justify-content: flex-start;

						.goods-name-img {

							width: 120rpx;
							height: 120rpx;
							margin: 0 22rpx;
							padding-bottom: 70rpx;

							.goods-img {
								width: 100%;
								height: 100%;
								display: block;
							}

							.goods-text {
								text-align: center;
								font-size: 12px;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}


						}
					}
				}

			}
		}
	}
</style>
