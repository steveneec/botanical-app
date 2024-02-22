export type plantaType = {
    id: number;
    nombre: string;
    nombre_c: string;
    descripcion: string;
    url_foto: string;
    categories: categoriaType;
    precio?: number;
    discount?: number;
}

export type categoriaType = {
    id: number;
    nombre: string;
}

export type plantaCompradaType = {
    id: number;
    apodo: string;
    plants: plantaType | number;
    users: usuarioType | number;
    encargado: usuarioType | number;
    zones: zonaType | number;
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
    plansId: number;
    token_not: string;
    uid: string;
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
    des_corta: string;
    f_hito: string;
    url_foto: string;
    id_planta: planType | number;
}

export type planDetail = {
    id: number,
    name: string,
    description: string,
    shortDescription: string,
    plantsInclude: number,
    plantPrice: number,
    price: number,
    benefits: string[]
}

export type billType = {
    f_compra: string,
    tipo_compra: "plan" | "plant",
    plansId?: number,
    plants?: plantaType;
    total: number
}