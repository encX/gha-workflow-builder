import { Env } from "@/types/Env";
import { Step } from "@/types/Job/step";

export interface Job {
  "runs-on": GitHubRunner;
  env: Env;
  steps: Step[];
}

export type GitHubRunner =
  | "macos-10.15"
  | "macos-11.0"
  | "macos-latest"
  | "self-hosted"
  | "ubuntu-16.04"
  | "ubuntu-18.04"
  | "ubuntu-20.04"
  | "ubuntu-latest"
  | "windows-2016"
  | "windows-2019"
  | "windows-latest";
