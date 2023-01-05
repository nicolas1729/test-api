"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchApi = void 0;
console.log("test");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("https://petstore3.swagger.io/api/v3/pet/10");
    const pet = yield response.json();
    console.log(pet.name);
}))();
function fetchApi(path, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(path, options).then(res => res.json());
    });
}
exports.fetchApi = fetchApi;
function demo() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetchApi("/pet/{petId}", { method: "get", params: { petId: 123 } });
    });
}
function demo2() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetchApi("/pet/findByStatus", { method: "get" });
    });
}
