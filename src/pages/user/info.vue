<template>
	<ul class="mui-table-view mui-table-view-chevron">
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" id="upload_avatar">
				<label style="line-height: 60px;">头像</label>
				<div id="avatar" class="mui-pull-right" @tap="uploadLogo">
				</div>
			</a>
		</li>
	</ul>
	<ul class="mui-table-view mui-table-view-chevron" style="margin-top: 15px;">
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" id="user_name" @tap="changeName">
				<label>昵称</label>
				<span class="mui-pull-right" id="name">
					   </span>
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" id="sex_select" @tap="selectSex">
				<label>性别</label>
				<span class="mui-pull-right" id="sex">
					   	{{user_info.age || '未填写'}}
					   </span>
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" id="age_select" @tap="selectAge">
				<label>出生日期</label>
				<span class="mui-pull-right" id="age">
					   	{{user_info.birth || '未填写'}}
					   </span>
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" id="my_sign" @tap="changeSign">
				<label>我的签名</label>
				<span class="mui-pull-right mui-ellipsis" id="sign">
					   	{{user_info.sign || '未填写'}}
					   </span>
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right">
				<label>我的头衔</label>
				<span class="mui-pull-right mui-ellipsis" id="rank" @tap="rank">
					   {{user_info.rank || '未填写'}}
					   </span>
			</a>
		</li>
	</ul>
	<ul class="mui-table-view mui-table-view-chevron" style="margin-top: 15px;">
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" id="hometown_select">
				<label>家乡</label>
				<span class="mui-pull-right" id="hometown">
					   	{{user_info.hometown || '未填写'}}
					   </span>
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" id="place_select">
				<label>常住地</label>
				<span class="mui-pull-right" id="place">
					   	{{user_info.address || '未填写'}}
					   </span>
			</a>
		</li>
	</ul>

</template>
<script>
	module.exports = {
		el: '#app',
		data: {
			user_info: {
				name: '',
				age: '',
				age_id: '',
				birth: '',
				sign: '',
				rank: '',
				hometown: '',
				address: ''
			}
		},
		ready: function() {
			mui.init({
				swipeBack: true //启用右滑关闭功能
			});
			mui.plusReady(function() {
				you.dom("avatar").innerText = you.getStore("name").slice(0, 1);
				you.dom("name").innerText = you.getStore("name");
			});
			var hometown_pop = new mui.PopPicker({
				layer: 2
			});
			hometown_pop.setData(cityData);
			var hometown_select = document.getElementById('hometown_select');
			var hometown = document.getElementById('hometown');
			hometown_select.addEventListener('tap', function(event) {
				hometown_pop.show(function(items) {
					this.user_info.hometown = items[0].text + items[1].text;
				}.bind(this));
			}.bind(this), false);
			var place_pop = new mui.PopPicker({
				layer: 2
			});
			place_pop.setData(cityData);
			var place_select = document.getElementById('place_select');
			var place = document.getElementById('place');
			place_select.addEventListener('tap', function(event) {
				place_pop.show(function(items) {
					this.user_info.address = items[0].text + items[1].text;
				}.bind(this));
			}.bind(this), false);
			window.addEventListener("set_value", function(e) {
				this.user_info[e.detail.id] = e.detail.name;
			}.bind(this));
		},
		methods: {
			changeName: function() {
				this.openWindow("user_name.html", "user_name");
			},
			uploadLogo: function() {
				you.popActionSheet("上传头像", {}, function(result) {
				});
			},
			selectSex: function() {
				var actionbuttons = [{
					title: "男"
				}, {
					title: "女"
				}];
				var actionstyle = {
					title: "选择性别",
					buttons: actionbuttons
				};
				plus.nativeUI.actionSheet(actionstyle, function(e) {
					this.user_info.age_id = e.index;
					this.user_info.age = {
						1: "男",
						2: "女"
					}[e.index];
				}.bind(this));
			},
			selectAge: function() {
				var d = new Date();
				d.setFullYear(1949, 0, 1);
				plus.nativeUI.pickDate(function(e) {
						var birder = e.date;
						you.dom("age").innerText = birder.getFullYear() + "-" + (birder.getMonth() + 1) + "-" + birder.getDate();
					},
					mui.noop, {
						minDate: d,
						maxDate: new Date()
					});
			},
			changeSign: function() {
				this.openWindow("sign.html", "sign.html");
			},
			rank: function() {
				this.openWindow('rank.html', 'rank');
			},
			openWindow: function(url, id) {
				mui.openWindow({
					url: url,
					id: id,
					styles: {
						aniShow: 'pop-in'
					}
				});
			}
		}
	}
</script>