import { Dommage } from "../../dommage/dommage"
import { Constat } from "../../list-constat/constat"

export class DommageItem {
    position: string
    detail: string
    longeur: string
    largeur: String
    anciennete: String
    dommageValue: string
    dommage: Dommage
    constat: Constat
}
