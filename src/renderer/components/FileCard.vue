<template>
  <div class="s bg-white rounded-xl p-6 flex items-center cursor-pointer" @click="open">
    <img :src="file.image" alt="Vorschaubild" class="h-32 w-48 object-contain rounded"/>
    <div class="pl-6">
      <p class="text-xl font-bold mb-4">{{ file.name }}</p>
      <p class="select-none">{{ file.description }}</p>
    </div>
  </div>
</template>
<script>
import { ipcRenderer } from "electron";

export default {
  props: {
    file: {
      type: Object,
      required: true
    }
  },
  methods: {
    open() {
      ipcRenderer.send("open", `${this.file.folder}/${this.file.name}`)
    }
  }
}
</script>
<style>
.s {
  box-shadow: rgba(0, 0, 0, 0.125) 0px 6px 50px 0
}
</style>