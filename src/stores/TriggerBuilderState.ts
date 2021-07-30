import { BranchType } from "@/types/Trigger/pushPrConfig";
import { Trigger } from "@/types/Trigger/trigger";
import Vue from "vue";

interface TriggerBuilderState {
  stage: "pick-type" | "build" | "edit";
  currentTriggerBuild: keyof Trigger;
  currentBranchStage: BranchType;
}

export const triggerBuilderState: TriggerBuilderState = Vue.observable({
  stage: "pick-type",
  currentTriggerBuild: "push",
  currentBranchStage: "branches",
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

export function onEditPushPr(
  trigger: "push" | "pull_request",
  branchType: BranchType
): void {
  triggerBuilderState.stage = "edit";
  triggerBuilderState.currentTriggerBuild = trigger;
  triggerBuilderState.currentBranchStage = branchType;
}
