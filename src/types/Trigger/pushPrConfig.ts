export interface PushPrConfig {
  branches?: string[];
  tags?: string[];
  "branches-ignore"?: string[];
  "tags-ignore"?: string[];
}

export type BranchType = keyof PushPrConfig;
