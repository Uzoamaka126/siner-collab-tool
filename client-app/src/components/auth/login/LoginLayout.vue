<template>
  <div style="height: 100%;">
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
                      <h2 class="auth__title">Login into your account</h2>
                </div>
                  
                <a class="login-option login-option-google">
                  <svg class="mr--10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    <path fill="none" d="M0 0h48v48H0z"/>
                  </svg>
                    <span>Continue with Google</span>
                </a>
                  <!--  OR -->
                <div class="or-1thbq71">
                  <div class="or-rj288j"></div>
                  <span>OR</span>
                  <div class="or-1y5oso0"></div>
                </div>                            
                <div class="form__item">
                  <label for="emailaddress" class="form__label">Email Address</label>
                  <input type="email" id="emailaddress" class="form-control" required="required" v-model="email">
                </div>
                <div class="form__item" style="margin-bottom: 1px">
                  <label for="password" class="form__label">Password</label>
                  <div class="flex align-items-center positionRelative">
                      <input id="password" class="form-control" required="required" v-model="password" :type="passwordType" />
                      <span class="positionAbsolute me-1 right--5 cursor-pointer" @click="toggleViewPasswordIcon" style="max-width: 24px; max-height: 24px">
                          <icon-svg 
                              fill="rgba(194, 200, 212, 1)" 
                              :name="showPassword ? 'show' : 'eye-hide'" 
                              icon-position="left"
                              :width="'100%'"
                              :height="'100%'"
                          /> 
                      </span>
                  </div>
                </div>
                <div class="mt--5">
                  <router-link class="text--color-normal text--xs" :to="{ name: 'intiate-reset' }">Forgot password?</router-link>
                </div>
                <div v-if="error && error.value" class="login-section__form__row" style="margin-top: -15px;margin-bottom: 15px;">
                    <span class="textRed">{{ error.value  }}</span>
                </div>
                <div class="form--btn__wrap auth--btn__submit">
                  <primary-button 
                      :loadingState="loading" 
                      :type="'submit'" 
                      :isBtnDisabled="isBtnDisabled" 
                      :btnSize="'100%'" 
                      :classValues="'btn btn--primary btn--md bold btn--block'"
                      @submitFunc="handleLogin"
                  >
                  {{ loading === 'loading' ? '' : ' Login'}}
                  </primary-button>
                </div>
                <!-- no account -->
                <div class="signup--notify__wrap">
                    <div class="text--xs">Don't have an account? <router-link class="auth--link text--xs" :to="{ name: 'signup' }">Sign up</router-link></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SinerLogo from '../../shared/Logo.vue';
import IconSvg from '../../shared/icons/Icon-Svg.vue';
import PrimaryButtton from '../../shared/buttons/PrimaryButton.vue';

export default {
  name: 'LoginLayout',
  components: {
    SinerLogo,
    IconSvg,
    'primary-button': PrimaryButtton
  },
  data() {
    return {
        email: '',
        password: '',
        error: {
            show: false,
            value: ''
        },
        showPassword: false,
        loading: 'default'
    }
  },
  computed: {
    isBtnDisabled() {
        if(!this.email || !this.password) {
            return true
        } else if (this.loading === 'loading') {
            return true
        } else {
            return false
        }
    },
    passwordType() {
        if(this.showPassword) {
            return 'text'
        } else {
            return 'password'
        }
    },
    storedEmail() {
        return window.localStorage.getItem('userEmail');
    }
  },
  methods: {
    toggleViewPasswordIcon() {
       this.showPassword = !this.showPassword
    },
    handleLogin() {
        this.loading = 'loading'
        const payload = { email: this.email, password: this.password };

        if (this.storedEmail !== this.email) {
            window.localStorage.clear()
        }

        window.localStorage.setItem('token', 'eeeeeeeee')
        window.localStorage.setItem('userEmail', payload.email)

        setTimeout(() => {
            this.loading = 'success';
            this.$router.push({ name: "home-view" })
        }, 3000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../../../assets/scss/pages/auth.scss'
</style>
