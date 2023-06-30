type MyVariables = {
  
};

declare global {
  namespace NodeJS {
    type ProcessEnv = MyVariables;
  }
}

export {};
