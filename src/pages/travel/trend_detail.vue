<template>
	<ul class="mui-table-view">
		<li class="mui-table-view-cell mui-media">
			<img class="mui-media-object mui-pull-left" :src="item.avatar">
			<span class="time">1分钟前</span>
			<div class="mui-media-body" style="margin: 0px;">
				{{item.name}}
				<div>{{item.content}}</div>
				<p>
					<img :src="img.img" width="100px" v-for="img in item.imgs" class="thumb-img" />
				</p>
			</div>
		</li>
	</ul>
	<ul class="mui-table-view" style="margin-top: 10px;">
		<li class="mui-table-view-cell mui-media">
		 <div>
		 	<span>评论(1)</span>
		 	<div class="up">
		 			<img class="avatar" :src="item.avatar" height="30px">
		     	<img class="avatar" :src="item.avatar" height="30px">
		     	<span>赞 2</span>
		 	</div>
		 </div>
		</li>
	</ul>
	<ul class="mui-table-view">
		<li class="mui-table-view-cell mui-media">
			<img class="mui-media-object mui-pull-left" :src="item.avatar">
			<span class="time">1分钟前</span>
			<div class="mui-media-body" style="margin: 0px;">
				{{item.name}}
				<div>回复 <strong></strong>leaf {{item.content}}</div>
				<div class="reply">
					<span class="arrow"></span>
					你有好的看法
				</div>
			</div>
		</li>
	</ul>
</template>
<script>
	module.exports = {
		el: '#detail',
		data: {
			item: {
				avatar: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg',
				name: '刘德华',
				content: '五岳归来不看山，黄山归来不看岳，绝对的经典，一年四个样',
				imgs: [
					{
						img: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg'
					},
					{
						img: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg'
					}
				]
			}
		},
		ready: function() {
		},
		methods: {
		}
	}
</script>
<style lang="sass">
  .up {
  	  float: right;
  	  font-size: 12px;
  	  .avatar {
	 	 	width: 30px;
	    height: 30px;
	    vertical-align: middle;
	  }
  }
  
	.thumb-img {
		margin: 3px;
	}
	.time {
		position: absolute;
    right: 10px;
	}
	
	.reply {
		position: relative;
		margin-top: 15px;
		background: #eee;
    padding: 10px 5px;
    color: #989898;
    .arrow {
	    height: 20px;
	    display: block;
	    position: absolute;
	    width: 20px;
	    top: -20px;
	    left: 15px;
	    overflow: hidden;
	    z-index: 2;
	    &:before {
		    	position: absolute;
		    top: 15px;
		    left: 0px;
		    width: 20px;
		    height: 20px;
		    content: ' ';
		    background: #eee;
		    -webkit-transform: rotate(45deg);
		    -ms-transform: rotate(45deg);
		    transform: rotate(45deg);
		    z-index: 0;
   	 }
    }
	}
</style>