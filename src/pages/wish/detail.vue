<!--
	作者：zuosjob@gmail.com
	时间：2016-01-04
	描述：心愿详情页面
-->
<template>
	<div class="mui-content">
		<div class="mui-content-padded">
			<p>
				<span id="" style="font-size: 18px;">
					{{wish.description}}
				</span>
				<span style="float: right;">剩余：
					<strong>{{wish.residue_day}}</strong>
				</span>
			</p>
			<p>
				许愿时间：
				<span id="">
					 {{wish.created_at}}
				</span>
			</p>
			<!--<p>
					自我鼓励：
				</p>
				<p>1.每天读一会，目标更容易实现</p>
				<p>2.加油！</p>-->
		</div>

		<div id="habit">
			关联并坚持一个好习惯，让目标更容易实现
			<a id="add_habit" href="#pop_custom" class="">+</a>
		</div>
		<div v-for="habit in wish.habits">
			<div class="mui-content-padded">
				<h5>习惯{{$index}}: {{habit.name}}</h5>
			</div>
			<div id="calendar{{$index}}">

			</div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<span id="">
						坚持
					</span>
					<span class="mui-pull-right">
						<strong style="color: #1FCC7C;">1</strong> 天
					</span>
				</li>
				<li class="mui-table-view-cell">
					<span id="">
						出勤率
					</span>
					<span class="mui-pull-right">
						<strong style="color: #1FCC7C;">20</strong> %
					</span>
				</li>
				<li class="mui-table-view-cell">
					<span id="">
						最高连续出勤率
					</span>
					<span class="mui-pull-right">
						<strong style="color: #1FCC7C;">10</strong> 天
					</span>
				</li>
			</ul>
		</div>

	</div>
	<div id="pop_custom" class="mui-popover">
		<h4 class="pop-title">关联习惯</h4>
		<form class="mui-input-group">
			<div class="mui-input-row">
				<label>名称</label>
				<input type="text" placeholder="习惯名称" v-model="name">
			</div>
			<div class="mui-input-row">
				<label>显示顺序</label>
				<div class="mui-numbox" data-numbox-max="{{max_position}}" data-numbox-min="1">
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input class="mui-input-numbox" type="number" value="1" v-model="position" />
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
			</div>
			<div class="mui-input-row">
				<label>检查方式</label>
				<button class="btn mui-btn-default" id="self_btn">自主打卡</button>
				<button class="btn" id="friend_btn">好友监督</button>
			</div>
		</form>
		<div class="mui-content-padded">
			<button class="mui-btn mui-btn-block mui-btn-default" style="padding: 10px;" @tap="save">生成</button>
		</div>
	</div>
</template>
<script>
	module.exports = {
		el: "#app",
		data: function() {
			return {
				wish: '',
				habits: '',
				name: '',
				max_position: 1,
				position: 1
			}
		},
		ready: function() {
			mui.init();
			mui.ready(function() {
				mui("#pop_custom").on("tap", ".btn", function(e) {
					e.stopPropagation()
				});
			}.bind(this));
			mui.plusReady(function() {
				you.loading();
				you.authenGet("/wishes/" + plus.storage.getItem("wish_id"), {}, function(result) {
					console.log(JSON.stringify(result))
					this.wish = result.wish;
					you.endLoding();
					var i = 0;
					console.log(this.wish.habits.length)
					for (i; i < this.wish.habits.length; i++) {
						console.log(mui("#calendar" + i))
						var yesterday = mui.DateUtil.addDate(mui.DateUtil.getToday(), -1);
						var MC = mui("#calendar" + i).MCalendar({
							date: yesterday
						});
					}
				}.bind(this));
			}.bind(this))
		},
		methods: {
			save: function() {
				if (this.name.trim() != "") {
					you.authenPost("/wishes/" + plus.storage.getItem("wish_id") + "/habit", {
						name: this.name,
						position: this.position
					}, function(result) {
						console.log(JSON.stringify(result))
						console.log(this.name, this.max_position)
						this.max_position += 1;
						mui(".mui-numbox").numbox().setOption('max', this.max_position);
						mui(".mui-numbox .mui-btn-numbox-plus")[0].removeAttribute("disabled");
						mui("#pop_custom").popover('toggle');
					}.bind(this));
				} else {
					you.alert("请输入习惯名称");
				}
			}
		}
	}
</script>
<style lang="sass">
	.mui-content {
		color: #444;
	}
	
	#habit {
		font-size: 14px;
		color: #8F8F94;
		background: #DDDDDD;
		padding: 5px 10px;
	}
	
	#add_habit {
		color: #000;
		font-weight: bold;
		font-size: 20px;
		float: right;
	}
	
	.pop-title {
		background-color: #1FCC7C;
		color: #fff;
		text-align: center;
		padding: 10px;
		margin: 0px;
		border-top-left-radius: 7px;
		border-top-right-radius: 7px;
	}
	
	div.mui-popover-arrow {
		display: none;
	}
	
	.mui-numbox {
		float: left;
		margin: 2px 0px;
	}
	
	#pop_custom {
		width: 280px;
		height: 220px;
	}
	
	#pop_custom .btn {
		margin: 3px 0px;
	}
	
	div#pop_custom.mui-popover.mui-active {
		position: fixed;
		top: 50% !important;
		left: 50% !important;
		margin-top: -110px;
		margin-left: -140px;
	}
</style>