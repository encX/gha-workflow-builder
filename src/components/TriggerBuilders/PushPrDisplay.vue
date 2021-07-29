<template>
  <Rows v-if="config">
    <BranchDisplay
      :target-text="`${Type} to branch`"
      :list="config.branches"
      v-if="config.branches"
    />
    <BranchDisplay
      display-type="is-danger"
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
      display-type="is-danger"
      :target-text="`${Type} to all tags except`"
      :list="config['tags-ignore']"
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
import Rows from "@/components/DisplayAid/Rows.vue";

@Component({
  components: { BranchDisplay, Rows },
})
export default class PushPrDisplay extends Vue {
  @Prop({ required: true }) private readonly type!: "pull_request" | "push";
  @Prop({ required: true }) private readonly config!: PushPrConfig;

  get Type(): string {
    return getTriggerTitle(this.type);
  }
}
</script>
