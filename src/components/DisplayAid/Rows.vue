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
@import "../../theme";
.rows {
  padding: 0 !important;
  overflow: hidden;
  border: 1px solid #eee;
  border-radius: 6px;
  display: block;
  color: $box-color;
  background-color: $box-background-color;

  &.with-shadow {
    border: 0;
    -webkit-box-shadow: $box-shadow;
    box-shadow: $box-shadow;
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
      border-bottom: 1px solid $border;
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
    background-color: $primary;
  }
  to {
    background-color: transparent;
  }
}
</style>
