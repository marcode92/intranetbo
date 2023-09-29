export interface Approver {
    nome: string;
    cognome: string;
}

export interface Personale {
    codiceFiscale: string,
    cognome: string,
    nome: string,
    accountDipvvf: string,
    emailVigilfuoco: string,
    qualifica: {
        nome: string,
        gruppo: {
            codice: string,
            descrizione: string
        },
        codSettore: string,
        codice: string,
        descrizione: string
    },
    sede: {
        id: string,
        codice: string,
        codDistaccamento: string,
        descrizione: string
    },
    specializzazioni: [
        {
            codice: string,
            descrizione: string,
            dataInizioValidita: string,
            dataFineValidita: string
        }
    ],
    turno: string,
    saltoTurno: string,
    tipoPersonale: {
        codice: string,
        descrizione: string
    }
}