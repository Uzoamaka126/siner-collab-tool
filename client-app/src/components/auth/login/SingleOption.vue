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
                                <h2 class="auth__title">Login to your account</h2>
                            </div>
                             <!-- content  -->
                            <div class="form__item">
                                <label for="emailaddress" class="form__label">Email Address</label>
                                <input type="email" id="emailaddress" class="form__input form__input--lg" required="required" v-model="email">
                            </div>
                            <div class="form__item mb--10">
                                <label for="password" class="form__label">Password</label>
                                <input type="email" id="password" class="form__input form__input--lg" required="required" v-model="password">
                            </div>
                            <div v-if="error && error.value" class="login-section__form__row" style="margin-top: -15px;margin-bottom: 15px;">
                                <span class="textRed">{{ error.value  }}</span>
                            </div>
                            <div class="checkbox__item">
                                <input class="checkbox__input" id="termsAndService" type="checkbox" v-model="termsAndService" />
                                <label class="checkbox--label no--padding__all" for="termsAndService">Remember me</label>
                            </div>
                            <div class="form--btn__wrap auth--btn__submit">
                                <button class="btn btn--primary btn--md bold btn--block" type="submit" :disabled="isBtnDisabled || btnDisabled">Login</button>
                            </div>
                        <!-- no account -->
                            <div class="signup--notify__wrap">
                                <div class="text--xs">Don't have an account? <router-link class="auth--link" :to="{ name: 'signup' }">Sign up</router-link></div>
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
    password: '',
    error: {
        show: false,
        value: ''
    },
    termsAndService: '',
    btnDisabled: false,
    loginOption: ''
  }),
  computed: {
      isBtnDisabled() {
        if(!this.email || !this.password) {
            return true
        } else {
            return false
        }
      }
  },
  methods: {
    setLoginOption(value) {
        if(value === 'email') {
            this.loginOption = 'email'
        } else if (value === 'google') {
            this.loginOption = 'google'
        } else {
            this.loginOption = ''
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../../../assets/scss/pages/auth.scss'
</style>
