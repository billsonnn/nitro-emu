import { CatalogPage } from '../CatalogPage';
import { CatalogLayout } from './CatalogLayout';

export class DefaultLayout extends CatalogLayout
{
    constructor()
    {
        super('default_3x3');
    }

    public composeCatalogLayout(page: CatalogPage): any[]
    {
        return [
            this.name,
            3,
            page.imageHeader, page.imageTeaser, page.imageSpecial,
            3,
            page.textHeader, page.textDetails, page.textTeaser
        ];
    }
}