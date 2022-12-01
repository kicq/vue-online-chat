/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare var process: {
  env: {
    BASE_URL: string
    VUE_APP_FIREBASE_APIKEY: string
    VUE_APP_FIREBASE_AUTH_DOMAIN: string
    VUE_APP_FIREBASE_PROJECT_ID: string
    VUE_APP_FIREBASE_STORAGE_BUCKET: string
    VUE_APP_FIREBASE_MESSAGINGSENDER_ID: string
    VUE_APP_FIREBASE_APP_ID: string
    VUE_APP_FIREBASE_MEASUREMENT_ID: string
  }
}