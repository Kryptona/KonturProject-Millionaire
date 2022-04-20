declare type Guid = string;

declare module '*.scss' {
  const content: {[className: string]: string};
  // noinspection JSUnusedGlobalSymbos
  export default content;
}

declare module '*.css' {
  const content: {[className: string]: string};
  // noinspection JSUnusedGlobalSymbols
  export default content;
}

declare module '*.gif' {
  const value: any;
  // noinspection JSUnusedGlobalSymbols
  export default value;
}

declare module '*.png' {
  const value: any;
  // noinspection JSUnusedGlobalSymbols
  export default value;
}

declare module '*.svg' {
  const value: any;
  // noinspection JSUnusedGlobalSymbols
  export default value;
}

declare module '*.mp3' {
  const src: string;
  export default src;
}
