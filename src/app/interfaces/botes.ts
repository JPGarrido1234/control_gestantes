export interface IBotes {
    codigo?: string
}

export interface ITomas {
    lactante?: string,
    botes?: IBotes[],
    fecha?: Date
}


//OFFLINE
export interface ILactante {
    id?: number, 
    codigo?: string,
    apellidos?: string,
    nombre?: string,
    numero_pulsera?: string,
    administraciones?: IAdministracion[]
}

export interface IAdministracion {
    id?: number,
    horaToma?: Date,
    administrada?: boolean,
    codigoLactante?: string,
    recipienteACodigoBarras?: string,
    recipienteAleche?: string,
    recipienteATipo?: string,
    recipienteACodigo?: string,
    recipienteAVolumen?: number,
    recipienteBCodigoBarras?: string,
    recipienteBleche?: string,
    recipienteBTipo?: string,
    recipienteBCodigo?: string,
    recipienteBVolumen?: number,
    errorBote1?: boolean,
    errorBote2?: boolean
}

export interface ILactanteValidate {
    id?: number,
    codigo?: string,
    nombre?: string,
    apellidos?: string,
    numero_pulsera: string,
    administracion: {
        id?: number,
        horaToma?: Date,
        preparada?: boolean,
        administrada?: boolean,
        codigoLactante?: string,
        pulseraLactante?: string,
        recipienteACodigoBarras?: string,
        recipienteALeche?: string,
        recipienteATipoLeche?: number,
        recipienteATipo?: string,
        recipienteACodigo?: string,
        recipienteAVolumen?: number,
        recipienteBCodigoBarras?: string,
        recipienteBLeche?: string,
        recipienteBTipoLeche?: number,
        recipienteBTipo?: string,
        recipienteBCodigo?: string,
        recipienteBVolumen?: number
    }
}
