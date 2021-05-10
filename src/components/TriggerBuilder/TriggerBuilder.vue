<template>
  <div class="trigger box">
    <h1 class="title">Triggers</h1>
    <h2 class="subtitle">This workflow will be triggered on these events.</h2>

    <div>TODO: Display existing trigger list here</div>

    <div v-if="stage === 'neutral'" @click="addNewTrigger" class="buttons">
      <b-button class="is-primary">Add</b-button>
    </div>

    <div v-if="stage === 'pick-type'" class="buttons">
      <b-button v-if="!push" @click="setPush" :type="typePickBtnClass">
        Push
      </b-button>
      <b-button v-if="!pr" @click="setPr" :type="typePickBtnClass">
        Pull Request
      </b-button>
      <b-button v-if="!schedule" @click="setSchedule" :type="typePickBtnClass">
        Schedule
      </b-button>
      <b-button v-if="!manual" @click="setManual" :type="typePickBtnClass">
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
  private buildType: BuildType | null = null;
  private stage: BuilderStage = "neutral";
  private typePickBtnClass = "is-primary is-light";

  setPush(): void {
    this.stage = "build";
    this.buildType = "push";
  }

  setPr(): void {
    this.stage = "build";
    this.buildType = "pull_request";
  }

  setSchedule(): void {
    this.stage = "build";
    this.buildType = "schedule";
  }

  setManual(): void {
    setManual();
    this.onBuildComplete();
  }

  addNewTrigger(): void {
    this.stage = "pick-type";
  }

  onBuildComplete(): void {
    this.stage = "neutral";
    this.buildType = null;
  }
}
type BuildType = keyof Trigger;
type BuilderStage = "neutral" | "pick-type" | "build";
</script>

<style lang="scss" scoped></style>
