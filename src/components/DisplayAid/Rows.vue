<template>
  <div :class="className"><slot /></div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Rows extends Vue {
  @Prop({ default: false }) private readonly hasShadow!: boolean;

  private className = "rows" + (this.hasShadow ? " with-shadow" : "");
}
</script>

<style lang="scss">
.rows {
  padding: 0 !important;
  overflow: hidden;
  border: 1px solid #eee;
  border-radius: 6px;
  display: block;
  color: #4a4a4a;

  &.with-shadow {
    border: 0;
    -webkit-box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
      0 0px 0 1px rgba(10, 10, 10, 0.02);
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
      0 0px 0 1px rgba(10, 10, 10, 0.02);
  }

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

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
