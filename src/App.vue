<template>
  <div id="app" class="container">
    <TriggerBuilder />
    <JobBuilder />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TriggerBuilder from "./components/TriggerBuilder/TriggerBuilder.vue";
import JobsBuilder from "@/components/JobsBuilder/JobsBuilder.vue";

@Component({
  components: { TriggerBuilder, JobBuilder: JobsBuilder },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  margin-top: 16px;
}
</style>
