<template>
  <div class="job box">
    <h3 class="title is-4">Job `{{ jobId }}`</h3>

    <div class="columns">
      <div class="column">
        <b-field label="Job Id" type="is-success">
          <b-input v-model="jobId"></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Runs on">
          <b-select placeholder="Select runner OS" expanded>
            <option v-for="type in RunsOn" :key="type">{{ type }}</option>
          </b-select>
        </b-field>
      </div>
    </div>

    <hr />

    <b-field label="Environment variables">
      <EnvEditor :job-id="jobId" site="job" />
    </b-field>

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
import EnvEditor from "@/components/JobsBuilders/EnvEditor.vue";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { GitHubRunner } from "@/types/Job/job";
import Rows from "@/components/DisplayAid/Rows.vue";
import EnvItemEditor from "@/components/JobsBuilders/EnvItemEditor.vue";

@Component({
  components: { EnvEditor, Rows, EnvItemEditor },
})
export default class JobBuilder extends Vue {
  @Prop({ required: true }) private jobId!: string;

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
}
</script>

<style scoped></style>
