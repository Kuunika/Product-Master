import { OclConcept } from "./ocl-concept.interface";

export interface ListOfOclConcepts {
    totalNumberOfConcepts: number;
    currentPage: number;
    totalNumberOfPages: number;
    concepts: OclConcept[];
}