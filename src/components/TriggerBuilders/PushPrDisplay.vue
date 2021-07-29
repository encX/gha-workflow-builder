<template>
  <ul v-if="config">
    <BranchDisplay
      :target-text="`${Type} to branch`"
      :list="config.branches"
      v-if="config.branches"
    />
    <BranchDisplay
      :target-text="`${Type} to all branches except`"
      :list="config['branches-ignore']"
      v-if="config['branches-ignore']"
    />
    <BranchDisplay
      :target-text="`${Type} to tags`"
      :list="config.tags"
      v-if="config.tags"
    />
    <BranchDisplay
      :target-text="`${Type} to all tags except`"
      :list="config['tags-ignore']"
      v-if="config['tags-ignore']"
    />
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { PushPrConfig } from "@/types/Trigger/pushPrConfig";
import { getTriggerTitle } from "@/helpers/TriggerTypeMapper";
import BranchDisplay from "@/components/TriggerBuilders/BranchDisplay.vue";

@Component({
  components: { BranchDisplay },
})
export default class PushPrDisplay extends Vue {
  @Prop({ required: true }) private readonly type!: "pull_request" | "push";
  @Prop({ required: true }) private readonly config!: PushPrConfig;

  get Type(): string {
    return getTriggerTitle(this.type);
  }
}
</script>

<style scoped></style>
