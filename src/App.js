import React, { Component } from 'react';

import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import AddContestantForm from "./AddContestantForm";
import CornerJudgeApp from "./CornerJudgeApp";
import SparringScoreKeeper from "./SparringScoreKeeperApp"
import PatternsJudgeApp from "./PatternsJudgeApp";
import BreakingJudgeApp from "./BreakingJudgeApp";
import MainMenu from "./MainMenu";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/ContestantForm" component={AddContestantForm} exact/>
                        <Route path="/CornerJudge" component={CornerJudgeApp} exact/>
                        <Route path="/SparringScoreKeeper" component={SparringScoreKeeper} exact/>
                        <Route path="/PatternsJudgeApp" component={PatternsJudgeApp} exact/>
                        <Route path="/BreakingJudgeApp" component={BreakingJudgeApp} exact/>
                        <Route path="/" component={MainMenu}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
