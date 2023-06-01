import { IPaginationOptions } from "./common/pagination-options";
import { ISortingOptions } from "./common/sorting-options";

export interface IMeetupOptions {
    filter?: {
        name?: string;
        description?: string;
        time?: Date;
        place?: string;
        tags?: number[];
    }
    sorting?: ISortingOptions;
    pagination?: IPaginationOptions;
}