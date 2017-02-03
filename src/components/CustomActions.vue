<template>
	<div class="has-text-centered">
		<!--<router-link class="button is-small is-warning" :to="{path:'edit', params:{id:rowData.id}}">-->
		<a class="button is-small is-primary" @click="onClick('view-item', rowData)">
			<span class="icon is-small">
				<i class="fa fa-eye"></i>
			</span>
		</a>
		<a class="button is-small is-warning" @click="onClick('edit-item', rowData)">
			<span class="icon is-small">
				<i class="fa fa-pencil-square-o"></i>
			</span>
		</a>

		<a class="button is-small is-danger" @click="onClick('delete-item', rowData)">
			<span class="icon is-small">
				<i class="fa fa-trash-o"></i>
			</span>
		</a>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default  {
		props: {
			rowData: {
				type: Object,
				required: true
			}
		},
		methods: {
			onClick: function (action, data) {
				console.log('actions: on-click', data.name)
				sweetAlert(action, data.name)
			},
		}
	}
</script>