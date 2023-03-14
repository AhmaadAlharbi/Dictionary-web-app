<template>
  <div
    class="container mx-auto flex flex-col max-w-3xl"
    :class="`font-${dynamicFont}`"
  >
    <Navbar @font="setFont" />
    <Search @word="handleWord" />
    <!-- Word -->
    <div class="mt-14 flex justify-between items-center" v-if="dictionaryWord">
      <div class="space-y-5">
        <h1 class="text-5xl font-bold">{{ dictionaryWord.word }}</h1>
        <p class="text-purple-800 text-xl">{{ dictionaryWord.phonetic }}</p>
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
        <div v-for="(sound, index) in dictionaryWord.phonetics" :key="index">
          <img
            v-if="sound.audio"
            src="./assets/images/icon-play.svg"
            @click="playSound(sound.audio)"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="mt-10" v-if="dictionaryWord">
      <Details :dictionaryWord="dictionaryWord" />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Search from "./components/Search.vue";
import Details from "./components/Details.vue";
import { ref } from "vue";
export default {
  components: { Navbar, Search, Details },
  setup() {
    const dictionaryWord = ref(null);
    const dynamicFont = ref("fontInter");
    const phonetic = ref("");
    const handleWord = async (data) => {
      console.log(data[0]);
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
    const playSound = (wordSound) => {
      const audio = new Audio(wordSound);
      audio.play();
    };
    return {
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