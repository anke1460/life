(function($) {
	$.guid = function() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	mui.plusReady(function() {
	
		if ( mui.os.ios) {
			mui(".mui-scroll-wrapper").scroll();
		} else {
			mui(".scroll-wraper").scroll();
		}
	  plus.screen.lockOrientation("portrait-primary");
		$.current_page = plus.webview.currentWebview();
		if (mui("#user_avatar")[0]) {
			mui("#user_avatar")[0].src = plus.storage.getItem("avatar_url");
		}
		if (mui(".home-user-name")[0]) {
			mui(".home-user-name")[0].innerText = plus.storage.getItem("name");
		}
		
		if (mui('.mui-helper')[0]) {
			mui('.mui-helper')[0].addEventListener("tap", function() {
				mui.openWindow({
					url: (this.classList.contains("setting") ? 'help.html' : 'help.html'),
					id: 'help_index'
				});
			})	;
		}
	});
	function lazyload(obj, src, callback) {
    var debug = false;
    if(obj.getAttribute('data-loaded')){
       return; 
    }
    var image_url = obj.getAttribute('data-src');
    var data_src = image_url;
    obj.src = src;
    if (src.indexOf("yunlu6.com") == -1 && data_src.lastIndexOf('?') != -1) {
      data_src = data_src.substring(0, data_src.lastIndexOf('?'));
    } 
    debug && console.log(image_url);

    // 缓存目录 _downloads/image/(md5).jpg
    var image_md5           = md5(data_src);
    var local_image_url     = '_downloads/image/'+image_md5+'.jpg'; // 缓存本地图片url
    var absolute_image_path = plus.io.convertLocalFileSystemURL(local_image_url); // 平台绝对路径

    // new temp_img 用于判断图片文件是否存在
    var temp_img = new Image();
    temp_img.src = absolute_image_path;
    temp_img.onload = function() {
      debug && console.log('存在本地缓存图片文件'+local_image_url+'，直接显示');

      // 1.1 存在，则直接显示（本地已缓存，不需要淡入动画）
      obj.setAttribute('src', absolute_image_path);
      obj.setAttribute('data-loaded', true);
      if (typeof(callback) == 'function') {
      	 callback();
      }
     
      return;
    }
    temp_img.onerror = function() {
      debug && console.log('不存在本地缓存图片文件');

      // 1.2 不存在则进行加载图片
      var img = new Image();
      img.src = image_url; // 传过来的图片路径在这里用
      img.onload = function() {
        var that = this;

        obj.setAttribute('src', image_url);
        obj.setAttribute('data-loaded', true);
        // obj.classList.add('img-animation');
        if (typeof(callback) == 'function') {
        	 obj.onload =  callback;
        }
        
        // 1.3 下载图片缓存到本地
        debug && console.log('开始下载图片'+image_url+' 缓存到本地: '+local_image_url);

        var download_task = plus.downloader.createDownload(image_url, {
          filename: local_image_url // filename:下载任务在本地保存的文件路径
        }, function(download, status) {
          if(status != 200) {
              // 下载失败,删除本地临时文件
              debug && console.log('下载失败,status'+status);
              if(local_image_url != null) {
                plus.io.resolveLocalFileSystemURL(local_image_url, function(entry) {
                  entry.remove(function(entry) {
                      debug && console.log("临时文件删除成功" + local_image_url);
                  }, function(e) {
                      debug && console.log("临时文件删除失败" + local_image_url);
                  });
                });
              }
          }
        });
        download_task.start();
      }
    }
  }
	//预加载图片
	$.preLoadPhoto = function(el, preimg, callback) {
		var imglist = mui(el);
		for (i = 0; i < imglist.length; i++) {
			imglist[i].onload = lazyload(imglist[i],preimg, callback);
		}
	}
	
	$.clearCachePhoto = function(img) {
		mui.each(mui(img), function(i, d) {
	    var data_src = d.dataset.src;
	    if (data_src.indexOf("yunlu6.com") == -1 ) {
	     data_src = data_src.substring(0, data_src.lastIndexOf('?'));
	    } 
		  var image_md5 = md5(data_src);
	    var local_image_url = '_downloads/image/'+image_md5+'.jpg';
			plus.io.resolveLocalFileSystemURL(local_image_url, function(entry) {
			 	entry.remove();
			 }, function(e) {
			 	console.log('eee', e.message);
			 });
		});
		
	}
	
	$.web_base = "http://youyou.127.0.0.1.xip.io";
  $.app_base = $.web_base + "/api/v1";
  $.httpRequest = function(url, type, is_token, data, success, failure) {
		if (is_token) {
			data['token'] = plus.storage.getItem("token");
			if (plus.storage.getItem("token") == "" || plus.storage.getItem("token") == undefined) {
				mui.openWindow({
					url: 'login.html',
					id: 'login.html',
					extras: {
						view_id: $.current_page.parent() ? $.current_page.parent().id : $.current_page.id
					}
				});
				return false;
			}
		}
		if (!$.checkNetwork()) {
			$.endLoding();
			return false;
		}
		mui.ajax($.app_base + url, {
			data: data,
			dataType: 'json',
			type: type,
			timeout: 20000,
			crossDomain: true,
			success: function(result) {
				success(result);
			},
			error: function(xhr, type, errorThrown) {
				if (failure) {
					failure(xhr, type, errorThrown);
				} else {
					if (type == 'timeout') {
						plus.nativeUI.toast('连接服务器超时，请检查下您的网络');
					} else if (type == 'error') {
						plus.nativeUI.toast(JSON.parse(xhr.responseText).error);
					}
					console.log(type);
					console.log(xhr.responseText);
					plus.nativeUI.closeWaiting();
				}
			}
		});
	}
  
  $.authenPost = function(url, params, success, failure) {
   	$.httpRequest(url, 'post', true, params, success, failure);
  }
  
  $.authenPut = function(url, params, success, failure) {
  	  params["_method"] = "put";
   	$.httpRequest(url, 'post', true, params, success, failure);
  }
  
  $.authenDelete = function(url, params, success, failure) {
  	  params["_method"] = "delete";
   	$.httpRequest(url, 'post', true, params, success, failure);
  }
  
  $.authenGet = function(url, params, success, failure) {
   	$.httpRequest(url, 'get', true, params, success, failure);
  }
  
  $.get = function(url, params, success, failure) {
    	$.httpRequest(url, 'get', false, params, success, failure);
  }
  
  $.post = function(url, params, success, failure) {
    	$.httpRequest(url, 'post', false, params, success, failure);
  }

  $.canDo = function(data) {
		var can = false;
		for (var i in data) {
			if (data[i]) {
				can = true;
				break;
			} 
		}
		return can;
  }


  $.clone = function(obj) {
		var copy;
		// Handle the 3 simple types, and null or undefined
		if (null == obj || "object" != typeof obj) return obj;
		// Handle Date
		if (obj instanceof Date) {
			copy = new Date();
			copy.setTime(obj.getTime());
			return copy;
		}
		// Handle Array
		if (obj instanceof Array) {
			copy = [];
			for (var i = 0, len = obj.length; i < len; i++) {
				copy[i] = $.clone(obj[i]);
			}
			return copy;
		}
		// Handle Object
		if (obj instanceof Object) {
			copy = {};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = $.clone(obj[attr]);
			}
			return copy;
		}
		throw new Error("Unable to copy obj! Its type isn't supported.");
	}
  
	$.saveSuccess = function(result, success, failure) {
		plus.nativeUI.closeWaiting();
		if (result.success) {
			if (success) {
				success();
			}
		} else {
			if (failure) {
				failure();
			} else {
				plus.nativeUI.alert(result.msg);
			}
		}
	}
	
	
	$.isFormValid = function(item) {
		var params = {};
		var is_valid = true;
		mui.each(item || mui("input"), function(i, d) {
			if (d.getAttribute("required") == "required" && d.value == "") {
				plus.nativeUI.alert(d.parentNode.querySelector("label").innerText + "不能为空");
				is_valid = false;
				return false;
			}
			if (d.value != "") {
				params[d.getAttribute("name")] = d.value;
			}
		});
		return [params, is_valid];
	}

	$.removeItem = function(items, b) {
		var a = items.indexOf(b);
		if (a >= 0) {
			items.splice(a, 1);
			return true;
		}
		return false;
	};
	
	$.loading = function(text) {
		plus.nativeUI.showWaiting(text || "加载中", {padlock: true});
	}
	
	$.endLoding = function() {
		plus.nativeUI.closeWaiting();
	}
	
	$.saveLoading = function(text) {
		plus.nativeUI.showWaiting("保存中");
	}
	
	$.alert = function(msg) {
		mui.later(function() {
			plus.nativeUI.alert(msg);
		},500);
		
	}
	
	$.webview = function(web) {
		return plus.webview.getWebviewById(web);
	}
	
	$.cloudToken = function (params, call_back) {
		params["token"] = plus.storage.getItem("token");
		$.authenGet("/upload_token", params, function(result) {
			plus.storage.setItem("cloud_token", result.uptoken);
			if (call_back) {
				call_back(result);
			}
		}, function(result) {
			giant.alert("网络请求超时，请检查您的网络或重新上传");
			plus.storage.setItem("cloud_token", '');
		});
	}
	
	$.img_url = function(url) {
		if (url == null) {
			return "";
		} else if (url.substring(0,7) == "http://") {
			return url;
		} else {
			return giant.web_base + url;
		}
		
	}
	
	$.closeView = function(id) {
		if ($.webview(id)) {
			$.webview(id).close();
		}
	}
	
	$.clearStore = function() {
		var keys = [];
		for (var i = 0; i < plus.storage.getLength(); i++) {
			if (plus.storage.key(i) != "update_file" || plus.storage.key(i) != "inverval_time") {
				keys.push(plus.storage.key(i));
			}
		}
		for(var i in keys) {
			plus.storage.removeItem(keys[i]);
		}
	}
	
	$.setStore = function(key, value) {
		plus.storage.setItem(key, value);
	}
	
	$.removeStore = function(key) {
		plus.storage.removeItem(key);
	}
	
	$.getStore = function(key) {
		return plus.storage.getItem(key);
	}
	
	$.searchFocus = function(id) {
		if (mui.os.ios) {
			var webView = plus.webview.currentWebview().nativeInstanceObject();
			webView.plusCallMethod({
				"setKeyboardDisplayRequiresUserAction": false
			});
	    mui.focus(document.getElementById(id));
		} else {
			var Context = plus.android.importClass("android.content.Context");
	    var InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
	    var main = plus.android.runtimeMainActivity();
	    var imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
	    imm.toggleSoftInput(0,InputMethodManager.SHOW_FORCED);
		}
	}
	
	$.noResult = function(dom) {
		var html = document.createElement("div");
		html.className = "no-result-wraper";
		html.innerHTML = '<p>无数据</p>';
//		html.innerHTML = '<div class="no-result"></div><p>没有结果</p>';
		
		dom.appendChild(html);
	}
	
	$.removeNoResult = function() {
		if (mui(".no-result-wraper")[0]) {
			mui(".no-result-wraper")[0].parentNode.removeChild(mui(".no-result-wraper")[0]);
		}
	}
	
	$.enterfocus = function(selector, callback) {
		var boxArray = [].slice.call(document.querySelectorAll(selector));
		for (var index in boxArray) {
			var box = boxArray[index];
			box.addEventListener('keyup', function(event) {
				if (event.keyCode == 13) {
					var boxIndex = boxArray.indexOf(this);
					if (boxIndex == boxArray.length - 1) {
						if (callback) {
							callback();
							box.blur();
						}
					} else {
						var nextBox = boxArray[++boxIndex];
						nextBox.focus();
					}
				}
			}, false);
		}
	};
	
	$.hideMore = function(hide) {
		if (hide) {
			setTimeout(function() {
				mui(".mui-pull-bottom-pocket")[0].classList.add("mui-hidden");
			},350);
		}
	}
	
	$.resultTip = function(total_count, total) {//没有数据时提示
		if (total_count == 0) {
		  giant.noResult(document.body);
		} else {
			giant.removeNoResult();
		}
		giant.hideMore(total_count < total);
	}
	
	$.showUploadView = function(params) {
		var upload_view = giant.webview("upload");
		mui.fire(upload_view, "show_view", params);
		upload_view.show("slide-in-bottom");
	}
	
	$.limitPhotoUpload = function(e) {
		if (e.files.length > 10) {
      $.alert('最多只能上传10张图');
      return false;
   }
		return true;
	}
	
	$.checkNetwork = function(callback) {
		if (plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE) {
			mui.toast("当前无网络连接，请检查下您的网络");
			return false;
		}
		return true;
	}
	
	$.totast = function(text) {
		plus.nativeUI.toast(text);
	}
	
	$.dom = function(id) {
		return document.getElementById(id);
	}
	
	$.loadWebUrl = function(url, id, options) {
		var href = url;
  	  third_search_web = plus.webview.getWebviewById(id);
    children_view = third_search_web.children()[0];
    aniShow = mui.os.ios ? 'pop-in' : 'slide-in-right';
    mui.fire(third_search_web,'updateHeader', options);
		if(mui.os.ios || parseFloat(mui.os.version) < 4.4) {
			if (children_view.getURL() != href) {
				children_view.loadURL(href);
			} else {
				 children_view.show();
				 giant.endLoding();
			}
			third_search_web.show('slide-in-right', 150);
		}
	}
			
})(window.you = {});


