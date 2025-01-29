export const useApi = () => {
  const config = useRuntimeConfig()
  return {
    baseUrl: config.public.apiBaseUrl,
  }
}

function useRuntimeConfig() {
  return {
    public: {
      apiBaseUrl: 'https://api.example.com'
    }
  }
}
