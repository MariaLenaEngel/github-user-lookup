import { ref } from "vue";

export type repo = {
  name: string;
  full_name: string;
  owner: {
    login: string;
  };
};

const STORAGE_KEY = "ghFinderLikes";

export const useGetLocalStorage = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");

export const useSetLocalStorage = <T>(data: T) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

export const useLocalStorage = () => {
  const repoLikeMap = ref<{ [key: string]: repo }>(useGetLocalStorage());

  const useSaveLike = (repo: repo) => {
    const existingRepos = useGetLocalStorage();
    const dataToBeUpdate = {
      ...existingRepos,
      [`${repo.owner.login}_${repo.name}`]: {
        name: repo.name,
        full_name: repo.full_name,
        owner: { login: repo.owner.login },
      },
    };

    useSetLocalStorage(dataToBeUpdate);
    repoLikeMap.value = dataToBeUpdate;
  };

  const useRemoveLike = (repoOwnerLoginAndName: string) => {
    const existingRepos = useGetLocalStorage();
    delete existingRepos[repoOwnerLoginAndName];
    useSetLocalStorage(existingRepos);
    repoLikeMap.value = existingRepos;
  };

  return { useSaveLike, useRemoveLike, repoLikeMap };
};