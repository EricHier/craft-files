<template>
  <div v-show="visible" class="fixed top-0 left-0 w-screen h-screen p-10 bg-black bg-opacity-50 z-20">
    <div class="rounded p-6 bg-white max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Aktivierte Order</h1>
      <div class="mb-4">
        <p v-for="folder in $store.state.files.folders">{{ folder }}</p>
      </div>
      <button @click="select" class="button">Neuen Order hinzufügen</button>
      <button @click="deleteAll" class="button">Alle Order löschen</button>
    </div>
    <button class="block mx-auto p-4 text-white font-bold text-sm mt-2" @click.stop="visible = false">Popup schließen</button>
  </div>
</template>
<script>
import { ipcRenderer } from "electron";

export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    select: () => ipcRenderer.send("select-dirs"),
    deleteAll: () => ipcRenderer.send("delete-dirs")
  },
  mounted() {
    const self = this;
    this.$root.$on('manageFolders', () => self.visible = true)
  }
}
</script>