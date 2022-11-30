import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Components({
    resolvers: [VantResolver()],
  }),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {               
    host: '0.0.0.0'
    // proxy:{
    //   '/api':{
    //     target:'https://apis.netstart.cn/daodu/',
    //     changeOrigin: true,
    //     ws:false,
    //     rewrite:(path)=>path.replace (/^\/api/, '') 
    //   }
    // }    
  }   
})

