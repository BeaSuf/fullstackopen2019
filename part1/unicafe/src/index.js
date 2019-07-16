import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Heading = ({text}) => <h1>{text}</h1>

const ShowStatistics = ({text, stat, per}) => {
    return(
        <tr>
            <td>{text}</td>
            <td>{stat} {per ?' %' :''}</td> 
        </tr>     
    )  
}

const Statistics = ({good, neutral, bad, allFeedbacks}) => {
    if(allFeedbacks.length === 0)
       return <p>No feedback given</p>
    
    let feedbacksSum = 0
    allFeedbacks.forEach(element => {
        feedbacksSum += parseInt(element, 10)
    })

    return(
        <table>
            <tbody>
                <ShowStatistics text="good" stat={good} />
                <ShowStatistics text="neutral" stat={neutral} />
                <ShowStatistics text="bad" stat={bad} />        
                <ShowStatistics text="all" stat={allFeedbacks.length} />
                <ShowStatistics text="avarage" stat={feedbacksSum/allFeedbacks.length} />
                <ShowStatistics text="positive" stat={good/allFeedbacks.length} per="true"/>
            </tbody>
        </table>
    )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [allFeedbacks, setAllFeedbacks] = useState([])

    const handleClick = (feedback) => {
        switch(feedback){
            case "good": 
                setGood(good + 1)
                setAllFeedbacks(allFeedbacks.concat('1'))
                break
            case "neutral":
                setNeutral(neutral + 1)
                setAllFeedbacks(allFeedbacks.concat('0'))
                break
            case "bad":
                setBad(bad + 1)
                setAllFeedbacks(allFeedbacks.concat('-1'))
                break   
            default:
                break     
        }      
    }
  
    return (
        <div>
            <Heading text="give feedback" />
            <Button onClick ={() => handleClick('good')} text="good"/>
            <Button onClick ={() => handleClick('neutral')} text="neutral"/>
            <Button onClick ={() => handleClick('bad')} text="bad"/>
            <Heading text="statistics" />    
            <Statistics good={good} neutral={neutral} bad={bad} allFeedbacks={allFeedbacks} />
        </div>
    )
}
  
ReactDOM.render(<App />, document.getElementById('root'))
