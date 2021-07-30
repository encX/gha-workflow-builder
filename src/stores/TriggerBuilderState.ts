import { BranchStage, BranchType } from "@/types/Trigger/pushPrConfig";
import { Trigger } from "@/types/Trigger/trigger";
import Vue from "vue";

interface TriggerBuilderState {
  stage: "pick-type" | "build" | "edit";
  currentTriggerBuild: keyof Trigger;
  currentBranchStage: BranchStage;
  isEditing: boolean;
}

export const triggerBuilderState: TriggerBuilderState = Vue.observable({
  stage: "pick-type",
  currentTriggerBuild: "push",
  currentBranchStage: "neutral",
  isEditing: false,
});

export function onTriggerBuilderExit() {
  triggerBuilderState.stage = "pick-type";
  triggerBuilderState.currentBranchStage = "neutral";
  triggerBuilderState.isEditing = false;
}

export function onEditPushPr(
  trigger: "push" | "pull_request",
  branchType: BranchType
) {
  triggerBuilderState.stage = "build";
  triggerBuilderState.currentTriggerBuild = trigger;
  triggerBuilderState.currentBranchStage = branchType;
}
