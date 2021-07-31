import Vue from "vue";
import Vuex, { Commit, Dispatch } from "vuex";

import { Workflow } from "@/types/workflow";
import WorkflowStateData from "@/stores/WorkflowState";
import TriggerBuilderStateData, {
  TriggerBuilderState,
} from "@/stores/TriggerBuilderState";

Vue.use(Vuex);

export interface RootState {
  workflow: Workflow;
  triggerBuilderState: TriggerBuilderState;
}

const root = new Vuex.Store<RootState>({
  modules: {
    workflow: WorkflowStateData,
    triggerBuilderState: TriggerBuilderStateData,
  },
});

export default root;
export const commit: Commit = root.commit;
export const dispatch: Dispatch = root.dispatch;
export const workflow: Workflow = root.state.workflow;
export const triggerBuilderState: TriggerBuilderState =
  root.state.triggerBuilderState;
