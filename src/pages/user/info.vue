<template>
	<ul class="mui-table-view mui-table-view-chevron">
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" id="upload_avatar">
				<label style="line-height: 60px;">头像</label>
				<img class="mui-pull-right avatar" :src="user_info.logo" @tap="uploadLogo"/>
			</a>
		</li>
	</ul>
	<ul class="mui-table-view mui-table-view-chevron" style="margin-top: 15px;">
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" @tap="changeName">
				<label>昵称</label>
				<span class="mui-pull-right">{{user_info.name}}</span>
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" @tap="selectSex">
				<label>性别</label>
				<span class="mui-pull-right">
			   	{{sex_name || '未填写'}}
				</span>
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" @tap="selectAge">
				<label>出生日期</label>
				<span class="mui-pull-right">
			   	{{user_info.birth_on || '未填写'}}
			   </span>
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" @tap="showSysNo">
				<label>有友号</label>
				<span class="mui-pull-right">
			   	{{user_info.sys_no || '绑定有友号'}}
			   </span>
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" @tap="changeSign">
				<label>我的签名</label>
				<span class="mui-pull-right mui-ellipsis" style="max-width: 60%;">
			   	{{user_info.sign || '未填写'}}
			   </span>
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" @tap="showRank">
				<label>我的头衔</label>
				<span class="mui-pull-right mui-ellipsis">
			   {{rank || '未填写'}}
			   </span>
			</a>
		</li>
	</ul>
	<ul class="mui-table-view mui-table-view-chevron" style="margin-top: 15px;">
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" id="hometown_select">
				<label>家乡</label>
				<span class="mui-pull-right">
			   	{{home_town || '未填写'}}
			   </span>
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" id="place_select">
				<label>现居地</label>
				<span class="mui-pull-right">
			   	{{address || '未填写'}}
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
				sex: '',
				birth_on: '',
				sign: '',
				rank_id: '',
				sys_no: '',
				home_town_id: '',
				residence_id: '',
				logo: ''
			},
			sex_name: '',
			rank: '',
			home_town: '',
			address: ''
		},
		ready: function() {
			mui.init({
				swipeBack: true //启用右滑关闭功能
			});
			mui.plusReady(function() {
				you.loading();
				you.authenGet("/users/info", {}, function(result) {
					this.user_info = result;
					this.home_town = you.getCity(this.user_info.home_town_id);
					this.address = you.getCity(this.user_info.residence_id	);
					this.sex_name = {
						1: "男",
						2: "女"
					}[this.user_info.sex];
					you.endLoding();
				}.bind(this));
			}.bind(this));
			var hometown_pop = new mui.PopPicker({
				layer: 2
			});
			hometown_pop.setData(cityData);
			var hometown_select = document.getElementById('hometown_select');
			hometown_select.addEventListener('tap', function(event) {
				hometown_pop.show(function(items) {
					this.updateValue({value: items[1].value, type: 'home_town_id'}, function(result) {
						this.home_town = items[0].text + items[1].text;
						this.home_town_id = items[1].value;
					}.bind(this));
				}.bind(this));
			}.bind(this), false);
			var place_pop = new mui.PopPicker({
				layer: 2
			});
			place_pop.setData(cityData);
			var place_select = document.getElementById('place_select');
			place_select.addEventListener('tap', function(event) {
				place_pop.show(function(items) {
					this.updateValue({value: items[1].value, type: 'residence_id'}, function(result) {
						this.residence_id = items[1].value;
						this.address = items[0].text + items[1].text;
					}.bind(this));
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
				you.popActionSheet("上传头像", {}, mui.noop);
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
					this.updateValue({value: {
							1: "男",
							2: "女"
						}[e.index], type: 'sex'}, function(result) {
						this.user_info.sex = {
							1: "男",
							2: "女"
						}[e.index];
						this.sex_name = {
							1: "男",
							2: "女"
						}[e.index];
					}.bind(this));
				}.bind(this));
			},
			selectAge: function() {
				var d = new Date();
				d.setFullYear(1949, 0, 1);
				plus.nativeUI.pickDate(function(e) {
					var birder = e.date;
					var data = birder.getFullYear() + "-" + (birder.getMonth() + 1) + "-" + birder.getDate();
					this.updateValue({value: data, type: 'birth_on'}, function(result) {
						this.user_info.birth_on = data;
					}.bind(this));
				}.bind(this),
				mui.noop, {
					minDate: d,
					maxDate: new Date()
				});
			},
			changeSign: function() {
				this.openWindow("sign.html", "sign.html", {value: this.user_info.sign});
			},
			showRank: function() {
				this.openWindow('rank.html', 'rank');
			},
			showSysNo: function() {
				this.openWindow('sys_no.html', 'sys_no', {value: this.user_info.sys_no});
			},
			openWindow: function(url, id, extras) {
				mui.openWindow({
					url: url,
					id: id,
					styles: {
						aniShow: 'pop-in'
					},
					extras: extras
				});
			},
			updateValue: function(data, callback) {
				console.log(JSON.stringify(data));
				you.authenPut("/users/info", data, function(result) {
					callback(result);
				}.bind(this));
			}
		}
	}
</script>

<style lang="sass">
	.avatar {
		height: 60px;
		line-height: 60px;
		display: block;
		background: #ccc;
		width: 60px;
		border-radius: 30px;
		text-align: center;
		color: red;
		font-size: 30px;
	}
</style>