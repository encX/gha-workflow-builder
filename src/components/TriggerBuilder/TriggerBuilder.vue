<template>
  <div class="trigger box">
    <h1 class="title">Triggers</h1>
    <h2 class="subtitle">This workflow will be triggered on these events.</h2>

    <div class="buttons">
      <b-button class="is-primary">Add</b-button>
    </div>

    <div v-if="!building" class="buttons">
      <b-button v-if="!push" v-on:click="setPush" type="is-primary is-light">
        Push
      </b-button>
      <b-button v-if="!pr" type="is-primary is-light"> Pull Request </b-button>
      <b-button v-if="!manual" type="is-primary is-light"> Schedule </b-button>
      <b-button v-if="!schedule" type="is-primary is-light">
        Manual trigger
      </b-button>
    </div>

    <PushPrBuilder
      v-if="building === 'push' || building === 'pull_request'"
      :type="building"
      :on-complete="onBuildComplete"
    />
  </div>
</template>

<script lang="ts">
import { workflow } from "@/store";
import { Trigger } from "@/types/Trigger/trigger";
import { Vue, Component } from "vue-property-decorator";
import PushPrBuilder from "@/components/TriggerBuilder/PushPrBuilder.vue";

@Component({
  components: { PushPrBuilder },
  computed: {
    push: () => workflow.on?.push,
    pr: () => workflow.on?.pull_request,
    schedule: () => workflow.on?.schedule,
    manual: () => workflow.on?.workflow_dispatch,
  },
  methods: {},
})
export default class TriggerBuilder extends Vue {
  private building: keyof Trigger | null = null;

  setPush(): void {
    this.building = "push";
  }

  onBuildComplete(): void {
    this.building = null;
  }
}
</script>

<style lang="scss" scoped></style>
