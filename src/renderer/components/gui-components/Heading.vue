<template>
  <section
      class="fixed top-0 w-screen h-fit p-10 flex flex-row items-center z-10 shadow bg-gradient-to-br from-gray-50 to-gray-100">
    <h1 class="text-2xl font-bold tracking-wide border-b border-gray-200 mr-10">Craft Files</h1>
    <input type="text" class="flex-grow p-2 rounded h-fit" placeholder="Suche..."
           @input="$root.$emit('search', $event.target.value)">
    <select class="ml-10 p-2" @change="$root.$emit('folder', $event.target.value)">
      <option>Alle Order</option>
      <option v-for="folder in $store.state.files.folders">{{ folder.replace(/^.*[\\\/]/, '') }}</option>
    </select>
    <button class="ml-10" @click="$root.$emit('manageFolders')">Einstellungen</button>
    <button class="ml-10" @click="refresh">Aktualisieren</button>
  </section>
</template>
<script>
import { ipcRenderer } from "electron";

export default {
  methods: {
    refresh() {
      ipcRenderer.send("load");
    }
  }
}
</script>