import { writable } from "svelte/store";

import type { LocalStorageData } from "$lib/@types";

import { defaultData } from "./default";
const keys = {
  data: "A-chuan-data",
  version: "A-chuan-version",
} as const;

const currentVersion = "1";

export const appData = writable(loadData());
appData.subscribe((newValue) => saveData(newValue));

export function loadData() {
  const version = localStorage.getItem(keys.version);

  if (version !== currentVersion) {
    localStorage.clear();
    localStorage.setItem(keys.version, currentVersion);
    localStorage.setItem(keys.data, JSON.stringify(defaultData));
  }

  const data = JSON.parse(
    localStorage.getItem(keys.data) ?? ""
  ) as LocalStorageData;

  return data;
}

export function saveData(data: LocalStorageData) {
  localStorage.setItem(keys.data, JSON.stringify(data));
  console.log("DATA SAVED");
}
