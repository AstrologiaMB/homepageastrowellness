
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model RectificationEvent
 * 
 */
export type RectificationEvent = $Result.DefaultSelection<Prisma.$RectificationEventPayload>
/**
 * Model CartaNatal
 * 
 */
export type CartaNatal = $Result.DefaultSelection<Prisma.$CartaNatalPayload>
/**
 * Model InterpretacionCache
 * 
 */
export type InterpretacionCache = $Result.DefaultSelection<Prisma.$InterpretacionCachePayload>
/**
 * Model AstrogematriaCache
 * 
 */
export type AstrogematriaCache = $Result.DefaultSelection<Prisma.$AstrogematriaCachePayload>
/**
 * Model HorariaRequest
 * 
 */
export type HorariaRequest = $Result.DefaultSelection<Prisma.$HorariaRequestPayload>
/**
 * Model PersonalCalendarCache
 * 
 */
export type PersonalCalendarCache = $Result.DefaultSelection<Prisma.$PersonalCalendarCachePayload>
/**
 * Model LunarPhasesCache
 * 
 */
export type LunarPhasesCache = $Result.DefaultSelection<Prisma.$LunarPhasesCachePayload>
/**
 * Model LunarJournal
 * 
 */
export type LunarJournal = $Result.DefaultSelection<Prisma.$LunarJournalPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rectificationEvent`: Exposes CRUD operations for the **RectificationEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RectificationEvents
    * const rectificationEvents = await prisma.rectificationEvent.findMany()
    * ```
    */
  get rectificationEvent(): Prisma.RectificationEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cartaNatal`: Exposes CRUD operations for the **CartaNatal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CartaNatals
    * const cartaNatals = await prisma.cartaNatal.findMany()
    * ```
    */
  get cartaNatal(): Prisma.CartaNatalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.interpretacionCache`: Exposes CRUD operations for the **InterpretacionCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InterpretacionCaches
    * const interpretacionCaches = await prisma.interpretacionCache.findMany()
    * ```
    */
  get interpretacionCache(): Prisma.InterpretacionCacheDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.astrogematriaCache`: Exposes CRUD operations for the **AstrogematriaCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AstrogematriaCaches
    * const astrogematriaCaches = await prisma.astrogematriaCache.findMany()
    * ```
    */
  get astrogematriaCache(): Prisma.AstrogematriaCacheDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.horariaRequest`: Exposes CRUD operations for the **HorariaRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HorariaRequests
    * const horariaRequests = await prisma.horariaRequest.findMany()
    * ```
    */
  get horariaRequest(): Prisma.HorariaRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.personalCalendarCache`: Exposes CRUD operations for the **PersonalCalendarCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PersonalCalendarCaches
    * const personalCalendarCaches = await prisma.personalCalendarCache.findMany()
    * ```
    */
  get personalCalendarCache(): Prisma.PersonalCalendarCacheDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lunarPhasesCache`: Exposes CRUD operations for the **LunarPhasesCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LunarPhasesCaches
    * const lunarPhasesCaches = await prisma.lunarPhasesCache.findMany()
    * ```
    */
  get lunarPhasesCache(): Prisma.LunarPhasesCacheDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lunarJournal`: Exposes CRUD operations for the **LunarJournal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LunarJournals
    * const lunarJournals = await prisma.lunarJournal.findMany()
    * ```
    */
  get lunarJournal(): Prisma.LunarJournalDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    RectificationEvent: 'RectificationEvent',
    CartaNatal: 'CartaNatal',
    InterpretacionCache: 'InterpretacionCache',
    AstrogematriaCache: 'AstrogematriaCache',
    HorariaRequest: 'HorariaRequest',
    PersonalCalendarCache: 'PersonalCalendarCache',
    LunarPhasesCache: 'LunarPhasesCache',
    LunarJournal: 'LunarJournal'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "rectificationEvent" | "cartaNatal" | "interpretacionCache" | "astrogematriaCache" | "horariaRequest" | "personalCalendarCache" | "lunarPhasesCache" | "lunarJournal"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      RectificationEvent: {
        payload: Prisma.$RectificationEventPayload<ExtArgs>
        fields: Prisma.RectificationEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RectificationEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RectificationEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RectificationEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RectificationEventPayload>
          }
          findFirst: {
            args: Prisma.RectificationEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RectificationEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RectificationEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RectificationEventPayload>
          }
          findMany: {
            args: Prisma.RectificationEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RectificationEventPayload>[]
          }
          create: {
            args: Prisma.RectificationEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RectificationEventPayload>
          }
          createMany: {
            args: Prisma.RectificationEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RectificationEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RectificationEventPayload>[]
          }
          delete: {
            args: Prisma.RectificationEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RectificationEventPayload>
          }
          update: {
            args: Prisma.RectificationEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RectificationEventPayload>
          }
          deleteMany: {
            args: Prisma.RectificationEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RectificationEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RectificationEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RectificationEventPayload>[]
          }
          upsert: {
            args: Prisma.RectificationEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RectificationEventPayload>
          }
          aggregate: {
            args: Prisma.RectificationEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRectificationEvent>
          }
          groupBy: {
            args: Prisma.RectificationEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<RectificationEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.RectificationEventCountArgs<ExtArgs>
            result: $Utils.Optional<RectificationEventCountAggregateOutputType> | number
          }
        }
      }
      CartaNatal: {
        payload: Prisma.$CartaNatalPayload<ExtArgs>
        fields: Prisma.CartaNatalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CartaNatalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartaNatalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CartaNatalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartaNatalPayload>
          }
          findFirst: {
            args: Prisma.CartaNatalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartaNatalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CartaNatalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartaNatalPayload>
          }
          findMany: {
            args: Prisma.CartaNatalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartaNatalPayload>[]
          }
          create: {
            args: Prisma.CartaNatalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartaNatalPayload>
          }
          createMany: {
            args: Prisma.CartaNatalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CartaNatalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartaNatalPayload>[]
          }
          delete: {
            args: Prisma.CartaNatalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartaNatalPayload>
          }
          update: {
            args: Prisma.CartaNatalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartaNatalPayload>
          }
          deleteMany: {
            args: Prisma.CartaNatalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CartaNatalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CartaNatalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartaNatalPayload>[]
          }
          upsert: {
            args: Prisma.CartaNatalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartaNatalPayload>
          }
          aggregate: {
            args: Prisma.CartaNatalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCartaNatal>
          }
          groupBy: {
            args: Prisma.CartaNatalGroupByArgs<ExtArgs>
            result: $Utils.Optional<CartaNatalGroupByOutputType>[]
          }
          count: {
            args: Prisma.CartaNatalCountArgs<ExtArgs>
            result: $Utils.Optional<CartaNatalCountAggregateOutputType> | number
          }
        }
      }
      InterpretacionCache: {
        payload: Prisma.$InterpretacionCachePayload<ExtArgs>
        fields: Prisma.InterpretacionCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InterpretacionCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterpretacionCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InterpretacionCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterpretacionCachePayload>
          }
          findFirst: {
            args: Prisma.InterpretacionCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterpretacionCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InterpretacionCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterpretacionCachePayload>
          }
          findMany: {
            args: Prisma.InterpretacionCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterpretacionCachePayload>[]
          }
          create: {
            args: Prisma.InterpretacionCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterpretacionCachePayload>
          }
          createMany: {
            args: Prisma.InterpretacionCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InterpretacionCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterpretacionCachePayload>[]
          }
          delete: {
            args: Prisma.InterpretacionCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterpretacionCachePayload>
          }
          update: {
            args: Prisma.InterpretacionCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterpretacionCachePayload>
          }
          deleteMany: {
            args: Prisma.InterpretacionCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InterpretacionCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InterpretacionCacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterpretacionCachePayload>[]
          }
          upsert: {
            args: Prisma.InterpretacionCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterpretacionCachePayload>
          }
          aggregate: {
            args: Prisma.InterpretacionCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInterpretacionCache>
          }
          groupBy: {
            args: Prisma.InterpretacionCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<InterpretacionCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.InterpretacionCacheCountArgs<ExtArgs>
            result: $Utils.Optional<InterpretacionCacheCountAggregateOutputType> | number
          }
        }
      }
      AstrogematriaCache: {
        payload: Prisma.$AstrogematriaCachePayload<ExtArgs>
        fields: Prisma.AstrogematriaCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AstrogematriaCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AstrogematriaCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AstrogematriaCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AstrogematriaCachePayload>
          }
          findFirst: {
            args: Prisma.AstrogematriaCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AstrogematriaCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AstrogematriaCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AstrogematriaCachePayload>
          }
          findMany: {
            args: Prisma.AstrogematriaCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AstrogematriaCachePayload>[]
          }
          create: {
            args: Prisma.AstrogematriaCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AstrogematriaCachePayload>
          }
          createMany: {
            args: Prisma.AstrogematriaCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AstrogematriaCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AstrogematriaCachePayload>[]
          }
          delete: {
            args: Prisma.AstrogematriaCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AstrogematriaCachePayload>
          }
          update: {
            args: Prisma.AstrogematriaCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AstrogematriaCachePayload>
          }
          deleteMany: {
            args: Prisma.AstrogematriaCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AstrogematriaCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AstrogematriaCacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AstrogematriaCachePayload>[]
          }
          upsert: {
            args: Prisma.AstrogematriaCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AstrogematriaCachePayload>
          }
          aggregate: {
            args: Prisma.AstrogematriaCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAstrogematriaCache>
          }
          groupBy: {
            args: Prisma.AstrogematriaCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<AstrogematriaCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.AstrogematriaCacheCountArgs<ExtArgs>
            result: $Utils.Optional<AstrogematriaCacheCountAggregateOutputType> | number
          }
        }
      }
      HorariaRequest: {
        payload: Prisma.$HorariaRequestPayload<ExtArgs>
        fields: Prisma.HorariaRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HorariaRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorariaRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HorariaRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorariaRequestPayload>
          }
          findFirst: {
            args: Prisma.HorariaRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorariaRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HorariaRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorariaRequestPayload>
          }
          findMany: {
            args: Prisma.HorariaRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorariaRequestPayload>[]
          }
          create: {
            args: Prisma.HorariaRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorariaRequestPayload>
          }
          createMany: {
            args: Prisma.HorariaRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HorariaRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorariaRequestPayload>[]
          }
          delete: {
            args: Prisma.HorariaRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorariaRequestPayload>
          }
          update: {
            args: Prisma.HorariaRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorariaRequestPayload>
          }
          deleteMany: {
            args: Prisma.HorariaRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HorariaRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HorariaRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorariaRequestPayload>[]
          }
          upsert: {
            args: Prisma.HorariaRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorariaRequestPayload>
          }
          aggregate: {
            args: Prisma.HorariaRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHorariaRequest>
          }
          groupBy: {
            args: Prisma.HorariaRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<HorariaRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.HorariaRequestCountArgs<ExtArgs>
            result: $Utils.Optional<HorariaRequestCountAggregateOutputType> | number
          }
        }
      }
      PersonalCalendarCache: {
        payload: Prisma.$PersonalCalendarCachePayload<ExtArgs>
        fields: Prisma.PersonalCalendarCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonalCalendarCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalCalendarCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonalCalendarCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalCalendarCachePayload>
          }
          findFirst: {
            args: Prisma.PersonalCalendarCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalCalendarCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonalCalendarCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalCalendarCachePayload>
          }
          findMany: {
            args: Prisma.PersonalCalendarCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalCalendarCachePayload>[]
          }
          create: {
            args: Prisma.PersonalCalendarCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalCalendarCachePayload>
          }
          createMany: {
            args: Prisma.PersonalCalendarCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonalCalendarCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalCalendarCachePayload>[]
          }
          delete: {
            args: Prisma.PersonalCalendarCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalCalendarCachePayload>
          }
          update: {
            args: Prisma.PersonalCalendarCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalCalendarCachePayload>
          }
          deleteMany: {
            args: Prisma.PersonalCalendarCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonalCalendarCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PersonalCalendarCacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalCalendarCachePayload>[]
          }
          upsert: {
            args: Prisma.PersonalCalendarCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalCalendarCachePayload>
          }
          aggregate: {
            args: Prisma.PersonalCalendarCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePersonalCalendarCache>
          }
          groupBy: {
            args: Prisma.PersonalCalendarCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonalCalendarCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonalCalendarCacheCountArgs<ExtArgs>
            result: $Utils.Optional<PersonalCalendarCacheCountAggregateOutputType> | number
          }
        }
      }
      LunarPhasesCache: {
        payload: Prisma.$LunarPhasesCachePayload<ExtArgs>
        fields: Prisma.LunarPhasesCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LunarPhasesCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarPhasesCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LunarPhasesCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarPhasesCachePayload>
          }
          findFirst: {
            args: Prisma.LunarPhasesCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarPhasesCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LunarPhasesCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarPhasesCachePayload>
          }
          findMany: {
            args: Prisma.LunarPhasesCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarPhasesCachePayload>[]
          }
          create: {
            args: Prisma.LunarPhasesCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarPhasesCachePayload>
          }
          createMany: {
            args: Prisma.LunarPhasesCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LunarPhasesCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarPhasesCachePayload>[]
          }
          delete: {
            args: Prisma.LunarPhasesCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarPhasesCachePayload>
          }
          update: {
            args: Prisma.LunarPhasesCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarPhasesCachePayload>
          }
          deleteMany: {
            args: Prisma.LunarPhasesCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LunarPhasesCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LunarPhasesCacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarPhasesCachePayload>[]
          }
          upsert: {
            args: Prisma.LunarPhasesCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarPhasesCachePayload>
          }
          aggregate: {
            args: Prisma.LunarPhasesCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLunarPhasesCache>
          }
          groupBy: {
            args: Prisma.LunarPhasesCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<LunarPhasesCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.LunarPhasesCacheCountArgs<ExtArgs>
            result: $Utils.Optional<LunarPhasesCacheCountAggregateOutputType> | number
          }
        }
      }
      LunarJournal: {
        payload: Prisma.$LunarJournalPayload<ExtArgs>
        fields: Prisma.LunarJournalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LunarJournalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarJournalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LunarJournalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarJournalPayload>
          }
          findFirst: {
            args: Prisma.LunarJournalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarJournalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LunarJournalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarJournalPayload>
          }
          findMany: {
            args: Prisma.LunarJournalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarJournalPayload>[]
          }
          create: {
            args: Prisma.LunarJournalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarJournalPayload>
          }
          createMany: {
            args: Prisma.LunarJournalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LunarJournalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarJournalPayload>[]
          }
          delete: {
            args: Prisma.LunarJournalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarJournalPayload>
          }
          update: {
            args: Prisma.LunarJournalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarJournalPayload>
          }
          deleteMany: {
            args: Prisma.LunarJournalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LunarJournalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LunarJournalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarJournalPayload>[]
          }
          upsert: {
            args: Prisma.LunarJournalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LunarJournalPayload>
          }
          aggregate: {
            args: Prisma.LunarJournalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLunarJournal>
          }
          groupBy: {
            args: Prisma.LunarJournalGroupByArgs<ExtArgs>
            result: $Utils.Optional<LunarJournalGroupByOutputType>[]
          }
          count: {
            args: Prisma.LunarJournalCountArgs<ExtArgs>
            result: $Utils.Optional<LunarJournalCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    rectificationEvent?: RectificationEventOmit
    cartaNatal?: CartaNatalOmit
    interpretacionCache?: InterpretacionCacheOmit
    astrogematriaCache?: AstrogematriaCacheOmit
    horariaRequest?: HorariaRequestOmit
    personalCalendarCache?: PersonalCalendarCacheOmit
    lunarPhasesCache?: LunarPhasesCacheOmit
    lunarJournal?: LunarJournalOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    rectificationEvents: number
    cartasNatales: number
    interpretaciones: number
    horariaRequests: number
    personalCalendarCache: number
    lunarPhasesCache: number
    lunarJournal: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rectificationEvents?: boolean | UserCountOutputTypeCountRectificationEventsArgs
    cartasNatales?: boolean | UserCountOutputTypeCountCartasNatalesArgs
    interpretaciones?: boolean | UserCountOutputTypeCountInterpretacionesArgs
    horariaRequests?: boolean | UserCountOutputTypeCountHorariaRequestsArgs
    personalCalendarCache?: boolean | UserCountOutputTypeCountPersonalCalendarCacheArgs
    lunarPhasesCache?: boolean | UserCountOutputTypeCountLunarPhasesCacheArgs
    lunarJournal?: boolean | UserCountOutputTypeCountLunarJournalArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRectificationEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RectificationEventWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCartasNatalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartaNatalWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInterpretacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterpretacionCacheWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHorariaRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HorariaRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPersonalCalendarCacheArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonalCalendarCacheWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLunarPhasesCacheArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LunarPhasesCacheWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLunarJournalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LunarJournalWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    birthHour: number | null
    birthMinute: number | null
  }

  export type UserSumAggregateOutputType = {
    birthHour: number | null
    birthMinute: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    password: string | null
    emailVerified: Date | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    birthDate: Date | null
    birthCity: string | null
    birthCountry: string | null
    birthHour: number | null
    birthMinute: number | null
    knowsBirthTime: boolean | null
    gender: string | null
    residenceCity: string | null
    residenceCountry: string | null
    timezone: string | null
    rectificationRequested: boolean | null
    rectificationAcceptedUncertainty: boolean | null
    rectificationStatus: string | null
    rectificationRequestDate: Date | null
    subscriptionStatus: string | null
    subscriptionExpiresAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    password: string | null
    emailVerified: Date | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    birthDate: Date | null
    birthCity: string | null
    birthCountry: string | null
    birthHour: number | null
    birthMinute: number | null
    knowsBirthTime: boolean | null
    gender: string | null
    residenceCity: string | null
    residenceCountry: string | null
    timezone: string | null
    rectificationRequested: boolean | null
    rectificationAcceptedUncertainty: boolean | null
    rectificationStatus: string | null
    rectificationRequestDate: Date | null
    subscriptionStatus: string | null
    subscriptionExpiresAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    image: number
    password: number
    emailVerified: number
    resetToken: number
    resetTokenExpiry: number
    createdAt: number
    updatedAt: number
    birthDate: number
    birthCity: number
    birthCountry: number
    birthHour: number
    birthMinute: number
    knowsBirthTime: number
    gender: number
    residenceCity: number
    residenceCountry: number
    timezone: number
    rectificationRequested: number
    rectificationAcceptedUncertainty: number
    rectificationStatus: number
    rectificationRequestDate: number
    subscriptionStatus: number
    subscriptionExpiresAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    birthHour?: true
    birthMinute?: true
  }

  export type UserSumAggregateInputType = {
    birthHour?: true
    birthMinute?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    password?: true
    emailVerified?: true
    resetToken?: true
    resetTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
    birthDate?: true
    birthCity?: true
    birthCountry?: true
    birthHour?: true
    birthMinute?: true
    knowsBirthTime?: true
    gender?: true
    residenceCity?: true
    residenceCountry?: true
    timezone?: true
    rectificationRequested?: true
    rectificationAcceptedUncertainty?: true
    rectificationStatus?: true
    rectificationRequestDate?: true
    subscriptionStatus?: true
    subscriptionExpiresAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    password?: true
    emailVerified?: true
    resetToken?: true
    resetTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
    birthDate?: true
    birthCity?: true
    birthCountry?: true
    birthHour?: true
    birthMinute?: true
    knowsBirthTime?: true
    gender?: true
    residenceCity?: true
    residenceCountry?: true
    timezone?: true
    rectificationRequested?: true
    rectificationAcceptedUncertainty?: true
    rectificationStatus?: true
    rectificationRequestDate?: true
    subscriptionStatus?: true
    subscriptionExpiresAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    password?: true
    emailVerified?: true
    resetToken?: true
    resetTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
    birthDate?: true
    birthCity?: true
    birthCountry?: true
    birthHour?: true
    birthMinute?: true
    knowsBirthTime?: true
    gender?: true
    residenceCity?: true
    residenceCountry?: true
    timezone?: true
    rectificationRequested?: true
    rectificationAcceptedUncertainty?: true
    rectificationStatus?: true
    rectificationRequestDate?: true
    subscriptionStatus?: true
    subscriptionExpiresAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    image: string | null
    password: string | null
    emailVerified: Date | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    createdAt: Date
    updatedAt: Date
    birthDate: Date | null
    birthCity: string | null
    birthCountry: string | null
    birthHour: number | null
    birthMinute: number | null
    knowsBirthTime: boolean
    gender: string | null
    residenceCity: string | null
    residenceCountry: string | null
    timezone: string | null
    rectificationRequested: boolean
    rectificationAcceptedUncertainty: boolean
    rectificationStatus: string | null
    rectificationRequestDate: Date | null
    subscriptionStatus: string
    subscriptionExpiresAt: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    password?: boolean
    emailVerified?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    birthDate?: boolean
    birthCity?: boolean
    birthCountry?: boolean
    birthHour?: boolean
    birthMinute?: boolean
    knowsBirthTime?: boolean
    gender?: boolean
    residenceCity?: boolean
    residenceCountry?: boolean
    timezone?: boolean
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: boolean
    rectificationRequestDate?: boolean
    subscriptionStatus?: boolean
    subscriptionExpiresAt?: boolean
    rectificationEvents?: boolean | User$rectificationEventsArgs<ExtArgs>
    cartasNatales?: boolean | User$cartasNatalesArgs<ExtArgs>
    interpretaciones?: boolean | User$interpretacionesArgs<ExtArgs>
    horariaRequests?: boolean | User$horariaRequestsArgs<ExtArgs>
    personalCalendarCache?: boolean | User$personalCalendarCacheArgs<ExtArgs>
    lunarPhasesCache?: boolean | User$lunarPhasesCacheArgs<ExtArgs>
    lunarJournal?: boolean | User$lunarJournalArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    password?: boolean
    emailVerified?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    birthDate?: boolean
    birthCity?: boolean
    birthCountry?: boolean
    birthHour?: boolean
    birthMinute?: boolean
    knowsBirthTime?: boolean
    gender?: boolean
    residenceCity?: boolean
    residenceCountry?: boolean
    timezone?: boolean
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: boolean
    rectificationRequestDate?: boolean
    subscriptionStatus?: boolean
    subscriptionExpiresAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    password?: boolean
    emailVerified?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    birthDate?: boolean
    birthCity?: boolean
    birthCountry?: boolean
    birthHour?: boolean
    birthMinute?: boolean
    knowsBirthTime?: boolean
    gender?: boolean
    residenceCity?: boolean
    residenceCountry?: boolean
    timezone?: boolean
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: boolean
    rectificationRequestDate?: boolean
    subscriptionStatus?: boolean
    subscriptionExpiresAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    password?: boolean
    emailVerified?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    birthDate?: boolean
    birthCity?: boolean
    birthCountry?: boolean
    birthHour?: boolean
    birthMinute?: boolean
    knowsBirthTime?: boolean
    gender?: boolean
    residenceCity?: boolean
    residenceCountry?: boolean
    timezone?: boolean
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: boolean
    rectificationRequestDate?: boolean
    subscriptionStatus?: boolean
    subscriptionExpiresAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "image" | "password" | "emailVerified" | "resetToken" | "resetTokenExpiry" | "createdAt" | "updatedAt" | "birthDate" | "birthCity" | "birthCountry" | "birthHour" | "birthMinute" | "knowsBirthTime" | "gender" | "residenceCity" | "residenceCountry" | "timezone" | "rectificationRequested" | "rectificationAcceptedUncertainty" | "rectificationStatus" | "rectificationRequestDate" | "subscriptionStatus" | "subscriptionExpiresAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rectificationEvents?: boolean | User$rectificationEventsArgs<ExtArgs>
    cartasNatales?: boolean | User$cartasNatalesArgs<ExtArgs>
    interpretaciones?: boolean | User$interpretacionesArgs<ExtArgs>
    horariaRequests?: boolean | User$horariaRequestsArgs<ExtArgs>
    personalCalendarCache?: boolean | User$personalCalendarCacheArgs<ExtArgs>
    lunarPhasesCache?: boolean | User$lunarPhasesCacheArgs<ExtArgs>
    lunarJournal?: boolean | User$lunarJournalArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      rectificationEvents: Prisma.$RectificationEventPayload<ExtArgs>[]
      cartasNatales: Prisma.$CartaNatalPayload<ExtArgs>[]
      interpretaciones: Prisma.$InterpretacionCachePayload<ExtArgs>[]
      horariaRequests: Prisma.$HorariaRequestPayload<ExtArgs>[]
      personalCalendarCache: Prisma.$PersonalCalendarCachePayload<ExtArgs>[]
      lunarPhasesCache: Prisma.$LunarPhasesCachePayload<ExtArgs>[]
      lunarJournal: Prisma.$LunarJournalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      image: string | null
      password: string | null
      emailVerified: Date | null
      resetToken: string | null
      resetTokenExpiry: Date | null
      createdAt: Date
      updatedAt: Date
      birthDate: Date | null
      birthCity: string | null
      birthCountry: string | null
      birthHour: number | null
      birthMinute: number | null
      knowsBirthTime: boolean
      gender: string | null
      residenceCity: string | null
      residenceCountry: string | null
      timezone: string | null
      rectificationRequested: boolean
      rectificationAcceptedUncertainty: boolean
      rectificationStatus: string | null
      rectificationRequestDate: Date | null
      subscriptionStatus: string
      subscriptionExpiresAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rectificationEvents<T extends User$rectificationEventsArgs<ExtArgs> = {}>(args?: Subset<T, User$rectificationEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RectificationEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cartasNatales<T extends User$cartasNatalesArgs<ExtArgs> = {}>(args?: Subset<T, User$cartasNatalesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartaNatalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    interpretaciones<T extends User$interpretacionesArgs<ExtArgs> = {}>(args?: Subset<T, User$interpretacionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterpretacionCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    horariaRequests<T extends User$horariaRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$horariaRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HorariaRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    personalCalendarCache<T extends User$personalCalendarCacheArgs<ExtArgs> = {}>(args?: Subset<T, User$personalCalendarCacheArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalCalendarCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lunarPhasesCache<T extends User$lunarPhasesCacheArgs<ExtArgs> = {}>(args?: Subset<T, User$lunarPhasesCacheArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LunarPhasesCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lunarJournal<T extends User$lunarJournalArgs<ExtArgs> = {}>(args?: Subset<T, User$lunarJournalArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LunarJournalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly resetToken: FieldRef<"User", 'String'>
    readonly resetTokenExpiry: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly birthDate: FieldRef<"User", 'DateTime'>
    readonly birthCity: FieldRef<"User", 'String'>
    readonly birthCountry: FieldRef<"User", 'String'>
    readonly birthHour: FieldRef<"User", 'Int'>
    readonly birthMinute: FieldRef<"User", 'Int'>
    readonly knowsBirthTime: FieldRef<"User", 'Boolean'>
    readonly gender: FieldRef<"User", 'String'>
    readonly residenceCity: FieldRef<"User", 'String'>
    readonly residenceCountry: FieldRef<"User", 'String'>
    readonly timezone: FieldRef<"User", 'String'>
    readonly rectificationRequested: FieldRef<"User", 'Boolean'>
    readonly rectificationAcceptedUncertainty: FieldRef<"User", 'Boolean'>
    readonly rectificationStatus: FieldRef<"User", 'String'>
    readonly rectificationRequestDate: FieldRef<"User", 'DateTime'>
    readonly subscriptionStatus: FieldRef<"User", 'String'>
    readonly subscriptionExpiresAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.rectificationEvents
   */
  export type User$rectificationEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RectificationEvent
     */
    select?: RectificationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RectificationEvent
     */
    omit?: RectificationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RectificationEventInclude<ExtArgs> | null
    where?: RectificationEventWhereInput
    orderBy?: RectificationEventOrderByWithRelationInput | RectificationEventOrderByWithRelationInput[]
    cursor?: RectificationEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RectificationEventScalarFieldEnum | RectificationEventScalarFieldEnum[]
  }

  /**
   * User.cartasNatales
   */
  export type User$cartasNatalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartaNatal
     */
    select?: CartaNatalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartaNatal
     */
    omit?: CartaNatalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartaNatalInclude<ExtArgs> | null
    where?: CartaNatalWhereInput
    orderBy?: CartaNatalOrderByWithRelationInput | CartaNatalOrderByWithRelationInput[]
    cursor?: CartaNatalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CartaNatalScalarFieldEnum | CartaNatalScalarFieldEnum[]
  }

  /**
   * User.interpretaciones
   */
  export type User$interpretacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterpretacionCache
     */
    select?: InterpretacionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterpretacionCache
     */
    omit?: InterpretacionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterpretacionCacheInclude<ExtArgs> | null
    where?: InterpretacionCacheWhereInput
    orderBy?: InterpretacionCacheOrderByWithRelationInput | InterpretacionCacheOrderByWithRelationInput[]
    cursor?: InterpretacionCacheWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InterpretacionCacheScalarFieldEnum | InterpretacionCacheScalarFieldEnum[]
  }

  /**
   * User.horariaRequests
   */
  export type User$horariaRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorariaRequest
     */
    select?: HorariaRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorariaRequest
     */
    omit?: HorariaRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorariaRequestInclude<ExtArgs> | null
    where?: HorariaRequestWhereInput
    orderBy?: HorariaRequestOrderByWithRelationInput | HorariaRequestOrderByWithRelationInput[]
    cursor?: HorariaRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HorariaRequestScalarFieldEnum | HorariaRequestScalarFieldEnum[]
  }

  /**
   * User.personalCalendarCache
   */
  export type User$personalCalendarCacheArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalCalendarCache
     */
    select?: PersonalCalendarCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalCalendarCache
     */
    omit?: PersonalCalendarCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalCalendarCacheInclude<ExtArgs> | null
    where?: PersonalCalendarCacheWhereInput
    orderBy?: PersonalCalendarCacheOrderByWithRelationInput | PersonalCalendarCacheOrderByWithRelationInput[]
    cursor?: PersonalCalendarCacheWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PersonalCalendarCacheScalarFieldEnum | PersonalCalendarCacheScalarFieldEnum[]
  }

  /**
   * User.lunarPhasesCache
   */
  export type User$lunarPhasesCacheArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarPhasesCache
     */
    select?: LunarPhasesCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarPhasesCache
     */
    omit?: LunarPhasesCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarPhasesCacheInclude<ExtArgs> | null
    where?: LunarPhasesCacheWhereInput
    orderBy?: LunarPhasesCacheOrderByWithRelationInput | LunarPhasesCacheOrderByWithRelationInput[]
    cursor?: LunarPhasesCacheWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LunarPhasesCacheScalarFieldEnum | LunarPhasesCacheScalarFieldEnum[]
  }

  /**
   * User.lunarJournal
   */
  export type User$lunarJournalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarJournal
     */
    select?: LunarJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarJournal
     */
    omit?: LunarJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarJournalInclude<ExtArgs> | null
    where?: LunarJournalWhereInput
    orderBy?: LunarJournalOrderByWithRelationInput | LunarJournalOrderByWithRelationInput[]
    cursor?: LunarJournalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LunarJournalScalarFieldEnum | LunarJournalScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model RectificationEvent
   */

  export type AggregateRectificationEvent = {
    _count: RectificationEventCountAggregateOutputType | null
    _min: RectificationEventMinAggregateOutputType | null
    _max: RectificationEventMaxAggregateOutputType | null
  }

  export type RectificationEventMinAggregateOutputType = {
    id: string | null
    userId: string | null
    eventType: string | null
    description: string | null
    eventDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RectificationEventMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    eventType: string | null
    description: string | null
    eventDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RectificationEventCountAggregateOutputType = {
    id: number
    userId: number
    eventType: number
    description: number
    eventDate: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RectificationEventMinAggregateInputType = {
    id?: true
    userId?: true
    eventType?: true
    description?: true
    eventDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RectificationEventMaxAggregateInputType = {
    id?: true
    userId?: true
    eventType?: true
    description?: true
    eventDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RectificationEventCountAggregateInputType = {
    id?: true
    userId?: true
    eventType?: true
    description?: true
    eventDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RectificationEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RectificationEvent to aggregate.
     */
    where?: RectificationEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RectificationEvents to fetch.
     */
    orderBy?: RectificationEventOrderByWithRelationInput | RectificationEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RectificationEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RectificationEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RectificationEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RectificationEvents
    **/
    _count?: true | RectificationEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RectificationEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RectificationEventMaxAggregateInputType
  }

  export type GetRectificationEventAggregateType<T extends RectificationEventAggregateArgs> = {
        [P in keyof T & keyof AggregateRectificationEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRectificationEvent[P]>
      : GetScalarType<T[P], AggregateRectificationEvent[P]>
  }




  export type RectificationEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RectificationEventWhereInput
    orderBy?: RectificationEventOrderByWithAggregationInput | RectificationEventOrderByWithAggregationInput[]
    by: RectificationEventScalarFieldEnum[] | RectificationEventScalarFieldEnum
    having?: RectificationEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RectificationEventCountAggregateInputType | true
    _min?: RectificationEventMinAggregateInputType
    _max?: RectificationEventMaxAggregateInputType
  }

  export type RectificationEventGroupByOutputType = {
    id: string
    userId: string
    eventType: string
    description: string
    eventDate: Date
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: RectificationEventCountAggregateOutputType | null
    _min: RectificationEventMinAggregateOutputType | null
    _max: RectificationEventMaxAggregateOutputType | null
  }

  type GetRectificationEventGroupByPayload<T extends RectificationEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RectificationEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RectificationEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RectificationEventGroupByOutputType[P]>
            : GetScalarType<T[P], RectificationEventGroupByOutputType[P]>
        }
      >
    >


  export type RectificationEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eventType?: boolean
    description?: boolean
    eventDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rectificationEvent"]>

  export type RectificationEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eventType?: boolean
    description?: boolean
    eventDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rectificationEvent"]>

  export type RectificationEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eventType?: boolean
    description?: boolean
    eventDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rectificationEvent"]>

  export type RectificationEventSelectScalar = {
    id?: boolean
    userId?: boolean
    eventType?: boolean
    description?: boolean
    eventDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RectificationEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "eventType" | "description" | "eventDate" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["rectificationEvent"]>
  export type RectificationEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RectificationEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RectificationEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RectificationEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RectificationEvent"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      eventType: string
      description: string
      eventDate: Date
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rectificationEvent"]>
    composites: {}
  }

  type RectificationEventGetPayload<S extends boolean | null | undefined | RectificationEventDefaultArgs> = $Result.GetResult<Prisma.$RectificationEventPayload, S>

  type RectificationEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RectificationEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RectificationEventCountAggregateInputType | true
    }

  export interface RectificationEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RectificationEvent'], meta: { name: 'RectificationEvent' } }
    /**
     * Find zero or one RectificationEvent that matches the filter.
     * @param {RectificationEventFindUniqueArgs} args - Arguments to find a RectificationEvent
     * @example
     * // Get one RectificationEvent
     * const rectificationEvent = await prisma.rectificationEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RectificationEventFindUniqueArgs>(args: SelectSubset<T, RectificationEventFindUniqueArgs<ExtArgs>>): Prisma__RectificationEventClient<$Result.GetResult<Prisma.$RectificationEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RectificationEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RectificationEventFindUniqueOrThrowArgs} args - Arguments to find a RectificationEvent
     * @example
     * // Get one RectificationEvent
     * const rectificationEvent = await prisma.rectificationEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RectificationEventFindUniqueOrThrowArgs>(args: SelectSubset<T, RectificationEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RectificationEventClient<$Result.GetResult<Prisma.$RectificationEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RectificationEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RectificationEventFindFirstArgs} args - Arguments to find a RectificationEvent
     * @example
     * // Get one RectificationEvent
     * const rectificationEvent = await prisma.rectificationEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RectificationEventFindFirstArgs>(args?: SelectSubset<T, RectificationEventFindFirstArgs<ExtArgs>>): Prisma__RectificationEventClient<$Result.GetResult<Prisma.$RectificationEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RectificationEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RectificationEventFindFirstOrThrowArgs} args - Arguments to find a RectificationEvent
     * @example
     * // Get one RectificationEvent
     * const rectificationEvent = await prisma.rectificationEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RectificationEventFindFirstOrThrowArgs>(args?: SelectSubset<T, RectificationEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__RectificationEventClient<$Result.GetResult<Prisma.$RectificationEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RectificationEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RectificationEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RectificationEvents
     * const rectificationEvents = await prisma.rectificationEvent.findMany()
     * 
     * // Get first 10 RectificationEvents
     * const rectificationEvents = await prisma.rectificationEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rectificationEventWithIdOnly = await prisma.rectificationEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RectificationEventFindManyArgs>(args?: SelectSubset<T, RectificationEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RectificationEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RectificationEvent.
     * @param {RectificationEventCreateArgs} args - Arguments to create a RectificationEvent.
     * @example
     * // Create one RectificationEvent
     * const RectificationEvent = await prisma.rectificationEvent.create({
     *   data: {
     *     // ... data to create a RectificationEvent
     *   }
     * })
     * 
     */
    create<T extends RectificationEventCreateArgs>(args: SelectSubset<T, RectificationEventCreateArgs<ExtArgs>>): Prisma__RectificationEventClient<$Result.GetResult<Prisma.$RectificationEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RectificationEvents.
     * @param {RectificationEventCreateManyArgs} args - Arguments to create many RectificationEvents.
     * @example
     * // Create many RectificationEvents
     * const rectificationEvent = await prisma.rectificationEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RectificationEventCreateManyArgs>(args?: SelectSubset<T, RectificationEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RectificationEvents and returns the data saved in the database.
     * @param {RectificationEventCreateManyAndReturnArgs} args - Arguments to create many RectificationEvents.
     * @example
     * // Create many RectificationEvents
     * const rectificationEvent = await prisma.rectificationEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RectificationEvents and only return the `id`
     * const rectificationEventWithIdOnly = await prisma.rectificationEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RectificationEventCreateManyAndReturnArgs>(args?: SelectSubset<T, RectificationEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RectificationEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RectificationEvent.
     * @param {RectificationEventDeleteArgs} args - Arguments to delete one RectificationEvent.
     * @example
     * // Delete one RectificationEvent
     * const RectificationEvent = await prisma.rectificationEvent.delete({
     *   where: {
     *     // ... filter to delete one RectificationEvent
     *   }
     * })
     * 
     */
    delete<T extends RectificationEventDeleteArgs>(args: SelectSubset<T, RectificationEventDeleteArgs<ExtArgs>>): Prisma__RectificationEventClient<$Result.GetResult<Prisma.$RectificationEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RectificationEvent.
     * @param {RectificationEventUpdateArgs} args - Arguments to update one RectificationEvent.
     * @example
     * // Update one RectificationEvent
     * const rectificationEvent = await prisma.rectificationEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RectificationEventUpdateArgs>(args: SelectSubset<T, RectificationEventUpdateArgs<ExtArgs>>): Prisma__RectificationEventClient<$Result.GetResult<Prisma.$RectificationEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RectificationEvents.
     * @param {RectificationEventDeleteManyArgs} args - Arguments to filter RectificationEvents to delete.
     * @example
     * // Delete a few RectificationEvents
     * const { count } = await prisma.rectificationEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RectificationEventDeleteManyArgs>(args?: SelectSubset<T, RectificationEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RectificationEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RectificationEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RectificationEvents
     * const rectificationEvent = await prisma.rectificationEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RectificationEventUpdateManyArgs>(args: SelectSubset<T, RectificationEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RectificationEvents and returns the data updated in the database.
     * @param {RectificationEventUpdateManyAndReturnArgs} args - Arguments to update many RectificationEvents.
     * @example
     * // Update many RectificationEvents
     * const rectificationEvent = await prisma.rectificationEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RectificationEvents and only return the `id`
     * const rectificationEventWithIdOnly = await prisma.rectificationEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RectificationEventUpdateManyAndReturnArgs>(args: SelectSubset<T, RectificationEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RectificationEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RectificationEvent.
     * @param {RectificationEventUpsertArgs} args - Arguments to update or create a RectificationEvent.
     * @example
     * // Update or create a RectificationEvent
     * const rectificationEvent = await prisma.rectificationEvent.upsert({
     *   create: {
     *     // ... data to create a RectificationEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RectificationEvent we want to update
     *   }
     * })
     */
    upsert<T extends RectificationEventUpsertArgs>(args: SelectSubset<T, RectificationEventUpsertArgs<ExtArgs>>): Prisma__RectificationEventClient<$Result.GetResult<Prisma.$RectificationEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RectificationEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RectificationEventCountArgs} args - Arguments to filter RectificationEvents to count.
     * @example
     * // Count the number of RectificationEvents
     * const count = await prisma.rectificationEvent.count({
     *   where: {
     *     // ... the filter for the RectificationEvents we want to count
     *   }
     * })
    **/
    count<T extends RectificationEventCountArgs>(
      args?: Subset<T, RectificationEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RectificationEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RectificationEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RectificationEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RectificationEventAggregateArgs>(args: Subset<T, RectificationEventAggregateArgs>): Prisma.PrismaPromise<GetRectificationEventAggregateType<T>>

    /**
     * Group by RectificationEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RectificationEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RectificationEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RectificationEventGroupByArgs['orderBy'] }
        : { orderBy?: RectificationEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RectificationEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRectificationEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RectificationEvent model
   */
  readonly fields: RectificationEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RectificationEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RectificationEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RectificationEvent model
   */
  interface RectificationEventFieldRefs {
    readonly id: FieldRef<"RectificationEvent", 'String'>
    readonly userId: FieldRef<"RectificationEvent", 'String'>
    readonly eventType: FieldRef<"RectificationEvent", 'String'>
    readonly description: FieldRef<"RectificationEvent", 'String'>
    readonly eventDate: FieldRef<"RectificationEvent", 'DateTime'>
    readonly notes: FieldRef<"RectificationEvent", 'String'>
    readonly createdAt: FieldRef<"RectificationEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"RectificationEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RectificationEvent findUnique
   */
  export type RectificationEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RectificationEvent
     */
    select?: RectificationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RectificationEvent
     */
    omit?: RectificationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RectificationEventInclude<ExtArgs> | null
    /**
     * Filter, which RectificationEvent to fetch.
     */
    where: RectificationEventWhereUniqueInput
  }

  /**
   * RectificationEvent findUniqueOrThrow
   */
  export type RectificationEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RectificationEvent
     */
    select?: RectificationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RectificationEvent
     */
    omit?: RectificationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RectificationEventInclude<ExtArgs> | null
    /**
     * Filter, which RectificationEvent to fetch.
     */
    where: RectificationEventWhereUniqueInput
  }

  /**
   * RectificationEvent findFirst
   */
  export type RectificationEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RectificationEvent
     */
    select?: RectificationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RectificationEvent
     */
    omit?: RectificationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RectificationEventInclude<ExtArgs> | null
    /**
     * Filter, which RectificationEvent to fetch.
     */
    where?: RectificationEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RectificationEvents to fetch.
     */
    orderBy?: RectificationEventOrderByWithRelationInput | RectificationEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RectificationEvents.
     */
    cursor?: RectificationEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RectificationEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RectificationEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RectificationEvents.
     */
    distinct?: RectificationEventScalarFieldEnum | RectificationEventScalarFieldEnum[]
  }

  /**
   * RectificationEvent findFirstOrThrow
   */
  export type RectificationEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RectificationEvent
     */
    select?: RectificationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RectificationEvent
     */
    omit?: RectificationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RectificationEventInclude<ExtArgs> | null
    /**
     * Filter, which RectificationEvent to fetch.
     */
    where?: RectificationEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RectificationEvents to fetch.
     */
    orderBy?: RectificationEventOrderByWithRelationInput | RectificationEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RectificationEvents.
     */
    cursor?: RectificationEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RectificationEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RectificationEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RectificationEvents.
     */
    distinct?: RectificationEventScalarFieldEnum | RectificationEventScalarFieldEnum[]
  }

  /**
   * RectificationEvent findMany
   */
  export type RectificationEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RectificationEvent
     */
    select?: RectificationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RectificationEvent
     */
    omit?: RectificationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RectificationEventInclude<ExtArgs> | null
    /**
     * Filter, which RectificationEvents to fetch.
     */
    where?: RectificationEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RectificationEvents to fetch.
     */
    orderBy?: RectificationEventOrderByWithRelationInput | RectificationEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RectificationEvents.
     */
    cursor?: RectificationEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RectificationEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RectificationEvents.
     */
    skip?: number
    distinct?: RectificationEventScalarFieldEnum | RectificationEventScalarFieldEnum[]
  }

  /**
   * RectificationEvent create
   */
  export type RectificationEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RectificationEvent
     */
    select?: RectificationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RectificationEvent
     */
    omit?: RectificationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RectificationEventInclude<ExtArgs> | null
    /**
     * The data needed to create a RectificationEvent.
     */
    data: XOR<RectificationEventCreateInput, RectificationEventUncheckedCreateInput>
  }

  /**
   * RectificationEvent createMany
   */
  export type RectificationEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RectificationEvents.
     */
    data: RectificationEventCreateManyInput | RectificationEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RectificationEvent createManyAndReturn
   */
  export type RectificationEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RectificationEvent
     */
    select?: RectificationEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RectificationEvent
     */
    omit?: RectificationEventOmit<ExtArgs> | null
    /**
     * The data used to create many RectificationEvents.
     */
    data: RectificationEventCreateManyInput | RectificationEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RectificationEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RectificationEvent update
   */
  export type RectificationEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RectificationEvent
     */
    select?: RectificationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RectificationEvent
     */
    omit?: RectificationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RectificationEventInclude<ExtArgs> | null
    /**
     * The data needed to update a RectificationEvent.
     */
    data: XOR<RectificationEventUpdateInput, RectificationEventUncheckedUpdateInput>
    /**
     * Choose, which RectificationEvent to update.
     */
    where: RectificationEventWhereUniqueInput
  }

  /**
   * RectificationEvent updateMany
   */
  export type RectificationEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RectificationEvents.
     */
    data: XOR<RectificationEventUpdateManyMutationInput, RectificationEventUncheckedUpdateManyInput>
    /**
     * Filter which RectificationEvents to update
     */
    where?: RectificationEventWhereInput
    /**
     * Limit how many RectificationEvents to update.
     */
    limit?: number
  }

  /**
   * RectificationEvent updateManyAndReturn
   */
  export type RectificationEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RectificationEvent
     */
    select?: RectificationEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RectificationEvent
     */
    omit?: RectificationEventOmit<ExtArgs> | null
    /**
     * The data used to update RectificationEvents.
     */
    data: XOR<RectificationEventUpdateManyMutationInput, RectificationEventUncheckedUpdateManyInput>
    /**
     * Filter which RectificationEvents to update
     */
    where?: RectificationEventWhereInput
    /**
     * Limit how many RectificationEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RectificationEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RectificationEvent upsert
   */
  export type RectificationEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RectificationEvent
     */
    select?: RectificationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RectificationEvent
     */
    omit?: RectificationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RectificationEventInclude<ExtArgs> | null
    /**
     * The filter to search for the RectificationEvent to update in case it exists.
     */
    where: RectificationEventWhereUniqueInput
    /**
     * In case the RectificationEvent found by the `where` argument doesn't exist, create a new RectificationEvent with this data.
     */
    create: XOR<RectificationEventCreateInput, RectificationEventUncheckedCreateInput>
    /**
     * In case the RectificationEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RectificationEventUpdateInput, RectificationEventUncheckedUpdateInput>
  }

  /**
   * RectificationEvent delete
   */
  export type RectificationEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RectificationEvent
     */
    select?: RectificationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RectificationEvent
     */
    omit?: RectificationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RectificationEventInclude<ExtArgs> | null
    /**
     * Filter which RectificationEvent to delete.
     */
    where: RectificationEventWhereUniqueInput
  }

  /**
   * RectificationEvent deleteMany
   */
  export type RectificationEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RectificationEvents to delete
     */
    where?: RectificationEventWhereInput
    /**
     * Limit how many RectificationEvents to delete.
     */
    limit?: number
  }

  /**
   * RectificationEvent without action
   */
  export type RectificationEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RectificationEvent
     */
    select?: RectificationEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RectificationEvent
     */
    omit?: RectificationEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RectificationEventInclude<ExtArgs> | null
  }


  /**
   * Model CartaNatal
   */

  export type AggregateCartaNatal = {
    _count: CartaNatalCountAggregateOutputType | null
    _min: CartaNatalMinAggregateOutputType | null
    _max: CartaNatalMaxAggregateOutputType | null
  }

  export type CartaNatalMinAggregateOutputType = {
    id: string | null
    userId: string | null
    tipo: string | null
    dataCompleta: string | null
    dataReducida: string | null
    fechaNacimiento: Date | null
    lugarNacimiento: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CartaNatalMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    tipo: string | null
    dataCompleta: string | null
    dataReducida: string | null
    fechaNacimiento: Date | null
    lugarNacimiento: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CartaNatalCountAggregateOutputType = {
    id: number
    userId: number
    tipo: number
    dataCompleta: number
    dataReducida: number
    fechaNacimiento: number
    lugarNacimiento: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CartaNatalMinAggregateInputType = {
    id?: true
    userId?: true
    tipo?: true
    dataCompleta?: true
    dataReducida?: true
    fechaNacimiento?: true
    lugarNacimiento?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CartaNatalMaxAggregateInputType = {
    id?: true
    userId?: true
    tipo?: true
    dataCompleta?: true
    dataReducida?: true
    fechaNacimiento?: true
    lugarNacimiento?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CartaNatalCountAggregateInputType = {
    id?: true
    userId?: true
    tipo?: true
    dataCompleta?: true
    dataReducida?: true
    fechaNacimiento?: true
    lugarNacimiento?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CartaNatalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CartaNatal to aggregate.
     */
    where?: CartaNatalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartaNatals to fetch.
     */
    orderBy?: CartaNatalOrderByWithRelationInput | CartaNatalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CartaNatalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartaNatals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartaNatals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CartaNatals
    **/
    _count?: true | CartaNatalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CartaNatalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CartaNatalMaxAggregateInputType
  }

  export type GetCartaNatalAggregateType<T extends CartaNatalAggregateArgs> = {
        [P in keyof T & keyof AggregateCartaNatal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCartaNatal[P]>
      : GetScalarType<T[P], AggregateCartaNatal[P]>
  }




  export type CartaNatalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartaNatalWhereInput
    orderBy?: CartaNatalOrderByWithAggregationInput | CartaNatalOrderByWithAggregationInput[]
    by: CartaNatalScalarFieldEnum[] | CartaNatalScalarFieldEnum
    having?: CartaNatalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CartaNatalCountAggregateInputType | true
    _min?: CartaNatalMinAggregateInputType
    _max?: CartaNatalMaxAggregateInputType
  }

  export type CartaNatalGroupByOutputType = {
    id: string
    userId: string
    tipo: string
    dataCompleta: string
    dataReducida: string
    fechaNacimiento: Date
    lugarNacimiento: string
    createdAt: Date
    updatedAt: Date
    _count: CartaNatalCountAggregateOutputType | null
    _min: CartaNatalMinAggregateOutputType | null
    _max: CartaNatalMaxAggregateOutputType | null
  }

  type GetCartaNatalGroupByPayload<T extends CartaNatalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CartaNatalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CartaNatalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CartaNatalGroupByOutputType[P]>
            : GetScalarType<T[P], CartaNatalGroupByOutputType[P]>
        }
      >
    >


  export type CartaNatalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tipo?: boolean
    dataCompleta?: boolean
    dataReducida?: boolean
    fechaNacimiento?: boolean
    lugarNacimiento?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cartaNatal"]>

  export type CartaNatalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tipo?: boolean
    dataCompleta?: boolean
    dataReducida?: boolean
    fechaNacimiento?: boolean
    lugarNacimiento?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cartaNatal"]>

  export type CartaNatalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tipo?: boolean
    dataCompleta?: boolean
    dataReducida?: boolean
    fechaNacimiento?: boolean
    lugarNacimiento?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cartaNatal"]>

  export type CartaNatalSelectScalar = {
    id?: boolean
    userId?: boolean
    tipo?: boolean
    dataCompleta?: boolean
    dataReducida?: boolean
    fechaNacimiento?: boolean
    lugarNacimiento?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CartaNatalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "tipo" | "dataCompleta" | "dataReducida" | "fechaNacimiento" | "lugarNacimiento" | "createdAt" | "updatedAt", ExtArgs["result"]["cartaNatal"]>
  export type CartaNatalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CartaNatalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CartaNatalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CartaNatalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CartaNatal"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      tipo: string
      dataCompleta: string
      dataReducida: string
      fechaNacimiento: Date
      lugarNacimiento: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cartaNatal"]>
    composites: {}
  }

  type CartaNatalGetPayload<S extends boolean | null | undefined | CartaNatalDefaultArgs> = $Result.GetResult<Prisma.$CartaNatalPayload, S>

  type CartaNatalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CartaNatalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CartaNatalCountAggregateInputType | true
    }

  export interface CartaNatalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CartaNatal'], meta: { name: 'CartaNatal' } }
    /**
     * Find zero or one CartaNatal that matches the filter.
     * @param {CartaNatalFindUniqueArgs} args - Arguments to find a CartaNatal
     * @example
     * // Get one CartaNatal
     * const cartaNatal = await prisma.cartaNatal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CartaNatalFindUniqueArgs>(args: SelectSubset<T, CartaNatalFindUniqueArgs<ExtArgs>>): Prisma__CartaNatalClient<$Result.GetResult<Prisma.$CartaNatalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CartaNatal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CartaNatalFindUniqueOrThrowArgs} args - Arguments to find a CartaNatal
     * @example
     * // Get one CartaNatal
     * const cartaNatal = await prisma.cartaNatal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CartaNatalFindUniqueOrThrowArgs>(args: SelectSubset<T, CartaNatalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CartaNatalClient<$Result.GetResult<Prisma.$CartaNatalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CartaNatal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartaNatalFindFirstArgs} args - Arguments to find a CartaNatal
     * @example
     * // Get one CartaNatal
     * const cartaNatal = await prisma.cartaNatal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CartaNatalFindFirstArgs>(args?: SelectSubset<T, CartaNatalFindFirstArgs<ExtArgs>>): Prisma__CartaNatalClient<$Result.GetResult<Prisma.$CartaNatalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CartaNatal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartaNatalFindFirstOrThrowArgs} args - Arguments to find a CartaNatal
     * @example
     * // Get one CartaNatal
     * const cartaNatal = await prisma.cartaNatal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CartaNatalFindFirstOrThrowArgs>(args?: SelectSubset<T, CartaNatalFindFirstOrThrowArgs<ExtArgs>>): Prisma__CartaNatalClient<$Result.GetResult<Prisma.$CartaNatalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CartaNatals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartaNatalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CartaNatals
     * const cartaNatals = await prisma.cartaNatal.findMany()
     * 
     * // Get first 10 CartaNatals
     * const cartaNatals = await prisma.cartaNatal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cartaNatalWithIdOnly = await prisma.cartaNatal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CartaNatalFindManyArgs>(args?: SelectSubset<T, CartaNatalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartaNatalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CartaNatal.
     * @param {CartaNatalCreateArgs} args - Arguments to create a CartaNatal.
     * @example
     * // Create one CartaNatal
     * const CartaNatal = await prisma.cartaNatal.create({
     *   data: {
     *     // ... data to create a CartaNatal
     *   }
     * })
     * 
     */
    create<T extends CartaNatalCreateArgs>(args: SelectSubset<T, CartaNatalCreateArgs<ExtArgs>>): Prisma__CartaNatalClient<$Result.GetResult<Prisma.$CartaNatalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CartaNatals.
     * @param {CartaNatalCreateManyArgs} args - Arguments to create many CartaNatals.
     * @example
     * // Create many CartaNatals
     * const cartaNatal = await prisma.cartaNatal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CartaNatalCreateManyArgs>(args?: SelectSubset<T, CartaNatalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CartaNatals and returns the data saved in the database.
     * @param {CartaNatalCreateManyAndReturnArgs} args - Arguments to create many CartaNatals.
     * @example
     * // Create many CartaNatals
     * const cartaNatal = await prisma.cartaNatal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CartaNatals and only return the `id`
     * const cartaNatalWithIdOnly = await prisma.cartaNatal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CartaNatalCreateManyAndReturnArgs>(args?: SelectSubset<T, CartaNatalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartaNatalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CartaNatal.
     * @param {CartaNatalDeleteArgs} args - Arguments to delete one CartaNatal.
     * @example
     * // Delete one CartaNatal
     * const CartaNatal = await prisma.cartaNatal.delete({
     *   where: {
     *     // ... filter to delete one CartaNatal
     *   }
     * })
     * 
     */
    delete<T extends CartaNatalDeleteArgs>(args: SelectSubset<T, CartaNatalDeleteArgs<ExtArgs>>): Prisma__CartaNatalClient<$Result.GetResult<Prisma.$CartaNatalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CartaNatal.
     * @param {CartaNatalUpdateArgs} args - Arguments to update one CartaNatal.
     * @example
     * // Update one CartaNatal
     * const cartaNatal = await prisma.cartaNatal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CartaNatalUpdateArgs>(args: SelectSubset<T, CartaNatalUpdateArgs<ExtArgs>>): Prisma__CartaNatalClient<$Result.GetResult<Prisma.$CartaNatalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CartaNatals.
     * @param {CartaNatalDeleteManyArgs} args - Arguments to filter CartaNatals to delete.
     * @example
     * // Delete a few CartaNatals
     * const { count } = await prisma.cartaNatal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CartaNatalDeleteManyArgs>(args?: SelectSubset<T, CartaNatalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CartaNatals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartaNatalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CartaNatals
     * const cartaNatal = await prisma.cartaNatal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CartaNatalUpdateManyArgs>(args: SelectSubset<T, CartaNatalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CartaNatals and returns the data updated in the database.
     * @param {CartaNatalUpdateManyAndReturnArgs} args - Arguments to update many CartaNatals.
     * @example
     * // Update many CartaNatals
     * const cartaNatal = await prisma.cartaNatal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CartaNatals and only return the `id`
     * const cartaNatalWithIdOnly = await prisma.cartaNatal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CartaNatalUpdateManyAndReturnArgs>(args: SelectSubset<T, CartaNatalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartaNatalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CartaNatal.
     * @param {CartaNatalUpsertArgs} args - Arguments to update or create a CartaNatal.
     * @example
     * // Update or create a CartaNatal
     * const cartaNatal = await prisma.cartaNatal.upsert({
     *   create: {
     *     // ... data to create a CartaNatal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CartaNatal we want to update
     *   }
     * })
     */
    upsert<T extends CartaNatalUpsertArgs>(args: SelectSubset<T, CartaNatalUpsertArgs<ExtArgs>>): Prisma__CartaNatalClient<$Result.GetResult<Prisma.$CartaNatalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CartaNatals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartaNatalCountArgs} args - Arguments to filter CartaNatals to count.
     * @example
     * // Count the number of CartaNatals
     * const count = await prisma.cartaNatal.count({
     *   where: {
     *     // ... the filter for the CartaNatals we want to count
     *   }
     * })
    **/
    count<T extends CartaNatalCountArgs>(
      args?: Subset<T, CartaNatalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CartaNatalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CartaNatal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartaNatalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CartaNatalAggregateArgs>(args: Subset<T, CartaNatalAggregateArgs>): Prisma.PrismaPromise<GetCartaNatalAggregateType<T>>

    /**
     * Group by CartaNatal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartaNatalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CartaNatalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CartaNatalGroupByArgs['orderBy'] }
        : { orderBy?: CartaNatalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CartaNatalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCartaNatalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CartaNatal model
   */
  readonly fields: CartaNatalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CartaNatal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CartaNatalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CartaNatal model
   */
  interface CartaNatalFieldRefs {
    readonly id: FieldRef<"CartaNatal", 'String'>
    readonly userId: FieldRef<"CartaNatal", 'String'>
    readonly tipo: FieldRef<"CartaNatal", 'String'>
    readonly dataCompleta: FieldRef<"CartaNatal", 'String'>
    readonly dataReducida: FieldRef<"CartaNatal", 'String'>
    readonly fechaNacimiento: FieldRef<"CartaNatal", 'DateTime'>
    readonly lugarNacimiento: FieldRef<"CartaNatal", 'String'>
    readonly createdAt: FieldRef<"CartaNatal", 'DateTime'>
    readonly updatedAt: FieldRef<"CartaNatal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CartaNatal findUnique
   */
  export type CartaNatalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartaNatal
     */
    select?: CartaNatalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartaNatal
     */
    omit?: CartaNatalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartaNatalInclude<ExtArgs> | null
    /**
     * Filter, which CartaNatal to fetch.
     */
    where: CartaNatalWhereUniqueInput
  }

  /**
   * CartaNatal findUniqueOrThrow
   */
  export type CartaNatalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartaNatal
     */
    select?: CartaNatalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartaNatal
     */
    omit?: CartaNatalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartaNatalInclude<ExtArgs> | null
    /**
     * Filter, which CartaNatal to fetch.
     */
    where: CartaNatalWhereUniqueInput
  }

  /**
   * CartaNatal findFirst
   */
  export type CartaNatalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartaNatal
     */
    select?: CartaNatalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartaNatal
     */
    omit?: CartaNatalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartaNatalInclude<ExtArgs> | null
    /**
     * Filter, which CartaNatal to fetch.
     */
    where?: CartaNatalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartaNatals to fetch.
     */
    orderBy?: CartaNatalOrderByWithRelationInput | CartaNatalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CartaNatals.
     */
    cursor?: CartaNatalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartaNatals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartaNatals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartaNatals.
     */
    distinct?: CartaNatalScalarFieldEnum | CartaNatalScalarFieldEnum[]
  }

  /**
   * CartaNatal findFirstOrThrow
   */
  export type CartaNatalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartaNatal
     */
    select?: CartaNatalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartaNatal
     */
    omit?: CartaNatalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartaNatalInclude<ExtArgs> | null
    /**
     * Filter, which CartaNatal to fetch.
     */
    where?: CartaNatalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartaNatals to fetch.
     */
    orderBy?: CartaNatalOrderByWithRelationInput | CartaNatalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CartaNatals.
     */
    cursor?: CartaNatalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartaNatals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartaNatals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartaNatals.
     */
    distinct?: CartaNatalScalarFieldEnum | CartaNatalScalarFieldEnum[]
  }

  /**
   * CartaNatal findMany
   */
  export type CartaNatalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartaNatal
     */
    select?: CartaNatalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartaNatal
     */
    omit?: CartaNatalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartaNatalInclude<ExtArgs> | null
    /**
     * Filter, which CartaNatals to fetch.
     */
    where?: CartaNatalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartaNatals to fetch.
     */
    orderBy?: CartaNatalOrderByWithRelationInput | CartaNatalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CartaNatals.
     */
    cursor?: CartaNatalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartaNatals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartaNatals.
     */
    skip?: number
    distinct?: CartaNatalScalarFieldEnum | CartaNatalScalarFieldEnum[]
  }

  /**
   * CartaNatal create
   */
  export type CartaNatalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartaNatal
     */
    select?: CartaNatalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartaNatal
     */
    omit?: CartaNatalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartaNatalInclude<ExtArgs> | null
    /**
     * The data needed to create a CartaNatal.
     */
    data: XOR<CartaNatalCreateInput, CartaNatalUncheckedCreateInput>
  }

  /**
   * CartaNatal createMany
   */
  export type CartaNatalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CartaNatals.
     */
    data: CartaNatalCreateManyInput | CartaNatalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CartaNatal createManyAndReturn
   */
  export type CartaNatalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartaNatal
     */
    select?: CartaNatalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CartaNatal
     */
    omit?: CartaNatalOmit<ExtArgs> | null
    /**
     * The data used to create many CartaNatals.
     */
    data: CartaNatalCreateManyInput | CartaNatalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartaNatalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CartaNatal update
   */
  export type CartaNatalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartaNatal
     */
    select?: CartaNatalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartaNatal
     */
    omit?: CartaNatalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartaNatalInclude<ExtArgs> | null
    /**
     * The data needed to update a CartaNatal.
     */
    data: XOR<CartaNatalUpdateInput, CartaNatalUncheckedUpdateInput>
    /**
     * Choose, which CartaNatal to update.
     */
    where: CartaNatalWhereUniqueInput
  }

  /**
   * CartaNatal updateMany
   */
  export type CartaNatalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CartaNatals.
     */
    data: XOR<CartaNatalUpdateManyMutationInput, CartaNatalUncheckedUpdateManyInput>
    /**
     * Filter which CartaNatals to update
     */
    where?: CartaNatalWhereInput
    /**
     * Limit how many CartaNatals to update.
     */
    limit?: number
  }

  /**
   * CartaNatal updateManyAndReturn
   */
  export type CartaNatalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartaNatal
     */
    select?: CartaNatalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CartaNatal
     */
    omit?: CartaNatalOmit<ExtArgs> | null
    /**
     * The data used to update CartaNatals.
     */
    data: XOR<CartaNatalUpdateManyMutationInput, CartaNatalUncheckedUpdateManyInput>
    /**
     * Filter which CartaNatals to update
     */
    where?: CartaNatalWhereInput
    /**
     * Limit how many CartaNatals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartaNatalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CartaNatal upsert
   */
  export type CartaNatalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartaNatal
     */
    select?: CartaNatalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartaNatal
     */
    omit?: CartaNatalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartaNatalInclude<ExtArgs> | null
    /**
     * The filter to search for the CartaNatal to update in case it exists.
     */
    where: CartaNatalWhereUniqueInput
    /**
     * In case the CartaNatal found by the `where` argument doesn't exist, create a new CartaNatal with this data.
     */
    create: XOR<CartaNatalCreateInput, CartaNatalUncheckedCreateInput>
    /**
     * In case the CartaNatal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CartaNatalUpdateInput, CartaNatalUncheckedUpdateInput>
  }

  /**
   * CartaNatal delete
   */
  export type CartaNatalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartaNatal
     */
    select?: CartaNatalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartaNatal
     */
    omit?: CartaNatalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartaNatalInclude<ExtArgs> | null
    /**
     * Filter which CartaNatal to delete.
     */
    where: CartaNatalWhereUniqueInput
  }

  /**
   * CartaNatal deleteMany
   */
  export type CartaNatalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CartaNatals to delete
     */
    where?: CartaNatalWhereInput
    /**
     * Limit how many CartaNatals to delete.
     */
    limit?: number
  }

  /**
   * CartaNatal without action
   */
  export type CartaNatalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartaNatal
     */
    select?: CartaNatalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartaNatal
     */
    omit?: CartaNatalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartaNatalInclude<ExtArgs> | null
  }


  /**
   * Model InterpretacionCache
   */

  export type AggregateInterpretacionCache = {
    _count: InterpretacionCacheCountAggregateOutputType | null
    _avg: InterpretacionCacheAvgAggregateOutputType | null
    _sum: InterpretacionCacheSumAggregateOutputType | null
    _min: InterpretacionCacheMinAggregateOutputType | null
    _max: InterpretacionCacheMaxAggregateOutputType | null
  }

  export type InterpretacionCacheAvgAggregateOutputType = {
    tiempoGeneracion: number | null
  }

  export type InterpretacionCacheSumAggregateOutputType = {
    tiempoGeneracion: number | null
  }

  export type InterpretacionCacheMinAggregateOutputType = {
    id: string | null
    userId: string | null
    fechaNacimiento: Date | null
    lugarNacimiento: string | null
    gender: string | null
    tipo: string | null
    interpretacionNarrativa: string | null
    interpretacionesIndividuales: string | null
    tiempoGeneracion: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InterpretacionCacheMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    fechaNacimiento: Date | null
    lugarNacimiento: string | null
    gender: string | null
    tipo: string | null
    interpretacionNarrativa: string | null
    interpretacionesIndividuales: string | null
    tiempoGeneracion: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InterpretacionCacheCountAggregateOutputType = {
    id: number
    userId: number
    fechaNacimiento: number
    lugarNacimiento: number
    gender: number
    tipo: number
    interpretacionNarrativa: number
    interpretacionesIndividuales: number
    tiempoGeneracion: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InterpretacionCacheAvgAggregateInputType = {
    tiempoGeneracion?: true
  }

  export type InterpretacionCacheSumAggregateInputType = {
    tiempoGeneracion?: true
  }

  export type InterpretacionCacheMinAggregateInputType = {
    id?: true
    userId?: true
    fechaNacimiento?: true
    lugarNacimiento?: true
    gender?: true
    tipo?: true
    interpretacionNarrativa?: true
    interpretacionesIndividuales?: true
    tiempoGeneracion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InterpretacionCacheMaxAggregateInputType = {
    id?: true
    userId?: true
    fechaNacimiento?: true
    lugarNacimiento?: true
    gender?: true
    tipo?: true
    interpretacionNarrativa?: true
    interpretacionesIndividuales?: true
    tiempoGeneracion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InterpretacionCacheCountAggregateInputType = {
    id?: true
    userId?: true
    fechaNacimiento?: true
    lugarNacimiento?: true
    gender?: true
    tipo?: true
    interpretacionNarrativa?: true
    interpretacionesIndividuales?: true
    tiempoGeneracion?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InterpretacionCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterpretacionCache to aggregate.
     */
    where?: InterpretacionCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterpretacionCaches to fetch.
     */
    orderBy?: InterpretacionCacheOrderByWithRelationInput | InterpretacionCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InterpretacionCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterpretacionCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterpretacionCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InterpretacionCaches
    **/
    _count?: true | InterpretacionCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InterpretacionCacheAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InterpretacionCacheSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InterpretacionCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InterpretacionCacheMaxAggregateInputType
  }

  export type GetInterpretacionCacheAggregateType<T extends InterpretacionCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateInterpretacionCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInterpretacionCache[P]>
      : GetScalarType<T[P], AggregateInterpretacionCache[P]>
  }




  export type InterpretacionCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterpretacionCacheWhereInput
    orderBy?: InterpretacionCacheOrderByWithAggregationInput | InterpretacionCacheOrderByWithAggregationInput[]
    by: InterpretacionCacheScalarFieldEnum[] | InterpretacionCacheScalarFieldEnum
    having?: InterpretacionCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InterpretacionCacheCountAggregateInputType | true
    _avg?: InterpretacionCacheAvgAggregateInputType
    _sum?: InterpretacionCacheSumAggregateInputType
    _min?: InterpretacionCacheMinAggregateInputType
    _max?: InterpretacionCacheMaxAggregateInputType
  }

  export type InterpretacionCacheGroupByOutputType = {
    id: string
    userId: string
    fechaNacimiento: Date
    lugarNacimiento: string
    gender: string
    tipo: string
    interpretacionNarrativa: string
    interpretacionesIndividuales: string
    tiempoGeneracion: number
    createdAt: Date
    updatedAt: Date
    _count: InterpretacionCacheCountAggregateOutputType | null
    _avg: InterpretacionCacheAvgAggregateOutputType | null
    _sum: InterpretacionCacheSumAggregateOutputType | null
    _min: InterpretacionCacheMinAggregateOutputType | null
    _max: InterpretacionCacheMaxAggregateOutputType | null
  }

  type GetInterpretacionCacheGroupByPayload<T extends InterpretacionCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InterpretacionCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InterpretacionCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InterpretacionCacheGroupByOutputType[P]>
            : GetScalarType<T[P], InterpretacionCacheGroupByOutputType[P]>
        }
      >
    >


  export type InterpretacionCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fechaNacimiento?: boolean
    lugarNacimiento?: boolean
    gender?: boolean
    tipo?: boolean
    interpretacionNarrativa?: boolean
    interpretacionesIndividuales?: boolean
    tiempoGeneracion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interpretacionCache"]>

  export type InterpretacionCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fechaNacimiento?: boolean
    lugarNacimiento?: boolean
    gender?: boolean
    tipo?: boolean
    interpretacionNarrativa?: boolean
    interpretacionesIndividuales?: boolean
    tiempoGeneracion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interpretacionCache"]>

  export type InterpretacionCacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fechaNacimiento?: boolean
    lugarNacimiento?: boolean
    gender?: boolean
    tipo?: boolean
    interpretacionNarrativa?: boolean
    interpretacionesIndividuales?: boolean
    tiempoGeneracion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interpretacionCache"]>

  export type InterpretacionCacheSelectScalar = {
    id?: boolean
    userId?: boolean
    fechaNacimiento?: boolean
    lugarNacimiento?: boolean
    gender?: boolean
    tipo?: boolean
    interpretacionNarrativa?: boolean
    interpretacionesIndividuales?: boolean
    tiempoGeneracion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InterpretacionCacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "fechaNacimiento" | "lugarNacimiento" | "gender" | "tipo" | "interpretacionNarrativa" | "interpretacionesIndividuales" | "tiempoGeneracion" | "createdAt" | "updatedAt", ExtArgs["result"]["interpretacionCache"]>
  export type InterpretacionCacheInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type InterpretacionCacheIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type InterpretacionCacheIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $InterpretacionCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InterpretacionCache"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      fechaNacimiento: Date
      lugarNacimiento: string
      gender: string
      tipo: string
      interpretacionNarrativa: string
      interpretacionesIndividuales: string
      tiempoGeneracion: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["interpretacionCache"]>
    composites: {}
  }

  type InterpretacionCacheGetPayload<S extends boolean | null | undefined | InterpretacionCacheDefaultArgs> = $Result.GetResult<Prisma.$InterpretacionCachePayload, S>

  type InterpretacionCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InterpretacionCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InterpretacionCacheCountAggregateInputType | true
    }

  export interface InterpretacionCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InterpretacionCache'], meta: { name: 'InterpretacionCache' } }
    /**
     * Find zero or one InterpretacionCache that matches the filter.
     * @param {InterpretacionCacheFindUniqueArgs} args - Arguments to find a InterpretacionCache
     * @example
     * // Get one InterpretacionCache
     * const interpretacionCache = await prisma.interpretacionCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InterpretacionCacheFindUniqueArgs>(args: SelectSubset<T, InterpretacionCacheFindUniqueArgs<ExtArgs>>): Prisma__InterpretacionCacheClient<$Result.GetResult<Prisma.$InterpretacionCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InterpretacionCache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InterpretacionCacheFindUniqueOrThrowArgs} args - Arguments to find a InterpretacionCache
     * @example
     * // Get one InterpretacionCache
     * const interpretacionCache = await prisma.interpretacionCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InterpretacionCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, InterpretacionCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InterpretacionCacheClient<$Result.GetResult<Prisma.$InterpretacionCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InterpretacionCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterpretacionCacheFindFirstArgs} args - Arguments to find a InterpretacionCache
     * @example
     * // Get one InterpretacionCache
     * const interpretacionCache = await prisma.interpretacionCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InterpretacionCacheFindFirstArgs>(args?: SelectSubset<T, InterpretacionCacheFindFirstArgs<ExtArgs>>): Prisma__InterpretacionCacheClient<$Result.GetResult<Prisma.$InterpretacionCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InterpretacionCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterpretacionCacheFindFirstOrThrowArgs} args - Arguments to find a InterpretacionCache
     * @example
     * // Get one InterpretacionCache
     * const interpretacionCache = await prisma.interpretacionCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InterpretacionCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, InterpretacionCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__InterpretacionCacheClient<$Result.GetResult<Prisma.$InterpretacionCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InterpretacionCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterpretacionCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InterpretacionCaches
     * const interpretacionCaches = await prisma.interpretacionCache.findMany()
     * 
     * // Get first 10 InterpretacionCaches
     * const interpretacionCaches = await prisma.interpretacionCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const interpretacionCacheWithIdOnly = await prisma.interpretacionCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InterpretacionCacheFindManyArgs>(args?: SelectSubset<T, InterpretacionCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterpretacionCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InterpretacionCache.
     * @param {InterpretacionCacheCreateArgs} args - Arguments to create a InterpretacionCache.
     * @example
     * // Create one InterpretacionCache
     * const InterpretacionCache = await prisma.interpretacionCache.create({
     *   data: {
     *     // ... data to create a InterpretacionCache
     *   }
     * })
     * 
     */
    create<T extends InterpretacionCacheCreateArgs>(args: SelectSubset<T, InterpretacionCacheCreateArgs<ExtArgs>>): Prisma__InterpretacionCacheClient<$Result.GetResult<Prisma.$InterpretacionCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InterpretacionCaches.
     * @param {InterpretacionCacheCreateManyArgs} args - Arguments to create many InterpretacionCaches.
     * @example
     * // Create many InterpretacionCaches
     * const interpretacionCache = await prisma.interpretacionCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InterpretacionCacheCreateManyArgs>(args?: SelectSubset<T, InterpretacionCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InterpretacionCaches and returns the data saved in the database.
     * @param {InterpretacionCacheCreateManyAndReturnArgs} args - Arguments to create many InterpretacionCaches.
     * @example
     * // Create many InterpretacionCaches
     * const interpretacionCache = await prisma.interpretacionCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InterpretacionCaches and only return the `id`
     * const interpretacionCacheWithIdOnly = await prisma.interpretacionCache.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InterpretacionCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, InterpretacionCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterpretacionCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InterpretacionCache.
     * @param {InterpretacionCacheDeleteArgs} args - Arguments to delete one InterpretacionCache.
     * @example
     * // Delete one InterpretacionCache
     * const InterpretacionCache = await prisma.interpretacionCache.delete({
     *   where: {
     *     // ... filter to delete one InterpretacionCache
     *   }
     * })
     * 
     */
    delete<T extends InterpretacionCacheDeleteArgs>(args: SelectSubset<T, InterpretacionCacheDeleteArgs<ExtArgs>>): Prisma__InterpretacionCacheClient<$Result.GetResult<Prisma.$InterpretacionCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InterpretacionCache.
     * @param {InterpretacionCacheUpdateArgs} args - Arguments to update one InterpretacionCache.
     * @example
     * // Update one InterpretacionCache
     * const interpretacionCache = await prisma.interpretacionCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InterpretacionCacheUpdateArgs>(args: SelectSubset<T, InterpretacionCacheUpdateArgs<ExtArgs>>): Prisma__InterpretacionCacheClient<$Result.GetResult<Prisma.$InterpretacionCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InterpretacionCaches.
     * @param {InterpretacionCacheDeleteManyArgs} args - Arguments to filter InterpretacionCaches to delete.
     * @example
     * // Delete a few InterpretacionCaches
     * const { count } = await prisma.interpretacionCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InterpretacionCacheDeleteManyArgs>(args?: SelectSubset<T, InterpretacionCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InterpretacionCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterpretacionCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InterpretacionCaches
     * const interpretacionCache = await prisma.interpretacionCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InterpretacionCacheUpdateManyArgs>(args: SelectSubset<T, InterpretacionCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InterpretacionCaches and returns the data updated in the database.
     * @param {InterpretacionCacheUpdateManyAndReturnArgs} args - Arguments to update many InterpretacionCaches.
     * @example
     * // Update many InterpretacionCaches
     * const interpretacionCache = await prisma.interpretacionCache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InterpretacionCaches and only return the `id`
     * const interpretacionCacheWithIdOnly = await prisma.interpretacionCache.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InterpretacionCacheUpdateManyAndReturnArgs>(args: SelectSubset<T, InterpretacionCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterpretacionCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InterpretacionCache.
     * @param {InterpretacionCacheUpsertArgs} args - Arguments to update or create a InterpretacionCache.
     * @example
     * // Update or create a InterpretacionCache
     * const interpretacionCache = await prisma.interpretacionCache.upsert({
     *   create: {
     *     // ... data to create a InterpretacionCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InterpretacionCache we want to update
     *   }
     * })
     */
    upsert<T extends InterpretacionCacheUpsertArgs>(args: SelectSubset<T, InterpretacionCacheUpsertArgs<ExtArgs>>): Prisma__InterpretacionCacheClient<$Result.GetResult<Prisma.$InterpretacionCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InterpretacionCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterpretacionCacheCountArgs} args - Arguments to filter InterpretacionCaches to count.
     * @example
     * // Count the number of InterpretacionCaches
     * const count = await prisma.interpretacionCache.count({
     *   where: {
     *     // ... the filter for the InterpretacionCaches we want to count
     *   }
     * })
    **/
    count<T extends InterpretacionCacheCountArgs>(
      args?: Subset<T, InterpretacionCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InterpretacionCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InterpretacionCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterpretacionCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InterpretacionCacheAggregateArgs>(args: Subset<T, InterpretacionCacheAggregateArgs>): Prisma.PrismaPromise<GetInterpretacionCacheAggregateType<T>>

    /**
     * Group by InterpretacionCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterpretacionCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InterpretacionCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InterpretacionCacheGroupByArgs['orderBy'] }
        : { orderBy?: InterpretacionCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InterpretacionCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInterpretacionCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InterpretacionCache model
   */
  readonly fields: InterpretacionCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InterpretacionCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InterpretacionCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InterpretacionCache model
   */
  interface InterpretacionCacheFieldRefs {
    readonly id: FieldRef<"InterpretacionCache", 'String'>
    readonly userId: FieldRef<"InterpretacionCache", 'String'>
    readonly fechaNacimiento: FieldRef<"InterpretacionCache", 'DateTime'>
    readonly lugarNacimiento: FieldRef<"InterpretacionCache", 'String'>
    readonly gender: FieldRef<"InterpretacionCache", 'String'>
    readonly tipo: FieldRef<"InterpretacionCache", 'String'>
    readonly interpretacionNarrativa: FieldRef<"InterpretacionCache", 'String'>
    readonly interpretacionesIndividuales: FieldRef<"InterpretacionCache", 'String'>
    readonly tiempoGeneracion: FieldRef<"InterpretacionCache", 'Float'>
    readonly createdAt: FieldRef<"InterpretacionCache", 'DateTime'>
    readonly updatedAt: FieldRef<"InterpretacionCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InterpretacionCache findUnique
   */
  export type InterpretacionCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterpretacionCache
     */
    select?: InterpretacionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterpretacionCache
     */
    omit?: InterpretacionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterpretacionCacheInclude<ExtArgs> | null
    /**
     * Filter, which InterpretacionCache to fetch.
     */
    where: InterpretacionCacheWhereUniqueInput
  }

  /**
   * InterpretacionCache findUniqueOrThrow
   */
  export type InterpretacionCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterpretacionCache
     */
    select?: InterpretacionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterpretacionCache
     */
    omit?: InterpretacionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterpretacionCacheInclude<ExtArgs> | null
    /**
     * Filter, which InterpretacionCache to fetch.
     */
    where: InterpretacionCacheWhereUniqueInput
  }

  /**
   * InterpretacionCache findFirst
   */
  export type InterpretacionCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterpretacionCache
     */
    select?: InterpretacionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterpretacionCache
     */
    omit?: InterpretacionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterpretacionCacheInclude<ExtArgs> | null
    /**
     * Filter, which InterpretacionCache to fetch.
     */
    where?: InterpretacionCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterpretacionCaches to fetch.
     */
    orderBy?: InterpretacionCacheOrderByWithRelationInput | InterpretacionCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterpretacionCaches.
     */
    cursor?: InterpretacionCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterpretacionCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterpretacionCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterpretacionCaches.
     */
    distinct?: InterpretacionCacheScalarFieldEnum | InterpretacionCacheScalarFieldEnum[]
  }

  /**
   * InterpretacionCache findFirstOrThrow
   */
  export type InterpretacionCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterpretacionCache
     */
    select?: InterpretacionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterpretacionCache
     */
    omit?: InterpretacionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterpretacionCacheInclude<ExtArgs> | null
    /**
     * Filter, which InterpretacionCache to fetch.
     */
    where?: InterpretacionCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterpretacionCaches to fetch.
     */
    orderBy?: InterpretacionCacheOrderByWithRelationInput | InterpretacionCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterpretacionCaches.
     */
    cursor?: InterpretacionCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterpretacionCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterpretacionCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterpretacionCaches.
     */
    distinct?: InterpretacionCacheScalarFieldEnum | InterpretacionCacheScalarFieldEnum[]
  }

  /**
   * InterpretacionCache findMany
   */
  export type InterpretacionCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterpretacionCache
     */
    select?: InterpretacionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterpretacionCache
     */
    omit?: InterpretacionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterpretacionCacheInclude<ExtArgs> | null
    /**
     * Filter, which InterpretacionCaches to fetch.
     */
    where?: InterpretacionCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterpretacionCaches to fetch.
     */
    orderBy?: InterpretacionCacheOrderByWithRelationInput | InterpretacionCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InterpretacionCaches.
     */
    cursor?: InterpretacionCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterpretacionCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterpretacionCaches.
     */
    skip?: number
    distinct?: InterpretacionCacheScalarFieldEnum | InterpretacionCacheScalarFieldEnum[]
  }

  /**
   * InterpretacionCache create
   */
  export type InterpretacionCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterpretacionCache
     */
    select?: InterpretacionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterpretacionCache
     */
    omit?: InterpretacionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterpretacionCacheInclude<ExtArgs> | null
    /**
     * The data needed to create a InterpretacionCache.
     */
    data: XOR<InterpretacionCacheCreateInput, InterpretacionCacheUncheckedCreateInput>
  }

  /**
   * InterpretacionCache createMany
   */
  export type InterpretacionCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InterpretacionCaches.
     */
    data: InterpretacionCacheCreateManyInput | InterpretacionCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InterpretacionCache createManyAndReturn
   */
  export type InterpretacionCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterpretacionCache
     */
    select?: InterpretacionCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InterpretacionCache
     */
    omit?: InterpretacionCacheOmit<ExtArgs> | null
    /**
     * The data used to create many InterpretacionCaches.
     */
    data: InterpretacionCacheCreateManyInput | InterpretacionCacheCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterpretacionCacheIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InterpretacionCache update
   */
  export type InterpretacionCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterpretacionCache
     */
    select?: InterpretacionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterpretacionCache
     */
    omit?: InterpretacionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterpretacionCacheInclude<ExtArgs> | null
    /**
     * The data needed to update a InterpretacionCache.
     */
    data: XOR<InterpretacionCacheUpdateInput, InterpretacionCacheUncheckedUpdateInput>
    /**
     * Choose, which InterpretacionCache to update.
     */
    where: InterpretacionCacheWhereUniqueInput
  }

  /**
   * InterpretacionCache updateMany
   */
  export type InterpretacionCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InterpretacionCaches.
     */
    data: XOR<InterpretacionCacheUpdateManyMutationInput, InterpretacionCacheUncheckedUpdateManyInput>
    /**
     * Filter which InterpretacionCaches to update
     */
    where?: InterpretacionCacheWhereInput
    /**
     * Limit how many InterpretacionCaches to update.
     */
    limit?: number
  }

  /**
   * InterpretacionCache updateManyAndReturn
   */
  export type InterpretacionCacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterpretacionCache
     */
    select?: InterpretacionCacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InterpretacionCache
     */
    omit?: InterpretacionCacheOmit<ExtArgs> | null
    /**
     * The data used to update InterpretacionCaches.
     */
    data: XOR<InterpretacionCacheUpdateManyMutationInput, InterpretacionCacheUncheckedUpdateManyInput>
    /**
     * Filter which InterpretacionCaches to update
     */
    where?: InterpretacionCacheWhereInput
    /**
     * Limit how many InterpretacionCaches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterpretacionCacheIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InterpretacionCache upsert
   */
  export type InterpretacionCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterpretacionCache
     */
    select?: InterpretacionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterpretacionCache
     */
    omit?: InterpretacionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterpretacionCacheInclude<ExtArgs> | null
    /**
     * The filter to search for the InterpretacionCache to update in case it exists.
     */
    where: InterpretacionCacheWhereUniqueInput
    /**
     * In case the InterpretacionCache found by the `where` argument doesn't exist, create a new InterpretacionCache with this data.
     */
    create: XOR<InterpretacionCacheCreateInput, InterpretacionCacheUncheckedCreateInput>
    /**
     * In case the InterpretacionCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InterpretacionCacheUpdateInput, InterpretacionCacheUncheckedUpdateInput>
  }

  /**
   * InterpretacionCache delete
   */
  export type InterpretacionCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterpretacionCache
     */
    select?: InterpretacionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterpretacionCache
     */
    omit?: InterpretacionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterpretacionCacheInclude<ExtArgs> | null
    /**
     * Filter which InterpretacionCache to delete.
     */
    where: InterpretacionCacheWhereUniqueInput
  }

  /**
   * InterpretacionCache deleteMany
   */
  export type InterpretacionCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterpretacionCaches to delete
     */
    where?: InterpretacionCacheWhereInput
    /**
     * Limit how many InterpretacionCaches to delete.
     */
    limit?: number
  }

  /**
   * InterpretacionCache without action
   */
  export type InterpretacionCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterpretacionCache
     */
    select?: InterpretacionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterpretacionCache
     */
    omit?: InterpretacionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterpretacionCacheInclude<ExtArgs> | null
  }


  /**
   * Model AstrogematriaCache
   */

  export type AggregateAstrogematriaCache = {
    _count: AstrogematriaCacheCountAggregateOutputType | null
    _avg: AstrogematriaCacheAvgAggregateOutputType | null
    _sum: AstrogematriaCacheSumAggregateOutputType | null
    _min: AstrogematriaCacheMinAggregateOutputType | null
    _max: AstrogematriaCacheMaxAggregateOutputType | null
  }

  export type AstrogematriaCacheAvgAggregateOutputType = {
    valorTotal: number | null
    reduccionZodiacal: number | null
    grados: number | null
  }

  export type AstrogematriaCacheSumAggregateOutputType = {
    valorTotal: number | null
    reduccionZodiacal: number | null
    grados: number | null
  }

  export type AstrogematriaCacheMinAggregateOutputType = {
    id: string | null
    palabra: string | null
    palabraProcesada: string | null
    valorTotal: number | null
    reduccionZodiacal: number | null
    signo: string | null
    grados: number | null
    posicionCompleta: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AstrogematriaCacheMaxAggregateOutputType = {
    id: string | null
    palabra: string | null
    palabraProcesada: string | null
    valorTotal: number | null
    reduccionZodiacal: number | null
    signo: string | null
    grados: number | null
    posicionCompleta: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AstrogematriaCacheCountAggregateOutputType = {
    id: number
    palabra: number
    palabraProcesada: number
    valorTotal: number
    reduccionZodiacal: number
    signo: number
    grados: number
    posicionCompleta: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AstrogematriaCacheAvgAggregateInputType = {
    valorTotal?: true
    reduccionZodiacal?: true
    grados?: true
  }

  export type AstrogematriaCacheSumAggregateInputType = {
    valorTotal?: true
    reduccionZodiacal?: true
    grados?: true
  }

  export type AstrogematriaCacheMinAggregateInputType = {
    id?: true
    palabra?: true
    palabraProcesada?: true
    valorTotal?: true
    reduccionZodiacal?: true
    signo?: true
    grados?: true
    posicionCompleta?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AstrogematriaCacheMaxAggregateInputType = {
    id?: true
    palabra?: true
    palabraProcesada?: true
    valorTotal?: true
    reduccionZodiacal?: true
    signo?: true
    grados?: true
    posicionCompleta?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AstrogematriaCacheCountAggregateInputType = {
    id?: true
    palabra?: true
    palabraProcesada?: true
    valorTotal?: true
    reduccionZodiacal?: true
    signo?: true
    grados?: true
    posicionCompleta?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AstrogematriaCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AstrogematriaCache to aggregate.
     */
    where?: AstrogematriaCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AstrogematriaCaches to fetch.
     */
    orderBy?: AstrogematriaCacheOrderByWithRelationInput | AstrogematriaCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AstrogematriaCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AstrogematriaCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AstrogematriaCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AstrogematriaCaches
    **/
    _count?: true | AstrogematriaCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AstrogematriaCacheAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AstrogematriaCacheSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AstrogematriaCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AstrogematriaCacheMaxAggregateInputType
  }

  export type GetAstrogematriaCacheAggregateType<T extends AstrogematriaCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateAstrogematriaCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAstrogematriaCache[P]>
      : GetScalarType<T[P], AggregateAstrogematriaCache[P]>
  }




  export type AstrogematriaCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AstrogematriaCacheWhereInput
    orderBy?: AstrogematriaCacheOrderByWithAggregationInput | AstrogematriaCacheOrderByWithAggregationInput[]
    by: AstrogematriaCacheScalarFieldEnum[] | AstrogematriaCacheScalarFieldEnum
    having?: AstrogematriaCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AstrogematriaCacheCountAggregateInputType | true
    _avg?: AstrogematriaCacheAvgAggregateInputType
    _sum?: AstrogematriaCacheSumAggregateInputType
    _min?: AstrogematriaCacheMinAggregateInputType
    _max?: AstrogematriaCacheMaxAggregateInputType
  }

  export type AstrogematriaCacheGroupByOutputType = {
    id: string
    palabra: string
    palabraProcesada: string
    valorTotal: number
    reduccionZodiacal: number
    signo: string
    grados: number
    posicionCompleta: string
    createdAt: Date
    updatedAt: Date
    _count: AstrogematriaCacheCountAggregateOutputType | null
    _avg: AstrogematriaCacheAvgAggregateOutputType | null
    _sum: AstrogematriaCacheSumAggregateOutputType | null
    _min: AstrogematriaCacheMinAggregateOutputType | null
    _max: AstrogematriaCacheMaxAggregateOutputType | null
  }

  type GetAstrogematriaCacheGroupByPayload<T extends AstrogematriaCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AstrogematriaCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AstrogematriaCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AstrogematriaCacheGroupByOutputType[P]>
            : GetScalarType<T[P], AstrogematriaCacheGroupByOutputType[P]>
        }
      >
    >


  export type AstrogematriaCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    palabra?: boolean
    palabraProcesada?: boolean
    valorTotal?: boolean
    reduccionZodiacal?: boolean
    signo?: boolean
    grados?: boolean
    posicionCompleta?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["astrogematriaCache"]>

  export type AstrogematriaCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    palabra?: boolean
    palabraProcesada?: boolean
    valorTotal?: boolean
    reduccionZodiacal?: boolean
    signo?: boolean
    grados?: boolean
    posicionCompleta?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["astrogematriaCache"]>

  export type AstrogematriaCacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    palabra?: boolean
    palabraProcesada?: boolean
    valorTotal?: boolean
    reduccionZodiacal?: boolean
    signo?: boolean
    grados?: boolean
    posicionCompleta?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["astrogematriaCache"]>

  export type AstrogematriaCacheSelectScalar = {
    id?: boolean
    palabra?: boolean
    palabraProcesada?: boolean
    valorTotal?: boolean
    reduccionZodiacal?: boolean
    signo?: boolean
    grados?: boolean
    posicionCompleta?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AstrogematriaCacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "palabra" | "palabraProcesada" | "valorTotal" | "reduccionZodiacal" | "signo" | "grados" | "posicionCompleta" | "createdAt" | "updatedAt", ExtArgs["result"]["astrogematriaCache"]>

  export type $AstrogematriaCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AstrogematriaCache"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      palabra: string
      palabraProcesada: string
      valorTotal: number
      reduccionZodiacal: number
      signo: string
      grados: number
      posicionCompleta: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["astrogematriaCache"]>
    composites: {}
  }

  type AstrogematriaCacheGetPayload<S extends boolean | null | undefined | AstrogematriaCacheDefaultArgs> = $Result.GetResult<Prisma.$AstrogematriaCachePayload, S>

  type AstrogematriaCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AstrogematriaCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AstrogematriaCacheCountAggregateInputType | true
    }

  export interface AstrogematriaCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AstrogematriaCache'], meta: { name: 'AstrogematriaCache' } }
    /**
     * Find zero or one AstrogematriaCache that matches the filter.
     * @param {AstrogematriaCacheFindUniqueArgs} args - Arguments to find a AstrogematriaCache
     * @example
     * // Get one AstrogematriaCache
     * const astrogematriaCache = await prisma.astrogematriaCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AstrogematriaCacheFindUniqueArgs>(args: SelectSubset<T, AstrogematriaCacheFindUniqueArgs<ExtArgs>>): Prisma__AstrogematriaCacheClient<$Result.GetResult<Prisma.$AstrogematriaCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AstrogematriaCache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AstrogematriaCacheFindUniqueOrThrowArgs} args - Arguments to find a AstrogematriaCache
     * @example
     * // Get one AstrogematriaCache
     * const astrogematriaCache = await prisma.astrogematriaCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AstrogematriaCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, AstrogematriaCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AstrogematriaCacheClient<$Result.GetResult<Prisma.$AstrogematriaCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AstrogematriaCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AstrogematriaCacheFindFirstArgs} args - Arguments to find a AstrogematriaCache
     * @example
     * // Get one AstrogematriaCache
     * const astrogematriaCache = await prisma.astrogematriaCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AstrogematriaCacheFindFirstArgs>(args?: SelectSubset<T, AstrogematriaCacheFindFirstArgs<ExtArgs>>): Prisma__AstrogematriaCacheClient<$Result.GetResult<Prisma.$AstrogematriaCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AstrogematriaCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AstrogematriaCacheFindFirstOrThrowArgs} args - Arguments to find a AstrogematriaCache
     * @example
     * // Get one AstrogematriaCache
     * const astrogematriaCache = await prisma.astrogematriaCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AstrogematriaCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, AstrogematriaCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__AstrogematriaCacheClient<$Result.GetResult<Prisma.$AstrogematriaCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AstrogematriaCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AstrogematriaCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AstrogematriaCaches
     * const astrogematriaCaches = await prisma.astrogematriaCache.findMany()
     * 
     * // Get first 10 AstrogematriaCaches
     * const astrogematriaCaches = await prisma.astrogematriaCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const astrogematriaCacheWithIdOnly = await prisma.astrogematriaCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AstrogematriaCacheFindManyArgs>(args?: SelectSubset<T, AstrogematriaCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AstrogematriaCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AstrogematriaCache.
     * @param {AstrogematriaCacheCreateArgs} args - Arguments to create a AstrogematriaCache.
     * @example
     * // Create one AstrogematriaCache
     * const AstrogematriaCache = await prisma.astrogematriaCache.create({
     *   data: {
     *     // ... data to create a AstrogematriaCache
     *   }
     * })
     * 
     */
    create<T extends AstrogematriaCacheCreateArgs>(args: SelectSubset<T, AstrogematriaCacheCreateArgs<ExtArgs>>): Prisma__AstrogematriaCacheClient<$Result.GetResult<Prisma.$AstrogematriaCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AstrogematriaCaches.
     * @param {AstrogematriaCacheCreateManyArgs} args - Arguments to create many AstrogematriaCaches.
     * @example
     * // Create many AstrogematriaCaches
     * const astrogematriaCache = await prisma.astrogematriaCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AstrogematriaCacheCreateManyArgs>(args?: SelectSubset<T, AstrogematriaCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AstrogematriaCaches and returns the data saved in the database.
     * @param {AstrogematriaCacheCreateManyAndReturnArgs} args - Arguments to create many AstrogematriaCaches.
     * @example
     * // Create many AstrogematriaCaches
     * const astrogematriaCache = await prisma.astrogematriaCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AstrogematriaCaches and only return the `id`
     * const astrogematriaCacheWithIdOnly = await prisma.astrogematriaCache.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AstrogematriaCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, AstrogematriaCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AstrogematriaCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AstrogematriaCache.
     * @param {AstrogematriaCacheDeleteArgs} args - Arguments to delete one AstrogematriaCache.
     * @example
     * // Delete one AstrogematriaCache
     * const AstrogematriaCache = await prisma.astrogematriaCache.delete({
     *   where: {
     *     // ... filter to delete one AstrogematriaCache
     *   }
     * })
     * 
     */
    delete<T extends AstrogematriaCacheDeleteArgs>(args: SelectSubset<T, AstrogematriaCacheDeleteArgs<ExtArgs>>): Prisma__AstrogematriaCacheClient<$Result.GetResult<Prisma.$AstrogematriaCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AstrogematriaCache.
     * @param {AstrogematriaCacheUpdateArgs} args - Arguments to update one AstrogematriaCache.
     * @example
     * // Update one AstrogematriaCache
     * const astrogematriaCache = await prisma.astrogematriaCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AstrogematriaCacheUpdateArgs>(args: SelectSubset<T, AstrogematriaCacheUpdateArgs<ExtArgs>>): Prisma__AstrogematriaCacheClient<$Result.GetResult<Prisma.$AstrogematriaCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AstrogematriaCaches.
     * @param {AstrogematriaCacheDeleteManyArgs} args - Arguments to filter AstrogematriaCaches to delete.
     * @example
     * // Delete a few AstrogematriaCaches
     * const { count } = await prisma.astrogematriaCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AstrogematriaCacheDeleteManyArgs>(args?: SelectSubset<T, AstrogematriaCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AstrogematriaCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AstrogematriaCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AstrogematriaCaches
     * const astrogematriaCache = await prisma.astrogematriaCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AstrogematriaCacheUpdateManyArgs>(args: SelectSubset<T, AstrogematriaCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AstrogematriaCaches and returns the data updated in the database.
     * @param {AstrogematriaCacheUpdateManyAndReturnArgs} args - Arguments to update many AstrogematriaCaches.
     * @example
     * // Update many AstrogematriaCaches
     * const astrogematriaCache = await prisma.astrogematriaCache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AstrogematriaCaches and only return the `id`
     * const astrogematriaCacheWithIdOnly = await prisma.astrogematriaCache.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AstrogematriaCacheUpdateManyAndReturnArgs>(args: SelectSubset<T, AstrogematriaCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AstrogematriaCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AstrogematriaCache.
     * @param {AstrogematriaCacheUpsertArgs} args - Arguments to update or create a AstrogematriaCache.
     * @example
     * // Update or create a AstrogematriaCache
     * const astrogematriaCache = await prisma.astrogematriaCache.upsert({
     *   create: {
     *     // ... data to create a AstrogematriaCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AstrogematriaCache we want to update
     *   }
     * })
     */
    upsert<T extends AstrogematriaCacheUpsertArgs>(args: SelectSubset<T, AstrogematriaCacheUpsertArgs<ExtArgs>>): Prisma__AstrogematriaCacheClient<$Result.GetResult<Prisma.$AstrogematriaCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AstrogematriaCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AstrogematriaCacheCountArgs} args - Arguments to filter AstrogematriaCaches to count.
     * @example
     * // Count the number of AstrogematriaCaches
     * const count = await prisma.astrogematriaCache.count({
     *   where: {
     *     // ... the filter for the AstrogematriaCaches we want to count
     *   }
     * })
    **/
    count<T extends AstrogematriaCacheCountArgs>(
      args?: Subset<T, AstrogematriaCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AstrogematriaCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AstrogematriaCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AstrogematriaCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AstrogematriaCacheAggregateArgs>(args: Subset<T, AstrogematriaCacheAggregateArgs>): Prisma.PrismaPromise<GetAstrogematriaCacheAggregateType<T>>

    /**
     * Group by AstrogematriaCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AstrogematriaCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AstrogematriaCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AstrogematriaCacheGroupByArgs['orderBy'] }
        : { orderBy?: AstrogematriaCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AstrogematriaCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAstrogematriaCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AstrogematriaCache model
   */
  readonly fields: AstrogematriaCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AstrogematriaCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AstrogematriaCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AstrogematriaCache model
   */
  interface AstrogematriaCacheFieldRefs {
    readonly id: FieldRef<"AstrogematriaCache", 'String'>
    readonly palabra: FieldRef<"AstrogematriaCache", 'String'>
    readonly palabraProcesada: FieldRef<"AstrogematriaCache", 'String'>
    readonly valorTotal: FieldRef<"AstrogematriaCache", 'Int'>
    readonly reduccionZodiacal: FieldRef<"AstrogematriaCache", 'Int'>
    readonly signo: FieldRef<"AstrogematriaCache", 'String'>
    readonly grados: FieldRef<"AstrogematriaCache", 'Int'>
    readonly posicionCompleta: FieldRef<"AstrogematriaCache", 'String'>
    readonly createdAt: FieldRef<"AstrogematriaCache", 'DateTime'>
    readonly updatedAt: FieldRef<"AstrogematriaCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AstrogematriaCache findUnique
   */
  export type AstrogematriaCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AstrogematriaCache
     */
    select?: AstrogematriaCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AstrogematriaCache
     */
    omit?: AstrogematriaCacheOmit<ExtArgs> | null
    /**
     * Filter, which AstrogematriaCache to fetch.
     */
    where: AstrogematriaCacheWhereUniqueInput
  }

  /**
   * AstrogematriaCache findUniqueOrThrow
   */
  export type AstrogematriaCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AstrogematriaCache
     */
    select?: AstrogematriaCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AstrogematriaCache
     */
    omit?: AstrogematriaCacheOmit<ExtArgs> | null
    /**
     * Filter, which AstrogematriaCache to fetch.
     */
    where: AstrogematriaCacheWhereUniqueInput
  }

  /**
   * AstrogematriaCache findFirst
   */
  export type AstrogematriaCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AstrogematriaCache
     */
    select?: AstrogematriaCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AstrogematriaCache
     */
    omit?: AstrogematriaCacheOmit<ExtArgs> | null
    /**
     * Filter, which AstrogematriaCache to fetch.
     */
    where?: AstrogematriaCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AstrogematriaCaches to fetch.
     */
    orderBy?: AstrogematriaCacheOrderByWithRelationInput | AstrogematriaCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AstrogematriaCaches.
     */
    cursor?: AstrogematriaCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AstrogematriaCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AstrogematriaCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AstrogematriaCaches.
     */
    distinct?: AstrogematriaCacheScalarFieldEnum | AstrogematriaCacheScalarFieldEnum[]
  }

  /**
   * AstrogematriaCache findFirstOrThrow
   */
  export type AstrogematriaCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AstrogematriaCache
     */
    select?: AstrogematriaCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AstrogematriaCache
     */
    omit?: AstrogematriaCacheOmit<ExtArgs> | null
    /**
     * Filter, which AstrogematriaCache to fetch.
     */
    where?: AstrogematriaCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AstrogematriaCaches to fetch.
     */
    orderBy?: AstrogematriaCacheOrderByWithRelationInput | AstrogematriaCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AstrogematriaCaches.
     */
    cursor?: AstrogematriaCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AstrogematriaCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AstrogematriaCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AstrogematriaCaches.
     */
    distinct?: AstrogematriaCacheScalarFieldEnum | AstrogematriaCacheScalarFieldEnum[]
  }

  /**
   * AstrogematriaCache findMany
   */
  export type AstrogematriaCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AstrogematriaCache
     */
    select?: AstrogematriaCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AstrogematriaCache
     */
    omit?: AstrogematriaCacheOmit<ExtArgs> | null
    /**
     * Filter, which AstrogematriaCaches to fetch.
     */
    where?: AstrogematriaCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AstrogematriaCaches to fetch.
     */
    orderBy?: AstrogematriaCacheOrderByWithRelationInput | AstrogematriaCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AstrogematriaCaches.
     */
    cursor?: AstrogematriaCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AstrogematriaCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AstrogematriaCaches.
     */
    skip?: number
    distinct?: AstrogematriaCacheScalarFieldEnum | AstrogematriaCacheScalarFieldEnum[]
  }

  /**
   * AstrogematriaCache create
   */
  export type AstrogematriaCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AstrogematriaCache
     */
    select?: AstrogematriaCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AstrogematriaCache
     */
    omit?: AstrogematriaCacheOmit<ExtArgs> | null
    /**
     * The data needed to create a AstrogematriaCache.
     */
    data: XOR<AstrogematriaCacheCreateInput, AstrogematriaCacheUncheckedCreateInput>
  }

  /**
   * AstrogematriaCache createMany
   */
  export type AstrogematriaCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AstrogematriaCaches.
     */
    data: AstrogematriaCacheCreateManyInput | AstrogematriaCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AstrogematriaCache createManyAndReturn
   */
  export type AstrogematriaCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AstrogematriaCache
     */
    select?: AstrogematriaCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AstrogematriaCache
     */
    omit?: AstrogematriaCacheOmit<ExtArgs> | null
    /**
     * The data used to create many AstrogematriaCaches.
     */
    data: AstrogematriaCacheCreateManyInput | AstrogematriaCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AstrogematriaCache update
   */
  export type AstrogematriaCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AstrogematriaCache
     */
    select?: AstrogematriaCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AstrogematriaCache
     */
    omit?: AstrogematriaCacheOmit<ExtArgs> | null
    /**
     * The data needed to update a AstrogematriaCache.
     */
    data: XOR<AstrogematriaCacheUpdateInput, AstrogematriaCacheUncheckedUpdateInput>
    /**
     * Choose, which AstrogematriaCache to update.
     */
    where: AstrogematriaCacheWhereUniqueInput
  }

  /**
   * AstrogematriaCache updateMany
   */
  export type AstrogematriaCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AstrogematriaCaches.
     */
    data: XOR<AstrogematriaCacheUpdateManyMutationInput, AstrogematriaCacheUncheckedUpdateManyInput>
    /**
     * Filter which AstrogematriaCaches to update
     */
    where?: AstrogematriaCacheWhereInput
    /**
     * Limit how many AstrogematriaCaches to update.
     */
    limit?: number
  }

  /**
   * AstrogematriaCache updateManyAndReturn
   */
  export type AstrogematriaCacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AstrogematriaCache
     */
    select?: AstrogematriaCacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AstrogematriaCache
     */
    omit?: AstrogematriaCacheOmit<ExtArgs> | null
    /**
     * The data used to update AstrogematriaCaches.
     */
    data: XOR<AstrogematriaCacheUpdateManyMutationInput, AstrogematriaCacheUncheckedUpdateManyInput>
    /**
     * Filter which AstrogematriaCaches to update
     */
    where?: AstrogematriaCacheWhereInput
    /**
     * Limit how many AstrogematriaCaches to update.
     */
    limit?: number
  }

  /**
   * AstrogematriaCache upsert
   */
  export type AstrogematriaCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AstrogematriaCache
     */
    select?: AstrogematriaCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AstrogematriaCache
     */
    omit?: AstrogematriaCacheOmit<ExtArgs> | null
    /**
     * The filter to search for the AstrogematriaCache to update in case it exists.
     */
    where: AstrogematriaCacheWhereUniqueInput
    /**
     * In case the AstrogematriaCache found by the `where` argument doesn't exist, create a new AstrogematriaCache with this data.
     */
    create: XOR<AstrogematriaCacheCreateInput, AstrogematriaCacheUncheckedCreateInput>
    /**
     * In case the AstrogematriaCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AstrogematriaCacheUpdateInput, AstrogematriaCacheUncheckedUpdateInput>
  }

  /**
   * AstrogematriaCache delete
   */
  export type AstrogematriaCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AstrogematriaCache
     */
    select?: AstrogematriaCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AstrogematriaCache
     */
    omit?: AstrogematriaCacheOmit<ExtArgs> | null
    /**
     * Filter which AstrogematriaCache to delete.
     */
    where: AstrogematriaCacheWhereUniqueInput
  }

  /**
   * AstrogematriaCache deleteMany
   */
  export type AstrogematriaCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AstrogematriaCaches to delete
     */
    where?: AstrogematriaCacheWhereInput
    /**
     * Limit how many AstrogematriaCaches to delete.
     */
    limit?: number
  }

  /**
   * AstrogematriaCache without action
   */
  export type AstrogematriaCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AstrogematriaCache
     */
    select?: AstrogematriaCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AstrogematriaCache
     */
    omit?: AstrogematriaCacheOmit<ExtArgs> | null
  }


  /**
   * Model HorariaRequest
   */

  export type AggregateHorariaRequest = {
    _count: HorariaRequestCountAggregateOutputType | null
    _min: HorariaRequestMinAggregateOutputType | null
    _max: HorariaRequestMaxAggregateOutputType | null
  }

  export type HorariaRequestMinAggregateOutputType = {
    id: string | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    country: string | null
    acceptSingleQuestion: string | null
    isFirstTime: string | null
    questionCategory: string | null
    question: string | null
    context: string | null
    status: string | null
    response: string | null
    responseDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HorariaRequestMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    country: string | null
    acceptSingleQuestion: string | null
    isFirstTime: string | null
    questionCategory: string | null
    question: string | null
    context: string | null
    status: string | null
    response: string | null
    responseDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HorariaRequestCountAggregateOutputType = {
    id: number
    userId: number
    firstName: number
    lastName: number
    email: number
    country: number
    acceptSingleQuestion: number
    isFirstTime: number
    questionCategory: number
    question: number
    context: number
    status: number
    response: number
    responseDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HorariaRequestMinAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    country?: true
    acceptSingleQuestion?: true
    isFirstTime?: true
    questionCategory?: true
    question?: true
    context?: true
    status?: true
    response?: true
    responseDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HorariaRequestMaxAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    country?: true
    acceptSingleQuestion?: true
    isFirstTime?: true
    questionCategory?: true
    question?: true
    context?: true
    status?: true
    response?: true
    responseDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HorariaRequestCountAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    country?: true
    acceptSingleQuestion?: true
    isFirstTime?: true
    questionCategory?: true
    question?: true
    context?: true
    status?: true
    response?: true
    responseDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HorariaRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HorariaRequest to aggregate.
     */
    where?: HorariaRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HorariaRequests to fetch.
     */
    orderBy?: HorariaRequestOrderByWithRelationInput | HorariaRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HorariaRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HorariaRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HorariaRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HorariaRequests
    **/
    _count?: true | HorariaRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HorariaRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HorariaRequestMaxAggregateInputType
  }

  export type GetHorariaRequestAggregateType<T extends HorariaRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateHorariaRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHorariaRequest[P]>
      : GetScalarType<T[P], AggregateHorariaRequest[P]>
  }




  export type HorariaRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HorariaRequestWhereInput
    orderBy?: HorariaRequestOrderByWithAggregationInput | HorariaRequestOrderByWithAggregationInput[]
    by: HorariaRequestScalarFieldEnum[] | HorariaRequestScalarFieldEnum
    having?: HorariaRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HorariaRequestCountAggregateInputType | true
    _min?: HorariaRequestMinAggregateInputType
    _max?: HorariaRequestMaxAggregateInputType
  }

  export type HorariaRequestGroupByOutputType = {
    id: string
    userId: string
    firstName: string
    lastName: string
    email: string
    country: string
    acceptSingleQuestion: string
    isFirstTime: string
    questionCategory: string
    question: string
    context: string | null
    status: string
    response: string | null
    responseDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: HorariaRequestCountAggregateOutputType | null
    _min: HorariaRequestMinAggregateOutputType | null
    _max: HorariaRequestMaxAggregateOutputType | null
  }

  type GetHorariaRequestGroupByPayload<T extends HorariaRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HorariaRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HorariaRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HorariaRequestGroupByOutputType[P]>
            : GetScalarType<T[P], HorariaRequestGroupByOutputType[P]>
        }
      >
    >


  export type HorariaRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    country?: boolean
    acceptSingleQuestion?: boolean
    isFirstTime?: boolean
    questionCategory?: boolean
    question?: boolean
    context?: boolean
    status?: boolean
    response?: boolean
    responseDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["horariaRequest"]>

  export type HorariaRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    country?: boolean
    acceptSingleQuestion?: boolean
    isFirstTime?: boolean
    questionCategory?: boolean
    question?: boolean
    context?: boolean
    status?: boolean
    response?: boolean
    responseDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["horariaRequest"]>

  export type HorariaRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    country?: boolean
    acceptSingleQuestion?: boolean
    isFirstTime?: boolean
    questionCategory?: boolean
    question?: boolean
    context?: boolean
    status?: boolean
    response?: boolean
    responseDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["horariaRequest"]>

  export type HorariaRequestSelectScalar = {
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    country?: boolean
    acceptSingleQuestion?: boolean
    isFirstTime?: boolean
    questionCategory?: boolean
    question?: boolean
    context?: boolean
    status?: boolean
    response?: boolean
    responseDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HorariaRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "firstName" | "lastName" | "email" | "country" | "acceptSingleQuestion" | "isFirstTime" | "questionCategory" | "question" | "context" | "status" | "response" | "responseDate" | "createdAt" | "updatedAt", ExtArgs["result"]["horariaRequest"]>
  export type HorariaRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type HorariaRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type HorariaRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $HorariaRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HorariaRequest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      firstName: string
      lastName: string
      email: string
      country: string
      acceptSingleQuestion: string
      isFirstTime: string
      questionCategory: string
      question: string
      context: string | null
      status: string
      response: string | null
      responseDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["horariaRequest"]>
    composites: {}
  }

  type HorariaRequestGetPayload<S extends boolean | null | undefined | HorariaRequestDefaultArgs> = $Result.GetResult<Prisma.$HorariaRequestPayload, S>

  type HorariaRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HorariaRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HorariaRequestCountAggregateInputType | true
    }

  export interface HorariaRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HorariaRequest'], meta: { name: 'HorariaRequest' } }
    /**
     * Find zero or one HorariaRequest that matches the filter.
     * @param {HorariaRequestFindUniqueArgs} args - Arguments to find a HorariaRequest
     * @example
     * // Get one HorariaRequest
     * const horariaRequest = await prisma.horariaRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HorariaRequestFindUniqueArgs>(args: SelectSubset<T, HorariaRequestFindUniqueArgs<ExtArgs>>): Prisma__HorariaRequestClient<$Result.GetResult<Prisma.$HorariaRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HorariaRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HorariaRequestFindUniqueOrThrowArgs} args - Arguments to find a HorariaRequest
     * @example
     * // Get one HorariaRequest
     * const horariaRequest = await prisma.horariaRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HorariaRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, HorariaRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HorariaRequestClient<$Result.GetResult<Prisma.$HorariaRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HorariaRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorariaRequestFindFirstArgs} args - Arguments to find a HorariaRequest
     * @example
     * // Get one HorariaRequest
     * const horariaRequest = await prisma.horariaRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HorariaRequestFindFirstArgs>(args?: SelectSubset<T, HorariaRequestFindFirstArgs<ExtArgs>>): Prisma__HorariaRequestClient<$Result.GetResult<Prisma.$HorariaRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HorariaRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorariaRequestFindFirstOrThrowArgs} args - Arguments to find a HorariaRequest
     * @example
     * // Get one HorariaRequest
     * const horariaRequest = await prisma.horariaRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HorariaRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, HorariaRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__HorariaRequestClient<$Result.GetResult<Prisma.$HorariaRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HorariaRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorariaRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HorariaRequests
     * const horariaRequests = await prisma.horariaRequest.findMany()
     * 
     * // Get first 10 HorariaRequests
     * const horariaRequests = await prisma.horariaRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const horariaRequestWithIdOnly = await prisma.horariaRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HorariaRequestFindManyArgs>(args?: SelectSubset<T, HorariaRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HorariaRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HorariaRequest.
     * @param {HorariaRequestCreateArgs} args - Arguments to create a HorariaRequest.
     * @example
     * // Create one HorariaRequest
     * const HorariaRequest = await prisma.horariaRequest.create({
     *   data: {
     *     // ... data to create a HorariaRequest
     *   }
     * })
     * 
     */
    create<T extends HorariaRequestCreateArgs>(args: SelectSubset<T, HorariaRequestCreateArgs<ExtArgs>>): Prisma__HorariaRequestClient<$Result.GetResult<Prisma.$HorariaRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HorariaRequests.
     * @param {HorariaRequestCreateManyArgs} args - Arguments to create many HorariaRequests.
     * @example
     * // Create many HorariaRequests
     * const horariaRequest = await prisma.horariaRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HorariaRequestCreateManyArgs>(args?: SelectSubset<T, HorariaRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HorariaRequests and returns the data saved in the database.
     * @param {HorariaRequestCreateManyAndReturnArgs} args - Arguments to create many HorariaRequests.
     * @example
     * // Create many HorariaRequests
     * const horariaRequest = await prisma.horariaRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HorariaRequests and only return the `id`
     * const horariaRequestWithIdOnly = await prisma.horariaRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HorariaRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, HorariaRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HorariaRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HorariaRequest.
     * @param {HorariaRequestDeleteArgs} args - Arguments to delete one HorariaRequest.
     * @example
     * // Delete one HorariaRequest
     * const HorariaRequest = await prisma.horariaRequest.delete({
     *   where: {
     *     // ... filter to delete one HorariaRequest
     *   }
     * })
     * 
     */
    delete<T extends HorariaRequestDeleteArgs>(args: SelectSubset<T, HorariaRequestDeleteArgs<ExtArgs>>): Prisma__HorariaRequestClient<$Result.GetResult<Prisma.$HorariaRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HorariaRequest.
     * @param {HorariaRequestUpdateArgs} args - Arguments to update one HorariaRequest.
     * @example
     * // Update one HorariaRequest
     * const horariaRequest = await prisma.horariaRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HorariaRequestUpdateArgs>(args: SelectSubset<T, HorariaRequestUpdateArgs<ExtArgs>>): Prisma__HorariaRequestClient<$Result.GetResult<Prisma.$HorariaRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HorariaRequests.
     * @param {HorariaRequestDeleteManyArgs} args - Arguments to filter HorariaRequests to delete.
     * @example
     * // Delete a few HorariaRequests
     * const { count } = await prisma.horariaRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HorariaRequestDeleteManyArgs>(args?: SelectSubset<T, HorariaRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HorariaRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorariaRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HorariaRequests
     * const horariaRequest = await prisma.horariaRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HorariaRequestUpdateManyArgs>(args: SelectSubset<T, HorariaRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HorariaRequests and returns the data updated in the database.
     * @param {HorariaRequestUpdateManyAndReturnArgs} args - Arguments to update many HorariaRequests.
     * @example
     * // Update many HorariaRequests
     * const horariaRequest = await prisma.horariaRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HorariaRequests and only return the `id`
     * const horariaRequestWithIdOnly = await prisma.horariaRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HorariaRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, HorariaRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HorariaRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HorariaRequest.
     * @param {HorariaRequestUpsertArgs} args - Arguments to update or create a HorariaRequest.
     * @example
     * // Update or create a HorariaRequest
     * const horariaRequest = await prisma.horariaRequest.upsert({
     *   create: {
     *     // ... data to create a HorariaRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HorariaRequest we want to update
     *   }
     * })
     */
    upsert<T extends HorariaRequestUpsertArgs>(args: SelectSubset<T, HorariaRequestUpsertArgs<ExtArgs>>): Prisma__HorariaRequestClient<$Result.GetResult<Prisma.$HorariaRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HorariaRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorariaRequestCountArgs} args - Arguments to filter HorariaRequests to count.
     * @example
     * // Count the number of HorariaRequests
     * const count = await prisma.horariaRequest.count({
     *   where: {
     *     // ... the filter for the HorariaRequests we want to count
     *   }
     * })
    **/
    count<T extends HorariaRequestCountArgs>(
      args?: Subset<T, HorariaRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HorariaRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HorariaRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorariaRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HorariaRequestAggregateArgs>(args: Subset<T, HorariaRequestAggregateArgs>): Prisma.PrismaPromise<GetHorariaRequestAggregateType<T>>

    /**
     * Group by HorariaRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorariaRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HorariaRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HorariaRequestGroupByArgs['orderBy'] }
        : { orderBy?: HorariaRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HorariaRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHorariaRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HorariaRequest model
   */
  readonly fields: HorariaRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HorariaRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HorariaRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HorariaRequest model
   */
  interface HorariaRequestFieldRefs {
    readonly id: FieldRef<"HorariaRequest", 'String'>
    readonly userId: FieldRef<"HorariaRequest", 'String'>
    readonly firstName: FieldRef<"HorariaRequest", 'String'>
    readonly lastName: FieldRef<"HorariaRequest", 'String'>
    readonly email: FieldRef<"HorariaRequest", 'String'>
    readonly country: FieldRef<"HorariaRequest", 'String'>
    readonly acceptSingleQuestion: FieldRef<"HorariaRequest", 'String'>
    readonly isFirstTime: FieldRef<"HorariaRequest", 'String'>
    readonly questionCategory: FieldRef<"HorariaRequest", 'String'>
    readonly question: FieldRef<"HorariaRequest", 'String'>
    readonly context: FieldRef<"HorariaRequest", 'String'>
    readonly status: FieldRef<"HorariaRequest", 'String'>
    readonly response: FieldRef<"HorariaRequest", 'String'>
    readonly responseDate: FieldRef<"HorariaRequest", 'DateTime'>
    readonly createdAt: FieldRef<"HorariaRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"HorariaRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HorariaRequest findUnique
   */
  export type HorariaRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorariaRequest
     */
    select?: HorariaRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorariaRequest
     */
    omit?: HorariaRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorariaRequestInclude<ExtArgs> | null
    /**
     * Filter, which HorariaRequest to fetch.
     */
    where: HorariaRequestWhereUniqueInput
  }

  /**
   * HorariaRequest findUniqueOrThrow
   */
  export type HorariaRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorariaRequest
     */
    select?: HorariaRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorariaRequest
     */
    omit?: HorariaRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorariaRequestInclude<ExtArgs> | null
    /**
     * Filter, which HorariaRequest to fetch.
     */
    where: HorariaRequestWhereUniqueInput
  }

  /**
   * HorariaRequest findFirst
   */
  export type HorariaRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorariaRequest
     */
    select?: HorariaRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorariaRequest
     */
    omit?: HorariaRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorariaRequestInclude<ExtArgs> | null
    /**
     * Filter, which HorariaRequest to fetch.
     */
    where?: HorariaRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HorariaRequests to fetch.
     */
    orderBy?: HorariaRequestOrderByWithRelationInput | HorariaRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HorariaRequests.
     */
    cursor?: HorariaRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HorariaRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HorariaRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HorariaRequests.
     */
    distinct?: HorariaRequestScalarFieldEnum | HorariaRequestScalarFieldEnum[]
  }

  /**
   * HorariaRequest findFirstOrThrow
   */
  export type HorariaRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorariaRequest
     */
    select?: HorariaRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorariaRequest
     */
    omit?: HorariaRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorariaRequestInclude<ExtArgs> | null
    /**
     * Filter, which HorariaRequest to fetch.
     */
    where?: HorariaRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HorariaRequests to fetch.
     */
    orderBy?: HorariaRequestOrderByWithRelationInput | HorariaRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HorariaRequests.
     */
    cursor?: HorariaRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HorariaRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HorariaRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HorariaRequests.
     */
    distinct?: HorariaRequestScalarFieldEnum | HorariaRequestScalarFieldEnum[]
  }

  /**
   * HorariaRequest findMany
   */
  export type HorariaRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorariaRequest
     */
    select?: HorariaRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorariaRequest
     */
    omit?: HorariaRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorariaRequestInclude<ExtArgs> | null
    /**
     * Filter, which HorariaRequests to fetch.
     */
    where?: HorariaRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HorariaRequests to fetch.
     */
    orderBy?: HorariaRequestOrderByWithRelationInput | HorariaRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HorariaRequests.
     */
    cursor?: HorariaRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HorariaRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HorariaRequests.
     */
    skip?: number
    distinct?: HorariaRequestScalarFieldEnum | HorariaRequestScalarFieldEnum[]
  }

  /**
   * HorariaRequest create
   */
  export type HorariaRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorariaRequest
     */
    select?: HorariaRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorariaRequest
     */
    omit?: HorariaRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorariaRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a HorariaRequest.
     */
    data: XOR<HorariaRequestCreateInput, HorariaRequestUncheckedCreateInput>
  }

  /**
   * HorariaRequest createMany
   */
  export type HorariaRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HorariaRequests.
     */
    data: HorariaRequestCreateManyInput | HorariaRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HorariaRequest createManyAndReturn
   */
  export type HorariaRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorariaRequest
     */
    select?: HorariaRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HorariaRequest
     */
    omit?: HorariaRequestOmit<ExtArgs> | null
    /**
     * The data used to create many HorariaRequests.
     */
    data: HorariaRequestCreateManyInput | HorariaRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorariaRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HorariaRequest update
   */
  export type HorariaRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorariaRequest
     */
    select?: HorariaRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorariaRequest
     */
    omit?: HorariaRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorariaRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a HorariaRequest.
     */
    data: XOR<HorariaRequestUpdateInput, HorariaRequestUncheckedUpdateInput>
    /**
     * Choose, which HorariaRequest to update.
     */
    where: HorariaRequestWhereUniqueInput
  }

  /**
   * HorariaRequest updateMany
   */
  export type HorariaRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HorariaRequests.
     */
    data: XOR<HorariaRequestUpdateManyMutationInput, HorariaRequestUncheckedUpdateManyInput>
    /**
     * Filter which HorariaRequests to update
     */
    where?: HorariaRequestWhereInput
    /**
     * Limit how many HorariaRequests to update.
     */
    limit?: number
  }

  /**
   * HorariaRequest updateManyAndReturn
   */
  export type HorariaRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorariaRequest
     */
    select?: HorariaRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HorariaRequest
     */
    omit?: HorariaRequestOmit<ExtArgs> | null
    /**
     * The data used to update HorariaRequests.
     */
    data: XOR<HorariaRequestUpdateManyMutationInput, HorariaRequestUncheckedUpdateManyInput>
    /**
     * Filter which HorariaRequests to update
     */
    where?: HorariaRequestWhereInput
    /**
     * Limit how many HorariaRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorariaRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HorariaRequest upsert
   */
  export type HorariaRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorariaRequest
     */
    select?: HorariaRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorariaRequest
     */
    omit?: HorariaRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorariaRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the HorariaRequest to update in case it exists.
     */
    where: HorariaRequestWhereUniqueInput
    /**
     * In case the HorariaRequest found by the `where` argument doesn't exist, create a new HorariaRequest with this data.
     */
    create: XOR<HorariaRequestCreateInput, HorariaRequestUncheckedCreateInput>
    /**
     * In case the HorariaRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HorariaRequestUpdateInput, HorariaRequestUncheckedUpdateInput>
  }

  /**
   * HorariaRequest delete
   */
  export type HorariaRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorariaRequest
     */
    select?: HorariaRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorariaRequest
     */
    omit?: HorariaRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorariaRequestInclude<ExtArgs> | null
    /**
     * Filter which HorariaRequest to delete.
     */
    where: HorariaRequestWhereUniqueInput
  }

  /**
   * HorariaRequest deleteMany
   */
  export type HorariaRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HorariaRequests to delete
     */
    where?: HorariaRequestWhereInput
    /**
     * Limit how many HorariaRequests to delete.
     */
    limit?: number
  }

  /**
   * HorariaRequest without action
   */
  export type HorariaRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorariaRequest
     */
    select?: HorariaRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HorariaRequest
     */
    omit?: HorariaRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorariaRequestInclude<ExtArgs> | null
  }


  /**
   * Model PersonalCalendarCache
   */

  export type AggregatePersonalCalendarCache = {
    _count: PersonalCalendarCacheCountAggregateOutputType | null
    _avg: PersonalCalendarCacheAvgAggregateOutputType | null
    _sum: PersonalCalendarCacheSumAggregateOutputType | null
    _min: PersonalCalendarCacheMinAggregateOutputType | null
    _max: PersonalCalendarCacheMaxAggregateOutputType | null
  }

  export type PersonalCalendarCacheAvgAggregateOutputType = {
    year: number | null
  }

  export type PersonalCalendarCacheSumAggregateOutputType = {
    year: number | null
  }

  export type PersonalCalendarCacheMinAggregateOutputType = {
    id: string | null
    userId: string | null
    year: number | null
    events: string | null
    calculatedAt: Date | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PersonalCalendarCacheMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    year: number | null
    events: string | null
    calculatedAt: Date | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PersonalCalendarCacheCountAggregateOutputType = {
    id: number
    userId: number
    year: number
    events: number
    calculatedAt: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PersonalCalendarCacheAvgAggregateInputType = {
    year?: true
  }

  export type PersonalCalendarCacheSumAggregateInputType = {
    year?: true
  }

  export type PersonalCalendarCacheMinAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    events?: true
    calculatedAt?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PersonalCalendarCacheMaxAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    events?: true
    calculatedAt?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PersonalCalendarCacheCountAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    events?: true
    calculatedAt?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PersonalCalendarCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PersonalCalendarCache to aggregate.
     */
    where?: PersonalCalendarCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalCalendarCaches to fetch.
     */
    orderBy?: PersonalCalendarCacheOrderByWithRelationInput | PersonalCalendarCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonalCalendarCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalCalendarCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalCalendarCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PersonalCalendarCaches
    **/
    _count?: true | PersonalCalendarCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PersonalCalendarCacheAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PersonalCalendarCacheSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonalCalendarCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonalCalendarCacheMaxAggregateInputType
  }

  export type GetPersonalCalendarCacheAggregateType<T extends PersonalCalendarCacheAggregateArgs> = {
        [P in keyof T & keyof AggregatePersonalCalendarCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePersonalCalendarCache[P]>
      : GetScalarType<T[P], AggregatePersonalCalendarCache[P]>
  }




  export type PersonalCalendarCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonalCalendarCacheWhereInput
    orderBy?: PersonalCalendarCacheOrderByWithAggregationInput | PersonalCalendarCacheOrderByWithAggregationInput[]
    by: PersonalCalendarCacheScalarFieldEnum[] | PersonalCalendarCacheScalarFieldEnum
    having?: PersonalCalendarCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonalCalendarCacheCountAggregateInputType | true
    _avg?: PersonalCalendarCacheAvgAggregateInputType
    _sum?: PersonalCalendarCacheSumAggregateInputType
    _min?: PersonalCalendarCacheMinAggregateInputType
    _max?: PersonalCalendarCacheMaxAggregateInputType
  }

  export type PersonalCalendarCacheGroupByOutputType = {
    id: string
    userId: string
    year: number
    events: string
    calculatedAt: Date
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: PersonalCalendarCacheCountAggregateOutputType | null
    _avg: PersonalCalendarCacheAvgAggregateOutputType | null
    _sum: PersonalCalendarCacheSumAggregateOutputType | null
    _min: PersonalCalendarCacheMinAggregateOutputType | null
    _max: PersonalCalendarCacheMaxAggregateOutputType | null
  }

  type GetPersonalCalendarCacheGroupByPayload<T extends PersonalCalendarCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonalCalendarCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonalCalendarCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonalCalendarCacheGroupByOutputType[P]>
            : GetScalarType<T[P], PersonalCalendarCacheGroupByOutputType[P]>
        }
      >
    >


  export type PersonalCalendarCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    events?: boolean
    calculatedAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personalCalendarCache"]>

  export type PersonalCalendarCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    events?: boolean
    calculatedAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personalCalendarCache"]>

  export type PersonalCalendarCacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    events?: boolean
    calculatedAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personalCalendarCache"]>

  export type PersonalCalendarCacheSelectScalar = {
    id?: boolean
    userId?: boolean
    year?: boolean
    events?: boolean
    calculatedAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PersonalCalendarCacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "year" | "events" | "calculatedAt" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["personalCalendarCache"]>
  export type PersonalCalendarCacheInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PersonalCalendarCacheIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PersonalCalendarCacheIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PersonalCalendarCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PersonalCalendarCache"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      year: number
      events: string
      calculatedAt: Date
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["personalCalendarCache"]>
    composites: {}
  }

  type PersonalCalendarCacheGetPayload<S extends boolean | null | undefined | PersonalCalendarCacheDefaultArgs> = $Result.GetResult<Prisma.$PersonalCalendarCachePayload, S>

  type PersonalCalendarCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PersonalCalendarCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PersonalCalendarCacheCountAggregateInputType | true
    }

  export interface PersonalCalendarCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PersonalCalendarCache'], meta: { name: 'PersonalCalendarCache' } }
    /**
     * Find zero or one PersonalCalendarCache that matches the filter.
     * @param {PersonalCalendarCacheFindUniqueArgs} args - Arguments to find a PersonalCalendarCache
     * @example
     * // Get one PersonalCalendarCache
     * const personalCalendarCache = await prisma.personalCalendarCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonalCalendarCacheFindUniqueArgs>(args: SelectSubset<T, PersonalCalendarCacheFindUniqueArgs<ExtArgs>>): Prisma__PersonalCalendarCacheClient<$Result.GetResult<Prisma.$PersonalCalendarCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PersonalCalendarCache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonalCalendarCacheFindUniqueOrThrowArgs} args - Arguments to find a PersonalCalendarCache
     * @example
     * // Get one PersonalCalendarCache
     * const personalCalendarCache = await prisma.personalCalendarCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonalCalendarCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonalCalendarCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonalCalendarCacheClient<$Result.GetResult<Prisma.$PersonalCalendarCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PersonalCalendarCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalCalendarCacheFindFirstArgs} args - Arguments to find a PersonalCalendarCache
     * @example
     * // Get one PersonalCalendarCache
     * const personalCalendarCache = await prisma.personalCalendarCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonalCalendarCacheFindFirstArgs>(args?: SelectSubset<T, PersonalCalendarCacheFindFirstArgs<ExtArgs>>): Prisma__PersonalCalendarCacheClient<$Result.GetResult<Prisma.$PersonalCalendarCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PersonalCalendarCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalCalendarCacheFindFirstOrThrowArgs} args - Arguments to find a PersonalCalendarCache
     * @example
     * // Get one PersonalCalendarCache
     * const personalCalendarCache = await prisma.personalCalendarCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonalCalendarCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonalCalendarCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonalCalendarCacheClient<$Result.GetResult<Prisma.$PersonalCalendarCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PersonalCalendarCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalCalendarCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PersonalCalendarCaches
     * const personalCalendarCaches = await prisma.personalCalendarCache.findMany()
     * 
     * // Get first 10 PersonalCalendarCaches
     * const personalCalendarCaches = await prisma.personalCalendarCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const personalCalendarCacheWithIdOnly = await prisma.personalCalendarCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PersonalCalendarCacheFindManyArgs>(args?: SelectSubset<T, PersonalCalendarCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalCalendarCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PersonalCalendarCache.
     * @param {PersonalCalendarCacheCreateArgs} args - Arguments to create a PersonalCalendarCache.
     * @example
     * // Create one PersonalCalendarCache
     * const PersonalCalendarCache = await prisma.personalCalendarCache.create({
     *   data: {
     *     // ... data to create a PersonalCalendarCache
     *   }
     * })
     * 
     */
    create<T extends PersonalCalendarCacheCreateArgs>(args: SelectSubset<T, PersonalCalendarCacheCreateArgs<ExtArgs>>): Prisma__PersonalCalendarCacheClient<$Result.GetResult<Prisma.$PersonalCalendarCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PersonalCalendarCaches.
     * @param {PersonalCalendarCacheCreateManyArgs} args - Arguments to create many PersonalCalendarCaches.
     * @example
     * // Create many PersonalCalendarCaches
     * const personalCalendarCache = await prisma.personalCalendarCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonalCalendarCacheCreateManyArgs>(args?: SelectSubset<T, PersonalCalendarCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PersonalCalendarCaches and returns the data saved in the database.
     * @param {PersonalCalendarCacheCreateManyAndReturnArgs} args - Arguments to create many PersonalCalendarCaches.
     * @example
     * // Create many PersonalCalendarCaches
     * const personalCalendarCache = await prisma.personalCalendarCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PersonalCalendarCaches and only return the `id`
     * const personalCalendarCacheWithIdOnly = await prisma.personalCalendarCache.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonalCalendarCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonalCalendarCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalCalendarCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PersonalCalendarCache.
     * @param {PersonalCalendarCacheDeleteArgs} args - Arguments to delete one PersonalCalendarCache.
     * @example
     * // Delete one PersonalCalendarCache
     * const PersonalCalendarCache = await prisma.personalCalendarCache.delete({
     *   where: {
     *     // ... filter to delete one PersonalCalendarCache
     *   }
     * })
     * 
     */
    delete<T extends PersonalCalendarCacheDeleteArgs>(args: SelectSubset<T, PersonalCalendarCacheDeleteArgs<ExtArgs>>): Prisma__PersonalCalendarCacheClient<$Result.GetResult<Prisma.$PersonalCalendarCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PersonalCalendarCache.
     * @param {PersonalCalendarCacheUpdateArgs} args - Arguments to update one PersonalCalendarCache.
     * @example
     * // Update one PersonalCalendarCache
     * const personalCalendarCache = await prisma.personalCalendarCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonalCalendarCacheUpdateArgs>(args: SelectSubset<T, PersonalCalendarCacheUpdateArgs<ExtArgs>>): Prisma__PersonalCalendarCacheClient<$Result.GetResult<Prisma.$PersonalCalendarCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PersonalCalendarCaches.
     * @param {PersonalCalendarCacheDeleteManyArgs} args - Arguments to filter PersonalCalendarCaches to delete.
     * @example
     * // Delete a few PersonalCalendarCaches
     * const { count } = await prisma.personalCalendarCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonalCalendarCacheDeleteManyArgs>(args?: SelectSubset<T, PersonalCalendarCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PersonalCalendarCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalCalendarCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PersonalCalendarCaches
     * const personalCalendarCache = await prisma.personalCalendarCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonalCalendarCacheUpdateManyArgs>(args: SelectSubset<T, PersonalCalendarCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PersonalCalendarCaches and returns the data updated in the database.
     * @param {PersonalCalendarCacheUpdateManyAndReturnArgs} args - Arguments to update many PersonalCalendarCaches.
     * @example
     * // Update many PersonalCalendarCaches
     * const personalCalendarCache = await prisma.personalCalendarCache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PersonalCalendarCaches and only return the `id`
     * const personalCalendarCacheWithIdOnly = await prisma.personalCalendarCache.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PersonalCalendarCacheUpdateManyAndReturnArgs>(args: SelectSubset<T, PersonalCalendarCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalCalendarCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PersonalCalendarCache.
     * @param {PersonalCalendarCacheUpsertArgs} args - Arguments to update or create a PersonalCalendarCache.
     * @example
     * // Update or create a PersonalCalendarCache
     * const personalCalendarCache = await prisma.personalCalendarCache.upsert({
     *   create: {
     *     // ... data to create a PersonalCalendarCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PersonalCalendarCache we want to update
     *   }
     * })
     */
    upsert<T extends PersonalCalendarCacheUpsertArgs>(args: SelectSubset<T, PersonalCalendarCacheUpsertArgs<ExtArgs>>): Prisma__PersonalCalendarCacheClient<$Result.GetResult<Prisma.$PersonalCalendarCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PersonalCalendarCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalCalendarCacheCountArgs} args - Arguments to filter PersonalCalendarCaches to count.
     * @example
     * // Count the number of PersonalCalendarCaches
     * const count = await prisma.personalCalendarCache.count({
     *   where: {
     *     // ... the filter for the PersonalCalendarCaches we want to count
     *   }
     * })
    **/
    count<T extends PersonalCalendarCacheCountArgs>(
      args?: Subset<T, PersonalCalendarCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonalCalendarCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PersonalCalendarCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalCalendarCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PersonalCalendarCacheAggregateArgs>(args: Subset<T, PersonalCalendarCacheAggregateArgs>): Prisma.PrismaPromise<GetPersonalCalendarCacheAggregateType<T>>

    /**
     * Group by PersonalCalendarCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalCalendarCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PersonalCalendarCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonalCalendarCacheGroupByArgs['orderBy'] }
        : { orderBy?: PersonalCalendarCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PersonalCalendarCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonalCalendarCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PersonalCalendarCache model
   */
  readonly fields: PersonalCalendarCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PersonalCalendarCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonalCalendarCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PersonalCalendarCache model
   */
  interface PersonalCalendarCacheFieldRefs {
    readonly id: FieldRef<"PersonalCalendarCache", 'String'>
    readonly userId: FieldRef<"PersonalCalendarCache", 'String'>
    readonly year: FieldRef<"PersonalCalendarCache", 'Int'>
    readonly events: FieldRef<"PersonalCalendarCache", 'String'>
    readonly calculatedAt: FieldRef<"PersonalCalendarCache", 'DateTime'>
    readonly expiresAt: FieldRef<"PersonalCalendarCache", 'DateTime'>
    readonly createdAt: FieldRef<"PersonalCalendarCache", 'DateTime'>
    readonly updatedAt: FieldRef<"PersonalCalendarCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PersonalCalendarCache findUnique
   */
  export type PersonalCalendarCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalCalendarCache
     */
    select?: PersonalCalendarCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalCalendarCache
     */
    omit?: PersonalCalendarCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalCalendarCacheInclude<ExtArgs> | null
    /**
     * Filter, which PersonalCalendarCache to fetch.
     */
    where: PersonalCalendarCacheWhereUniqueInput
  }

  /**
   * PersonalCalendarCache findUniqueOrThrow
   */
  export type PersonalCalendarCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalCalendarCache
     */
    select?: PersonalCalendarCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalCalendarCache
     */
    omit?: PersonalCalendarCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalCalendarCacheInclude<ExtArgs> | null
    /**
     * Filter, which PersonalCalendarCache to fetch.
     */
    where: PersonalCalendarCacheWhereUniqueInput
  }

  /**
   * PersonalCalendarCache findFirst
   */
  export type PersonalCalendarCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalCalendarCache
     */
    select?: PersonalCalendarCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalCalendarCache
     */
    omit?: PersonalCalendarCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalCalendarCacheInclude<ExtArgs> | null
    /**
     * Filter, which PersonalCalendarCache to fetch.
     */
    where?: PersonalCalendarCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalCalendarCaches to fetch.
     */
    orderBy?: PersonalCalendarCacheOrderByWithRelationInput | PersonalCalendarCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PersonalCalendarCaches.
     */
    cursor?: PersonalCalendarCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalCalendarCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalCalendarCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PersonalCalendarCaches.
     */
    distinct?: PersonalCalendarCacheScalarFieldEnum | PersonalCalendarCacheScalarFieldEnum[]
  }

  /**
   * PersonalCalendarCache findFirstOrThrow
   */
  export type PersonalCalendarCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalCalendarCache
     */
    select?: PersonalCalendarCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalCalendarCache
     */
    omit?: PersonalCalendarCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalCalendarCacheInclude<ExtArgs> | null
    /**
     * Filter, which PersonalCalendarCache to fetch.
     */
    where?: PersonalCalendarCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalCalendarCaches to fetch.
     */
    orderBy?: PersonalCalendarCacheOrderByWithRelationInput | PersonalCalendarCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PersonalCalendarCaches.
     */
    cursor?: PersonalCalendarCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalCalendarCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalCalendarCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PersonalCalendarCaches.
     */
    distinct?: PersonalCalendarCacheScalarFieldEnum | PersonalCalendarCacheScalarFieldEnum[]
  }

  /**
   * PersonalCalendarCache findMany
   */
  export type PersonalCalendarCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalCalendarCache
     */
    select?: PersonalCalendarCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalCalendarCache
     */
    omit?: PersonalCalendarCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalCalendarCacheInclude<ExtArgs> | null
    /**
     * Filter, which PersonalCalendarCaches to fetch.
     */
    where?: PersonalCalendarCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalCalendarCaches to fetch.
     */
    orderBy?: PersonalCalendarCacheOrderByWithRelationInput | PersonalCalendarCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PersonalCalendarCaches.
     */
    cursor?: PersonalCalendarCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalCalendarCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalCalendarCaches.
     */
    skip?: number
    distinct?: PersonalCalendarCacheScalarFieldEnum | PersonalCalendarCacheScalarFieldEnum[]
  }

  /**
   * PersonalCalendarCache create
   */
  export type PersonalCalendarCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalCalendarCache
     */
    select?: PersonalCalendarCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalCalendarCache
     */
    omit?: PersonalCalendarCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalCalendarCacheInclude<ExtArgs> | null
    /**
     * The data needed to create a PersonalCalendarCache.
     */
    data: XOR<PersonalCalendarCacheCreateInput, PersonalCalendarCacheUncheckedCreateInput>
  }

  /**
   * PersonalCalendarCache createMany
   */
  export type PersonalCalendarCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PersonalCalendarCaches.
     */
    data: PersonalCalendarCacheCreateManyInput | PersonalCalendarCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PersonalCalendarCache createManyAndReturn
   */
  export type PersonalCalendarCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalCalendarCache
     */
    select?: PersonalCalendarCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalCalendarCache
     */
    omit?: PersonalCalendarCacheOmit<ExtArgs> | null
    /**
     * The data used to create many PersonalCalendarCaches.
     */
    data: PersonalCalendarCacheCreateManyInput | PersonalCalendarCacheCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalCalendarCacheIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PersonalCalendarCache update
   */
  export type PersonalCalendarCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalCalendarCache
     */
    select?: PersonalCalendarCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalCalendarCache
     */
    omit?: PersonalCalendarCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalCalendarCacheInclude<ExtArgs> | null
    /**
     * The data needed to update a PersonalCalendarCache.
     */
    data: XOR<PersonalCalendarCacheUpdateInput, PersonalCalendarCacheUncheckedUpdateInput>
    /**
     * Choose, which PersonalCalendarCache to update.
     */
    where: PersonalCalendarCacheWhereUniqueInput
  }

  /**
   * PersonalCalendarCache updateMany
   */
  export type PersonalCalendarCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PersonalCalendarCaches.
     */
    data: XOR<PersonalCalendarCacheUpdateManyMutationInput, PersonalCalendarCacheUncheckedUpdateManyInput>
    /**
     * Filter which PersonalCalendarCaches to update
     */
    where?: PersonalCalendarCacheWhereInput
    /**
     * Limit how many PersonalCalendarCaches to update.
     */
    limit?: number
  }

  /**
   * PersonalCalendarCache updateManyAndReturn
   */
  export type PersonalCalendarCacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalCalendarCache
     */
    select?: PersonalCalendarCacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalCalendarCache
     */
    omit?: PersonalCalendarCacheOmit<ExtArgs> | null
    /**
     * The data used to update PersonalCalendarCaches.
     */
    data: XOR<PersonalCalendarCacheUpdateManyMutationInput, PersonalCalendarCacheUncheckedUpdateManyInput>
    /**
     * Filter which PersonalCalendarCaches to update
     */
    where?: PersonalCalendarCacheWhereInput
    /**
     * Limit how many PersonalCalendarCaches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalCalendarCacheIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PersonalCalendarCache upsert
   */
  export type PersonalCalendarCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalCalendarCache
     */
    select?: PersonalCalendarCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalCalendarCache
     */
    omit?: PersonalCalendarCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalCalendarCacheInclude<ExtArgs> | null
    /**
     * The filter to search for the PersonalCalendarCache to update in case it exists.
     */
    where: PersonalCalendarCacheWhereUniqueInput
    /**
     * In case the PersonalCalendarCache found by the `where` argument doesn't exist, create a new PersonalCalendarCache with this data.
     */
    create: XOR<PersonalCalendarCacheCreateInput, PersonalCalendarCacheUncheckedCreateInput>
    /**
     * In case the PersonalCalendarCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonalCalendarCacheUpdateInput, PersonalCalendarCacheUncheckedUpdateInput>
  }

  /**
   * PersonalCalendarCache delete
   */
  export type PersonalCalendarCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalCalendarCache
     */
    select?: PersonalCalendarCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalCalendarCache
     */
    omit?: PersonalCalendarCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalCalendarCacheInclude<ExtArgs> | null
    /**
     * Filter which PersonalCalendarCache to delete.
     */
    where: PersonalCalendarCacheWhereUniqueInput
  }

  /**
   * PersonalCalendarCache deleteMany
   */
  export type PersonalCalendarCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PersonalCalendarCaches to delete
     */
    where?: PersonalCalendarCacheWhereInput
    /**
     * Limit how many PersonalCalendarCaches to delete.
     */
    limit?: number
  }

  /**
   * PersonalCalendarCache without action
   */
  export type PersonalCalendarCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalCalendarCache
     */
    select?: PersonalCalendarCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalCalendarCache
     */
    omit?: PersonalCalendarCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalCalendarCacheInclude<ExtArgs> | null
  }


  /**
   * Model LunarPhasesCache
   */

  export type AggregateLunarPhasesCache = {
    _count: LunarPhasesCacheCountAggregateOutputType | null
    _avg: LunarPhasesCacheAvgAggregateOutputType | null
    _sum: LunarPhasesCacheSumAggregateOutputType | null
    _min: LunarPhasesCacheMinAggregateOutputType | null
    _max: LunarPhasesCacheMaxAggregateOutputType | null
  }

  export type LunarPhasesCacheAvgAggregateOutputType = {
    year: number | null
  }

  export type LunarPhasesCacheSumAggregateOutputType = {
    year: number | null
  }

  export type LunarPhasesCacheMinAggregateOutputType = {
    id: string | null
    userId: string | null
    year: number | null
    events: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LunarPhasesCacheMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    year: number | null
    events: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LunarPhasesCacheCountAggregateOutputType = {
    id: number
    userId: number
    year: number
    events: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LunarPhasesCacheAvgAggregateInputType = {
    year?: true
  }

  export type LunarPhasesCacheSumAggregateInputType = {
    year?: true
  }

  export type LunarPhasesCacheMinAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    events?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LunarPhasesCacheMaxAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    events?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LunarPhasesCacheCountAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    events?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LunarPhasesCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LunarPhasesCache to aggregate.
     */
    where?: LunarPhasesCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LunarPhasesCaches to fetch.
     */
    orderBy?: LunarPhasesCacheOrderByWithRelationInput | LunarPhasesCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LunarPhasesCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LunarPhasesCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LunarPhasesCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LunarPhasesCaches
    **/
    _count?: true | LunarPhasesCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LunarPhasesCacheAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LunarPhasesCacheSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LunarPhasesCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LunarPhasesCacheMaxAggregateInputType
  }

  export type GetLunarPhasesCacheAggregateType<T extends LunarPhasesCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateLunarPhasesCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLunarPhasesCache[P]>
      : GetScalarType<T[P], AggregateLunarPhasesCache[P]>
  }




  export type LunarPhasesCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LunarPhasesCacheWhereInput
    orderBy?: LunarPhasesCacheOrderByWithAggregationInput | LunarPhasesCacheOrderByWithAggregationInput[]
    by: LunarPhasesCacheScalarFieldEnum[] | LunarPhasesCacheScalarFieldEnum
    having?: LunarPhasesCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LunarPhasesCacheCountAggregateInputType | true
    _avg?: LunarPhasesCacheAvgAggregateInputType
    _sum?: LunarPhasesCacheSumAggregateInputType
    _min?: LunarPhasesCacheMinAggregateInputType
    _max?: LunarPhasesCacheMaxAggregateInputType
  }

  export type LunarPhasesCacheGroupByOutputType = {
    id: string
    userId: string
    year: number
    events: string
    createdAt: Date
    updatedAt: Date
    _count: LunarPhasesCacheCountAggregateOutputType | null
    _avg: LunarPhasesCacheAvgAggregateOutputType | null
    _sum: LunarPhasesCacheSumAggregateOutputType | null
    _min: LunarPhasesCacheMinAggregateOutputType | null
    _max: LunarPhasesCacheMaxAggregateOutputType | null
  }

  type GetLunarPhasesCacheGroupByPayload<T extends LunarPhasesCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LunarPhasesCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LunarPhasesCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LunarPhasesCacheGroupByOutputType[P]>
            : GetScalarType<T[P], LunarPhasesCacheGroupByOutputType[P]>
        }
      >
    >


  export type LunarPhasesCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    events?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lunarPhasesCache"]>

  export type LunarPhasesCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    events?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lunarPhasesCache"]>

  export type LunarPhasesCacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    events?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lunarPhasesCache"]>

  export type LunarPhasesCacheSelectScalar = {
    id?: boolean
    userId?: boolean
    year?: boolean
    events?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LunarPhasesCacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "year" | "events" | "createdAt" | "updatedAt", ExtArgs["result"]["lunarPhasesCache"]>
  export type LunarPhasesCacheInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LunarPhasesCacheIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LunarPhasesCacheIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LunarPhasesCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LunarPhasesCache"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      year: number
      events: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lunarPhasesCache"]>
    composites: {}
  }

  type LunarPhasesCacheGetPayload<S extends boolean | null | undefined | LunarPhasesCacheDefaultArgs> = $Result.GetResult<Prisma.$LunarPhasesCachePayload, S>

  type LunarPhasesCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LunarPhasesCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LunarPhasesCacheCountAggregateInputType | true
    }

  export interface LunarPhasesCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LunarPhasesCache'], meta: { name: 'LunarPhasesCache' } }
    /**
     * Find zero or one LunarPhasesCache that matches the filter.
     * @param {LunarPhasesCacheFindUniqueArgs} args - Arguments to find a LunarPhasesCache
     * @example
     * // Get one LunarPhasesCache
     * const lunarPhasesCache = await prisma.lunarPhasesCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LunarPhasesCacheFindUniqueArgs>(args: SelectSubset<T, LunarPhasesCacheFindUniqueArgs<ExtArgs>>): Prisma__LunarPhasesCacheClient<$Result.GetResult<Prisma.$LunarPhasesCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LunarPhasesCache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LunarPhasesCacheFindUniqueOrThrowArgs} args - Arguments to find a LunarPhasesCache
     * @example
     * // Get one LunarPhasesCache
     * const lunarPhasesCache = await prisma.lunarPhasesCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LunarPhasesCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, LunarPhasesCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LunarPhasesCacheClient<$Result.GetResult<Prisma.$LunarPhasesCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LunarPhasesCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LunarPhasesCacheFindFirstArgs} args - Arguments to find a LunarPhasesCache
     * @example
     * // Get one LunarPhasesCache
     * const lunarPhasesCache = await prisma.lunarPhasesCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LunarPhasesCacheFindFirstArgs>(args?: SelectSubset<T, LunarPhasesCacheFindFirstArgs<ExtArgs>>): Prisma__LunarPhasesCacheClient<$Result.GetResult<Prisma.$LunarPhasesCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LunarPhasesCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LunarPhasesCacheFindFirstOrThrowArgs} args - Arguments to find a LunarPhasesCache
     * @example
     * // Get one LunarPhasesCache
     * const lunarPhasesCache = await prisma.lunarPhasesCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LunarPhasesCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, LunarPhasesCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__LunarPhasesCacheClient<$Result.GetResult<Prisma.$LunarPhasesCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LunarPhasesCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LunarPhasesCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LunarPhasesCaches
     * const lunarPhasesCaches = await prisma.lunarPhasesCache.findMany()
     * 
     * // Get first 10 LunarPhasesCaches
     * const lunarPhasesCaches = await prisma.lunarPhasesCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lunarPhasesCacheWithIdOnly = await prisma.lunarPhasesCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LunarPhasesCacheFindManyArgs>(args?: SelectSubset<T, LunarPhasesCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LunarPhasesCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LunarPhasesCache.
     * @param {LunarPhasesCacheCreateArgs} args - Arguments to create a LunarPhasesCache.
     * @example
     * // Create one LunarPhasesCache
     * const LunarPhasesCache = await prisma.lunarPhasesCache.create({
     *   data: {
     *     // ... data to create a LunarPhasesCache
     *   }
     * })
     * 
     */
    create<T extends LunarPhasesCacheCreateArgs>(args: SelectSubset<T, LunarPhasesCacheCreateArgs<ExtArgs>>): Prisma__LunarPhasesCacheClient<$Result.GetResult<Prisma.$LunarPhasesCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LunarPhasesCaches.
     * @param {LunarPhasesCacheCreateManyArgs} args - Arguments to create many LunarPhasesCaches.
     * @example
     * // Create many LunarPhasesCaches
     * const lunarPhasesCache = await prisma.lunarPhasesCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LunarPhasesCacheCreateManyArgs>(args?: SelectSubset<T, LunarPhasesCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LunarPhasesCaches and returns the data saved in the database.
     * @param {LunarPhasesCacheCreateManyAndReturnArgs} args - Arguments to create many LunarPhasesCaches.
     * @example
     * // Create many LunarPhasesCaches
     * const lunarPhasesCache = await prisma.lunarPhasesCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LunarPhasesCaches and only return the `id`
     * const lunarPhasesCacheWithIdOnly = await prisma.lunarPhasesCache.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LunarPhasesCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, LunarPhasesCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LunarPhasesCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LunarPhasesCache.
     * @param {LunarPhasesCacheDeleteArgs} args - Arguments to delete one LunarPhasesCache.
     * @example
     * // Delete one LunarPhasesCache
     * const LunarPhasesCache = await prisma.lunarPhasesCache.delete({
     *   where: {
     *     // ... filter to delete one LunarPhasesCache
     *   }
     * })
     * 
     */
    delete<T extends LunarPhasesCacheDeleteArgs>(args: SelectSubset<T, LunarPhasesCacheDeleteArgs<ExtArgs>>): Prisma__LunarPhasesCacheClient<$Result.GetResult<Prisma.$LunarPhasesCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LunarPhasesCache.
     * @param {LunarPhasesCacheUpdateArgs} args - Arguments to update one LunarPhasesCache.
     * @example
     * // Update one LunarPhasesCache
     * const lunarPhasesCache = await prisma.lunarPhasesCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LunarPhasesCacheUpdateArgs>(args: SelectSubset<T, LunarPhasesCacheUpdateArgs<ExtArgs>>): Prisma__LunarPhasesCacheClient<$Result.GetResult<Prisma.$LunarPhasesCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LunarPhasesCaches.
     * @param {LunarPhasesCacheDeleteManyArgs} args - Arguments to filter LunarPhasesCaches to delete.
     * @example
     * // Delete a few LunarPhasesCaches
     * const { count } = await prisma.lunarPhasesCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LunarPhasesCacheDeleteManyArgs>(args?: SelectSubset<T, LunarPhasesCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LunarPhasesCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LunarPhasesCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LunarPhasesCaches
     * const lunarPhasesCache = await prisma.lunarPhasesCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LunarPhasesCacheUpdateManyArgs>(args: SelectSubset<T, LunarPhasesCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LunarPhasesCaches and returns the data updated in the database.
     * @param {LunarPhasesCacheUpdateManyAndReturnArgs} args - Arguments to update many LunarPhasesCaches.
     * @example
     * // Update many LunarPhasesCaches
     * const lunarPhasesCache = await prisma.lunarPhasesCache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LunarPhasesCaches and only return the `id`
     * const lunarPhasesCacheWithIdOnly = await prisma.lunarPhasesCache.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LunarPhasesCacheUpdateManyAndReturnArgs>(args: SelectSubset<T, LunarPhasesCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LunarPhasesCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LunarPhasesCache.
     * @param {LunarPhasesCacheUpsertArgs} args - Arguments to update or create a LunarPhasesCache.
     * @example
     * // Update or create a LunarPhasesCache
     * const lunarPhasesCache = await prisma.lunarPhasesCache.upsert({
     *   create: {
     *     // ... data to create a LunarPhasesCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LunarPhasesCache we want to update
     *   }
     * })
     */
    upsert<T extends LunarPhasesCacheUpsertArgs>(args: SelectSubset<T, LunarPhasesCacheUpsertArgs<ExtArgs>>): Prisma__LunarPhasesCacheClient<$Result.GetResult<Prisma.$LunarPhasesCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LunarPhasesCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LunarPhasesCacheCountArgs} args - Arguments to filter LunarPhasesCaches to count.
     * @example
     * // Count the number of LunarPhasesCaches
     * const count = await prisma.lunarPhasesCache.count({
     *   where: {
     *     // ... the filter for the LunarPhasesCaches we want to count
     *   }
     * })
    **/
    count<T extends LunarPhasesCacheCountArgs>(
      args?: Subset<T, LunarPhasesCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LunarPhasesCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LunarPhasesCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LunarPhasesCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LunarPhasesCacheAggregateArgs>(args: Subset<T, LunarPhasesCacheAggregateArgs>): Prisma.PrismaPromise<GetLunarPhasesCacheAggregateType<T>>

    /**
     * Group by LunarPhasesCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LunarPhasesCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LunarPhasesCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LunarPhasesCacheGroupByArgs['orderBy'] }
        : { orderBy?: LunarPhasesCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LunarPhasesCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLunarPhasesCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LunarPhasesCache model
   */
  readonly fields: LunarPhasesCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LunarPhasesCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LunarPhasesCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LunarPhasesCache model
   */
  interface LunarPhasesCacheFieldRefs {
    readonly id: FieldRef<"LunarPhasesCache", 'String'>
    readonly userId: FieldRef<"LunarPhasesCache", 'String'>
    readonly year: FieldRef<"LunarPhasesCache", 'Int'>
    readonly events: FieldRef<"LunarPhasesCache", 'String'>
    readonly createdAt: FieldRef<"LunarPhasesCache", 'DateTime'>
    readonly updatedAt: FieldRef<"LunarPhasesCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LunarPhasesCache findUnique
   */
  export type LunarPhasesCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarPhasesCache
     */
    select?: LunarPhasesCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarPhasesCache
     */
    omit?: LunarPhasesCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarPhasesCacheInclude<ExtArgs> | null
    /**
     * Filter, which LunarPhasesCache to fetch.
     */
    where: LunarPhasesCacheWhereUniqueInput
  }

  /**
   * LunarPhasesCache findUniqueOrThrow
   */
  export type LunarPhasesCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarPhasesCache
     */
    select?: LunarPhasesCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarPhasesCache
     */
    omit?: LunarPhasesCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarPhasesCacheInclude<ExtArgs> | null
    /**
     * Filter, which LunarPhasesCache to fetch.
     */
    where: LunarPhasesCacheWhereUniqueInput
  }

  /**
   * LunarPhasesCache findFirst
   */
  export type LunarPhasesCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarPhasesCache
     */
    select?: LunarPhasesCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarPhasesCache
     */
    omit?: LunarPhasesCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarPhasesCacheInclude<ExtArgs> | null
    /**
     * Filter, which LunarPhasesCache to fetch.
     */
    where?: LunarPhasesCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LunarPhasesCaches to fetch.
     */
    orderBy?: LunarPhasesCacheOrderByWithRelationInput | LunarPhasesCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LunarPhasesCaches.
     */
    cursor?: LunarPhasesCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LunarPhasesCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LunarPhasesCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LunarPhasesCaches.
     */
    distinct?: LunarPhasesCacheScalarFieldEnum | LunarPhasesCacheScalarFieldEnum[]
  }

  /**
   * LunarPhasesCache findFirstOrThrow
   */
  export type LunarPhasesCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarPhasesCache
     */
    select?: LunarPhasesCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarPhasesCache
     */
    omit?: LunarPhasesCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarPhasesCacheInclude<ExtArgs> | null
    /**
     * Filter, which LunarPhasesCache to fetch.
     */
    where?: LunarPhasesCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LunarPhasesCaches to fetch.
     */
    orderBy?: LunarPhasesCacheOrderByWithRelationInput | LunarPhasesCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LunarPhasesCaches.
     */
    cursor?: LunarPhasesCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LunarPhasesCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LunarPhasesCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LunarPhasesCaches.
     */
    distinct?: LunarPhasesCacheScalarFieldEnum | LunarPhasesCacheScalarFieldEnum[]
  }

  /**
   * LunarPhasesCache findMany
   */
  export type LunarPhasesCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarPhasesCache
     */
    select?: LunarPhasesCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarPhasesCache
     */
    omit?: LunarPhasesCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarPhasesCacheInclude<ExtArgs> | null
    /**
     * Filter, which LunarPhasesCaches to fetch.
     */
    where?: LunarPhasesCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LunarPhasesCaches to fetch.
     */
    orderBy?: LunarPhasesCacheOrderByWithRelationInput | LunarPhasesCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LunarPhasesCaches.
     */
    cursor?: LunarPhasesCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LunarPhasesCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LunarPhasesCaches.
     */
    skip?: number
    distinct?: LunarPhasesCacheScalarFieldEnum | LunarPhasesCacheScalarFieldEnum[]
  }

  /**
   * LunarPhasesCache create
   */
  export type LunarPhasesCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarPhasesCache
     */
    select?: LunarPhasesCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarPhasesCache
     */
    omit?: LunarPhasesCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarPhasesCacheInclude<ExtArgs> | null
    /**
     * The data needed to create a LunarPhasesCache.
     */
    data: XOR<LunarPhasesCacheCreateInput, LunarPhasesCacheUncheckedCreateInput>
  }

  /**
   * LunarPhasesCache createMany
   */
  export type LunarPhasesCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LunarPhasesCaches.
     */
    data: LunarPhasesCacheCreateManyInput | LunarPhasesCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LunarPhasesCache createManyAndReturn
   */
  export type LunarPhasesCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarPhasesCache
     */
    select?: LunarPhasesCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LunarPhasesCache
     */
    omit?: LunarPhasesCacheOmit<ExtArgs> | null
    /**
     * The data used to create many LunarPhasesCaches.
     */
    data: LunarPhasesCacheCreateManyInput | LunarPhasesCacheCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarPhasesCacheIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LunarPhasesCache update
   */
  export type LunarPhasesCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarPhasesCache
     */
    select?: LunarPhasesCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarPhasesCache
     */
    omit?: LunarPhasesCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarPhasesCacheInclude<ExtArgs> | null
    /**
     * The data needed to update a LunarPhasesCache.
     */
    data: XOR<LunarPhasesCacheUpdateInput, LunarPhasesCacheUncheckedUpdateInput>
    /**
     * Choose, which LunarPhasesCache to update.
     */
    where: LunarPhasesCacheWhereUniqueInput
  }

  /**
   * LunarPhasesCache updateMany
   */
  export type LunarPhasesCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LunarPhasesCaches.
     */
    data: XOR<LunarPhasesCacheUpdateManyMutationInput, LunarPhasesCacheUncheckedUpdateManyInput>
    /**
     * Filter which LunarPhasesCaches to update
     */
    where?: LunarPhasesCacheWhereInput
    /**
     * Limit how many LunarPhasesCaches to update.
     */
    limit?: number
  }

  /**
   * LunarPhasesCache updateManyAndReturn
   */
  export type LunarPhasesCacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarPhasesCache
     */
    select?: LunarPhasesCacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LunarPhasesCache
     */
    omit?: LunarPhasesCacheOmit<ExtArgs> | null
    /**
     * The data used to update LunarPhasesCaches.
     */
    data: XOR<LunarPhasesCacheUpdateManyMutationInput, LunarPhasesCacheUncheckedUpdateManyInput>
    /**
     * Filter which LunarPhasesCaches to update
     */
    where?: LunarPhasesCacheWhereInput
    /**
     * Limit how many LunarPhasesCaches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarPhasesCacheIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LunarPhasesCache upsert
   */
  export type LunarPhasesCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarPhasesCache
     */
    select?: LunarPhasesCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarPhasesCache
     */
    omit?: LunarPhasesCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarPhasesCacheInclude<ExtArgs> | null
    /**
     * The filter to search for the LunarPhasesCache to update in case it exists.
     */
    where: LunarPhasesCacheWhereUniqueInput
    /**
     * In case the LunarPhasesCache found by the `where` argument doesn't exist, create a new LunarPhasesCache with this data.
     */
    create: XOR<LunarPhasesCacheCreateInput, LunarPhasesCacheUncheckedCreateInput>
    /**
     * In case the LunarPhasesCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LunarPhasesCacheUpdateInput, LunarPhasesCacheUncheckedUpdateInput>
  }

  /**
   * LunarPhasesCache delete
   */
  export type LunarPhasesCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarPhasesCache
     */
    select?: LunarPhasesCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarPhasesCache
     */
    omit?: LunarPhasesCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarPhasesCacheInclude<ExtArgs> | null
    /**
     * Filter which LunarPhasesCache to delete.
     */
    where: LunarPhasesCacheWhereUniqueInput
  }

  /**
   * LunarPhasesCache deleteMany
   */
  export type LunarPhasesCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LunarPhasesCaches to delete
     */
    where?: LunarPhasesCacheWhereInput
    /**
     * Limit how many LunarPhasesCaches to delete.
     */
    limit?: number
  }

  /**
   * LunarPhasesCache without action
   */
  export type LunarPhasesCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarPhasesCache
     */
    select?: LunarPhasesCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarPhasesCache
     */
    omit?: LunarPhasesCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarPhasesCacheInclude<ExtArgs> | null
  }


  /**
   * Model LunarJournal
   */

  export type AggregateLunarJournal = {
    _count: LunarJournalCountAggregateOutputType | null
    _min: LunarJournalMinAggregateOutputType | null
    _max: LunarJournalMaxAggregateOutputType | null
  }

  export type LunarJournalMinAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    eventType: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LunarJournalMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    eventType: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LunarJournalCountAggregateOutputType = {
    id: number
    userId: number
    date: number
    eventType: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LunarJournalMinAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    eventType?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LunarJournalMaxAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    eventType?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LunarJournalCountAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    eventType?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LunarJournalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LunarJournal to aggregate.
     */
    where?: LunarJournalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LunarJournals to fetch.
     */
    orderBy?: LunarJournalOrderByWithRelationInput | LunarJournalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LunarJournalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LunarJournals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LunarJournals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LunarJournals
    **/
    _count?: true | LunarJournalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LunarJournalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LunarJournalMaxAggregateInputType
  }

  export type GetLunarJournalAggregateType<T extends LunarJournalAggregateArgs> = {
        [P in keyof T & keyof AggregateLunarJournal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLunarJournal[P]>
      : GetScalarType<T[P], AggregateLunarJournal[P]>
  }




  export type LunarJournalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LunarJournalWhereInput
    orderBy?: LunarJournalOrderByWithAggregationInput | LunarJournalOrderByWithAggregationInput[]
    by: LunarJournalScalarFieldEnum[] | LunarJournalScalarFieldEnum
    having?: LunarJournalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LunarJournalCountAggregateInputType | true
    _min?: LunarJournalMinAggregateInputType
    _max?: LunarJournalMaxAggregateInputType
  }

  export type LunarJournalGroupByOutputType = {
    id: string
    userId: string
    date: Date
    eventType: string
    notes: string
    createdAt: Date
    updatedAt: Date
    _count: LunarJournalCountAggregateOutputType | null
    _min: LunarJournalMinAggregateOutputType | null
    _max: LunarJournalMaxAggregateOutputType | null
  }

  type GetLunarJournalGroupByPayload<T extends LunarJournalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LunarJournalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LunarJournalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LunarJournalGroupByOutputType[P]>
            : GetScalarType<T[P], LunarJournalGroupByOutputType[P]>
        }
      >
    >


  export type LunarJournalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    eventType?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lunarJournal"]>

  export type LunarJournalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    eventType?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lunarJournal"]>

  export type LunarJournalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    eventType?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lunarJournal"]>

  export type LunarJournalSelectScalar = {
    id?: boolean
    userId?: boolean
    date?: boolean
    eventType?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LunarJournalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "date" | "eventType" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["lunarJournal"]>
  export type LunarJournalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LunarJournalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LunarJournalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LunarJournalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LunarJournal"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      date: Date
      eventType: string
      notes: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lunarJournal"]>
    composites: {}
  }

  type LunarJournalGetPayload<S extends boolean | null | undefined | LunarJournalDefaultArgs> = $Result.GetResult<Prisma.$LunarJournalPayload, S>

  type LunarJournalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LunarJournalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LunarJournalCountAggregateInputType | true
    }

  export interface LunarJournalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LunarJournal'], meta: { name: 'LunarJournal' } }
    /**
     * Find zero or one LunarJournal that matches the filter.
     * @param {LunarJournalFindUniqueArgs} args - Arguments to find a LunarJournal
     * @example
     * // Get one LunarJournal
     * const lunarJournal = await prisma.lunarJournal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LunarJournalFindUniqueArgs>(args: SelectSubset<T, LunarJournalFindUniqueArgs<ExtArgs>>): Prisma__LunarJournalClient<$Result.GetResult<Prisma.$LunarJournalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LunarJournal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LunarJournalFindUniqueOrThrowArgs} args - Arguments to find a LunarJournal
     * @example
     * // Get one LunarJournal
     * const lunarJournal = await prisma.lunarJournal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LunarJournalFindUniqueOrThrowArgs>(args: SelectSubset<T, LunarJournalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LunarJournalClient<$Result.GetResult<Prisma.$LunarJournalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LunarJournal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LunarJournalFindFirstArgs} args - Arguments to find a LunarJournal
     * @example
     * // Get one LunarJournal
     * const lunarJournal = await prisma.lunarJournal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LunarJournalFindFirstArgs>(args?: SelectSubset<T, LunarJournalFindFirstArgs<ExtArgs>>): Prisma__LunarJournalClient<$Result.GetResult<Prisma.$LunarJournalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LunarJournal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LunarJournalFindFirstOrThrowArgs} args - Arguments to find a LunarJournal
     * @example
     * // Get one LunarJournal
     * const lunarJournal = await prisma.lunarJournal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LunarJournalFindFirstOrThrowArgs>(args?: SelectSubset<T, LunarJournalFindFirstOrThrowArgs<ExtArgs>>): Prisma__LunarJournalClient<$Result.GetResult<Prisma.$LunarJournalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LunarJournals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LunarJournalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LunarJournals
     * const lunarJournals = await prisma.lunarJournal.findMany()
     * 
     * // Get first 10 LunarJournals
     * const lunarJournals = await prisma.lunarJournal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lunarJournalWithIdOnly = await prisma.lunarJournal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LunarJournalFindManyArgs>(args?: SelectSubset<T, LunarJournalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LunarJournalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LunarJournal.
     * @param {LunarJournalCreateArgs} args - Arguments to create a LunarJournal.
     * @example
     * // Create one LunarJournal
     * const LunarJournal = await prisma.lunarJournal.create({
     *   data: {
     *     // ... data to create a LunarJournal
     *   }
     * })
     * 
     */
    create<T extends LunarJournalCreateArgs>(args: SelectSubset<T, LunarJournalCreateArgs<ExtArgs>>): Prisma__LunarJournalClient<$Result.GetResult<Prisma.$LunarJournalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LunarJournals.
     * @param {LunarJournalCreateManyArgs} args - Arguments to create many LunarJournals.
     * @example
     * // Create many LunarJournals
     * const lunarJournal = await prisma.lunarJournal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LunarJournalCreateManyArgs>(args?: SelectSubset<T, LunarJournalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LunarJournals and returns the data saved in the database.
     * @param {LunarJournalCreateManyAndReturnArgs} args - Arguments to create many LunarJournals.
     * @example
     * // Create many LunarJournals
     * const lunarJournal = await prisma.lunarJournal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LunarJournals and only return the `id`
     * const lunarJournalWithIdOnly = await prisma.lunarJournal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LunarJournalCreateManyAndReturnArgs>(args?: SelectSubset<T, LunarJournalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LunarJournalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LunarJournal.
     * @param {LunarJournalDeleteArgs} args - Arguments to delete one LunarJournal.
     * @example
     * // Delete one LunarJournal
     * const LunarJournal = await prisma.lunarJournal.delete({
     *   where: {
     *     // ... filter to delete one LunarJournal
     *   }
     * })
     * 
     */
    delete<T extends LunarJournalDeleteArgs>(args: SelectSubset<T, LunarJournalDeleteArgs<ExtArgs>>): Prisma__LunarJournalClient<$Result.GetResult<Prisma.$LunarJournalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LunarJournal.
     * @param {LunarJournalUpdateArgs} args - Arguments to update one LunarJournal.
     * @example
     * // Update one LunarJournal
     * const lunarJournal = await prisma.lunarJournal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LunarJournalUpdateArgs>(args: SelectSubset<T, LunarJournalUpdateArgs<ExtArgs>>): Prisma__LunarJournalClient<$Result.GetResult<Prisma.$LunarJournalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LunarJournals.
     * @param {LunarJournalDeleteManyArgs} args - Arguments to filter LunarJournals to delete.
     * @example
     * // Delete a few LunarJournals
     * const { count } = await prisma.lunarJournal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LunarJournalDeleteManyArgs>(args?: SelectSubset<T, LunarJournalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LunarJournals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LunarJournalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LunarJournals
     * const lunarJournal = await prisma.lunarJournal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LunarJournalUpdateManyArgs>(args: SelectSubset<T, LunarJournalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LunarJournals and returns the data updated in the database.
     * @param {LunarJournalUpdateManyAndReturnArgs} args - Arguments to update many LunarJournals.
     * @example
     * // Update many LunarJournals
     * const lunarJournal = await prisma.lunarJournal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LunarJournals and only return the `id`
     * const lunarJournalWithIdOnly = await prisma.lunarJournal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LunarJournalUpdateManyAndReturnArgs>(args: SelectSubset<T, LunarJournalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LunarJournalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LunarJournal.
     * @param {LunarJournalUpsertArgs} args - Arguments to update or create a LunarJournal.
     * @example
     * // Update or create a LunarJournal
     * const lunarJournal = await prisma.lunarJournal.upsert({
     *   create: {
     *     // ... data to create a LunarJournal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LunarJournal we want to update
     *   }
     * })
     */
    upsert<T extends LunarJournalUpsertArgs>(args: SelectSubset<T, LunarJournalUpsertArgs<ExtArgs>>): Prisma__LunarJournalClient<$Result.GetResult<Prisma.$LunarJournalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LunarJournals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LunarJournalCountArgs} args - Arguments to filter LunarJournals to count.
     * @example
     * // Count the number of LunarJournals
     * const count = await prisma.lunarJournal.count({
     *   where: {
     *     // ... the filter for the LunarJournals we want to count
     *   }
     * })
    **/
    count<T extends LunarJournalCountArgs>(
      args?: Subset<T, LunarJournalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LunarJournalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LunarJournal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LunarJournalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LunarJournalAggregateArgs>(args: Subset<T, LunarJournalAggregateArgs>): Prisma.PrismaPromise<GetLunarJournalAggregateType<T>>

    /**
     * Group by LunarJournal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LunarJournalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LunarJournalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LunarJournalGroupByArgs['orderBy'] }
        : { orderBy?: LunarJournalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LunarJournalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLunarJournalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LunarJournal model
   */
  readonly fields: LunarJournalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LunarJournal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LunarJournalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LunarJournal model
   */
  interface LunarJournalFieldRefs {
    readonly id: FieldRef<"LunarJournal", 'String'>
    readonly userId: FieldRef<"LunarJournal", 'String'>
    readonly date: FieldRef<"LunarJournal", 'DateTime'>
    readonly eventType: FieldRef<"LunarJournal", 'String'>
    readonly notes: FieldRef<"LunarJournal", 'String'>
    readonly createdAt: FieldRef<"LunarJournal", 'DateTime'>
    readonly updatedAt: FieldRef<"LunarJournal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LunarJournal findUnique
   */
  export type LunarJournalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarJournal
     */
    select?: LunarJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarJournal
     */
    omit?: LunarJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarJournalInclude<ExtArgs> | null
    /**
     * Filter, which LunarJournal to fetch.
     */
    where: LunarJournalWhereUniqueInput
  }

  /**
   * LunarJournal findUniqueOrThrow
   */
  export type LunarJournalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarJournal
     */
    select?: LunarJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarJournal
     */
    omit?: LunarJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarJournalInclude<ExtArgs> | null
    /**
     * Filter, which LunarJournal to fetch.
     */
    where: LunarJournalWhereUniqueInput
  }

  /**
   * LunarJournal findFirst
   */
  export type LunarJournalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarJournal
     */
    select?: LunarJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarJournal
     */
    omit?: LunarJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarJournalInclude<ExtArgs> | null
    /**
     * Filter, which LunarJournal to fetch.
     */
    where?: LunarJournalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LunarJournals to fetch.
     */
    orderBy?: LunarJournalOrderByWithRelationInput | LunarJournalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LunarJournals.
     */
    cursor?: LunarJournalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LunarJournals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LunarJournals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LunarJournals.
     */
    distinct?: LunarJournalScalarFieldEnum | LunarJournalScalarFieldEnum[]
  }

  /**
   * LunarJournal findFirstOrThrow
   */
  export type LunarJournalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarJournal
     */
    select?: LunarJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarJournal
     */
    omit?: LunarJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarJournalInclude<ExtArgs> | null
    /**
     * Filter, which LunarJournal to fetch.
     */
    where?: LunarJournalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LunarJournals to fetch.
     */
    orderBy?: LunarJournalOrderByWithRelationInput | LunarJournalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LunarJournals.
     */
    cursor?: LunarJournalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LunarJournals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LunarJournals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LunarJournals.
     */
    distinct?: LunarJournalScalarFieldEnum | LunarJournalScalarFieldEnum[]
  }

  /**
   * LunarJournal findMany
   */
  export type LunarJournalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarJournal
     */
    select?: LunarJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarJournal
     */
    omit?: LunarJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarJournalInclude<ExtArgs> | null
    /**
     * Filter, which LunarJournals to fetch.
     */
    where?: LunarJournalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LunarJournals to fetch.
     */
    orderBy?: LunarJournalOrderByWithRelationInput | LunarJournalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LunarJournals.
     */
    cursor?: LunarJournalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LunarJournals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LunarJournals.
     */
    skip?: number
    distinct?: LunarJournalScalarFieldEnum | LunarJournalScalarFieldEnum[]
  }

  /**
   * LunarJournal create
   */
  export type LunarJournalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarJournal
     */
    select?: LunarJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarJournal
     */
    omit?: LunarJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarJournalInclude<ExtArgs> | null
    /**
     * The data needed to create a LunarJournal.
     */
    data: XOR<LunarJournalCreateInput, LunarJournalUncheckedCreateInput>
  }

  /**
   * LunarJournal createMany
   */
  export type LunarJournalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LunarJournals.
     */
    data: LunarJournalCreateManyInput | LunarJournalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LunarJournal createManyAndReturn
   */
  export type LunarJournalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarJournal
     */
    select?: LunarJournalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LunarJournal
     */
    omit?: LunarJournalOmit<ExtArgs> | null
    /**
     * The data used to create many LunarJournals.
     */
    data: LunarJournalCreateManyInput | LunarJournalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarJournalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LunarJournal update
   */
  export type LunarJournalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarJournal
     */
    select?: LunarJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarJournal
     */
    omit?: LunarJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarJournalInclude<ExtArgs> | null
    /**
     * The data needed to update a LunarJournal.
     */
    data: XOR<LunarJournalUpdateInput, LunarJournalUncheckedUpdateInput>
    /**
     * Choose, which LunarJournal to update.
     */
    where: LunarJournalWhereUniqueInput
  }

  /**
   * LunarJournal updateMany
   */
  export type LunarJournalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LunarJournals.
     */
    data: XOR<LunarJournalUpdateManyMutationInput, LunarJournalUncheckedUpdateManyInput>
    /**
     * Filter which LunarJournals to update
     */
    where?: LunarJournalWhereInput
    /**
     * Limit how many LunarJournals to update.
     */
    limit?: number
  }

  /**
   * LunarJournal updateManyAndReturn
   */
  export type LunarJournalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarJournal
     */
    select?: LunarJournalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LunarJournal
     */
    omit?: LunarJournalOmit<ExtArgs> | null
    /**
     * The data used to update LunarJournals.
     */
    data: XOR<LunarJournalUpdateManyMutationInput, LunarJournalUncheckedUpdateManyInput>
    /**
     * Filter which LunarJournals to update
     */
    where?: LunarJournalWhereInput
    /**
     * Limit how many LunarJournals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarJournalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LunarJournal upsert
   */
  export type LunarJournalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarJournal
     */
    select?: LunarJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarJournal
     */
    omit?: LunarJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarJournalInclude<ExtArgs> | null
    /**
     * The filter to search for the LunarJournal to update in case it exists.
     */
    where: LunarJournalWhereUniqueInput
    /**
     * In case the LunarJournal found by the `where` argument doesn't exist, create a new LunarJournal with this data.
     */
    create: XOR<LunarJournalCreateInput, LunarJournalUncheckedCreateInput>
    /**
     * In case the LunarJournal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LunarJournalUpdateInput, LunarJournalUncheckedUpdateInput>
  }

  /**
   * LunarJournal delete
   */
  export type LunarJournalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarJournal
     */
    select?: LunarJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarJournal
     */
    omit?: LunarJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarJournalInclude<ExtArgs> | null
    /**
     * Filter which LunarJournal to delete.
     */
    where: LunarJournalWhereUniqueInput
  }

  /**
   * LunarJournal deleteMany
   */
  export type LunarJournalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LunarJournals to delete
     */
    where?: LunarJournalWhereInput
    /**
     * Limit how many LunarJournals to delete.
     */
    limit?: number
  }

  /**
   * LunarJournal without action
   */
  export type LunarJournalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LunarJournal
     */
    select?: LunarJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LunarJournal
     */
    omit?: LunarJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LunarJournalInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    image: 'image',
    password: 'password',
    emailVerified: 'emailVerified',
    resetToken: 'resetToken',
    resetTokenExpiry: 'resetTokenExpiry',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    birthDate: 'birthDate',
    birthCity: 'birthCity',
    birthCountry: 'birthCountry',
    birthHour: 'birthHour',
    birthMinute: 'birthMinute',
    knowsBirthTime: 'knowsBirthTime',
    gender: 'gender',
    residenceCity: 'residenceCity',
    residenceCountry: 'residenceCountry',
    timezone: 'timezone',
    rectificationRequested: 'rectificationRequested',
    rectificationAcceptedUncertainty: 'rectificationAcceptedUncertainty',
    rectificationStatus: 'rectificationStatus',
    rectificationRequestDate: 'rectificationRequestDate',
    subscriptionStatus: 'subscriptionStatus',
    subscriptionExpiresAt: 'subscriptionExpiresAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RectificationEventScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    eventType: 'eventType',
    description: 'description',
    eventDate: 'eventDate',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RectificationEventScalarFieldEnum = (typeof RectificationEventScalarFieldEnum)[keyof typeof RectificationEventScalarFieldEnum]


  export const CartaNatalScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    tipo: 'tipo',
    dataCompleta: 'dataCompleta',
    dataReducida: 'dataReducida',
    fechaNacimiento: 'fechaNacimiento',
    lugarNacimiento: 'lugarNacimiento',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CartaNatalScalarFieldEnum = (typeof CartaNatalScalarFieldEnum)[keyof typeof CartaNatalScalarFieldEnum]


  export const InterpretacionCacheScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fechaNacimiento: 'fechaNacimiento',
    lugarNacimiento: 'lugarNacimiento',
    gender: 'gender',
    tipo: 'tipo',
    interpretacionNarrativa: 'interpretacionNarrativa',
    interpretacionesIndividuales: 'interpretacionesIndividuales',
    tiempoGeneracion: 'tiempoGeneracion',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InterpretacionCacheScalarFieldEnum = (typeof InterpretacionCacheScalarFieldEnum)[keyof typeof InterpretacionCacheScalarFieldEnum]


  export const AstrogematriaCacheScalarFieldEnum: {
    id: 'id',
    palabra: 'palabra',
    palabraProcesada: 'palabraProcesada',
    valorTotal: 'valorTotal',
    reduccionZodiacal: 'reduccionZodiacal',
    signo: 'signo',
    grados: 'grados',
    posicionCompleta: 'posicionCompleta',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AstrogematriaCacheScalarFieldEnum = (typeof AstrogematriaCacheScalarFieldEnum)[keyof typeof AstrogematriaCacheScalarFieldEnum]


  export const HorariaRequestScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    country: 'country',
    acceptSingleQuestion: 'acceptSingleQuestion',
    isFirstTime: 'isFirstTime',
    questionCategory: 'questionCategory',
    question: 'question',
    context: 'context',
    status: 'status',
    response: 'response',
    responseDate: 'responseDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HorariaRequestScalarFieldEnum = (typeof HorariaRequestScalarFieldEnum)[keyof typeof HorariaRequestScalarFieldEnum]


  export const PersonalCalendarCacheScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    year: 'year',
    events: 'events',
    calculatedAt: 'calculatedAt',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PersonalCalendarCacheScalarFieldEnum = (typeof PersonalCalendarCacheScalarFieldEnum)[keyof typeof PersonalCalendarCacheScalarFieldEnum]


  export const LunarPhasesCacheScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    year: 'year',
    events: 'events',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LunarPhasesCacheScalarFieldEnum = (typeof LunarPhasesCacheScalarFieldEnum)[keyof typeof LunarPhasesCacheScalarFieldEnum]


  export const LunarJournalScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    date: 'date',
    eventType: 'eventType',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LunarJournalScalarFieldEnum = (typeof LunarJournalScalarFieldEnum)[keyof typeof LunarJournalScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    birthDate?: DateTimeNullableFilter<"User"> | Date | string | null
    birthCity?: StringNullableFilter<"User"> | string | null
    birthCountry?: StringNullableFilter<"User"> | string | null
    birthHour?: IntNullableFilter<"User"> | number | null
    birthMinute?: IntNullableFilter<"User"> | number | null
    knowsBirthTime?: BoolFilter<"User"> | boolean
    gender?: StringNullableFilter<"User"> | string | null
    residenceCity?: StringNullableFilter<"User"> | string | null
    residenceCountry?: StringNullableFilter<"User"> | string | null
    timezone?: StringNullableFilter<"User"> | string | null
    rectificationRequested?: BoolFilter<"User"> | boolean
    rectificationAcceptedUncertainty?: BoolFilter<"User"> | boolean
    rectificationStatus?: StringNullableFilter<"User"> | string | null
    rectificationRequestDate?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptionStatus?: StringFilter<"User"> | string
    subscriptionExpiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    rectificationEvents?: RectificationEventListRelationFilter
    cartasNatales?: CartaNatalListRelationFilter
    interpretaciones?: InterpretacionCacheListRelationFilter
    horariaRequests?: HorariaRequestListRelationFilter
    personalCalendarCache?: PersonalCalendarCacheListRelationFilter
    lunarPhasesCache?: LunarPhasesCacheListRelationFilter
    lunarJournal?: LunarJournalListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    birthCity?: SortOrderInput | SortOrder
    birthCountry?: SortOrderInput | SortOrder
    birthHour?: SortOrderInput | SortOrder
    birthMinute?: SortOrderInput | SortOrder
    knowsBirthTime?: SortOrder
    gender?: SortOrderInput | SortOrder
    residenceCity?: SortOrderInput | SortOrder
    residenceCountry?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    rectificationRequested?: SortOrder
    rectificationAcceptedUncertainty?: SortOrder
    rectificationStatus?: SortOrderInput | SortOrder
    rectificationRequestDate?: SortOrderInput | SortOrder
    subscriptionStatus?: SortOrder
    subscriptionExpiresAt?: SortOrderInput | SortOrder
    rectificationEvents?: RectificationEventOrderByRelationAggregateInput
    cartasNatales?: CartaNatalOrderByRelationAggregateInput
    interpretaciones?: InterpretacionCacheOrderByRelationAggregateInput
    horariaRequests?: HorariaRequestOrderByRelationAggregateInput
    personalCalendarCache?: PersonalCalendarCacheOrderByRelationAggregateInput
    lunarPhasesCache?: LunarPhasesCacheOrderByRelationAggregateInput
    lunarJournal?: LunarJournalOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    birthDate?: DateTimeNullableFilter<"User"> | Date | string | null
    birthCity?: StringNullableFilter<"User"> | string | null
    birthCountry?: StringNullableFilter<"User"> | string | null
    birthHour?: IntNullableFilter<"User"> | number | null
    birthMinute?: IntNullableFilter<"User"> | number | null
    knowsBirthTime?: BoolFilter<"User"> | boolean
    gender?: StringNullableFilter<"User"> | string | null
    residenceCity?: StringNullableFilter<"User"> | string | null
    residenceCountry?: StringNullableFilter<"User"> | string | null
    timezone?: StringNullableFilter<"User"> | string | null
    rectificationRequested?: BoolFilter<"User"> | boolean
    rectificationAcceptedUncertainty?: BoolFilter<"User"> | boolean
    rectificationStatus?: StringNullableFilter<"User"> | string | null
    rectificationRequestDate?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptionStatus?: StringFilter<"User"> | string
    subscriptionExpiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    rectificationEvents?: RectificationEventListRelationFilter
    cartasNatales?: CartaNatalListRelationFilter
    interpretaciones?: InterpretacionCacheListRelationFilter
    horariaRequests?: HorariaRequestListRelationFilter
    personalCalendarCache?: PersonalCalendarCacheListRelationFilter
    lunarPhasesCache?: LunarPhasesCacheListRelationFilter
    lunarJournal?: LunarJournalListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    birthCity?: SortOrderInput | SortOrder
    birthCountry?: SortOrderInput | SortOrder
    birthHour?: SortOrderInput | SortOrder
    birthMinute?: SortOrderInput | SortOrder
    knowsBirthTime?: SortOrder
    gender?: SortOrderInput | SortOrder
    residenceCity?: SortOrderInput | SortOrder
    residenceCountry?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    rectificationRequested?: SortOrder
    rectificationAcceptedUncertainty?: SortOrder
    rectificationStatus?: SortOrderInput | SortOrder
    rectificationRequestDate?: SortOrderInput | SortOrder
    subscriptionStatus?: SortOrder
    subscriptionExpiresAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    resetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    birthDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    birthCity?: StringNullableWithAggregatesFilter<"User"> | string | null
    birthCountry?: StringNullableWithAggregatesFilter<"User"> | string | null
    birthHour?: IntNullableWithAggregatesFilter<"User"> | number | null
    birthMinute?: IntNullableWithAggregatesFilter<"User"> | number | null
    knowsBirthTime?: BoolWithAggregatesFilter<"User"> | boolean
    gender?: StringNullableWithAggregatesFilter<"User"> | string | null
    residenceCity?: StringNullableWithAggregatesFilter<"User"> | string | null
    residenceCountry?: StringNullableWithAggregatesFilter<"User"> | string | null
    timezone?: StringNullableWithAggregatesFilter<"User"> | string | null
    rectificationRequested?: BoolWithAggregatesFilter<"User"> | boolean
    rectificationAcceptedUncertainty?: BoolWithAggregatesFilter<"User"> | boolean
    rectificationStatus?: StringNullableWithAggregatesFilter<"User"> | string | null
    rectificationRequestDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    subscriptionStatus?: StringWithAggregatesFilter<"User"> | string
    subscriptionExpiresAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type RectificationEventWhereInput = {
    AND?: RectificationEventWhereInput | RectificationEventWhereInput[]
    OR?: RectificationEventWhereInput[]
    NOT?: RectificationEventWhereInput | RectificationEventWhereInput[]
    id?: StringFilter<"RectificationEvent"> | string
    userId?: StringFilter<"RectificationEvent"> | string
    eventType?: StringFilter<"RectificationEvent"> | string
    description?: StringFilter<"RectificationEvent"> | string
    eventDate?: DateTimeFilter<"RectificationEvent"> | Date | string
    notes?: StringNullableFilter<"RectificationEvent"> | string | null
    createdAt?: DateTimeFilter<"RectificationEvent"> | Date | string
    updatedAt?: DateTimeFilter<"RectificationEvent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RectificationEventOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    eventType?: SortOrder
    description?: SortOrder
    eventDate?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RectificationEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RectificationEventWhereInput | RectificationEventWhereInput[]
    OR?: RectificationEventWhereInput[]
    NOT?: RectificationEventWhereInput | RectificationEventWhereInput[]
    userId?: StringFilter<"RectificationEvent"> | string
    eventType?: StringFilter<"RectificationEvent"> | string
    description?: StringFilter<"RectificationEvent"> | string
    eventDate?: DateTimeFilter<"RectificationEvent"> | Date | string
    notes?: StringNullableFilter<"RectificationEvent"> | string | null
    createdAt?: DateTimeFilter<"RectificationEvent"> | Date | string
    updatedAt?: DateTimeFilter<"RectificationEvent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type RectificationEventOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    eventType?: SortOrder
    description?: SortOrder
    eventDate?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RectificationEventCountOrderByAggregateInput
    _max?: RectificationEventMaxOrderByAggregateInput
    _min?: RectificationEventMinOrderByAggregateInput
  }

  export type RectificationEventScalarWhereWithAggregatesInput = {
    AND?: RectificationEventScalarWhereWithAggregatesInput | RectificationEventScalarWhereWithAggregatesInput[]
    OR?: RectificationEventScalarWhereWithAggregatesInput[]
    NOT?: RectificationEventScalarWhereWithAggregatesInput | RectificationEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RectificationEvent"> | string
    userId?: StringWithAggregatesFilter<"RectificationEvent"> | string
    eventType?: StringWithAggregatesFilter<"RectificationEvent"> | string
    description?: StringWithAggregatesFilter<"RectificationEvent"> | string
    eventDate?: DateTimeWithAggregatesFilter<"RectificationEvent"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"RectificationEvent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RectificationEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RectificationEvent"> | Date | string
  }

  export type CartaNatalWhereInput = {
    AND?: CartaNatalWhereInput | CartaNatalWhereInput[]
    OR?: CartaNatalWhereInput[]
    NOT?: CartaNatalWhereInput | CartaNatalWhereInput[]
    id?: StringFilter<"CartaNatal"> | string
    userId?: StringFilter<"CartaNatal"> | string
    tipo?: StringFilter<"CartaNatal"> | string
    dataCompleta?: StringFilter<"CartaNatal"> | string
    dataReducida?: StringFilter<"CartaNatal"> | string
    fechaNacimiento?: DateTimeFilter<"CartaNatal"> | Date | string
    lugarNacimiento?: StringFilter<"CartaNatal"> | string
    createdAt?: DateTimeFilter<"CartaNatal"> | Date | string
    updatedAt?: DateTimeFilter<"CartaNatal"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CartaNatalOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    tipo?: SortOrder
    dataCompleta?: SortOrder
    dataReducida?: SortOrder
    fechaNacimiento?: SortOrder
    lugarNacimiento?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CartaNatalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_tipo_fechaNacimiento_lugarNacimiento?: CartaNatalUserIdTipoFechaNacimientoLugarNacimientoCompoundUniqueInput
    AND?: CartaNatalWhereInput | CartaNatalWhereInput[]
    OR?: CartaNatalWhereInput[]
    NOT?: CartaNatalWhereInput | CartaNatalWhereInput[]
    userId?: StringFilter<"CartaNatal"> | string
    tipo?: StringFilter<"CartaNatal"> | string
    dataCompleta?: StringFilter<"CartaNatal"> | string
    dataReducida?: StringFilter<"CartaNatal"> | string
    fechaNacimiento?: DateTimeFilter<"CartaNatal"> | Date | string
    lugarNacimiento?: StringFilter<"CartaNatal"> | string
    createdAt?: DateTimeFilter<"CartaNatal"> | Date | string
    updatedAt?: DateTimeFilter<"CartaNatal"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_tipo_fechaNacimiento_lugarNacimiento">

  export type CartaNatalOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    tipo?: SortOrder
    dataCompleta?: SortOrder
    dataReducida?: SortOrder
    fechaNacimiento?: SortOrder
    lugarNacimiento?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CartaNatalCountOrderByAggregateInput
    _max?: CartaNatalMaxOrderByAggregateInput
    _min?: CartaNatalMinOrderByAggregateInput
  }

  export type CartaNatalScalarWhereWithAggregatesInput = {
    AND?: CartaNatalScalarWhereWithAggregatesInput | CartaNatalScalarWhereWithAggregatesInput[]
    OR?: CartaNatalScalarWhereWithAggregatesInput[]
    NOT?: CartaNatalScalarWhereWithAggregatesInput | CartaNatalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CartaNatal"> | string
    userId?: StringWithAggregatesFilter<"CartaNatal"> | string
    tipo?: StringWithAggregatesFilter<"CartaNatal"> | string
    dataCompleta?: StringWithAggregatesFilter<"CartaNatal"> | string
    dataReducida?: StringWithAggregatesFilter<"CartaNatal"> | string
    fechaNacimiento?: DateTimeWithAggregatesFilter<"CartaNatal"> | Date | string
    lugarNacimiento?: StringWithAggregatesFilter<"CartaNatal"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CartaNatal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CartaNatal"> | Date | string
  }

  export type InterpretacionCacheWhereInput = {
    AND?: InterpretacionCacheWhereInput | InterpretacionCacheWhereInput[]
    OR?: InterpretacionCacheWhereInput[]
    NOT?: InterpretacionCacheWhereInput | InterpretacionCacheWhereInput[]
    id?: StringFilter<"InterpretacionCache"> | string
    userId?: StringFilter<"InterpretacionCache"> | string
    fechaNacimiento?: DateTimeFilter<"InterpretacionCache"> | Date | string
    lugarNacimiento?: StringFilter<"InterpretacionCache"> | string
    gender?: StringFilter<"InterpretacionCache"> | string
    tipo?: StringFilter<"InterpretacionCache"> | string
    interpretacionNarrativa?: StringFilter<"InterpretacionCache"> | string
    interpretacionesIndividuales?: StringFilter<"InterpretacionCache"> | string
    tiempoGeneracion?: FloatFilter<"InterpretacionCache"> | number
    createdAt?: DateTimeFilter<"InterpretacionCache"> | Date | string
    updatedAt?: DateTimeFilter<"InterpretacionCache"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type InterpretacionCacheOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fechaNacimiento?: SortOrder
    lugarNacimiento?: SortOrder
    gender?: SortOrder
    tipo?: SortOrder
    interpretacionNarrativa?: SortOrder
    interpretacionesIndividuales?: SortOrder
    tiempoGeneracion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type InterpretacionCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_fechaNacimiento_lugarNacimiento_gender_tipo?: InterpretacionCacheUserIdFechaNacimientoLugarNacimientoGenderTipoCompoundUniqueInput
    AND?: InterpretacionCacheWhereInput | InterpretacionCacheWhereInput[]
    OR?: InterpretacionCacheWhereInput[]
    NOT?: InterpretacionCacheWhereInput | InterpretacionCacheWhereInput[]
    userId?: StringFilter<"InterpretacionCache"> | string
    fechaNacimiento?: DateTimeFilter<"InterpretacionCache"> | Date | string
    lugarNacimiento?: StringFilter<"InterpretacionCache"> | string
    gender?: StringFilter<"InterpretacionCache"> | string
    tipo?: StringFilter<"InterpretacionCache"> | string
    interpretacionNarrativa?: StringFilter<"InterpretacionCache"> | string
    interpretacionesIndividuales?: StringFilter<"InterpretacionCache"> | string
    tiempoGeneracion?: FloatFilter<"InterpretacionCache"> | number
    createdAt?: DateTimeFilter<"InterpretacionCache"> | Date | string
    updatedAt?: DateTimeFilter<"InterpretacionCache"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_fechaNacimiento_lugarNacimiento_gender_tipo">

  export type InterpretacionCacheOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fechaNacimiento?: SortOrder
    lugarNacimiento?: SortOrder
    gender?: SortOrder
    tipo?: SortOrder
    interpretacionNarrativa?: SortOrder
    interpretacionesIndividuales?: SortOrder
    tiempoGeneracion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InterpretacionCacheCountOrderByAggregateInput
    _avg?: InterpretacionCacheAvgOrderByAggregateInput
    _max?: InterpretacionCacheMaxOrderByAggregateInput
    _min?: InterpretacionCacheMinOrderByAggregateInput
    _sum?: InterpretacionCacheSumOrderByAggregateInput
  }

  export type InterpretacionCacheScalarWhereWithAggregatesInput = {
    AND?: InterpretacionCacheScalarWhereWithAggregatesInput | InterpretacionCacheScalarWhereWithAggregatesInput[]
    OR?: InterpretacionCacheScalarWhereWithAggregatesInput[]
    NOT?: InterpretacionCacheScalarWhereWithAggregatesInput | InterpretacionCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InterpretacionCache"> | string
    userId?: StringWithAggregatesFilter<"InterpretacionCache"> | string
    fechaNacimiento?: DateTimeWithAggregatesFilter<"InterpretacionCache"> | Date | string
    lugarNacimiento?: StringWithAggregatesFilter<"InterpretacionCache"> | string
    gender?: StringWithAggregatesFilter<"InterpretacionCache"> | string
    tipo?: StringWithAggregatesFilter<"InterpretacionCache"> | string
    interpretacionNarrativa?: StringWithAggregatesFilter<"InterpretacionCache"> | string
    interpretacionesIndividuales?: StringWithAggregatesFilter<"InterpretacionCache"> | string
    tiempoGeneracion?: FloatWithAggregatesFilter<"InterpretacionCache"> | number
    createdAt?: DateTimeWithAggregatesFilter<"InterpretacionCache"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"InterpretacionCache"> | Date | string
  }

  export type AstrogematriaCacheWhereInput = {
    AND?: AstrogematriaCacheWhereInput | AstrogematriaCacheWhereInput[]
    OR?: AstrogematriaCacheWhereInput[]
    NOT?: AstrogematriaCacheWhereInput | AstrogematriaCacheWhereInput[]
    id?: StringFilter<"AstrogematriaCache"> | string
    palabra?: StringFilter<"AstrogematriaCache"> | string
    palabraProcesada?: StringFilter<"AstrogematriaCache"> | string
    valorTotal?: IntFilter<"AstrogematriaCache"> | number
    reduccionZodiacal?: IntFilter<"AstrogematriaCache"> | number
    signo?: StringFilter<"AstrogematriaCache"> | string
    grados?: IntFilter<"AstrogematriaCache"> | number
    posicionCompleta?: StringFilter<"AstrogematriaCache"> | string
    createdAt?: DateTimeFilter<"AstrogematriaCache"> | Date | string
    updatedAt?: DateTimeFilter<"AstrogematriaCache"> | Date | string
  }

  export type AstrogematriaCacheOrderByWithRelationInput = {
    id?: SortOrder
    palabra?: SortOrder
    palabraProcesada?: SortOrder
    valorTotal?: SortOrder
    reduccionZodiacal?: SortOrder
    signo?: SortOrder
    grados?: SortOrder
    posicionCompleta?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AstrogematriaCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    palabra?: string
    AND?: AstrogematriaCacheWhereInput | AstrogematriaCacheWhereInput[]
    OR?: AstrogematriaCacheWhereInput[]
    NOT?: AstrogematriaCacheWhereInput | AstrogematriaCacheWhereInput[]
    palabraProcesada?: StringFilter<"AstrogematriaCache"> | string
    valorTotal?: IntFilter<"AstrogematriaCache"> | number
    reduccionZodiacal?: IntFilter<"AstrogematriaCache"> | number
    signo?: StringFilter<"AstrogematriaCache"> | string
    grados?: IntFilter<"AstrogematriaCache"> | number
    posicionCompleta?: StringFilter<"AstrogematriaCache"> | string
    createdAt?: DateTimeFilter<"AstrogematriaCache"> | Date | string
    updatedAt?: DateTimeFilter<"AstrogematriaCache"> | Date | string
  }, "id" | "palabra">

  export type AstrogematriaCacheOrderByWithAggregationInput = {
    id?: SortOrder
    palabra?: SortOrder
    palabraProcesada?: SortOrder
    valorTotal?: SortOrder
    reduccionZodiacal?: SortOrder
    signo?: SortOrder
    grados?: SortOrder
    posicionCompleta?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AstrogematriaCacheCountOrderByAggregateInput
    _avg?: AstrogematriaCacheAvgOrderByAggregateInput
    _max?: AstrogematriaCacheMaxOrderByAggregateInput
    _min?: AstrogematriaCacheMinOrderByAggregateInput
    _sum?: AstrogematriaCacheSumOrderByAggregateInput
  }

  export type AstrogematriaCacheScalarWhereWithAggregatesInput = {
    AND?: AstrogematriaCacheScalarWhereWithAggregatesInput | AstrogematriaCacheScalarWhereWithAggregatesInput[]
    OR?: AstrogematriaCacheScalarWhereWithAggregatesInput[]
    NOT?: AstrogematriaCacheScalarWhereWithAggregatesInput | AstrogematriaCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AstrogematriaCache"> | string
    palabra?: StringWithAggregatesFilter<"AstrogematriaCache"> | string
    palabraProcesada?: StringWithAggregatesFilter<"AstrogematriaCache"> | string
    valorTotal?: IntWithAggregatesFilter<"AstrogematriaCache"> | number
    reduccionZodiacal?: IntWithAggregatesFilter<"AstrogematriaCache"> | number
    signo?: StringWithAggregatesFilter<"AstrogematriaCache"> | string
    grados?: IntWithAggregatesFilter<"AstrogematriaCache"> | number
    posicionCompleta?: StringWithAggregatesFilter<"AstrogematriaCache"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AstrogematriaCache"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AstrogematriaCache"> | Date | string
  }

  export type HorariaRequestWhereInput = {
    AND?: HorariaRequestWhereInput | HorariaRequestWhereInput[]
    OR?: HorariaRequestWhereInput[]
    NOT?: HorariaRequestWhereInput | HorariaRequestWhereInput[]
    id?: StringFilter<"HorariaRequest"> | string
    userId?: StringFilter<"HorariaRequest"> | string
    firstName?: StringFilter<"HorariaRequest"> | string
    lastName?: StringFilter<"HorariaRequest"> | string
    email?: StringFilter<"HorariaRequest"> | string
    country?: StringFilter<"HorariaRequest"> | string
    acceptSingleQuestion?: StringFilter<"HorariaRequest"> | string
    isFirstTime?: StringFilter<"HorariaRequest"> | string
    questionCategory?: StringFilter<"HorariaRequest"> | string
    question?: StringFilter<"HorariaRequest"> | string
    context?: StringNullableFilter<"HorariaRequest"> | string | null
    status?: StringFilter<"HorariaRequest"> | string
    response?: StringNullableFilter<"HorariaRequest"> | string | null
    responseDate?: DateTimeNullableFilter<"HorariaRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"HorariaRequest"> | Date | string
    updatedAt?: DateTimeFilter<"HorariaRequest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type HorariaRequestOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    country?: SortOrder
    acceptSingleQuestion?: SortOrder
    isFirstTime?: SortOrder
    questionCategory?: SortOrder
    question?: SortOrder
    context?: SortOrderInput | SortOrder
    status?: SortOrder
    response?: SortOrderInput | SortOrder
    responseDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type HorariaRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HorariaRequestWhereInput | HorariaRequestWhereInput[]
    OR?: HorariaRequestWhereInput[]
    NOT?: HorariaRequestWhereInput | HorariaRequestWhereInput[]
    userId?: StringFilter<"HorariaRequest"> | string
    firstName?: StringFilter<"HorariaRequest"> | string
    lastName?: StringFilter<"HorariaRequest"> | string
    email?: StringFilter<"HorariaRequest"> | string
    country?: StringFilter<"HorariaRequest"> | string
    acceptSingleQuestion?: StringFilter<"HorariaRequest"> | string
    isFirstTime?: StringFilter<"HorariaRequest"> | string
    questionCategory?: StringFilter<"HorariaRequest"> | string
    question?: StringFilter<"HorariaRequest"> | string
    context?: StringNullableFilter<"HorariaRequest"> | string | null
    status?: StringFilter<"HorariaRequest"> | string
    response?: StringNullableFilter<"HorariaRequest"> | string | null
    responseDate?: DateTimeNullableFilter<"HorariaRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"HorariaRequest"> | Date | string
    updatedAt?: DateTimeFilter<"HorariaRequest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type HorariaRequestOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    country?: SortOrder
    acceptSingleQuestion?: SortOrder
    isFirstTime?: SortOrder
    questionCategory?: SortOrder
    question?: SortOrder
    context?: SortOrderInput | SortOrder
    status?: SortOrder
    response?: SortOrderInput | SortOrder
    responseDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HorariaRequestCountOrderByAggregateInput
    _max?: HorariaRequestMaxOrderByAggregateInput
    _min?: HorariaRequestMinOrderByAggregateInput
  }

  export type HorariaRequestScalarWhereWithAggregatesInput = {
    AND?: HorariaRequestScalarWhereWithAggregatesInput | HorariaRequestScalarWhereWithAggregatesInput[]
    OR?: HorariaRequestScalarWhereWithAggregatesInput[]
    NOT?: HorariaRequestScalarWhereWithAggregatesInput | HorariaRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HorariaRequest"> | string
    userId?: StringWithAggregatesFilter<"HorariaRequest"> | string
    firstName?: StringWithAggregatesFilter<"HorariaRequest"> | string
    lastName?: StringWithAggregatesFilter<"HorariaRequest"> | string
    email?: StringWithAggregatesFilter<"HorariaRequest"> | string
    country?: StringWithAggregatesFilter<"HorariaRequest"> | string
    acceptSingleQuestion?: StringWithAggregatesFilter<"HorariaRequest"> | string
    isFirstTime?: StringWithAggregatesFilter<"HorariaRequest"> | string
    questionCategory?: StringWithAggregatesFilter<"HorariaRequest"> | string
    question?: StringWithAggregatesFilter<"HorariaRequest"> | string
    context?: StringNullableWithAggregatesFilter<"HorariaRequest"> | string | null
    status?: StringWithAggregatesFilter<"HorariaRequest"> | string
    response?: StringNullableWithAggregatesFilter<"HorariaRequest"> | string | null
    responseDate?: DateTimeNullableWithAggregatesFilter<"HorariaRequest"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"HorariaRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HorariaRequest"> | Date | string
  }

  export type PersonalCalendarCacheWhereInput = {
    AND?: PersonalCalendarCacheWhereInput | PersonalCalendarCacheWhereInput[]
    OR?: PersonalCalendarCacheWhereInput[]
    NOT?: PersonalCalendarCacheWhereInput | PersonalCalendarCacheWhereInput[]
    id?: StringFilter<"PersonalCalendarCache"> | string
    userId?: StringFilter<"PersonalCalendarCache"> | string
    year?: IntFilter<"PersonalCalendarCache"> | number
    events?: StringFilter<"PersonalCalendarCache"> | string
    calculatedAt?: DateTimeFilter<"PersonalCalendarCache"> | Date | string
    expiresAt?: DateTimeFilter<"PersonalCalendarCache"> | Date | string
    createdAt?: DateTimeFilter<"PersonalCalendarCache"> | Date | string
    updatedAt?: DateTimeFilter<"PersonalCalendarCache"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PersonalCalendarCacheOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    events?: SortOrder
    calculatedAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PersonalCalendarCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_year?: PersonalCalendarCacheUserIdYearCompoundUniqueInput
    AND?: PersonalCalendarCacheWhereInput | PersonalCalendarCacheWhereInput[]
    OR?: PersonalCalendarCacheWhereInput[]
    NOT?: PersonalCalendarCacheWhereInput | PersonalCalendarCacheWhereInput[]
    userId?: StringFilter<"PersonalCalendarCache"> | string
    year?: IntFilter<"PersonalCalendarCache"> | number
    events?: StringFilter<"PersonalCalendarCache"> | string
    calculatedAt?: DateTimeFilter<"PersonalCalendarCache"> | Date | string
    expiresAt?: DateTimeFilter<"PersonalCalendarCache"> | Date | string
    createdAt?: DateTimeFilter<"PersonalCalendarCache"> | Date | string
    updatedAt?: DateTimeFilter<"PersonalCalendarCache"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_year">

  export type PersonalCalendarCacheOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    events?: SortOrder
    calculatedAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PersonalCalendarCacheCountOrderByAggregateInput
    _avg?: PersonalCalendarCacheAvgOrderByAggregateInput
    _max?: PersonalCalendarCacheMaxOrderByAggregateInput
    _min?: PersonalCalendarCacheMinOrderByAggregateInput
    _sum?: PersonalCalendarCacheSumOrderByAggregateInput
  }

  export type PersonalCalendarCacheScalarWhereWithAggregatesInput = {
    AND?: PersonalCalendarCacheScalarWhereWithAggregatesInput | PersonalCalendarCacheScalarWhereWithAggregatesInput[]
    OR?: PersonalCalendarCacheScalarWhereWithAggregatesInput[]
    NOT?: PersonalCalendarCacheScalarWhereWithAggregatesInput | PersonalCalendarCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PersonalCalendarCache"> | string
    userId?: StringWithAggregatesFilter<"PersonalCalendarCache"> | string
    year?: IntWithAggregatesFilter<"PersonalCalendarCache"> | number
    events?: StringWithAggregatesFilter<"PersonalCalendarCache"> | string
    calculatedAt?: DateTimeWithAggregatesFilter<"PersonalCalendarCache"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"PersonalCalendarCache"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PersonalCalendarCache"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PersonalCalendarCache"> | Date | string
  }

  export type LunarPhasesCacheWhereInput = {
    AND?: LunarPhasesCacheWhereInput | LunarPhasesCacheWhereInput[]
    OR?: LunarPhasesCacheWhereInput[]
    NOT?: LunarPhasesCacheWhereInput | LunarPhasesCacheWhereInput[]
    id?: StringFilter<"LunarPhasesCache"> | string
    userId?: StringFilter<"LunarPhasesCache"> | string
    year?: IntFilter<"LunarPhasesCache"> | number
    events?: StringFilter<"LunarPhasesCache"> | string
    createdAt?: DateTimeFilter<"LunarPhasesCache"> | Date | string
    updatedAt?: DateTimeFilter<"LunarPhasesCache"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type LunarPhasesCacheOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    events?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type LunarPhasesCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_year?: LunarPhasesCacheUserIdYearCompoundUniqueInput
    AND?: LunarPhasesCacheWhereInput | LunarPhasesCacheWhereInput[]
    OR?: LunarPhasesCacheWhereInput[]
    NOT?: LunarPhasesCacheWhereInput | LunarPhasesCacheWhereInput[]
    userId?: StringFilter<"LunarPhasesCache"> | string
    year?: IntFilter<"LunarPhasesCache"> | number
    events?: StringFilter<"LunarPhasesCache"> | string
    createdAt?: DateTimeFilter<"LunarPhasesCache"> | Date | string
    updatedAt?: DateTimeFilter<"LunarPhasesCache"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_year">

  export type LunarPhasesCacheOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    events?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LunarPhasesCacheCountOrderByAggregateInput
    _avg?: LunarPhasesCacheAvgOrderByAggregateInput
    _max?: LunarPhasesCacheMaxOrderByAggregateInput
    _min?: LunarPhasesCacheMinOrderByAggregateInput
    _sum?: LunarPhasesCacheSumOrderByAggregateInput
  }

  export type LunarPhasesCacheScalarWhereWithAggregatesInput = {
    AND?: LunarPhasesCacheScalarWhereWithAggregatesInput | LunarPhasesCacheScalarWhereWithAggregatesInput[]
    OR?: LunarPhasesCacheScalarWhereWithAggregatesInput[]
    NOT?: LunarPhasesCacheScalarWhereWithAggregatesInput | LunarPhasesCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LunarPhasesCache"> | string
    userId?: StringWithAggregatesFilter<"LunarPhasesCache"> | string
    year?: IntWithAggregatesFilter<"LunarPhasesCache"> | number
    events?: StringWithAggregatesFilter<"LunarPhasesCache"> | string
    createdAt?: DateTimeWithAggregatesFilter<"LunarPhasesCache"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LunarPhasesCache"> | Date | string
  }

  export type LunarJournalWhereInput = {
    AND?: LunarJournalWhereInput | LunarJournalWhereInput[]
    OR?: LunarJournalWhereInput[]
    NOT?: LunarJournalWhereInput | LunarJournalWhereInput[]
    id?: StringFilter<"LunarJournal"> | string
    userId?: StringFilter<"LunarJournal"> | string
    date?: DateTimeFilter<"LunarJournal"> | Date | string
    eventType?: StringFilter<"LunarJournal"> | string
    notes?: StringFilter<"LunarJournal"> | string
    createdAt?: DateTimeFilter<"LunarJournal"> | Date | string
    updatedAt?: DateTimeFilter<"LunarJournal"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type LunarJournalOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    eventType?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type LunarJournalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LunarJournalWhereInput | LunarJournalWhereInput[]
    OR?: LunarJournalWhereInput[]
    NOT?: LunarJournalWhereInput | LunarJournalWhereInput[]
    userId?: StringFilter<"LunarJournal"> | string
    date?: DateTimeFilter<"LunarJournal"> | Date | string
    eventType?: StringFilter<"LunarJournal"> | string
    notes?: StringFilter<"LunarJournal"> | string
    createdAt?: DateTimeFilter<"LunarJournal"> | Date | string
    updatedAt?: DateTimeFilter<"LunarJournal"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type LunarJournalOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    eventType?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LunarJournalCountOrderByAggregateInput
    _max?: LunarJournalMaxOrderByAggregateInput
    _min?: LunarJournalMinOrderByAggregateInput
  }

  export type LunarJournalScalarWhereWithAggregatesInput = {
    AND?: LunarJournalScalarWhereWithAggregatesInput | LunarJournalScalarWhereWithAggregatesInput[]
    OR?: LunarJournalScalarWhereWithAggregatesInput[]
    NOT?: LunarJournalScalarWhereWithAggregatesInput | LunarJournalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LunarJournal"> | string
    userId?: StringWithAggregatesFilter<"LunarJournal"> | string
    date?: DateTimeWithAggregatesFilter<"LunarJournal"> | Date | string
    eventType?: StringWithAggregatesFilter<"LunarJournal"> | string
    notes?: StringWithAggregatesFilter<"LunarJournal"> | string
    createdAt?: DateTimeWithAggregatesFilter<"LunarJournal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LunarJournal"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
    rectificationEvents?: RectificationEventCreateNestedManyWithoutUserInput
    cartasNatales?: CartaNatalCreateNestedManyWithoutUserInput
    interpretaciones?: InterpretacionCacheCreateNestedManyWithoutUserInput
    horariaRequests?: HorariaRequestCreateNestedManyWithoutUserInput
    personalCalendarCache?: PersonalCalendarCacheCreateNestedManyWithoutUserInput
    lunarPhasesCache?: LunarPhasesCacheCreateNestedManyWithoutUserInput
    lunarJournal?: LunarJournalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
    rectificationEvents?: RectificationEventUncheckedCreateNestedManyWithoutUserInput
    cartasNatales?: CartaNatalUncheckedCreateNestedManyWithoutUserInput
    interpretaciones?: InterpretacionCacheUncheckedCreateNestedManyWithoutUserInput
    horariaRequests?: HorariaRequestUncheckedCreateNestedManyWithoutUserInput
    personalCalendarCache?: PersonalCalendarCacheUncheckedCreateNestedManyWithoutUserInput
    lunarPhasesCache?: LunarPhasesCacheUncheckedCreateNestedManyWithoutUserInput
    lunarJournal?: LunarJournalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rectificationEvents?: RectificationEventUpdateManyWithoutUserNestedInput
    cartasNatales?: CartaNatalUpdateManyWithoutUserNestedInput
    interpretaciones?: InterpretacionCacheUpdateManyWithoutUserNestedInput
    horariaRequests?: HorariaRequestUpdateManyWithoutUserNestedInput
    personalCalendarCache?: PersonalCalendarCacheUpdateManyWithoutUserNestedInput
    lunarPhasesCache?: LunarPhasesCacheUpdateManyWithoutUserNestedInput
    lunarJournal?: LunarJournalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rectificationEvents?: RectificationEventUncheckedUpdateManyWithoutUserNestedInput
    cartasNatales?: CartaNatalUncheckedUpdateManyWithoutUserNestedInput
    interpretaciones?: InterpretacionCacheUncheckedUpdateManyWithoutUserNestedInput
    horariaRequests?: HorariaRequestUncheckedUpdateManyWithoutUserNestedInput
    personalCalendarCache?: PersonalCalendarCacheUncheckedUpdateManyWithoutUserNestedInput
    lunarPhasesCache?: LunarPhasesCacheUncheckedUpdateManyWithoutUserNestedInput
    lunarJournal?: LunarJournalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RectificationEventCreateInput = {
    id?: string
    eventType: string
    description: string
    eventDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRectificationEventsInput
  }

  export type RectificationEventUncheckedCreateInput = {
    id?: string
    userId: string
    eventType: string
    description: string
    eventDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RectificationEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRectificationEventsNestedInput
  }

  export type RectificationEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RectificationEventCreateManyInput = {
    id?: string
    userId: string
    eventType: string
    description: string
    eventDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RectificationEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RectificationEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartaNatalCreateInput = {
    id?: string
    tipo: string
    dataCompleta: string
    dataReducida: string
    fechaNacimiento: Date | string
    lugarNacimiento: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCartasNatalesInput
  }

  export type CartaNatalUncheckedCreateInput = {
    id?: string
    userId: string
    tipo: string
    dataCompleta: string
    dataReducida: string
    fechaNacimiento: Date | string
    lugarNacimiento: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartaNatalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    dataCompleta?: StringFieldUpdateOperationsInput | string
    dataReducida?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    lugarNacimiento?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCartasNatalesNestedInput
  }

  export type CartaNatalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    dataCompleta?: StringFieldUpdateOperationsInput | string
    dataReducida?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    lugarNacimiento?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartaNatalCreateManyInput = {
    id?: string
    userId: string
    tipo: string
    dataCompleta: string
    dataReducida: string
    fechaNacimiento: Date | string
    lugarNacimiento: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartaNatalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    dataCompleta?: StringFieldUpdateOperationsInput | string
    dataReducida?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    lugarNacimiento?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartaNatalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    dataCompleta?: StringFieldUpdateOperationsInput | string
    dataReducida?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    lugarNacimiento?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterpretacionCacheCreateInput = {
    id?: string
    fechaNacimiento: Date | string
    lugarNacimiento: string
    gender: string
    tipo: string
    interpretacionNarrativa: string
    interpretacionesIndividuales: string
    tiempoGeneracion: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInterpretacionesInput
  }

  export type InterpretacionCacheUncheckedCreateInput = {
    id?: string
    userId: string
    fechaNacimiento: Date | string
    lugarNacimiento: string
    gender: string
    tipo: string
    interpretacionNarrativa: string
    interpretacionesIndividuales: string
    tiempoGeneracion: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterpretacionCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    lugarNacimiento?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    interpretacionNarrativa?: StringFieldUpdateOperationsInput | string
    interpretacionesIndividuales?: StringFieldUpdateOperationsInput | string
    tiempoGeneracion?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInterpretacionesNestedInput
  }

  export type InterpretacionCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    lugarNacimiento?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    interpretacionNarrativa?: StringFieldUpdateOperationsInput | string
    interpretacionesIndividuales?: StringFieldUpdateOperationsInput | string
    tiempoGeneracion?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterpretacionCacheCreateManyInput = {
    id?: string
    userId: string
    fechaNacimiento: Date | string
    lugarNacimiento: string
    gender: string
    tipo: string
    interpretacionNarrativa: string
    interpretacionesIndividuales: string
    tiempoGeneracion: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterpretacionCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    lugarNacimiento?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    interpretacionNarrativa?: StringFieldUpdateOperationsInput | string
    interpretacionesIndividuales?: StringFieldUpdateOperationsInput | string
    tiempoGeneracion?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterpretacionCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    lugarNacimiento?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    interpretacionNarrativa?: StringFieldUpdateOperationsInput | string
    interpretacionesIndividuales?: StringFieldUpdateOperationsInput | string
    tiempoGeneracion?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AstrogematriaCacheCreateInput = {
    id?: string
    palabra: string
    palabraProcesada: string
    valorTotal: number
    reduccionZodiacal: number
    signo: string
    grados: number
    posicionCompleta: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AstrogematriaCacheUncheckedCreateInput = {
    id?: string
    palabra: string
    palabraProcesada: string
    valorTotal: number
    reduccionZodiacal: number
    signo: string
    grados: number
    posicionCompleta: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AstrogematriaCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    palabra?: StringFieldUpdateOperationsInput | string
    palabraProcesada?: StringFieldUpdateOperationsInput | string
    valorTotal?: IntFieldUpdateOperationsInput | number
    reduccionZodiacal?: IntFieldUpdateOperationsInput | number
    signo?: StringFieldUpdateOperationsInput | string
    grados?: IntFieldUpdateOperationsInput | number
    posicionCompleta?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AstrogematriaCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    palabra?: StringFieldUpdateOperationsInput | string
    palabraProcesada?: StringFieldUpdateOperationsInput | string
    valorTotal?: IntFieldUpdateOperationsInput | number
    reduccionZodiacal?: IntFieldUpdateOperationsInput | number
    signo?: StringFieldUpdateOperationsInput | string
    grados?: IntFieldUpdateOperationsInput | number
    posicionCompleta?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AstrogematriaCacheCreateManyInput = {
    id?: string
    palabra: string
    palabraProcesada: string
    valorTotal: number
    reduccionZodiacal: number
    signo: string
    grados: number
    posicionCompleta: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AstrogematriaCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    palabra?: StringFieldUpdateOperationsInput | string
    palabraProcesada?: StringFieldUpdateOperationsInput | string
    valorTotal?: IntFieldUpdateOperationsInput | number
    reduccionZodiacal?: IntFieldUpdateOperationsInput | number
    signo?: StringFieldUpdateOperationsInput | string
    grados?: IntFieldUpdateOperationsInput | number
    posicionCompleta?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AstrogematriaCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    palabra?: StringFieldUpdateOperationsInput | string
    palabraProcesada?: StringFieldUpdateOperationsInput | string
    valorTotal?: IntFieldUpdateOperationsInput | number
    reduccionZodiacal?: IntFieldUpdateOperationsInput | number
    signo?: StringFieldUpdateOperationsInput | string
    grados?: IntFieldUpdateOperationsInput | number
    posicionCompleta?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HorariaRequestCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    country: string
    acceptSingleQuestion: string
    isFirstTime: string
    questionCategory: string
    question: string
    context?: string | null
    status?: string
    response?: string | null
    responseDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutHorariaRequestsInput
  }

  export type HorariaRequestUncheckedCreateInput = {
    id?: string
    userId: string
    firstName: string
    lastName: string
    email: string
    country: string
    acceptSingleQuestion: string
    isFirstTime: string
    questionCategory: string
    question: string
    context?: string | null
    status?: string
    response?: string | null
    responseDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HorariaRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    acceptSingleQuestion?: StringFieldUpdateOperationsInput | string
    isFirstTime?: StringFieldUpdateOperationsInput | string
    questionCategory?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    responseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutHorariaRequestsNestedInput
  }

  export type HorariaRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    acceptSingleQuestion?: StringFieldUpdateOperationsInput | string
    isFirstTime?: StringFieldUpdateOperationsInput | string
    questionCategory?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    responseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HorariaRequestCreateManyInput = {
    id?: string
    userId: string
    firstName: string
    lastName: string
    email: string
    country: string
    acceptSingleQuestion: string
    isFirstTime: string
    questionCategory: string
    question: string
    context?: string | null
    status?: string
    response?: string | null
    responseDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HorariaRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    acceptSingleQuestion?: StringFieldUpdateOperationsInput | string
    isFirstTime?: StringFieldUpdateOperationsInput | string
    questionCategory?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    responseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HorariaRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    acceptSingleQuestion?: StringFieldUpdateOperationsInput | string
    isFirstTime?: StringFieldUpdateOperationsInput | string
    questionCategory?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    responseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalCalendarCacheCreateInput = {
    id?: string
    year: number
    events: string
    calculatedAt: Date | string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPersonalCalendarCacheInput
  }

  export type PersonalCalendarCacheUncheckedCreateInput = {
    id?: string
    userId: string
    year: number
    events: string
    calculatedAt: Date | string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonalCalendarCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    events?: StringFieldUpdateOperationsInput | string
    calculatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPersonalCalendarCacheNestedInput
  }

  export type PersonalCalendarCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    events?: StringFieldUpdateOperationsInput | string
    calculatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalCalendarCacheCreateManyInput = {
    id?: string
    userId: string
    year: number
    events: string
    calculatedAt: Date | string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonalCalendarCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    events?: StringFieldUpdateOperationsInput | string
    calculatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalCalendarCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    events?: StringFieldUpdateOperationsInput | string
    calculatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LunarPhasesCacheCreateInput = {
    id?: string
    year: number
    events: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutLunarPhasesCacheInput
  }

  export type LunarPhasesCacheUncheckedCreateInput = {
    id?: string
    userId: string
    year: number
    events: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LunarPhasesCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    events?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLunarPhasesCacheNestedInput
  }

  export type LunarPhasesCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    events?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LunarPhasesCacheCreateManyInput = {
    id?: string
    userId: string
    year: number
    events: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LunarPhasesCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    events?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LunarPhasesCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    events?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LunarJournalCreateInput = {
    id?: string
    date: Date | string
    eventType: string
    notes: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutLunarJournalInput
  }

  export type LunarJournalUncheckedCreateInput = {
    id?: string
    userId: string
    date: Date | string
    eventType: string
    notes: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LunarJournalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLunarJournalNestedInput
  }

  export type LunarJournalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LunarJournalCreateManyInput = {
    id?: string
    userId: string
    date: Date | string
    eventType: string
    notes: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LunarJournalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LunarJournalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type RectificationEventListRelationFilter = {
    every?: RectificationEventWhereInput
    some?: RectificationEventWhereInput
    none?: RectificationEventWhereInput
  }

  export type CartaNatalListRelationFilter = {
    every?: CartaNatalWhereInput
    some?: CartaNatalWhereInput
    none?: CartaNatalWhereInput
  }

  export type InterpretacionCacheListRelationFilter = {
    every?: InterpretacionCacheWhereInput
    some?: InterpretacionCacheWhereInput
    none?: InterpretacionCacheWhereInput
  }

  export type HorariaRequestListRelationFilter = {
    every?: HorariaRequestWhereInput
    some?: HorariaRequestWhereInput
    none?: HorariaRequestWhereInput
  }

  export type PersonalCalendarCacheListRelationFilter = {
    every?: PersonalCalendarCacheWhereInput
    some?: PersonalCalendarCacheWhereInput
    none?: PersonalCalendarCacheWhereInput
  }

  export type LunarPhasesCacheListRelationFilter = {
    every?: LunarPhasesCacheWhereInput
    some?: LunarPhasesCacheWhereInput
    none?: LunarPhasesCacheWhereInput
  }

  export type LunarJournalListRelationFilter = {
    every?: LunarJournalWhereInput
    some?: LunarJournalWhereInput
    none?: LunarJournalWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RectificationEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CartaNatalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InterpretacionCacheOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HorariaRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PersonalCalendarCacheOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LunarPhasesCacheOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LunarJournalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    password?: SortOrder
    emailVerified?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    birthDate?: SortOrder
    birthCity?: SortOrder
    birthCountry?: SortOrder
    birthHour?: SortOrder
    birthMinute?: SortOrder
    knowsBirthTime?: SortOrder
    gender?: SortOrder
    residenceCity?: SortOrder
    residenceCountry?: SortOrder
    timezone?: SortOrder
    rectificationRequested?: SortOrder
    rectificationAcceptedUncertainty?: SortOrder
    rectificationStatus?: SortOrder
    rectificationRequestDate?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionExpiresAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    birthHour?: SortOrder
    birthMinute?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    password?: SortOrder
    emailVerified?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    birthDate?: SortOrder
    birthCity?: SortOrder
    birthCountry?: SortOrder
    birthHour?: SortOrder
    birthMinute?: SortOrder
    knowsBirthTime?: SortOrder
    gender?: SortOrder
    residenceCity?: SortOrder
    residenceCountry?: SortOrder
    timezone?: SortOrder
    rectificationRequested?: SortOrder
    rectificationAcceptedUncertainty?: SortOrder
    rectificationStatus?: SortOrder
    rectificationRequestDate?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionExpiresAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    password?: SortOrder
    emailVerified?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    birthDate?: SortOrder
    birthCity?: SortOrder
    birthCountry?: SortOrder
    birthHour?: SortOrder
    birthMinute?: SortOrder
    knowsBirthTime?: SortOrder
    gender?: SortOrder
    residenceCity?: SortOrder
    residenceCountry?: SortOrder
    timezone?: SortOrder
    rectificationRequested?: SortOrder
    rectificationAcceptedUncertainty?: SortOrder
    rectificationStatus?: SortOrder
    rectificationRequestDate?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionExpiresAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    birthHour?: SortOrder
    birthMinute?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RectificationEventCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventType?: SortOrder
    description?: SortOrder
    eventDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RectificationEventMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventType?: SortOrder
    description?: SortOrder
    eventDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RectificationEventMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventType?: SortOrder
    description?: SortOrder
    eventDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartaNatalUserIdTipoFechaNacimientoLugarNacimientoCompoundUniqueInput = {
    userId: string
    tipo: string
    fechaNacimiento: Date | string
    lugarNacimiento: string
  }

  export type CartaNatalCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tipo?: SortOrder
    dataCompleta?: SortOrder
    dataReducida?: SortOrder
    fechaNacimiento?: SortOrder
    lugarNacimiento?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartaNatalMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tipo?: SortOrder
    dataCompleta?: SortOrder
    dataReducida?: SortOrder
    fechaNacimiento?: SortOrder
    lugarNacimiento?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartaNatalMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tipo?: SortOrder
    dataCompleta?: SortOrder
    dataReducida?: SortOrder
    fechaNacimiento?: SortOrder
    lugarNacimiento?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type InterpretacionCacheUserIdFechaNacimientoLugarNacimientoGenderTipoCompoundUniqueInput = {
    userId: string
    fechaNacimiento: Date | string
    lugarNacimiento: string
    gender: string
    tipo: string
  }

  export type InterpretacionCacheCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fechaNacimiento?: SortOrder
    lugarNacimiento?: SortOrder
    gender?: SortOrder
    tipo?: SortOrder
    interpretacionNarrativa?: SortOrder
    interpretacionesIndividuales?: SortOrder
    tiempoGeneracion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InterpretacionCacheAvgOrderByAggregateInput = {
    tiempoGeneracion?: SortOrder
  }

  export type InterpretacionCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fechaNacimiento?: SortOrder
    lugarNacimiento?: SortOrder
    gender?: SortOrder
    tipo?: SortOrder
    interpretacionNarrativa?: SortOrder
    interpretacionesIndividuales?: SortOrder
    tiempoGeneracion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InterpretacionCacheMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fechaNacimiento?: SortOrder
    lugarNacimiento?: SortOrder
    gender?: SortOrder
    tipo?: SortOrder
    interpretacionNarrativa?: SortOrder
    interpretacionesIndividuales?: SortOrder
    tiempoGeneracion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InterpretacionCacheSumOrderByAggregateInput = {
    tiempoGeneracion?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type AstrogematriaCacheCountOrderByAggregateInput = {
    id?: SortOrder
    palabra?: SortOrder
    palabraProcesada?: SortOrder
    valorTotal?: SortOrder
    reduccionZodiacal?: SortOrder
    signo?: SortOrder
    grados?: SortOrder
    posicionCompleta?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AstrogematriaCacheAvgOrderByAggregateInput = {
    valorTotal?: SortOrder
    reduccionZodiacal?: SortOrder
    grados?: SortOrder
  }

  export type AstrogematriaCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    palabra?: SortOrder
    palabraProcesada?: SortOrder
    valorTotal?: SortOrder
    reduccionZodiacal?: SortOrder
    signo?: SortOrder
    grados?: SortOrder
    posicionCompleta?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AstrogematriaCacheMinOrderByAggregateInput = {
    id?: SortOrder
    palabra?: SortOrder
    palabraProcesada?: SortOrder
    valorTotal?: SortOrder
    reduccionZodiacal?: SortOrder
    signo?: SortOrder
    grados?: SortOrder
    posicionCompleta?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AstrogematriaCacheSumOrderByAggregateInput = {
    valorTotal?: SortOrder
    reduccionZodiacal?: SortOrder
    grados?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type HorariaRequestCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    country?: SortOrder
    acceptSingleQuestion?: SortOrder
    isFirstTime?: SortOrder
    questionCategory?: SortOrder
    question?: SortOrder
    context?: SortOrder
    status?: SortOrder
    response?: SortOrder
    responseDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HorariaRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    country?: SortOrder
    acceptSingleQuestion?: SortOrder
    isFirstTime?: SortOrder
    questionCategory?: SortOrder
    question?: SortOrder
    context?: SortOrder
    status?: SortOrder
    response?: SortOrder
    responseDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HorariaRequestMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    country?: SortOrder
    acceptSingleQuestion?: SortOrder
    isFirstTime?: SortOrder
    questionCategory?: SortOrder
    question?: SortOrder
    context?: SortOrder
    status?: SortOrder
    response?: SortOrder
    responseDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonalCalendarCacheUserIdYearCompoundUniqueInput = {
    userId: string
    year: number
  }

  export type PersonalCalendarCacheCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    events?: SortOrder
    calculatedAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonalCalendarCacheAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type PersonalCalendarCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    events?: SortOrder
    calculatedAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonalCalendarCacheMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    events?: SortOrder
    calculatedAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonalCalendarCacheSumOrderByAggregateInput = {
    year?: SortOrder
  }

  export type LunarPhasesCacheUserIdYearCompoundUniqueInput = {
    userId: string
    year: number
  }

  export type LunarPhasesCacheCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    events?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LunarPhasesCacheAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type LunarPhasesCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    events?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LunarPhasesCacheMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    events?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LunarPhasesCacheSumOrderByAggregateInput = {
    year?: SortOrder
  }

  export type LunarJournalCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    eventType?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LunarJournalMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    eventType?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LunarJournalMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    eventType?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RectificationEventCreateNestedManyWithoutUserInput = {
    create?: XOR<RectificationEventCreateWithoutUserInput, RectificationEventUncheckedCreateWithoutUserInput> | RectificationEventCreateWithoutUserInput[] | RectificationEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RectificationEventCreateOrConnectWithoutUserInput | RectificationEventCreateOrConnectWithoutUserInput[]
    createMany?: RectificationEventCreateManyUserInputEnvelope
    connect?: RectificationEventWhereUniqueInput | RectificationEventWhereUniqueInput[]
  }

  export type CartaNatalCreateNestedManyWithoutUserInput = {
    create?: XOR<CartaNatalCreateWithoutUserInput, CartaNatalUncheckedCreateWithoutUserInput> | CartaNatalCreateWithoutUserInput[] | CartaNatalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CartaNatalCreateOrConnectWithoutUserInput | CartaNatalCreateOrConnectWithoutUserInput[]
    createMany?: CartaNatalCreateManyUserInputEnvelope
    connect?: CartaNatalWhereUniqueInput | CartaNatalWhereUniqueInput[]
  }

  export type InterpretacionCacheCreateNestedManyWithoutUserInput = {
    create?: XOR<InterpretacionCacheCreateWithoutUserInput, InterpretacionCacheUncheckedCreateWithoutUserInput> | InterpretacionCacheCreateWithoutUserInput[] | InterpretacionCacheUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterpretacionCacheCreateOrConnectWithoutUserInput | InterpretacionCacheCreateOrConnectWithoutUserInput[]
    createMany?: InterpretacionCacheCreateManyUserInputEnvelope
    connect?: InterpretacionCacheWhereUniqueInput | InterpretacionCacheWhereUniqueInput[]
  }

  export type HorariaRequestCreateNestedManyWithoutUserInput = {
    create?: XOR<HorariaRequestCreateWithoutUserInput, HorariaRequestUncheckedCreateWithoutUserInput> | HorariaRequestCreateWithoutUserInput[] | HorariaRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HorariaRequestCreateOrConnectWithoutUserInput | HorariaRequestCreateOrConnectWithoutUserInput[]
    createMany?: HorariaRequestCreateManyUserInputEnvelope
    connect?: HorariaRequestWhereUniqueInput | HorariaRequestWhereUniqueInput[]
  }

  export type PersonalCalendarCacheCreateNestedManyWithoutUserInput = {
    create?: XOR<PersonalCalendarCacheCreateWithoutUserInput, PersonalCalendarCacheUncheckedCreateWithoutUserInput> | PersonalCalendarCacheCreateWithoutUserInput[] | PersonalCalendarCacheUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PersonalCalendarCacheCreateOrConnectWithoutUserInput | PersonalCalendarCacheCreateOrConnectWithoutUserInput[]
    createMany?: PersonalCalendarCacheCreateManyUserInputEnvelope
    connect?: PersonalCalendarCacheWhereUniqueInput | PersonalCalendarCacheWhereUniqueInput[]
  }

  export type LunarPhasesCacheCreateNestedManyWithoutUserInput = {
    create?: XOR<LunarPhasesCacheCreateWithoutUserInput, LunarPhasesCacheUncheckedCreateWithoutUserInput> | LunarPhasesCacheCreateWithoutUserInput[] | LunarPhasesCacheUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LunarPhasesCacheCreateOrConnectWithoutUserInput | LunarPhasesCacheCreateOrConnectWithoutUserInput[]
    createMany?: LunarPhasesCacheCreateManyUserInputEnvelope
    connect?: LunarPhasesCacheWhereUniqueInput | LunarPhasesCacheWhereUniqueInput[]
  }

  export type LunarJournalCreateNestedManyWithoutUserInput = {
    create?: XOR<LunarJournalCreateWithoutUserInput, LunarJournalUncheckedCreateWithoutUserInput> | LunarJournalCreateWithoutUserInput[] | LunarJournalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LunarJournalCreateOrConnectWithoutUserInput | LunarJournalCreateOrConnectWithoutUserInput[]
    createMany?: LunarJournalCreateManyUserInputEnvelope
    connect?: LunarJournalWhereUniqueInput | LunarJournalWhereUniqueInput[]
  }

  export type RectificationEventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RectificationEventCreateWithoutUserInput, RectificationEventUncheckedCreateWithoutUserInput> | RectificationEventCreateWithoutUserInput[] | RectificationEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RectificationEventCreateOrConnectWithoutUserInput | RectificationEventCreateOrConnectWithoutUserInput[]
    createMany?: RectificationEventCreateManyUserInputEnvelope
    connect?: RectificationEventWhereUniqueInput | RectificationEventWhereUniqueInput[]
  }

  export type CartaNatalUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CartaNatalCreateWithoutUserInput, CartaNatalUncheckedCreateWithoutUserInput> | CartaNatalCreateWithoutUserInput[] | CartaNatalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CartaNatalCreateOrConnectWithoutUserInput | CartaNatalCreateOrConnectWithoutUserInput[]
    createMany?: CartaNatalCreateManyUserInputEnvelope
    connect?: CartaNatalWhereUniqueInput | CartaNatalWhereUniqueInput[]
  }

  export type InterpretacionCacheUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<InterpretacionCacheCreateWithoutUserInput, InterpretacionCacheUncheckedCreateWithoutUserInput> | InterpretacionCacheCreateWithoutUserInput[] | InterpretacionCacheUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterpretacionCacheCreateOrConnectWithoutUserInput | InterpretacionCacheCreateOrConnectWithoutUserInput[]
    createMany?: InterpretacionCacheCreateManyUserInputEnvelope
    connect?: InterpretacionCacheWhereUniqueInput | InterpretacionCacheWhereUniqueInput[]
  }

  export type HorariaRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<HorariaRequestCreateWithoutUserInput, HorariaRequestUncheckedCreateWithoutUserInput> | HorariaRequestCreateWithoutUserInput[] | HorariaRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HorariaRequestCreateOrConnectWithoutUserInput | HorariaRequestCreateOrConnectWithoutUserInput[]
    createMany?: HorariaRequestCreateManyUserInputEnvelope
    connect?: HorariaRequestWhereUniqueInput | HorariaRequestWhereUniqueInput[]
  }

  export type PersonalCalendarCacheUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PersonalCalendarCacheCreateWithoutUserInput, PersonalCalendarCacheUncheckedCreateWithoutUserInput> | PersonalCalendarCacheCreateWithoutUserInput[] | PersonalCalendarCacheUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PersonalCalendarCacheCreateOrConnectWithoutUserInput | PersonalCalendarCacheCreateOrConnectWithoutUserInput[]
    createMany?: PersonalCalendarCacheCreateManyUserInputEnvelope
    connect?: PersonalCalendarCacheWhereUniqueInput | PersonalCalendarCacheWhereUniqueInput[]
  }

  export type LunarPhasesCacheUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LunarPhasesCacheCreateWithoutUserInput, LunarPhasesCacheUncheckedCreateWithoutUserInput> | LunarPhasesCacheCreateWithoutUserInput[] | LunarPhasesCacheUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LunarPhasesCacheCreateOrConnectWithoutUserInput | LunarPhasesCacheCreateOrConnectWithoutUserInput[]
    createMany?: LunarPhasesCacheCreateManyUserInputEnvelope
    connect?: LunarPhasesCacheWhereUniqueInput | LunarPhasesCacheWhereUniqueInput[]
  }

  export type LunarJournalUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LunarJournalCreateWithoutUserInput, LunarJournalUncheckedCreateWithoutUserInput> | LunarJournalCreateWithoutUserInput[] | LunarJournalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LunarJournalCreateOrConnectWithoutUserInput | LunarJournalCreateOrConnectWithoutUserInput[]
    createMany?: LunarJournalCreateManyUserInputEnvelope
    connect?: LunarJournalWhereUniqueInput | LunarJournalWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RectificationEventUpdateManyWithoutUserNestedInput = {
    create?: XOR<RectificationEventCreateWithoutUserInput, RectificationEventUncheckedCreateWithoutUserInput> | RectificationEventCreateWithoutUserInput[] | RectificationEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RectificationEventCreateOrConnectWithoutUserInput | RectificationEventCreateOrConnectWithoutUserInput[]
    upsert?: RectificationEventUpsertWithWhereUniqueWithoutUserInput | RectificationEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RectificationEventCreateManyUserInputEnvelope
    set?: RectificationEventWhereUniqueInput | RectificationEventWhereUniqueInput[]
    disconnect?: RectificationEventWhereUniqueInput | RectificationEventWhereUniqueInput[]
    delete?: RectificationEventWhereUniqueInput | RectificationEventWhereUniqueInput[]
    connect?: RectificationEventWhereUniqueInput | RectificationEventWhereUniqueInput[]
    update?: RectificationEventUpdateWithWhereUniqueWithoutUserInput | RectificationEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RectificationEventUpdateManyWithWhereWithoutUserInput | RectificationEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RectificationEventScalarWhereInput | RectificationEventScalarWhereInput[]
  }

  export type CartaNatalUpdateManyWithoutUserNestedInput = {
    create?: XOR<CartaNatalCreateWithoutUserInput, CartaNatalUncheckedCreateWithoutUserInput> | CartaNatalCreateWithoutUserInput[] | CartaNatalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CartaNatalCreateOrConnectWithoutUserInput | CartaNatalCreateOrConnectWithoutUserInput[]
    upsert?: CartaNatalUpsertWithWhereUniqueWithoutUserInput | CartaNatalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CartaNatalCreateManyUserInputEnvelope
    set?: CartaNatalWhereUniqueInput | CartaNatalWhereUniqueInput[]
    disconnect?: CartaNatalWhereUniqueInput | CartaNatalWhereUniqueInput[]
    delete?: CartaNatalWhereUniqueInput | CartaNatalWhereUniqueInput[]
    connect?: CartaNatalWhereUniqueInput | CartaNatalWhereUniqueInput[]
    update?: CartaNatalUpdateWithWhereUniqueWithoutUserInput | CartaNatalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CartaNatalUpdateManyWithWhereWithoutUserInput | CartaNatalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CartaNatalScalarWhereInput | CartaNatalScalarWhereInput[]
  }

  export type InterpretacionCacheUpdateManyWithoutUserNestedInput = {
    create?: XOR<InterpretacionCacheCreateWithoutUserInput, InterpretacionCacheUncheckedCreateWithoutUserInput> | InterpretacionCacheCreateWithoutUserInput[] | InterpretacionCacheUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterpretacionCacheCreateOrConnectWithoutUserInput | InterpretacionCacheCreateOrConnectWithoutUserInput[]
    upsert?: InterpretacionCacheUpsertWithWhereUniqueWithoutUserInput | InterpretacionCacheUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InterpretacionCacheCreateManyUserInputEnvelope
    set?: InterpretacionCacheWhereUniqueInput | InterpretacionCacheWhereUniqueInput[]
    disconnect?: InterpretacionCacheWhereUniqueInput | InterpretacionCacheWhereUniqueInput[]
    delete?: InterpretacionCacheWhereUniqueInput | InterpretacionCacheWhereUniqueInput[]
    connect?: InterpretacionCacheWhereUniqueInput | InterpretacionCacheWhereUniqueInput[]
    update?: InterpretacionCacheUpdateWithWhereUniqueWithoutUserInput | InterpretacionCacheUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InterpretacionCacheUpdateManyWithWhereWithoutUserInput | InterpretacionCacheUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InterpretacionCacheScalarWhereInput | InterpretacionCacheScalarWhereInput[]
  }

  export type HorariaRequestUpdateManyWithoutUserNestedInput = {
    create?: XOR<HorariaRequestCreateWithoutUserInput, HorariaRequestUncheckedCreateWithoutUserInput> | HorariaRequestCreateWithoutUserInput[] | HorariaRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HorariaRequestCreateOrConnectWithoutUserInput | HorariaRequestCreateOrConnectWithoutUserInput[]
    upsert?: HorariaRequestUpsertWithWhereUniqueWithoutUserInput | HorariaRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HorariaRequestCreateManyUserInputEnvelope
    set?: HorariaRequestWhereUniqueInput | HorariaRequestWhereUniqueInput[]
    disconnect?: HorariaRequestWhereUniqueInput | HorariaRequestWhereUniqueInput[]
    delete?: HorariaRequestWhereUniqueInput | HorariaRequestWhereUniqueInput[]
    connect?: HorariaRequestWhereUniqueInput | HorariaRequestWhereUniqueInput[]
    update?: HorariaRequestUpdateWithWhereUniqueWithoutUserInput | HorariaRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HorariaRequestUpdateManyWithWhereWithoutUserInput | HorariaRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HorariaRequestScalarWhereInput | HorariaRequestScalarWhereInput[]
  }

  export type PersonalCalendarCacheUpdateManyWithoutUserNestedInput = {
    create?: XOR<PersonalCalendarCacheCreateWithoutUserInput, PersonalCalendarCacheUncheckedCreateWithoutUserInput> | PersonalCalendarCacheCreateWithoutUserInput[] | PersonalCalendarCacheUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PersonalCalendarCacheCreateOrConnectWithoutUserInput | PersonalCalendarCacheCreateOrConnectWithoutUserInput[]
    upsert?: PersonalCalendarCacheUpsertWithWhereUniqueWithoutUserInput | PersonalCalendarCacheUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PersonalCalendarCacheCreateManyUserInputEnvelope
    set?: PersonalCalendarCacheWhereUniqueInput | PersonalCalendarCacheWhereUniqueInput[]
    disconnect?: PersonalCalendarCacheWhereUniqueInput | PersonalCalendarCacheWhereUniqueInput[]
    delete?: PersonalCalendarCacheWhereUniqueInput | PersonalCalendarCacheWhereUniqueInput[]
    connect?: PersonalCalendarCacheWhereUniqueInput | PersonalCalendarCacheWhereUniqueInput[]
    update?: PersonalCalendarCacheUpdateWithWhereUniqueWithoutUserInput | PersonalCalendarCacheUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PersonalCalendarCacheUpdateManyWithWhereWithoutUserInput | PersonalCalendarCacheUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PersonalCalendarCacheScalarWhereInput | PersonalCalendarCacheScalarWhereInput[]
  }

  export type LunarPhasesCacheUpdateManyWithoutUserNestedInput = {
    create?: XOR<LunarPhasesCacheCreateWithoutUserInput, LunarPhasesCacheUncheckedCreateWithoutUserInput> | LunarPhasesCacheCreateWithoutUserInput[] | LunarPhasesCacheUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LunarPhasesCacheCreateOrConnectWithoutUserInput | LunarPhasesCacheCreateOrConnectWithoutUserInput[]
    upsert?: LunarPhasesCacheUpsertWithWhereUniqueWithoutUserInput | LunarPhasesCacheUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LunarPhasesCacheCreateManyUserInputEnvelope
    set?: LunarPhasesCacheWhereUniqueInput | LunarPhasesCacheWhereUniqueInput[]
    disconnect?: LunarPhasesCacheWhereUniqueInput | LunarPhasesCacheWhereUniqueInput[]
    delete?: LunarPhasesCacheWhereUniqueInput | LunarPhasesCacheWhereUniqueInput[]
    connect?: LunarPhasesCacheWhereUniqueInput | LunarPhasesCacheWhereUniqueInput[]
    update?: LunarPhasesCacheUpdateWithWhereUniqueWithoutUserInput | LunarPhasesCacheUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LunarPhasesCacheUpdateManyWithWhereWithoutUserInput | LunarPhasesCacheUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LunarPhasesCacheScalarWhereInput | LunarPhasesCacheScalarWhereInput[]
  }

  export type LunarJournalUpdateManyWithoutUserNestedInput = {
    create?: XOR<LunarJournalCreateWithoutUserInput, LunarJournalUncheckedCreateWithoutUserInput> | LunarJournalCreateWithoutUserInput[] | LunarJournalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LunarJournalCreateOrConnectWithoutUserInput | LunarJournalCreateOrConnectWithoutUserInput[]
    upsert?: LunarJournalUpsertWithWhereUniqueWithoutUserInput | LunarJournalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LunarJournalCreateManyUserInputEnvelope
    set?: LunarJournalWhereUniqueInput | LunarJournalWhereUniqueInput[]
    disconnect?: LunarJournalWhereUniqueInput | LunarJournalWhereUniqueInput[]
    delete?: LunarJournalWhereUniqueInput | LunarJournalWhereUniqueInput[]
    connect?: LunarJournalWhereUniqueInput | LunarJournalWhereUniqueInput[]
    update?: LunarJournalUpdateWithWhereUniqueWithoutUserInput | LunarJournalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LunarJournalUpdateManyWithWhereWithoutUserInput | LunarJournalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LunarJournalScalarWhereInput | LunarJournalScalarWhereInput[]
  }

  export type RectificationEventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RectificationEventCreateWithoutUserInput, RectificationEventUncheckedCreateWithoutUserInput> | RectificationEventCreateWithoutUserInput[] | RectificationEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RectificationEventCreateOrConnectWithoutUserInput | RectificationEventCreateOrConnectWithoutUserInput[]
    upsert?: RectificationEventUpsertWithWhereUniqueWithoutUserInput | RectificationEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RectificationEventCreateManyUserInputEnvelope
    set?: RectificationEventWhereUniqueInput | RectificationEventWhereUniqueInput[]
    disconnect?: RectificationEventWhereUniqueInput | RectificationEventWhereUniqueInput[]
    delete?: RectificationEventWhereUniqueInput | RectificationEventWhereUniqueInput[]
    connect?: RectificationEventWhereUniqueInput | RectificationEventWhereUniqueInput[]
    update?: RectificationEventUpdateWithWhereUniqueWithoutUserInput | RectificationEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RectificationEventUpdateManyWithWhereWithoutUserInput | RectificationEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RectificationEventScalarWhereInput | RectificationEventScalarWhereInput[]
  }

  export type CartaNatalUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CartaNatalCreateWithoutUserInput, CartaNatalUncheckedCreateWithoutUserInput> | CartaNatalCreateWithoutUserInput[] | CartaNatalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CartaNatalCreateOrConnectWithoutUserInput | CartaNatalCreateOrConnectWithoutUserInput[]
    upsert?: CartaNatalUpsertWithWhereUniqueWithoutUserInput | CartaNatalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CartaNatalCreateManyUserInputEnvelope
    set?: CartaNatalWhereUniqueInput | CartaNatalWhereUniqueInput[]
    disconnect?: CartaNatalWhereUniqueInput | CartaNatalWhereUniqueInput[]
    delete?: CartaNatalWhereUniqueInput | CartaNatalWhereUniqueInput[]
    connect?: CartaNatalWhereUniqueInput | CartaNatalWhereUniqueInput[]
    update?: CartaNatalUpdateWithWhereUniqueWithoutUserInput | CartaNatalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CartaNatalUpdateManyWithWhereWithoutUserInput | CartaNatalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CartaNatalScalarWhereInput | CartaNatalScalarWhereInput[]
  }

  export type InterpretacionCacheUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<InterpretacionCacheCreateWithoutUserInput, InterpretacionCacheUncheckedCreateWithoutUserInput> | InterpretacionCacheCreateWithoutUserInput[] | InterpretacionCacheUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterpretacionCacheCreateOrConnectWithoutUserInput | InterpretacionCacheCreateOrConnectWithoutUserInput[]
    upsert?: InterpretacionCacheUpsertWithWhereUniqueWithoutUserInput | InterpretacionCacheUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InterpretacionCacheCreateManyUserInputEnvelope
    set?: InterpretacionCacheWhereUniqueInput | InterpretacionCacheWhereUniqueInput[]
    disconnect?: InterpretacionCacheWhereUniqueInput | InterpretacionCacheWhereUniqueInput[]
    delete?: InterpretacionCacheWhereUniqueInput | InterpretacionCacheWhereUniqueInput[]
    connect?: InterpretacionCacheWhereUniqueInput | InterpretacionCacheWhereUniqueInput[]
    update?: InterpretacionCacheUpdateWithWhereUniqueWithoutUserInput | InterpretacionCacheUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InterpretacionCacheUpdateManyWithWhereWithoutUserInput | InterpretacionCacheUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InterpretacionCacheScalarWhereInput | InterpretacionCacheScalarWhereInput[]
  }

  export type HorariaRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<HorariaRequestCreateWithoutUserInput, HorariaRequestUncheckedCreateWithoutUserInput> | HorariaRequestCreateWithoutUserInput[] | HorariaRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HorariaRequestCreateOrConnectWithoutUserInput | HorariaRequestCreateOrConnectWithoutUserInput[]
    upsert?: HorariaRequestUpsertWithWhereUniqueWithoutUserInput | HorariaRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HorariaRequestCreateManyUserInputEnvelope
    set?: HorariaRequestWhereUniqueInput | HorariaRequestWhereUniqueInput[]
    disconnect?: HorariaRequestWhereUniqueInput | HorariaRequestWhereUniqueInput[]
    delete?: HorariaRequestWhereUniqueInput | HorariaRequestWhereUniqueInput[]
    connect?: HorariaRequestWhereUniqueInput | HorariaRequestWhereUniqueInput[]
    update?: HorariaRequestUpdateWithWhereUniqueWithoutUserInput | HorariaRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HorariaRequestUpdateManyWithWhereWithoutUserInput | HorariaRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HorariaRequestScalarWhereInput | HorariaRequestScalarWhereInput[]
  }

  export type PersonalCalendarCacheUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PersonalCalendarCacheCreateWithoutUserInput, PersonalCalendarCacheUncheckedCreateWithoutUserInput> | PersonalCalendarCacheCreateWithoutUserInput[] | PersonalCalendarCacheUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PersonalCalendarCacheCreateOrConnectWithoutUserInput | PersonalCalendarCacheCreateOrConnectWithoutUserInput[]
    upsert?: PersonalCalendarCacheUpsertWithWhereUniqueWithoutUserInput | PersonalCalendarCacheUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PersonalCalendarCacheCreateManyUserInputEnvelope
    set?: PersonalCalendarCacheWhereUniqueInput | PersonalCalendarCacheWhereUniqueInput[]
    disconnect?: PersonalCalendarCacheWhereUniqueInput | PersonalCalendarCacheWhereUniqueInput[]
    delete?: PersonalCalendarCacheWhereUniqueInput | PersonalCalendarCacheWhereUniqueInput[]
    connect?: PersonalCalendarCacheWhereUniqueInput | PersonalCalendarCacheWhereUniqueInput[]
    update?: PersonalCalendarCacheUpdateWithWhereUniqueWithoutUserInput | PersonalCalendarCacheUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PersonalCalendarCacheUpdateManyWithWhereWithoutUserInput | PersonalCalendarCacheUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PersonalCalendarCacheScalarWhereInput | PersonalCalendarCacheScalarWhereInput[]
  }

  export type LunarPhasesCacheUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LunarPhasesCacheCreateWithoutUserInput, LunarPhasesCacheUncheckedCreateWithoutUserInput> | LunarPhasesCacheCreateWithoutUserInput[] | LunarPhasesCacheUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LunarPhasesCacheCreateOrConnectWithoutUserInput | LunarPhasesCacheCreateOrConnectWithoutUserInput[]
    upsert?: LunarPhasesCacheUpsertWithWhereUniqueWithoutUserInput | LunarPhasesCacheUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LunarPhasesCacheCreateManyUserInputEnvelope
    set?: LunarPhasesCacheWhereUniqueInput | LunarPhasesCacheWhereUniqueInput[]
    disconnect?: LunarPhasesCacheWhereUniqueInput | LunarPhasesCacheWhereUniqueInput[]
    delete?: LunarPhasesCacheWhereUniqueInput | LunarPhasesCacheWhereUniqueInput[]
    connect?: LunarPhasesCacheWhereUniqueInput | LunarPhasesCacheWhereUniqueInput[]
    update?: LunarPhasesCacheUpdateWithWhereUniqueWithoutUserInput | LunarPhasesCacheUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LunarPhasesCacheUpdateManyWithWhereWithoutUserInput | LunarPhasesCacheUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LunarPhasesCacheScalarWhereInput | LunarPhasesCacheScalarWhereInput[]
  }

  export type LunarJournalUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LunarJournalCreateWithoutUserInput, LunarJournalUncheckedCreateWithoutUserInput> | LunarJournalCreateWithoutUserInput[] | LunarJournalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LunarJournalCreateOrConnectWithoutUserInput | LunarJournalCreateOrConnectWithoutUserInput[]
    upsert?: LunarJournalUpsertWithWhereUniqueWithoutUserInput | LunarJournalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LunarJournalCreateManyUserInputEnvelope
    set?: LunarJournalWhereUniqueInput | LunarJournalWhereUniqueInput[]
    disconnect?: LunarJournalWhereUniqueInput | LunarJournalWhereUniqueInput[]
    delete?: LunarJournalWhereUniqueInput | LunarJournalWhereUniqueInput[]
    connect?: LunarJournalWhereUniqueInput | LunarJournalWhereUniqueInput[]
    update?: LunarJournalUpdateWithWhereUniqueWithoutUserInput | LunarJournalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LunarJournalUpdateManyWithWhereWithoutUserInput | LunarJournalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LunarJournalScalarWhereInput | LunarJournalScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRectificationEventsInput = {
    create?: XOR<UserCreateWithoutRectificationEventsInput, UserUncheckedCreateWithoutRectificationEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRectificationEventsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRectificationEventsNestedInput = {
    create?: XOR<UserCreateWithoutRectificationEventsInput, UserUncheckedCreateWithoutRectificationEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRectificationEventsInput
    upsert?: UserUpsertWithoutRectificationEventsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRectificationEventsInput, UserUpdateWithoutRectificationEventsInput>, UserUncheckedUpdateWithoutRectificationEventsInput>
  }

  export type UserCreateNestedOneWithoutCartasNatalesInput = {
    create?: XOR<UserCreateWithoutCartasNatalesInput, UserUncheckedCreateWithoutCartasNatalesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCartasNatalesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCartasNatalesNestedInput = {
    create?: XOR<UserCreateWithoutCartasNatalesInput, UserUncheckedCreateWithoutCartasNatalesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCartasNatalesInput
    upsert?: UserUpsertWithoutCartasNatalesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCartasNatalesInput, UserUpdateWithoutCartasNatalesInput>, UserUncheckedUpdateWithoutCartasNatalesInput>
  }

  export type UserCreateNestedOneWithoutInterpretacionesInput = {
    create?: XOR<UserCreateWithoutInterpretacionesInput, UserUncheckedCreateWithoutInterpretacionesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInterpretacionesInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutInterpretacionesNestedInput = {
    create?: XOR<UserCreateWithoutInterpretacionesInput, UserUncheckedCreateWithoutInterpretacionesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInterpretacionesInput
    upsert?: UserUpsertWithoutInterpretacionesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInterpretacionesInput, UserUpdateWithoutInterpretacionesInput>, UserUncheckedUpdateWithoutInterpretacionesInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutHorariaRequestsInput = {
    create?: XOR<UserCreateWithoutHorariaRequestsInput, UserUncheckedCreateWithoutHorariaRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutHorariaRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutHorariaRequestsNestedInput = {
    create?: XOR<UserCreateWithoutHorariaRequestsInput, UserUncheckedCreateWithoutHorariaRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutHorariaRequestsInput
    upsert?: UserUpsertWithoutHorariaRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHorariaRequestsInput, UserUpdateWithoutHorariaRequestsInput>, UserUncheckedUpdateWithoutHorariaRequestsInput>
  }

  export type UserCreateNestedOneWithoutPersonalCalendarCacheInput = {
    create?: XOR<UserCreateWithoutPersonalCalendarCacheInput, UserUncheckedCreateWithoutPersonalCalendarCacheInput>
    connectOrCreate?: UserCreateOrConnectWithoutPersonalCalendarCacheInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPersonalCalendarCacheNestedInput = {
    create?: XOR<UserCreateWithoutPersonalCalendarCacheInput, UserUncheckedCreateWithoutPersonalCalendarCacheInput>
    connectOrCreate?: UserCreateOrConnectWithoutPersonalCalendarCacheInput
    upsert?: UserUpsertWithoutPersonalCalendarCacheInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPersonalCalendarCacheInput, UserUpdateWithoutPersonalCalendarCacheInput>, UserUncheckedUpdateWithoutPersonalCalendarCacheInput>
  }

  export type UserCreateNestedOneWithoutLunarPhasesCacheInput = {
    create?: XOR<UserCreateWithoutLunarPhasesCacheInput, UserUncheckedCreateWithoutLunarPhasesCacheInput>
    connectOrCreate?: UserCreateOrConnectWithoutLunarPhasesCacheInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLunarPhasesCacheNestedInput = {
    create?: XOR<UserCreateWithoutLunarPhasesCacheInput, UserUncheckedCreateWithoutLunarPhasesCacheInput>
    connectOrCreate?: UserCreateOrConnectWithoutLunarPhasesCacheInput
    upsert?: UserUpsertWithoutLunarPhasesCacheInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLunarPhasesCacheInput, UserUpdateWithoutLunarPhasesCacheInput>, UserUncheckedUpdateWithoutLunarPhasesCacheInput>
  }

  export type UserCreateNestedOneWithoutLunarJournalInput = {
    create?: XOR<UserCreateWithoutLunarJournalInput, UserUncheckedCreateWithoutLunarJournalInput>
    connectOrCreate?: UserCreateOrConnectWithoutLunarJournalInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLunarJournalNestedInput = {
    create?: XOR<UserCreateWithoutLunarJournalInput, UserUncheckedCreateWithoutLunarJournalInput>
    connectOrCreate?: UserCreateOrConnectWithoutLunarJournalInput
    upsert?: UserUpsertWithoutLunarJournalInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLunarJournalInput, UserUpdateWithoutLunarJournalInput>, UserUncheckedUpdateWithoutLunarJournalInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type RectificationEventCreateWithoutUserInput = {
    id?: string
    eventType: string
    description: string
    eventDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RectificationEventUncheckedCreateWithoutUserInput = {
    id?: string
    eventType: string
    description: string
    eventDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RectificationEventCreateOrConnectWithoutUserInput = {
    where: RectificationEventWhereUniqueInput
    create: XOR<RectificationEventCreateWithoutUserInput, RectificationEventUncheckedCreateWithoutUserInput>
  }

  export type RectificationEventCreateManyUserInputEnvelope = {
    data: RectificationEventCreateManyUserInput | RectificationEventCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CartaNatalCreateWithoutUserInput = {
    id?: string
    tipo: string
    dataCompleta: string
    dataReducida: string
    fechaNacimiento: Date | string
    lugarNacimiento: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartaNatalUncheckedCreateWithoutUserInput = {
    id?: string
    tipo: string
    dataCompleta: string
    dataReducida: string
    fechaNacimiento: Date | string
    lugarNacimiento: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartaNatalCreateOrConnectWithoutUserInput = {
    where: CartaNatalWhereUniqueInput
    create: XOR<CartaNatalCreateWithoutUserInput, CartaNatalUncheckedCreateWithoutUserInput>
  }

  export type CartaNatalCreateManyUserInputEnvelope = {
    data: CartaNatalCreateManyUserInput | CartaNatalCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type InterpretacionCacheCreateWithoutUserInput = {
    id?: string
    fechaNacimiento: Date | string
    lugarNacimiento: string
    gender: string
    tipo: string
    interpretacionNarrativa: string
    interpretacionesIndividuales: string
    tiempoGeneracion: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterpretacionCacheUncheckedCreateWithoutUserInput = {
    id?: string
    fechaNacimiento: Date | string
    lugarNacimiento: string
    gender: string
    tipo: string
    interpretacionNarrativa: string
    interpretacionesIndividuales: string
    tiempoGeneracion: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterpretacionCacheCreateOrConnectWithoutUserInput = {
    where: InterpretacionCacheWhereUniqueInput
    create: XOR<InterpretacionCacheCreateWithoutUserInput, InterpretacionCacheUncheckedCreateWithoutUserInput>
  }

  export type InterpretacionCacheCreateManyUserInputEnvelope = {
    data: InterpretacionCacheCreateManyUserInput | InterpretacionCacheCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type HorariaRequestCreateWithoutUserInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    country: string
    acceptSingleQuestion: string
    isFirstTime: string
    questionCategory: string
    question: string
    context?: string | null
    status?: string
    response?: string | null
    responseDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HorariaRequestUncheckedCreateWithoutUserInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    country: string
    acceptSingleQuestion: string
    isFirstTime: string
    questionCategory: string
    question: string
    context?: string | null
    status?: string
    response?: string | null
    responseDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HorariaRequestCreateOrConnectWithoutUserInput = {
    where: HorariaRequestWhereUniqueInput
    create: XOR<HorariaRequestCreateWithoutUserInput, HorariaRequestUncheckedCreateWithoutUserInput>
  }

  export type HorariaRequestCreateManyUserInputEnvelope = {
    data: HorariaRequestCreateManyUserInput | HorariaRequestCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PersonalCalendarCacheCreateWithoutUserInput = {
    id?: string
    year: number
    events: string
    calculatedAt: Date | string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonalCalendarCacheUncheckedCreateWithoutUserInput = {
    id?: string
    year: number
    events: string
    calculatedAt: Date | string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonalCalendarCacheCreateOrConnectWithoutUserInput = {
    where: PersonalCalendarCacheWhereUniqueInput
    create: XOR<PersonalCalendarCacheCreateWithoutUserInput, PersonalCalendarCacheUncheckedCreateWithoutUserInput>
  }

  export type PersonalCalendarCacheCreateManyUserInputEnvelope = {
    data: PersonalCalendarCacheCreateManyUserInput | PersonalCalendarCacheCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LunarPhasesCacheCreateWithoutUserInput = {
    id?: string
    year: number
    events: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LunarPhasesCacheUncheckedCreateWithoutUserInput = {
    id?: string
    year: number
    events: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LunarPhasesCacheCreateOrConnectWithoutUserInput = {
    where: LunarPhasesCacheWhereUniqueInput
    create: XOR<LunarPhasesCacheCreateWithoutUserInput, LunarPhasesCacheUncheckedCreateWithoutUserInput>
  }

  export type LunarPhasesCacheCreateManyUserInputEnvelope = {
    data: LunarPhasesCacheCreateManyUserInput | LunarPhasesCacheCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LunarJournalCreateWithoutUserInput = {
    id?: string
    date: Date | string
    eventType: string
    notes: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LunarJournalUncheckedCreateWithoutUserInput = {
    id?: string
    date: Date | string
    eventType: string
    notes: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LunarJournalCreateOrConnectWithoutUserInput = {
    where: LunarJournalWhereUniqueInput
    create: XOR<LunarJournalCreateWithoutUserInput, LunarJournalUncheckedCreateWithoutUserInput>
  }

  export type LunarJournalCreateManyUserInputEnvelope = {
    data: LunarJournalCreateManyUserInput | LunarJournalCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RectificationEventUpsertWithWhereUniqueWithoutUserInput = {
    where: RectificationEventWhereUniqueInput
    update: XOR<RectificationEventUpdateWithoutUserInput, RectificationEventUncheckedUpdateWithoutUserInput>
    create: XOR<RectificationEventCreateWithoutUserInput, RectificationEventUncheckedCreateWithoutUserInput>
  }

  export type RectificationEventUpdateWithWhereUniqueWithoutUserInput = {
    where: RectificationEventWhereUniqueInput
    data: XOR<RectificationEventUpdateWithoutUserInput, RectificationEventUncheckedUpdateWithoutUserInput>
  }

  export type RectificationEventUpdateManyWithWhereWithoutUserInput = {
    where: RectificationEventScalarWhereInput
    data: XOR<RectificationEventUpdateManyMutationInput, RectificationEventUncheckedUpdateManyWithoutUserInput>
  }

  export type RectificationEventScalarWhereInput = {
    AND?: RectificationEventScalarWhereInput | RectificationEventScalarWhereInput[]
    OR?: RectificationEventScalarWhereInput[]
    NOT?: RectificationEventScalarWhereInput | RectificationEventScalarWhereInput[]
    id?: StringFilter<"RectificationEvent"> | string
    userId?: StringFilter<"RectificationEvent"> | string
    eventType?: StringFilter<"RectificationEvent"> | string
    description?: StringFilter<"RectificationEvent"> | string
    eventDate?: DateTimeFilter<"RectificationEvent"> | Date | string
    notes?: StringNullableFilter<"RectificationEvent"> | string | null
    createdAt?: DateTimeFilter<"RectificationEvent"> | Date | string
    updatedAt?: DateTimeFilter<"RectificationEvent"> | Date | string
  }

  export type CartaNatalUpsertWithWhereUniqueWithoutUserInput = {
    where: CartaNatalWhereUniqueInput
    update: XOR<CartaNatalUpdateWithoutUserInput, CartaNatalUncheckedUpdateWithoutUserInput>
    create: XOR<CartaNatalCreateWithoutUserInput, CartaNatalUncheckedCreateWithoutUserInput>
  }

  export type CartaNatalUpdateWithWhereUniqueWithoutUserInput = {
    where: CartaNatalWhereUniqueInput
    data: XOR<CartaNatalUpdateWithoutUserInput, CartaNatalUncheckedUpdateWithoutUserInput>
  }

  export type CartaNatalUpdateManyWithWhereWithoutUserInput = {
    where: CartaNatalScalarWhereInput
    data: XOR<CartaNatalUpdateManyMutationInput, CartaNatalUncheckedUpdateManyWithoutUserInput>
  }

  export type CartaNatalScalarWhereInput = {
    AND?: CartaNatalScalarWhereInput | CartaNatalScalarWhereInput[]
    OR?: CartaNatalScalarWhereInput[]
    NOT?: CartaNatalScalarWhereInput | CartaNatalScalarWhereInput[]
    id?: StringFilter<"CartaNatal"> | string
    userId?: StringFilter<"CartaNatal"> | string
    tipo?: StringFilter<"CartaNatal"> | string
    dataCompleta?: StringFilter<"CartaNatal"> | string
    dataReducida?: StringFilter<"CartaNatal"> | string
    fechaNacimiento?: DateTimeFilter<"CartaNatal"> | Date | string
    lugarNacimiento?: StringFilter<"CartaNatal"> | string
    createdAt?: DateTimeFilter<"CartaNatal"> | Date | string
    updatedAt?: DateTimeFilter<"CartaNatal"> | Date | string
  }

  export type InterpretacionCacheUpsertWithWhereUniqueWithoutUserInput = {
    where: InterpretacionCacheWhereUniqueInput
    update: XOR<InterpretacionCacheUpdateWithoutUserInput, InterpretacionCacheUncheckedUpdateWithoutUserInput>
    create: XOR<InterpretacionCacheCreateWithoutUserInput, InterpretacionCacheUncheckedCreateWithoutUserInput>
  }

  export type InterpretacionCacheUpdateWithWhereUniqueWithoutUserInput = {
    where: InterpretacionCacheWhereUniqueInput
    data: XOR<InterpretacionCacheUpdateWithoutUserInput, InterpretacionCacheUncheckedUpdateWithoutUserInput>
  }

  export type InterpretacionCacheUpdateManyWithWhereWithoutUserInput = {
    where: InterpretacionCacheScalarWhereInput
    data: XOR<InterpretacionCacheUpdateManyMutationInput, InterpretacionCacheUncheckedUpdateManyWithoutUserInput>
  }

  export type InterpretacionCacheScalarWhereInput = {
    AND?: InterpretacionCacheScalarWhereInput | InterpretacionCacheScalarWhereInput[]
    OR?: InterpretacionCacheScalarWhereInput[]
    NOT?: InterpretacionCacheScalarWhereInput | InterpretacionCacheScalarWhereInput[]
    id?: StringFilter<"InterpretacionCache"> | string
    userId?: StringFilter<"InterpretacionCache"> | string
    fechaNacimiento?: DateTimeFilter<"InterpretacionCache"> | Date | string
    lugarNacimiento?: StringFilter<"InterpretacionCache"> | string
    gender?: StringFilter<"InterpretacionCache"> | string
    tipo?: StringFilter<"InterpretacionCache"> | string
    interpretacionNarrativa?: StringFilter<"InterpretacionCache"> | string
    interpretacionesIndividuales?: StringFilter<"InterpretacionCache"> | string
    tiempoGeneracion?: FloatFilter<"InterpretacionCache"> | number
    createdAt?: DateTimeFilter<"InterpretacionCache"> | Date | string
    updatedAt?: DateTimeFilter<"InterpretacionCache"> | Date | string
  }

  export type HorariaRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: HorariaRequestWhereUniqueInput
    update: XOR<HorariaRequestUpdateWithoutUserInput, HorariaRequestUncheckedUpdateWithoutUserInput>
    create: XOR<HorariaRequestCreateWithoutUserInput, HorariaRequestUncheckedCreateWithoutUserInput>
  }

  export type HorariaRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: HorariaRequestWhereUniqueInput
    data: XOR<HorariaRequestUpdateWithoutUserInput, HorariaRequestUncheckedUpdateWithoutUserInput>
  }

  export type HorariaRequestUpdateManyWithWhereWithoutUserInput = {
    where: HorariaRequestScalarWhereInput
    data: XOR<HorariaRequestUpdateManyMutationInput, HorariaRequestUncheckedUpdateManyWithoutUserInput>
  }

  export type HorariaRequestScalarWhereInput = {
    AND?: HorariaRequestScalarWhereInput | HorariaRequestScalarWhereInput[]
    OR?: HorariaRequestScalarWhereInput[]
    NOT?: HorariaRequestScalarWhereInput | HorariaRequestScalarWhereInput[]
    id?: StringFilter<"HorariaRequest"> | string
    userId?: StringFilter<"HorariaRequest"> | string
    firstName?: StringFilter<"HorariaRequest"> | string
    lastName?: StringFilter<"HorariaRequest"> | string
    email?: StringFilter<"HorariaRequest"> | string
    country?: StringFilter<"HorariaRequest"> | string
    acceptSingleQuestion?: StringFilter<"HorariaRequest"> | string
    isFirstTime?: StringFilter<"HorariaRequest"> | string
    questionCategory?: StringFilter<"HorariaRequest"> | string
    question?: StringFilter<"HorariaRequest"> | string
    context?: StringNullableFilter<"HorariaRequest"> | string | null
    status?: StringFilter<"HorariaRequest"> | string
    response?: StringNullableFilter<"HorariaRequest"> | string | null
    responseDate?: DateTimeNullableFilter<"HorariaRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"HorariaRequest"> | Date | string
    updatedAt?: DateTimeFilter<"HorariaRequest"> | Date | string
  }

  export type PersonalCalendarCacheUpsertWithWhereUniqueWithoutUserInput = {
    where: PersonalCalendarCacheWhereUniqueInput
    update: XOR<PersonalCalendarCacheUpdateWithoutUserInput, PersonalCalendarCacheUncheckedUpdateWithoutUserInput>
    create: XOR<PersonalCalendarCacheCreateWithoutUserInput, PersonalCalendarCacheUncheckedCreateWithoutUserInput>
  }

  export type PersonalCalendarCacheUpdateWithWhereUniqueWithoutUserInput = {
    where: PersonalCalendarCacheWhereUniqueInput
    data: XOR<PersonalCalendarCacheUpdateWithoutUserInput, PersonalCalendarCacheUncheckedUpdateWithoutUserInput>
  }

  export type PersonalCalendarCacheUpdateManyWithWhereWithoutUserInput = {
    where: PersonalCalendarCacheScalarWhereInput
    data: XOR<PersonalCalendarCacheUpdateManyMutationInput, PersonalCalendarCacheUncheckedUpdateManyWithoutUserInput>
  }

  export type PersonalCalendarCacheScalarWhereInput = {
    AND?: PersonalCalendarCacheScalarWhereInput | PersonalCalendarCacheScalarWhereInput[]
    OR?: PersonalCalendarCacheScalarWhereInput[]
    NOT?: PersonalCalendarCacheScalarWhereInput | PersonalCalendarCacheScalarWhereInput[]
    id?: StringFilter<"PersonalCalendarCache"> | string
    userId?: StringFilter<"PersonalCalendarCache"> | string
    year?: IntFilter<"PersonalCalendarCache"> | number
    events?: StringFilter<"PersonalCalendarCache"> | string
    calculatedAt?: DateTimeFilter<"PersonalCalendarCache"> | Date | string
    expiresAt?: DateTimeFilter<"PersonalCalendarCache"> | Date | string
    createdAt?: DateTimeFilter<"PersonalCalendarCache"> | Date | string
    updatedAt?: DateTimeFilter<"PersonalCalendarCache"> | Date | string
  }

  export type LunarPhasesCacheUpsertWithWhereUniqueWithoutUserInput = {
    where: LunarPhasesCacheWhereUniqueInput
    update: XOR<LunarPhasesCacheUpdateWithoutUserInput, LunarPhasesCacheUncheckedUpdateWithoutUserInput>
    create: XOR<LunarPhasesCacheCreateWithoutUserInput, LunarPhasesCacheUncheckedCreateWithoutUserInput>
  }

  export type LunarPhasesCacheUpdateWithWhereUniqueWithoutUserInput = {
    where: LunarPhasesCacheWhereUniqueInput
    data: XOR<LunarPhasesCacheUpdateWithoutUserInput, LunarPhasesCacheUncheckedUpdateWithoutUserInput>
  }

  export type LunarPhasesCacheUpdateManyWithWhereWithoutUserInput = {
    where: LunarPhasesCacheScalarWhereInput
    data: XOR<LunarPhasesCacheUpdateManyMutationInput, LunarPhasesCacheUncheckedUpdateManyWithoutUserInput>
  }

  export type LunarPhasesCacheScalarWhereInput = {
    AND?: LunarPhasesCacheScalarWhereInput | LunarPhasesCacheScalarWhereInput[]
    OR?: LunarPhasesCacheScalarWhereInput[]
    NOT?: LunarPhasesCacheScalarWhereInput | LunarPhasesCacheScalarWhereInput[]
    id?: StringFilter<"LunarPhasesCache"> | string
    userId?: StringFilter<"LunarPhasesCache"> | string
    year?: IntFilter<"LunarPhasesCache"> | number
    events?: StringFilter<"LunarPhasesCache"> | string
    createdAt?: DateTimeFilter<"LunarPhasesCache"> | Date | string
    updatedAt?: DateTimeFilter<"LunarPhasesCache"> | Date | string
  }

  export type LunarJournalUpsertWithWhereUniqueWithoutUserInput = {
    where: LunarJournalWhereUniqueInput
    update: XOR<LunarJournalUpdateWithoutUserInput, LunarJournalUncheckedUpdateWithoutUserInput>
    create: XOR<LunarJournalCreateWithoutUserInput, LunarJournalUncheckedCreateWithoutUserInput>
  }

  export type LunarJournalUpdateWithWhereUniqueWithoutUserInput = {
    where: LunarJournalWhereUniqueInput
    data: XOR<LunarJournalUpdateWithoutUserInput, LunarJournalUncheckedUpdateWithoutUserInput>
  }

  export type LunarJournalUpdateManyWithWhereWithoutUserInput = {
    where: LunarJournalScalarWhereInput
    data: XOR<LunarJournalUpdateManyMutationInput, LunarJournalUncheckedUpdateManyWithoutUserInput>
  }

  export type LunarJournalScalarWhereInput = {
    AND?: LunarJournalScalarWhereInput | LunarJournalScalarWhereInput[]
    OR?: LunarJournalScalarWhereInput[]
    NOT?: LunarJournalScalarWhereInput | LunarJournalScalarWhereInput[]
    id?: StringFilter<"LunarJournal"> | string
    userId?: StringFilter<"LunarJournal"> | string
    date?: DateTimeFilter<"LunarJournal"> | Date | string
    eventType?: StringFilter<"LunarJournal"> | string
    notes?: StringFilter<"LunarJournal"> | string
    createdAt?: DateTimeFilter<"LunarJournal"> | Date | string
    updatedAt?: DateTimeFilter<"LunarJournal"> | Date | string
  }

  export type UserCreateWithoutRectificationEventsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
    cartasNatales?: CartaNatalCreateNestedManyWithoutUserInput
    interpretaciones?: InterpretacionCacheCreateNestedManyWithoutUserInput
    horariaRequests?: HorariaRequestCreateNestedManyWithoutUserInput
    personalCalendarCache?: PersonalCalendarCacheCreateNestedManyWithoutUserInput
    lunarPhasesCache?: LunarPhasesCacheCreateNestedManyWithoutUserInput
    lunarJournal?: LunarJournalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRectificationEventsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
    cartasNatales?: CartaNatalUncheckedCreateNestedManyWithoutUserInput
    interpretaciones?: InterpretacionCacheUncheckedCreateNestedManyWithoutUserInput
    horariaRequests?: HorariaRequestUncheckedCreateNestedManyWithoutUserInput
    personalCalendarCache?: PersonalCalendarCacheUncheckedCreateNestedManyWithoutUserInput
    lunarPhasesCache?: LunarPhasesCacheUncheckedCreateNestedManyWithoutUserInput
    lunarJournal?: LunarJournalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRectificationEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRectificationEventsInput, UserUncheckedCreateWithoutRectificationEventsInput>
  }

  export type UserUpsertWithoutRectificationEventsInput = {
    update: XOR<UserUpdateWithoutRectificationEventsInput, UserUncheckedUpdateWithoutRectificationEventsInput>
    create: XOR<UserCreateWithoutRectificationEventsInput, UserUncheckedCreateWithoutRectificationEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRectificationEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRectificationEventsInput, UserUncheckedUpdateWithoutRectificationEventsInput>
  }

  export type UserUpdateWithoutRectificationEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cartasNatales?: CartaNatalUpdateManyWithoutUserNestedInput
    interpretaciones?: InterpretacionCacheUpdateManyWithoutUserNestedInput
    horariaRequests?: HorariaRequestUpdateManyWithoutUserNestedInput
    personalCalendarCache?: PersonalCalendarCacheUpdateManyWithoutUserNestedInput
    lunarPhasesCache?: LunarPhasesCacheUpdateManyWithoutUserNestedInput
    lunarJournal?: LunarJournalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRectificationEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cartasNatales?: CartaNatalUncheckedUpdateManyWithoutUserNestedInput
    interpretaciones?: InterpretacionCacheUncheckedUpdateManyWithoutUserNestedInput
    horariaRequests?: HorariaRequestUncheckedUpdateManyWithoutUserNestedInput
    personalCalendarCache?: PersonalCalendarCacheUncheckedUpdateManyWithoutUserNestedInput
    lunarPhasesCache?: LunarPhasesCacheUncheckedUpdateManyWithoutUserNestedInput
    lunarJournal?: LunarJournalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCartasNatalesInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
    rectificationEvents?: RectificationEventCreateNestedManyWithoutUserInput
    interpretaciones?: InterpretacionCacheCreateNestedManyWithoutUserInput
    horariaRequests?: HorariaRequestCreateNestedManyWithoutUserInput
    personalCalendarCache?: PersonalCalendarCacheCreateNestedManyWithoutUserInput
    lunarPhasesCache?: LunarPhasesCacheCreateNestedManyWithoutUserInput
    lunarJournal?: LunarJournalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCartasNatalesInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
    rectificationEvents?: RectificationEventUncheckedCreateNestedManyWithoutUserInput
    interpretaciones?: InterpretacionCacheUncheckedCreateNestedManyWithoutUserInput
    horariaRequests?: HorariaRequestUncheckedCreateNestedManyWithoutUserInput
    personalCalendarCache?: PersonalCalendarCacheUncheckedCreateNestedManyWithoutUserInput
    lunarPhasesCache?: LunarPhasesCacheUncheckedCreateNestedManyWithoutUserInput
    lunarJournal?: LunarJournalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCartasNatalesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCartasNatalesInput, UserUncheckedCreateWithoutCartasNatalesInput>
  }

  export type UserUpsertWithoutCartasNatalesInput = {
    update: XOR<UserUpdateWithoutCartasNatalesInput, UserUncheckedUpdateWithoutCartasNatalesInput>
    create: XOR<UserCreateWithoutCartasNatalesInput, UserUncheckedCreateWithoutCartasNatalesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCartasNatalesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCartasNatalesInput, UserUncheckedUpdateWithoutCartasNatalesInput>
  }

  export type UserUpdateWithoutCartasNatalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rectificationEvents?: RectificationEventUpdateManyWithoutUserNestedInput
    interpretaciones?: InterpretacionCacheUpdateManyWithoutUserNestedInput
    horariaRequests?: HorariaRequestUpdateManyWithoutUserNestedInput
    personalCalendarCache?: PersonalCalendarCacheUpdateManyWithoutUserNestedInput
    lunarPhasesCache?: LunarPhasesCacheUpdateManyWithoutUserNestedInput
    lunarJournal?: LunarJournalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCartasNatalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rectificationEvents?: RectificationEventUncheckedUpdateManyWithoutUserNestedInput
    interpretaciones?: InterpretacionCacheUncheckedUpdateManyWithoutUserNestedInput
    horariaRequests?: HorariaRequestUncheckedUpdateManyWithoutUserNestedInput
    personalCalendarCache?: PersonalCalendarCacheUncheckedUpdateManyWithoutUserNestedInput
    lunarPhasesCache?: LunarPhasesCacheUncheckedUpdateManyWithoutUserNestedInput
    lunarJournal?: LunarJournalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutInterpretacionesInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
    rectificationEvents?: RectificationEventCreateNestedManyWithoutUserInput
    cartasNatales?: CartaNatalCreateNestedManyWithoutUserInput
    horariaRequests?: HorariaRequestCreateNestedManyWithoutUserInput
    personalCalendarCache?: PersonalCalendarCacheCreateNestedManyWithoutUserInput
    lunarPhasesCache?: LunarPhasesCacheCreateNestedManyWithoutUserInput
    lunarJournal?: LunarJournalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInterpretacionesInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
    rectificationEvents?: RectificationEventUncheckedCreateNestedManyWithoutUserInput
    cartasNatales?: CartaNatalUncheckedCreateNestedManyWithoutUserInput
    horariaRequests?: HorariaRequestUncheckedCreateNestedManyWithoutUserInput
    personalCalendarCache?: PersonalCalendarCacheUncheckedCreateNestedManyWithoutUserInput
    lunarPhasesCache?: LunarPhasesCacheUncheckedCreateNestedManyWithoutUserInput
    lunarJournal?: LunarJournalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInterpretacionesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInterpretacionesInput, UserUncheckedCreateWithoutInterpretacionesInput>
  }

  export type UserUpsertWithoutInterpretacionesInput = {
    update: XOR<UserUpdateWithoutInterpretacionesInput, UserUncheckedUpdateWithoutInterpretacionesInput>
    create: XOR<UserCreateWithoutInterpretacionesInput, UserUncheckedCreateWithoutInterpretacionesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInterpretacionesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInterpretacionesInput, UserUncheckedUpdateWithoutInterpretacionesInput>
  }

  export type UserUpdateWithoutInterpretacionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rectificationEvents?: RectificationEventUpdateManyWithoutUserNestedInput
    cartasNatales?: CartaNatalUpdateManyWithoutUserNestedInput
    horariaRequests?: HorariaRequestUpdateManyWithoutUserNestedInput
    personalCalendarCache?: PersonalCalendarCacheUpdateManyWithoutUserNestedInput
    lunarPhasesCache?: LunarPhasesCacheUpdateManyWithoutUserNestedInput
    lunarJournal?: LunarJournalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInterpretacionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rectificationEvents?: RectificationEventUncheckedUpdateManyWithoutUserNestedInput
    cartasNatales?: CartaNatalUncheckedUpdateManyWithoutUserNestedInput
    horariaRequests?: HorariaRequestUncheckedUpdateManyWithoutUserNestedInput
    personalCalendarCache?: PersonalCalendarCacheUncheckedUpdateManyWithoutUserNestedInput
    lunarPhasesCache?: LunarPhasesCacheUncheckedUpdateManyWithoutUserNestedInput
    lunarJournal?: LunarJournalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutHorariaRequestsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
    rectificationEvents?: RectificationEventCreateNestedManyWithoutUserInput
    cartasNatales?: CartaNatalCreateNestedManyWithoutUserInput
    interpretaciones?: InterpretacionCacheCreateNestedManyWithoutUserInput
    personalCalendarCache?: PersonalCalendarCacheCreateNestedManyWithoutUserInput
    lunarPhasesCache?: LunarPhasesCacheCreateNestedManyWithoutUserInput
    lunarJournal?: LunarJournalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutHorariaRequestsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
    rectificationEvents?: RectificationEventUncheckedCreateNestedManyWithoutUserInput
    cartasNatales?: CartaNatalUncheckedCreateNestedManyWithoutUserInput
    interpretaciones?: InterpretacionCacheUncheckedCreateNestedManyWithoutUserInput
    personalCalendarCache?: PersonalCalendarCacheUncheckedCreateNestedManyWithoutUserInput
    lunarPhasesCache?: LunarPhasesCacheUncheckedCreateNestedManyWithoutUserInput
    lunarJournal?: LunarJournalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutHorariaRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHorariaRequestsInput, UserUncheckedCreateWithoutHorariaRequestsInput>
  }

  export type UserUpsertWithoutHorariaRequestsInput = {
    update: XOR<UserUpdateWithoutHorariaRequestsInput, UserUncheckedUpdateWithoutHorariaRequestsInput>
    create: XOR<UserCreateWithoutHorariaRequestsInput, UserUncheckedCreateWithoutHorariaRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHorariaRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHorariaRequestsInput, UserUncheckedUpdateWithoutHorariaRequestsInput>
  }

  export type UserUpdateWithoutHorariaRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rectificationEvents?: RectificationEventUpdateManyWithoutUserNestedInput
    cartasNatales?: CartaNatalUpdateManyWithoutUserNestedInput
    interpretaciones?: InterpretacionCacheUpdateManyWithoutUserNestedInput
    personalCalendarCache?: PersonalCalendarCacheUpdateManyWithoutUserNestedInput
    lunarPhasesCache?: LunarPhasesCacheUpdateManyWithoutUserNestedInput
    lunarJournal?: LunarJournalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutHorariaRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rectificationEvents?: RectificationEventUncheckedUpdateManyWithoutUserNestedInput
    cartasNatales?: CartaNatalUncheckedUpdateManyWithoutUserNestedInput
    interpretaciones?: InterpretacionCacheUncheckedUpdateManyWithoutUserNestedInput
    personalCalendarCache?: PersonalCalendarCacheUncheckedUpdateManyWithoutUserNestedInput
    lunarPhasesCache?: LunarPhasesCacheUncheckedUpdateManyWithoutUserNestedInput
    lunarJournal?: LunarJournalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPersonalCalendarCacheInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
    rectificationEvents?: RectificationEventCreateNestedManyWithoutUserInput
    cartasNatales?: CartaNatalCreateNestedManyWithoutUserInput
    interpretaciones?: InterpretacionCacheCreateNestedManyWithoutUserInput
    horariaRequests?: HorariaRequestCreateNestedManyWithoutUserInput
    lunarPhasesCache?: LunarPhasesCacheCreateNestedManyWithoutUserInput
    lunarJournal?: LunarJournalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPersonalCalendarCacheInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
    rectificationEvents?: RectificationEventUncheckedCreateNestedManyWithoutUserInput
    cartasNatales?: CartaNatalUncheckedCreateNestedManyWithoutUserInput
    interpretaciones?: InterpretacionCacheUncheckedCreateNestedManyWithoutUserInput
    horariaRequests?: HorariaRequestUncheckedCreateNestedManyWithoutUserInput
    lunarPhasesCache?: LunarPhasesCacheUncheckedCreateNestedManyWithoutUserInput
    lunarJournal?: LunarJournalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPersonalCalendarCacheInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPersonalCalendarCacheInput, UserUncheckedCreateWithoutPersonalCalendarCacheInput>
  }

  export type UserUpsertWithoutPersonalCalendarCacheInput = {
    update: XOR<UserUpdateWithoutPersonalCalendarCacheInput, UserUncheckedUpdateWithoutPersonalCalendarCacheInput>
    create: XOR<UserCreateWithoutPersonalCalendarCacheInput, UserUncheckedCreateWithoutPersonalCalendarCacheInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPersonalCalendarCacheInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPersonalCalendarCacheInput, UserUncheckedUpdateWithoutPersonalCalendarCacheInput>
  }

  export type UserUpdateWithoutPersonalCalendarCacheInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rectificationEvents?: RectificationEventUpdateManyWithoutUserNestedInput
    cartasNatales?: CartaNatalUpdateManyWithoutUserNestedInput
    interpretaciones?: InterpretacionCacheUpdateManyWithoutUserNestedInput
    horariaRequests?: HorariaRequestUpdateManyWithoutUserNestedInput
    lunarPhasesCache?: LunarPhasesCacheUpdateManyWithoutUserNestedInput
    lunarJournal?: LunarJournalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPersonalCalendarCacheInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rectificationEvents?: RectificationEventUncheckedUpdateManyWithoutUserNestedInput
    cartasNatales?: CartaNatalUncheckedUpdateManyWithoutUserNestedInput
    interpretaciones?: InterpretacionCacheUncheckedUpdateManyWithoutUserNestedInput
    horariaRequests?: HorariaRequestUncheckedUpdateManyWithoutUserNestedInput
    lunarPhasesCache?: LunarPhasesCacheUncheckedUpdateManyWithoutUserNestedInput
    lunarJournal?: LunarJournalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutLunarPhasesCacheInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
    rectificationEvents?: RectificationEventCreateNestedManyWithoutUserInput
    cartasNatales?: CartaNatalCreateNestedManyWithoutUserInput
    interpretaciones?: InterpretacionCacheCreateNestedManyWithoutUserInput
    horariaRequests?: HorariaRequestCreateNestedManyWithoutUserInput
    personalCalendarCache?: PersonalCalendarCacheCreateNestedManyWithoutUserInput
    lunarJournal?: LunarJournalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLunarPhasesCacheInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
    rectificationEvents?: RectificationEventUncheckedCreateNestedManyWithoutUserInput
    cartasNatales?: CartaNatalUncheckedCreateNestedManyWithoutUserInput
    interpretaciones?: InterpretacionCacheUncheckedCreateNestedManyWithoutUserInput
    horariaRequests?: HorariaRequestUncheckedCreateNestedManyWithoutUserInput
    personalCalendarCache?: PersonalCalendarCacheUncheckedCreateNestedManyWithoutUserInput
    lunarJournal?: LunarJournalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLunarPhasesCacheInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLunarPhasesCacheInput, UserUncheckedCreateWithoutLunarPhasesCacheInput>
  }

  export type UserUpsertWithoutLunarPhasesCacheInput = {
    update: XOR<UserUpdateWithoutLunarPhasesCacheInput, UserUncheckedUpdateWithoutLunarPhasesCacheInput>
    create: XOR<UserCreateWithoutLunarPhasesCacheInput, UserUncheckedCreateWithoutLunarPhasesCacheInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLunarPhasesCacheInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLunarPhasesCacheInput, UserUncheckedUpdateWithoutLunarPhasesCacheInput>
  }

  export type UserUpdateWithoutLunarPhasesCacheInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rectificationEvents?: RectificationEventUpdateManyWithoutUserNestedInput
    cartasNatales?: CartaNatalUpdateManyWithoutUserNestedInput
    interpretaciones?: InterpretacionCacheUpdateManyWithoutUserNestedInput
    horariaRequests?: HorariaRequestUpdateManyWithoutUserNestedInput
    personalCalendarCache?: PersonalCalendarCacheUpdateManyWithoutUserNestedInput
    lunarJournal?: LunarJournalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLunarPhasesCacheInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rectificationEvents?: RectificationEventUncheckedUpdateManyWithoutUserNestedInput
    cartasNatales?: CartaNatalUncheckedUpdateManyWithoutUserNestedInput
    interpretaciones?: InterpretacionCacheUncheckedUpdateManyWithoutUserNestedInput
    horariaRequests?: HorariaRequestUncheckedUpdateManyWithoutUserNestedInput
    personalCalendarCache?: PersonalCalendarCacheUncheckedUpdateManyWithoutUserNestedInput
    lunarJournal?: LunarJournalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutLunarJournalInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
    rectificationEvents?: RectificationEventCreateNestedManyWithoutUserInput
    cartasNatales?: CartaNatalCreateNestedManyWithoutUserInput
    interpretaciones?: InterpretacionCacheCreateNestedManyWithoutUserInput
    horariaRequests?: HorariaRequestCreateNestedManyWithoutUserInput
    personalCalendarCache?: PersonalCalendarCacheCreateNestedManyWithoutUserInput
    lunarPhasesCache?: LunarPhasesCacheCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLunarJournalInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    gender?: string | null
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    subscriptionStatus?: string
    subscriptionExpiresAt?: Date | string | null
    rectificationEvents?: RectificationEventUncheckedCreateNestedManyWithoutUserInput
    cartasNatales?: CartaNatalUncheckedCreateNestedManyWithoutUserInput
    interpretaciones?: InterpretacionCacheUncheckedCreateNestedManyWithoutUserInput
    horariaRequests?: HorariaRequestUncheckedCreateNestedManyWithoutUserInput
    personalCalendarCache?: PersonalCalendarCacheUncheckedCreateNestedManyWithoutUserInput
    lunarPhasesCache?: LunarPhasesCacheUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLunarJournalInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLunarJournalInput, UserUncheckedCreateWithoutLunarJournalInput>
  }

  export type UserUpsertWithoutLunarJournalInput = {
    update: XOR<UserUpdateWithoutLunarJournalInput, UserUncheckedUpdateWithoutLunarJournalInput>
    create: XOR<UserCreateWithoutLunarJournalInput, UserUncheckedCreateWithoutLunarJournalInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLunarJournalInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLunarJournalInput, UserUncheckedUpdateWithoutLunarJournalInput>
  }

  export type UserUpdateWithoutLunarJournalInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rectificationEvents?: RectificationEventUpdateManyWithoutUserNestedInput
    cartasNatales?: CartaNatalUpdateManyWithoutUserNestedInput
    interpretaciones?: InterpretacionCacheUpdateManyWithoutUserNestedInput
    horariaRequests?: HorariaRequestUpdateManyWithoutUserNestedInput
    personalCalendarCache?: PersonalCalendarCacheUpdateManyWithoutUserNestedInput
    lunarPhasesCache?: LunarPhasesCacheUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLunarJournalInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rectificationEvents?: RectificationEventUncheckedUpdateManyWithoutUserNestedInput
    cartasNatales?: CartaNatalUncheckedUpdateManyWithoutUserNestedInput
    interpretaciones?: InterpretacionCacheUncheckedUpdateManyWithoutUserNestedInput
    horariaRequests?: HorariaRequestUncheckedUpdateManyWithoutUserNestedInput
    personalCalendarCache?: PersonalCalendarCacheUncheckedUpdateManyWithoutUserNestedInput
    lunarPhasesCache?: LunarPhasesCacheUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RectificationEventCreateManyUserInput = {
    id?: string
    eventType: string
    description: string
    eventDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartaNatalCreateManyUserInput = {
    id?: string
    tipo: string
    dataCompleta: string
    dataReducida: string
    fechaNacimiento: Date | string
    lugarNacimiento: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterpretacionCacheCreateManyUserInput = {
    id?: string
    fechaNacimiento: Date | string
    lugarNacimiento: string
    gender: string
    tipo: string
    interpretacionNarrativa: string
    interpretacionesIndividuales: string
    tiempoGeneracion: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HorariaRequestCreateManyUserInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    country: string
    acceptSingleQuestion: string
    isFirstTime: string
    questionCategory: string
    question: string
    context?: string | null
    status?: string
    response?: string | null
    responseDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonalCalendarCacheCreateManyUserInput = {
    id?: string
    year: number
    events: string
    calculatedAt: Date | string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LunarPhasesCacheCreateManyUserInput = {
    id?: string
    year: number
    events: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LunarJournalCreateManyUserInput = {
    id?: string
    date: Date | string
    eventType: string
    notes: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RectificationEventUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RectificationEventUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RectificationEventUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartaNatalUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    dataCompleta?: StringFieldUpdateOperationsInput | string
    dataReducida?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    lugarNacimiento?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartaNatalUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    dataCompleta?: StringFieldUpdateOperationsInput | string
    dataReducida?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    lugarNacimiento?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartaNatalUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    dataCompleta?: StringFieldUpdateOperationsInput | string
    dataReducida?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    lugarNacimiento?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterpretacionCacheUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    lugarNacimiento?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    interpretacionNarrativa?: StringFieldUpdateOperationsInput | string
    interpretacionesIndividuales?: StringFieldUpdateOperationsInput | string
    tiempoGeneracion?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterpretacionCacheUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    lugarNacimiento?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    interpretacionNarrativa?: StringFieldUpdateOperationsInput | string
    interpretacionesIndividuales?: StringFieldUpdateOperationsInput | string
    tiempoGeneracion?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterpretacionCacheUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fechaNacimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    lugarNacimiento?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    interpretacionNarrativa?: StringFieldUpdateOperationsInput | string
    interpretacionesIndividuales?: StringFieldUpdateOperationsInput | string
    tiempoGeneracion?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HorariaRequestUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    acceptSingleQuestion?: StringFieldUpdateOperationsInput | string
    isFirstTime?: StringFieldUpdateOperationsInput | string
    questionCategory?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    responseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HorariaRequestUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    acceptSingleQuestion?: StringFieldUpdateOperationsInput | string
    isFirstTime?: StringFieldUpdateOperationsInput | string
    questionCategory?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    responseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HorariaRequestUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    acceptSingleQuestion?: StringFieldUpdateOperationsInput | string
    isFirstTime?: StringFieldUpdateOperationsInput | string
    questionCategory?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    responseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalCalendarCacheUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    events?: StringFieldUpdateOperationsInput | string
    calculatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalCalendarCacheUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    events?: StringFieldUpdateOperationsInput | string
    calculatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalCalendarCacheUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    events?: StringFieldUpdateOperationsInput | string
    calculatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LunarPhasesCacheUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    events?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LunarPhasesCacheUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    events?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LunarPhasesCacheUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    events?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LunarJournalUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LunarJournalUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LunarJournalUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}