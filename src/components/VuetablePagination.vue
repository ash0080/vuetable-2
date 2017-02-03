<template>
	<div v-if="tablePagination && tablePagination.last_page > 1" :class="css.wrapperClass">
		<a @click="loadPage('prev')"
		   :class="[{'btn-nav': true}, css.prevClass, isOnFirstPage ? css.disabledClass : '']">
			<i v-if="icons.next != ''" :class="[icons.prev]"></i>
			<span v-else>&nbsp;&lsaquo;</span>
		</a>
		<a @click="loadPage('next')"
		   :class="[{'btn-nav': true}, css.nextClass, isOnLastPage ? css.disabledClass : '']">
			<i v-if="icons.next != ''" :class="[icons.next]"></i>
			<span v-else>&rsaquo;&nbsp;</span>
		</a>
		<ul :class="[{'btn-nav': true}, css.listWrapperClass]">
			<template v-if="notEnoughPages">
				<li v-for="n in totalPage">
					<a @click="loadPage(n)"
					   :class="[css.linkClass, isCurrentPage(n) ? css.activeClass : '']"
					   v-html="n">
					</a>
				</li>
			</template>
			<template v-else>
				<li v-show="isHiddenPage(1)">

					<a @click="loadPage(1)"
					   :class="[css.linkClass, isCurrentPage(1) ? css.activeClass : '']"
					   v-html="1">
					</a>
				</li>
				<li v-show="isHiddenPage(2)">
					<span class="pagination-ellipsis">&hellip;</span>
				</li>
				<li v-for="n in windowSize">
					<a @click="loadPage(windowStart+n-1)"
					   :class="[css.linkClass, isCurrentPage(windowStart+n-1) ? css.activeClass : '']"
					   v-html="windowStart+n-1">
					</a>
				</li>
				<li v-show="isHiddenPage(totalPage-1)">
					<span class="pagination-ellipsis">&hellip;</span>
				</li>
				<li v-show="isHiddenPage(totalPage)">
					<a @click="loadPage(totalPage)"
					   :class="[css.linkClass, isCurrentPage(totalPage) ? css.activeClass : '']"
					   v-html="totalPage">
					</a>
				</li>

			</template>
		</ul>
	</div>
</template>

<script>
	import PaginationMixin from './VuetablePaginationMixin.vue'

	export default {
		mixins: [PaginationMixin],
	}
</script>
