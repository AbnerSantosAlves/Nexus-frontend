import { useState } from "react"; // CORREÇÃO 1
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

function FormDelete({ item }) {

    const [open, setOpen] = useState(false); // Estado para controlar o fechamento do modal
    const [notificacao, setNotificacao] = useState("");

    const mostrarNotificacao = (msg) => {
        setNotificacao(msg);
        setTimeout(() => setNotificacao(""), 3000);
    };

    async function handleDelete() {
        try {
            const token = localStorage.getItem("token_nexus");
            const response = await fetch(
                `https://backend-nexus-md0p.onrender.com/pessoa/deletar/${item.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                mostrarNotificacao("Registro excluído com sucesso.");

                setTimeout(() => {
                    setOpen(false);
                }, 300);

                setTimeout(() => {
                    setOpen(false);
                    window.location.reload();
                }, 1500);
            } else {
                mostrarNotificacao("Erro ao excluir o registro.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            mostrarNotificacao("Erro de conexão com o servidor.");
        }
    }

    return (
        <>

            {notificacao && (
                <div className="fixed top-4 right-4 bg-blue-600 px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
                    {notificacao}
                </div>
            )}

            {/* Adicionamos open e onOpenChange para o modal fechar sozinho */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-3 rounded-lg font-bold transition-all shadow-lg active:scale-95 text-sm uppercase tracking-wider" >Excluir</button>
                </DialogTrigger>

                <DialogContent className="bg-[#0a0f1a] border border-gray-800 text-white max-w-2xl">
                    <DialogHeader className="border-b border-gray-800 pb-4">
                        <DialogTitle className="text-2xl font-bold text-blue-500 uppercase tracking-tighter">
                            Confirmar Exclusão
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 italic">
                            Tem certeza que deseja excluir o registro de <strong>{item.nome}</strong>? Esta ação não pode ser desfeita.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="flex gap-2 mt-4">
                        {/* Botão de fechar nativo do Dialog ou simples botão com trigger de fechar */}
                        <button
                            onClick={() => setOpen(false)}
                            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                        >
                            Confirmar Exclusão
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default FormDelete;