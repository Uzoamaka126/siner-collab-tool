<template>
  <!-- Main Body layout -->
    <div>
        <div class="row__header--item align-items-center justify-content-between hidden-xs" style="display: flex;">
            <div class="row__left">
                <div class="page__result" v-if="totalInvoices === 1">{{ totalInvoices }} Invoice</div>
                <div class="page__result" v-if="totalInvoices > 1">{{ totalInvoices }} Invoices</div>
                <!-- <div class="page__result" v-if="totalInvoices === 0"> No Invoices</div> -->
            </div>

            <!-- others -->
            <div class="row__right">
                <div class="positionRelative mr--10">
                    <button @click="createNewInvoice()" class="btn btn--primary btn--sm align-items-center" style="display: flex">
                        <span class="flex ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: #fff;transform: ;msFilter:;">
                                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                            </svg>
                        </span>
                        <span>New Invoice</span>
                    </button>
                </div>
                <div class="filter__actions--list">
                    <!-- search list -->
                    <form class="bd-search position-relative" style="margin-right: 0.5rem;">
                        <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;">
                            <input 
                                type="search" class="form-control" id="search-input" placeholder="Search invoices..." 
                                aria-label="Search docs for..." autocomplete="off" data-bd-docs-version="5.1" spellcheck="false" 
                                aria-autocomplete="list" aria-expanded="false" aria-owns="algolia-autocomplete-listbox-0" dir="auto" 
                                style="position: relative; vertical-align: top; font-size: 12px; padding-left: 2rem;"
                            >
                                <span role="listbox" id="algolia-autocomplete-listbox-0" style="position: absolute; top: 5px; z-index: 100; left: 5px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #dee2e6;transform: ;msFilter:;">
                                        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                                    </svg>
                                </span>
                        </span>
                    </form>
                    <div class="btn-group">
                        <button class="btn text--xs filter--btn filter--btn__noBorder btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Filter by
                        </button>
                        <ul class="dropdown-menu filter__dropdown-menu">
                            <li><p class="dropdown-item text--xs">Email</p></li>
                            <li><p class="dropdown-item text--xs">Theme</p></li>
                            <li><p class="dropdown-item text--xs">Tags</p></li>
                        </ul>
                    </div>
                </div>
                <!-- <button-icon @click="downloadInvoices" icon="download" :disabled="downloadButtonIsDisabled" class="btn--default btn--sm btn--flex">Download</button-icon> -->
            </div>
        </div>

        <div class="loaderContainer" v-if="loading">
            <div class="loader"></div>
        </div>

        <div v-else>
            <div v-show="totalInvoices">
                <table class="table table-hover root">
                    <thead>
                        <tr>
                            <th class="header">Client email</th>
                            <th class="header">Amount</th>
                            <th class="header">Invoice No.</th>
                            <th class="header">Invoice Type</th>
                            <th class="header">Date</th>
                            <th class="first header">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <router-link v-for="invoice in invoices" :key="invoice.id">
                            <td :class="['table__data--main', 'tag', invoiceTagMap['paid']]">{{ invoice.title }}</td>
                            <td>{{ invoice.client }}</td>
                            <td>{{ invoice.status }}</td>
                            <td>{{ invoice.time }}</td>
                            <td>{{ invoice.teamNum }}</td>
                            <td>{{ invoice.invoices.length }}</td>
                        </router-link>
                    </tbody>
                </table>
            </div>

             <template v-if="!totalInvoices">
                <empty-page 
                    :title="'You have not created any invoices yet.'" 
                    :subtitle="'Your invoices will show up here once you create them.'" 
                    :iconName="'invoice'"
                    :width="'60px'"
                    :height="'60px'"
                />
            </template>

            <!-- <div class="payment__empty" v-else-if="!totalInvoices && isFiltered">
                <icon-svg name="empty" class="payment__empty__icon" />
                <div class="payment__empty__text">There are no invoices to show based on this filter.</div>
            </div> -->
        </div>
        
        <!-- <pagination data="invoices-list" :pageNumber="noOfPages" /> -->
    </div>
</template>

<script>
import EmptyPage from '../../shared/emptyPage/EmptyPage.vue'

