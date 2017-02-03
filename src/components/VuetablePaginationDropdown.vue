<template>
	<div :class="[css.wrapperClass]">
		<p class="control">
		  <span class="select">
		    <select :class="[{'vuetable-pagination-dropdown': true}, dropdownClass]" @change="selectPage($event)">
				<option v-for="n in totalPage" :class="[css.pageClass]" :value="n" :selected="isCurrentPage(n)">
					{{pageText}} {{n}}
				</option>
			</select>
		  </span>
		</p>
	</div>
</template>

<script>
	import PaginationMixin from './VuetablePaginationMixin.vue'

	export default {
		mixins: [PaginationMixin],
		props: {
			dropdownClass: {
				type: String,
				default () {
					return 'ui search dropdown'
				}
			},
			pageText: {
				type: String,
				default () {
					return 'Page'
				}
			}
		},
		methods: {
			loadPage (page) {
				this.$emit('vuetable-pagination:change-page', page)
			},
			selectPage (event) {
				this.$emit('vuetable-pagination:change-page', event.target.selectedIndex + 1)
			},
			registerEvents () {
				let self = this

				this.$on('vuetable:pagination-data', (tablePagination) => {
					self.setPaginationData(tablePagination)
				})
			}
		},
		created () {
			this.registerEvents()
		}
	}
</script>
