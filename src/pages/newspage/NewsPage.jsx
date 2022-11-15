import React, { useState } from 'react'
import Comment from "../../component/comment/Comment"
import { Link } from 'react-router-dom';
import "./newspage.css"

export default function NewsPage({ news, restartComment }) {

	//Для  принудительного обновления комментариев 
	const [rComment, setrComment] = useState(false);
	function handleRestartComment() {
		setrComment(rComment => !rComment)
		restartComment(rComment);
	}

	//Записываем в переменную массив id комментариев
	let commentsIds = news.kids;

	return (
		<div className="wrapper-news">
			<div className="content">
				<div className="button">
					<button className="back"> <Link to="/" >Вернуться к списку новостей</Link> </button>
					<button className="restart-comment" onClick={handleRestartComment}>Обновить комментирии</button>
				</div>
				<div className="news-page">
					<div className="news-page__title"> {news.title} </div>
					<div className="news-page__link">Ссылка на источник: <a href={news.url}>{news.url}</a> </div>
					<div className="news-page__author">Автор: {news.by}</div>
					<div className="news-page__date"> Дата публикации: {news.date.dmy}</div>
					<div className="news-page__time">Время публикации: {news.date.hms} </div>
					<div className="news-page__comment-number">Количества комментариев: {commentsIds ? commentsIds.length : "0"} </div>
					<div className="news-page__comment">
						{commentsIds ?
							commentsIds.map((commentId, i) => {
								return (
									<Comment key={i} commentId={commentId} rComment={rComment} />
								)
							}) :
							null}
					</div>
				</div>
			</div>
		</div>
	)
}
