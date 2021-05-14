<template>
  <div>
    <h4 class="title is-5">Schedule</h4>
    <b-field
      message="Learn more about crontab syntax: https://crontab.guru/"
      grouped
    >
      <b-input placeholder="crontab syntax" />
    </b-field>
    <div class="buttons">
      <b-button class="button is-primary" @click="onComplete">Done</b-button>
      <b-button class="button" @click="onCancel">Cancel</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class ScheduleBuilder extends Vue {
  @Prop({ default: () => () => null }) private readonly onComplete!: () => void;
  @Prop({ default: () => () => null }) private readonly onCancel!: () => void;
}
</script>

<style scoped></style>
