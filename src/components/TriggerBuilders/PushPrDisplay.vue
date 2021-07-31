<template>
  <Rows v-if="shouldDisplaySection">
    <BranchDisplay
      :trigger="trigger"
      type="branches"
      :target-text="`${Type} to branch`"
    />
    <BranchDisplay
      :trigger="trigger"
      type="branches-ignore"
      display-type="is-danger"
      :target-text="`${Type} to all branches except`"
    />
    <BranchDisplay
      :trigger="trigger"
      type="tags"
      :target-text="`${Type} to tags`"
    />
    <BranchDisplay
      :trigger="trigger"
      type="tags-ignore"
      display-type="is-danger"
      :target-text="`${Type} to all tags except`"
    />
  </Rows>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { PushPrConfig } from "@/types/Trigger/pushPrConfig";

import { getTriggerTitle } from "@/helpers/TriggerTypeMapper";
import BranchDisplay from "@/components/TriggerBuilders/BranchDisplay.vue";
import PushPrBuilder from "@/components/TriggerBuilders/PushPrBuilder.vue";
import Rows from "@/components/DisplayAid/Rows.vue";
import { workflow } from "@/stores/Workflow";

@Component({
  components: { BranchDisplay, PushPrBuilder, Rows },
})
export default class PushPrDisplay extends Vue {
  @Prop({ required: true }) private readonly trigger!: "pull_request" | "push";

  private get triggerConfig(): PushPrConfig {
    return workflow.on[this.trigger]!;
  }

  private get shouldDisplaySection(): boolean {
    return this.triggerConfig && Object.keys(this.triggerConfig).length > 0;
  }

  private get Type(): string {
    return getTriggerTitle(this.trigger);
  }
}
</script>
