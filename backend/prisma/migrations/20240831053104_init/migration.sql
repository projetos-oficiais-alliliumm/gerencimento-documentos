-- CreateTable
CREATE TABLE "Setor" (
    "id" SERIAL NOT NULL,
    "Sigla" VARCHAR(10) NOT NULL,
    "DescSetor" VARCHAR(60) NOT NULL,

    CONSTRAINT "Setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tramitacao" (
    "id" SERIAL NOT NULL,
    "Documento_id" INTEGER NOT NULL,
    "DataHoraEnvio" TIMESTAMP(3) NOT NULL,
    "DataHoraRecebe" TIMESTAMP(3) NOT NULL,
    "Setor_Envio_id" INTEGER NOT NULL,
    "Setor_Recebe_id" INTEGER NOT NULL,

    CONSTRAINT "Tramitacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" SERIAL NOT NULL,
    "NbDocumento" VARCHAR(10) NOT NULL,
    "Titulo" VARCHAR(40) NOT NULL,
    "DescDocumento" VARCHAR(255) NOT NULL,
    "DataDocumento" TIMESTAMP(3) NOT NULL,
    "PathArquivoPDF" VARCHAR(100) NOT NULL,
    "TipoDocumento_id" INTEGER NOT NULL,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoDocumento" (
    "id" SERIAL NOT NULL,
    "DescTipoDocumento" VARCHAR(30) NOT NULL,

    CONSTRAINT "TipoDocumento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tramitacao" ADD CONSTRAINT "Tramitacao_Setor_Envio_id_fkey" FOREIGN KEY ("Setor_Envio_id") REFERENCES "Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tramitacao" ADD CONSTRAINT "Tramitacao_Setor_Recebe_id_fkey" FOREIGN KEY ("Setor_Recebe_id") REFERENCES "Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tramitacao" ADD CONSTRAINT "Tramitacao_Documento_id_fkey" FOREIGN KEY ("Documento_id") REFERENCES "Documento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_TipoDocumento_id_fkey" FOREIGN KEY ("TipoDocumento_id") REFERENCES "TipoDocumento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
