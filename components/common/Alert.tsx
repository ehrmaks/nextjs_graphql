import { AlertDispatchContext, AlertStateContext } from '@/core/store/alertStore'
import React, { useContext, useEffect } from 'react'
import { Button, Modal } from 'semantic-ui-react'

const Alert = ({ alertData, setAlert }) => {
	const { size, open, msg, title } = useContext(AlertStateContext)
	const dispatch = useContext(AlertDispatchContext)

	useEffect(() => {
		if (alertData.msg) dispatch({ type: 'open', size: 'mini', title: alertData.title, msg: alertData.msg })
	}, [alertData.msg])

	const closeAlert = () => {
		setAlert({
			title: '',
			msg: '',
		})
		dispatch({ type: 'close', size: undefined, title: '', msg: '' })
	}
	return (
		<>
			<Modal size={size} open={open} onClose={() => closeAlert()}>
				{title && <Modal.Header>{title}</Modal.Header>}
				<Modal.Content>
					<p>{msg}</p>
				</Modal.Content>
				<Modal.Actions>
					{/* <Button color="red" onClick={() => closeAlert()}>
						취소
					</Button> */}
					<Button color="blue" onClick={() => closeAlert()}>
						확인
					</Button>
				</Modal.Actions>
			</Modal>
		</>
	)
}

export default Alert
