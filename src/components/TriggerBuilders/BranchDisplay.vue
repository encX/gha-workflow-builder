<template>
  <div>
    {{ targetText }}:
    <b-tag
      class="is-light is-family-monospace mr-1 has-text-weight-bold"
      :type="displayType"
      v-for="item in list"
      :key="item"
      >{{ item }}</b-tag
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class BranchDisplay extends Vue {
  @Prop({ required: true }) private readonly targetText!: string;
  @Prop({ required: true }) private readonly list!: string[];
  @Prop({ default: "is-info" }) private readonly displayType;
}
</script>
