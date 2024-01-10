type microPrefix = "M";
type HybridPrefix = "H";
type StringPrefix = "S";
type TestType<T extends string> = T;
type key<T extends number> = `K${T}`;
type Product<T extends number> = `P${T}`;

type Range<
  START extends number,
  END extends number = START,
  ARR extends unknown[] = [],
  ACC extends number = never
> = ARR["length"] extends END
  ? ACC | START | END
  : Range<
      START,
      END,
      [...ARR, 1],
      ARR[START] extends undefined ? ACC : ACC | ARR["length"]
    >;

export type TestsIds =
  | `${microPrefix}-${TestType<"OB">}-${key<Range<1, 6>>}-${Product<Range<1, 6>>}`
  | `${microPrefix}-${TestType<"NL">}-${key<Range<1, 5>>}-${Product<Range<1, 6>>}`
  | `${microPrefix}-${TestType<"PV">}-${key<Range<1, 3>>}-${Product<Range<1, 6>>}`
  | `${microPrefix}-${TestType<"AP">}-${key<Range<1, 4>>}-${Product<Range<1, 6>>}`
  | `${microPrefix}-${TestType<"CA">}-${key<Range<1, 4>>}-${Product<Range<1, 6>>}`
  | `${microPrefix}-${TestType<"WF">}-${key<Range<1>>}-${Product<Range<1, 6>>}`
  | `${HybridPrefix}-${TestType<"OB">}-${key<Range<1, 21>>}-${Product<Range<1, 6>>}`
  | `${StringPrefix}-${TestType<"OB">}-${key<Range<1, 9>>}-${Product<Range<1, 6>>}`
  | `${StringPrefix}-${TestType<"NL">}-${key<Range<1, 5>>}-${Product<Range<1, 6>>}`
  | `${StringPrefix}-${TestType<"CO">}-${key<Range<1, 2>>}-${Product<Range<1, 6>>}`
  | `${StringPrefix}-${TestType<"DF">}-${key<Range<1>>}-${Product<Range<1, 6>>}`
  | `${StringPrefix}-${TestType<"14">}-${key<Range<1, 4>>}-${Product<Range<1, 6>>}`
  | `${StringPrefix}-${TestType<"19">}-${key<Range<1, 2>>}-${Product<Range<1, 6>>}`
  | `${StringPrefix}-${TestType<"23">}-${key<Range<1, 3>>}-${Product<Range<1, 6>>}`
  | `${StringPrefix}-${TestType<"30">}-${key<Range<1, 2>>}-${Product<Range<1, 6>>}`
  | `${StringPrefix}-${TestType<"35">}-${key<Range<1, 3>>}-${Product<Range<1, 6>>}`
  | `${StringPrefix}-${TestType<"55">}-${key<Range<1, 3>>}-${Product<Range<1, 6>>}`
  | `${StringPrefix}-${TestType<"64">}-${key<Range<1, 2>>}-${Product<Range<1, 6>>}`
  | `${StringPrefix}-${TestType<"SB">}-${key<Range<1, 2>>}-${Product<Range<1, 6>>}`
  | `${StringPrefix}-${TestType<"NO">}-${key<Range<1, 3>>}-${Product<Range<1, 6>>}`  ;
