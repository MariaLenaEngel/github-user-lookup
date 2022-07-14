<script setup lang="ts">
  import SearchIcon from "@/assets/icon-search.svg";

  defineProps(["users"]);
  defineEmits(["handleSearchChange", "handleClick"]);
</script>
<template>
  <input
    @input="
      $emit('handleSearchChange', ($event.target as HTMLInputElement).value)
    "
    class="acc-Search_Input"
    type="text"
    placeholder="Type a GitHub username"
  />
  <img class="acc-Search_Icon" :src="SearchIcon" alt="search"/>
  <div 
    v-if="users.length !== 0"
    class="acc-Search_Auto">
    <div
      @click="$emit('handleClick', ($event.target as HTMLDivElement).innerText)"
      v-for="user in users"
      :key="user.username"
    >
      {{ user.username }}
    </div>
  </div>
</template>
