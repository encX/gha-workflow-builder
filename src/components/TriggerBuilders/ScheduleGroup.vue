<template>
  <Rows v-if="triggerConfig.length">
    <ScheduleEditor
      v-for="({ _key }, index) in triggerConfig"
      class="branch-display"
      :key="_key"
      :index="index"
    />
  </Rows>
</template>

<script lang="ts">
import { CronConfig } from "@/types/Trigger/cronConfig";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { workflow } from "@/stores";
import Rows from "@/components/DisplayAid/Rows.vue";
import ScheduleEditor from "@/components/TriggerBuilders/ScheduleEditor.vue";

// noinspection JSMethodCanBeStatic
@Component({
  components: { Rows, ScheduleEditor },
})
export default class ScheduleGroup extends Vue {
  private get triggerConfig(): CronConfig[] {
    return workflow.on.schedule ?? [];
  }
}
</script>
