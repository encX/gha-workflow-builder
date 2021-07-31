import Vue from "vue";
import Vuex, { Store } from "vuex";

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
export const commit = root.commit;
export const workflow = root.state.workflow;
export const triggerBuilderState = root.state.triggerBuilderState;
