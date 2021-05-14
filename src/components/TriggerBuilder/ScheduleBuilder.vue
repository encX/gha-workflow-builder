<template>
  <div>
    <h4 class="title is-5">Schedule</h4>
    <b-field grouped>
      <template v-slot:message>
        Learn more about syntax at
        <a href="https://crontab.guru/" target="_blank">crontab guru</a>.
      </template>
      <b-input placeholder="crontab syntax" v-model="newCron" />
    </b-field>
    <div class="buttons">
      <b-button class="button is-primary" @click="done">Done</b-button>
      <b-button class="button" @click="onCancel">Cancel</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { setSchedule, workflow } from "@/store";
import { CronConfig } from "@/types/Trigger/cronConfig";

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
