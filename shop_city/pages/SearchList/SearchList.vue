<template>
	<view class="search-list">

		<van-search :value="value" shape="round" @focus="showResult" @blur="hideResult" background="#c72f1es"
			placeholder="请输入搜索关键词" @change="gotosearch">
		</van-search>


		<view class="goods-name-list" v-if="result">
			<view class="" v-for="s in searchgoodslist">
				<p @click="gotoGoodsDetails(s.goods_id)">{{s.goods_name}}</p>
			</view>
		</view>

		<view class="search-history" v-if="!result">
			<view class="search-history-nav">
				<p>搜索历史：</p>
				<view class="del-no" @click="clearHistory()">
				</view>
			</view>

			<view class="search-history-list">
				<view class="history-list" v-for="s in searchhistory">
					<p>{{s}}</p>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result: false,
				titel: '',
				searchgoodslist: [], //搜索结果列表
				searchhistory: [], //搜索历史
			};
		},

		onLoad() {
			this.logserStorgoodslist();
		},


		methods: {

			//显示搜索结果
			showResult() {
				if(this.titel == "") {
					this.searchgoodslist = []
				}
				this.result = true
			},
			//显示搜索历史
			hideResult() {
				this.result = false
			},
			
			//搜索
			 gotosearch(e) {
				 this.titel = e.detail;
				if (this.titel == '') {
					return
				}
				this.searchhistory.push(this.titel)
				uni.setStorageSync('searchlistdata', JSON.stringify(this.searchhistory))

				let data =  uni.$http.get(`https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch/?query=${this.titel}`).then(({data})=> {
					console.log('data ==>',data);
					this.searchgoodslist = data.message
					console.log('this.searchgoodslist ==>',this.searchgoodslist);
				})
			 
			},

			logserStorgoodslist() {

				let allsearchlist = uni.getStorageSync("searchlistdata")

				if (allsearchlist) {
					this.searchhistory = JSON.parse(allsearchlist)
					console.log('本地存储的数据', allsearchlist);
				}

			},
			
			clearHistory() {
				this.searchhistory = []
			},
			
			//跳转到商品详情
			gotoGoodsDetails(goodsid) {
				uni.navigateTo({
					url: `/pages/GoodsDetails/GoodsDetails?detailsid=${goodsid}`
				})
			},
		}
	}
</script>

<style lang="scss">
	.search-list {

		.goods-name-list {
			width: 90vw;
			margin: 0 auto;
			

			p {
				width: 100%;
				padding: 10rpx;
				height: 50rpx;
				line-height: 50rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				border-bottom: 1px solid #ddd;
			}
		}

		.search-history {
			padding: 20rpx;

			.search-history-nav {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.del-no {
					width: 30rpx;
					height: 30rpx;
					background-image: url("../../static/imgs/delno.png");
					background-position: center center;
					background-size: cover;
					background-repeat: no-repeat;

				}
			}

			.search-history-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;

				p {
					margin: 20rpx;
					border-radius: 999px;
					padding: 10rpx 20rpx;
					background-color: rgba(224, 224, 220, .5);
				}
			}

		}

		.show-nosearch {
			margin: 0 auto;
			width: 400rpx;
			height: 30vh;
			background-color: #c00;
		}
	}
</style>
