<script setup lang="ts">
import HeartEmptyIcon from "@/assets/icon-heart-empty.svg";
import UserIcon from "@/assets/icon-user.svg";

</script>

<template>
 <div class="hd-Header">
  <div class="hd-Header_Nav">
    <div class="hd-Header_Item">
      <RouterLink to="/">
        <img class="hd-Header_Icon" :src="UserIcon" alt="user search"/>
      </RouterLink>
    </div>
    <div class="hd-Header_Item">
      <RouterLink class="hd-Header_Link" to="/favorites">
        <img class="hd-Header_Icon" :src="HeartEmptyIcon" alt="saved repos"/>
      </RouterLink>
    </div>
  </div>
  </div>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
@import "@/assets/define.css";
@import "@/assets/header.css";
</style>

