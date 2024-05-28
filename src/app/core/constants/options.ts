export const TYPE_IDENTIFICATION = [
  { value: 'CC', label: 'Cédula de ciudadanía' },
  { value: 'CE', label: 'Cédula de extranjería' },
  { value: 'PA', label: 'Pasaporte' },
  { value: 'RC', label: 'Registro civil' },
  { value: 'TI', label: 'Tarjeta de identidad' }
];

export const CIVIL_STATUS = [
  { value: 'S', label: 'Soltero' },
  { value: 'C', label: 'Casado' },
  { value: 'D', label: 'Divorciado' },
  { value: 'V', label: 'Viudo' }
];

export type TypeIdentificationValue = 'CC' | 'CE' | 'PA' | 'RC' | 'TI';
export type CivilStatusValue = 'S' | 'C' | 'D' | 'V';