export default {
    name: 'ProjectInvoice',
      created() {
    // const queryParams = this.$route.query;
    // this.fetchInvoices( queryParams );
    },

    components: {
        EmptyPage,
    },
    data () {
        return {
            billImage: '../../../',
        loading: false,
        filter: {
            dueDate: {
            //   to: last30Days.to,
            //   from: last30Days.from,
            //   rangeText: getDateRange( last30Days.from, last30Days.to ),
            },
            status: {
            values: [],
            items: { due:"Due", paid:"Paid", issued:"Issued", draft:"Draft" },
            },
        },
        invoices: [],
        /**
         * Returns the appropriate CSS status tag for each invoice status
         */
        invoiceTagMap: {
            draft: "tag--ash",
            due: "tag--red",
            paid: "tag--green",
            issued: "tag--yellow",
        },
        downloadButtonIsClicked: false,
        noOfPages: 1,
        currentPage: 1,
        totalInvoices: 0,
        pageIsEmpty: false,
        noData: false,
        };
  },

  computed: {
    isFiltered() {
      // Check if query object is not empty
      const obj = this.$route.query;
      return !(Object.keys(obj).length === 0 && obj.constructor === Object)
    },

    downloadButtonIsDisabled: {
      get: function () {
        return this.invoices.length === 0 || this.downloadButtonIsClicked
      },

      set: function( val ) {
        if( val ) this.downloadButtonIsClicked = true;
        else this.downloadButtonIsClicked = false;
      }
    },
  },

  methods: {
    downloadInvoices() {
    //   const params = {
    //     from: this.filter.dueDate.from,
    //     to: this.filter.dueDate.to,
    //     status: this.filter.status.values.length ? this.filter.status.values.join(",") : undefined,
    //     download: 1,
    //   }

    //   const url = createQueryString( `v2/invoices`, params )
    //   this.$http.get( url ).then(({ ok, data }) => {
    //     const filename = data.data.file;
    //     if( filename === "N/A" ) return toast.red( "File Not Available: Cannot download invoices." );
    //     toast.green( "Fetching Download..." );
    //     return pollDownload( `v2/downloads/${filename}/status`, this.invoices.length );
    //   })
    //   .catch( e => {
    //     console.log( e );
    //   })
    },

    fetchInvoices( queryParams ) {
      // If there are query parameters on page reload, 
      // update the filter dropdown.
    //   if( queryParams ) {
    //     if( queryParams.from ) this.filter.dueDate.from = queryParams.from;
    //     if( queryParams.to ) this.filter.dueDate.to = queryParams.to;
    //     if( queryParams.from && queryParams.to ) this.filter.dueDate.rangeText = getDateRange( queryParams.from, queryParams.to );
    //     if( queryParams.status ) this.filter.status.values.push( ...queryParams.status.split(",") );
    //   }
      
    //   const url = createQueryString( "v2/invoices", queryParams );
    //   return this.$http.get( url ).then( resp  => {
        
    //     // if ( resp.ok !== true ) return;
    //     this.pageNumber = resp.data.data.page_info.current_page;
    //     this.noOfPages = resp.data.data.page_info.total_pages;
    //     this.totalInvoices = resp.data.data.page_info.total;
        
    //     this.invoices = resp.data.data.invoices.map( invoice => {
    //       invoice.invoice_type = invoice.meta.invoice_interval[ 0 ].interval_value;
    //       return invoice
    //     });
    //     this.loading = false;
    //     return resp;
    //   });
    },

    formatDateTime: function (log) {
    //   return moment(log, 'YYYY-MM-DD HH:mm:ss').format('Do MMMM YYYY');
    },

    filterInvoices() {
    //   const params = {
    //     from: moment( this.filter.dueDate.from ).format( "YYYY-MM-DD" ) + " 00:00:00",
    //     to: moment( this.filter.dueDate.to ).format( "YYYY-MM-DD" ) + " 23:59:59",
    //     status: this.filter.status.values.length ? this.filter.status.values.join(",") : undefined,
    //   }
    //   this.$router.replace({ name: "invoices-list", query: params });
    },

    clearInvoiceFilter() {
      // this.filter.dueDate.to = last30Days.to;
      // this.filter.dueDate.from = last30Days.from;
      // this.filter.dueDate.rangeText = "By Last 30 days";
      // this.filter.status.values = [];
      this.$router.replace({ name: "invoices-list" });
    },

    createNewInvoice() {
      this.$router.push({ name: 'create-invoice-view' });
    }
  },
};
</script>

<style>
.mx-datepicker-popup { 
  left: 0px;
}
</style>
