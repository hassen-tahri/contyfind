import { Dommage } from "../../dommage/dommage"
import { Constat } from "../../list-constat/constat"

export class DommageItem {
    id : number
    position: string
    detail: string
    longeur: string
    largeur: string
    anciennete: string
    unite : string
    dommageValue: string
    phase : string
    dommage: Dommage
    constat: Constat
}
