<template>
    <div style="height: 100%">
       <form class="form" @submit.prevent>
            <div class="">
                <div class="form__item">
                    <label for="emailaddress" class="form__label">Full Name</label>
                    <input type="email" id="emailaddress" class="form__input form__input--lg">
                </div>
                <div class="form__item">
                    <label for="emailaddress" class="form__label">Username</label>
                    <input type="email" id="emailaddress" class="form__input form__input--lg">
                </div>
                <div class="form__item">
                    <label for="emailaddress" class="form__label">Email Address</label>
                    <input type="email" id="emailaddress" class="form__input form__input--lg">
                </div>
                 <div class="form__item">
                    <label for="emailaddress" class="form__label">Bio</label>
                    <textarea type="email" id="emailaddress" class="form__input form__input--lg"/>
                </div>
                 <div>
                    <button 
                        class="btn btn--ghost" 
                        style="color: #42526e; font-weight: 400" 
                        data-toggle="modal" 
                        data-target="#changePassword" 
                        @click="togglePasswordChange()"
                    >
                    Click here to change password
                </button>
                 </div>
                <div>
                    <button class="btn btn--primary btn--md mt--40" :disabled="isBtnDisabled" type="submit">Update Profile</button>
                </div>
            </div>
       </form>
    </div>
</template>

<script>

export default {
    name: 'SettingsProfile',
    created() {
        // console.log(this.user);
        // console.log('$',typeof $);
        console.log($("#changePassword" ));
        
    },
    components: {
    },
    props: {
        user: Object
    },
    data: () => ({
        isPasswordChangeModal: false
    }),
    computed: {

    },
    methods: {
        togglePasswordChange() {
            // this.isPasswordChangeModal = value;
            $("#changePassword" ).modal( "show" );
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .form {
        max-width: 600px;
        padding: 30px;
        height: auto;
    }
    .password__change {
        border-top: 2px solid #eee;
        margin-top: 1.5rem;
        padding-top: 2rem;
    }

</style>
