import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";


const faccoes = ['Nenhuma',
    'Primeiro Comando da Capital', 'Comando Vermelho', 'Família do Norte', 'Guardiões do Estado', 'Bonde dos 40', 'Bonde dos Malucos', 'Cerol Fino', 'Terceiro Comando Puro', 'Primeiro Grupo Catarinense', 'Amigos dos amigos', 'Bonde do Magrelo', 'Comando Revolucionário Brasileiro de Criminalidade', 'Primeiro Comando Puro'
]

const siglasFaccao = {
    'Nenhuma': 'Nenhuma',
    'Primeiro Comando da Capital': 'PCC',
    'Comando Vermelho': 'CV',
    'Família do Norte': 'FDN',
    'Guardiões do Estado': 'GDE',
    'Bonde dos 40': 'Bonde dos 40',
    'Bonde dos Malucos': 'Bonde dos malucos',
    'Cerol Fino': 'Cerol Fino',
    'Terceiro Comando Puro': 'TCP',
    'Primeiro Grupo Catarinense': 'PGC',
    'Amigos dos amigos': 'ADA',
    'Bonde do Magrelo': 'Bonde do magrelo',
    'Comando Revolucionário Brasileiro de Criminalidade': 'CRBC',
    'Primeiro Comando Puro': 'PCP'
};

const opcoesTatuagem = ["Rosto", "Pescoço", "Tórax", "Ombro direito", "Ombro esquerdo", "Braço direito", "Braço esquerdo", "Antebraço direito", "Antebraço esquerdo", "Mão direita", "Mão esquerda", "Costas", "Abdômen", "Coxa direita", "Coxa esquerda", "Panturrilha direita", "Panturrilha esquerda", "Pé direito", "Pé esquerdo"];

const opcoesOlhos = ["Preto", "Castanho claro", "Castanho escuro", "Verde", "Azul", "Não sei"];
const opcoesCrimes = ["Roubo", "Furto", "Tráfico de drogas", "Tráfico de armas", "Homicídio doloso", "Porte de armas", "Estelionato", "Estupro", "Latrocínio"];
const opcoesCidades = ['Mongaguá', 'Itariri', 'Pedro de Toledo', 'Barra do Turvo', 'Cajati', 'Cananéia', 'Eldorado', 'Iporanga', 'Pariquera-Açu, Iguape', 'Ilha Comprida', 'Juquiá', 'Miracatu', 'Sete Barras', 'Cubatão', 'Guarujá', 'Praia Grande', 'Santos', 'São Vicente', 'Bertioga', 'Itanhaém', 'Peruíbe', 'Jacupiranga', 'Registro']
const opcoesPele = ["Branca", "Preta", "Parda", "Vermelha", "Amarela"];

