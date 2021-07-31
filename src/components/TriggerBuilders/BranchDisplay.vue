<template>
  <div class="branch-display" v-if="shouldRender">
    <div class="description">
      {{ targetText }}:
      <b-taginput v-if="isEditing" v-model="items" />
      <b-tag
        v-else
        class="is-light is-family-monospace ml-1 has-text-weight-bold"
        :type="displayType"
        v-for="item in items"
        :key="item"
        >{{ item }}</b-tag
      >
    </div>
    <b-button
      v-if="isEditing"
      class="control-btn is-success"
      icon-left="check"
      @click="onSave"
    />
    <b-button
      v-else
      class="control-btn is-warning"
      icon-left="pencil"
      @click="onEdit"
    />
    <b-button
      class="control-btn is-danger"
      icon-left="delete"
      @click="onDelete"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { commit, dispatch, workflow } from "@/stores";
import { BranchType } from "@/types/Trigger/pushPrConfig";

@Component
export default class BranchDisplay extends Vue {
  @Prop({ required: true }) private readonly trigger!: "pull_request" | "push";
  @Prop({ required: true }) private readonly type!: BranchType;

  @Prop({ required: true }) private readonly targetText!: string;
  @Prop({ default: "is-info" }) private readonly displayType!: string;

  private get shouldRender(): boolean {
    return Boolean(workflow.on?.[this.trigger]?.[this.type]);
  }
  private items = workflow.on[this.trigger]?.[this.type] ?? [];
  private isEditing = !workflow.on[this.trigger]?.[this.type]?.length;

  private onDelete(): void {
    commit("deletePushPr", { trigger: this.trigger, type: this.type });
  }

  private onEdit(): void {
    this.isEditing = true;
  }

  private onSave(): void {
    this.isEditing = false;
    const { trigger, type, items } = this;
    dispatch("setPushPr", { trigger, type, items });
    commit("onTriggerBuilderExit");
  }
}
</script>

<style lang="scss">
.branch-display {
  .description {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }

  .control-btn {
    margin-left: 4px;
  }

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
