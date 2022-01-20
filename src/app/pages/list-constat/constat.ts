import { Chargeur } from "../chargeur/chargeur"
import { Inspecteur } from "../inspecteur/inspecteur"
import { TypeRemorque } from "../parametrage/type/typeRemorque"
import { Voyage } from "../voyage/voyage"

export class Constat {
    id: number

    remorqueCode: number

    plombCode: number

    remarque: string

    expertise: boolean

    interchange: boolean

    file: string

    etat : string

    voyage: Voyage

    typeRemorque: TypeRemorque

    chargeur: Chargeur

    inspecteurChargement: Inspecteur

    inspecteurDechargement: Inspecteur
}
