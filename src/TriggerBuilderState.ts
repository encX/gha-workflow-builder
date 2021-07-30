import { BranchType } from "@/types/Trigger/pushPrConfig";
import { Trigger } from "@/types/Trigger/trigger";
import Vue from "vue";

interface TriggerBuilderState {
  stage: "pick-type" | "build" | "edit";
  currentTriggerBuild: keyof Trigger;
  currentBranchType: BranchType;
  isEditing: boolean;
}

export const triggerBuilderState: TriggerBuilderState = Vue.observable({
  stage: "pick-type",
  currentTriggerBuild: "push",
  currentBranchType: "neutral",
  isEditing: false,
});

export function onTriggerBuilderDone() {
  triggerBuilderState.stage = "pick-type";
  triggerBuilderState.isEditing = false;
}

export function onEditPushPr(
  trigger: "push" | "pull_request",
  branchType: BranchType
) {
  triggerBuilderState.stage = "build";
  triggerBuilderState.currentTriggerBuild = trigger;
  triggerBuilderState.currentBranchType = branchType;
}
