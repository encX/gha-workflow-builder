<template>
  <div class="trigger">
    <h1 class="title">Triggers</h1>
    <h2 class="subtitle">This workflow will be triggered on these events.</h2>

    <div class="select">
      <select>
        <option value="push">Push</option>
      </select>
    </div>

    <button class="button is-primary">Add</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Trigger extends Vue {}
</script>

<style lang="scss" scoped></style>
