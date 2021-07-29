<template>
  <div class="box rows"><slot /></div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Rows extends Vue {}
</script>

<style lang="scss">
.rows {
  padding: 0 !important;

  > div {
    padding: 8px 16px;

    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
