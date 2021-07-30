import { CronConfig } from "@/types/Trigger/cronConfig";
import { BranchType, PushPrConfig } from "@/types/Trigger/pushPrConfig";
import { Workflow } from "@/types/workflow";
import Vue from "vue";

export const workflow: Workflow = Vue.observable({
  on: {
    pull_request: {
      branches: ["a", "b", "c"],
      "branches-ignore": ["def", "ghi"],
      tags: ["v1.*", "v2.*"],
      "tags-ignore": ["v3.1.*"],
    },
    schedule: [{ cron: "0 0,12 * * *" }, { cron: "0 0 1 * *" }],
    workflow_dispatch: {},
  },
  name: undefined,
  jobs: undefined,
});

export function setPushPr(
  trigger: "push" | "pull_request",
  type: BranchType,
  items: string[]
) {
  const config = {
    ...workflow.on[trigger],
    [type]: items.length > 0 ? items : undefined,
  };
  workflow.on = { ...workflow.on, [trigger]: config };
}

export function setSchedule(schedule: CronConfig[]): void {
  workflow.on = { ...workflow.on, schedule };
}

export function setManual(): void {
  workflow.on = { ...workflow.on, workflow_dispatch: {} };
}
