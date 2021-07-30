<template>
  <div class="buttons">
    <b-button
      v-if="canUseBranch"
      @click="setStage('branches')"
      class="is-primary is-light"
    >
      to branch ...
    </b-button>
    <b-button
      v-if="canUseBranch"
      @click="setStage('branches-ignore')"
      class="is-primary is-light"
    >
      to all branch except ...
    </b-button>
    <b-button
      v-if="canUseTag"
      @click="setStage('tags')"
      class="is-primary is-light"
    >
      to tag ...
    </b-button>
    <b-button
      v-if="canUseTag"
      @click="setStage('tags-ignore')"
      class="is-primary is-light"
    >
      to all tag except ...
    </b-button>
    <b-button class="button" @click="onCancel">Cancel</b-button>
  </div>
</template>

<script lang="ts">
import { BranchStage } from "@/types/Trigger/pushPrConfig";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { workflow } from "@/stores/Workflow";
import {
  onTriggerBuilderExit,
  triggerBuilderState as state,
} from "@/stores/TriggerBuilderState";

@Component
export default class PushPrBuilderButtons extends Vue {
  private setStage(data: BranchStage): void {
    state.currentBranchStage = data;
  }

  private onCancel = onTriggerBuilderExit;

  private get type(): "pull_request" | "push" {
    return state.currentTriggerBuild === "pull_request"
      ? "pull_request"
      : "push";
  }

  private get canUseBranch(): boolean {
    return (
      !workflow.on?.[this.type]?.branches?.length &&
      !workflow.on?.[this.type]?.["branches-ignore"]?.length
    );
  }

  private get canUseTag(): boolean {
    return (
      !workflow.on?.[this.type]?.tags?.length &&
      !workflow.on?.[this.type]?.["tags-ignore"]?.length
    );
  }
}
</script>
