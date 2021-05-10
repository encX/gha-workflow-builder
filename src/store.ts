import { CronConfig } from "@/types/Trigger/cronConfig";
import { PushPrConfig } from "@/types/Trigger/pushPrConfig";
import { Workflow } from "@/types/workflow";
import Vue from "vue";

export const workflow: Workflow = Vue.observable({
  on: undefined,
  name: undefined,
  jobs: undefined,
});

export function setPush(push: PushPrConfig): void {
  workflow.on = { ...workflow.on, push };
}

export function setPr(pull_request: PushPrConfig): void {
  workflow.on = { ...workflow.on, pull_request };
}

export function setSchedule(schedule: CronConfig[]): void {
  workflow.on = { ...workflow.on, schedule };
}

export function setManual(): void {
  workflow.on = { ...workflow.on, workflow_dispatch: {} };
}
