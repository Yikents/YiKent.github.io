<script>
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import '/wxcomponents/@vant/weapp/common/index.wxss';
	.app {
		box-sizing: border-box;
	}

	/*每个页面公共css */


	checkbox.round .wx-checkbox-input,
	checkbox.round .uni-checkbox-input {
		border-radius: 100upx;
	}

	checkbox.red[checked] .wx-checkbox-input,
	checkbox.red.checked .uni-checkbox-input {
		background-color: #e54d42 !important;
		border-color: #e54d42 !important;
		color: #ffffff !important;
	}
</style>
