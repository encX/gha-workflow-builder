import { Trigger } from "@/types/Trigger/trigger";
import Vue from "vue";

interface TriggerBuilderState {
  stage: "pick-type" | "build";
  currentTriggerBuild: keyof Trigger;
}

export const triggerBuilderState: TriggerBuilderState = Vue.observable({
  stage: "pick-type",
  currentTriggerBuild: "push",
});

export function onTriggerBuilderExit(): void {
  triggerBuilderState.stage = "pick-type";
}

export function onNewTrigger(
  trigger: Exclude<keyof Trigger, "workflow_dispatch">
): void {
  triggerBuilderState.stage = "build";
  triggerBuilderState.currentTriggerBuild = trigger;
}
