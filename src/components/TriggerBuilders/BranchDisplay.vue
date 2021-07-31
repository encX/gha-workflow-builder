<template>
  <div class="branch-display" v-if="shouldRender">
    <div class="description">
      {{ targetText }}:
      <b-taginput v-if="isEditing" v-model="list" />
      <b-tag
        v-else
        class="is-light is-family-monospace ml-1 has-text-weight-bold"
        :type="displayType"
        v-for="item in list"
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

import { onTriggerBuilderExit } from "@/stores/TriggerBuilderState";
import { deletePushPr, setPushPr, workflow } from "@/stores/Workflow";
import { BranchType } from "@/types/Trigger/pushPrConfig";

@Component
export default class BranchDisplay extends Vue {
  @Prop({ required: true }) private readonly trigger!: "pull_request" | "push";
  @Prop({ required: true }) private readonly type!: BranchType;

  @Prop({ required: true }) private readonly targetText!: string;
  @Prop({ default: "is-info" }) private readonly displayType!: string;

  private shouldRender = Boolean(workflow.on?.[this.trigger]?.[this.type]);
  private list = workflow.on[this.trigger]?.[this.type] ?? [];
  private isEditing = workflow.on[this.trigger]?.[this.type]?.length === 0;

  private onDelete(): void {
    deletePushPr(this.trigger, this.type);
  }

  private onEdit(): void {
    this.isEditing = true;
  }

  private onSave(): void {
    this.isEditing = false;
    this.list.length > 0
      ? setPushPr(this.trigger, this.type, this.list)
      : this.onDelete();
    onTriggerBuilderExit();
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
