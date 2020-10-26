<template>

  <section class="src-components-inicio">
    <div class="jumbotron">
      <h3>Lista de tareas</h3>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <table class="table table-striped">
          <thead>
            <tr>
              <td>Email</td>
              <td>Nombre</td>
              <td>Descripción</td>
              <td>Fecha</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dato, i) in tareas" :key="i">
              <td>{{dato.email}}</td>
              <td>{{dato.name}}</td>
              <td>{{dato.description}}</td>
              <td>{{formatearFecha(dato.createdAt)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

</template>

<script>
  import filterMixins from '../filterMixins.js'
  export default  {
    name: 'src-components-inicio',
    props: [],
    mixins: [filterMixins],
    mounted () {
      this.getTareas()
    },
    data () {
      return {
        url: 'https://5f9509db2de5f50016ca1c9d.mockapi.io/api/v1/tareas',
        tareas: []
      }
    },
    methods: {
      async getTareas(){
        try {
          const d = await this.axios.get(this.url, {
            'content-type': 'application/json'
          })
          this.tareas = d.data;
        } catch (error) {
          console.error(error)
        }
      }

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-inicio {

  }
</style>
