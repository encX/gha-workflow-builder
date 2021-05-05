import { Job } from "@/types/Job/job";
import { Trigger } from "@/types/Trigger/trigger";

export interface Workflow {
  name: string;
  on: Trigger;
  jobs: {
    [name: string]: Job;
  };
}