function FormEdit({ item }) {
    const [open, setOpen] = useState(false);
    const [galeriaBase64, setGaleriaBase64] = useState([]);
    const [fotosRemovidas, setFotosRemovidas] = useState([]);
    const [nome, setNome] = useState("");
    const [vulgo, setVulgo] = useState("");
    const [nr_rg, setRG] = useState("");
    const [corPele, setCorPele] = useState("");
    const [corOlho, setCorOlho] = useState("");
    const [altura, setAltura] = useState("");
    const [integranteFaccao, setIntegranteFaccao] = useState("");
    const [infoAdicional, setInfoAdicional] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cidadeAtuacao, setCidadeAtuacao] = useState([]);
    const [crimes, setCrimes] = useState([]);
    const [tatuagens, setTatuagem] = useState([]);


    const fotosExistentes =
        item.fotos?.filter(f => !f.is_main).map(f => ({
            id: f.id,
            src: f.secure_url,
            origem: "api",
        })) ?? [];


    const fotosNovas = galeriaBase64.map((img, i) => ({
        src: img,
        origem: "local",
        localIndex: i,
    }));

    const todasFotos = [...fotosNovas, ...fotosExistentes];

    useEffect(() => {
        if (open && item) {
            setFotosRemovidas([]);
            setGaleriaBase64([]);

        }
        if (item) {
            setNome(item.nome ?? "");
            setVulgo(item.vulgo ?? "");
            setRG(item.nr_rg ?? "");
            setCorPele(item.cor_pele ?? "");
            setCorOlho(item.cor_olho ?? "");
            setAltura(item.altura ?? "");
            setIntegranteFaccao(item.integrante_faccao ?? "");
            setInfoAdicional(item.info_adicional ?? "");
            setDataNascimento(formatarDataParaBR(item.data_nascimento));
            setCidadeAtuacao(item.cidade_atuacao ?? []);
            setCrimes(item.crimes ?? []);
            setTatuagem(item.tatuagens ?? []);
        }
    }, [open, item]);

    if (!item) return null;

    const handleAddCidade = (e) => {
        const cidade = e.target.value;
        if (!cidade) return;

        if (!cidadeAtuacao.find(c => c.nome_cidade === cidade)) {
            setCidadeAtuacao(prev => [...prev, { nome_cidade: cidade }]);
        }

        e.target.value = "";
    };

    const handleRemoveCidade = (nome_cidade) => {
        setCidadeAtuacao(prev =>
            prev.filter(c => c.nome_cidade !== nome_cidade)
        );
    };

    const handleAddCrime = (e) => {
        const crime = e.target.value;
        if (!crime) return;

        if (!crimes.find(c => c.nome_crime === crime)) {
            setCrimes(prev => [...prev, { nome_crime: crime }]);
        }

        e.target.value = "";
    };

    const handleRemoveCrime = (nome_crime) => {
        setCrimes(prev =>
            prev.filter(c => c.nome_crime !== nome_crime)
        );
    };

    const handleAddTatuagem = (e) => {
        const tatuagem = e.target.value;
        if (!tatuagem) return;

        if (!tatuagens.find(c => c.regiao === tatuagem)) {
            setTatuagem(prev => [...prev, { regiao: tatuagem }]);
        }

        e.target.value = "";
    };

    const handleRemoveTatuagem = (regiao) => {
        setTatuagem(prev =>
            prev.filter(c => c.regiao !== regiao)
        );
    };

    const handleGaleriaChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setGaleriaBase64(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file); // 🔥 gera base64
        });
    };


    const removerFotoGaleria = (index) => {
        setGaleriaBase64(prev => prev.filter((_, i) => i !== index));
    };

    const removerFotoDetalhe = (fotoId) => {
        setFotosRemovidas(prev => [...prev, fotoId]);
    };

    const formatarRG = (rg) => {
        if (!rg) return '---';

        return rg
            .toString()
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .substring(0, 12);
    };

    const aplicarMascaraData = (value) =>
        value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .substring(0, 10);

    const formatarDataParaISO = (data) => {
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return null;
        const [d, m, y] = data.split('/');
        return `${y}-${m}-${d}`;
    };

    const formatarDataParaBR = (dataISO) => {
        if (!dataISO) return "";
        const [y, m, d] = dataISO.split("-");
        return `${d}/${m}/${y}`;
    };
    async function handleEdit() {
        const updatedItem = {
            nome,
            vulgo,
            nr_rg,
            cor_pele: corPele,
            cor_olho: corOlho,
            altura,
            integrante_faccao: integranteFaccao,
            info_adicional: infoAdicional,
            data_nascimento: formatarDataParaISO(dataNascimento),
            cidade_atuacao: cidadeAtuacao,
            foto_galeria: galeriaBase64,
            deleted_imagem: fotosRemovidas,
            crimes, 
            tatuagens,
        };

        try {
            const token = localStorage.getItem("token_nexus");
            const response = await fetch(
                `https://backend-nexus-md0p.onrender.com/pessoa/editar/${item.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedItem),
                }
            );

            if (response.ok) {
                alert("Registro atualizado com sucesso!");
                window.location.reload();
            } else {
                alert("Erro ao atualizar o registro.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-3 rounded-lg font-bold transition-all shadow-lg active:scale-95 text-sm uppercase tracking-wider" >Editar</button>
            </DialogTrigger>

            <DialogContent className="bg-[#0a0f1a] border border-gray-800 text-white max-w-2xl overflow-y-auto max-h-[90vh]">
                <DialogHeader className="border-b border-gray-800 pb-4">
                    <DialogTitle className="text-2xl font-bold text-blue-500 uppercase tracking-tighter">
                        Editar Registro
                    </DialogTitle>
                    <DialogDescription className="text-gray-500 italic">
                        Aqui você pode editar as informações do registro selecionado.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <div className="bg-[#111827] p-3 rounded-lg border border-gray-800">
                        <span className="text-[10px] text-gray-500 uppercase font-bold block">Nome</span>
                        <input className="outline-none" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>

                    <div className="bg-[#111827] p-3 rounded-lg border border-gray-800">
                        <span className="text-[10px] text-gray-500 uppercase font-bold block">Vulgo</span>
                        <input className="outline-none" value={vulgo} onChange={(e) => setVulgo(e.target.value)} />
                    </div>

                    <div className="bg-[#111827] p-3 rounded-lg border border-gray-800">
                        <span className="text-[10px] text-gray-500 uppercase font-bold block">RG</span>
                        <input className="outline-none" value={formatarRG(nr_rg)} onChange={(e) => setRG(formatarRG(e.target.value))} />
                    </div>

                    <div>
                        <div>
                            <select className="w-full bg-[#111827] border border-gray-800 rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-600" value={cidadeAtuacao} onChange={handleAddCidade}>
                                <option value="">Selecione a localização</option>
                                {opcoesCidades.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                            {cidadeAtuacao.map(c => (
                                <span key={c.nome_cidade} className="flex items-center bg-blue-600/20 text-blue-400 border border-blue-600/30 px-2 py-1 rounded-md text-[10px] font-bold uppercase">
                                    {c.nome_cidade}
                                    <button className="ml-2 hover:text-red-500" onClick={() => handleRemoveCidade(c.nome_cidade)}>✕</button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div>
                            <select className="w-full bg-[#111827] border border-gray-800 rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-600" value={crimes} onChange={handleAddCrime}>
                                <option value="">Selecione os crimes</option>
                                {opcoesCrimes.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                            {crimes.map(c => (
                                <span key={c.nome_crime} className="flex items-center bg-blue-600/20 text-blue-400 border border-blue-600/30 px-2 py-1 rounded-md text-[10px] font-bold uppercase">
                                    {c.nome_crime}
                                    <button className="ml-2 hover:text-red-500" onClick={() => handleRemoveCrime(c.nome_crime)}>✕</button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-[#111827] p-3 rounded-lg border border-gray-800">
                        <span className="text-[10px] text-gray-500 uppercase font-bold block">Data de nascimento</span>
                        <input className="outline-none" value={dataNascimento} onChange={(e) => setDataNascimento(aplicarMascaraData(e.target.value))} />
                    </div>

                    <div className="w-full bg-[#111827] border border-gray-800 rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-600">
                        <span className="text-[10px] text-gray-500 uppercase font-bold block">Cor dos olhos</span>
                        <select value={corOlho} onChange={(e) => setCorOlho(e.target.value)} className="w-full bg-[#111827] rounded-lg outline-none p-0 m-0">
                            {opcoesOlhos.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>


                    <div className="w-full bg-[#111827] border border-gray-800 rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-600">
                        <span className="text-[10px] text-gray-500 uppercase font-bold block">Cor de pele</span>
                        <select value={corPele} onChange={(e) => setCorPele(e.target.value)} className="w-full bg-[#111827] rounded-lg outline-none p-0 m-0">

                            {opcoesPele.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full bg-[#111827] border border-gray-800 rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-600">
                        <span className="text-[10px] text-gray-500 uppercase font-bold block">Integrante Facção</span>
                        <select value={integranteFaccao} onChange={(e) => setIntegranteFaccao(e.target.value)} className="w-full bg-[#111827] rounded-lg outline-none p-0 m-0">

                            {faccoes.map(nome => <option key={nome} value={siglasFaccao[nome]}>{siglasFaccao[nome]}</option>)}
                        </select>
                    </div>

                    <div>
                        <div>
                            <select className="w-full bg-[#111827] border border-gray-800 rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-600" value={tatuagens} onChange={handleAddTatuagem}>
                                <option value="">Selecione as tatuagens</option>
                                {opcoesTatuagem.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                            {tatuagens.map(c => (
                                <span key={c.regiao} className="flex items-center bg-blue-600/20 text-blue-400 border border-blue-600/30 px-2 py-1 rounded-md text-[10px] font-bold uppercase">
                                    {c.regiao}
                                    <button className="ml-2 hover:text-red-500" onClick={() => handleRemoveTatuagem(c.regiao)}>✕</button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-[#111827] p-3 rounded-lg border border-gray-800 w-full">
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">Informações adicionais / observações</span>
                    <input className="outline-none w-full" value={infoAdicional} onChange={(e) => setInfoAdicional(e.target.value)} />
                </div>

                <div>
                    <span className="text-[10px] text-blue-500 uppercase font-bold block mb-3 tracking-widest">
                        Galeria de Identificadores (Clique para ampliar)
                    </span>

                    <div className="grid grid-cols-3 gap-3">
                        {/* BOTÃO DE UPLOAD */}
                        <label className="h-20 bg-[#0a0f1a] border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-900 transition-all">
                            <span className="text-xl text-blue-500">+</span>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleGaleriaChange}
                                className="hidden"
                            />
                        </label>

                        {/* GALERIA */}
                        {todasFotos
                            .filter(foto => foto.origem !== "api" || !fotosRemovidas.includes(foto.id))
                            .map((foto, index) => (
                                <div
                                    key={foto.origem === "api" ? foto.id : index}
                                    className="relative h-20 w-full group cursor-zoom-in"
                                >

                                    <img
                                        src={foto.src}
                                        className="w-full h-full object-cover rounded-xl border border-gray-800"
                                        alt={`Galeria ${index}`}
                                    />

                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            foto.origem === "local"
                                                ? removerFotoGaleria(foto.localIndex)
                                                : removerFotoDetalhe(foto.id);
                                        }}
                                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 text-[8px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
                <DialogFooter className="mt-4">
                    <DialogClose>
                        <button className="bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-all shadow-lg active:scale-95 text-sm uppercase tracking-wider px-3 py-3">Cancelar</button>
                    </DialogClose>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-3 rounded-lg font-bold transition-all shadow-lg active:scale-95 text-sm uppercase tracking-wider" onClick={handleEdit}>Salvar registro</button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default FormEdit;
