import { Env } from "@/types/Env";

export interface Step {
  uses: string;
  name: string;
  run: string;
  env: Env;
}
