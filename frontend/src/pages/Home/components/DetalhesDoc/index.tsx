import { useEffect, useState } from "react";
import Api from "../../../../api";
import axios from "axios";
import Modal from "../../../../components/global/Modal";
import { Container, ContainerBox } from "../../../../components/global/Container";
import { Button } from "../../../../components/global/Button";
import { Label } from "../../../../components/global/Label";
import { Input, TextArea } from "../../../../components/global/Input";
import { Form } from "react-bootstrap";
import down from "../../../assets/down.png";

const { api } = Api();

// Modal Alterar Documento
const styledContainerDiv = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
  marginBottom: "20px",
  width: "100%",
};
const styledBotaoDiv = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "20px",
  marginBottom: "20px",
  width: "100%",
};
// Margem entre inputs
const styledEntreDiv = {
  marginRight: "20px",
};
// Modal Detail Documento
const styledContDiv = {
  padding: "20px",
};
const styleDivRow = {
  display: "flex",
  padding: "5px",
};
const styleRowSpan = {
  marginRight: "10px",
};
const styleInpRowH = {
  padding: "5px",
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  borderRadius: "7px",
};

type DetalhesDocType = {
  selectedDoc: any | null;
  openModalDetails: boolean;
  setOpenModalDetails: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveSuccess: () => void;
};
type optionTipoDoc = {
    id: string | number,
    DescTipoDocumento: string;
}[];

