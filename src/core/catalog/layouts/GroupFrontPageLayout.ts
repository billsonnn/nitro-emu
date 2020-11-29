import { CatalogPage } from '../CatalogPage';
import { CatalogLayout } from './CatalogLayout';

export class GroupFrontpageLayout extends CatalogLayout
{
    constructor()
    {
        super('guild_frontpage');
    }

    public composeCatalogLayout(page: CatalogPage): any[]
    {
        return [
            this.name,
            2,
            page.imageHeader, page.imageTeaser,
            3,
            page.textHeader, page.textDetails, page.textTeaser
        ];
    }
}