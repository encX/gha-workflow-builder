<template>
  <div class="job box">
    <h3 class="title is-4">Job `{{ jobId }}`</h3>

    <b-field label="Job Id" type="is-success">
      <b-input v-model="jobId"></b-input>
    </b-field>
    <hr />
    <b-field label="Runs on">
      <b-select placeholder="Select runner OS">
        <option v-for="type in RunsOn" :key="type">{{ type }}</option>
      </b-select>
    </b-field>
    <hr />
    <b-field label="Environment variables">
      <b-table
        v-if="jobEnv.length > 0"
        :data="jobEnv"
        :columns="envColumns"
      ></b-table>
    </b-field>
    <div class="buttons">
      <b-button type="is-primary">Add</b-button>
    </div>
    <hr />

    <b-field label="Steps">
      <div class="content">
        <ol>
          <li>Use action: <b>actions/checkout@v2</b></li>
          <li>Use action: <b>actions/setup-node@v1</b></li>
          <li>Step name (Run: <b>yarn publish</b>)</li>
        </ol>
      </div>
    </b-field>
    <div class="buttons">
      <b-button type="is-primary">Add</b-button>
      <b-button type="is-primary is-light">Use action</b-button>
      <b-button type="is-primary is-light">Run a command</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { GitHubRunner } from "@/types/Job/job";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class JobBuilder extends Vue {
  private jobId = "todo-validation";
  private readonly RunsOn: GitHubRunner[] = [
    "macos-10.15",
    "macos-11.0",
    "macos-latest",
    "ubuntu-16.04",
    "ubuntu-18.04",
    "ubuntu-20.04",
    "ubuntu-latest",
    "windows-2016",
    "windows-2019",
    "windows-latest",
  ];

  private jobEnv: EnvTable[] = [
    { varName: "KEY1", value: "value1" },
    { varName: "KEY2", value: "value2" },
  ];

  private envColumns: BTableColumn[] = [
    { field: "varName", label: "Variable" },
    { field: "value", label: "Value" },
  ];
}

interface EnvTable {
  varName: string;
  value: string;
}

interface BTableColumn {
  field: string;
  label: string;
  width?: string;
  numeric?: boolean;
  centered?: boolean;
}
</script>

<style scoped></style>
