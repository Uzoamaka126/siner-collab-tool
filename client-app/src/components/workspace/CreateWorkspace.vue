<template>
   <div>
        <div>
            <p class="title">Let's create a Workspace for you</p>
            <p class="sub-title">A workspace helps you to organize projects and put them in one place</p>
        </div>
        <form @submit.prevent="" class="form--workspace__create">
            <div class="form__item">
                <label for="workspaceTitle" class="form__label">Give your workspace a name</label>
                <input name="title" id="workspaceTitle" class="form__input" v-model="workspace.title" />
                <p class="form__item--text">This can be the name of your team or company </p>
            </div>
            <div class="form__item">
                    <!-- :reduce="currency => currency.name" -->
                <label for="workspaceTitle" class="form__label">What kind of workspace is this?</label>
                <vue-select 
                    class="vs--button vs--button__md mr--15" 
                    :options="workspaces"
                    label-by="name"  
                    v-model="workspace.type" 
                    :placeholder="'Select a workspace type'" 
                    :clearable=false
                    :close-on-select=true
                >
                </vue-select>
            </div>
            <div class="form__item">
                <label for="workspaceTitle" class="form__label">Describe your workspace <span class="text-faded text-normal">(optional)</span></label>
                <textarea name="" id="resolveComment" cols="30" rows="4" class="form__input" v-model="workspace.description"></textarea>
            </div>
            <div class="form__footer width--100">
                <button class="btn btn--primary btn--lg width--100" type="submit" @click="increaseStep()">Continue</button>
            </div>
        </form>
   </div>
</template>

<script>
import VueNextSelect from 'vue-next-select'
import { workspacesTypes } from '../../utils/dummy';
import 'vue-next-select/dist/index.css'

export default {
    name: 'CreateWorkspace',
    components: {
        'vue-select': VueNextSelect,
    },
    data: () => ({
        workspace: {
            title: '',
            type: '',
            description: ''
        },
        workspaces: workspacesTypes
    }),
    props: ['count', 'increaseStep', 'isNew'],
    methods: {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .form--workspace__create {
        margin-top: 1.5rem;
    }
    label {
        font-weight: 700;
        color: #5E6C84;
        font-size: 14px;
        line-height: 16px;
        margin-top: 12px;
        margin-bottom: 4px;
        display: block;
        margin-bottom: 12px;
    }
    .form__footer {
        margin-top: 2rem;
    }
    .title {
        color: #172B4D;
        font-size: 24px !important;
        font-weight: 600;
        letter-spacing: -0.01em;
        line-height: 28px;
        margin-top: 40px;
    }
    .sub-title {
        color: #172B4D;
        font-weight: normal;
        line-height: 20px;
        margin: 8px 0 16px 0;
    }
    .vue-select {
        width: 100% !important;
        border: 1.5px solid rgba(193, 163, 249, 0.25);
        min-height: 20px;
        background-color: #fafbfc;
    }
</style>
