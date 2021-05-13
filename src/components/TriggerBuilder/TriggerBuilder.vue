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
      <b-button v-if="!push" @click="onClickPush" :type="subBtnClass">
        Push
      </b-button>
      <b-button v-if="!pr" @click="onClickPr" :type="subBtnClass">
        Pull Request
      </b-button>
      <b-button v-if="!schedule" @click="onClickSchedule" :type="subBtnClass">
        Schedule
      </b-button>
      <b-button v-if="!manual" @click="onClickManual" :type="subBtnClass">
        Manual trigger
      </b-button>
    </div>

    <div v-if="stage === 'build'">
      <PushPrBuilder
        v-if="buildType === 'push' || buildType === 'pull_request'"
        :type="buildType"
        :on-complete="onBuildComplete"
      />
      <div v-if="buildType === 'schedule'">TODO: schedule builder</div>
    </div>
  </div>
</template>

<script lang="ts">
import { workflow, setManual } from "@/store";
import { Trigger } from "@/types/Trigger/trigger";
import { Vue, Component } from "vue-property-decorator";
import PushPrBuilder from "@/components/TriggerBuilder/PushPrBuilder.vue";
import PushPrDisplay from "@/components/TriggerBuilder/PushPrDisplay.vue";

@Component({
  components: { PushPrBuilder, PushPrDisplay },
  computed: {
    push: () => workflow.on?.push,
    pr: () => workflow.on?.pull_request,
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

  private onBuildComplete(): void {
    this.stage = "neutral";
    this.buildType = null;
  }
}
type BuildType = keyof Trigger;
type BuilderStage = "neutral" | "pick-type" | "build";
</script>

<style lang="scss" scoped></style>
