import React, { useEffect, useState } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [error, setError] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch(() => setError('Gagal memuat pertanyaan.'));
  }, []);

  const handleAnswer = (answer) => {
    if (isAnswered || !questions[currentQuestion]) return;
    const correctAnswers = questions[currentQuestion]?.answer || [];
    const isMultipleChoice = Array.isArray(correctAnswers);
    
    if (!isMultipleChoice) {
      setUserAnswer([answer]);
      setError('');
    } else {
      if (userAnswer.includes(answer)) {
        setUserAnswer(userAnswer.filter((ans) => ans !== answer));
      } else {
        setUserAnswer([...userAnswer, answer]);
        setError('');
      }
    }
  };

  const checkAnswer = () => {
    if (!questions[currentQuestion]) return;
    if (userAnswer.length === questions[currentQuestion]?.options?.length) {
      setError('Anda tidak boleh memilih semua jawaban!');
      return;
    }
    
    const correctAnswers = questions[currentQuestion]?.answer || [];
    const isCorrect = userAnswer.every((ans) => correctAnswers.includes(ans)) && userAnswer.length === correctAnswers.length;
    
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    if (!isAnswered) return;
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setUserAnswer([]);
      setIsAnswered(false);
      setError('');
    } else {
      setTimeout(() => {
        alert(`Kuis selesai! Skor Anda: ${score + (isAnswered ? 1 : 0)}/${questions.length}`);
        setCurrentQuestion(0);
        setUserAnswer([]);
        setIsAnswered(false);
        setScore(0);
      }, 100);
    }
  };

  return (
    <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Kuis Pilihan Ganda</h1>
      <h3>Jumlah Soal: {questions.length}</h3>
      <h3>Skor: {score}</h3>
      {questions.length > 0 && questions[currentQuestion] && (
        <div>
          <h2>{questions[currentQuestion]?.question}</h2>
          {questions[currentQuestion]?.instruction && <p>{questions[currentQuestion]?.instruction}</p>}
          <div>
            {questions[currentQuestion]?.options?.map((option, index) => {
              const optionLetter = String.fromCharCode(65 + index);
              const isCorrect = questions[currentQuestion]?.answer?.includes(option) || false;
              const isSelected = userAnswer.includes(option);
              let backgroundColor = '';
              
              if (isAnswered) {
                backgroundColor = isCorrect ? 'green' : isSelected ? 'red' : '';
              } else {
                backgroundColor = isSelected ? '#17a2b8' : '';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  style={{
                    backgroundColor,
                    color: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    margin: '10px auto',
                    padding: '10px 20px',
                    fontSize: '16px',
                    width: '80%',
                    cursor: isAnswered ? 'not-allowed' : 'pointer',
                    borderRadius: '5px',
                    border: '2px solid #ccc',
                  }}
                  disabled={isAnswered}
                >
                  <span style={{ marginRight: '10px', fontWeight: 'bold' }}>{optionLetter}.</span>
                  {option}
                </button>
              );
            })}
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!isAnswered && (
            <button onClick={checkAnswer} disabled={userAnswer.length === 0} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
              Konfirmasi Jawaban
            </button>
          )}
          {isAnswered && (
            <button onClick={nextQuestion} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
              Pertanyaan Selanjutnya
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
