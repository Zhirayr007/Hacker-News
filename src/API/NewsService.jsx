import axios from 'axios';

export const baseUrl = 'https://hacker-news.firebaseio.com/v0';
// топовые новости
//export const newStoriesUrl = `${baseUrl}/topstories.json`;
// Последние новости
export const newStoriesUrl = `${baseUrl}/newstories.json`;

//Максимальный id либо коммент либо новость
export const maxItem = 'https://hacker-news.firebaseio.com/v0/maxitem.json';

export const itemUrl = `${baseUrl}/item/`;

//Для запроса массива новостей
export const getStories = async () => {
	try {
		const res = await axios.get(newStoriesUrl).then(({ data }) => data);
		return res;
	} catch (err) {
		console.error(err);
	}
};
//Для запроса  новости
export const getStory = async (storyId) => {
	try {
		const res = await axios
			.get(`${itemUrl + storyId}.json`)
			.then(({ data }) => data);
		return res;
	} catch (err) {
		console.error(err);
	}
};
//Для запроса комментария
export const getComment = async (commentId) => {
	try {
		const res = await axios
			.get(`${itemUrl + commentId}.json`)
			.then(({ data }) => data);
		return res;
	} catch (err) {
		console.error(err);
	}
};


/* Эти функции никак не связаны с API мне просто лень было создовать новый файл*/

//Перевод на нужный мне вид даты и времени
export function timeConverter(UNIX_timestamp) {
	let time = {};
	let a = new Date(UNIX_timestamp * 1000);
	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let year = a.getFullYear();
	let month = months[a.getMonth()];
	let date = a.getDate();
	let hour = a.getHours();
	let min = a.getMinutes();
	let sec = a.getSeconds();
	time.dmy = date + ' ' + month + ' ' + year;
	time.hms = hour + ':' + min + ':' + sec;
	return time;
}

//Передает объект с ключом __html
export const createMarkup = (markup) => ({
	__html: markup,
});