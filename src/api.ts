import { components, paths } from "./types/petstore"
import { createPathBasedClient } from "openapi-fetch";
import { fetchApi } from './fetchApi'

console.log("test");
(async ()=> {

    //classic
    const response2 = await fetch("https://petstore3.swagger.io/api/v3/pet/10");
    const pet = await response2.json();

    //fetchApi
    type Category = components["schemas"]["Category"];
    const dataFetchApi = await fetchApi("/pet/{petId}", {method: "get", params: {petId: 4}});
    let category:Category;
    if(dataFetchApi.category) {
        category = dataFetchApi.category;
    }

    //open-api
    const client = createPathBasedClient<paths>({
        baseUrl: "https://petstore3.swagger.io/api/v3/",
    });
    const { data:components, error, response } = await client["/pet/{petId}"].GET({params: {path: { petId: 4 }}});
})()










type PickDefined<Object> = Pick<Object, {[key in keyof Object]: Object[key] extends undefined ? never : key}[keyof Object]>
type QueryParameter<Endpoint> = Endpoint extends {parameters: {query:object}} ? Endpoint["parameters"]["query"] : undefined

//type FetchOptions<Method, Endpoint> = RequestInit & {method: Method, query: QueryParameter<Endpoint>}
type FetchOptions<Method, Query, Params> = RequestInit & {method: Method} & PickDefined<{query: Query, params: Params}>

type ApplicationJson = {"application/json": any};
type Status200 = {200:{content: ApplicationJson}};
type Status201 = {201:{content: ApplicationJson}};
type Status200ou201 = Status200 | Status201;
type ResponseWithStatus<Status extends number> = {responses: Record<Status, {content: ApplicationJson}>}

//type SuccessResponseWithStatus<Endpoint> = Endpoint["responses"][Status]["content"]["application/json"]

type SuccessResponse<Endpoint> = Endpoint extends ResponseWithStatus<200> ?
 Endpoint["responses"][200]["content"]["application/json"] : 
 Endpoint extends ResponseWithStatus<201> ?
 Endpoint["responses"][201]["content"]["application/json"] : null


type SuccessResponseBody<P> = P extends {responses: {"200": {"application/json": infer T}}} ? T : undefined

type QueryParameters<Endpoint> = Endpoint extends {parameters: {query: object}} ? Endpoint["parameters"]["query"] : undefined
type PathParameters<Endpoint> = Endpoint extends {parameters: {path: object}} ? Endpoint["parameters"]["path"] : undefined

export async function fetchApi2 <Path extends keyof paths, Method extends keyof paths[Path]>(path: Path, options: FetchOptions<Method, QueryParameters<paths[Path][Method]>, PathParameters<paths[Path][Method]>>): 
Promise<SuccessResponse<paths[Path][Method]>> {
    return await fetch(path, options).then(res => res.json());
}
