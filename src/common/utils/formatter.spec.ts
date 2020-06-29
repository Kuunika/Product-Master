import { readFileSync } from "fs";
import { toProduct, toOclProducts } from "./formatters";
import { ListOfOclConcepts } from "../interfaces/list-of-ocl-concepts.interface";

function fixtures(): ListOfOclConcepts {
    const path = "test/fixtures/concepts.json";
    const rawData = readFileSync(path, { encoding: "utf-8" });
    return JSON.parse(rawData);
}

describe("#formatters test", () => {
    const concepts: ListOfOclConcepts = fixtures();

    it("~should be able to format a product", () => {
        const product = toProduct(concepts.concepts[0]);
        expect(typeof product.productName).toBe('string');
    });

    it("~should be able to format product mappings", () => {
        const product = toProduct(concepts.concepts[0]);
        expect(product.mappings.length).toBeTruthy();
    })

    it("~should be able to format a list of products", () => {
        const products = toOclProducts(concepts);
        expect(products.products.length).toBeTruthy();
    });
});