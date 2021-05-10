import { PushPrConfig } from "@/types/Trigger/pushPrConfig";
import { Workflow } from "@/types/workflow";
import Vue from "vue";

export const workflow: Workflow = Vue.observable({ on: {} });

export function setPush(push: PushPrConfig): void {
  workflow.on = { push };
}
