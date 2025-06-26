import {TipoUsuario} from "../infraestructure/entities/User";

export interface User {
  id_usuario: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  direccion?: string;
  ciudad?: string;
  departamento?: string;
  tipo_usuario: TipoUsuario;
  fecha_registro: Date;
  activo: boolean;
}
