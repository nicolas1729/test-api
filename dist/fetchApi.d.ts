import { paths } from "./types/petstore";
type KeysOfUnion<T> = T extends T ? keyof T : never;
type Get<T extends any, K extends any[], D = never> = K extends [] ? T : K extends [infer A, ...infer B] ? A extends keyof T ? Get<T[A], B> : D : D;
type RequiredKeys<T> = {
    [K in keyof T]-?: T extends Record<K, T[K]> ? K : never;
}[keyof T];
type AllRequiredKey<T> = {
    [K in keyof T]: RequiredKeys<T[K]> extends never ? K : never;
}[keyof T];
type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;
type OptionalDeep<T> = Optional<T, AllRequiredKey<T>>;
type PickDefined<T> = Pick<T, {
    [K in keyof T]: T[K] extends never ? never : K;
}[keyof T]>;
export type Paths = keyof paths;
type HTTPSuccess = 200 | 201 | 204;
export type Methods = KeysOfUnion<paths[keyof paths]>;
export type ApiResponse<Path, Method, Type = "application/json"> = Get<paths, [
    Path,
    Method,
    "responses",
    HTTPSuccess,
    "content",
    Type
]>;
type ApiParam<Path, Method, Parameter> = Get<paths, [
    Path,
    Method,
    "parameters",
    Parameter
]>;
type ApiRequestBody<Path, Method, Type = "application/json"> = Get<paths, [
    Path,
    Method,
    "requestBody",
    "content",
    Type
]>;
export type FetchOptions<Path, Method> = RequestInit & {
    method?: Method;
    headers?: Record<string, string>;
} & OptionalDeep<PickDefined<{
    query: ApiParam<Path, Method, "query">;
    params: ApiParam<Path, Method, "path">;
    json: ApiRequestBody<Path, Method, "application/json">;
}>>;
export declare function fetchApi<Path extends Paths, Method extends Methods = "get">(path: Path, options?: FetchOptions<Path, Method>, baseUrl?: string): Promise<ApiResponse<Path, Method>>;
export {};
