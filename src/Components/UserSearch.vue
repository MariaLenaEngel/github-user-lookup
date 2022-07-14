<script setup lang="ts">
import { ref } from "vue";
import SearchBox from "./SearchBox.vue";
import UserDetails from "./UserDetails.vue";

type TUser = { username: string; reposUrl: string; avatarUrl: string };

const users = ref<TUser[]>([]);
const searchInput = ref<string>("");
const selectedUser = ref<TUser | null>(null);
const isLoading = ref<boolean>(false);

const searchByUsername = async (username: string) => {
  if (!username) {
    users.value = [];
    return;
  }

  isLoading.value = true;
  const response = await fetch(
    `https://api.github.com/search/users?q=${username}in:login`
  );

  if (response.ok) {
    const data: {
      items: { login: string; repos_url: string; avatar_url: string }[];
    } = await response.json();
    users.value = data.items.map((item) => ({
      username: item.login,
      reposUrl: item.repos_url,
      avatarUrl: item.avatar_url,
    }));
    isLoading.value = false;
  }
};

const handleSelectUsername = (username: string) => {
  const suggestedUser = users.value.find((user) => user.username === username);
  if (suggestedUser) {
    selectedUser.value = suggestedUser;
    users.value = [];
  } else {
    selectedUser.value = null;
  }
};

const handleSearchChange = (searchQuery: string) => {
  if (!searchQuery) {
    users.value = [];
    selectedUser.value = null;
  }
  searchInput.value = searchQuery;
  searchByUsername(searchQuery);
};
</script>
<template>
  <div class="acc-Account">
    <div class="acc-Search">
      <SearchBox
        @handle-search-change="handleSearchChange"
        @handle-click="handleSelectUsername"
        :users="users"
      />
    </div>
    
    <div 
      v-if="
        users.length === 0 &&
        searchInput.length > 1 &&
        !isLoading &&
        !selectedUser
      ">
      <span>Sorry, no results found</span>
    </div>
    <div v-if="selectedUser !== null" class="acc-Account_Details">
      <h1 class="acc-Account_Heading">User</h1>
      <UserDetails :selected-user="selectedUser" />
    </div>
  </div>
</template>

<style>
@import "@/assets/search.css";
@import "@/assets/account.css";
</style>


