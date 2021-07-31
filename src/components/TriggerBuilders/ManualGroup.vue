<template>
  <Rows v-if="manual">
    <div class="row">
      <div class="row-main-content">
        Manual trigger
        <span class="ml-1 is-family-monospace">(workflow_dispatch)</span>
      </div>

      <b-button
        class="row-control-btn is-danger"
        icon-left="delete"
        @click="onDelete"
      />
    </div>
  </Rows>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { commit, workflow } from "@/stores";
import Rows from "@/components/DisplayAid/Rows.vue";

// noinspection JSMethodCanBeStatic
@Component({
  components: { Rows },
})
export default class ManualGroup extends Vue {
  private get manual() {
    return workflow.on?.workflow_dispatch;
  }

  private onDelete(): void {
    commit("deleteManual");
  }
}
</script>
