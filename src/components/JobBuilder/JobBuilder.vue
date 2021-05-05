<template>
  <div class="jobs box">
    <h1 class="title">Jobs</h1>
    <h2 class="subtitle">These jobs will be executed</h2>

    <div class="buttons">
      <b-button class="is-primary">Add</b-button>
    </div>

    <div class="job box">
      <h2 class="title is-2">Job {{ jobId }}</h2>

      <b-field label="Job Id" type="is-success">
        <b-input v-model="jobId"></b-input>
      </b-field>

      <b-field label="Runs on">
        <b-select placeholder="Select runner OS">
          <option v-for="type in RunsOn" :key="type">{{ type }}</option>
        </b-select>
      </b-field>
    </div>
  </div>
</template>

<script lang="ts">
import { GitHubRunner } from "@/types/Job/job";
import { Vue, Component } from "vue-property-decorator";

@Component()
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
}
</script>

<style lang="scss" scoped></style>
