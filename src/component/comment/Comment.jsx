import React, { useState, useEffect } from 'react'
import avatar from "../../img/avatar.png"
import Comments from './Comments'
import { getComment, timeConverter, createMarkup } from "../../API/NewsService"
import "./comment.css"


export default function Comment({ commentId, rComment }) {

	const [open, setOpen] = useState(false);//Для кнопки развертывания вложенных комментариев
	const [comment, setComment] = useState({});//Для получения данных комментатора

	//Получаем коммент по Id
	useEffect(() => {
		getComment(commentId).then((data) => data && data.type && setComment(data));
		console.log(rComment);
	}, [rComment]);

	//Получаем нужные данные из полученого запроса объекта
	const { by, time, kids, text } = comment;

	//Преобразуем время
	let date = timeConverter(time);
	// Проверяем на состояние нажатия кнопки открытия вложенных комментариев
	//		И проверяем есть ли вообще комментарии */
	return (
		<div className="wrapper-comment">
			<div className="comment">
				<div className="comment__data">
					<div className="author-img"><img src={avatar} alt="" /></div>
					<div className="author">
						<div className="autor__name">{by}</div>
						<div className="autor__date">{date.dmy} , {date.hms}</div>
					</div>
				</div>
				<div className="comment__text" dangerouslySetInnerHTML={createMarkup(text)}></div>
				<div className="comment__kins"> Количество ответов: {kids ? kids.length : "0"}  </div>
				<button className="comment__open" onClick={() => { setOpen(open => !open) }}> Показать</button>
			</div>
			{/* Проверяем на состояние нажатия кнопки открытия вложенных комментариев
			И проверяем есть ли вообще комментарии  */}
			<div className={open ? "comment-in-comment" : "none"}>
				{kids ? kids.map((commentId, i) => {
					return (
						<Comments key={i} commentId={commentId} />
					)
				}) : "Комментариев нет!!!"

				}
			</div>
		</div>
	)
}
