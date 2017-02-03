<template>
	<div class="container">
		<nav class="level">
			<!--Left Side-->
			<div class="level-left">
				<div class="level-item">
					<p class=" level-item control has-icon has-addons">
						<input v-model="searchFor" @keyup.enter="setFilter" class="input is-success" type="text">
						<span class="icon is-small">
							<i class="fa fa-search"></i>
						</span>
						<a @click="setFilter" class="button is-success">
							Search
						</a>
						<a @click="resetFilter" class="button is-danger">
							Reset
						</a>
					</p>
				</div>
			</div>

			<div class="level-right">
				<p class="control">
					<a class="button is-primary" id="settingsBtn" @click="showSettingsModal">
						<span class="icon is-small">
						<i class="fa fa-gear"></i>
						</span>
						<span>Settings</span>
					</a>
				</p>
			</div>
		</nav>

		<div class="">
			<div id="content" class="ui basic segment">
				<div :class="[{'vuetable-wrapper': true}, loading]">
					<vuetable ref="vuetable"
					          api-url="http://vuetable.ratiw.net/api/users"
					          :fields="fields"
					          pagination-path="pagination"
					          :sort-order="sortOrder"
					          :multi-sort="multiSort"
					          :per-page="perPage"
					          :append-params="moreParams"
					          detail-row-component="my-detail-row"
					          detail-row-id="id"
					          detail-row-transition="expand"
					          row-class-callback="rowClassCB"
					          @vuetable:pagination-data="onPaginationData"
					          @vuetable:load-success="onLoadSuccess"
					          @vuetable:loading="showLoader"
					          @vuetable:loaded="hideLoader"
					          @vuetable:cell-clicked="onCellClicked"
					></vuetable>
					<div class="vuetable-pagination level">
						<vuetable-pagination-info ref="paginationInfo"
						                          :pagination-info-template="paginationInfoTemplate"
						></vuetable-pagination-info>
						<component :is="paginationComponent" ref="pagination"
						           @vuetable-pagination:change-page="onChangePage"
						></component>
					</div>
				</div><!-- vuetable-wrapper -->

			</div><!-- content -->

			<div class="modal"
			     :class="{'is-active':showSetting}"
			     id="settingsModal">
				<div class="modal-background"></div>
				<div class="modal-card">
					<header class="modal-card-head">
						<p class="modal-card-title">Settings</p>
						<button class="delete" @click="hideSettingsModal"></button>
					</header>
					<section class="modal-card-body">
						<!-- Content ... -->
						<p class="control">
							<label class="checkbox">
								<input type="checkbox" v-model="multiSort">
								Multisort (use Alt+Click)
							</label>
						</p>

						<hr>

						<div class="columns">
							<div class="column">
								<label class="label">Pagination</label>
								<p class="control">
								<span class="select">
									<select v-model="paginationComponent">
										<option value="vuetable-pagination">vuetable-pagination</option>
										<option value="vuetable-pagination-dropdown">vuetable-pagination-dropdown</option>
									</select>
								</span>
							</div>
							<div class="column">
								</p>
								<label class="label">Per Page:</label>
								<p class="control">
								<span class="select">
									<select v-model="perPage" width="100%">
										<option :value="10">10</option>
										<option :value="15">15</option>
										<option :value="20">20</option>
										<option :value="25">25</option>
									</select>
								</span>
								</p>
							</div>
						</div>

						<p>Visible fields</p>
						<hr>
						<div v-for="field in fields" class="field">
							<p class="control">
								<label class="checkbox">
									<input type="checkbox" v-model="field.visible">
									{{ getFieldTitle(field) }}
								</label>
							</p>
						</div>
					</section>
					<footer class="modal-card-foot">
						<a class="button is-primary" @click="hideSettingsModal">Close</a>
					</footer>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vuetable from '../components/Vuetable.vue'
	import VuetablePagination from '../components/VuetablePagination.vue'
	import VuetablePaginationDropdown from '../components/VuetablePaginationDropdown.vue'
	import VuetablePaginationInfo from '../components/VuetablePaginationInfo.vue'
	let E_SERVER_ERROR = 'Error communicating with the server';

	export default {
		components: {
			Vuetable,
			VuetablePagination,
			VuetablePaginationDropdown,
			VuetablePaginationInfo,
		},
		data: function () {
			return {
				showSetting: false,
				categories: ["门", "窗", "", "", "", "桌", "椅", "橱柜", "地毯", "其他"],
				loading: '',
				searchFor: '',
				moreParams: {},
				fields: [
					{
						name: '__sequence',
						title: 'No.',
						titleClass: 'has-text-left',
						dataClass: 'has-text-left'
					},
					'__checkbox',
					{
						name: 'id',
						title: 'ID',
						sortField: 'id',
						dataClass: 'has-text-centered',
						callback: 'showDetailRow'
					},
					{
						name: 'name',
						title: 'Full Name',
						sortField: 'name'
					},
					{
						name: 'email',
						sortField: 'email',
						visible: true
					},
					{
						name: 'nickname',
						sortField: 'nickname',
						callback: 'allCap'
					},
					{
						name: 'birthdate',
						sortField: 'birthdate',
						callback: 'formatDate|D/MM/Y'
					},
					{
						name: 'gender',
						sortField: 'gender',
						titleClass: 'has-text-centered',
						dataClass: 'has-text-centered',
						callback: 'gender'
					},
					{
						name: '__component:custom-actions',
						dataClass: 'has-text-centered'
					}
				],
				sortOrder: [{
					field: 'name',
					direction: 'asc',
				}],
				multiSort: true,
				paginationComponent: 'vuetable-pagination',
				perPage: 20,
				paginationInfoTemplate: 'Showing record: {from} to {to} from {total} item(s)',
			}
		},
		watch: {
			'perPage' (val, oldVal) {
				this.$nextTick(function () {
					this.$refs.vuetable.refresh()
				})
			},
			'paginationComponent' (val, oldVal) {
				this.$nextTick(function () {
					this.$refs.pagination.setPaginationData(this.$refs.vuetable.tablePagination)
				})
			}
		},
		methods: {
			transform: function (data) {
				let transformed = {}
				transformed.pagination = {
					total: data.total,
					per_page: data.per_page,
					current_page: data.current_page,
					last_page: data.last_page,
					next_page_url: data.next_page_url,
					prev_page_url: data.prev_page_url,
					from: data.from,
					to: data.to
				}


				transformed.data = []
				data = data.data
				for (let i = 0; i < data.length; i++) {
					transformed['data'].push({
						id: data[i].id,
						name: data[i].name,
						nickname: data[i].nickname,
						email: data[i].email,
						age: data[i].age,
						birthdate: data[i].birthdate,
						gender: data[i].gender,
						address: data[i].address.line1 + ' ' + data[i].address.line2 + ' ' + data[i].address.zipcode
					})
				}
				return transformed
			},
			addItem () {
				console.log("add item")
			},
			showSettingsModal () {
				this.showSetting = true
//				$('#settingsModal').addClass('is-active');
			},
			hideSettingsModal () {
				this.showSetting = false
//				$('#settingsModal').removeClass('is-active');
			},
			showLoader: function () {
				this.loading = 'is-loading'
			},
			hideLoader: function () {
				this.loading = ''
			},
			getFieldTitle: function (field) {
				if (field.title !== '') return field.title

				if (field.name.slice(0, 2) === '__') {
					return field.name.indexOf(':') >= 0
						? field.name.split(':')[1]
						: field.name.replace('__', '')
				}
			},
			allCap (value) {
				return value.toUpperCase()
			},
			formatDate (value, fmt) {
				if (value === null) return ''
				fmt = (typeof(fmt) === 'undefined') ? 'YYYY MM DD' : fmt
				return moment(value, 'YYYY-MM-DD').format(fmt)
			},
			gender (value) {
				return value === 'M' ? 'Male' : 'Female';
//					? '<span class="icon"><i class="fa fa-mars"></i></span>Male'
//					: '<span class="icon"><i class="fa fa-venus"></i></span>Female'
			},
			showDetailRow: function (value) {
				let icon = this.$refs.vuetable.isVisibleDetailRow(value) ? 'down' : 'right'
				return [
					'<a class="show-detail-row">',
					'<i class="chevron circle ' + icon + ' icon"></i>',
					'</a>'
				].join('')
			},
			setFilter: function () {
				this.moreParams = {
					'filter': this.searchFor
				}
				this.$nextTick(function () {
					this.$refs.vuetable.refresh()
				})
			},
			resetFilter: function () {
				this.searchFor = ''
				this.setFilter()
			},
			preg_quote: function (str) {
				// http://kevin.vanzonneveld.net
				// +   original by: booeyOH
				// +   improved by: Ates Goral (http://magnetiq.com)
				// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
				// +   bugfixed by: Onno Marsman
				// *     example 1: preg_quote("$40");
				// *     returns 1: '\$40'
				// *     example 2: preg_quote("*RRRING* Hello?");
				// *     returns 2: '\*RRRING\* Hello\?'
				// *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
				// *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'

				return (str + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
			},
			highlight: function (needle, haystack) {
				return haystack.replace(
					new RegExp('(' + this.preg_quote(needle) + ')', 'ig'),
					'<span class="highlight">$1</span>'
				)
			},
			rowClassCB: function (data, index) {
				return (index % 2) === 0 ? 'odd' : 'even'
			},
			onCellClicked (data, field, event) {
				console.log('cellClicked', field.name)
				if (field.name !== '__actions') {
					this.$refs.vuetable.toggleDetailRow(data.id)
				}
			},
			onCellDoubleClicked (data, field, event) {
				console.log('cellDoubleClicked:', field.name)
			},
			onLoadSuccess (response) {
				// set pagination data to pagination-info component
				this.$refs.paginationInfo.setPaginationData(response.data)

				let data = response.data.data
				if (this.searchFor !== '') {
					for (let n in data) {
						data[n].name = this.highlight(this.searchFor, data[n].name)
						data[n].email = this.highlight(this.searchFor, data[n].email)
					}
				}
			},
			onLoadError (response) {
				if (response.status == 400) {
					swal('error', response.data.message, 'error')
				} else {
					swal('Oops', E_SERVER_ERROR, 'error')
				}
			},
			onPaginationData (tablePagination) {
				this.$refs.paginationInfo.setPaginationData(tablePagination)
				this.$refs.pagination.setPaginationData(tablePagination)
			},
			onChangePage (page) {
				this.$refs.vuetable.changePage(page)
			},
		}
	}
</script>

<style type="text/css">
	.ui.vertical.stripe h3 {
		font-size: 2em;
	}

	.secondary.pointing.menu .toc.item {
		display: none;
	}

	.vuetable {
		margin-top: 1em !important;
	}

	.vuetable-wrapper.ui.basic.segment {
		padding: 0em;
	}

	.vuetable button.ui.button {
		padding: .5em .5em;
		font-weight: 400;
	}

	.vuetable button.ui.button i.icon {
		margin: 0;
	}

	.vuetable th.sortable:hover {
		color: #2185d0;
		cursor: pointer;
	}

	.vuetable-actions {
		width: 15%;
		padding: 12px 0px;
		text-align: center;
	}

	.vuetable-pagination {
		background: none;
	}

	.vuetable-pagination-info {
		margin-top: auto;
		margin-bottom: auto;
	}

	[v-cloak] {
		display: none;
	}

	.highlight {
		background-color: yellow;
	}

	.vuetable-detail-row {
		height: 200px;
	}

	.detail-row {
		margin-left: 40px;
	}

	.expand-transition {
		transition: all .5s ease;
	}

	.expand-enter, .expand-leave {
		height: 0;
		opacity: 0;
	}

	#settingsModal .select, #settingsModal select {
		width: 100%;
	}
</style>