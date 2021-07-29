<template>
  <li>
    {{ targetText }}: <b>{{ list.join(", ") }}</b>
  </li>
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

<style scoped></style>
