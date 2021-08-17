<template>
    <div class="auth__bg">
        <div class="login__center">
            <form class="form auth--form__md form auth--form__wrap">

            </form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'LoginLayout',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../../../assets/scss/auth.scss';

</style>
