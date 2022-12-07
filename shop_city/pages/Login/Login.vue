<template>
	<view class="login-box">

		<view class="login">
			<view class="img">
				<img src="../../static/user/login_active-headimg.jpg">
			</view>
			<view class="text" @click="goIndex()">微信一键登录</view>
			<view class="tis">登录后尽享更多权益</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		
		
		methods: {
			goIndex() {
				uni.switchTab({
					url:'/pages/index/index'
				}) 
			},
		}
	}
</script>

<style lang="scss">
	.login-box {
		padding-top: 30px;
		height: calc(100vh - 30px);
		background-image: radial-gradient(circle,#acacac,#fff);
		
		.login {
			margin: 0 auto;
			width: 150px;
			display: flex;
			justify-content: center;
			flex-direction: column;

			.img {
				width: 70px;
				height: 70px;
				margin: auto;
				border-radius: 999px;
				overflow: hidden;
				box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.5);

				img {
					display: block;
					width: 100%;
					height: 100%;
				}
			}

			.text {
				width: 150px;
				height: 30px;
				color: #fff;
				background-color: #c72f1e;
				border-radius: 999px;
				font-size: 16px;
				line-height: 30px;
				letter-spacing: 3px;
				text-align: center;
				margin: 30px 0 10px;
			}

			.tis {
				margin: auto;
				color: #999;
				font-size: 12px;
			}


		}

	}
</style>
