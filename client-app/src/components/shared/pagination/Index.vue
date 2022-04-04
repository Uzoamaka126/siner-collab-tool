<template>
    <div class="flex align-items-center">
        <span>Total number of {{ type }}: {{ paginationData.total }}</span>
        <nav aria-label="Page navigation example" class="mt--30">
            <ul class="pagination">
                <li class="page-item" :class="{ 'disabled':isFirstPage() }" @click="setUrlParams(paginationData.currentPage - 1, null)">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { assembleQueryList } from '../../../utils/others'
export default {
    name: "Pagination",
    data() {
        return {

        }
    },
    props: ['paginationData', 'type'],
    computed: {
        paginationDataComputed() {
            return {
                currentPage: typeof this.paginationData
            }
        }
    },
    methods: {
        isFirstPage(){
            return this.paginationData.currentPage === 1
        },
        isLastPage(){
            return this.paginationData.currentPage === this.paginationData.totalPages
        },
        getPaginationCount(number){
            let pageNumbers = this.paginationStart + number;
            if(pageNumbers > this.paginationData.totalPages){
                return false;
            }
            return pageNumbers;
        },
        formatCount: function (x) {
            return (x) ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
        },
        serialize(obj) {
            let str = [];
            for (let p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        },
        setPageOnUrlParams(page, per_page){
            let pageObject = {
                paginationNumber: page == null ? this.paginationData.currentPage : page,
                pageLimit: per_page == null ? this.paginationData.perPage : per_page,
                view: typeof this.paginationProp.view !== 'undefined' ? this.paginationProp.view : null,
                partial: typeof this.paginationProp.partial !== 'undefined' ? this.paginationProp.partial : null
            };

            let currentRoute = this.$route.path;

            let queryParam = this.serialize(assembleQueryList(this.$route, pageObject));
            this.$router.replace(`${currentRoute}?${queryParam}`)
        },
    }
}
</script>