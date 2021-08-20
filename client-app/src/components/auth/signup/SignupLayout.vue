<template>
    <div class="auth__bg">
        <div class="signup__center">
            <div>
                <div class="logo auth--logo">
                    <siner-logo :layout="'center'"></siner-logo>
                </div>
                <form class="form form__md form auth--form">
                    <div class="auth--form__wrap">
                        <div class="auth__title-wrap">
                            <h2 class="auth__title">Create account</h2>
                        </div>
                        <div class="form__item">
                            <label for="firstName" class="form__label">Full Name</label>
                            <input type="email" id="firstName" class="form__input form__input--lg" required="required" v-model="fullName">
                        </div>
                        <div class="form__item">
                            <label for="emailaddress" class="form__label">Email Address</label>
                            <input type="email" id="emailaddress" class="form__input form__input--lg" required="required" v-model="email">
                        </div>
                        <div class="form__item">
                            <label for="username" class="form__label">Username</label>
                            <input type="email" id="username" class="form__input form__input--lg" required="required" v-model="username">
                        </div>
                        <div class="form__item">
                            <label for="password" class="form__label">Password</label>
                            <input type="email" id="password" class="form__input form__input--lg" required="required" v-model="password">
                        </div>
                        <div v-if="error && error.value" class="signup-section__form__row" style="margin-top: -15px;margin-bottom: 15px;">
                            <span class="textRed">{{ error.value  }}</span>
                        </div>
                        <div class="checkbox__item auth--checkbox">
                            <input class="checkbox__input" id="termsAndService" type="checkbox" v-model="termsAndService" />
                            <label class="checkbox--label no--padding__all" for="termsAndService">I agree to the <router-link class="auth--form__link" :to="{ name: 'terms-and-service' }">Terms and Service</router-link></label>
                        </div>

                        <!-- signup form row -->
                        <div class="form--btn__wrap auth--btn__submit">
                            <button class="btn btn--bgPrimary btn--md bold btn--block" type="submit" :disabled="isBtnDisabled || btnDisabled">Sign up</button>
                        </div>
                        <div class="signup--notify__wrap">
                            <div>Have an account? <router-link class="auth--form__link" :to="{ name: 'login' }">Login</router-link></div>
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
  name: 'SignupLayout',
  components: {
    'siner-logo': Logo
  },
  data: () => ({
    email: '',
    fullName: '',
    username: '',
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
        if(!this.email || !this.fullName || !this.username || !this.password) {
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
