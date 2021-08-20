<template>
    <div class="auth__bg">
        <div class="login__center">
            <div>
                <div class="logo auth--logo">
                    <siner-logo :layout="'center'"></siner-logo>
                </div>
                <form class="form form__md form auth--form">
                    <div class="auth--form__wrap">
                        <div class="auth__title-wrap">
                            <h2 class="auth__title">Login</h2>
                        </div>
                        <div class="form__item">
                            <label for="emailaddress" class="form__label">Email Address</label>
                            <input type="email" id="emailaddress" class="form__input form__input--lg" required="required" v-model="email">
                        </div>
                        <div class="form__item">
                            <label for="password" class="form__label">Password</label>
                            <input type="email" id="password" class="form__input form__input--lg" required="required" v-model="password">
                        </div>
                        <div v-if="error && error.value" class="login-section__form__row" style="margin-top: -15px;margin-bottom: 15px;">
                            <span class="textRed">{{ error.value  }}</span>
                        </div>
                        <div class="checkbox__item auth--checkbox">
                            <input class="checkbox__input" id="termsAndService" type="checkbox" v-model="termsAndService" />
                            <label class="checkbox--label no--padding__all" for="termsAndService">Remember me</label>
                        </div>
                        <!-- Login form row -->
                        <div class="form--btn__wrap auth--btn__submit">
                            <button class="btn btn--bgPrimary btn--md bold btn--block" type="submit" :disabled="isBtnDisabled || btnDisabled">Login</button>
                        </div>
                        <div class="signup--notify__wrap">
                            <div>Don't have an account? <router-link class="" :to="{ name: 'signup' }">Sign up</router-link></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from '../../shared/Logo.vue';

export default {
  name: 'LoginLayout',
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
    btnDisabled: false
  }),
  computed: {
      isBtnDisabled() {
        if(!this.email || !this.password) {
            return true
        } else {
            return false
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../../../assets/scss/auth.scss';

</style>
