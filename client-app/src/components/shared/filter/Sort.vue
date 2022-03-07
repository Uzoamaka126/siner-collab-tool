<template>
    <div>
        <div class="dropdown">
            <button 
                class="btn text--xs mr--10 filter--btn btn-sm dropdown-toggle" 
                type="button" 
                aria-expanded="false"
                id="viewTag"
                data-bs-toggle="dropdown" 
                data-bs-auto-close="outside" 
            >
            {{ displayType ? displayType : 'Sort by' }}
            </button>
            <ul class="dropdown-menu dropdown-menu--tag" aria-labelledby="viewTag">
                <li class="dropdown-item cursor-pointer text--xs" @click=" selectDisplayType('A - Z')">A - Z</li>
                <li class="dropdown-item cursor-pointer text--xs" @click=" selectDisplayType('Z - A')">Z - A</li>
            </ul>
        </div>
    </div>
</template>

<script>
import IconSvg from '../../icons/Icon-Svg.vue';

export default {
    name: 'SortFilter',
    components: {
        IconSvg
    },
    props: {
        user: Object
    },
    data () {
        return {
           displayType: ''
      }
    },
    methods: {
       selectDisplayType(val) {
           this.displayType = val
       }
    }
}
</script>

<style lang="scss" scoped>
    .dropdown-menu--tag {
        min-width: 5rem !important;
        font-size: 14px !important;
    }
    .tags {
        &__view {
            display: flex;
            flex-direction: row;

            &--list {
                flex-direction: column;
            }
        }
        &--display__btns {
            border: 1px solid #eee;
            border-radius: 4px;
            padding: 2px 5px;
        }
        &__dropdown--list {
            justify-content: space-between;
            width: 100%;
        }
    }
</style>