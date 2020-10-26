<template>

  <section class="src-components-login">
    <div class="container mt-top">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
              <h5 class="card-header">Login</h5>
              <div class="card-body">
                <form novalidate autocomplete="off" @submit.prevent="enviar()">
                  <div class="form-group">
                    <label for="usuario">Usuario</label>
                    <input type="text" id="usuario" class="form-control" v-model="$v.f.usuario.$model">
                  </div>
                  <div v-if="$v.f.usuario.$error && $v.f.usuario.$dirty" class="alert alert-danger">
                    <div v-if="$v.f.usuario.required.$invalid">Este campo es requerido</div>
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" class="form-control" v-model="$v.f.password.$model">
                  </div>
                  <div v-if="$v.f.password.$error && $v.f.password.$dirty" class="alert alert-danger">
                    <div v-if="$v.f.password.required.$invalid">Este campo es requerido</div>
                  </div>

                  <div class="form-group">
                    <input class="btn btn-success btn-md" type="submit"  value="Iniciar Sesion" :disabled="!(!$v.f.$invalid && $v.f.usuario.$dirty && $v.f.password.$dirty)">
                  </div>

                  <div v-if="invalid" class="alert alert-danger">
                    Los datos ingresados son incorrectos
                  </div>

                  
                </form>
              </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>

</template>

<script>
  import { required } from '@vuelidate/validators'
  export default  {
    name: 'src-components-login',
    props: ['onLogin'],
    mounted () {
      this.resetCampos();
    },
    data () {
      return {
        f: this.resetCampos(),
        logged: 0,
        invalid: false
      }
    },
    validations: {
      f: {
        usuario: {
          required
        },
        password: {
          required
        }
      }
    },
    methods: {
      enviar() {
        let datosForm = {
          user: this.$v.f.usuario.$model,
          password: this.$v.f.password.$model
        }
        
        if(datosForm.user == 'root' && datosForm.password == '1234'){
          sessionStorage.setItem('user',JSON.stringify(datosForm));
          this.logged = 1;
          this.$emit('login', this.logged);
        }else{
          this.invalid = true;
        }
        
        this.f = this.resetCampos();
        this.$v.$reset();
        
      },
      resetCampos() {
        return {
          nombre: '',
          password: ''
        }
      }

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .mt-top{
    margin-top: 50px;
  }
  label{
    float: left;
  }
</style>
