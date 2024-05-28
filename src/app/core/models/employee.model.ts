import { CivilStatusValue, TypeIdentificationValue } from "@core/constants/options";

export interface Employee {
  id: number; // Un identificador único para cada empleado
  firstName: string; // Nombre del empleado
  lastName: string; // Apellidos del empleado
  position: string; // Puesto de trabajo del empleado
  dateOfBirth: Date; // Fecha de nacimiento del empleado
  hireOfDate: Date; // Fecha de contratación del empleado
  salary: number; // Salario del empleado
  department: string; // Departamento al que pertenece el empleado
  email: string; // Correo electrónico del empleado
  phoneNumber: string; // Número de teléfono del empleado
  address: string; // Dirección del empleado
  identificationType: TypeIdentificationValue; // Tipo de identificación del empleado
  identificationNumber: string; // Número de identificación del empleado
  civilStatus: CivilStatusValue; // Estado civil del empleado
  children: boolean; // Tiene hijos
  numberOfChildren: number; // Número de hijos
  sex: string; // Sexo del empleado
}

export interface Positions {
  positions: string[];
}
