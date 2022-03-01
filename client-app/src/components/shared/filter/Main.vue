<template>
    <div class="btn-group">
        <button 
            class="btn text--xs mr--10 filter--btn btn-sm dropdown-toggle" 
            type="button" 
            aria-expanded="false"
            id="dropdownMenuClickableInside" 
            data-bs-toggle="dropdown" 
            data-bs-auto-close="outside" 
        >
            Filter by
        </button>
        <div class="dropdown-menu filter__dropdown-menu">
        <div class="action--btns__wrap">
            <button class="action--btns__clear action--btns">Clear</button>
            <button class="action--btns__run action--btns">Run</button>
        </div>
            <div class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Title
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body">
                            <InputSearch />                
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        Client name
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div class="accordion-body">
                            <InputSearch />                          
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        Accordion Item #3
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                        <div class="accordion-body">
                            <InputSearch />                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputSearch from './InputSearch'
export default {
    name: 'MainFilter',
    created() {
        
    },
    components: {
        InputSearch,
    },
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        value: { type: String, default: '' },
    },
    data () {
       return {
           reactiveValue: this.value || ''
       }
    },
    methods: {
        clearSearch() {
            // clear all custom filter data and close it
            this.reactiveValue = ''
        },

    },
    watch: {
        tagName( newVal ) {
            this.reactiveTagName = newVal;
         },

        reactiveTagName( newVal ) {
            this.$emit( "change", newVal )
        }
    }
}
</script>

<style lang="scss" scoped>
</style>