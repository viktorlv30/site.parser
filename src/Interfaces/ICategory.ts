/**
 * Created by viktor on 21.06.2018
 */
import { ILinkable } from './ILinkable';
import { ISubCategory } from './ISubCategory';

export interface ICategory extends ILinkable {
    subcategories: ISubCategory[];
}
