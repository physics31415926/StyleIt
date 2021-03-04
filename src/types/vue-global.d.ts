import Vue from "vue";
import { VueToast } from "./vue-toast";

declare module "vue/types/vue" {
  interface VueConstructor {
    $toast: VueToast;
  }
}
