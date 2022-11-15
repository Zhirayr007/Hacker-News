import React, { useState, useEffect } from 'react'
import avatar from "../../img/avatar.png"
import { getComment, timeConverter, createMarkup } from "../../API/NewsService"
import "./comments.css"

export default function Comments({ commentId }) {

	const [comment, setComment] = useState({});//Для получения данных комментатора

	//Получаем коммент по Id
	useEffect(() => {
		getComment(commentId).then((data) => data && data.type && setComment(data));
	}, []);

	//Получаем нужные данные из полученого запроса объекта
	const { by, time, kids, text } = comment;

	//Преобразуем время
	let date = timeConverter(time);
	return (
		<div className="comments">
			<div className="comments__data">
				<div className="author-img-new"><img src={avatar} alt="" /></div>
				<div className="author-new">
					<div className="autor-new__name">{by}</div>
					<div className="autor-new__date">{date.dmy} , {date.hms}</div>
				</div>
			</div>
			<div className="comments__text" dangerouslySetInnerHTML={createMarkup(text)}></div>
		</div>
	)
}
