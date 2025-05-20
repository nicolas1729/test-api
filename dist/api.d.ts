import { paths } from "./types/petstore";
type PickDefined<Object> = Pick<Object, {
    [key in keyof Object]: Object[key] extends undefined ? never : key;
}[keyof Object]>;
type FetchOptions<Method, Query, Params> = RequestInit & {
    method: Method;
} & PickDefined<{
    query: Query;
    params: Params;
}>;
type ApplicationJson = {
    "application/json": any;
};
type ResponseWithStatus<Status extends number> = {
    responses: Record<Status, {
        content: ApplicationJson;
    }>;
};
type SuccessResponse<Endpoint> = Endpoint extends ResponseWithStatus<200> ? Endpoint["responses"][200]["content"]["application/json"] : Endpoint extends ResponseWithStatus<201> ? Endpoint["responses"][201]["content"]["application/json"] : null;
type QueryParameters<Endpoint> = Endpoint extends {
    parameters: {
        query: object;
    };
} ? Endpoint["parameters"]["query"] : undefined;
type PathParameters<Endpoint> = Endpoint extends {
    parameters: {
        path: object;
    };
} ? Endpoint["parameters"]["path"] : undefined;
export declare function fetchApi2<Path extends keyof paths, Method extends keyof paths[Path]>(path: Path, options: FetchOptions<Method, QueryParameters<paths[Path][Method]>, PathParameters<paths[Path][Method]>>): Promise<SuccessResponse<paths[Path][Method]>>;
export {};
