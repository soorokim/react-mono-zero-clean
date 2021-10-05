// MAPPING
export type Test = {
  [K: string]: string | Test;
};

type generator<T> = {
  [P in keyof T]: T[P] extends string ? T[P] : generator<T[P]>;
};

function mapStringObject<T extends Test>(c: generator<T>) {
  return c;
}

const test = mapStringObject({
  a: "aaa",
  b: "bbb",
  c: "ccc",
  d: {
    a: "aaa",
    b: {
      a: "aaa",
    },
  },
});

// RETURN
type Return<T> = T extends Array<infer U> ? U : never;

const t: Return<["aa" | "bbb"]> = "aa";
console.log(t);
console.log(test.d.b.a);

// ROUTE
type RouteBase = {
  readonly [K: string]: string | boolean | ReadonlyArray<string>;
};

type Route<T> = {
  [K in keyof T]: T[K];
};

type Params<T extends ReadonlyArray<string>> = T[number];

function mapRoute<T extends RouteBase>(route: Route<T>) {
  return route;
}

const homeRoute = mapRoute({
  params: ["aaa", "bbb", "ccc"],
  pathName: "home",
  isRequired: false,
} as const);
const a: Params<typeof homeRoute.params> = "aaa";
console.log(a);
