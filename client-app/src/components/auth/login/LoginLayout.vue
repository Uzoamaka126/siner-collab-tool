<template>
    <div class="auth__bg">
        <div class="login__center">
            <div>
                <div class="logo">
                    <siner-logo :layout="center"></siner-logo>
                </div>
                <div>
                    <h2 class="auth__title">Create account</h2>
                </div>
                <form class="form auth--form__md form auth--form__wrap">

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
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../../../assets/scss/auth.scss';

</style>
