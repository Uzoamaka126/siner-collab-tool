<template>
    <div class="auth__bg">
        <div class="login__center">
            <div>
                <div class="logo auth--logo">
                    <siner-logo :layout="'center'"></siner-logo>
                </div>
                <form class="form form__md form auth--form">
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
      fullName: '',
      username: '',
      password: ''
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../../../assets/scss/auth.scss';

</style>
