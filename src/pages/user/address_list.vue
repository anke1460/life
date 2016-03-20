<!--
	作者：zuosjob@gmail.com
	时间：2016-01-13
	描述：详情页面
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">通讯录朋友</h1>
	</header>
	<div id="refreshContainer" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<template v-if="is_up">
				<div class="add">
					<button class="mui-btn mui-btn-default start" @tap="up">启用通讯录</button>
				</div>
			</template>
			<template v-else>
				<div class="add">
					<button class="mui-btn mui-btn-default start" @tap="view">查看通讯录好友</button>
				</div>
			</template>
			
		</div>
	</div>

</template>
<script>
	module.exports = {
		el: "#app",
		data: function() {
			return {
				items: [],
				is_up: true
			}
		},
		ready: function() {
		},
		methods: {
			view: function(item) {
				mui.openWindow({
					url: 'contacts.html',
					id: 'contacts'
				})
			},
			up: function() {
				var self = this;
				var is_start = true;
				var list = [];
				if (is_start) {
					is_start = false;
					you.loading('同步中');
					plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, function(addressbook) {
						addressbook.find(["displayName", "phoneNumbers"], function(contacts) {
							mui.each(contacts, function(index, data) {
								var phones = [];
								if (data.phoneNumbers.length > 0) {
									mui.each(data.phoneNumbers, function(i, d) {
										phones.push({value: d.value, type: d.type});
									});
									list.push({name:data.displayName, numbers: phones});
								}
							});
							you.authenPost("/system/contacts", {list: JSON.stringify(list)}, function(result) {
								you.endLoding();
						   	self.is_up = false;
							})
							
						}, function() {
							is_start = true;
						});
					}, function(e) {
						you.alert("请确认是否已开启通讯录权限")
					});
				}
			}
		}
	}
</script>
<style lang="sass">
	.start {
		width: 100%;
	}
	.add {
		padding: 50px 10px;
	}
	.select {
		position: absolute;
		right: 20px;
		top: 25px;
		color: #989898
	}
	
</style>