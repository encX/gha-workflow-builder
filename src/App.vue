<template>
  <div id="app" class="container">
    <TriggerBuilder />
    <JobsBuilder />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TriggerBuilder from "./components/TriggerBuilder.vue";
import JobsBuilder from "@/components/JobsBuilder.vue";
import Footer from "@/components/Footer.vue";
import "@mdi/font/css/materialdesignicons.css";

@Component({
  components: { TriggerBuilder, JobsBuilder, Footer },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  margin-top: 16px;
}
</style>
