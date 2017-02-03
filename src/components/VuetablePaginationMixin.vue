<script>
	export default {
		props: {
			css: {
				type: Object,
				default () {
					return {
						wrapperClass: 'pagination is-centered level-right',

						prevClass: 'pagination-previous',
						nextClass: 'pagination-next',
						listWrapperClass: 'pagination-list',

						linkClass: 'pagination-link',
						ellipsisClass: 'pagination-ellipsis',

						activeClass: 'is-current',
						disabledClass: 'is-disabled',
//						paginationClass: 'this-is-here',
						paginationInfoClass: 'left floated left aligned six wide column'
					}
				}
			},
			icons: {
				type: Object,
				default () {
					return {
						prev: 'fa fa-angle-left',
						next: 'fa fa-angle-right',
						first: 'right chevron icon',
						last: 'angle double right icon',
					}
				}
			},
			onEachSide: {
				type: Number,
				default () {
					return 1
				}
			},
		},
		data: function () {
			return {
				tablePagination: null
			}
		},
		computed: {
			totalPage () {
				return this.tablePagination === null
					? 0
					: this.tablePagination.last_page
			},
			isOnFirstPage () {
				return this.tablePagination === null
					? false
					: this.tablePagination.current_page === 1
			},
			isOnLastPage () {
				return this.tablePagination === null
					? false
					: this.tablePagination.current_page === this.tablePagination.last_page
			},
			notEnoughPages () {
				return this.totalPage < (this.onEachSide * 2) + 4
			},
			windowSize () {
				return this.onEachSide * 2 + 1;
			},
			windowStart () {
				if (!this.tablePagination || this.tablePagination.current_page <= this.onEachSide) {
					return 1
				} else if (this.tablePagination.current_page >= (this.totalPage - this.onEachSide)) {
					return this.totalPage - this.onEachSide * 2
				}

				return this.tablePagination.current_page - this.onEachSide
			},
		},
		methods: {
			loadPage (page) {
				this.$emit('vuetable-pagination:change-page', page)
			},
			isCurrentPage (page) {
				return page === this.tablePagination.current_page
			},
			isHiddenPage (page) {
				return Math.abs(page - this.tablePagination.current_page) > 1;
			},
//			isEllipsis() {
//				return true;
//			},
			setPaginationData (tablePagination) {
				this.tablePagination = tablePagination
			},
		}
	}
</script>
