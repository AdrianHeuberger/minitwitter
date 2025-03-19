export default defineAppConfig({
  name: 'MiniTwitter',
  theme: {
    dark: false,
    colors: {
      primary: 'blue'
    }
  }
})

function defineAppConfig(config: { name: string; theme: { dark: boolean; colors: { primary: string; }; }; }) {
    return config;
}
