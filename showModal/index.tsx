/**
 * Usage 
 * 
 * in `MyModal.tsx`
 *
 * interface MyModalProps {
 *     title: string
 *     desc?: string
 * }
 * class MyModal extends React.Component<MyModalProps & ModalInstanceProtocol> { ... }
 *
 * const showMyModal = showModal<MyModalProps>(MyModal)
 * export {showMyModal}
 *
 * in `another.tsx`
 * <Button onClick={e => showMyModal({ title: 'haha' })}>Click to show my modal!</Button>
 *                                   ^^ magic here: TypeScript will remind you props of MyModal
 *
 */

import { render, unmountComponentAtNode } from 'react-dom'
import * as React from 'react'

export interface ModalInstanceProtocol {
    willUnmount: () => void
}

export default function showModal<T>(ModalClass: React.ComponentType<T & ModalInstanceProtocol>) {
    return (modalProps: T) => {
        const $$modal = document.createElement('div')

        const willUnmount = () => {
            unmountComponentAtNode($$modal)
            try {
                document.body.removeChild($$modal)
            } catch (e) {
                console.error(e)
            }
        }

        document.body.appendChild($$modal)
        return render(<ModalClass {...modalProps} willUnmount={willUnmount} />, $$modal)
    }
}
