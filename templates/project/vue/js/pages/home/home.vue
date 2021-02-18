<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/hello-world/hello-world.vue'

export default @Component({
  components: {
    HelloWorld
  }
})
class Home extends Vue {
}
</script>
