<template>
  <ul v-if="config">
    <li v-for="({ cron }, index) in config" :key="index">
      Schedule: <b>{{ cron }}</b>
    </li>
  </ul>
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
