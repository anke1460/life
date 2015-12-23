<!--
	作者：zuosjob@gmail.com
	时间：2015-12-23
	描述：与好友比一比
-->
<template>
	<div class="mui-content">
		<div class="pk">
			<div class="mui-col-xs-5 list">
				<div>
				 平局	
				</div>
				<img :src="own.logo"/>
			</div>
			<div class="mui-col-xs-1 list">
				<div>
				 PK	
				</div>
			 </div>
			<div class="mui-col-xs-5 list">
				<div>
				 平局	
				</div>
				<img :src="opposite.logo"/>
			</div>
		</div>
	</div>
</template>
<script>
	module.exports = {
		el: '#app',
		data: function() {
			return {
				own: {
					logo: 'images/1.png'
				},
				opposite: {
					logo: 'images/1.png'
				}
			}
		},
		ready: function() {
		}
	}
</script>
<style lang="sass">
	.pk {
		margin-top: 20px;
		.list {
			display: inline-block;
			text-align: center;
			color: #1FCC7C;
			font-size: 40px;
		}
	}
</style>