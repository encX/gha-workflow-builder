<template>
  <Rows v-if="shouldDisplaySection" :has-shadow="true">
    <PushPrEditor
      :trigger="trigger"
      type="branches"
      :target-text="`${Type} to branch`"
    />
    <PushPrEditor
      :trigger="trigger"
      type="branches-ignore"
      display-type="is-danger"
      :target-text="`${Type} to all branches except`"
    />
    <PushPrEditor
      :trigger="trigger"
      type="tags"
      :target-text="`${Type} to tags`"
    />
    <PushPrEditor
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

import PushPrEditor from "@/components/TriggerBuilders/PushPrEditor.vue";
import Rows from "@/components/DisplayAid/Rows.vue";
import { getTriggerTitle } from "@/helpers/TriggerTypeMapper";
import { PushPrConfig } from "@/types/Trigger/pushPrConfig";
import { workflow } from "@/stores";

@Component({
  components: { PushPrEditor, Rows },
})
export default class PushPrGroup extends Vue {
  @Prop({ required: true }) private readonly trigger!: "pull_request" | "push";

  private get triggerConfig(): PushPrConfig {
    return workflow.on[this.trigger] ?? {};
  }

  private get shouldDisplaySection(): boolean {
    return this.triggerConfig && Object.keys(this.triggerConfig).length > 0;
  }

  private get Type(): string {
    return getTriggerTitle(this.trigger);
  }
}
</script>
