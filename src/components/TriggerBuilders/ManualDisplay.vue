<template>
  <Rows><div>Manual trigger (workflow dispatch)</div></Rows>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Rows from "@/components/DisplayAid/Rows.vue";

@Component({
  components: { Rows },
})
export default class ManualDisplay extends Vue {}
</script>
