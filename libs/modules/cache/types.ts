export type RedisKeyArgument = string | Buffer;
export type RedisValeuArgument = string | Buffer;

export type RedisKeyValue = {
  key: RedisKeyArgument;
  value: RedisValeuArgument | RedisValeuArgument[];
};
