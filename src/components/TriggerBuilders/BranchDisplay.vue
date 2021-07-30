<template>
  <div class="branch-display" v-if="list">
    <div class="description">
      {{ targetText }}:
      <b-taginput v-if="isEditing" v-model="listEdit" />
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
      @click="onSave(listEdit)"
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

@Component
export default class BranchDisplay extends Vue {
  @Prop({ required: true }) private readonly targetText!: string;
  @Prop({ required: true }) private readonly list!: string[];
  @Prop({ default: "is-info" }) private readonly displayType!: string;
  @Prop({ required: true }) private readonly isEditing!: boolean;
  @Prop({ required: true }) private readonly onDelete!: () => void;
  @Prop({ required: true }) private readonly onEdit!: () => void;
  @Prop({ required: true }) private readonly onSave!: (list: string[]) => void;

  private listEdit = this.list;
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
}
</style>
