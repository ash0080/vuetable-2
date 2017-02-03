<template>
	<div id="app">
		<ps-table></ps-table>
	</div>
</template>

<script>
	import Vue from 'vue'
	import PsTable from './views/PsTable.vue'
//	import NProgress from 'nprogress'
	import 'font-awesome/css/font-awesome.css';
//	window.NProgress = NProgress;
	export default {
		components: {
			PsTable,
		},
	}
</script>

<style>
	html {
		overflow-y: auto;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/*text-align: center;*/
		color: #2c3e50;
		margin-bottom: 60px;
	}

	#app.login {
		margin-bottom: 0;
	}

	#header {
		margin-top: 40px;
	}

</style>