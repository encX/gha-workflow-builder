<template>
  <Rows>
    <div>
      Manual trigger
      <span class="ml-1 is-family-monospace">(workflow_dispatch)</span>
    </div>
  </Rows>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Rows from "@/components/DisplayAid/Rows.vue";

@Component({
  components: { Rows },
})
export default class ManualGroup extends Vue {}
</script>
