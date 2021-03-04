<template>
  <div class="container">
    <div class="card">
      <div class="cover">
        <div class="title">StyleIT</div>
        <p class="intro">
          Experience fun image styling with our special filters and become an
          artist.
        </p>
      </div>
      <div class="content-container">
        <div class="content">
          <div class="logo">
            <img src="../assets/logo.png" />
          </div>
          <div class="tabs">
            <div
              v-bind:class="{ selected: selectedTab === 0 }"
              @click="selectedTab = 0"
            >
              Log in
            </div>
            <div
              v-bind:class="{ selected: selectedTab === 1 }"
              @click="selectedTab = 1"
            >
              Sign up
            </div>
          </div>
          <div class="forms">
            <AuthFormContainer v-if="selectedTab === 0" key="0" />
            <AuthFormContainer
              v-if="selectedTab === 1"
              key="1"
              :isLogin="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AuthFormContainer from "@/components/AuthFormContainer.vue";
import Component from "vue-class-component";

@Component({
  components: {
    AuthFormContainer
  }
})
export default class LoginView extends Vue {
  public selectedTab = 0;
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.card {
  width: 70%;
  height: 85%;
  display: flex;
  background-color: white;
}

.cover {
  flex: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: url("../assets/login-page-cover.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  font-weight: 900;
  font-family: Arial, sans-serif;
  font-size: 36px;
  user-select: none;
}

.title {
  margin: 0 10%;
  margin-bottom: 1rem;
}

.intro {
  font-size: 16px;
  margin: 0% 20%;
  text-align: center;
  font-family: "Open Sans", sans-serif;
}

.content-container {
  flex: 0.5;
}

.content {
  padding: 3rem 15%;
  color: black;
}

.logo {
  text-align: center;
  user-select: none;
}

.logo img {
  width: 60px;
}

.tabs {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.tabs div {
  cursor: pointer;
  padding-bottom: 0.5rem;
}

.tabs div.selected {
  font-weight: bolder;
  border-bottom: 2px solid var(--main-blue);
}

.forms {
  margin-top: 1rem;
}

@media screen and (max-width: 1024px) {
  .card {
    width: 85%;
  }
}

@media screen and (max-width: 620px) {
  .card {
    flex-direction: column;
    width: 95%;
  }

  .cover {
    flex: 0.3;
  }

  .content-container {
    flex: 0.7;
  }

  .content {
    padding: 1rem 15%;
  }

  .intro {
    font-size: 14px;
  }

  .logo img {
    width: 40px;
  }
}
</style>
