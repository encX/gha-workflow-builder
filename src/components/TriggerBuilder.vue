<template>
  <section class="trigger section">
    <h1 class="title">Triggers</h1>
    <h2 class="subtitle">This workflow will be triggered on these events.</h2>

    <PushPrDisplay type="push" :config="push" />
    <PushPrDisplay type="pull_request" :config="pr" />
    <ScheduleDisplay :config="schedule" />
    <ManualDisplay v-if="manual" />

    <div v-if="stage === 'pick-type'" class="buttons">
      <b-button
        icon-left="plus"
        v-if="canAddPush"
        @click="onClickPush"
        :type="subBtnClass"
      >
        Push
      </b-button>
      <b-button
        icon-left="plus"
        v-if="canAddPr"
        @click="onClickPr"
        :type="subBtnClass"
      >
        Pull Request
      </b-button>
      <b-button icon-left="plus" @click="onClickSchedule" :type="subBtnClass">
        Schedule
      </b-button>
      <b-button
        icon-left="plus"
        v-if="!manual"
        @click="onClickManual"
        :type="subBtnClass"
      >
        Manual trigger
      </b-button>
    </div>

    <PushPrBuilder
      v-if="
        stage === 'build' &&
        (buildType === 'push' || buildType === 'pull_request')
      "
    />
    <ScheduleBuilder v-if="stage === 'build' && buildType === 'schedule'" />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { workflow, setManual } from "@/store";
import {
  onTriggerBuilderExit,
  triggerBuilderState as state,
} from "@/TriggerBuilderState";
import PushPrBuilder from "@/components/TriggerBuilders/PushPrBuilder.vue";
import PushPrDisplay from "@/components/TriggerBuilders/PushPrDisplay.vue";
import ScheduleBuilder from "@/components/TriggerBuilders/ScheduleBuilder.vue";
import ScheduleDisplay from "@/components/TriggerBuilders/ScheduleDisplay.vue";
import ManualDisplay from "@/components/TriggerBuilders/ManualDisplay.vue";

@Component({
  components: {
    PushPrBuilder,
    PushPrDisplay,
    ScheduleBuilder,
    ScheduleDisplay,
    ManualDisplay,
  },
  computed: {
    push: () => workflow.on?.push,
    canAddPush: () =>
      (!workflow.on?.push?.branches &&
        !workflow.on?.push?.["branches-ignore"]) ||
      (!workflow.on?.push?.tags && !workflow.on?.push?.["tags-ignore"]),
    pr: () => workflow.on?.pull_request,
    canAddPr: () =>
      (!workflow.on?.pull_request?.branches &&
        !workflow.on?.pull_request?.["branches-ignore"]) ||
      (!workflow.on?.pull_request?.tags &&
        !workflow.on?.pull_request?.["tags-ignore"]),
    schedule: () => workflow.on?.schedule,
    manual: () => workflow.on?.workflow_dispatch,
    stage: () => state.stage,
    buildType: () => state.currentTriggerBuild,
  },
  methods: {},
})
export default class TriggerBuilder extends Vue {
  private subBtnClass = "is-primary is-light";

  private onClickPush(): void {
    state.stage = "build";
    state.currentTriggerBuild = "push";
  }

  private onClickPr(): void {
    state.stage = "build";
    state.currentTriggerBuild = "pull_request";
  }

  private onClickSchedule(): void {
    state.stage = "build";
    state.currentTriggerBuild = "schedule";
  }

  private onClickManual(): void {
    setManual();
    onTriggerBuilderExit();
  }
}
</script>
