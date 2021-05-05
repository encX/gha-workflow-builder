<template>
  <div id="app" class="container">
    <Trigger />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Trigger from "./components/Trigger.vue";

@Component({
  components: {
    Trigger,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
