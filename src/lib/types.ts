export type ToCamelCase <String extends string, SkipFlag extends boolean = true, > =
  String extends `${infer FirstChunk} ${infer Rest}`
    ? FirstChunk extends string
      ? `${
            SkipFlag extends true
              ? FirstChunk
              : Capitalize<FirstChunk>}${ToCamelCase<Rest, false>
        }`
      : never
    : SkipFlag extends true
      ? String
      : Capitalize<String>
