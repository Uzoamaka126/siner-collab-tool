<template>
    <div>
      <v-calendar :attributes="attributes" is-expanded>
        <template #day-popover="{dayTitle, attributes }">
            <div class="text-xs text-gray-300 font-semibold text-center">
                {{ dayTitle }}
            </div>
            <popover-row
                v-for="attr in attributes"
                :key="attr.key"
                :attribute="attr"
            >
                {{ attr.customData.description }}
            </popover-row>
        </template>
    </v-calendar>
    </div>
</template>

<script>
import IconSvg from '../../icons/Icon-Svg.vue';
// import { mapState } from 'vuex';

export default {
    name: 'ProjectCalendar',
    data (){
        const todos = [
            {
                description: 'Take Noah to basketball practice.',
                isComplete: false,
                dates: { weekdays: 6 }, // Every Friday
                color: 'red',
            },
            {
                description: 'Start project X.',
                isComplete: false,
                dates: [ new Date(2021, 11, 12) ], // Jan 12th// Every Friday
                color: 'red',
            },
        ];
         return {
            incId: todos.length,
            todos,
        };
    },
    components: {
        IconSvg,
    },
    computed: {
        attributes() {
            return [
                // Attributes for todos
                ...this.todos.map(todo => ({
                dates: todo.dates,
                dot: {
                    color: todo.color,
                    class: todo.isComplete ? 'opacity-75' : '',
                },
                // We need to at least pass a truthy value for the popover to appear
                // Pass an object to customize popover settings like visibility, placement, etc.
                popover: {
                    visibility: 'click',
                     label: todo.description,
                },
                customData: todo,
                })),
            ];
            },
    },
    methods: {
        
    }
}
</script>

<style lang="scss">
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
