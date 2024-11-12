import React, { useState, useEffect } from 'react'
import QRScanner from 'react-qr-scanner'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Scan = () => {
	const [scannedData, setScannedData] = useState(null)
	const [uuidList, setUuidList] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [isScanning, setIsScanning] = useState(false)

	// Загрузка списка UUID с GitHub
	useEffect(() => {
		const fetchUUIDs = async () => {
			try {
				const response = await axios.get(
					'https://raw.githubusercontent.com/tfdf63/tg-app-fc-matches/main/parking.txt'
				)
				const uuids = response.data.split('\n').map(line => line.trim())
				setUuidList(uuids)
			} catch (error) {
				console.error('Ошибка при загрузке UUID с GitHub:', error)
				toast.error('Ошибка при загрузке UUID с GitHub')
			} finally {
				setIsLoading(false)
			}
		}

		fetchUUIDs()
	}, [])

	// Функция для проверки UUID из QR-кода в списке
	const checkUUID = (uuid, qrData) => {
		if (uuidList.includes(uuid)) {
			setScannedData(qrData) // Сохраняем весь текст из QR-кода
			toast.success('Проход разрешен! UUID найден в списке')
		} else {
			toast.error('Ошибка! UUID не найден в списке')
			setScannedData(null) // Сбросить scannedData, если UUID не найден
		}
		setIsScanning(false) // Отключить сканирование после результата
	}

	// Обработчик события сканирования QR-кода
	const handleScan = data => {
		if (!isScanning || !data) return // Блокируем сканирование, если неактивно

		const uuid = data.text?.match(/UUID: ([\w-]+)/)?.[1]
		if (uuid) {
			checkUUID(uuid, data.text) // Передаем весь текст QR-кода
		} else {
			toast.warn('QR код не содержит UUID')
			setScannedData(null)
			setIsScanning(false) // Отключить сканирование при некорректном QR
		}
	}

	// Обработчик ошибок
	const handleError = error => {
		console.error('Ошибка сканирования:', error)
		toast.error('Ошибка при сканировании QR-кода')
		setIsScanning(false)
	}

	// Запуск сканирования
	const startScan = () => {
		setIsScanning(true)
		setScannedData(null)
	}

	// Сброс сканирования
	const resetScan = () => {
		setIsScanning(false)
		setScannedData(null)
		toast.info(
			'Сканирование сброшено. Нажмите "Сканировать", чтобы начать заново.'
		)
	}

	if (isLoading) {
		return <div>Загрузка списка UUID...</div>
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				color: 'white',
			}}
		>
			<h1>Сканер QR кода</h1>
			{isScanning && (
				<QRScanner
					videoConstraints={{
						facingMode: 'environment', // Используем заднюю камеру
					}}
					onScan={handleScan}
					onError={handleError}
					style={{ width: '100%', height: '400px' }}
				/>
			)}
			{scannedData && (
				<div style={{ marginTop: '20px' }}>
					<div>
						{scannedData.split('\n').map((line, index) => (
							<p key={index} style={{ margin: '10px 0' }}>
								{line}
							</p>
						))}
					</div>
				</div>
			)}

			<div style={{ marginTop: '20px' }}>
				<button onClick={startScan} disabled={isScanning}>
					Сканировать
				</button>
				<button onClick={resetScan} style={{ marginTop: '10px' }}>
					Сброс
				</button>
			</div>
			<ToastContainer position='top-center' autoClose={1000} />
		</div>
	)
}

export default Scan
