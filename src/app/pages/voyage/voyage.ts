import { Bateau } from "../bateau/bateau"
import { Port } from "../port/port"

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
