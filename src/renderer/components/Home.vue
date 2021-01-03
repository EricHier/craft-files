<template>
  <div>
    <Heading/>
    <FileList/>
    <MangeFoldersPopup/>
  </div>
</template>
<script>
import Heading from "./gui-components/Heading";
import FileList from "./FileList";
import MangeFoldersPopup from "./MangeFoldersPopup";
import { ipcRenderer } from "electron";

export default {
  components: { MangeFoldersPopup, FileList, Heading },
  mounted() {
    this.$store.dispatch("subscribeUpdates")
    ipcRenderer.send("load");
  }
}
</script>