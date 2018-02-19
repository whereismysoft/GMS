import React from 'react';

import styles from '../css/styles.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {

	constructor() {
		super();

		this.state = {
			data: [],
			head: [],
			isFixed:false,
			sortedColumn: null,
		}

		this.sortArray = this.sortArray.bind(this)
	}

	loadData(url) {
		return fetch(url)
			.then(res => res.json())
	}

	sortArray(index) {
		
		let arr = this.state.data;
		
		if (this.state.sortedColumn == this.state.head[index]) { 
			return this.setState({
				data: arr.reverse()
			}, () => localStorage.setItem('isReversed', true)) 
		}

		if( parseInt(arr[1][index]) === NaN ) {
			arr.sort(function(a, b) {
					if (a[index] > b[index]) {
						return 1;
					} else if (a[index] < b[index]) {
						return -1
					} else {return 0};
				}
			)	
		} else {
			arr.sort(function(a, b) {
				return a[index] - b[index]
			})
		}

		this.setState({
			data: arr, 
			sortedColumn: this.state.head[index]
		})

		localStorage.setItem('sorted', [index]);
		localStorage.setItem('isReversed', false)
	}

	checkLocalStorage() {
		if (localStorage.isReversed) {
				let promise = new Promise((resolve, reject) => 
					resolve(
						this.sortArray(localStorage.sorted)
					)
				)
				
		}
		this.sortArray(localStorage.sorted);
	}

	componentWillMount() {
		this.loadData('/header')
			.then(res => this.setState({
				head: res[0]
			}));

		let promise = new Promise((resolve, reject) => {
			resolve(
				this.loadData('/data')
				.then(res => this.setState({
					data: res
				}))
			)
		})
		promise.then(result => { 
			if (localStorage.sorted != undefined) {
				this.checkLocalStorage()
			}
		})
	}

	componentDidMount() {
		
	}

	render() {
		console.log(this.state.sortedColumn)
		return(
			<table>
				<thead>
					<tr className='header' id='header'>
						{
							this.state.head.map((item, index) => (
								<th 
									key={index} 
									className='header__cell'
									onClick={ (e) => this.sortArray(index, e)}
								>
									{item}
								</th>
							))
						}
					</tr>
				</thead>
				<tbody>
					{
						this.state.data.map((item, index) => (
								<tr key={index} className="row">
									{
										item.map((cell, index) =>
											<td key={index} className='cell'>
												{cell}
											</td>
										)
									}
								</tr>
							))
					}
				</tbody>
			</table>
		)
	}
}