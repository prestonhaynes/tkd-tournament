import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "./SparringScoreKeeper.css";
import "./index.css"
import "./App.css"


class SparringScoreKeeperApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redFighterID: '',
            blueFighterID: '',
            redFighterScore: 0,
            redFighterMinusPoints: 0,
            redFighterWarnings: 0,
            blueFighterScore: 0,
            blueFighterMinusPoints: 0,
            blueFighterWarnings: 0,
            modalPresenting:  true,
            contestants: []
        };

        this.handleRedScoreMinusPoint = this.handleRedScoreMinusPoint.bind(this);
        this.handleRedScoreWarning = this.handleRedScoreWarning.bind(this);

        this.handleBlueScoreMinusPoint = this.handleBlueScoreMinusPoint.bind(this);
        this.handleBlueScoreWarning = this.handleBlueScoreWarning.bind(this);

        this.submitScores = this.submitScores.bind(this);

        this.chooseRedFighter = this.chooseRedFighter.bind(this);
        this.chooseBlueFighter = this.chooseBlueFighter.bind(this);

        this.hideModalShowSparringScoreKeeperApp = this.hideModalShowSparringScoreKeeperApp.bind(this);
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


    handleRedScoreMinusPoint() {
        let minusPoints = 1 + this.state.redFighterMinusPoints;
        this.setState({redFighterMinusPoints: minusPoints})
    }

    handleRedScoreWarning() {
        let warnings = 1 + this.state.redFighterWarnings;
        this.setState({redFighterWarnings: warnings})
    }

    handleBlueScoreMinusPoint() {
        let minusPoints = 1 + this.state.blueFighterMinusPoints;
        this.setState({blueFighterMinusPoints: minusPoints})
    }

    handleBlueScoreWarning() {
        let warnings = 1 + this.state.blueFighterWarnings;
        this.setState({blueFighterWarnings: warnings})
    }

    hideModalShowSparringScoreKeeperApp() {
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
        let redTotal = 0 - (this.state.redFighterMinusPoints + ~~(this.state.redFighterWarnings / 3))
        let blueTotal = 0 - (this.state.blueFighterMinusPoints + ~~(this.state.blueFighterWarnings / 3))
        alert("Scores submitted!\n\n" +
            this.state.redFighterID + " warnings: " + this.state.redFighterWarnings + "\n" +
            this.state.redFighterID + " minus points: " + this.state.redFighterMinusPoints + "\n" +
            this.state.redFighterID + " total deductions: " + redTotal + "\n\n" +
            this.state.blueFighterID + " warnings: " + this.state.blueFighterWarnings + "\n" +
            this.state.blueFighterID + " minus points: " + this.state.blueFighterMinusPoints + "\n" +
            this.state.blueFighterID + " total deductions: " + blueTotal);
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
                            <h2>Choose contestants</h2>
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
                            <Button variant={"primary"} onClick={this.hideModalShowSparringScoreKeeperApp}>Ready</Button>
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
                        MP: {this.state.redFighterMinusPoints}
                        <br/>
                        W: {this.state.redFighterWarnings}
                    </div>

                    <div className={"Blue-score"}>
                        MP: {this.state.blueFighterMinusPoints}
                        <br/>
                        W: {this.state.blueFighterWarnings}
                    </div>
                </div>
                <div className={"Score-buttons"}>
                    <div className={"Score-Keeper-Red-buttons"}>
                        <div className={"Score-Keeper-Red-button-1"} onClick={this.handleRedScoreMinusPoint}>MP</div>
                        <div className={"Score-Keeper-Red-button-2"} onClick={this.handleRedScoreWarning}>W</div>
                    </div>
                    <div className={"Score-Keeper-Blue-buttons"}>
                        <div className={"Score-Keeper-Blue-button-1"} onClick={this.handleBlueScoreMinusPoint}>MP</div>
                        <div className={"Score-Keeper-Blue-button-2"} onClick={this.handleBlueScoreWarning}>W</div>
                    </div>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default SparringScoreKeeperApp;
