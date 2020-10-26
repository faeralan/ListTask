<template>

  <section class="src-components-nav-bar">
    <div v-if="logueado==0" class="">
      <nav  class="navbar navbar-expand-lg navbar-dark bg-dark" >
        <router-link to="/">
        <a class="navbar-brand" href="#">Login</a>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
      <Login @login="updateLogin($event)"/>
    </div>

    <div v-else-if="logueado==1" class="">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
        <router-link to="/">
        <a class="navbar-brand" href="#">Home</a>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <ul class="navbar-nav" >
            
            <li class="nav-item">
              <a class="nav-link" href="#" @click="goForm()">Formulario</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" @click="logout()" href="#">Cerrar sesión</a>
            </li>
            
          </ul>
      </nav>
      <Inicio v-if="route != '/formulario'"/>
    </div>
  </section>

</template>

<script>
  import Login from './Login.vue'
  import Inicio from './Inicio.vue'
  

  export default  {
    name: 'src-components-nav-bar',
    props: [],
    components: {
      Login,
      Inicio
    },
    mounted () {
      this.isLogged();

      this.route = this.$router.currentRoute._value.path;
    },
    
    data () {
      return {
        logueado: 0,
        route: ''
      }
    },
    methods: {
      isLogged(){
        const session = sessionStorage.getItem('user');
        if(session){
          this.logueado = 1;
        }else{
          this.logueado = 0;
        }
      },
      updateLogin(){
        this.logueado = 1;
      },
      goForm(){
        this.$router.push('/formulario');
      },
      logout(){
        sessionStorage.clear();
        this.logueado = 0;
        this.$router.push('/');
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-nav-bar {

  }
</style>
