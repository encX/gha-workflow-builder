<template>
  <div class="push-pr-builder">
    <h5 class="title is-5">{{ title }} {{ fieldText }}</h5>

    <div class="buttons" v-if="stage === 'neutral'">
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

    <div v-else>
      <b-field :message="helperText">
        <b-taginput
          v-model="list"
          ellipsis
          :placeholder="placeHolderText"
          aria-close-label="Delete"
        >
        </b-taginput>
      </b-field>

      <div class="buttons">
        <b-button
          class="button is-primary"
          @click="done"
          :disabled="list.length === 0"
        >
          Done
        </b-button>
        <b-button class="button" @click="back">Back</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { setPr, setPush } from "@/store";
import { PushPrConfig } from "@/types/Trigger/pushPrConfig";
import { getTriggerTitle } from "@/helpers/TriggerTypeMapper";

@Component
export default class PushPrBuilder extends Vue {
  @Prop({ required: true }) private readonly type!: "pull_request" | "push";
  @Prop({ default: () => () => null }) private readonly onComplete!: () => void;
  @Prop({ default: () => () => null }) private readonly onCancel!: () => void;

  private config: PushPrConfig = {};
  private list: string[] = [];
  private stage: BuilderStage = "neutral";

  private setStage(stage: BuilderStage): void {
    this.stage = stage;
  }

  private exportTrigger(): void {
    this.config = { ...this.config, [this.stage]: this.list };
    switch (this.type) {
      case "pull_request":
        setPr(this.config);
        break;
      case "push":
        setPush(this.config);
        break;
    }
  }

  private done(): void {
    if (this.stage === "neutral") return;
    if (this.list.length !== 0) this.exportTrigger();
    this.onComplete();
  }

  private back(): void {
    this.stage = "neutral";
  }

  private get canUseBranch(): boolean {
    return (
      !this.config.branches?.length && !this.config["branches-ignore"]?.length
    );
  }

  private get canUseTag(): boolean {
    return !this.config.tags?.length && !this.config["tags-ignore"]?.length;
  }

  private get title(): string {
    return getTriggerTitle(this.type);
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

  private get helperText(): string {
    const typeName = getTriggerTitle(this.type);

    switch (this.stage) {
      case "branches":
      case "branches-ignore":
        return `"${typeName} to branch" and "${typeName} to all branch excluding specifics" options can not be used together`;
      case "tags":
      case "tags-ignore":
        return `"${typeName} to tag" and "${typeName} to all tag excluding specifics" options can not be used together`;
      default:
        return "";
    }
  }
}

type BuilderStage =
  | "neutral"
  | "branches"
  | "tags"
  | "branches-ignore"
  | "tags-ignore";
</script>

<style scoped></style>
