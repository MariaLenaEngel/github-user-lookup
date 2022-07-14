<script setup lang="ts">
import { useLocalStorage } from "@/Composables/local-storage";

import HeartFilledIcon from "@/assets/icon-heart-filled.svg";

const { useRemoveLike, repoLikeMap } = useLocalStorage();
</script>
<template>
  <div class="acc-Account">
    <div class="acc-Account_Details">
      <h1 class="acc-Account_Heading">My favourite repos</h1>

      <div class="acc-Account_Item acc-Repos">
        <div class="acc-Repos_Row" v-for="repo of repoLikeMap" :key="repo.full_name">
          {{ repo.name }} ({{ repo.owner.login }})
          <img
            @click="() => useRemoveLike(`${repo.owner.login}_${repo.name}`)"
            v-if="repoLikeMap[`${repo.owner.login}_${repo.name}`]"
            :src="HeartFilledIcon"
            class="acc-Account_Icon"
            alt="remove repo"
          />
        </div>
      </div>
    </div>
  </div>
</template>


