<template>
	<div class="wish_panel">
		<p>
			<span>去过</span>
			<a class="mui-btn mui-btn-success mui-btn-outlined btn"><i class="mui-icon mui-icon-compose"></i>评一下</a>
			<a class="mui-btn mui-btn-success mui-btn-outlined btn"><i class="mui-icon mui-icon-camera"></i>添加记录</a>
		</p>
		<p>
			<span>想去</span>
			<a class="mui-btn mui-btn-success mui-btn-outlined btn"><i class="mui-icon mui-icon-starhalf"></i>加入心愿清单成长</a>
		</p>
	</div>
	<ul class="mui-table-view">
		<li class="mui-table-view-cell">
			<div class="visited">
				<a href="" v-for="v in visited">
					<img :src="v.avatar" />
				</a>
				<span>等3位好友已经去过</span>
				<a class="mui-btn mui-btn-success mui-btn-outlined view">查看</a>
			</div>
			<div class="visited">
				<a href="" v-for="w in wanted">
					<img :src="w.avatar" />
				</a>
				<span>等3位好友想去</span>
				<a class="mui-btn mui-btn-success mui-btn-outlined view">查看</a>
			</div>
		</li>
	</ul>
</template>
<script>
	module.exports = {
		props: ['visited', "wanted"]
	}
</script>

<style lang="sass">
	.wish_panel {
		padding: 10px;
		span {
			color: #989898;
			vertical-align: middle;
		}
		.btn {
	    vertical-align: middle;
   		 margin-left: 10px;
		}
		p {
			height: 50px;
			line-height: 50px;
		}
	}
	
	.visited {
		height: 50px;
		line-height: 50px;
		img {
			width: 30px;
		}
	}
	
	.view {
		vertical-align: middle;
	}
</style>