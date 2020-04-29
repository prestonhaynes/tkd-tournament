import React from 'react';
import Button from 'react-bootstrap/Button';

import "./index.css"
import "./App.css"


class MainMenu extends React.Component {

	CornerJudge() {
	window.location = "/CornerJudge"
	}

	SparringScoreKeeper() {
		window.location = "/SparringScoreKeeper"
	}

	Patterns() {
		window.location = "/PatternsJudgeApp"
	}

	Breaking() {
		window.location = "/BreakingJudgeApp"
	}

	AddContestantForm() {
		window.location = "/ContestantForm"
	}

	render() {
		return (
			<div className={"Main-Menu"}>
				<p>
					<Button onClick={this.CornerJudge}>
					Corner Judge
					</Button>
				</p>
				<p>
					<Button onClick={this.SparringScoreKeeper}>
						Sparring Score Keeper
					</Button>
				</p>
				<p>
					<Button onClick={this.Patterns}>
						Patterns Judge
					</Button>
				</p>
				<p>
					<Button onClick={this.Breaking}>
						Breaking Scorekeeper
					</Button>
				</p>
				<p>
					<Button onClick={this.AddContestantForm}>
						Add Contestant Form
					</Button>
				</p>
			</div>
		);
	}
}

export default MainMenu;
