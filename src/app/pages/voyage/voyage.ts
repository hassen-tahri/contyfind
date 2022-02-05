import { Bateau } from "../parametrage/bateau/bateau";
import { Port } from "../parametrage/port/port";

export class Voyage {
    id: number
    code: string
    etat: string
    archive : Boolean
    dateChargement: Date
    dateDechargement: Date
    bateau: Bateau
    portChargement: Port
    portDechargement: Port
}