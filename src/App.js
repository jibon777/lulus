  import React, { useEffect, useState } from 'react';
    
  function App() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);

    // Ambil soal dari API
    useEffect(() => {
      fetch('http://localhost:5000/questions')
        .then((res) => res.json())
        .then((data) => setQuestions(data));
    }, []);

    const handleAnswer = (answer) => {
      if (userAnswer) return; // Cegah lanjut jika belum menjawab
      setUserAnswer(answer);
      
      if (answer === questions[currentQuestion].answer) {
        setScore(score + 1);
        setCorrectAnswers(correctAnswers + 1);
      } else {
        setWrongAnswers(wrongAnswers + 1);
      }
    };

    const nextQuestion = () => {
      if (!userAnswer) return; // Jangan lanjut jika belum menjawab
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer('');
      } else {
        const totalQuestions = questions.length;
        const correctPercentage = ((correctAnswers / (totalQuestions || 1)) * 100).toFixed(2);
        const wrongPercentage = ((wrongAnswers / (totalQuestions || 1)) * 100).toFixed(2);
        alert(`Kuis selesai! Total Soal: ${totalQuestions}, Jawaban Benar: ${correctPercentage}%, Jawaban Salah: ${wrongPercentage}%`);
        setCurrentQuestion(0);
        setScore(0);
        setCorrectAnswers(0);
        setWrongAnswers(0);
      }
    };

    return (
      <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Kuis Pilihan Ganda</h1>
        {questions.length > 0 && (
          <div>
            <h2>{questions[currentQuestion].question}</h2>
            <p>Total Soal: {questions.length}</p>
            <div>
              {questions[currentQuestion].options.map((option, index) => {
                const optionLetter = String.fromCharCode(65 + index);
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={userAnswer !== ''}
                    style={{
                      backgroundColor:
                        userAnswer === option
                          ? option === questions[currentQuestion].answer
                            ? 'green'
                            : 'red'
                          : '',
                      color: 'black',
                      display: 'flex',
                      alignItems: 'center',
                      margin: '10px auto',
                      padding: '10px 20px',
                      fontSize: '16px',
                      width: '80%',
                      cursor: userAnswer ? 'not-allowed' : 'pointer',
                      borderRadius: '5px',
                      transition: 'all 0.3s ease',
                      border: '2px solid #ccc',
                    }}
                  >
                    <span
                      style={{
                        marginRight: '10px',
                        fontWeight: 'bold',
                      }}
                    >
                      {optionLetter}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
            <p>Skor: {score}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
              <div style={{ backgroundColor: 'green', padding: '10px', borderRadius: '5px', color: 'white' }}>
                Jawaban Benar: {correctAnswers}
              </div>
              <div style={{ backgroundColor: 'red', padding: '10px', borderRadius: '5px', color: 'white' }}>
                Jawaban Salah: {wrongAnswers}
              </div>
            </div>
            <button onClick={nextQuestion} disabled={!userAnswer} style={{ marginTop: '20px', padding: '10px 20px', cursor: userAnswer ? 'pointer' : 'not-allowed' }}>
              Next Question
            </button>
          </div>
        )}
      </div>
    );
  }

  export default App;