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
                                <h2 class="auth__title">Reset Password</h2>
                            </div>
                             <!-- content  -->
                            <div class="form__item">
                                <label for="emailaddress" class="form__label">Password</label>
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
                            <div class="form__item">
                                <label for="emailaddress" class="form__label">Confirm Password</label>
                                <div class="flex align-items-center positionRelative">
                                    <input id="password" class="form-control" required="required" v-model="confirmPassword" :type="confirmPasswordType" />
                                    <span class="positionAbsolute me-1 right--5 cursor-pointer" @click="toggleViewConfirmPasswordIcon" style="max-width: 24px; max-height: 24px">
                                        <icon-svg 
                                            fill="rgba(194, 200, 212, 1)" 
                                            :name="showConfirmPassword ? 'show' : 'eye-hide'" 
                                            icon-position="left"
                                            :width="'100%'"
                                            :height="'100%'"
                                        /> 
                                    </span>
                                </div>
                            </div>
                            <div class="form--btn__wrap auth--btn__submit">
                               <primary-button 
                                    :loadingState="loading" 
                                    :type="'submit'" 
                                    :isBtnDisabled="isBtnDisabled" 
                                    :btnSize="'100%'" 
                                    :classValues="'btn btn--primary btn--md bold btn--block'"
                                    @submitFunc="handleSignUp"
                                >
                               {{ loading === 'loading' ? '' : 'Reset password'}}
                                </primary-button>
                            </div>
                        <!-- no account -->
                            <div class="signup--notify__wrap">
                                <div class="text--sm">Have an account? <router-link class="auth--link" :to="{ name: 'login' }">Login</router-link></div>
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
import IconSvg from '../../shared/icons/Icon-Svg.vue';
import PrimaryButtton from '../../shared/buttons/PrimaryButton.vue';

export default {
  name: 'ResetLayout',
  components: {
    'siner-logo': Logo,
    IconSvg,
    'primary-button': PrimaryButtton
  },
  data: () => ({
    password:  '',
    confirmPassword:  '',
    error: {
        show: false,
        value: ''
    },
    loading: 'default',
    showPassword: false,
    showConfirmPassword: false,
  }),
  computed: {
    isBtnDisabled() {
        if(!this.password || !this.confirmPassword) {
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
    confirmPasswordType() {
        if(this.showConfirmPassword) {
            return 'text'
        } else {
            return 'password'
        }
    }
  },
  methods: {
    toggleViewPasswordIcon() {
       this.showPassword = !this.showPassword
    },
    toggleViewConfirmPasswordIcon() {
       this.showConfirmPassword = !this.showConfirmPassword
    },
      handleReset() {
        const payload = { email }
    }
  },
  mounted() {
      this.email = this.$route.query.email;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../../../assets/scss/pages/auth.scss'
</style>
