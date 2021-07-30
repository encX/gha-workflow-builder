import { CronConfig } from "@/types/Trigger/cronConfig";
import { BranchType } from "@/types/Trigger/pushPrConfig";
import { Workflow } from "@/types/workflow";
import Vue from "vue";

// property changes must be done on first level only (ex. workflow.on = bla)
// if changes occur in deeper level (ex. workflow.on.push = bla) state changes won't be triggered
export const workflow: Workflow = Vue.observable({
  on: {
    pull_request: {
      branches: ["a", "b", "c"],
      // "branches-ignore": ["def", "ghi"],
      // tags: ["v1.*", "v2.*"],
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
): void {
  const config = { ...workflow.on[trigger], [type]: items };
  workflow.on = { ...workflow.on, [trigger]: config };
}

export function deletePushPr(
  trigger: "push" | "pull_request",
  type: BranchType
): void {
  const config = workflow.on[trigger];
  if (config?.[type]) {
    delete config[type];

    if (Object.keys(config).length === 0) {
      delete workflow.on[trigger];
      workflow.on = { ...workflow.on }; // re-trigger rx
    } else {
      workflow.on = { ...workflow.on, [trigger]: config };
    }
  }
}

export function setSchedule(schedule: CronConfig[]): void {
  workflow.on = { ...workflow.on, schedule };
}

export function setManual(): void {
  workflow.on = { ...workflow.on, workflow_dispatch: {} };
}
