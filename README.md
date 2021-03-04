# StyleIT
Interaction Programming and Dynamic Web 2020 Spring Group Project.

StyleIT offers image styling with different effects. In order to use it, you need to register and log in. After that, you can upload your pictures and select from different effects. For example, you can mix your own profile picture with Picasso's painting or use various filter to make your picture better. 
You can save your results to your profile or download them. There is also a user page, where you can see, sort, delete or download your uploaded and saved stylized pictures.

Used API: "Fast Style Transfer API": https://deepai.org/machine-learning-model/fast-style-transfer

App is available at: https://styleit-1157c.firebaseapp.com/#/

Wireframe at: https://projects.invisionapp.com/prototype/ck7xoa0hf002ryh01q0njdr0w/play

## What we have done 
We have decided to use one of the API's from deepai.org which provides image manipulation by using ML algorithm. So far, we have created most of the layout for our webpage by using Vue framework, and deployed our app through Firebase. We have designed basic structures of our app and completed simple API call to show local image.

## Future plans
We're working on showing the images at the Home and Profile page, connecting the application to the backend (user and file management), API calls for 'super resolution' & 'colorization' function, and better design for our app. 

## File Structures
1. App.vue
- This is a main top-level component. It acts as a root component in vue application. 

2. main.ts
- This has same function as main.js but written in typescript. It connects to all the components, routers, firebase, and renders the app. 

3. Components<br/>
We have created four components so far. 
- AuthForm.vue: Login and Register form
- ImageUploadBar.vue: Input box and file picker for the images to upload
- NavBar.vue: Navigation bar
- Sidebar.vue: Sidebar for editing the used style effects<br/>

These components work for creating objects and managing properties for each components. 

4. Views (routed components) <br/>
We have created three views so far. 
- HomeView.vue: Image upload and styling
- LoginView.vue: Login/Register page
- ProfileView.vue Profile data and own images<br/>

These views work as presenting each pages and managing data for its relevant components. 

5. ./router/index.ts<br/>
This is the router which provides paths and names of components to each views.

## Project setup
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

### Deploy
```
npm run build
firebase deploy
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
