<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="106"
    height="58"
    fill="none"
    viewBox="0 0 106 58"
    class="logo-svg"
  >
    <ellipse cx="53" cy="29" fill="url(#a)" rx="53" ry="29" />
    <circle class="first" cx="32" cy="29" r="6" fill="#1D90F5" />
    <circle class="second" cx="53" cy="29" r="6" fill="#1D90F5" />
    <circle class="third" cx="75" cy="29" r="6" fill="#1D90F5" />
    <defs>
      <linearGradient
        id="a"
        x1="53"
        x2="53"
        y1="0"
        y2="58"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#fff" />
        <stop offset="1" stop-color="#7279B4" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.logo-svg {
  width: 4rem;
  circle {
    animation: 2s animate infinite;
  }
  .first {
    animation-delay: 0s;
  }
  .second {
    animation-delay: 1s;
  }
  .third {
    animation-delay: 2s;
  }
  // circle {
  //   &:hover {
  //     transform: scale(1.2);
  //   }
  // }
}

@keyframes animate {
  0% {
  }
  10% {
    fill: $red;
    transform: translateY(0.2rem);
  }
  20% {
    transform: translateY(-0.2rem);
    fill: $blue;
  }
}
</style>
