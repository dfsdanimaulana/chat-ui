import CardOptionList from '../Card/CardOptionList'
import { useSelector } from 'react-redux'

export default function CardModal({ id, data }) {
    const currentUser = useSelector((state) => state.user.value)

    return (
        <div
            className='modal fade'
            id={'cardModal' + id}
            tabIndex='-1'
            aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-body'>
                        <CardOptionList currentUser={currentUser} data={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}
