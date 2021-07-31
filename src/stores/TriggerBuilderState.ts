import { Trigger } from "@/types/Trigger/trigger";
import { Module } from "vuex";

export interface TriggerBuilderState {
  stage: "pick-type" | "build";
  currentTriggerBuild: keyof Trigger;
}

const store: Module<TriggerBuilderState, any> = {
  state: {
    stage: "pick-type",
    currentTriggerBuild: "push",
  },
  mutations: {
    onTriggerBuilderExit(state: TriggerBuilderState) {
      state.stage = "pick-type";
    },

    onNewTrigger(
      state: TriggerBuilderState,
      trigger: Exclude<keyof Trigger, "workflow_dispatch">
    ): void {
      state.stage = "build";
      state.currentTriggerBuild = trigger;
    },
  },
};

export default store;
