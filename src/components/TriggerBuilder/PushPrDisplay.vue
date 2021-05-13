<template>
  <ul v-if="config">
    <li>
      {{ Type }}
      <BranchDisplay
        target-text="To these branches"
        :list="config.branches"
        v-if="config.branches"
      />
      <BranchDisplay
        target-text="To all branches except"
        :list="config['branches-ignore']"
        v-if="config['branches-ignore']"
      />
      <BranchDisplay
        target-text="To these tags"
        :list="config.tags"
        v-if="config.tags"
      />
      <BranchDisplay
        target-text="To all tag except"
        :list="config['tags-ignore']"
        v-if="config['tags-ignore']"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import BranchDisplay from "@/components/TriggerBuilder/BranchDisplay.vue";
import { getTriggerTitle } from "@/helpers/TriggerTypeMapper";
import { PushPrConfig } from "@/types/Trigger/pushPrConfig";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

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
