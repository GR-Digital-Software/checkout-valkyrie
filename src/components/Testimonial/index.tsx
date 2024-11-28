import Avatar from "../Avatar";



export default function Testimonial() {
    return (
        <div className="flex flex-col bg-white w-[412px] h-[191px] p-5 rounded-lg gap-4">
            <div className="flex flex-row w-fit gap-[14px]">
                <Avatar
                    imageUrl="/checkout/avatar.png"
                    size="medium"
                />
                <div className="flex flex-col">
                    <p className="text-sm font-bold text-zinc-950">
                        Mariana Oliveira
                    </p>
                    <p className="text-xs font-normal text-zinc-950">
                        @mariana_oliveira
                    </p>
                </div>
            </div>
            <p className="text-xs font-normal text-zinc-950">
                Estou apaixonada pelos perfumes Boss! Elegância e sofisticação em cada borrifada. Sem dúvidas, meu novo favorito!
            </p>
        </div>
    )
}