import { RootState } from "@/stores/index";
import { CronConfig } from "@/types/Trigger/cronConfig";
import { BranchType } from "@/types/Trigger/pushPrConfig";
import { Workflow } from "@/types/workflow";
import { Module } from "vuex";

interface SetPushPrPayload {
  trigger: "push" | "pull_request";
  type: BranchType;
  items: string[];
}

interface DeletePushPrPayload {
  trigger: "push" | "pull_request";
  type: BranchType;
}

const store: Module<Workflow, RootState> = {
  state: () => ({
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
  }),
  mutations: {
    setPushPr(state: Workflow, { trigger, type, items }: SetPushPrPayload) {
      const config = { ...state.on[trigger], [type]: items };
      state.on = { ...state.on, [trigger]: config };
    },

    deletePushPr(state: Workflow, { type, trigger }: DeletePushPrPayload) {
      const config = state.on[trigger];
      if (config?.[type]) {
        delete config[type];

        if (Object.keys(config).length === 0) {
          delete state.on[trigger];
          state.on = { ...state.on }; // re-trigger rx
        } else {
          state.on = { ...state.on, [trigger]: config };
        }
      }
    },

    setSchedule(state: Workflow, schedule: CronConfig[]): void {
      state.on = { ...state.on, schedule };
    },

    setManual(state: Workflow): void {
      state.on = { ...state.on, workflow_dispatch: {} };
    },
  },
};

export default store;
// property changes must be done on first level only (ex. workflow.on = bla)
// if changes occur in deeper level (ex. workflow.on.push = bla) state changes won't be triggered
