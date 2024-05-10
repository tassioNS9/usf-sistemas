export interface User {
    id: String;
    name: string;
    cpf: string;
    office: string;
}

/*id            String        @id @default(uuid())
name          String
cpf           String        @unique
password      String
id_unit       String
unit          Unit          @relation(fields: [id_unit], references: [id], onDelete: Cascade)
office        String*/