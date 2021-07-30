<template>
  <div class="push-pr-builder box">
    <h5 class="title is-5">On {{ title }} {{ fieldText }}</h5>

    <div v-if="stage === 'neutral'">
      <PushPrBuilderButtons />
      <p class="is-size-7">
        * Positive filter (to branch/tag) and negative filter (to all branch/tag
        except) can't be used together
      </p>
    </div>

    <div v-else>
      <b-field>
        <b-taginput
          v-model="list"
          ellipsis
          :placeholder="placeHolderText"
          aria-close-label="Delete"
        >
        </b-taginput>
      </b-field>

      <div class="buttons">
        <b-button class="button is-primary" @click="onDone"> Done </b-button>
        <b-button class="button" @click="onCancel">Cancel</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { setPushPr, workflow } from "@/store";
import {
  onTriggerBuilderExit,
  triggerBuilderState as state,
} from "@/TriggerBuilderState";
import {
  BranchStage,
  BranchType,
  PushPrConfig,
} from "@/types/Trigger/pushPrConfig";
import { getTriggerTitle } from "@/helpers/TriggerTypeMapper";
import PushPrBuilderButtons from "@/components/TriggerBuilders/PushPrBuilderButtons.vue";

@Component({
  components: { PushPrBuilderButtons },
})
export default class PushPrBuilder extends Vue {
  private config: PushPrConfig = {};
  private list: string[] = [];

  created(): void {
    this.config = workflow.on?.[this.type] ?? {};
  }

  private exportTrigger(): void {
    if (state.currentBranchStage !== "neutral")
      setPushPr(this.type, state.currentBranchStage, this.list);
  }

  private onDone(): void {
    if (this.stage === "neutral") return;
    this.exportTrigger();
    onTriggerBuilderExit();
  }

  private onCancel = onTriggerBuilderExit;

  private get stage(): BranchStage {
    return state.currentBranchStage;
  }

  private get type(): "pull_request" | "push" {
    return state.currentTriggerBuild === "pull_request"
      ? "pull_request"
      : "push";
  }

  private get title(): string {
    return getTriggerTitle(this.type).toLowerCase();
  }

  private get placeHolderText(): string {
    switch (this.stage) {
      case "branches":
        return "Add a branch";
      case "tags":
        return "Add a tag";
      case "branches-ignore":
        return "Add a branch to be excluded";
      case "tags-ignore":
        return "Add a tag to be excluded";
      default:
        return "";
    }
  }

  private get fieldText(): string {
    switch (this.stage) {
      case "branches":
        return "to branches";
      case "tags":
        return "to tags";
      case "branches-ignore":
        return "to all branches except";
      case "tags-ignore":
        return "to all tags except";
      default:
        return "";
    }
  }
}
</script>
