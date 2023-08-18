import './quiz.css';
import { useEffect, useState } from "react";
import { Radio, Button, Spin, Result } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import {Navigate} from "react-router-dom";

const Quiz = () => {
    const [quiz, setQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const antIcon = (
        <LoadingOutlined
            spin
            className='loading-icon'
        />
    );

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('quiz.json');
            setQuiz(response.data);
            setUserAnswers(new Array(response.data.length).fill(null));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAnswerChange = (e) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestion] = e.target.value;
        setUserAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < quiz.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleComplete = () => {
        if (userAnswers[userAnswers.length - 1] !== null) {
            setShowResult(true);
        }
    };

    const calculatePercentage = () => {
        const correctCount = userAnswers.filter((answer, index) => answer === quiz[index].answer).length;
        return (correctCount / quiz.length) * 100;
    };

    if (quiz.length === 0) {
        return <Spin indicator={antIcon} className='loading-icon'/>
    }

    const currentQuizItem = quiz[currentQuestion];

    return (
        <div className='quiz-page'>
            {showResult ? (
                <div>
                <Result
                    status="success"
                    // title="Quiz Completed!"
                    // subTitle={`Your score: ${calculatePercentage()}%`}
                />
                    <h2>Quiz Completed!</h2>
                    <h1>Your score: {calculatePercentage()} %</h1>
                <Button type="primary" onClick={() => location.reload()
                }>Start again?</Button>
                </div>
            ) : (
                <div>
                    <h2>{currentQuizItem.question}</h2>
                    <Radio.Group onChange={handleAnswerChange} value={userAnswers[currentQuestion]}>
                        {currentQuizItem.answers.map((answer, index) => (
                            <Radio key={index} value={answer} style={{ color: "white" }}>{answer}</Radio>
                        ))}
                    </Radio.Group>

                    {currentQuestion < quiz.length - 1 ? (
                        <Button onClick={handleNext} disabled={userAnswers[currentQuestion] === null} style={{ backgroundColor: "white" }}>
                            Next
                        </Button>
                    ) : (
                        <Button onClick={handleComplete} style={{ backgroundColor: "white" }} disabled={userAnswers[currentQuestion] === null}>
                            Complete
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Quiz;



