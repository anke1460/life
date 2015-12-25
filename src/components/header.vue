<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">{{title}}</h1>
	</header>
</template>
<script>
	module.exports = {
		props: ['title']
	}
</script>