
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
    RectificationEvent: 'RectificationEvent'
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
      modelProps: "user" | "rectificationEvent"
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
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rectificationEvents?: boolean | UserCountOutputTypeCountRectificationEventsArgs
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
    createdAt: Date | null
    updatedAt: Date | null
    birthDate: Date | null
    birthCity: string | null
    birthCountry: string | null
    birthHour: number | null
    birthMinute: number | null
    knowsBirthTime: boolean | null
    residenceCity: string | null
    residenceCountry: string | null
    timezone: string | null
    rectificationRequested: boolean | null
    rectificationAcceptedUncertainty: boolean | null
    rectificationStatus: string | null
    rectificationRequestDate: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    birthDate: Date | null
    birthCity: string | null
    birthCountry: string | null
    birthHour: number | null
    birthMinute: number | null
    knowsBirthTime: boolean | null
    residenceCity: string | null
    residenceCountry: string | null
    timezone: string | null
    rectificationRequested: boolean | null
    rectificationAcceptedUncertainty: boolean | null
    rectificationStatus: string | null
    rectificationRequestDate: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    image: number
    createdAt: number
    updatedAt: number
    birthDate: number
    birthCity: number
    birthCountry: number
    birthHour: number
    birthMinute: number
    knowsBirthTime: number
    residenceCity: number
    residenceCountry: number
    timezone: number
    rectificationRequested: number
    rectificationAcceptedUncertainty: number
    rectificationStatus: number
    rectificationRequestDate: number
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
    createdAt?: true
    updatedAt?: true
    birthDate?: true
    birthCity?: true
    birthCountry?: true
    birthHour?: true
    birthMinute?: true
    knowsBirthTime?: true
    residenceCity?: true
    residenceCountry?: true
    timezone?: true
    rectificationRequested?: true
    rectificationAcceptedUncertainty?: true
    rectificationStatus?: true
    rectificationRequestDate?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    birthDate?: true
    birthCity?: true
    birthCountry?: true
    birthHour?: true
    birthMinute?: true
    knowsBirthTime?: true
    residenceCity?: true
    residenceCountry?: true
    timezone?: true
    rectificationRequested?: true
    rectificationAcceptedUncertainty?: true
    rectificationStatus?: true
    rectificationRequestDate?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    birthDate?: true
    birthCity?: true
    birthCountry?: true
    birthHour?: true
    birthMinute?: true
    knowsBirthTime?: true
    residenceCity?: true
    residenceCountry?: true
    timezone?: true
    rectificationRequested?: true
    rectificationAcceptedUncertainty?: true
    rectificationStatus?: true
    rectificationRequestDate?: true
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
    createdAt: Date
    updatedAt: Date
    birthDate: Date | null
    birthCity: string | null
    birthCountry: string | null
    birthHour: number | null
    birthMinute: number | null
    knowsBirthTime: boolean
    residenceCity: string | null
    residenceCountry: string | null
    timezone: string | null
    rectificationRequested: boolean
    rectificationAcceptedUncertainty: boolean
    rectificationStatus: string | null
    rectificationRequestDate: Date | null
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
    createdAt?: boolean
    updatedAt?: boolean
    birthDate?: boolean
    birthCity?: boolean
    birthCountry?: boolean
    birthHour?: boolean
    birthMinute?: boolean
    knowsBirthTime?: boolean
    residenceCity?: boolean
    residenceCountry?: boolean
    timezone?: boolean
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: boolean
    rectificationRequestDate?: boolean
    rectificationEvents?: boolean | User$rectificationEventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    birthDate?: boolean
    birthCity?: boolean
    birthCountry?: boolean
    birthHour?: boolean
    birthMinute?: boolean
    knowsBirthTime?: boolean
    residenceCity?: boolean
    residenceCountry?: boolean
    timezone?: boolean
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: boolean
    rectificationRequestDate?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    birthDate?: boolean
    birthCity?: boolean
    birthCountry?: boolean
    birthHour?: boolean
    birthMinute?: boolean
    knowsBirthTime?: boolean
    residenceCity?: boolean
    residenceCountry?: boolean
    timezone?: boolean
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: boolean
    rectificationRequestDate?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    birthDate?: boolean
    birthCity?: boolean
    birthCountry?: boolean
    birthHour?: boolean
    birthMinute?: boolean
    knowsBirthTime?: boolean
    residenceCity?: boolean
    residenceCountry?: boolean
    timezone?: boolean
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: boolean
    rectificationRequestDate?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "image" | "createdAt" | "updatedAt" | "birthDate" | "birthCity" | "birthCountry" | "birthHour" | "birthMinute" | "knowsBirthTime" | "residenceCity" | "residenceCountry" | "timezone" | "rectificationRequested" | "rectificationAcceptedUncertainty" | "rectificationStatus" | "rectificationRequestDate", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rectificationEvents?: boolean | User$rectificationEventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      rectificationEvents: Prisma.$RectificationEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      image: string | null
      createdAt: Date
      updatedAt: Date
      birthDate: Date | null
      birthCity: string | null
      birthCountry: string | null
      birthHour: number | null
      birthMinute: number | null
      knowsBirthTime: boolean
      residenceCity: string | null
      residenceCountry: string | null
      timezone: string | null
      rectificationRequested: boolean
      rectificationAcceptedUncertainty: boolean
      rectificationStatus: string | null
      rectificationRequestDate: Date | null
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
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly birthDate: FieldRef<"User", 'DateTime'>
    readonly birthCity: FieldRef<"User", 'String'>
    readonly birthCountry: FieldRef<"User", 'String'>
    readonly birthHour: FieldRef<"User", 'Int'>
    readonly birthMinute: FieldRef<"User", 'Int'>
    readonly knowsBirthTime: FieldRef<"User", 'Boolean'>
    readonly residenceCity: FieldRef<"User", 'String'>
    readonly residenceCountry: FieldRef<"User", 'String'>
    readonly timezone: FieldRef<"User", 'String'>
    readonly rectificationRequested: FieldRef<"User", 'Boolean'>
    readonly rectificationAcceptedUncertainty: FieldRef<"User", 'Boolean'>
    readonly rectificationStatus: FieldRef<"User", 'String'>
    readonly rectificationRequestDate: FieldRef<"User", 'DateTime'>
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
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    birthDate: 'birthDate',
    birthCity: 'birthCity',
    birthCountry: 'birthCountry',
    birthHour: 'birthHour',
    birthMinute: 'birthMinute',
    knowsBirthTime: 'knowsBirthTime',
    residenceCity: 'residenceCity',
    residenceCountry: 'residenceCountry',
    timezone: 'timezone',
    rectificationRequested: 'rectificationRequested',
    rectificationAcceptedUncertainty: 'rectificationAcceptedUncertainty',
    rectificationStatus: 'rectificationStatus',
    rectificationRequestDate: 'rectificationRequestDate'
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


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
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
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    birthDate?: DateTimeNullableFilter<"User"> | Date | string | null
    birthCity?: StringNullableFilter<"User"> | string | null
    birthCountry?: StringNullableFilter<"User"> | string | null
    birthHour?: IntNullableFilter<"User"> | number | null
    birthMinute?: IntNullableFilter<"User"> | number | null
    knowsBirthTime?: BoolFilter<"User"> | boolean
    residenceCity?: StringNullableFilter<"User"> | string | null
    residenceCountry?: StringNullableFilter<"User"> | string | null
    timezone?: StringNullableFilter<"User"> | string | null
    rectificationRequested?: BoolFilter<"User"> | boolean
    rectificationAcceptedUncertainty?: BoolFilter<"User"> | boolean
    rectificationStatus?: StringNullableFilter<"User"> | string | null
    rectificationRequestDate?: DateTimeNullableFilter<"User"> | Date | string | null
    rectificationEvents?: RectificationEventListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    birthCity?: SortOrderInput | SortOrder
    birthCountry?: SortOrderInput | SortOrder
    birthHour?: SortOrderInput | SortOrder
    birthMinute?: SortOrderInput | SortOrder
    knowsBirthTime?: SortOrder
    residenceCity?: SortOrderInput | SortOrder
    residenceCountry?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    rectificationRequested?: SortOrder
    rectificationAcceptedUncertainty?: SortOrder
    rectificationStatus?: SortOrderInput | SortOrder
    rectificationRequestDate?: SortOrderInput | SortOrder
    rectificationEvents?: RectificationEventOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    birthDate?: DateTimeNullableFilter<"User"> | Date | string | null
    birthCity?: StringNullableFilter<"User"> | string | null
    birthCountry?: StringNullableFilter<"User"> | string | null
    birthHour?: IntNullableFilter<"User"> | number | null
    birthMinute?: IntNullableFilter<"User"> | number | null
    knowsBirthTime?: BoolFilter<"User"> | boolean
    residenceCity?: StringNullableFilter<"User"> | string | null
    residenceCountry?: StringNullableFilter<"User"> | string | null
    timezone?: StringNullableFilter<"User"> | string | null
    rectificationRequested?: BoolFilter<"User"> | boolean
    rectificationAcceptedUncertainty?: BoolFilter<"User"> | boolean
    rectificationStatus?: StringNullableFilter<"User"> | string | null
    rectificationRequestDate?: DateTimeNullableFilter<"User"> | Date | string | null
    rectificationEvents?: RectificationEventListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    birthCity?: SortOrderInput | SortOrder
    birthCountry?: SortOrderInput | SortOrder
    birthHour?: SortOrderInput | SortOrder
    birthMinute?: SortOrderInput | SortOrder
    knowsBirthTime?: SortOrder
    residenceCity?: SortOrderInput | SortOrder
    residenceCountry?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    rectificationRequested?: SortOrder
    rectificationAcceptedUncertainty?: SortOrder
    rectificationStatus?: SortOrderInput | SortOrder
    rectificationRequestDate?: SortOrderInput | SortOrder
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
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    birthDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    birthCity?: StringNullableWithAggregatesFilter<"User"> | string | null
    birthCountry?: StringNullableWithAggregatesFilter<"User"> | string | null
    birthHour?: IntNullableWithAggregatesFilter<"User"> | number | null
    birthMinute?: IntNullableWithAggregatesFilter<"User"> | number | null
    knowsBirthTime?: BoolWithAggregatesFilter<"User"> | boolean
    residenceCity?: StringNullableWithAggregatesFilter<"User"> | string | null
    residenceCountry?: StringNullableWithAggregatesFilter<"User"> | string | null
    timezone?: StringNullableWithAggregatesFilter<"User"> | string | null
    rectificationRequested?: BoolWithAggregatesFilter<"User"> | boolean
    rectificationAcceptedUncertainty?: BoolWithAggregatesFilter<"User"> | boolean
    rectificationStatus?: StringNullableWithAggregatesFilter<"User"> | string | null
    rectificationRequestDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
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

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    rectificationEvents?: RectificationEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
    rectificationEvents?: RectificationEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rectificationEvents?: RectificationEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rectificationEvents?: RectificationEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RectificationEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    birthDate?: SortOrder
    birthCity?: SortOrder
    birthCountry?: SortOrder
    birthHour?: SortOrder
    birthMinute?: SortOrder
    knowsBirthTime?: SortOrder
    residenceCity?: SortOrder
    residenceCountry?: SortOrder
    timezone?: SortOrder
    rectificationRequested?: SortOrder
    rectificationAcceptedUncertainty?: SortOrder
    rectificationStatus?: SortOrder
    rectificationRequestDate?: SortOrder
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
    createdAt?: SortOrder
    updatedAt?: SortOrder
    birthDate?: SortOrder
    birthCity?: SortOrder
    birthCountry?: SortOrder
    birthHour?: SortOrder
    birthMinute?: SortOrder
    knowsBirthTime?: SortOrder
    residenceCity?: SortOrder
    residenceCountry?: SortOrder
    timezone?: SortOrder
    rectificationRequested?: SortOrder
    rectificationAcceptedUncertainty?: SortOrder
    rectificationStatus?: SortOrder
    rectificationRequestDate?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    birthDate?: SortOrder
    birthCity?: SortOrder
    birthCountry?: SortOrder
    birthHour?: SortOrder
    birthMinute?: SortOrder
    knowsBirthTime?: SortOrder
    residenceCity?: SortOrder
    residenceCountry?: SortOrder
    timezone?: SortOrder
    rectificationRequested?: SortOrder
    rectificationAcceptedUncertainty?: SortOrder
    rectificationStatus?: SortOrder
    rectificationRequestDate?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    birthHour?: SortOrder
    birthMinute?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type RectificationEventCreateNestedManyWithoutUserInput = {
    create?: XOR<RectificationEventCreateWithoutUserInput, RectificationEventUncheckedCreateWithoutUserInput> | RectificationEventCreateWithoutUserInput[] | RectificationEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RectificationEventCreateOrConnectWithoutUserInput | RectificationEventCreateOrConnectWithoutUserInput[]
    createMany?: RectificationEventCreateManyUserInputEnvelope
    connect?: RectificationEventWhereUniqueInput | RectificationEventWhereUniqueInput[]
  }

  export type RectificationEventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RectificationEventCreateWithoutUserInput, RectificationEventUncheckedCreateWithoutUserInput> | RectificationEventCreateWithoutUserInput[] | RectificationEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RectificationEventCreateOrConnectWithoutUserInput | RectificationEventCreateOrConnectWithoutUserInput[]
    createMany?: RectificationEventCreateManyUserInputEnvelope
    connect?: RectificationEventWhereUniqueInput | RectificationEventWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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
    in?: string[]
    notIn?: string[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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
    in?: number[] | null
    notIn?: number[] | null
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

  export type UserCreateWithoutRectificationEventsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
  }

  export type UserUncheckedCreateWithoutRectificationEventsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    birthDate?: Date | string | null
    birthCity?: string | null
    birthCountry?: string | null
    birthHour?: number | null
    birthMinute?: number | null
    knowsBirthTime?: boolean
    residenceCity?: string | null
    residenceCountry?: string | null
    timezone?: string | null
    rectificationRequested?: boolean
    rectificationAcceptedUncertainty?: boolean
    rectificationStatus?: string | null
    rectificationRequestDate?: Date | string | null
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
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateWithoutRectificationEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthCity?: NullableStringFieldUpdateOperationsInput | string | null
    birthCountry?: NullableStringFieldUpdateOperationsInput | string | null
    birthHour?: NullableIntFieldUpdateOperationsInput | number | null
    birthMinute?: NullableIntFieldUpdateOperationsInput | number | null
    knowsBirthTime?: BoolFieldUpdateOperationsInput | boolean
    residenceCity?: NullableStringFieldUpdateOperationsInput | string | null
    residenceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequested?: BoolFieldUpdateOperationsInput | boolean
    rectificationAcceptedUncertainty?: BoolFieldUpdateOperationsInput | boolean
    rectificationStatus?: NullableStringFieldUpdateOperationsInput | string | null
    rectificationRequestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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