<template>
  <div>
    {{ targetText }}:
    <b-tag v-for="item in list" v-bind:key="item">{{ item }}</b-tag>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class BranchDisplay extends Vue {
  @Prop({ required: true }) private readonly targetText!: string;
  @Prop({ required: true }) private readonly list!: string[];
}
</script>
