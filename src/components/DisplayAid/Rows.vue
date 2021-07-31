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
  overflow: hidden;

  .row {
    padding: 8px 16px;
    display: flex;
    align-items: center;
    animation: newBox 2s;

    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }

    .row-main-content {
      display: flex;
      align-items: center;
      flex-grow: 1;
    }

    .row-control-btn {
      margin-left: 4px;
    }
  }
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
