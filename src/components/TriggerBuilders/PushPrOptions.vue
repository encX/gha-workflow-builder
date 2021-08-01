<template>
  <div class="push-pr-builder block">
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
      <b-button class="" @click="onCancel">Cancel</b-button>
    </div>
    <p class="is-size-7">
      * Positive filter (to branch/tag) and negative filter (to all branch/tag
      except) can't be used together
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { triggerBuilderState, workflow, commit } from "@/stores";
import { BranchType } from "@/types/Trigger/pushPrConfig";

// noinspection JSMethodCanBeStatic
@Component
export default class PushPrOptions extends Vue {
  private get trigger(): "pull_request" | "push" {
    return triggerBuilderState.currentTriggerBuild === "pull_request"
      ? "pull_request"
      : "push";
  }

  private setStage(type: BranchType): void {
    commit("setPushPr", { trigger: this.trigger, type, items: [] });
    commit("onTriggerBuilderExit");
  }

  private onCancel(): void {
    commit("onTriggerBuilderExit");
  }

  private get canUseBranch(): boolean {
    return (
      !Array.isArray(workflow.on?.[this.trigger]?.branches) &&
      !Array.isArray(workflow.on?.[this.trigger]?.["branches-ignore"])
    );
  }

  private get canUseTag(): boolean {
    return (
      !Array.isArray(workflow.on?.[this.trigger]?.tags) &&
      !Array.isArray(workflow.on?.[this.trigger]?.["tags-ignore"])
    );
  }
}
</script>
