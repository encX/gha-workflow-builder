<template>
  <div class="branch-display">
    <div class="description">
      {{ targetText }}:
      <b-tag
        class="is-light is-family-monospace ml-1 has-text-weight-bold"
        :type="displayType"
        v-for="item in list"
        :key="item"
        >{{ item }}</b-tag
      >
    </div>
    <b-button
      class="control-btn is-warning is-small"
      icon-left="pencil"
      @click="onEdit"
    />
    <b-button
      class="control-btn is-danger is-small"
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
  @Prop({ required: true }) private readonly onDelete!: () => void;
  @Prop({ required: true }) private readonly onEdit!: () => void;
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
