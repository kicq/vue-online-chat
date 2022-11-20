<template>
  <div class="send-input-block">
    <input placeholder="Send a message..." type="text" name="chat" id="" />
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="45"
        fill="none"
        viewBox="0 0 12 12"
      >
        <path
          class="line"
          fill="#fff"
          d="M5 6.5a.5.5 0 0 0 0-1v1Zm-3.5 0H5v-1H1.5v1Z"
        />
        <path
          class="triangle"
          stroke="#fff"
          d="m10.211 5.106-7.04-3.52a1 1 0 0 0-1.428.698l-.704 3.52a1 1 0 0 0 0 .392l.704 3.52a1 1 0 0 0 1.428.699l7.04-3.52a1 1 0 0 0 0-1.79Z"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.send-input-block {
  width: 85%;
  margin: 0 auto;
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  input {
    width: 100%;
    height: 3rem;
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    outline: none;
    padding: 0.5rem 1rem;
    &::placeholder {
      color: rgba($white, 0.6);
    }
    color: $white;
  }
  button {
    background: transparent;
    border: none;
    outline: none;
    svg {
      .line {
        fill: rgba(255, 255, 255, 0.75);
      }
      .triangle {
        stroke: rgba(255, 255, 255, 0.75);
      }
    }
    &:hover svg {
      .line {
        fill: rgba(255, 255, 255, 1);
      }
      .triangle {
        stroke: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
