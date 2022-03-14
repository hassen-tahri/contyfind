import { Chargeur } from "../chargeur/chargeur"
import { Inspecteur } from "../inspecteur/inspecteur"
import { TypeRemorque } from "../type/type-remorque"
import { Unite } from "../unite/unite"
import { Voyage } from "../voyage/voyage"

export class Constat {
    id: number

    remorqueCode: number

    plombCode: number

    remarque: string

    expertise: boolean

    interchange: boolean

    dateChargement : Date;
	
	dateDechargement : Date;

    etat : string

    voyage: Voyage

    unite : Unite

    chargeur: Chargeur

    inspecteurChargement: Inspecteur

    inspecteurDechargement: Inspecteur
}
