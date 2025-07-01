import React from 'react'

interface ResponseData {
  message: string;
  status: string;
}
interface MainProps {
  db?: ResponseData | null;
}

export default function Main({ db }: MainProps) {
  return (
    <div>
      <p>Содержимое главной страницы</p>
      {db ? (
        <div>
          <h2>Сообщение: {db.message}</h2>
          <h3>Статус: {db.status}</h3>
        </div>
      ) : (
        <p>Данные не загружены</p>
      )}
    </div>
  ) 
}
