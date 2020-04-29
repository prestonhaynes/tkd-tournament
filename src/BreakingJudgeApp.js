import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "./CornerJudge.css";
import "./index.css"
import "./App.css"


class BreakingJudgeApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contestantID: '',
			boardsAttempted: 0,
			boardsBroke: 0,
			cleanBreak: false,
			contestantScore: 0,
			modalPresenting: true,
			contestants: []
		};


		this.submitScores = this.submitScores.bind(this);

		this.chooseContestant = this.chooseContestant.bind(this);

		this.handleBoardsAttemptedChange = this.handleBoardsAttemptedChange.bind(this);
		this.handleBoardsBrokeChange = this.handleBoardsBrokeChange.bind(this);

		this.handleCleanBreakChange = this.handleCleanBreakChange.bind(this);

		this.hideModalShowBreakingJudgeApp = this.hideModalShowBreakingJudgeApp.bind(this);
	}
	async componentDidMount() {
		await fetch('http://balthasar-old:3001/api/getData', {
			method: 'GET'
		})
			.then(res => res.json())
			.then(json => this.setState({contestants: json}))
		this.setState({contestantID: this.state.contestants[0].name})
	}


	hideModalShowBreakingJudgeApp() {
		this.setState({modalPresenting: false})
	}

	goToMenu() {
		window.location = "./";
	}

	submitScores() {
		let total = this.state.boardsBroke;
		if (this.state.cleanBreak === "true")
			total += 1;
		alert("Scores submitted!\n\n" +
			this.state.contestantID + "\n" +
			"Boards attempted: " + this.state.boardsAttempted + "\n" +
			"Boards broke: " + this.state.boardsBroke + "\n" +
			"Clean break: " + this.state.cleanBreak + "\n" +
			"Total score: " + total);
		axios.post(this.state.redFighterScore);
		window.location.reload();
	}

	chooseContestant(event)
	{
		this.setState({contestantID: event.target.value});
	}

	handleBoardsAttemptedChange(event)
	{
		this.setState({boardsAttempted: parseInt(event.target.value)});
	}

	handleBoardsBrokeChange(event)
	{
		this.setState({boardsBroke: parseInt(event.target.value)});
	}

	handleCleanBreakChange(event)
	{
		this.setState({cleanBreak: event.target.value});
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
									Contestant:&nbsp;
									<select value={this.state.contestantID} onChange={this.chooseContestant}>
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
								<Button variant={"primary"} onClick={this.hideModalShowBreakingJudgeApp}>Ready</Button>
								<Button variant={"secondary"} onClick={this.goToMenu}>Main Menu</Button>
							</div>
						</Modal.Footer>
					</Modal>
				</div>

				<div className={"Corner-judge-app"} hidden={this.state.modalPresenting}>
					<div className={"Submit-button-space"} >
						<button className={"Submit-button"} onClick={this.submitScores}>Submit</button>
					</div>

					<div className={"Board-items"}>
						<label>
							Attempting:&nbsp;
							<input type="number" value={this.state.boardsAttempted} onChange={this.handleBoardsAttemptedChange}/>
						</label>
						<br/>
						<label>
							Broke:&nbsp;
							<input type="number" value={this.state.boardsBroke} onChange={this.handleBoardsBrokeChange}/>
						</label>
						<label>
							Clean Break:&nbsp;
							<select value={this.state.cleanBreak} onChange={this.handleCleanBreakChange}>
								<option key={"false"} value={false}>No</option>
								<option key={"true"} value={true}>Yes</option>
							</select>
						</label>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default BreakingJudgeApp;
