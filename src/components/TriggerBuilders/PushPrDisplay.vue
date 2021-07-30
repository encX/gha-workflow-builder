<template>
  <Rows v-if="shouldDisplaySection">
    <BranchDisplay
      :list="triggerConfig.branches"
      :target-text="`${Type} to branch`"
      :on-edit="() => onEdit('branches')"
      :on-delete="() => onDelete('branches')"
      :on-save="onSave('branches')"
      :is-editing="isEditBranch"
    />
    <BranchDisplay
      :list="triggerConfig['branches-ignore']"
      display-type="is-danger"
      :target-text="`${Type} to all branches except`"
      :on-edit="() => onEdit('branches-ignore')"
      :on-delete="() => onDelete('branches-ignore')"
      :on-save="onSave('branches-ignore')"
      :is-editing="isEditBranchIgnore"
    />
    <BranchDisplay
      :list="triggerConfig.tags"
      :target-text="`${Type} to tags`"
      :on-edit="() => onEdit('tags')"
      :on-delete="() => onDelete('tags')"
      :on-save="onSave('tags')"
      :is-editing="isEditTag"
    />
    <BranchDisplay
      :list="triggerConfig['tags-ignore']"
      display-type="is-danger"
      :target-text="`${Type} to all tags except`"
      :on-edit="() => onEdit('tags-ignore')"
      :on-delete="() => onDelete('tags-ignore')"
      :on-save="onSave('tags-ignore')"
      :is-editing="isEditTagIgnore"
    />
  </Rows>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { BranchType, PushPrConfig } from "@/types/Trigger/pushPrConfig";

import { getTriggerTitle } from "@/helpers/TriggerTypeMapper";
import BranchDisplay from "@/components/TriggerBuilders/BranchDisplay.vue";
import PushPrBuilder from "@/components/TriggerBuilders/PushPrBuilder.vue";
import Rows from "@/components/DisplayAid/Rows.vue";
import { deletePushPr, setPushPr, workflow } from "@/stores/Workflow";
import {
  onEditPushPr,
  onTriggerBuilderExit,
  triggerBuilderState as state,
} from "@/stores/TriggerBuilderState";

@Component({
  components: { BranchDisplay, PushPrBuilder, Rows },
})
export default class PushPrDisplay extends Vue {
  @Prop({ required: true }) private readonly trigger!: "pull_request" | "push";

  private onEdit(type: BranchType): void {
    onEditPushPr(this.trigger, type);
  }

  private onDelete(type: BranchType): void {
    deletePushPr(this.trigger, type);
  }

  private onSave(type: BranchType) {
    return (list: string[]) => {
      setPushPr(this.trigger, type, list);
      onTriggerBuilderExit();
    };
  }

  private get triggerConfig(): PushPrConfig {
    return workflow.on[this.trigger]!;
  }

  private get shouldDisplaySection(): boolean {
    return this.triggerConfig && Object.keys(this.triggerConfig).length > 0;
  }

  private get Type(): string {
    return getTriggerTitle(this.trigger);
  }

  private get isEditBranch() {
    return (
      state.stage === "edit" &&
      state.currentTriggerBuild === this.trigger &&
      state.currentBranchStage === "branches"
    );
  }

  private get isEditBranchIgnore() {
    return (
      state.stage === "edit" &&
      state.currentTriggerBuild === this.trigger &&
      state.currentBranchStage === "branches-ignore"
    );
  }

  private get isEditTag() {
    return (
      state.stage === "edit" &&
      state.currentTriggerBuild === this.trigger &&
      state.currentBranchStage === "tags"
    );
  }

  private get isEditTagIgnore() {
    return (
      state.stage === "edit" &&
      state.currentTriggerBuild === this.trigger &&
      state.currentBranchStage === "tags-ignore"
    );
  }
}
</script>
