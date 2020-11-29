import { CatalogPage } from '../CatalogPage';
import { CatalogLayout } from './CatalogLayout';

export class PetInfoLayout extends CatalogLayout
{
    constructor()
    {
        super('info_pets');
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