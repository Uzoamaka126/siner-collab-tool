<template>
    <div>
        <div class="goBack--icon goBack--icon__btn" @click="decreaseStep()">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(89, 109, 222, 1);transform: ;msFilter:;">
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
            </svg>
            <span class="goBack--icon--textSm">Back</span>
        </div>
        <div>
            <p class="title">Invite your team members</p>
            <p class="sub-title">Workspaces help with organizing things into one place</p>
        </div>
        <form @submit.prevent="" class="form--workspace__create">
            <div class="form__item">
                <label for="workspaceTitle" class="form__label">Type in one or more email addresses you want to invite</label>
                <div class="invitees__input--item">
                    <input class="invitees__input" v-model="inviteeEmail" />
                    <span :class="{ disabled: !inviteeEmail }" @click="addInvitee()">
                        <svg :class="{ disabled: !inviteeEmail }" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(38, 166, 154, 1);transform: ;msFilter:;">
                            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                            <path d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z"></path>
                        </svg>
                    </span>
                </div>
                <div class="invitees mt--20" v-if="inviteeEmails.length > 0">
                    <ul class="invitees__list">
                        <li class="invitees__list--item" v-for="email, index in inviteeEmails" :key="index">{{ email }} 
                            <span @click="removeInvitee(email)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(118, 132, 208, 1);transform: ;msFilter:;">
                                    <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                                </svg>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form__footer width--100 mt--40">
                <button class="btn btn--primary btn--lg width--100" type="submit" :disabled="inviteeEmails.length <= 0">Send out Invite</button>
                <div class="skip">
                    <span class="text-faded text-normal">Skip. I'll do this later</span>
                </div>
            </div>
        </form>
   </div>
</template>

<script>
export default {
    name: 'InviteTeamMembers',
    components: {
    },
    data: () => ({
        inviteeEmail: '',
        inviteeEmails: []
    }),
    props: ['count', 'decreaseStep', 'user'],
    methods: {
        addInvitee() {
            if(!this.inviteeEmail) return;
            this.inviteeEmails.push(this.inviteeEmail);
            this.inviteeEmail = ''
        },
        removeInvitee(value) {
            const result = this.inviteeEmails.filter(invitee => invitee !== value);
            this.inviteeEmails = result
        }
    },
    setup() {
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
        margin-top: 3rem;
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
    .skip {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.8rem;
        cursor: pointer;
    }
    .vue-select {
        width: 100% !important;
    }
    .invitees {
        background-color: #fafbfc;
        border-radius: 5px;
        box-shadow: inset 0 0 0 1px #dfe1e6;
        box-sizing: border-box;
        margin: 1.5rem auto;
        // max-width: 512px;
        min-height: 32px;
        padding: 15px 20px;
        position: relative;

        &__list {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            &--item {
                list-style-type: none;
                border: 1px solid #eee;
                color: #7684d0!important;
                background: #fff;
                border: 1px solid #7684d0!important;
                padding: 8px 16px;
                border-radius: 10px;  
                font-weight: 600;  
                margin-right: 0.8rem;
                width: fit-content;
                margin-top: 0.75rem;
                display: flex;
                align-items: center;

                span {
                    cursor: pointer;
                    display: flex;
                }
            }
        }

        &__input {
            &--item {
                position: relative;
                text-decoration: none;
                background: transparent;
                outline: 0;
                border-radius: 4px;
                border: 1px solid #e0e1e4;
                transition: color .24s;
                padding-right: 12px;
                padding-left: 12px;
                padding-top: 10px;
                padding-bottom: 10px;
                display: flex;
                align-items: center;
                flex-direction: row;
                height: 30px;
                justify-content: space-between;

                input {
                    position: relative;
                    text-decoration: none;
                    background: transparent;
                    outline: 0;
                    border-radius: 0 !important;
                    border: none !important;
                    transition: color .24s;
                    padding-right: 0 !important;
                    padding-left: 0 !important;
                    padding-top: 0 !important;
                    padding-bottom: 0 !important;
                    height: 100%;
                    width: 85%;
                }

                span {
                    cursor: pointer;

                    &.disabled {
                        pointer-events: none;
                    }

                    svg.disabled {
                        fill: rgba(198, 210, 209, 1) !important;
                    }
                }
            }
        }
        // focus
        // background-color: #fff;
        // box-shadow: inset 0 0 0 2px #0079bf;
    }
</style>
