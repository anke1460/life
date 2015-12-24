<!--
	作者：zuosjob@gmail.com
	时间：2015-12-23
	描述：与好友比一比
-->
<template>
	<div class="mui-content">
		<div class="pk">
			<div class="list" style="width: 40%;">
				<p>
				 平局	
				</p>
				<img :src="own.logo"/>
			</div>
			<div class="list" style="width: 20%;">
				<div class="vs">
				 PK	
				</div>
			 </div>
			<div class="list" style="width: 40%;">
				<p>
				 平局	
				</p>
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
		overflow: hidden;
		.list {
			float: left;
			text-align: center;
			color: #1FCC7C;
			font-size: 40px;
		}
		p {
			height: 30px;
			font-size: 20px;
			line-height: 30px;
		}
	}
	.vs {
		height: 108px;
		line-height: 108px;
	}
</style>