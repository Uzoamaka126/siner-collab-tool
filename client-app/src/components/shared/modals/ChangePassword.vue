<template>
    <div>
        <main-modal 
            :showModal="showModal" 
            :isCloseButton=true 
            :modalSize="'modal__dialog--lg'"
            :width="'620px'"
            :position="'center'"
            :title="'Change Password'"
            :closeFn="togglePasswordChange"
        >
            <div class="modal__wrapper--onboarding">
                <div class="modal--section">
                    <div class="">
                        <form @submit.prevent="" class="form--workspace__create">
                            <div class="form__item">
                                <label for="workspaceTitle" class="form__label">Old Password</label>
                                <input name="title" id="workspaceTitle" class="form__input" v-model="user.old_password" />
                            </div>
                            <div class="form__item">
                                <label for="workspaceTitle" class="form__label">New Password</label>
                                <input name="title" id="workspaceTitle" class="form__input" v-model="user.new_password" />
                            </div>
                            <div class="form__item">
                                <label for="workspaceTitle" class="form__label">Confirm New Password</label>
                                <input name="title" id="workspaceTitle" class="form__input" v-model="user.confirm_new_password" />
                            </div>
                            <div class="form__footer width--100">
                                <button class="btn btn--primary btn--md form__footer--btnFirst" :disabled="isBtnDisabled" type="submit">Save</button>
                                <button class="btn btn--secondary btn--md" type="submit" @click="togglePasswordChange(false)">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main-modal>
    </div>
</template>

<script>
import MainModal from './MainModal.vue';
export default {
    name: 'ChangePasswordModal',
    components: {
        'main-modal': MainModal,
    },
    props: ["showModal", "togglePasswordChange"],
    data: () => ({
       user: {
           old_password: '',
           new_password: '',
           confirm_new_password: ''
       },
    }),
    computed: {
        isBtnDisabled() {
            if(!this.user.old_password || !this.user.new_password || !this.user.confirm_new_password) {
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
        // height: 730px;
        // max-height: 730px;

        &--onboarding {
            padding-left: 32px;
            padding-right: 32px;
        }
    }
    .modal--section__left, .modal--section__right {
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

    input {
        padding-top: 15px;
        padding-bottom: 15px;
    }
</style>
