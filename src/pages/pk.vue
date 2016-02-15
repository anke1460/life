<!--
	作者：zuosjob@gmail.com
	时间：2015-12-23
	描述：与好友比一比
-->
<template>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="pk">
				<div class="list" style="width: 40%;">
					<img :src="own.logo" class="logo" />
					<p>
						平局
					</p>
				</div>
				<div class="list" style="width: 20%;">
					<div class="vs">
						PK
					</div>
					<span id="ptitle">开始对比</span>
				</div>
				<div class="list" style="width: 40%;">
					<img :src="opposite.logo" class="logo" />
					<p>
						平局
					</p>
				</div>
			</div>
			<div class="mui-table-view" id="vs_wraper">
				<div class="mui-table-view-cell">
					<div class="score">200</div>
					<div class="vs-classify">
						<img :src="travel" />
						<p>旅游</p>
					</div>
					<div class="score">300</div>
				</div>
				<div class="mui-table-view-cell">
					<div class="score">200</div>
					<div class="vs-classify">
						<img :src="food" />
						<p>美食</p>
					</div>
					<div class="score">300</div>
				</div>
				<div class="mui-table-view-cell">
					<div class="score">200</div>
					<div class="vs-classify">
						<img :src="hobby" />
						<p>爱好</p>
					</div>
					<div class="score">300</div>
				</div>
				<div class="mui-table-view-cell">
					<div class="score">200</div>
					<div class="vs-classify">
						<img :src="skill" />
						<p>技能</p>
					</div>
					<div class="score">300</div>
				</div>
				<div class="mui-table-view-cell">
					<div class="score">200</div>
					<div class="vs-classify">
						<img :src="social" />
						<p>社交</p>
					</div>
					<div class="score">300</div>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	module.exports = {
		el: '#app',
		data: function() {
			return {
				travel: 'images/travel.png',
				food: 'images/food.png',
				hobby: 'images/hobby.png',
				skill: 'images/skill.png',
				social: 'images/social.png',
				own: {
					logo: 'images/1.png'
				},
				opposite: {
					logo: 'images/add.png'
				}
			}
		},
		ready: function() {
			mui.init();
			mui(".mui-scroll-wrapper").scroll();
		}
	}
</script>
<style lang="sass">
	#vs_wraper {
		text-align: center;
	}
	
	.score {
		width: 35%;
		float: left;
		height: 60px;
		line-height: 60px;
	}
	
	.vs-classify {
		float: left;
		width: 25%;
		img {
			width: 40px;
			border-radius: 50%;
		}
	}
	
	.logo,
	.add {
		width: 70px;
		height: 70px;
		border-radius: 50%;
	}
	
	#ptitle {
		font-size: 16px;
	}
	
	.pk {
		margin-top: 20px;
		overflow: hidden;
		.list {
			float: left;
			text-align: center;
			color: #1FCC7C;
		}
		p {
			height: 30px;
			font-size: 20px;
			line-height: 30px;
		}
	}
	
	.vs {
		height: 30px;
		line-height: 30px;
		font-size: 24px;
	}
</style>