import { Trigger } from "@/types/Trigger/trigger";
import { Module } from "vuex";

export interface TriggerBuilderState {
  stage: "pick-type" | "type-option";
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
      state.stage = "type-option";
      state.currentTriggerBuild = trigger;
    },
  },
};

export default store;
