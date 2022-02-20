<template>
    <div class="auth__bg">
        <div class="auth__wrapper">
            <div class="logo auth--logo">
                <siner-logo :layout="'center'"></siner-logo>
            </div>
            <div class="auth__wrap--center">
                <div>
                    <form class="form form__md form auth--form">
                        <div class="auth--form__wrap">
                            <div class="auth__title-wrap">
                                <h2 class="auth__title">Reset your account</h2>
                            </div>
                             <!-- content  -->
                            <div class="form__item">
                                <label for="emailaddress" class="form__label">Email Address</label>
                                <input type="email" id="emailaddress" class="form__input form__input--lg" required="required" v-model="email">
                            </div>
                            <div class="form--btn__wrap auth--btn__submit">
                                <button class="btn btn--primary btn--md bold btn--block" type="submit" :disabled="!email">Reset password</button>
                            </div>
                        <!-- no account -->
                            <div class="signup--notify__wrap">
                                <div class="text--xs">Have an account? <router-link class="auth--link" :to="{ name: 'login' }">Login</router-link></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from '../../shared/Logo.vue';

export default {
  name: 'SingleOptionLayout',
  components: {
    'siner-logo': Logo
  },
  data: () => ({
    email: '',
  }),
  computed: {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../../../assets/scss/pages/auth.scss'
</style>
