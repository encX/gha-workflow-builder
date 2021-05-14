<template>
  <div>
    <h4 class="title is-5">Schedule</h4>
    <b-field
      message="Learn more about crontab syntax: https://crontab.guru/"
      grouped
    >
      <b-input placeholder="crontab syntax" v-model="newCron" />
    </b-field>
    <div class="buttons">
      <b-button class="button is-primary" @click="done">Done</b-button>
      <b-button class="button" @click="onCancel">Cancel</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { setSchedule, workflow } from "@/store";
import { CronConfig } from "@/types/Trigger/cronConfig";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class ScheduleBuilder extends Vue {
  @Prop({ default: () => () => null }) private readonly onComplete!: () => void;
  @Prop({ default: () => () => null }) private readonly onCancel!: () => void;

  private config: CronConfig[] = [];
  private newCron = "";

  created(): void {
    this.config = workflow.on?.schedule ?? [];
  }

  private done(): void {
    this.config = [...this.config, { cron: this.newCron }];
    setSchedule(this.config);
    this.onComplete();
  }
}
</script>

<style scoped></style>
