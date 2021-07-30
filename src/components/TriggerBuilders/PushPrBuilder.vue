<template>
  <div class="push-pr-builder block">
    <h5 class="title is-5">New trigger on {{ title }} ...</h5>

    <div>
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
      <p class="is-size-7">
        * Positive filter (to branch/tag) and negative filter (to all branch/tag
        except) can't be used together
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { setPushPr, workflow } from "@/stores/Workflow";
import { BranchType } from "@/types/Trigger/pushPrConfig";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import {
  onEditPushPr,
  onTriggerBuilderExit,
  triggerBuilderState as state,
} from "@/stores/TriggerBuilderState";
import { getTriggerTitle } from "@/helpers/TriggerTypeMapper";

@Component
export default class PushPrBuilder extends Vue {
  private get type(): "pull_request" | "push" {
    return state.currentTriggerBuild === "pull_request"
      ? "pull_request"
      : "push";
  }

  private get title(): string {
    return getTriggerTitle(this.type).toLowerCase();
  }

  private setStage(data: BranchType): void {
    setPushPr(this.type, data, []);
    onEditPushPr(this.type, data);
  }

  private onCancel = onTriggerBuilderExit;

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

<style lang="scss">
.push-pr-builder {
  animation: newBox 2s;
}

@keyframes newBox {
  from {
    background-color: #ffdb4a;
  }
  to {
    background-color: white;
  }
}
</style>
