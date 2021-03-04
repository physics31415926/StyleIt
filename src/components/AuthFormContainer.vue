<template>
  <AuthForm
    :isLogin="isLogin"
    :errorMessage="errorMessage"
    v-on:submit="handleAuth(...$event)"
  />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { firebaseApp } from "@/firebase";
import AuthForm from "./AuthForm.vue";
import { FirebaseError } from "firebase";
import { store } from "@/store";

@Component({
  components: { AuthForm }
})
export default class AuthFormContainer extends Vue {
  @Prop({ default: true })
  public isLogin!: boolean;

  public errorMessage = "";

  handleAuth(email: string, password: string) {
    if (!email || !password) {
      this.errorMessage = "Please fill in both fileds";
      return;
    }

    store.loadingState.auth = true;

    const auth = firebaseApp.auth();
    const promise = this.isLogin
      ? auth.signInWithEmailAndPassword(email, password)
      : auth.createUserWithEmailAndPassword(email, password);

    promise
      .then(() => setTimeout(() => this.$router.push({ name: "Home" })))
      .catch((err: FirebaseError) => {
        switch (err.code) {
          case "auth/user-not-found":
            err.message =
              "Sorry, there's no matching user account. Please check your email address again or Sign up.";
            break;
        }
        this.errorMessage = err.message;
      })
      .finally(() => (store.loadingState.auth = false));
  }
}
</script>
