import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

export function ViewPerfil() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-blue-600 text-xs font-black uppercase px-5 py-2 rounded-lg cursor-pointer hover:bg-blue-700">
                    Perfil
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Perfil do Usuário</DialogTitle>
                    <DialogDescription>
                        Aqui você pode visualizar e editar as informações do seu perfil.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
            <DialogFooter>
                <span> s </span>
            </DialogFooter>
        </Dialog>
    )
}