import { CatalogPage } from '../CatalogPage';
import { CatalogLayout } from './CatalogLayout';

export class ClubBuyLayout extends CatalogLayout
{
    constructor()
    {
        super('club_buy');
    }

    public composeCatalogLayout(page: CatalogPage): any[]
    {
        return [
            this.name,
            1,
            page.imageHeader, page.imageTeaser,
            0
        ];
    }
}