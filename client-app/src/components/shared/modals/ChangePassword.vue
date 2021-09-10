<template>
    <div 
        class="modal fade " 
        style="width: 620px; margin-left: auto; margin-right: auto;"
        tabindex="-1" 
        role="dialog" 
        aria-labelledby="changePassword"
    >
        <div class="modal__dialog">
            <div class="modal__dialog--lg" role="document">
                <div class="modal__dialog--header">
                     <h2>Change Password</h2>
                <!-- close button -->
                    <button type="button" class="close" style="top: 50px; margin-top: unset;" v-if="isCloseButton">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(232, 230, 243, 1);transform: ;msFilter:;">
                            <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                        </svg>
                    </button>
                </div>
                <!-- Modal content -->
                <div class="modal__content">
                    <!-- Modal Body -->
                    <div class="modal__body modal__body--pad">
                        <div class="modal__wrapper--onboarding">
                            <div class="modal--section">
                                <div class="">
                                    <form @submit.prevent="" class="form--workspace__create">
                                        <div class="form__item">
                                            <label for="workspaceTitle" class="form__label">Give your board a name</label>
                                            <input name="title" id="workspaceTitle" class="form__input" v-model="board.title" />
                                        </div>
                                        <div class="form__item">
                                            <label for="workspaceTitle" class="form__label">Give your board a name</label>
                                            <input name="title" id="workspaceTitle" class="form__input" v-model="board.title" />
                                        </div>
                                        <div class="form__item">
                                            <label for="workspaceTitle" class="form__label">Give your board a name</label>
                                            <input name="title" id="workspaceTitle" class="form__input" v-model="board.title" />
                                        </div>
                                        <div class="form__footer width--100">
                                            <button class="btn btn--primary btn--md form__footer--btnFirst" :disabled="isBtnDisabled" type="submit">Create</button>
                                            <button class="btn btn--secondary btn--md" type="submit" @click="toggleCreateBoardModal('hide')">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div>
</template>

<script>
import { createdWorkspaces } from '../../../utils/dummy'
export default {
    name: 'CreateBoardModal',
    components: {
        
    },
    props: [],
    data: () => ({
       board: {
           title: '',
           workspace: ''
       },
    }),
    computed: {
        isBtnDisabled() {
            if(!this.board.title || !this.board.workspace) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .modal__wrapper {
        display: flex;
        flex-direction: row;
        min-height: 500px;
        outline: 0;
        overflow: scroll;
    }
    .modal--section__left {
        width: 50%;
    }
    .modal--section__left {
        padding: 0 24px;
        margin: 64px auto 16px;
    }
    .left--wrapper {
        width: 400px;
        margin-bottom: 16px;
        margin-bottom: 5rem;
        // margin-top: 2rem;
        margin-left: auto;
        margin-right: auto;

        p {
            font-size: 14px;
        }
    }
</style>
