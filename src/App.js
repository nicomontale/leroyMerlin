import React, { Component } from "react";
import logo from "./assets/img/logo.svg";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";

// import tree from "./constants/tree";
// import results from "./constants/results";
// import steps from "./constants/steps";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      //Array dove sono tenute le scelte
      checkTree: [],

      //API Steps
      stepStore: [],
      //API Tree
      treeStore: [],
      //API Results
      resultStore: [],

      //Classe navigazione che attiva e disattiva il cosino verde
      navActive: [0, "active"]
    };
  }

  clickNav = e => {
    e.preventDefault();
    const { step } = this.state;

    if (e.target.id <= step) {
      this.setState({
        step: e.target.id,
        navActive: [e.target.id + 1, "active"]
      });
    }
  };

  showResults = () => {
    const { step, treeStore, resultStore, checkTree } = this.state;
    // const resultsArr = [
    //   ...treeStore.children[checkTree[0]].children[checkTree[1]].children[
    //     checkTree[2]
    //   ].children[checkTree[3]].results
    // ];
    const navigazione = (selection, treeStore, step) => {
      if (!selection) {
        return undefined;
      }
      if (selection.length < step) {
        return undefined;
      }
      const lastElement = selection.reduce((acc, currentSelection) => {
        if (!acc) {
          return acc;
        }
        return acc.children[currentSelection];
      }, treeStore);
      if (!lastElement) {
        return undefined;
      }
      return lastElement.results;
    };
    const resultsArr = navigazione(checkTree, treeStore, step);
    console.log(resultsArr);

    //Faccio la map di resultStore (API) dove resultArr uguale a resultStore mi credo l'elemento
    return resultStore.map((element, index) => {
      for (let i = 0; i < resultsArr.length; i++) {
        if (resultsArr[i] === index + 1) {
          return (
            <div key={index}>
              <p>{element.id}</p>
              <p>{element.title}</p>
              <p>{element.description}</p>
              <p>{element.url}</p>
            </div>
          );
        }
      }
    });
  };
  showStep = () => {
    const { stepStore, step } = this.state;
    const stepArr = [];
    for (let i = 0; i < stepStore.length; i++) {
      stepArr[i] = stepStore[i].answers;
    }
    if (step < stepStore.length) {
      return stepArr[step].map((element, index) => {
        if (stepStore[step].category === "Dimensioni") {
          return (
            <div
              className="step-card"
              key={index}
              onClick={() => {
                const { checkTree } = this.state;
                checkTree[step] = index;
                this.setState({
                  checkTree: checkTree
                });
              }}
            >
              <div className="title">{element.title}</div>
              <div className="description">{element.description}</div>
            </div>
          );
        } else {
          return (
            <div className="step-card" key={index}>
              <img
                alt="img_alt"
                src={require(`./assets/img/${element.image}`)}
                onClick={() => {
                  const { checkTree } = this.state;
                  checkTree[step] = index;
                  this.setState({
                    checkTree: checkTree
                  });
                }}
              />
              <div className="title">{element.title}</div>
              <div className="description">{element.description}</div>
            </div>
          );
        }
      });
    } else {
      return <div>{this.showResults()}</div>;
    }
  };
  nextStep = () => {
    const { step } = this.state;

    this.setState({
      step: parseInt(step) + 1,
      navActive: [parseInt(step + 1), "active"]
    });
  };
  componentDidMount() {
    axios
      .get(
        `https://mctsuite.it.nttdata-emea.com/preview/tag_ntt_project_work/wizard_config.json`
      )
      .then(res => {
        const persons = res.data;
        console.log(persons.results);
        this.setState({
          treeStore: persons.tree,
          resultStore: persons.results,
          stepStore: persons.steps
        });
      });
  }

  render() {
    const {
      stepStore,
      navActive,
      step,
      checkTree

    } = this.state;

    const navArray = stepStore.map((element, index) => {
      if (navActive[0] === index) {
        return (
          <Navbar
            navClass={navActive[1]}
            key={index}
            idNav={index}
            chip={element.category}
            onclick={this.clickNav}
          ></Navbar>
        );
      } else {
        return (
          <Navbar
            onclick={this.clickNav}
            navClass={""}
            key={index}
            idNav={index}
            chip={element.category}
          ></Navbar>
        );
      }
    });

    return (
      <div className="App">
        <header className="App-header">
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            onClick={this.clickRandom}
          />
        </header>
        <div className="App-container">
          {/* CHIP CONTAINER */}
          {step < stepStore.length ? (
            <div className="chip-container">{navArray}</div>
          ) : null}

          <br />

          {/* CARDS CONTAIONER  */}
          <div className="step-cards-container">{this.showStep()}</div>
        </div>

        <br />

        {/* BUTTON */}

        {checkTree[step] !== undefined ? (
          <div
            className="button "
            onClick={checkTree[step] !== undefined ? this.nextStep : null}
          >
            <span>CONTINUA</span>
          </div>
        ) : (
            <div
              className="button disabled"
              onClick={checkTree[step] !== undefined ? this.nextStep : null}
            >
              <span>CONTINUA</span>
            </div>
          )}
      </div>
    );
  }
}

export default App;