const DetalhesDoc = ({
  selectedDoc,
  openModalDetails,
  setOpenModalDetails,
  onSaveSuccess,
}: DetalhesDocType) => {
  const [openModalErro, setOpenModalErro] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [optionTipoDoc, setOptionTipoDoc] = useState<optionTipoDoc>([]);

  const [records, setRecords] = useState(null);

  const [dataUpdate, setDataUpdate] = useState<any | null>(null);

  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [dataDocumento, setDataDocumento] = useState("");
  const [descricao, setDescricao] = useState(""); // Adiciona estado para descrição
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    numeroDocumento: "",
    titulo: "",
    tipo: "",
    dataDocumento: "",
    arquivo: "",
  });

  const fetchRecordsDetails = () => {
    if (selectedDoc) {
      axios
        .get(api("/documento/" + selectedDoc))
        .then((res) => {
          const { response } = res.data;
          setRecords(res.data);
          setDataUpdate({
            NbDocumento: response.NbDocumento,
            Titulo: response.Titulo,
            id: response.id,
            PathArquivoPDF: response.PathArquivoPDF,
            arquivoUrl: res.data.arquivoUrl,
            DescDocumento: response.DescDocumento,
            DescTipoDocumento: response.TipoDocumento?.DescTipoDocumento,
            TipoDocumento_id: response.TipoDocumento_id,
            DataDocumento: response.DataDocumento
              ? response.DataDocumento.substring(0, 10)
              : "Data não disponível",
            status: "",
          });
          // Preenche os campos do modal
          setNumeroDocumento(response.NbDocumento);
          setTitulo(response.Titulo);
          setTipo(response.TipoDocumento_id);
          setDataDocumento(
            response.DataDocumento
              ? response.DataDocumento.substring(0, 10)
              : ""
          );
          setDescricao(response.DescDocumento);
        })
        .catch((error) => {
          setOpenModalErro(true);
          console.log(error);
        });
    }
  };

  useEffect(() => {
    fetchRecordsDetails();
  }, [selectedDoc, openModalDetails]);

  useEffect(() => {
    axios
      .get(api("/documento/tipo/all"))
      .then((res) => {
        setOptionTipoDoc(res.data);
      })
      .catch((error) => {
        setOpenModalErro(true);
        console.log(error);
      });
  }, []);

  const validateForm = () => {
    const newErrors = errors;

    if (!numeroDocumento)
      newErrors.numeroDocumento = "Número do documento é obrigatório";
    if (!titulo) newErrors.titulo = "Título é obrigatório";
    if (!tipo) newErrors.tipo = "Tipo é obrigatório";
    if (!dataDocumento)
      newErrors.dataDocumento = "Data do documento é obrigatória";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormDocAction = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("nb", numeroDocumento);
    formData.append("titulo", titulo);
    formData.append("desc", descricao);
    formData.append("tipoid", tipo);
    formData.append("dataDocumento", dataDocumento);
    if (arquivo) formData.append("arquivo", arquivo);

    try {
      let response;
      const requestOptions = {
        method: "PUT",
        body: formData,
      };

      response = await fetch(
        api(`/documento/${dataUpdate.id}`),
        requestOptions
      );

      if (response.ok) {
        console.log(`Documento alterado com sucesso!`);
        setOpenModal(false);
        onSaveSuccess(); // Notifica o pai para atualizar
        fetchRecordsDetails(); // Garante que o modal de detalhes seja reaberto
      } else {
        throw new Error("Erro ao enviar o formulário");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  const handleDelete = async () => {
    try {
      let response;
      const requestOptions = {
        method: "DELETE",
      };

      response = await fetch(
        api(`/documento/${dataUpdate.id}`),
        requestOptions
      );

      if (response.ok) {
        console.log(`Documento excluído com sucesso!`);
        setOpenModalDetails(false);
        onSaveSuccess();
      } else {
        throw new Error("Erro ao enviar o formulário");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  return (
    <>
      <Modal
        // mw='50vh'
        // mh='20vh'
        isOpen={openModalDetails}
        childrenTitle="Documento"
        setModalOpen={() => setOpenModalDetails(!openModalDetails)}
      >
        <Container wd="9">
          <ContainerBox style={styledContDiv}>
            <div style={styleDivRow}>
              <span style={styleRowSpan}>
                <p style={{ marginBottom: "0.5rem" }}>Número do Documento:</p>
                <div style={styleInpRowH}>{dataUpdate?.NbDocumento}</div>
              </span>
              <span style={styleRowSpan}>
                <p style={{ marginBottom: "0.5rem" }}>Título:</p>
                <div style={styleInpRowH}>{dataUpdate?.Titulo}</div>
              </span>
            </div>
            <div style={styleDivRow}>
              <span style={styleRowSpan}>
                <p style={{ marginBottom: "0.5rem" }}>Tipo:</p>
                <div style={styleInpRowH}>{dataUpdate?.DescTipoDocumento}</div>
              </span>
              <span style={styleRowSpan}>
                <p style={{ marginBottom: "0.5rem" }}>Data:</p>
                <div style={styleInpRowH}>{dataUpdate?.DataDocumento}</div>
              </span>
            </div>
            <div style={styleDivRow}>
              <span style={styleRowSpan}>
                <p style={{ marginBottom: "0.5rem" }}>Descrição:</p>
                <div style={styleInpRowH}>{dataUpdate?.DescDocumento}</div>
              </span>
            </div>
            <div style={{ width: "50px", height: "50px" }}>
              {dataUpdate?.PathArquivoPDF && (
                <p>
                  <a href={dataUpdate.arquivoUrl} download>
                    <img src={down} />
                  </a>
                </p>
              )}
            </div>
            <div>
              <Button
                txtC="#1b3e75"
                bgC="#caf1ff75"
                bgHC="#e7cf11"
                mr=""
                hg="38px"
                onClick={() => setOpenModal(true)}
              >
                Alterar
              </Button>
              <Button
                txtC="#1b3e75"
                bgC="#caf1ff75"
                bgHC="#e70d0d"
                mr="10px"
                hg="38px"
                onClick={() => handleDelete()}
              >
                Excluir
              </Button>
            </div>
            <input value={selectedDoc} type="hidden" id="idDocumento" />
          </ContainerBox>
        </Container>

        <Modal
          isOpen={openModal}
          childrenTitle="Alterar Documento"
          setModalOpen={() => setOpenModal(!openModal)}
        >
          <Container wd="9">
            <div style={styledContainerDiv}>
              <div style={styledEntreDiv}>
                <Label>Número Documento</Label>
                <Input
                  type="text"
                  value={numeroDocumento}
                  onChange={(e) => setNumeroDocumento(e.target.value)}
                />
                {errors.numeroDocumento && (
                  <span>{errors.numeroDocumento}</span>
                )}
              </div>
              <div>
                <Label>Título</Label>
                <Input
                  value={titulo}
                  type="text"
                  onChange={(e) => setTitulo(e.target.value)}
                />
                {errors.titulo && <span>{errors.titulo}</span>}
              </div>
            </div>
            <div style={styledContainerDiv}>
              <div style={styledEntreDiv}>
                <Label>Tipo</Label>
                <Form.Select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="">Escolha...</option>
                  {optionTipoDoc.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.DescTipoDocumento}
                    </option>
                  ))}
                </Form.Select>
                {errors.tipo && <span>{errors.tipo}</span>}
              </div>
              <div style={styledEntreDiv}>
                <Label>Data documento</Label>
                <Input
                  value={dataDocumento}
                  type="date"
                  onChange={(e) => setDataDocumento(e.target.value)}
                />
                {errors.dataDocumento && <span>{errors.dataDocumento}</span>}
              </div>
              <div>
                <Label>Arquivo</Label>
                <Input
                  type="file"
                  onChange={(e) => setArquivo(e.target.files?.[0] || null)}
                />
                {errors.arquivo && <span>{errors.arquivo}</span>}
              </div>
            </div>
            <div style={styledContainerDiv}>
              <div>
                <Label>Descrição</Label>
                <TextArea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
            </div>
            <div style={styledBotaoDiv}>
              <Button
                txtC="#1b3e75"
                bgC="#caf1ff75"
                bgHC="#1b3e75"
                mr="0"
                hg="38px"
                onClick={handleFormDocAction}
              >
                Salvar
              </Button>
            </div>
          </Container>
        </Modal>
      </Modal>

      <Modal
        mw="50vh"
        mh="20vh"
        isOpen={openModalErro}
        childrenTitle="Erro!"
        setModalOpen={() => setOpenModalErro(!openModalErro)}
      >
        <div style={{ textAlign: "left", marginLeft: "40px" }}>
          <p>Erro ao executar a solicitação.</p>
        </div>
      </Modal>
    </>
  );
};

export default DetalhesDoc;
