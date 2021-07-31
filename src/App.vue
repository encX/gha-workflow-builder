<template>
  <div id="app" class="container">
    <section class="hero is-primary">
      <div class="hero-body">
        <p class="title">Build your fucking workflow now</p>
        <p class="subtitle">or type your own YAML if you will</p>
      </div>
    </section>

    <TriggerBuilder />
    <hr />
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
