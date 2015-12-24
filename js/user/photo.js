(function($){//选择相册及图片
	$.selectePhoto = function(callback) {
		plus.gallery.pick(
			function(e) {
				if (giant.limitPhotoUpload(e)) {
					callback(e);
				};
			},
			function(e) {
			  console.log('photo', e.error);
			}, {
				filter: "image",
				multiple: true
			});
	}
	
	$.selectCamera = function(callback) {
		var cmr = plus.camera.getCamera();
		var res = cmr.supportedImageResolutions[0];
		var fmt = cmr.supportedImageFormats[0];
		cmr.captureImage(function(path) {
			plus.io.resolveLocalFileSystemURL(path, function(entry) {
		    callback(entry);
			});
		},
		function(error) {
			console.log('camera', error.message);
		});
	}


	$.popActionSheet = function(name, params, callback) {
		plus.nativeUI.actionSheet({
			title: name,
			cancel: "取消",
			buttons: [{
				title: "相册"
			}, {
				title: "拍照"
			}]
		},
		function(e) {
			if (e.index == 1) {
				plus.gallery.pick(
					function(e) {
						$.authenGet("/users/avatar_token", params, function(result) {
				      plus.storage.setItem("cloud_token", result.token);
						  you.processPhoto(e, callback);
						});
					},
					function(e) {}, {
						filter: "image",
						multiple: false
					});
			} else if (e.index == 2) {
				var cmr = plus.camera.getCamera();
				cmr.captureImage(function(path) {
					plus.io.resolveLocalFileSystemURL(path, function(entry) {
						$.authenGet("/users/avatar_token", params, function(result) {
							plus.storage.setItem("cloud_token", result.token);
							you.processPhoto(entry.toLocalURL(), callback);
						});
					});
				},
				function(error) {});
		  }
	  });
	}

	$.processPhoto = function(path, callback) {
		var file_name = you.guid() + "." + path.substr(path.lastIndexOf('.')+1);
		plus.zip.compressImage({
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
					you.loading("上传中...");
					var task = plus.uploader.createUpload('http://upload.qiniu.com', {
							method: "POST"
						},
						function(t, status) {
							you.endLoding();
							if (t.state == 4 && status == "201") {
								callback(t);
							} else {
								console.log(JSON.stringify(t))
								console.log(status)
								you.alert("上传失败")
							}
						});
					task.addFile(local_url, {
						key: 'file'
					});
					task.addData("token", plus.storage.getItem('cloud_token'));
					task.start();
				});
			}, function(error) {
				console.log("Compress error!");
			});
	}
})(you);
