<template>
  <div class="signup">
    <form @submit.prevent="handleSubmit()">
      <div class="formField">
        <input type="email" placeholder="Email Address" v-model="email" />
      </div>
      <div class="formField">
        <input type="password" placeholder="Password" v-model="password" />
      </div>
      <p class="errorMessage" v-if="errorMessage">{{ errorMessage }}</p>
      <button class="btn btnPrimary loginButton" :disabled="isAuthLoading">
        {{ isLogin ? "Log in" : "Sign up" }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { store } from "@/store";

@Component
export default class AuthForm extends Vue {
  @Prop({ default: true })
  public isLogin!: boolean;

  @Prop({ default: "" })
  public errorMessage!: string;

  get isAuthLoading(): boolean {
    return store.loadingState.auth;
  }

  public email = "";
  public password = "";

  handleSubmit() {
    this.$emit("submit", [this.email, this.password]);
  }
}
</script>

<style scoped>
.formField {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.formField > input {
  border: 0;
}

.formField::after {
  content: "";
  display: block;
  border-bottom: 1.8px solid lightgrey;
}

.formField:focus-within::after {
  border-color: var(--main-blue);
}

.loginButton {
  width: 100%;
  margin-top: 1rem;
}
.errorMessage {
  color: red;
}
</style>
