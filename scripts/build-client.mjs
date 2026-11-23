import {build} from 'vite';
await build({configFile:false,publicDir:false,build:{outDir:'public',emptyOutDir:false,minify:true,lib:{entry:'frontend/app.js',formats:['es'],fileName:()=> 'app.js'},rollupOptions:{output:{codeSplitting:false}}}});
