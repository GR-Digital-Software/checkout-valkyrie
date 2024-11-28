import { Check, Info, ShoppingCartIcon, Ticket } from "lucide-react";
import Button from "../Button";
import ProductCard from "../ProductCard";
import Divider from "../Divider";
import Input from "../Input";
import ReminderBox from "../ReminderBox";

export default function OrderCartDesktop() {
    return (
        <div className="flex flex-col gap-6 px-6">
            <div className="flex flex-col bg-white shadow-xl gap-6 w-[384px] h-[710px] rounded-b-md">
                <div className="bg-black h-3">
                </div>
                <div className="w-full flex flex-col px-6 gap-2 h-fit">
                    <Button icon={<ShoppingCartIcon size={18} />} iconPosition='left' text='SEU CARRINHO' wFull />
                    <ProductCard />
                    <Divider />
                    <ProductCard />
                    <div className="border-b-2 border-dashed">
                    </div>
                    <div className='flex flex-col justify-between items-end gap-2 h-10'>
                        <div className="flex flex-row gap-2 w-full justify-center items-end">
                            <Input id='code' placeholder='Código do desconto' iconLeft={<Ticket size={18} color='#09090B' />} className='w-full' />
                            <Button icon={<Check size={18} />} variant='default' className='w-10 h-10' />
                        </div>
                        <Divider />
                        <div className='flex flex-col w-full gap-4'>
                            <div className='flex flex-row justify-between w-full'>
                                <p className='text-zinc-950 text-sm font-semibold'>Produtos</p>
                                <p className='text-zinc-500 text-sm font-normal'>R$ 579,80</p>
                            </div>
                            <div className='flex flex-row justify-between w-full'>
                                <p className='text-zinc-950 text-sm font-semibold'>Desconto</p>
                                <p className='text-zinc-500 text-sm font-normal'>R$ 0,00</p>
                            </div>
                        </div>
                        <div className='bg-[#22C55E33] rounded-md h-fit py-2 px-[10px] w-full'>
                            <div className='flex flex-row justify-between w-full'>
                                <p className='text-green-500 text-sm font-semibold'>Total</p>
                                <p className='text-green-500 text-sm font-bold'>R$ 579,80</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-full items-center justify-center gap-1">
                            <Info size={12} />
                            <span className='text-zinc-500 text-xs font-normal'>ou em até 12 x</span>
                            <span className='text-zinc-950 text-sm font-semibold'> R$ 48,32</span>
                        </div>
                    </div>
                </div>
            </div>
            <ReminderBox />
        </div>
    )
}