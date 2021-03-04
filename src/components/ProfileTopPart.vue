<template>
  <div class="parent">
    <div class="top">
      <img
        src="../assets/portrait.png"
        width="70px"
        height="70px"
        class="portrait"
      />
      <div class="email">{{ userEmail }}</div>
      <a @click="logout()">Log Out</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { store } from "@/store";

@Component
export default class ProfileTopPart extends Vue {
  get userEmail(): string {
    return store.user?.email || "Email not found!";
  }

  logout() {
    this.$emit("logout");
  }
}
</script>

<style scoped>
.parent {
  height: 100%;
  overflow-x: auto;
}
.top {
  text-align: center;
  margin: 0 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: var(--dark-blue);
  border-radius: 10px;
}

.email {
  font-size: 0.7em;
  margin-bottom: 0.5rem;
}

a {
  font-size: 0.7em;
  text-decoration: underline;
  cursor: pointer;
}
.portrait {
  margin-bottom: 1rem;
}
</style>
