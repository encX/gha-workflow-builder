<template>
  <div v-if="config">
    <h4 class="title">Schedule</h4>
    <ul>
      <li v-for="({ cron }, index) in config" :key="index">cron: {{ cron }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { CronConfig } from "@/types/Trigger/cronConfig";

@Component
export default class ScheduleDisplay extends Vue {
  @Prop({ required: true }) private readonly config!: CronConfig[];
}
</script>

<style scoped></style>
