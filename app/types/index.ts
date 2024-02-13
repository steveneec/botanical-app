export type plantaType = {
    id: number;
    nombre: string;
    nombre_c: string;
    descripcion: string;
    url_foto: string;
    id_categoria: categoriaType[] | number;
    precio?: number;
}

export type categoriaType = {
    id: number;
    nombre: string;
}

export type plantaCompradaType = {
    id: number;
    apodo: string;
    id_planta: plantaType | number;
    id_usuario: usuarioType | number;
    encargado: usuarioType | number;
    id_zona: zonaType | number;
}

export type zonaType = {
    id: number;
    nombre: string;
    descripcion: string;
    coordenadas: string;
}

export type usuarioType = {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    rol: string;
    f_nac: string;
    genero: string;
    id_planes: string | number;
}

export type planType = {
    id: number;
    nombre: string;
    precio: number; ///
    descripcion: string;
}

export type precioType = {
    id: number;
    precio: number;
    id_plan: planType
}

export type hitoType = {
    id: number;
    descripcion: string;
    descripcion_corta: string;
    f_hito: string;
    url_foto: string;
    id_planta: planType | number;
}