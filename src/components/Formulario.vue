<template>

  <section class="src-components-formulario">
    <NavBar />
    <div class="container mt-top">
      
        <div class="col-md-8">
          <div class="card">
              <h5 class="card-header">Carga de tareas</h5>
              <div class="card-body">
                <form novalidate autocomplete="off" @submit.prevent="enviar()">
                  <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" class="form-control" v-model="$v.f.nombre.$model">
                  </div>
                  <div v-if="$v.f.nombre.$error && $v.f.nombre.$dirty" class="alert alert-danger">
                    <!--
                    <div>
                      {{$v.f.nombre}}
                    </div>
                    -->
                    <div v-if="$v.f.nombre.required.$invalid">Este campo es requerido</div>
                    <div v-else-if="$v.f.nombre.minLength.$invalid">Este campo debe tener 5 caracteres como minimo</div>
                    <div v-else-if="$v.f.nombre.maxLength.$invalid">Este campo debe tener 15 caracteres como maximo</div>
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" id="email" class="form-control" v-model="$v.f.email.$model">
                  </div>
                  <div v-if="$v.f.email.$error && $v.f.email.$dirty" class="alert alert-danger">
                    <div v-if="$v.f.email.required.$invalid">Este campo es requerido</div>
                    <div v-else-if="$v.f.email.email.$invalid">El formato de este campo es invalido</div>
                  </div>

                  
                  <div class="form-group">
                    <label for="descripcion">Descripcion</label>
                    <textarea type="text" id="descripcion" class="form-control" v-model="$v.f.descripcion.$model"></textarea>
                  </div>

                  <div v-if="$v.f.descripcion.$error && $v.f.descripcion.$dirty" class="alert alert-danger"> 

                    <div v-if="$v.f.descripcion.required.$invalid">Este campo es requerido</div>
                    <div v-else-if="$v.f.descripcion.minLength.$invalid">Este campo debe tener {{$v.f.descripcion.minLength.$params.min}} caracteres como minimo</div>
                    <div v-else-if="$v.f.descripcion.maxLength.$invalid">Este campo debe tener {{$v.f.descripcion.maxLength.$params.max}} caracteres como maximo</div>
                  </div>

                  <div class="form-group">
                    <input class="btn btn-success btn-md" type="submit" value="Enviar" :disabled="!(!$v.f.$invalid && $v.f.email.$dirty && $v.f.descripcion.$dirty && $v.f.nombre.$dirty)">
                  </div>

                  
                </form>
              </div>
          </div>
        </div>
      
    </div>
  </section>

</template>

<script>
  import { email, required, maxLength, minLength } from '@vuelidate/validators'
  import NavBar from './NavBar.vue'
  export default  {
    name: 'src-components-formulario',
    props: [],
    components: {
      NavBar
    },
    mounted () {
      const session = sessionStorage.getItem('user');
        if(!session){
          this.$router.push('/');
        }
    },
    data () {
      return {
        f: this.resetCampos(),
        url: 'https://5f9509db2de5f50016ca1c9d.mockapi.io/api/v1/tareas',
      }
    },
    validations: {
      f: {
        nombre: {
          required
        },
        descripcion: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(50)
        },
        email: {
          required,
          email
        }
      }
    },
    methods: {
      async sendDatosForm(datos) {
        try {
          await this.axios.post(this.url, datos, {
            'content-type': 'application/json'
          })
          this.$router.push('/');
        } catch (error) {
          console.error(error)
        }
      },
      enviar() {
        let datosForm = {
          name: this.$v.f.nombre.$model,
          description: this.$v.f.descripcion.$model,
          email: this.$v.f.email.$model
        }
        
        this.sendDatosForm(datosForm);
        this.f = this.resetCampos();
        this.$v.$reset();
        
      },
      resetCampos() {
        return {
          nombre: '',
          edad: '',
          email: ''
        }
      }

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-formulario {

  }
  .mt-top{
    margin-top: 50px;
  }
  label{
    float: left;
  }
</style>
