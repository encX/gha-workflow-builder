<template>
  <section class="trigger section">
    <h1 class="title">Triggers</h1>
    <h2 class="subtitle">This workflow will be triggered on these events.</h2>

    <div class="content">
      <PushPrDisplay type="push" :config="push" />
      <PushPrDisplay type="pull_request" :config="pr" />
      <ScheduleDisplay :config="schedule" />
      <ul v-if="manual">
        <li>Manual trigger</li>
      </ul>
    </div>

    <div v-if="stage === 'neutral'" @click="onClickAddNew" class="buttons">
      <b-button class="is-primary">Add</b-button>
    </div>

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
      :type="buildType"
      :on-complete="onBuildComplete"
      :on-cancel="onBuilderCancel"
    />
    <ScheduleBuilder
      v-if="stage === 'build' && buildType === 'schedule'"
      :on-complete="onBuildComplete"
      :on-cancel="onBuilderCancel"
    />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { workflow, setManual } from "@/store";
import { Trigger } from "@/types/Trigger/trigger";
import PushPrBuilder from "@/components/TriggerBuilders/PushPrBuilder.vue";
import PushPrDisplay from "@/components/TriggerBuilders/PushPrDisplay.vue";
import ScheduleBuilder from "@/components/TriggerBuilders/ScheduleBuilder.vue";
import ScheduleDisplay from "@/components/TriggerBuilders/ScheduleDisplay.vue";

@Component({
  components: {
    PushPrBuilder,
    PushPrDisplay,
    ScheduleBuilder,
    ScheduleDisplay,
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
  },
  methods: {},
})
export default class TriggerBuilder extends Vue {
  private buildType: BuildType | null = null;
  private stage: BuilderStage = "pick-type";
  private subBtnClass = "is-primary is-light";

  private onClickPush(): void {
    this.stage = "build";
    this.buildType = "push";
  }

  private onClickPr(): void {
    this.stage = "build";
    this.buildType = "pull_request";
  }

  private onClickSchedule(): void {
    this.stage = "build";
    this.buildType = "schedule";
  }

  private onClickManual(): void {
    setManual();
    this.onBuildComplete();
  }

  private onClickAddNew(): void {
    this.stage = "pick-type";
  }

  private onBuilderCancel(): void {
    this.stage = "pick-type";
  }

  private onBuildComplete(): void {
    this.stage = "pick-type";
    this.buildType = null;
  }
}
type BuildType = keyof Trigger;
type BuilderStage = "neutral" | "pick-type" | "build";
</script>

<style lang="scss" scoped></style>
