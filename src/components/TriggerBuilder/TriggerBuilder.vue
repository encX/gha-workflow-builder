<template>
  <div class="trigger box">
    <h1 class="title">Triggers</h1>
    <h2 class="subtitle">This workflow will be triggered on these events.</h2>

    <div class="buttons">
      <b-button class="is-primary">Add</b-button>
    </div>

    <div class="buttons">
      <b-button class="is-primary is-light">Push</b-button>
      <b-button class="is-primary is-light">Pull Request</b-button>
      <b-button class="is-primary is-light">Schedule</b-button>
      <b-button class="is-primary is-light">Manual trigger</b-button>
    </div>

    <PushPrBuilder type="push" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PushPrBuilder from "@/components/TriggerBuilder/PushPrBuilder.vue";

@Component({
  components: { PushPrBuilder },
})
export default class TriggerBuilder extends Vue {}
</script>

<style lang="scss" scoped></style>
