export const providerRegistry = {
  providers: new Map(),
  
  register: (name, instance) => {
    providerRegistry.providers.set(name, instance);
  },
  
  remove: (name) => {
    providerRegistry.providers.delete(name);
  },
  
  get: (name) => {
    return providerRegistry.providers.get(name);
  },
  
  list: () => {
    return Array.from(providerRegistry.providers.keys());
  }
};
