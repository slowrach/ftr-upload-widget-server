import { Merge } from "../../utils/merge"

type Props = React.ComponentProps<'button'> & {
   size?: 'default' | 'icon' | 'iconSm'
}

const variantsButton = {
   default: 'px-3 py-2',
   icon: 'p-2',
   iconSm: 'p-1'
}

export function Button({ size = 'default', className,...rest } : Props) {
   return (
      <button className={Merge(["text-zinc-400 rounded-lg hover:text-zinc-100 hover:bg-zinc-800 hover:cursor-pointer disabled:opacity-50 disabled:pointer-events-none", className, variantsButton[size]])} {...rest} />
   )
}