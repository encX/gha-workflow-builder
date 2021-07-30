<template>
  <Rows v-if="shouldDisplaySection">
    <BranchDisplay
      :list="config.branches"
      :target-text="`${Type} to branch`"
      :on-edit="() => onEdit('branches')"
      :on-delete="() => onDelete('branches')"
    />
    <BranchDisplay
      :list="config['branches-ignore']"
      display-type="is-danger"
      :target-text="`${Type} to all branches except`"
      :on-edit="() => onEdit('branches-ignore')"
      :on-delete="() => onDelete('branches-ignore')"
    />
    <BranchDisplay
      :list="config.tags"
      :target-text="`${Type} to tags`"
      :on-edit="() => onEdit('tags')"
      :on-delete="() => onDelete('tags')"
    />
    <BranchDisplay
      :list="config['tags-ignore']"
      display-type="is-danger"
      :target-text="`${Type} to all tags except`"
      :on-edit="() => onEdit('tags-ignore')"
      :on-delete="() => onDelete('tags-ignore')"
    />
  </Rows>
</template>

<script lang="ts">
import { deletePushPr, workflow } from "@/store";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { BranchType, PushPrConfig } from "@/types/Trigger/pushPrConfig";

import { getTriggerTitle } from "@/helpers/TriggerTypeMapper";
import BranchDisplay from "@/components/TriggerBuilders/BranchDisplay.vue";
import PushPrBuilder from "@/components/TriggerBuilders/PushPrBuilder.vue";
import Rows from "@/components/DisplayAid/Rows.vue";
import { onEditPushPr } from "@/TriggerBuilderState";

@Component({
  components: { BranchDisplay, PushPrBuilder, Rows },
})
export default class PushPrDisplay extends Vue {
  @Prop({ required: true }) private readonly trigger!: "pull_request" | "push";

  private get config(): PushPrConfig {
    return workflow.on[this.trigger]!;
  }

  private get shouldDisplaySection(): boolean {
    return this.config && Object.keys(this.config).length > 0;
  }

  get Type(): string {
    return getTriggerTitle(this.trigger);
  }

  private onEdit = (type: BranchType) => onEditPushPr(this.trigger, type);
  private onDelete = (type: BranchType) => deletePushPr(this.trigger, type);
}
</script>
