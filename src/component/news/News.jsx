import React, { useState, useEffect } from 'react'
import { getStory, timeConverter } from "../../API/NewsService"
import { Link } from 'react-router-dom';
import "./news.css"

export default function News({ storyId, i, getNews }) {

	//Для хранения объекта истории
	const [story, setStory] = useState({});

	// Получаем новость в нужным id
	useEffect(() => {
		getStory(storyId).then((data) => {
			if (data && data.url) {
				setStory(data);
			}
		});
	}, []);

	//получаем нужные данные из полученого запроса объекта
	const { title, by, time, score, url, id, kids } = story;

	//Преобразуем время
	let date = timeConverter(time);

	{/*Некоторые новости не открываются поэтому поставил условие */ }
	return (story && url ?
		(
			<div className="news">
				<div className="news__title">
					<Link to="/newspage" onClick={() => { getNews({ title, by, time, score, url, id, date, kids }) }}>{i})  {title}</Link>
				</div>
				<div className="news__link">  <a href={url}>{url}</a> </div>
				<div className="news__author">Автор: {by}</div>
				<div className="news__rating">Рейтинг: {score}</div>
				<div className="news__date"> {date.dmy}</div>
				<div className="news__time">{date.hms} </div>
			</div>
		) :
		(<div className="news">
			<div className="news__title">{i}) Проблема с получением новости и ссылки на новость </div>
		</div>)
	)
}
