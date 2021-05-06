<template>
  <div class="jobs">
    <h1 class="title">Jobs</h1>
    <h2 class="subtitle">These jobs will be executed</h2>

    <div class="buttons">
      <b-button class="is-primary">Add</b-button>
    </div>

    <JobBuilder />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import JobBuilder from "@/components/JobsBuilder/JobBuilder.vue";

@Component({
  components: { JobBuilder },
})
export default class JobsBuilder extends Vue {}
</script>

<style lang="scss" scoped></style>
