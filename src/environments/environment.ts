// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  hmr       : true,
  firebase  : {
    apiKey           : 'AIzaSyDGaJQ5lNR2TM9m1NuG2RiVaE9AmVPD6j0',
    authDomain       : 'work-calendar-staging.firebaseapp.com',
    databaseURL      : 'https://work-calendar-staging.firebaseio.com',
    projectId        : 'work-calendar-staging',
    storageBucket    : 'work-calendar-staging.appspot.com',
    messagingSenderId: '991449284188'
  }
};
