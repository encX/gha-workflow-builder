<template>
  <section class="jobs section">
    <h1 class="title">Jobs</h1>
    <h2 class="subtitle">These jobs will be executed</h2>

    <JobBuilder v-for="id in jobIds" :key="id" :job-id="id" />

    <div class="block">
      <b-button icon-left="plus" type="is-primary is-light">Create</b-button>
    </div>
  </section>
</template>

<script lang="ts">
import { workflow } from "@/stores";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import JobBuilder from "@/components/JobsBuilders/JobBuilder.vue";

@Component({
  components: { JobBuilder },
})
export default class JobsBuilder extends Vue {
  private jobIds = Object.keys(workflow.jobs ?? []);
}
</script>
