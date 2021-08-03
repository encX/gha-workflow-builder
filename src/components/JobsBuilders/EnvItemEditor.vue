<template>
  <div class="row env-item">
    <div class="row-main-content">
      <b-field v-if="isEditing" grouped>
        <b-field><b-input placeholder="Key" v-model="newKey" /></b-field>
        <b-field><b-input placeholder="Value" v-model="newVal" /></b-field>
      </b-field>
      <b-tag v-if="!isEditing" :type="tagType" class="is-primary">{{
        k
      }}</b-tag>
      <b-tag v-if="!isEditing" :type="tagType" class="is-info ml-1">{{
        v
      }}</b-tag>
    </div>
    <b-button
      v-if="isEditing"
      class="row-control-btn is-dark is-outlined"
      icon-left="close"
      @click="onCancel"
    />
    <b-button
      v-if="isEditing"
      class="row-control-btn is-success is-light"
      icon-left="check"
      @click="onClickSave"
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
      @click="onClickDelete"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class EnvItemEditor extends Vue {
  @Prop({ required: true }) private readonly k!: string;
  @Prop({ required: true }) private readonly v!: string;
  @Prop({ required: true }) private readonly id!: number;
  @Prop({ required: true }) private onSave!: (
    id: number,
    newK: string,
    newV: string
  ) => boolean;
  @Prop({ required: true }) private onDelete!: (k: number) => void;

  private tagType = "is-light is-family-monospace is-medium";
  private newKey = this.k;
  private newVal = this.v;
  private isEditing = !this.k && !this.v;

  private onEdit(): void {
    this.isEditing = true;
  }

  private onCancel(): void {
    this.newKey = this.k;
    this.newVal = this.v;
    this.isEditing = false;
  }

  private onClickSave(): void {
    this.isEditing = !this.onSave(this.id, this.newKey, this.newVal);
  }

  private onClickDelete(): void {
    this.onDelete(this.id);
  }
}
</script>

<style lang="scss">
.env-item {
  input {
    font-family: monospace !important;
  }

  .tag {
    white-space: pre;
  }
}
</style>
