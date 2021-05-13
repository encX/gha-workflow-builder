import { CronConfig } from "@/types/Trigger/cronConfig";
import { PushPrConfig } from "@/types/Trigger/pushPrConfig";

export interface Trigger {
  pull_request?: PushPrConfig;
  push?: PushPrConfig;
  schedule?: CronConfig[];
  workflow_dispatch?: Record<string, never>;
}
