import { CatalogPage } from '../CatalogPage';
import { CatalogLayout } from './CatalogLayout';

export class GroupFurniLayout extends CatalogLayout
{
    constructor()
    {
        super('guild_custom_furni');
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