import { CatalogPage } from '../CatalogPage';
import { CatalogLayout } from './CatalogLayout';

export class FrontPageFeaturedLayout extends CatalogLayout
{
    constructor()
    {
        super('frontpage_featured');
    }

    public composeCatalogLayout(page: CatalogPage): any[]
    {
        return [
            this.name,
            1,
            page.imageHeader,
            3,
            page.textHeader, page.textDetails, page.textTeaser
        ];
    }
}