import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "./CornerJudge.css";
import "./index.css"
import "./App.css"


class PatternsJudgeApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redFighterID: '',
			blueFighterID: '',
			redFighterScore: 0,
			blueFighterScore: 0,
			modalPresenting: true,
			contestants: []
		};


		this.submitScores = this.submitScores.bind(this);

		this.chooseRedFighter = this.chooseRedFighter.bind(this);
		this.chooseBlueFighter = this.chooseBlueFighter.bind(this);

		this.redFighterWinner = this.redFighterWinner.bind(this);
		this.blueFighterWinner = this.blueFighterWinner.bind(this);

		this.hideModalShowPatternsJudgeApp = this.hideModalShowPatternsJudgeApp.bind(this);
	}
	async componentDidMount() {
		await fetch('http://balthasar-old:3001/api/getData', {
			method: 'GET'
		})
			.then(res => res.json())
			.then(json => this.setState({contestants: json}))
		this.setState({redFighterID: this.state.contestants[0].name})
		this.setState({blueFighterID: this.state.contestants[0].name})
	}


	hideModalShowPatternsJudgeApp() {
		if(this.state.redFighterID !== this.state.blueFighterID) {
			this.setState({modalPresenting: false})
		}
		else {
			alert("The same fighter cannot be selected for both red and blue.")
		}
	}

	goToMenu() {
		window.location = "./";
	}

	submitScores() {
		alert("Scores submitted!\n\n" +
			this.state.redFighterID + ": " + this.state.redFighterScore + "\n" +
			this.state.blueFighterID + ": " + this.state.blueFighterScore);
		axios.post(this.state.redFighterScore);
		window.location.reload();
	}

	chooseRedFighter(event)
	{
		this.setState({redFighterID: event.target.value});
	}

	chooseBlueFighter(event)
	{
		this.setState({blueFighterID: event.target.value});
	}

	redFighterWinner()
	{
		alert("You have voted for " + this.state.redFighterID);
		axios.post(this.state.redFighterID);
		window.location.reload();
	}

	blueFighterWinner()
	{
		alert("You have voted for " + this.state.blueFighterID);
		axios.post(this.state.blueFighterID);
		window.location.reload();
	}


	render() {
		return (
			<React.Fragment>
				<div className={"Contestant-select-popup"}>
					<Modal centered show={this.state.modalPresenting}>
						<Modal.Header>
							<Modal.Title>
								<h2>Add contestants</h2>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className={"fighter-select"}>
								<label>
									Red Fighter:&nbsp;
									<select value={this.state.redFighterID} onChange={this.chooseRedFighter}>
										{this.state.contestants.map( el => (
												<option key={el.name} value={el.name}>{el.name}</option>
											)
										)}
									</select>
								</label>
								<br/>
								<label>
									Blue Fighter:&nbsp;
									<select value={this.state.blueFighterID} onChange={this.chooseBlueFighter}>
										{this.state.contestants.map( el => (
												<option key={el.name} value={el.name}>{el.name}</option>
											)
										)}
									</select>
								</label>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<div className={"Modal-buttons"}>
								<Button variant={"primary"} onClick={this.hideModalShowPatternsJudgeApp}>Ready</Button>
								<Button variant={"secondary"} onClick={this.goToMenu}>Main Menu</Button>
							</div>
						</Modal.Footer>
					</Modal>
				</div>

				<div className={"Patterns-judge-app"} hidden={this.state.modalPresenting}>
					{/*<div className={"Submit-button-space"} >*/}
					{/*	<button className={"Submit-button"} onClick={this.submitScores}>Submit</button>*/}
					{/*</div>*/}
					<div className={"Name-display"}>

						<div className={"Red-name"}>
							{this.state.redFighterID}
						</div>

						<div className={"Blue-name"}>
							{this.state.blueFighterID}
						</div>
					</div>
					<div className={"Winner-buttons"}>
						<div className={"winner-red-buttons"}>
							<div className={"Winner-red-button-1"} onClick={this.redFighterWinner}>red</div>
						</div>
						<div className={"Winner-blue-buttons"}>
							<div className={"Winner-blue-button-1"} onClick={this.blueFighterWinner}>blue</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default PatternsJudgeApp;
