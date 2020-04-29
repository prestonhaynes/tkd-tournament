import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "./CornerJudge.css";
import "./index.css"
import "./App.css"


class CornerJudgeApp extends React.Component {
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



        this.handleRedScoreAddThree = this.handleRedScoreAddThree.bind(this);
        this.handleRedScoreAddTwo =   this.handleRedScoreAddTwo.bind(this);
        this.handleRedScoreAddOne =   this.handleRedScoreAddOne.bind(this);

        this.handleBlueScoreAddThree = this.handleBlueScoreAddThree.bind(this);
        this.handleBlueScoreAddTwo =   this.handleBlueScoreAddTwo.bind(this);
        this.handleBlueScoreAddOne =   this.handleBlueScoreAddOne.bind(this);
        this.submitScores = this.submitScores.bind(this);

        this.chooseRedFighter = this.chooseRedFighter.bind(this);
        this.chooseBlueFighter = this.chooseBlueFighter.bind(this);

        this.hideModalShowCornerJudgeApp = this.hideModalShowCornerJudgeApp.bind(this);
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





    handleRedScoreAddThree(event) {
        let newScore = this.state.redFighterScore + 3;
        this.setState({redFighterScore: newScore})
    }

    handleRedScoreAddTwo(event) {
        let newScore = this.state.redFighterScore + 2;
        this.setState({redFighterScore: newScore})
    }

    handleRedScoreAddOne(event) {
        let newScore = this.state.redFighterScore + 1;
        this.setState({redFighterScore: newScore})
    }

    handleBlueScoreAddThree(event) {
        let newScore = this.state.blueFighterScore + 3;
        this.setState({blueFighterScore: newScore})
    }

    handleBlueScoreAddTwo(event) {
        let newScore = this.state.blueFighterScore + 2;
        this.setState({blueFighterScore: newScore})
    }

    handleBlueScoreAddOne(event) {
        let newScore = this.state.blueFighterScore + 1;
        this.setState({blueFighterScore: newScore})
    }

    hideModalShowCornerJudgeApp() {
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
                            <Button variant={"primary"} onClick={this.hideModalShowCornerJudgeApp}>Ready</Button>
                            <Button variant={"secondary"} onClick={this.goToMenu}>Main Menu</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className={"Corner-judge-app"} hidden={this.state.modalPresenting}>
                <div className={"Submit-button-space"} >
                    <button className={"Submit-button"} onClick={this.submitScores}>Submit</button>
                </div>
                <div className={"Score-display"}>

                    <div className={"Red-score"}>
                        {this.state.redFighterScore}
                    </div>

                    <div className={"Blue-score"}>
                        {this.state.blueFighterScore}
                    </div>
                </div>
                <div className={"Score-buttons"}>
                    <div className={"Red-buttons"}>
                        <div className={"Red-button-1"} onClick={this.handleRedScoreAddThree}>3</div>
                        <div className={"Red-button-2"} onClick={this.handleRedScoreAddTwo}>2</div>
                        <div className={"Red-button-3"} onClick={this.handleRedScoreAddOne}>1</div>
                    </div>
                    <div className={"Blue-buttons"}>
                        <div className={"Blue-button-1"} onClick={this.handleBlueScoreAddThree}>3</div>
                        <div className={"Blue-button-2"} onClick={this.handleBlueScoreAddTwo}>2</div>
                        <div className={"Blue-button-3"} onClick={this.handleBlueScoreAddOne}>1</div>
                    </div>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default CornerJudgeApp;
