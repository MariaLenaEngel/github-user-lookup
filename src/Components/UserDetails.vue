<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useLocalStorage, type repo } from "@/Composables/local-storage";

import HeartEmptyIcon from "@/assets/icon-heart-empty.svg";
import HeartFilledIcon from "@/assets/icon-heart-filled.svg";
import ButtonIcon from "@/assets/icon-dots.svg";

const props = defineProps(["selectedUser"]);
const repos = ref<repo[]>([]);
const { useRemoveLike, useSaveLike, repoLikeMap } = useLocalStorage();

const handleLikeClick = (repository: repo) => {
  useSaveLike(repository);
};

const handleDislikeClick = (repoOwnerLoginAndName: string) => {
  useRemoveLike(repoOwnerLoginAndName);
};

watch(
  () => props.selectedUser,
  (newValue) => {
    fetchUserRepos(newValue.reposUrl);
  }
);

const fetchUserRepos = async (repoLink: string) => {
  const response = await fetch(repoLink);
  if (response.ok) {
    const data = await response.json();
    repos.value = data;
  }
};

onMounted(() => {
  if (props.selectedUser) {
    fetchUserRepos(props.selectedUser.reposUrl);
  }
});
</script>

<template>
  <div class="acc-Account_Item acc-User">
    <div class="acc-User_Picture">
      <img class="acc-User_Picture" width="200" :src="selectedUser.avatarUrl" alt="profile picture"/>
    </div>
    <div class="acc-User_Content">
      <div class="acc-User_Name">
        <h2>{{ selectedUser.username }}</h2>
      </div>
      <div class="acc-User_Link">
        <a :href="selectedUser.htmlUrl" class="btn-Button btn-Button-primary" target="_blank" alt="View profile">
          <span>View profile</span>
          <span class="btn-Button_Icon">
            <img :src="ButtonIcon" alt="icon"/>
          </span>
        </a>
      </div>
    </div>
  </div>
  <div class="acc-Account_Item acc-Repos">
    <div class="acc-Repos_Row" v-for="repo of repos" :key="repo.name">
      {{ repo.name }}
      <img
        @click="() => handleLikeClick(repo)"
        v-if="!repoLikeMap[`${repo.owner.login}_${repo.name}`]"
        :src="HeartEmptyIcon"
        class="acc-Account_Icon"
        alt="save repo"
      />
      <img
        @click="() => handleDislikeClick(`${repo.owner.login}_${repo.name}`)"
        v-if="repoLikeMap[`${repo.owner.login}_${repo.name}`]"
        :src="HeartFilledIcon"
        class="acc-Account_Icon"
        alt="remove repo"
      />
    </div>
  </div>
</template>

