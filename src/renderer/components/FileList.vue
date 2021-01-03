<template>
  <section>
    <div class="container mx-auto p-10 grid grid-cols-2 gap-6">
      <FileCard v-for="file in shownFiles" :file="file"/>
    </div>
    <p v-if="shownFiles.length === 0" class="text-center">Es sieht so aus, als ob keine Datei verfügbar ist. </p>
  </section>
</template>
<script>
import FileCard from "./FileCard";

export default {
  components: { FileCard },
  data() {
    return {
      searchTerm: "",
      folder: "Alle Order"
    }
  },
  mounted() {
    const self = this;
    this.$root.$on("folder", folder => self.folder = folder)
    this.$root.$on("search", term => self.searchTerm = term)
  },
  computed: {
    shownFiles() {
      const self = this;

      if (this.folder === "Alle Order")
        return this.$store.state.files.files.filter(file => file.name.toUpperCase().includes(self.searchTerm.toUpperCase()));
      else
        return this.$store.state.files.files.filter(file =>
            file.name.toUpperCase().includes(self.searchTerm.toUpperCase()) &&
            file.folder.replace(/^.*[\\\/]/, '') === self.folder);
    }
  }
}
</script>
<style scoped>
.gap-6 {
  grid-row-gap: 1.5rem;
  grid-column-gap: 1.5rem;
}
</style>