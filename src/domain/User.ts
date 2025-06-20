export interface User {
  id_usuario: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  direccion?: string;
  ciudad?: string;
  departamento?: string;
  tipo_usuario: string;
  fecha_registro: Date;
  activo: boolean;
}
