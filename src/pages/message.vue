<!--
	作者：zuosjob@gmail.com
	时间：2016-02-25
	描述：通讯录首页
-->
<template>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media" @tap="open('address_book.html')">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" :src="img1">
						<div class="sys">
							好友
						</div>
					</a>
				</li>
			</ul>
			<div class="mui-table-view-divider">
			</div>
			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media" @tap="open('concern.html')">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" :src="img2">
						<div class="sys">
							关注
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media" @tap="open('fans.html')">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" :src="img3">
						<div class="sys">
							粉丝
						</div>
					</a>
				</li>
			</ul>
			<div class="mui-table-view-divider">
			</div>
			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media" @tap="open('zhi.html')">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" :src="img4">
						<div class="sys">
							知趣官方
						</div>
					</a>
				</li>
				<!--<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" :src="img1">
						<div class="mui-media-body">
							CBD
							<p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
						</div>
						<span class="time-ago">16:00</span>
					</a>
				</li>-->
			</ul>
		</div>
	</div>
</template>
<script>
	module.exports = {
		el: "#app",
		data: function() {
			return {
				img1: 'images/haoyou.png',
				img2: 'images/concern.png',
				img3: 'images/fans.png',
				img4: 'images/zhi.png'
			}
		},
		ready: function() {},
		methods: {
			open: function(url) {
				mui.openWindow({
					url: url,
					id: url
				});
			}
		}
	}
</script>