<template>
  <Rows v-if="config">
    <div v-for="({ cron }, index) in config" :key="index">
      Schedule:
      <span class="has-text-weight-bold is-family-monospace">{{ cron }}</span>
    </div>
  </Rows>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { CronConfig } from "@/types/Trigger/cronConfig";
import Rows from "@/components/DisplayAid/Rows.vue";

@Component({
  components: { Rows },
})
export default class ScheduleDisplay extends Vue {
  @Prop({ required: true }) private readonly config!: CronConfig[];
}
</script>
