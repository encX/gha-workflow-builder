<template>
  <div class="row" v-if="shouldRender">
    <div class="row-main-content">
      {{ targetText }}:
      <b-taginput v-if="isEditing" v-model="items" class="ml-2" />
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
      class="row-control-btn is-success is-light"
      icon-left="check"
      @click="onSave"
    />
    <b-button
      v-else
      class="row-control-btn is-warning is-light"
      icon-left="pencil"
      @click="onEdit"
    />
    <b-button
      class="row-control-btn is-danger is-light"
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
export default class PushPrEditor extends Vue {
  @Prop({ required: true }) private readonly trigger!: "pull_request" | "push";
  @Prop({ required: true }) private readonly type!: BranchType;

  @Prop({ required: true }) private readonly targetText!: string;
  @Prop({ default: "is-success" }) private readonly displayType!: string;

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
