<template>
  <div class="px-3 mt-10">
    <form @keypress.enter.prevent="searchinDictionary">
      <input
        class="appearance-none block w-full max-w-4xl bg-gray-200 text-gray-700 border border-gray-200 rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        type="text"
        placeholder="Type a word"
        v-model="word"
      />
    </form>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  setup(props, context) {
    const word = ref("keyboard");
    const error = ref(null);
    const searchinDictionary = async () => {
      try {
        error.value = null;
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`
        );

        if (!response.ok) {
          throw Error("No Definitions Found");
        }

        const data = await response.json();

        if (!data || data.length === 0) {
          throw Error("No Definitions Found");
        }

        context.emit("word", data);
      } catch (err) {
        console.log(error);
        error.value = err.message;
        context.emit("error", err.message);
      }
    };
    onMounted(() => {
      searchinDictionary();
    });

    return { word, searchinDictionary };
    //data[0].word
    // data[0].phonetic
  },
};
</script>

<style>
</style>