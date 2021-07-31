import { RootState } from "@/stores/index";
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

interface SetSchedulePayload {
  index: number;
  cron: string;
}

const store: Module<Workflow, RootState> = {
  state: () => ({
    on: {},
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

    setSchedule(state: Workflow, { index, cron }: SetSchedulePayload): void {
      const _key = state.on.schedule?.[index]._key ?? Date.now().toString();
      if (state.on.schedule) state.on.schedule[index] = { cron, _key };
    },

    deleteSchedule(state: Workflow, index: number): void {
      state.on.schedule?.splice(index, 1);
      if (state.on.schedule?.length === 0) {
        delete state.on.schedule;
      }
    },

    addSchedule(state: Workflow): void {
      const cron = "";
      const _key = Date.now().toString();
      if (Array.isArray(state.on.schedule)) {
        state.on.schedule.push({ cron, _key });
      } else {
        state.on = { ...state.on, schedule: [{ cron, _key }] };
      }
    },

    setManual(state: Workflow): void {
      state.on = { ...state.on, workflow_dispatch: {} };
    },

    deleteManual(state: Workflow): void {
      delete state.on.workflow_dispatch;
      state.on = { ...state.on }; // re-trigger rx
    },
  },
  actions: {
    setPushPr(context, payload: SetPushPrPayload): void {
      const { trigger, type, items } = payload;
      if (items.length > 0) {
        context.commit("setPushPr", payload);
      } else {
        context.commit("deletePushPr", { trigger, type });
      }
    },
    setSchedule(context, payload: SetSchedulePayload): void {
      const { index, cron } = payload;
      if (cron.length === 0) {
        context.commit("deleteSchedule", index);
      } else {
        context.commit("setSchedule", payload);
      }
    },
  },
};

export default store;
// property changes must be done on first level only (ex. workflow.on = bla)
// if changes occur in deeper level (ex. workflow.on.push = bla) state changes won't be triggered
