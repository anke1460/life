<!--
	作者：zuosjob@gmail.com
	时间：2016-01-21
	描述：发送图文消息
-->
<template>
		<header class="mui-bar mui-bar-nav header">
			<button class="mui-btn mui-btn-link mui-action-back mui-btn-nav mui-pull-left">
				<span class="cancelbtn">取消</span>
			</button>
			<a class="mui-btn mui-btn-link mui-pull-right" @tap="send">发送</a>
		</header>
	<div class="mui-content mui-content-padded">
	   <textarea class="content" v-model="content" placeholder="{{place}}"></textarea>
	   <img :src="image.url" v-for="image in images" class="photo" >
	   <span class="add-photo" @tap="selectImage"></span>
	   <h5>添加图片可额外获得60%基础分数</h5>
	</div>

</template>
<script>
  module.exports = {
  	  el: "#app",
  	  data: function() {
  	  	  return {
  	  	  	  place: ' ',
  	  	  	  images: [],
  	  	  	  image_ids: [],
  	  	  	  content: ''
  	  	  }
  	  },
  	  ready: function() {
  	  	  mui.init();
  	  	  var self = this;
  	  	  mui.plusReady(function() {
	  	  	  self.place = "和" + you.current_page.title + "有关的故事";
  	  	  })
  	  },
  	  methods: {
  	  	  send: function() {
  	  	  	  if (this.content.trim() =='') {
  	  	  	  	 mui.toast("请填写与您有关的故事后，再发送哦");
  	  	  	  	 return true;
  	  	  	  }
  	  	  	  you.authenPost("/nodes/" + you.current_page.node_id + "/photo_mark", {
  	  	  	  	  image_ids: this.image_ids, 
  	  	  	  	  content: this.content,
  	  	  	  	  detail_classify_id: you.current_page.detail_classify_id
  	  	  	  }, function(result) {
  	  	  	  	  mui.fire(you.webview("attainment_list"), "reloadData");
  	  	  	  	  mui.fire(you.webview("attainment_detail"), "reloadData");
  	  	  	  	  you.current_page.close();
  	  	  	  })
  	  	  },
  	  		selectImage: function() {
				plus.nativeUI.actionSheet({
						title: "上传照片",
						cancel: "取消",
						buttons: [{
							title: "相册"
						}, {
							title: "拍照"
						}]
					},
					function(e) {
						if (e.index == 1) {
							this.fromAlbum();
						} else if (e.index == 2) {
							this.fromCamera();
						}
					}.bind(this));
			},
			fromAlbum: function() { //从相册中选择图片
				var self = this;
				plus.gallery.pick(
					function(e) {
						self.getUploadToken(function() {
							self.processPhoto(e);
						})
					},
					mui.noop(),
					{
						filter: "image",
						multiple: false
					});
			},
			fromCamera: function() { //从拍照中选择图片
				var cmr = plus.camera.getCamera();
				var self = this;
				cmr.captureImage(function(path) {
					plus.io.resolveLocalFileSystemURL(path, function(entry) {
						self.getUploadToken(function() {
							//开始上传图片
							self.processPhoto(entry.toLocalURL());
						})
					});
				}, mui.noop());
			},
			getUploadToken: function(call) {//得到上传token，并上传图片
				you.authenGet(
					"/photos/upload_token",
					{
						type: 'Story'
					},
					function(result) {
						plus.storage.setItem("cloud_token", result.token);
						call();
					});
			},
			processPhoto: function(path) { //上传前压缩图片
				var self = this;
				var file_name = you.guid() + "." + path.substr(path.lastIndexOf('.') + 1);
				plus.zip.compressImage(
					{
						src: path,
						dst: "_downloads/" + file_name,
						overwrite: true,
						width: '1000px',
						quality: 70
					},
					function(e) {
						var temp_url = "_downloads/" + file_name;
						plus.io.resolveLocalFileSystemURL(temp_url, function(entry) {
							var local_url = entry.toLocalURL();
							self.images.push({url:local_url});
							self.uploadPhoto(local_url, file_name);
						});
					},
					function(error) {
						mui.totast("图片处理失败");
					});
			},
			uploadPhoto: function(file, filename) { //上传图片
				var self = this;
				this.loading = true;
				var task = plus.uploader.createUpload(
					'http://upload.qiniu.com',
					{
						method: "POST"
					}, 
					function(t, status) {
						you.endLoding();
						if (t.state == 4 && status == "201") {
							var result = JSON.parse(t.responseText);
						  self.image_ids.push(result.id);
							self.images[self.images.length - 1] = {
								id: result.id,
								url: result.url
							};
						} else {
							you.totast("图片处理失败");
						}
					});
				task.addFile(file, {
					key: 'file'
				});
				task.addData("token", plus.storage.getItem('cloud_token'));
				task.start();
			}
  	  }
  }
</script>
<style lang="sass">
  .content {
    height: 180px;
  	  border: none;
  	  color: #a0a0a0;
  }
  
  .photo {
 	 	width: 70px;
    height: 70px;
    display: inline-block;
    background-size: 100%;
    margin-right: 5px;
  }
 
</style>