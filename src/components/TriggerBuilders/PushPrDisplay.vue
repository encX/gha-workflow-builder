<template>
  <Rows v-if="config">
    <BranchDisplay
      :target-text="`${Type} to branch`"
      :list="config.branches"
      :on-edit="onEditBranch"
      :on-delete="onDeletePH"
      v-if="config.branches"
    />
    <BranchDisplay
      display-type="is-danger"
      :target-text="`${Type} to all branches except`"
      :list="config['branches-ignore']"
      :on-edit="onEditBranchIgnore"
      :on-delete="onDeletePH"
      v-if="config['branches-ignore']"
    />
    <BranchDisplay
      :target-text="`${Type} to tags`"
      :list="config.tags"
      :on-edit="onEditTag"
      :on-delete="onDeletePH"
      v-if="config.tags"
    />
    <BranchDisplay
      display-type="is-danger"
      :target-text="`${Type} to all tags except`"
      :list="config['tags-ignore']"
      :on-edit="onEditTagIgnore"
      :on-delete="onDeletePH"
      v-if="config['tags-ignore']"
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
import { onEditPushPr, triggerBuilderState } from "@/TriggerBuilderState";

@Component({
  components: { BranchDisplay, PushPrBuilder, Rows },
  computed: {},
})
export default class PushPrDisplay extends Vue {
  @Prop({ required: true }) private readonly type!: "pull_request" | "push";
  @Prop({ required: true }) private readonly config!: PushPrConfig;

  get Type(): string {
    return getTriggerTitle(this.type);
  }

  private onEditBranch = () => onEditPushPr(this.type, "branches");
  private onEditBranchIgnore = () => onEditPushPr(this.type, "branches-ignore");
  private onEditTag = () => onEditPushPr(this.type, "tags");
  private onEditTagIgnore = () => onEditPushPr(this.type, "tags-ignore");

  private onDeletePH = () => {
    alert("555");
  };
}
</script>
