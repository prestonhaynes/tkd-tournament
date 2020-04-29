import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class AddContestantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            sex: '0',
            birthdate: '',
            weight: '',
            rank: '-10',
            umpire: 'NA',
            active: '1',
            school: '',
            instructor: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleBirthdateChange = this.handleBirthdateChange.bind(this);
        this.handleRankChange = this.handleRankChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.handleUmpireChange = this.handleUmpireChange.bind(this);
        this.handleSchoolChange = this.handleSchoolChange.bind(this);
        this.handleInstructorChange = this.handleInstructorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }
    handleBirthdateChange(event) {
        this.setState({birthdate: event.target.value});
    }
    handleGenderChange(event) {
        this.setState({sex: event.target.value});
    }
    handleRankChange(event) {
        this.setState({rank: event.target.value});
    }
    handleWeightChange(event) {
        this.setState({weight: event.target.value});
    }
    handleUmpireChange(event) {
        this.setState({umpire: event.target.value});
    }
    handleSchoolChange(event) {
        this.setState({school: event.target.value});
    }
    handleInstructorChange(event) {
        this.setState({instructor: event.target.value});
    }

    handleSubmit(onrejected) {
        axios.post('http://balthasar-old:3001/api/putData', {
            name: this.state.name,
            birthdate: this.state.birthdate,
            sex: this.state.sex,
            weight: this.state.weight,
            rank: this.state.rank,
            umpire: this.state.umpire,
            active: this.state.active,
            school: this.state.school,
            instructor: this.state.instructor
        }).then(function (response) {
            // alert(response);
            alert('A name was submitted: ' + this.state.name + "\n" + response.msg);
        }).catch(function(error) {
            alert(error);
        });

    }

    MainMenu() {
        window.location = "/"
    }


    render() {
        return (

            <div className="App">
                <Button onClick={this.MainMenu}>Main Menu</Button>

                <form className="App-header" onSubmit={this.handleSubmit}>
                    <label>
                        Name:&nbsp;
                        <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
                    </label>

                    <label>
                        Sex:&nbsp;
                        <select value={this.state.sex} onChange={this.handleGenderChange}>
                            <option key="0" value="0">Male</option>
                            <option key="1" value="1">Female</option>
                        </select>
                    </label>
                    <label>
                        Birth Date:&nbsp;
                        <input type="date" value={this.state.birthdate} onChange={this.handleBirthdateChange}/>
                    </label>
                    <label>
                        Weight:&nbsp;
                        <input type="number" value={this.state.weight} onChange={this.handleWeightChange}/>
                    </label>
                    <label>
                        Rank:&nbsp;
                        <select value={this.state.rank} onChange={this.handleRankChange}>
                            <option key="-10" value="-10">White Belt</option>
                            <option key="-9" value="-9">High White Belt</option>
                            <option key="-8" value="-8">Yellow Belt</option>
                            <option key="-7" value="-7">High Yellow Belt</option>
                            <option key="-6" value="-6">Green Belt</option>
                            <option key="-5" value="-5">High Green Belt</option>
                            <option key="-4" value="-4">Blue Belt</option>
                            <option key="-3" value="-3">High Blue Belt</option>
                            <option key="-2" value="-2">Red Belt</option>
                            <option key="-1" value="-1">High Red Belt</option>
                            <option key="1" value="1">1st Degree Black Belt</option>
                            <option key="2" value="2">2nd Degree Black Belt</option>
                            <option key="3" value="3">3rd Degree Black Belt</option>
                            <option key="4" value="4">4th Degree Black Belt</option>
                            <option key="5" value="5">5th Degree Black Belt</option>
                            <option key="6" value="6">6th Degree Black Belt</option>
                            <option key="7" value="7">7th Degree Black Belt</option>
                            <option key="8" value="8">8th Degree Black Belt</option>
                            <option key="9" value="9">9th Degree Black Belt</option>

                        </select>
                    </label>
                    <label>
                        Umpire:&nbsp;
                        <select value={this.state.umpire} onChange={this.handleUmpireChange}>
                            <option key="NA" value="NA" defaultValue>N/A</option>
                            <option key="A" value="A">A</option>
                            <option key="B" value="B">B</option>
                            <option key="C" value="C">C</option>
                        </select>
                    </label>
                    <label>
                        School:&nbsp;
                        <input type="text" value={this.state.school} onChange={this.handleSchoolChange}/>
                    </label>
                    <label>
                        Instructor:&nbsp;
                        <input type="text" value={this.state.instructor} onChange={this.handleInstructorChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default AddContestantForm;