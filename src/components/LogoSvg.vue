<template>
  <svg :id="this.$options.name"
    version="1.1"
    viewBox="0 0 36.815 42.474"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:cc="http://creativecommons.org/ns#"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  >
    <g transform="translate(0 -254.53)">
      <g transform="matrix(1 0 0 1 0 -.048502)">
        <path
          class="LogoAllPaths"
          :style="'fill: ' + color + ';'"
          transform="scale(.26458)"
          d="m77.68 966.9-9.4375 18.93 21.404 32.332 19.201-33.33z"
        ></path>
        <path
          class="LogoAllPaths"
          :style="'fill: ' + color + ';'"
          transform="scale(.26458)"
          d="m111.63 986.44-20.004 34.723 32.104 48.496 15.354-25.049-0.0644-42.412z"
        ></path>
        <path
          class="LogoAllPaths"
          :style="'fill: ' + color + ';'"
          transform="scale(.26458)"
          d="m139.1 1050.7-13.404 21.869 8.4394 12.75 5.0117-2.9043z"
        ></path>
        <path
          class="LogoAllPaths"
          :style="'fill: ' + color + ';'"
          transform="scale(.26458)"
          d="m131.35 1087-7.5078-11.34-14.912 24.328z"
        ></path>
        <path
          class="LogoAllPaths"
          :style="'fill: ' + color + ';'"
          transform="scale(.26458)"
          d="m82.375 1115.4-26.48-32.162-13.66 23.711 27.459 15.799z"
        ></path>
        <path
          class="LogoAllPaths"
          :style="'fill: ' + color + ';'"
          transform="scale(.26458)"
          d="m39.449 1105.3 14.264-24.76-20.361-24.73-17.814 35.73z"
        ></path>
        <path
          class="LogoAllPaths"
          :style="'fill: ' + color + ';'"
          transform="scale(.26458)"
          d="m12.744 1089.9 18.371-36.844-31.096-37.768 0.10156 67.348z"
        ></path>
        <path
          class="LogoAllPaths"
          :style="'fill: ' + color + ';'"
          transform="scale(.26458)"
          d="m0.011719 1010.3 32.672 39.684 31.854-63.885-10.068-15.209-54.469 31.557z"
        ></path>
        <path
          class="LogoAllPaths"
          :style="'fill: ' + color + ';'"
          transform="scale(.26458)"
          d="m57.256 969.23 8.9375 13.502 8.6953-17.439-5.4375-3.1289z"
        ></path>
        <path
          class="LogoAllPaths"
          :style="'fill: ' + color + ';'"
          transform="scale(.26458)"
          d="m66.193 982.74-1.6562 3.3223 2.0488 3.0957 1.6562-3.3223z"
        ></path>
        <path
          class="LogoAllPaths"
          :style="'fill: ' + color + ';'"
          transform="scale(.26458)"
          d="m66.586 989.15-31.664 63.506 20.504 24.906 32.428-56.287z"
        ></path>
        <path
          class="LogoAllPaths"
          :style="'fill: ' + color + ';'"
          transform="scale(.26458)"
          d="m87.854 1021.3 1.9824 2.9961 1.7949-3.1152-1.9844-2.9961z"
        ></path>
        <path
          class="LogoAllPaths"
          :style="'fill: ' + color + ';'"
          transform="scale(.26458)"
          d="m89.836 1024.3-32.229 55.941 27.584 33.504 17.889-10.365 18.801-30.674z"
        ></path>
        <path
          class="LogoAllPaths"
          :style="'fill: ' + color + ';'"
          transform="scale(.26458)"
          d="m121.88 1072.7 1.959 2.9571 1.8535-3.0235-1.959-2.959z"
        ></path>
        <path
          class="LogoAllPaths"
          :style="'fill: ' + color + ';'"
          transform="scale(.26458)"
          d="m57.607 1080.2-2.1816-2.6504-1.7129 2.9727 2.1816 2.6504z"
        ></path>
        <path
          class="LogoAllPaths"
          :style="'fill: ' + color + ';'"
          transform="scale(.26458)"
          d="m34.922 1052.7-2.2383-2.7168-1.5684 3.1464 2.2363 2.7188z"
        ></path>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
    name: "LogoSvg",
    props: {
        color: {
            type: String,
            default: "#5bc0de"
        }
    }
}
</script>

<style scoped>
.logoAllPaths {
    
    fill-rule: evenodd;
}
</style>
