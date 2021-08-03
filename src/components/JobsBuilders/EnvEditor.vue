<template>
  <div>
    <Rows>
      <EnvItemEditor
        v-for="{ key, value, _id } in env"
        :key="_id"
        :id="_id"
        :k="key"
        :v="value"
        :on-save="onSaveEnv"
        :on-delete="onDeleteEnv"
      />
    </Rows>

    <div class="buttons">
      <b-button type="is-primary" @click="onAdd">Add</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ToastProgrammatic as Toast } from "buefy";

import { commit, workflow } from "@/stores";
import Rows from "@/components/DisplayAid/Rows.vue";
import EnvItemEditor from "@/components/JobsBuilders/EnvItemEditor.vue";

@Component({
  components: { Rows, EnvItemEditor },
})
export default class EnvEditor extends Vue {
  @Prop({ required: true }) private site!: "job"; // todo : add support for step & global
  @Prop({ default: "" }) private jobId!: string;

  private env: EnvState[] = Object.entries(
    workflow.jobs?.[this.jobId]?.env
  ).map(([key, value], ix) => ({ key, value, _id: Date.now() + ix }));

  private onAdd(): boolean {
    this.env.push({ key: "", value: "", _id: Date.now() });
  }

  private onSaveEnv(_id: number, key: string, value: string): boolean {
    const oldKey = this.env.findIndex((x) => x._id === _id);
    const existingNewKey = this.env.findIndex((x) => x.key === key);

    if (existingNewKey > -1 && existingNewKey !== oldKey) {
      Toast.open({ type: "is-danger", message: `Key ${key} alredy exist!` });
      return false;
    }

    if (oldKey > -1) {
      this.env.splice(oldKey, 1, { _id, key, value });
    } else {
      this.env.push({ key, value, _id: Date.now() });
    }

    this.commitToMainState();
    return true;
  }

  private onDeleteEnv(id: number): void {
    const ix = this.env.findIndex((x) => x._id === id);
    this.env.splice(ix, 1);
  }

  private commitToMainState(): void {
    const envObj = this.env.reduce(
      (acc, cur) => ({ ...acc, [cur.key]: cur.value }),
      {}
    );

    commit("patchJobEnv", { jobId: this.jobId, envObj });
  }
}

interface EnvState {
  key: string;
  value: string;
  _id: number;
}
</script>

<style scoped></style>
