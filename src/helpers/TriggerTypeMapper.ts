import { Trigger } from "@/types/Trigger/trigger";

export type TriggerKey = keyof Trigger;

export function getTriggerTitle(key: TriggerKey): string {
  switch (key) {
    case "push":
      return "Push";
    case "pull_request":
      return "Pull Request";
    case "schedule":
      return "Schedule";
    case "workflow_dispatch":
      return "Manual";
  }
}
