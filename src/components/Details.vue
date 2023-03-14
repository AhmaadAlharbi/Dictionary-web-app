<template>
  <ul
    class="mt-10 space-y-4 mx-auto"
    v-for="(meaning, index) in dictionaryWord.meanings"
    :key="index"
  >
    <h3 class="text-2xl font-bold">
      {{ meaning.partOfSpeech }}
      <hr class="mt-5" />
    </h3>
    <span class="text-gray-500 mt-3 inline-block">Meaning</span>
    <ul class="space-y-4 mt-5">
      <li
        class="none marker:text-green"
        v-for="(definition, index) in meaning.definitions"
        :key="index"
      >
        {{ definition.definition }}
        <span class="text-gray-500 block"> {{ definition.example }}</span>
      </li>
    </ul>
    <ul v-if="meaning.synonyms">
      <p
        v-for="(synonym, index) in meaning.synonyms"
        :key="index"
        class="mt-10 text-gray-600 text-2xl"
      >
        synonyms <span class="text-purple-600"> {{ synonym }}</span>
      </p>
    </ul>
  </ul>
  <p class="text-gray-400">
    Source
    <a :href="dictionaryWord.sourceUrls[0]" class="ml-4">{{
      dictionaryWord.sourceUrls[0]
    }}</a>
  </p>
</template>

<script>
export default {
  props: ["dictionaryWord"],
};
</script>

<style scoped>
ul {
  list-style: none; /* Remove default bullets */
}

ul li::before {
  content: "\2022"; /* Add content: \2022 is the CSS Code/unicode for a bullet */
  color: rgb(157, 0, 255); /* Change the color */
  font-weight: bold; /* If you want it to be bold */
  display: inline-block; /* Needed to add space between the bullet and the text */
  width: 1em; /* Also needed for space (tweak if needed) */
  margin-left: -1em; /* Also needed for space (tweak if needed) */
}
</style>