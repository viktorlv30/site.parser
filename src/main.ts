/**
 * Created by viktor on 21.06.2018
 */

import 'source-map-support/register';
import * as XRay from 'x-ray';
import * as fs from 'fs';
import { join } from 'path';
import * as request from 'request';
import { Selector } from './selector.definitions';
import { ICategory } from './Interfaces/ICategory';
import * as url from 'url';

//to disable checking https certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//need to show all unhandled errors in promises
process.on('unhandledRejection', (exception: Error) => {
    console.error('[RIK UNHANDLED REJECTION]', exception);
});

const configuration = JSON.parse(fs.readFileSync(join(__dirname, '..', 'config.scrapper.json'), { encoding: 'utf8' }));
const xray = XRay();
const s: Selector = Selector.Instance;

const sites: string[] = configuration.origins;
sites.forEach(origin => {
    xray(
        origin,
        {
            categories: xray(s.MainCategoryBlock, [{
                name: s.MainCategoryName,
                link: s.MainCategoryLink,
                subcategories: /*'undefined' ||*/ xray(s.SubCategoryBlock, [{
                    link: s.SubCategoryLink,
                    name: s.SubCategoryName,
                    views: s.SubCategoryViews
                }]),
            }]),
        }
    )
        // .write(join(__dirname, '..', 'results', (url.parse(origin).port || Date.now().toString()) + '.categories.json'))
        ((error: Error, data: { categories: ICategory[] }) => {
            if (error) {
                console.error(error);
            } else {
                data.categories.forEach((catg, i) => {
                    console.log(i + 1, catg.link);
                });
            }
            // data.forEach((catg, index) => {
            //load pictures
            // request(src.firstImageSource)
            //     .pipe(
            //         fs.createWriteStream(`cars/${src.id}_${index}.jpg`)
            //     );
            // });
        });


})
