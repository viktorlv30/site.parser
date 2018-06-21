/**
 * Created by viktor on 21.06.2018
 */

/**
 * @class Selector is Singleton
 */
export class Selector {
    private static _instance: Selector;

    private constructor() {
        if (Selector._instance) {
            throw new TypeError(`Invalid usage. Singleton`);
        }
    }

    static get Instance(): Selector {
        if (!Selector._instance) {
            return this._instance = new Selector();
        }
        return this._instance;
    }

    get MainCategoryBlock(): string {
        return '.cs_directory_categories > ul > li';
    }

    get MainCategoryLink(): string {
        return '.cat-inner:first-child a@href';
    }

    get MainCategoryName(): string {
        return '.cat-inner:first-child a';
    }

    get SubCategoryBlock(): string {
        //this block included into main
        return 'ul li';
    }

    get SubCategoryLink(): string {
        return '> a@href';
    }

    get SubCategoryName(): string {
        return '> a';
    }

    get SubCategoryViews(): string {
        return '> span';
    }
}
