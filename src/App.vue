<template>
  <div id="app" class="container">
    <TriggerBuilder />
    <JobBuilder />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TriggerBuilder from "./components/TriggerBuilder/TriggerBuilder.vue";
import JobBuilder from "@/components/JobBuilder/JobBuilder.vue";

@Component({
  components: { TriggerBuilder, JobBuilder },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  margin-top: 16px;
}
</style>
