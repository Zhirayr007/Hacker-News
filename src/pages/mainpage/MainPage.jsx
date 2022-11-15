import React, { useState } from 'react';
import News from "../../component/news/News";
import "./mainpage.css";

export default function MainPage({ storyIds, getNewsobject, restartNews }) {

	//для  принудительного обновления новостей  
	const [rNews, setrNews] = useState(false);
	function handleRestartNews() {
		setrNews(rNews => !rNews)
		restartNews(rNews);
	}

	//для передачи выбранной новости
	function getNews(id) {
		getNewsobject(id);
	}

	let index = 0;
	return (
		<div className="wrapper-news">
			<div className="content">
				<button className="button-restart" onClick={handleRestartNews}> GET NEWS</button>
				{/* Проходимся по полученному массиву id новостей  */}
				{storyIds.slice(0, 100).map((storyId, i) => {
					index += 1;
					return (
						<News key={i} i={index} storyId={storyId} getNews={getNews} />
					)
				})}
			</div>
		</div >
	)
}
