import { PushPrStage } from "@/types/Trigger/pushPrConfig";
import { Trigger } from "@/types/Trigger/trigger";
import Vue from "vue";

interface TriggerBuilderState {
  stage: "pick-type" | "build" | "edit";
  buildType: keyof Trigger;
  pushPrStage: PushPrStage;
  isEditing: boolean;
}

export const triggerBuilderState: TriggerBuilderState = Vue.observable({
  stage: "pick-type",
  buildType: "push",
  pushPrStage: "neutral",
  isEditing: false,
});

export function onTriggerBuilderDone() {
  triggerBuilderState.stage = "pick-type";
  triggerBuilderState.isEditing = false;
}

export function onEditPushPr(
  type: "push" | "pull_request",
  stage: PushPrStage
) {
  triggerBuilderState.stage = "build";
  triggerBuilderState.buildType = type;
  triggerBuilderState.pushPrStage = stage;
}
