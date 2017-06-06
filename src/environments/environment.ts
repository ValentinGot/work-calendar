// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  url       : '/api',
  firebase  : {
    apiKey           : "AIzaSyAJ1vSjEE_5uXquahEUsPLK_pTBHUOvQpM",
    authDomain       : "work-calendar-9df00.firebaseapp.com",
    databaseURL      : "https://work-calendar-9df00.firebaseio.com",
    projectId        : "work-calendar-9df00",
    storageBucket    : "work-calendar-9df00.appspot.com",
    messagingSenderId: "838352952821"
  }
};
