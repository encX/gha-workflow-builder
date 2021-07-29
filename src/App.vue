<template>
  <div id="app" class="container">
    <TriggerBuilder />
    <JobsBuilder />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import TriggerBuilder from "./components/TriggerBuilder.vue";
import JobsBuilder from "@/components/JobsBuilder.vue";
import Footer from "@/components/Footer.vue";

@Component({
  components: { TriggerBuilder, JobsBuilder, Footer },
})
export default class App extends Vue {}
</script>
