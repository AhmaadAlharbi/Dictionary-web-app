<template>
  <div
    class="container mx-auto flex flex-col max-w-3xl"
    :class="`font-${dynamicFont}`"
  >
    <Navbar @font="setFont" />
    <Search @word="handleWord" @error="handleError" />
    <!-- Word -->
    <div>
      <div class="mt-14 flex flex-col justify-center items-center" v-if="error">
        <img src="./assets/images/emoji.png" alt="" />
        <h1 class="font-bold mt-4 dark:text-white">{{ error }}</h1>
        <p class="mt-4 text-gray-500 text-center">
          Sorry pal, we couldn't find definitions for the word you were looking
          for. You can try the search again at later time or head to the web
          instead.
        </p>
      </div>
      <div v-else>
        <div class="mt-14 flex justify-between items-center">
          <div class="space-y-5" v-if="dictionaryWord">
            <h1 class="text-5xl font-bold dark:text-white">
              {{ dictionaryWord.word }}
            </h1>
            <p class="text-[#A445ED] text-xl">{{ dictionaryWord.phonetic }}</p>
            <!-- <div v-if="dictionaryWord.phonetics" class="text-purple-800">
          <p
            v-for="(phonetic, index) in dictionaryWord.phonetics"
            :key="index"
            class="text-2xl"
          >
            <span> {{ phonetic.text }}</span>
          </p>
        </div> -->
          </div>
          <div class="cursor-pointer">
            <img
              v-if="audioSrc"
              src="./assets/images/icon-play.svg"
              @click="playSound(audioSrc)"
              alt=""
            />
          </div>
        </div>
        <div class="mt-10" v-if="dictionaryWord">
          <Details :dictionaryWord="dictionaryWord" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Search from "./components/Search.vue";
import Details from "./components/Details.vue";
import { ref, computed } from "vue";
export default {
  components: { Navbar, Search, Details },
  setup() {
    const dictionaryWord = ref(null);
    const dynamicFont = ref("fontInter");
    const phonetic = ref("");
    const error = ref(null);
    const handleError = (err) => {
      error.value = err;
    };
    const handleWord = async (data) => {
      error.value = null;
      console.log(data[0]);
      if (!data) {
        console.log(data);
      }
      dictionaryWord.value = data[0];
    };
    const setFont = (font) => {
      switch (font) {
        case "San Serif":
          dynamicFont.value = "fontInter";
          break;
        case "Serif":
          dynamicFont.value = "fontLora";
          break;
        case "Mono":
          dynamicFont.value = "fontInconsolata";
          break;
      }
    };
    const audioSrc = computed(() => {
      // Find the first phonetic object in the phonetics array that has an audio property
      const sound = dictionaryWord.value
        ? dictionaryWord.value.phonetics.find((s) => s.audio)
        : undefined;

      // If such a phonetic object is found, return its audio property
      if (sound) {
        return sound.audio;
      } else {
        // Otherwise, return undefined
        return undefined;
      }
    });

    const playSound = (wordSound) => {
      const audio = new Audio(wordSound);
      audio.play();
    };
    return {
      error,
      handleError,
      audioSrc,
      handleWord,
      dictionaryWord,
      phonetic,
      setFont,
      dynamicFont,
      playSound,
    };
  },
};
</script>

<style>
</style>