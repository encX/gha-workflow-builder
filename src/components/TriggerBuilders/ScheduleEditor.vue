<template>
  <div class="row">
    <div class="row-main-content">
      Schedule:
      <b-input v-if="isEditing" v-model="cron" class="ml-2" />
      <b-tag v-else class="is-family-monospace ml-1 has-text-weight-bold">{{
        cron
      }}</b-tag>
    </div>
    <b-button
      v-if="isEditing"
      class="row-control-btn is-success"
      icon-left="check"
      @click="onSave"
    />
    <b-button
      v-else
      class="row-control-btn is-warning"
      icon-left="pencil"
      @click="onEdit"
    />
    <b-button
      class="row-control-btn is-danger"
      icon-left="delete"
      @click="onDelete"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { commit, dispatch, workflow } from "@/stores";

@Component
export default class ScheduleEditor extends Vue {
  @Prop({ required: true }) private readonly index!: number;

  private cron = workflow.on.schedule?.[this.index].cron ?? "";
  private isEditing = !this.cron;

  private onEdit(): void {
    this.isEditing = true;
  }

  private onSave(): void {
    const { index, cron } = this;
    dispatch("setSchedule", { index, cron });
    this.isEditing = false;
  }

  private onDelete(): void {
    commit("deleteSchedule", this.index);
  }
}
</script>
