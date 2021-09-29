<template>
  <div style="height: 100%">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
   watch: {
      $route(to, from) {
          let path = to.path;
          path = path.split('/')[1];

          // Prevent external pages(non dashboard pages) from getting logged
          // if(path == 'dashboard') this.logLastViewed(to.name);
          if(path == 'dashboard') {
              if(to.params.id) this.logLastViewed(`${to.name}/${to.params.id}`);
              else this.logLastViewed(to.name);
          }
      },
    },
    methods: {
      logLastViewed(lastPage) {
        if (lastPage == null) return;

        let requestObject = {
            lv: lastPage,
        };

        // Make sure confirm account component isn't logged as there's no context here so it throws
        // app to 401 which clears the app and redirects to login
        // if (lastPage !== "confirm-account") {
        //   this.$http
        //       .post("v2/lastvp/log", requestObject, { headers: { altmodeauth: "1" } })
        //       .then((res) => {
        //           console.log(res.body.data.logged);
        //       })
        //       .catch((error) => {
        //           console.log(error);
        //       });
        //   }
        },
    }
}
</script>

<style lang="scss">
  @import './assets/scss/main.scss';
  @import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
  @import "../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css";
  @import  "~vue-tabulator/dist/scss/bootstrap/tabulator_bootstrap4";
</style>
