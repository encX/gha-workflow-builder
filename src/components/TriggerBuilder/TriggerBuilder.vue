<template>
  <div class="trigger box">
    <h1 class="title">Triggers</h1>
    <h2 class="subtitle">This workflow will be triggered on these events.</h2>

    <div class="content">
      <PushPrDisplay type="push" :config="push" />
      <PushPrDisplay type="pull_request" :config="pr" />
    </div>

    <div v-if="stage === 'neutral'" @click="onClickAddNew" class="buttons">
      <b-button class="is-primary">Add</b-button>
    </div>

    <div v-if="stage === 'pick-type'" class="buttons">
      <b-button v-if="canAddPush" @click="onClickPush" :type="subBtnClass">
        Push
      </b-button>
      <b-button v-if="canAddPr" @click="onClickPr" :type="subBtnClass">
        Pull Request
      </b-button>
      <b-button @click="onClickSchedule" :type="subBtnClass">
        Schedule
      </b-button>
      <b-button v-if="!manual" @click="onClickManual" :type="subBtnClass">
        Manual trigger
      </b-button>
      <b-button @click="onBuildComplete">Cancel</b-button>
    </div>

    <div v-if="stage === 'build'">
      <PushPrBuilder
        v-if="buildType === 'push' || buildType === 'pull_request'"
        :type="buildType"
        :on-complete="onBuildComplete"
        :on-cancel="onBuilderCancel"
      />
      <ScheduleBuilder
        v-if="buildType === 'schedule'"
        :on-complete="onBuildComplete"
        :on-cancel="onBuilderCancel"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { workflow, setManual } from "@/store";
import { Trigger } from "@/types/Trigger/trigger";
import PushPrBuilder from "@/components/TriggerBuilder/PushPrBuilder.vue";
import PushPrDisplay from "@/components/TriggerBuilder/PushPrDisplay.vue";
import ScheduleBuilder from "@/components/TriggerBuilder/ScheduleBuilder.vue";

@Component({
  components: { PushPrBuilder, PushPrDisplay, ScheduleBuilder },
  computed: {
    push: () => workflow.on?.push,
    canAddPush: () =>
      (!workflow.on?.push?.branches ||
        !workflow.on?.push?.["branches-ignore"]) &&
      (!workflow.on?.push?.tags || !workflow.on?.push?.["tags-ignore"]),
    pr: () => workflow.on?.pull_request,
    canAddPr: () =>
      (!workflow.on?.pull_request?.branches ||
        !workflow.on?.pull_request?.["branches-ignore"]) &&
      (!workflow.on?.pull_request?.tags ||
        !workflow.on?.pull_request?.["tags-ignore"]),
    schedule: () => workflow.on?.schedule,
    manual: () => workflow.on?.workflow_dispatch,
  },
  methods: {},
})
export default class TriggerBuilder extends Vue {
  private buildType: BuildType | null = null;
  private stage: BuilderStage = "neutral";
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
    this.stage = "neutral";
    this.buildType = null;
  }
}
type BuildType = keyof Trigger;
type BuilderStage = "neutral" | "pick-type" | "build";
</script>

<style lang="scss" scoped></style>
