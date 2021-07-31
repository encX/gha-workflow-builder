<template>
  <section class="trigger section">
    <h1 class="title">Triggers</h1>
    <h2 class="subtitle">This workflow will be triggered on these events.</h2>

    <PushPrGroup trigger="push" />
    <PushPrGroup trigger="pull_request" />
    <ScheduleGroup />
    <ManualGroup />

    <PickTypeButtons v-if="stage === 'pick-type'" />
    <div v-if="stage === 'type-option'">
      <PushPrOptions v-if="trigger === 'push' || trigger === 'pull_request'" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { triggerBuilderState } from "@/stores";
import PushPrOptions from "@/components/TriggerBuilders/PushPrOptions.vue";
import PushPrGroup from "@/components/TriggerBuilders/PushPrGroup.vue";
import ScheduleGroup from "@/components/TriggerBuilders/ScheduleGroup.vue";
import ManualGroup from "@/components/TriggerBuilders/ManualGroup.vue";
import PickTypeButtons from "@/components/PickTypeButtons.vue";

// noinspection JSMethodCanBeStatic
@Component({
  components: {
    PickTypeButtons,
    PushPrOptions,
    PushPrGroup,
    ScheduleGroup,
    ManualGroup,
  },
})
export default class TriggerBuilder extends Vue {
  private get stage() {
    return triggerBuilderState.stage;
  }
  private get trigger() {
    return triggerBuilderState.currentTriggerBuild;
  }
}
</script>
