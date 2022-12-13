<p align="center"><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img width="100" src="/src/assets/logo.png" alt="Vue logo"></a></p>

![image](https://img.shields.io/badge/license-MIT-green) ![image](https://img.shields.io/badge/node-v19.0.1-green) ![image](https://img.shields.io/badge/vuejs3-048604) ![image](https://img.shields.io/badge/-typescript-blue)

# Simple messenger using Vue.js and Firebase
![chrome-capture-2022-11-13](https://user-images.githubusercontent.com/60511189/207368993-f19f6647-7750-4964-925c-a80b73d56e73.gif)

## Watch DEMO https://vue-chat-d7ab3.web.app/

## Prepare

1. Sign in https://firebase.google.com/

2. Then create new project in https://console.firebase.google.com/

3. In the authentication tab add new provider **email/password**
![image](https://user-images.githubusercontent.com/60511189/207373353-6dea925a-4785-43bb-b58c-7d3d44e48750.png)

4. In the Cloud firestore create new database

5. Than go to settings and copy configure data

6. Create .env at the root of the project and paste configure data like sample.env
```env
VUE_APP_FIREBASE_APIKEY = AIzaSyDpB2eoUYlOlF6PEoTJ5CmjENVsdmQhu_Y
VUE_APP_FIREBASE_AUTH_DOMAIN = "[your_project_name].firebaseapp.com"
VUE_APP_FIREBASE_PROJECT_ID = [your_project_name]
VUE_APP_FIREBASE_STORAGE_BUCKET = [your_project_name].appspot.com
VUE_APP_FIREBASE_MESSAGINGSENDER_ID = 25566021582
VUE_APP_FIREBASE_APP_ID = 1:20476027584:web:f264086e4c2153e1a60323
VUE_APP_FIREBASE_MEASUREMENT_ID = G-8IQTLRBDQK
```


## Project Setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
