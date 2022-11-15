import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Mainpage from "./pages/mainpage/MainPage"
import Newspage from "./pages/newspage/NewsPage"
import { getStories } from "./API/NewsService"
import './App.css';


function App() {
	const [storyIds, setStoryIds] = useState([]); //Для сохранения массива id новостей
	const [count, setCount] = useState(-1000); //Для  автоматического обновления новостей 
	const [restart, setRestart] = useState(true);//Для  принудительного обновления   
	const [news, setNews] = useState({});// Для получения данных из выбранного пользователем новости

	useEffect(() => {
		getStories().then((ids) => setStoryIds(ids));// получаем массив id
		setTimeout(() => { setCount(count + 1); }, 60 * 1000); //запускаем тайммер на 1 минуту
		//console.log(count, restart); 
	}, [count, restart]);

	//Для получения объекта новости
	function giveMyNews(object) {
		setNews(object);
	}

	function Restart() {
		setRestart(restart => !restart);
	}

	return (
		<div className="App">
			<header className="App-header">
				Hacker News
			</header>
			<Switch >
				{/*Страница новости */}
				<Route path="/newspage" render={() => <Newspage news={news} restartComment={Restart} />} />
				{/*Главная страница */}
				<Route path="/" render={() => <Mainpage storyIds={storyIds} getNewsobject={giveMyNews} restartNews={Restart} />} />
			</Switch>
		</div >

	);
}

export default App;
