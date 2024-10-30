import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src/') },
      { find: '@ui', replacement: path.resolve(__dirname, './src/Shared/Ui') },
      { find: '@utils', replacement: path.resolve(__dirname, './src/Shared/Utils') },
      { find: '@api', replacement: path.resolve(__dirname, './src/Shared/Api') },
      { find: '@providers', replacement: path.resolve(__dirname, './src/Shared/providers') },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/Shared/Hooks') },
      { find: '@icons', replacement: path.resolve(__dirname, './src/Shared/Assets/Icons') },
      { find: '@constants', replacement: path.resolve(__dirname, './src/Shared/Constants') },
      { find: '@img', replacement: path.resolve(__dirname, './src/Shared/Assets/Img') },
      { find: '@types', replacement: path.resolve(__dirname, './src/Shared/Types') },
      { find: '@libs', replacement: path.resolve(__dirname, './src/Shared/Libs') },
      { find: '@pages', replacement: path.resolve(__dirname, './src/Pages/') },
      { find: '@app', replacement: path.resolve(__dirname, './src/App/') },
      { find: '@shared', replacement: path.resolve(__dirname, './src/Shared/') },
      { find: '@widgets', replacement: path.resolve(__dirname, './src/Widgets/') },
      { find: '@features', replacement: path.resolve(__dirname, './src/Features/') },
      { find: '@entities', replacement: path.resolve(__dirname, './src/Entities/') },
    ],
  },
  server:{
    port:4000,
    open:true,
  }
});
