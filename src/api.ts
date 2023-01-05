import { components, paths } from "./types/petstore"


console.log("test");
(async ()=> {
    const response = await fetch("https://petstore3.swagger.io/api/v3/pet/10");
    const pet = await response.json();
    console.log(pet.name)
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

export async function fetchApi <Path extends keyof paths, Method extends keyof paths[Path]>(path: Path, options: FetchOptions<Method, QueryParameters<paths[Path][Method]>, PathParameters<paths[Path][Method]>>): 
Promise<SuccessResponse<paths[Path][Method]>> {
    return await fetch(path, options).then(res => res.json());
}


async function demo() {
    const data = await fetchApi("/pet/{petId}", {method: "get", params: {petId: 123}});
}

async function demo2() {
    const data = await fetchApi("/pet/findByStatus", {method: "get"});
}


