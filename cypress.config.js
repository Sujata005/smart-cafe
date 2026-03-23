import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Vite dev server
    setupNodeEvents(_on, _config) { // eslint-disable-line no-unused-vars
      // implement node event listeners here
    },
  },
})