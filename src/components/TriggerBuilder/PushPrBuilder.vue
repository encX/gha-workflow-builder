<template>
  <div class="push-pr-builder">
    {{ type }} (TODO: format this text)
    <div class="buttons">
      <b-button v-on:click="onComplete" class="is-primary is-light">
        to branch ...
      </b-button>
      <b-button class="is-primary is-light">to all branch except ...</b-button>
      <b-button class="is-primary is-light">to tag ...</b-button>
      <b-button class="is-primary is-light">to all tag except ...</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class PushPrBuilder extends Vue {
  @Prop({ required: true }) private readonly type!: "pull_request" | "push";
  @Prop({ default: () => () => null }) private readonly onComplete!: () => void;
}
</script>

<style scoped></style>
