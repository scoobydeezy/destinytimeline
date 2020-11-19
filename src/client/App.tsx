import * as React from 'react';
import Manifest from './Manifest';

class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = {
			lore: [{
				ID: '',
				flavor: '',
				content: '',
				source: '',
				icon: '',
				artwork: ''
			}]
		};
	}

	async componentDidMount() {
		try {
			let r = await fetch('/api/lore');
			let lore = await r.json();
			this.setState({ lore });
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<main className="container my-5">
				<h1 className="text-primary text-center">Lore</h1>
				<ul className="lore-list">
					{this.state.lore.map( lore => {
						return <li key={lore.ID} className="lore-item">{lore.ID}</li>
					})}
				</ul>
				<h1>Manifest</h1>
				<Manifest />
			</main>
		);
	}
}

export interface IAppProps {}

export interface IAppState {
	lore: Array<any>;
}

export default App;

//
// const App = (props: AppProps) => {
// 	const [greeting, setGreeting] = React.useState<string>('');

// 	React.useEffect(() => {
// 		(async () => {
// 			try {
// 				const res = await fetch('/api/hello');
// 				const greeting = await res.json();
// 				setGreeting(greeting);
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		})();
// 	}, []);

// 	return (
// 		<div className="min-vh-100 d-flex justify-content-center align-items-center">
// 			<h1 className="display-1">Hello {greeting}!</h1>
// 		</div>
// 	);
// };

// interface AppProps {}

// export default App;
