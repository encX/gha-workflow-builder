<template>
  <Rows v-if="manual">
    <div class="row">
      Manual trigger
      <span class="ml-1 is-family-monospace">(workflow_dispatch)</span>
    </div>
  </Rows>
</template>

<script lang="ts">
import { workflow } from "@/stores";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Rows from "@/components/DisplayAid/Rows.vue";

// noinspection JSMethodCanBeStatic
@Component({
  components: { Rows },
})
export default class ManualGroup extends Vue {
  private get manual() {
    return workflow.on?.workflow_dispatch;
  }
}
</script>
