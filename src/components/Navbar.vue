<template>
  <nav class="flex justify-between items-center mt-8">
    <!-- icon search -->
    <div>
      <img src="../assets/images/logo.svg" alt="" />
    </div>
    <div
      class="relative flex items-center justify-center space-x-8 md:space-x-16 dark:text-white"
    >
      <div>
        <p @click="showFonts">
          {{ selectedFont }}
          <i
            class="fa fa-angle-down cursor-pointer"
            style="font-size: 22px; margin-left: 10px; color: purple"
          ></i>
        </p>
        <div
          class="bg-white flex flex-col shadow-xl absolute top-0 right-10 m-10 w-full space-y-4 py-4 dark:bg-purple-600"
          v-if="fonts"
          @click="showFonts"
        >
          <p
            class="hover:text-purple-900 cursor-pointer ml-4"
            @click="selectFonts('San Serif')"
          >
            San serif
          </p>
          <p
            class="hover:text-purple-900 cursor-pointer ml-4"
            @click="selectFonts('Serif')"
          >
            Serif
          </p>
          <p
            class="hover:text-purple-900 cursor-pointer ml-4"
            @click="selectFonts('Mono')"
          >
            Mono
          </p>
        </div>
      </div>
      <!-- toggle switch -->
      <div class="space-x-10 flex items-center">
        <i class="fa fa-sun-o" style="font-size: 24px"></i>
        <label class="switch">
          <input
            type="checkbox"
            id="switch-icon"
            @click="toggleDark('switch-icon')"
          />
          <span class="slider round"></span>
        </label>
      </div>
      <!-- moon icon -->
      <div class="cursor-pointer" id="moon">
        <img src="../assets/images/icon-moon.svg" alt="" />
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
export default {
  setup(props, context) {
    const selectedFont = ref("Sans Serif");
    const theme = ref("light");

    const fonts = ref(false);
    const showFonts = () => {
      fonts.value = !fonts.value;
    };
    const selectFonts = (font) => {
      selectedFont.value = font;
      context.emit("font", font);
    };
    const toggleDark = (id) => {
      document.getElementById(id).addEventListener("change", function () {
        if (this.checked) {
          document.documentElement.classList.add("dark");
          theme.value = "dark";
        } else {
          document.documentElement.classList.remove("dark");
          theme.value = "light";
        }
      });
    };

    return {
      toggleDark,
      fonts,
      showFonts,
      selectFonts,
      selectedFont,
      theme,
    };
  },
};
</script>

<style scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #bbbbbb;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
input:checked + .slider {
  background-color: #a8288a;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>