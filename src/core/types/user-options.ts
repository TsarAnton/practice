import { IPaginationOptions } from "./common/pagination-options";
import { ISortingOptions } from "./common/sorting-options";

export interface IUserOptions {
    filter?: {
        login?: string;
        password?: string;
    }
    sorting?: ISortingOptions;
    pagination?: IPaginationOptions;
}