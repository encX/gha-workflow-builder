<template>
  <section class="trigger section">
    <h1 class="title">Triggers</h1>
    <h2 class="subtitle">This workflow will be triggered on these events.</h2>

    <PushPrDisplay trigger="push" />
    <PushPrDisplay trigger="pull_request" />
    <ScheduleDisplay />
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

    <div v-else-if="stage === 'build'">
      <PushPrBuilder v-if="trigger === 'push' || trigger === 'pull_request'" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { commit, workflow, triggerBuilderState } from "@/stores";
import PushPrBuilder from "@/components/TriggerBuilders/PushPrBuilder.vue";
import PushPrDisplay from "@/components/TriggerBuilders/PushPrDisplay.vue";
import ScheduleDisplay from "@/components/TriggerBuilders/ScheduleDisplay.vue";
import ManualDisplay from "@/components/TriggerBuilders/ManualDisplay.vue";

// noinspection JSMethodCanBeStatic
@Component({
  components: {
    PushPrBuilder,
    PushPrDisplay,
    ScheduleDisplay,
    ManualDisplay,
  },
})
export default class TriggerBuilder extends Vue {
  private subBtnClass = "is-primary is-light";

  private onClickPush() {
    commit("onNewTrigger", "push");
  }

  private onClickPr() {
    commit("onNewTrigger", "pull_request");
  }

  private onClickSchedule() {
    commit("addSchedule");
  }

  private onClickManual(): void {
    commit("setManual");
    commit("onTriggerBuilderExit");
  }

  private get canAddPush() {
    return (
      (!workflow.on?.push?.branches &&
        !workflow.on?.push?.["branches-ignore"]) ||
      (!workflow.on?.push?.tags && !workflow.on?.push?.["tags-ignore"])
    );
  }
  private get canAddPr() {
    return (
      (!workflow.on?.pull_request?.branches &&
        !workflow.on?.pull_request?.["branches-ignore"]) ||
      (!workflow.on?.pull_request?.tags &&
        !workflow.on?.pull_request?.["tags-ignore"])
    );
  }
  private get manual() {
    return workflow.on?.workflow_dispatch;
  }
  private get stage() {
    return triggerBuilderState.stage;
  }
  private get trigger() {
    return triggerBuilderState.currentTriggerBuild;
  }
}
</script>
