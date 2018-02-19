// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { firebaseConfig } from '../../_firebase';

export const environment = {
  
    production: false, //not in production
    
    apiUrl: 'http://localhost:4200', // URL of development API
    
    firebase: firebaseConfig
    /*
      firebase: {
        apiKey: "AIzaSyCwgf7Aa2sma4E5d8XKh-lOwrcKVkkDOoA",
        authDomain: "ewf-nh.firebaseapp.com",
        databaseURL: "https://ewf-nh.firebaseio.com",
        projectId: "ewf-nh",
        storageBucket: "",
        messagingSenderId: "1056076336153"
      }
    */
};
