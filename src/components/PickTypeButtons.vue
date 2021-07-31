<template>
  <div v-if="stage === 'pick-type'" class="buttons">
    <b-button
      icon-left="plus"
      v-if="canAddPush"
      @click="onClickPush"
      :type="btnClass"
    >
      Push
    </b-button>
    <b-button
      icon-left="plus"
      v-if="canAddPr"
      @click="onClickPr"
      :type="btnClass"
    >
      Pull Request
    </b-button>
    <b-button icon-left="plus" @click="onClickSchedule" :type="btnClass">
      Schedule
    </b-button>
    <b-button
      icon-left="plus"
      v-if="!manual"
      @click="onClickManual"
      :type="btnClass"
    >
      Manual trigger
    </b-button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import { commit, triggerBuilderState, workflow } from "@/stores";
import { Component } from "vue-property-decorator";

// noinspection JSMethodCanBeStatic
@Component
export default class PickTypeButtons extends Vue {
  private btnClass = "is-primary is-light";

  private get stage() {
    return triggerBuilderState.stage;
  }
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
}
</script>
