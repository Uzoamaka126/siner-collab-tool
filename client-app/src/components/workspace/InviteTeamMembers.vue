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
                <label for="workspaceTitle" class="form__label">Describe your workspace <span class="text-faded text-normal">(optional)</span></label>
                <textarea name="" id="resolveComment" cols="30" rows="4" class="form__input" v-model="description"></textarea>
            </div>
            <div class="form__footer width--100">
                <button class="btn btn--primary btn--lg width--100" type="submit" @click="increaseStep()">Send an Invite</button>
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
    data: () => ({
        title: '',
        type: '',
        description: ''
    }),
    props: ['count', 'decreaseStep'],
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
    .skip {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.8rem;
        cursor: pointer;
    }
</style>
